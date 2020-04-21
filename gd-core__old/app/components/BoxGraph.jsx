import React, { Component } from 'react';
const d3 = require('d3');

class BoxGraph extends Component {
    render() {

        let svgContainer = d3.select("body").append("svg")
                                            .attr("width", 200)
                                            .attr("height", 200);

        //Draw the Rectangle
        let rectangle = svgContainer.append("rect")
                                    .attr("x", 10)
                                    .attr("y", 10)
                                    .attr("width", 50)
                                    .attr("height", 50);

        return  (
            {rectangle}
        )
    }
}
export default BoxGraph;