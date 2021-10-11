import React from 'react'
import { VegaLite } from 'react-vega'
import type { ParameterValue } from '../../../utils/flowtype';

type Props = {
   data: ParameterValue[];
   width: Number,
   height: Number,
   startAtZero: Boolean,
   startDate?: Date,
   endDate?: Date
 }
 

function ErrorLineGraph(props: Props){
    const {data, width, height, startAtZero, startDate, endDate, yLabel} = props;

    let dateRange = {}
    if(startDate && endDate){
      dateRange = {"domain": [startDate.getTime(), endDate.getTime()]}
    }

    const spec = {
        "width": width,
        "height": height,
        "data": { name: 'table' },
           "encoding":{
            "x":{
               "field":"date",
               "type":"temporal",
               "timeUnit": "yearmonthdate",
               "axis": {"grid": false, "title": false},
               "scale": {...dateRange}
            }
         },
         "layer":[
            {
                "mark": "errorband",
                "encoding": {
                  "y": {
                    "field": "ci0",
                    "type": "quantitative",
                    "scale": {"zero": false},
                    "title": ""
                  },
                  "y2": {"field": "ci1"}
                }
              },
            {
               "encoding":{
                  "y":{
                     "field":"value",
                     "type":"quantitative",
                     "scale": { "zero": startAtZero},
                     "axis": {"grid": false},
                     "title": yLabel
                  }
               },
               "layer":[
                  {
                    "mark": {
                      "type": "line",
                      "point": true
                    }
                  },
                  {
                     "transform":[
                        {
                           "filter":{
                              "param":"hover",
                              "empty":false
                           }
                        }
                     ],
                     "mark":"point"
                  }
               ]
            },
            {
               "mark":"rule",
               "encoding":{
                  "opacity":{
                     "condition":{
                        "value":0.3,
                        "param":"hover",
                        "empty":false
                     },
                     "value":0
                  },
                  "tooltip":[
                     {
                        "field":"value",
                        "type":"quantitative",
                        "title": yLabel
                     },
                     {
                        "field":"date",
                        "type":"temporal",
                        "title": "Date-Time"
                     },
                     {
                         "field": "error",
                         "type": "quantative",
                         "title": "Uncertainty"
                     }
                  ]
               },
               "params":[
                  {
                     "name":"hover",
                     "select":{
                        "type":"point",
                        "fields":[
                           "date"
                        ],
                        "nearest":true,
                        "on":"mouseover",
                        "clear":"mouseout"
                     }
                  }
               ]
            }
         ]
      }
      return(<VegaLite spec={spec} data={{"table" : data}} actions={{"export": true, "source": false,  "compiled": false}}/>)
}

ErrorLineGraph.defaultProps = {
    width: 800,
    height: 300,
    keyName: "key",
    startAtZero: false,
    yLabel: 'value',
    startDate: undefined,
    endDate: undefined
}

export default ErrorLineGraph;