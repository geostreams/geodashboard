import React from 'react'
import { VegaLite } from 'react-vega'
import type { ParameterValue } from '../../../utils/flowtype';


type Props = {
   data: ParameterValue[];
   attributes: String[],
   startAtZero?: Boolean,
   attributesTitle?: String,
   width?: Number,
   height?: Number,
   yLabel?: String,
   startDate?: Date,
   endDate?: Date
 }

function SelectLineChart(props: Props){
    const {data, width, height, startAtZero, yLabel, startDate, endDate} = props;

    const wavelengths = Object.keys(data[0].average)

    let dateRange = {}
    if(startDate && endDate){
        dateRange = {"domain": [startDate.getTime(), endDate.getTime()]}
    }

    const spec = {
        "width": width,
        "height": height,
        "params": [

            {"name": "Wavelength",
                "value": wavelengths[0],
                "bind": {"input": "select", "options": wavelengths
            }
            }
        ],
        "data": { name: 'table' },
        "transform": [
                    {"calculate": "datum['average'][Wavelength]", "as": "value"}
                ],
        "mark": {
            "type": "line",
        },
        "encoding": {
            "x": {"field": "date",
                  "type": "temporal",
                  "timeUnit": "yearmonthdate",
                  "axis": {"grid": false, "title": false},
                  "scale": {...dateRange}},
            "y": {"field": "value",
                "type": "quantitative",
                "scale": { "zero": startAtZero},
                "axis": {"grid": false},
                "title": yLabel}
        }
    }
    return(<VegaLite spec={spec} data={{"table" : data}} actions={{"export": true, "source": false,  "compiled": false}}/>)
}

SelectLineChart.defaultProps = {
    width: 800,
    height: 300,
    attributesTitle: "attributes",
    yLabel: "value",
    startAtZero: false,
    startDate: null,
    endDate: null
}

export default SelectLineChart;