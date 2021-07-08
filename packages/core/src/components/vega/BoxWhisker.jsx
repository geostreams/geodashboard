import React from 'react'
import { VegaLite } from 'react-vega'

function BoxWhisker(props){
    const {data, width, height} = props;

    const spec = {
        "width": width,
        "height": height,
        "data": { name: 'table' },
        "mark": {
            "type": "boxplot",
            "extent": "min-max",
            "ticks": "true",
            "median": {"color": "black"},
          },
          "encoding": {
            "y": {
              "field": "average",
              "type": "quantitative",
              "scale": {"zero": false},
              "axis": {"grid": false}
            },
            "size": {
                  "value": width-20
            },
            "opacity": {
              "value": 0.3
         },
          }
      }
      return(<VegaLite spec={spec} data={{"table" : data}}  actions={false}/>)
}

BoxWhisker.defaultProps = {
    width: 800,
    height: 300
}

export default BoxWhisker;