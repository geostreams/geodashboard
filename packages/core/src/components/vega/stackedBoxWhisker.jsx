import React from 'react'
import { VegaLite } from 'react-vega'

function StackedBoxWhisker(props){
    const {data, width, height, attributes} = props;

    const sortedAttr = attributes;
    var collator = new Intl.Collator([], {numeric: true});
    sortedAttr.sort((a, b) => collator.compare(a, b));   

    const renameAttributesMap = Object.fromEntries(
        attributes.map(a => [`average[${a}]`, a])
     )
    const spec = {
        "width": width,
        "height": height,
        "data": { name: 'table' },
        "transform": [
          {"fold": attributes.map(a => `average[${a}]`)},
          {"calculate": `${JSON.stringify(renameAttributesMap)}[datum.key]`, "as": "key"}
        ], 
        "mark": {
            "type": "boxplot",
            "extent": "min-max"
          },
        "encoding": {
            "x": {"field": "key", "type": "nominal", "axis": null, "sort": sortedAttr},
            "color": {"field": "key", "type": "nominal", "legend": null, 
            "sort": sortedAttr},
            "y": {
              "field": "value",
              "type": "quantitative",
              "scale": {"zero": false},
              "title": "value"
            }
          }
      }
      return(<VegaLite spec={spec} data={{"table" : data}}  actions={false}/>)
}

StackedBoxWhisker.defaultProps = {
    width: 800,
    height: 300
}

export default StackedBoxWhisker;