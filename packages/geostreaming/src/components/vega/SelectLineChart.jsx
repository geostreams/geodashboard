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
    const {data, width, height, attributes, startAtZero, attributesTitle, yLabel, startDate, endDate} = props;

    function specficSpecturm(point,wavelength){
        point['average'] = point['average'][wavelength]
        return point
    }
    const wavelength = '799.9086547'
    const newData = data.map((x) => specficSpecturm(x,wavelength))
    console.log("Look here select")
    console.log(newData)

    let dateRange = {}
    if(startDate && endDate){
        dateRange = {"domain": [startDate.getTime(), endDate.getTime()]}
    }

    const spec = {
        "width": width,
        "height": height,
        "params": [
            {
                "name": "strokeWidth",
                "value": 2,
                "bind": {"input": "range", "min": 0, "max": 10, "step": 0.5}
            },
        ],
        "data": { name: 'table' },
        "transform": [
                    {"calculate": "datum.average", "as": "value"}
                ],
        "mark": {
            "type": "line",
            "strokeWidth": {"expr": "strokeWidth"},
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

    // const spec = {
    //     "width": width,
    //     "height": height,
    //     "data": { name: 'table' },
    //     "transform": [
    //         {"calculate": "datum.average", "as": "value"}
    //     ],
    //     "encoding":{
    //         "x":{
    //             "field":"date",
    //             "type":"temporal",
    //             "timeUnit": "yearmonthdate",
    //             "axis": {"grid": false, "title": false},
    //             "scale": {...dateRange}
    //         }
    //     },
    //     "layer":[
    //         {
    //             "encoding":{
    //                 "y":{
    //                     "field":"value",
    //                     "type":"quantitative",
    //                     "scale": { "zero": startAtZero},
    //                     "axis": {"grid": false},
    //                     "title": yLabel
    //                 }
    //             },
    //             "layer":[
    //                 {
    //                     "mark": {
    //                         "type": "line",
    //                         // "interpolate": {"expr": "interpolate"},
    //                         "point": true
    //                     }
    //                 },
    //                 {
    //                     "transform":[
    //                         {
    //                             "filter":{
    //                                 "param":"hover",
    //                                 "empty":false
    //                             }
    //                         }
    //                     ],
    //                     "mark":"point"
    //                 }
    //             ]
    //         },
    //         {
    //             "mark": {
    //                 "type": "boxplot",
    //                 "extent": "min-max",
    //                 "median": {"color": "black"},
    //                 "rule": false
    //             },
    //             "encoding": {
    //                 "y": {
    //                     "field": "value",
    //                     "type": "quantitative",
    //                     "scale": {"zero": false},
    //                     "axis": {"grid": false},
    //                     "title": yLabel
    //                 },
    //                 "x": {},
    //                 "opacity": {
    //                     "value": 0.3
    //                 },
    //                 "size": {
    //                     "value": width
    //                 }
    //             }
    //         },
    //         {
    //             "mark":"rule",
    //             "encoding":{
    //                 "opacity":{
    //                     "condition":{
    //                         "value":0.3,
    //                         "param":"hover",
    //                         "empty":false
    //                     },
    //                     "value":0
    //                 },
    //                 "tooltip":[
    //                     {
    //                         "field":"value",
    //                         "type":"quantitative",
    //                         "title": yLabel
    //                     },
    //                     {
    //                         "field":"date",
    //                         "type":"temporal",
    //                         "title": "Date-Time"
    //                     }
    //                 ]
    //             },
    //             "params":[
    //                 {
    //                     "name":"hover",
    //                     "select":{
    //                         "type":"point",
    //                         "fields":[
    //                             "date"
    //                         ],
    //                         "nearest":true,
    //                         "on":"mouseover",
    //                         "clear":"mouseout"
    //                     }
    //                 },
    //                 {
    //                     "name": "interpolate",
    //                     "value": "linear",
    //                     "bind": {
    //                         "input": "select",
    //                         "options": [
    //                             "basis",
    //                             "cardinal",
    //                             "catmull-rom",
    //                             "linear",
    //                             "monotone",
    //                             "natural",
    //                             "step",
    //                             "step-after",
    //                             "step-before"
    //                         ]
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // }
    return(<VegaLite spec={spec} data={{"table" : newData}} actions={{"export": true, "source": false,  "compiled": false}}/>)
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