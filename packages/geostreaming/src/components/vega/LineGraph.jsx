import React from 'react'
import { VegaLite } from 'react-vega'

function LineGraph(props){
    const {data, width, height, startAtZero, parameterName, startDate, endDate, yLabel} = props;

    let dateRange = {}
    if(startDate && endDate){
      dateRange = {"domain": [startDate.getTime(), endDate.getTime()]}
    }

    const spec = {
        "width": width,
        "height": height,
        "data": { name: 'table' },
        "transform": [
            {"calculate": "datum.average", "as": "value"}
        ],
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
               "mark": {
                  "type": "boxplot",
                  "extent": "min-max",
                  "median": {"color": "black"},
                   "rule": false
                   },
                   "encoding": {
                     "y": {
                        "field": "value",
                        "type": "quantitative",
                        "scale": {"zero": false},
                        "axis": {"grid": false},
                        "title": yLabel
                     },
                  "x": {},
                  "opacity": {
                         "value": 0.3
                    },
                  "size": {
                     "value": width
                  }
                   }
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
                        "title": parameterName
                     },
                     {
                        "field":"date",
                        "type":"temporal",
                        "title": "Date-Time"
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

LineGraph.defaultProps = {
    width: 800,
    height: 300,
    keyName: "key",
    startAtZero: false,
    parameterName: 'value'
}

export default LineGraph;