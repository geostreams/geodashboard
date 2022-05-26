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
 

function ScatterPlot(props: Props){
    const { data, width, height, startAtZero, startDate, endDate, yLabel, regressionLine } = props;

    let dateRange = {};
    if(startDate && endDate){
        dateRange = { domain: [startDate.getTime(), endDate.getTime()] };
    }

    const spec = {
        width,
        height,
        data: { name: 'table' },
        transform: [
            { calculate: 'datum.average', as: 'value' }
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
                    }
                },
                layer:[
                    {
                        mark: { type:'point' , filled: true , size: 35, opacity: 0.4 }
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
    if (regressionLine){
        const line_spec = {
            mark: {
                type: 'line',
                color: 'firebrick'
            },
            transform: [
                {
                    regression: 'value',
                    on: 'date'
                }],
            encoding: {
                x: {
                    field: 'date',
                    type: 'temporal'
                },
                y: {
                    field: 'value',
                    type: 'quantitative'
                }
            }
        };
        spec.layer.push(line_spec);
        
    }
    return(<VegaLite spec={spec} data={{ table : data }} actions={{ export: true, source: false, compiled: false }} />);
}

ScatterPlot.defaultProps = {
    width: 800,
    height: 300,
    keyName: 'key',
    startAtZero: false,
    yLabel: 'value',
    startDate: undefined,
    endDate: undefined
};

export default ScatterPlot;