import React, {Component} from 'react';

const d3 = require('d3');
import dashboardStyles from '../styles/dashboard.css';

// modified from Sepand Ansari https://codepen.io/sepans/pen/amooyp
class SimpleLineGraph extends Component {
    render() {

        const {data_dict, width, height, margin, year} = this.props;
        const data = [];

        for (let key in data_dict) {
            let dict = {
                a: key,
                b: parseFloat(data_dict[key])
            };
            data.push(dict);
        }

        const h = height - 2 * margin, w = width - 2 * margin;

        //number formatter
        const xFormat = d3.format('1');

        //x scale
        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.a)) //domain: [min,max] of a
            .range([margin, w]);

        //y scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.b)]) // domain [0,max] of b (start from 0)
            .range([h, margin]);

        //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        const line = d3.line()
            .x(d => x(d.a))
            .y(d => y(d.b));


        const xTicks = x.ticks(10).map(d => (
            <g transform={`translate(${x(d)},${h + margin})`}>
                {/*vertical line to show values of years. Make vertical line of selected year bold.*/}
                <line x1='0' x2='0' y1={-margin} y2={-h} transform="translate(0, 0)"
                      opacity={year === d.toString() ? 1 : 0.2}/>
                {/*year values*/}
                <text transform="translate(0,-17)">{d}</text>
                {/*year markers along x axis*/}
                <line x1='0' x1='0' y1='0' y2='7' transform="translate(0,-35)"/>
            </g>
        ));

        const yTicks = y.ticks(10).map(d => (
            y(d) > 10 && y(d) < h ?
                <g transform={`translate(${margin},${y(d)})`}>
                    {/*y values*/}
                    <text x="-12" y="5">{xFormat(d)}</text>
                    {/*lines next to y values to mark y axis*/}
                    <line x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
                    {/*{horizontal lines for ease of reading y values}*/}
                    <line x1='0' x2={w - 15} y1='0' y2='0' transform="translate(-5,0)" opacity={0.2}/>
                </g>
                : null
        ));

        let transformYText = "translate(10," + height/2 + ")rotate(-90)";

        let graph =
            <svg width={width} height={height}>
                {/*{x axis}*/}
                <line className={dashboardStyles.axis} x1={margin} x2={w + 14} y1={h} y2={h}/>
                {/*{y axis}*/}
                <line className={dashboardStyles.axis} x1={margin} x2={margin} y1={margin} y2={h}/>
                <path d={line(data)}/>
                <g className={dashboardStyles["axis-labels"]}>
                    {xTicks}
                </g>
                <g className={dashboardStyles["axis-labels"]}>
                    {yTicks}
                </g>
                <text fontFamily="sans-serif" fontSize="12px" fill="black"  transform={transformYText}> lb/acre </text>
            </svg>;
        return (graph)
    }
}

export default SimpleLineGraph;