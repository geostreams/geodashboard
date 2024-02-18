import React from 'react';
import { VegaLite } from 'react-vega';
import type { ParameterValue } from '../../../utils/flowtype';

type Props = {
   data: ParameterValue[];
   width: Number,
   height: Number,
   startAtZero: Boolean,
   startDate?: Date,
   endDate?: Date
 }
 

function LineGraph(props: Props){
    const { data, width, height, startAtZero, startDate, endDate, yLabel } = props;

    let dateRange = {};
    if(startDate && endDate){
        dateRange = { domain: [startDate.getTime(), endDate.getTime()] };
    }

    const spec = {
        width,
        height,
        data: { name: 'table' },
        transform: [
            { calculate: 'datum.average', as: 'value' },
            {
                type: 'impute',
                field: 'value',
                key: 'date',
                method: 'value',
                value: null,
                groupby: ['date'],
                keyvals: {
                    signal: "sequence(min(table.date), max(table.date), 'day')"
                }
            }
        ],
        encoding:{
            x:{
                field:'date',
                type:'temporal',
                timeUnit: 'yearmonthdate',
                axis: { grid: false, title: false },
                scale: { ...dateRange }
            }
        },
        layer:[
            {
                encoding:{
                    y:{
                        field:'value',
                        type:'quantitative',
                        scale: { zero: startAtZero },
                        axis: { grid: false },
                        title: yLabel
                    },
                    defined: { field: 'value', valid: true }
                },
                layer:[
                    {
                        mark: {
                            type: 'line',
                            point: true
                        }
                    },
                    {
                        transform:[
                            {
                                filter:{
                                    param:'hover',
                                    empty:false
                                }
                            }
                        ],
                        mark:'point'
                    }
                ]
            },
            {        
                mark: {
                    type: 'boxplot',
                    extent: 'min-max',
                    median: { color: 'black' },
                    rule: false
                },
                encoding: {
                    y: {
                        field: 'value',
                        type: 'quantitative',
                        scale: { zero: false },
                        axis: { grid: false },
                        title: yLabel
                    },
                    x: {},
                    opacity: {
                        value: 0.3
                    },
                    size: {
                        value: width
                    }
                }
            },
            {
                mark:'rule',
                encoding:{
                    opacity:{
                        condition:{
                            value:0.3,
                            param:'hover',
                            empty:false
                        },
                        value:0
                    },
                    tooltip:[
                        {
                            field:'value',
                            type:'quantitative',
                            title: yLabel
                        },
                        {
                            field:'date',
                            type:'temporal',
                            title: 'Date-Time'
                        }
                    ]
                },
                params:[
                    {
                        name:'hover',
                        select:{
                            type:'point',
                            fields:[
                                'date'
                            ],
                            nearest:true,
                            on:'mouseover',
                            clear:'mouseout'
                        }
                    }
                ]
            }
        ]
    };
    return(<VegaLite spec={spec} data={{ table : data }} actions={{ export: true, source: false, compiled: false }} />);
}

LineGraph.defaultProps = {
    width: 800,
    height: 300,
    keyName: 'key',
    startAtZero: false,
    yLabel: 'value',
    startDate: undefined,
    endDate: undefined
};

export default LineGraph;