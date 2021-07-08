import React from 'react'
import { VegaLite } from 'react-vega'

function MultiLineChart(props){
    const {data, width, height, attributes, startAtZero, keyName, yLabel, startDate, endDate} = props;

    const sortedAttr = attributes;
    const collator = new Intl.Collator([], {numeric: true});
    sortedAttr.sort((a, b) => collator.compare(a, b));   

    const renameAttributesMap = Object.fromEntries(
        attributes.map(a => [`average[${a}]`, a])
     )

    const tooltipAttributes = attributes.map(a => ({field: a, type: "quantative"}))

    let dateRange = {}
    if(startDate && endDate){
      dateRange = {"domain": [startDate.getTime(), endDate.getTime()]}
    }
     
    const spec = {
        "width": width,
        "height": height,
        "data": { name: 'table' },
        "transform": [
            {"fold": attributes.map(a => `average[${a}]`)},
            {"calculate": `${JSON.stringify(renameAttributesMap)}[datum.key]`, "as": keyName}
        ],
        "encoding":{
            "x":{
               "field":"date",
               "type":"temporal",
               "axis": {"grid": false},
               "timeUnit": "yearmonthdate",
               "title": null,
               "scale": {...dateRange}
            }
         },
         "layer":[
            {
               "encoding":{
      
                  "color":{
                     "field":keyName,
                     "type":"nominal",
                     "sort": sortedAttr
                  },
                  "y":{
                     "field":"value",
                     "type":"quantitative",
                     "scale": { "zero": startAtZero},
                     "title": yLabel
                  }
               },
               "layer":[
                  {
                      "params": [{
                          "name": "dataSetVisibility",
                          "select": {"type": "point", "fields": [keyName], "on": "click"},
                          "bind": "legend"
                        }],
                    "mark": {
                      "type": "line",
                      "point": true
                    },
                    "encoding": {
                          "opacity": {
                            "condition": {"param": "dataSetVisibility", "value": 1},
                            "value": 0.1
                          }
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
               "transform":[
                  {
                     "pivot":keyName,
                     "value":"value",
                     "groupby":[
                        "date"
                     ]
                  }
               ],
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
                        "field":"date",
                        "type":"temporal"
                     },
                     ...tooltipAttributes
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
      return(<VegaLite spec={spec} data={{"table" : data}} actions={{"export": true, "source": false,"editor": false, "compiled": false}}/>)
}

MultiLineChart.defaultProps = {
    width: 800,
    height: 300,
    keyName: "key",
    startAtZero: false
}

export default MultiLineChart;