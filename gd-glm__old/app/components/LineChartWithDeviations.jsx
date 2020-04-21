/* No Flow due to D3 Items */

import React, { Component } from 'react';
import { Xaxis, Yaxis, Chart, Svg } from 'react-d3-core';
const d3 = require('d3');


class LineChartWithDeviations extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            xline: d3.scaleLinear(),
            yline: d3.scaleLinear()
        };
        this.setUpGraph = this.setUpGraph.bind(this);
    }

    componentWillMount() {
        this.setUpGraph(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setUpGraph(nextProps);
    }

    setUpGraph(props) {
        const {
            width,
            height,
            margins,
            chartData
        } = props;
        let xRange = [0, width - margins.left - margins.right];
        let yRange = [height - margins.top - margins.bottom, 0];
        let xDomain = d3.extent(chartData, function (d) {
            return d.x;
        });
        let yMax = d3.extent(chartData, function (d) {
            return d.y + d.d;
        })[1];
        let yMin = d3.extent(chartData, function (d) {
            return d.y - d.d;
        })[0];
        let yDomain = [yMin, yMax];
        this.setState({xRange, xDomain, yRange, yDomain});
        this.setState({xline: d3.scaleLinear().domain(xDomain).range(xRange)});
        this.setState({yline: d3.scaleLinear().domain(yDomain).range(yRange)});
        this.setState({barLength: 0.3 * (xRange[1] / chartData.length)});
        let that = this;

        d3.select(this.refs.svgContainer).on('mousemove', function mouseMoveHandler() {
            // console.log(d3.mouse(this));
            let bisectDate = d3.bisector(function (d) {
                return d.x;
            }).left;
            let x0 = that.state.xline.invert(d3.mouse(this)[0] - margins.left),
                i = bisectDate(chartData, x0, 1) - 1,
                d0 = chartData[i - 1],
                d1 = chartData[i];
            // for debug
            // console.log(i)
            let d = (d1 !== undefined || x0 - d0.x > d1.x - x0) ? d1 : d0;
            if (d) {
                that.setState({dFocus: d});
                that.setState({xFocus: that.state.xline(d.x)});
                that.setState({yFocus: that.state.yline(d.y)});
                let text = d3.select("text");
                let bbox = text.node().getBBox();
                let padding = 4;
                let rect = d3.select("rect")
                    .attr("width", bbox.width + (padding * 2))
                    .attr("height", bbox.height + (padding * 2));
                //use i as flop condition instead of svg width.
                if (i > chartData.length * 0.65) {
                    that.setState({xFocusText: that.state.xline(d.x) - bbox.width - that.state.barLength});
                } else {
                    that.setState({xFocusText: that.state.xline(d.x) + that.state.barLength});
                }

            }
        });

        d3.select(this.refs.svgContainer).on('mouseleave', function mouseOutHandler() {
            that.setState({dFocus: undefined, xFocus: undefined, yFocus: undefined});
        })
    }

    _mkLine() {
        let that = this;
        return (
            <path
                stroke="black"
                strokeWidth="2"
                fill="none"
                d={that._setAxes(that.props.chartData)}
                strokeDasharray="5,5"
            />
        )
    }

    _setAxes(data) {
        let that = this;
        let line = d3.line()
            .x(function (d) {
                return that.state.xline(d.x);
            })
            .y(function (d) {
                return that.state.yline(d.y);
            });
        return line(data);
    }

    _setDeviations(x, center, dev) {
        let devData = [{"x": x, "y": center + dev}, {"x": x, "y": center - dev}];
        return this._setAxes(devData)
    }

    _mkMarker() {
        let that = this;
        let {barLength} = this.state;

        return (
            <g>
                {
                    this.props.chartData.map((line, i) => {
                        return (
                            <g key={i}>

                                <path stroke="black"
                                      strokeWidth={1}
                                      fill="none"
                                      d={that._setDeviations(line.x, line.y, line.d)}/>
                                <line stroke="black"
                                      strokeWidth={1}
                                      fill="none"
                                      x1={that.state.xline(line.x) - barLength} y1={that.state.yline(line.y + line.d)}
                                      x2={that.state.xline(line.x) + barLength} y2={that.state.yline(line.y + line.d)}
                                />
                                <line stroke="black"
                                      strokeWidth={1}
                                      fill="none"
                                      x1={that.state.xline(line.x) - barLength} y1={that.state.yline(line.y - line.d)}
                                      x2={that.state.xline(line.x) + barLength} y2={that.state.yline(line.y - line.d)}
                                />
                                <circle
                                    stroke="black"
                                    strokeWidth="2"
                                    fill="black"
                                    cx={that.state.xline(line.x)}
                                    cy={that.state.yline(line.y)}
                                    r={3}
                                />
                            </g>
                        )
                    })
                }
            </g>
        )
    }

    _mkFocus() {
        const {xFocus, xFocusText, yFocus, dFocus, barLength} = this.state;
        return (
            dFocus ?
                <g>
                    <circle
                        stroke="black"
                        strokeWidth="2"
                        fill="black"
                        cx={xFocus}
                        cy={yFocus}
                        r={6}
                        display={focus}
                    />
                    <rect x={xFocusText} y={yFocus + barLength} rx={10} ry={10} width={150} height={50}
                          fill="rgb(29, 133, 172)"
                          stroke="rgb(29, 133, 172)"
                    />
                    <text x={xFocusText} y={yFocus + barLength + 10} fill="white">
                        <tspan x={xFocusText} dx="0.2em"
                               dy=".6em">{this.props.xLabel + ": " + dFocus.x.getFullYear()}</tspan>
                        <tspan x={xFocusText} dx="0.2em"
                               dy="1.2em">{this.props.yLabel + ": " + dFocus.y.toFixed(2)}</tspan>
                        <tspan x={xFocusText} dx="0.2em" dy="1.2em">{"Deviation: " + dFocus.d.toFixed(2)}</tspan>
                    </text>
                </g> : null
        )
    }

    render() {
        const {chartData, width, margins, height, id} = this.props;

        let x = function (d) {
            return d.x;
        };

        let y = function (d) {
            return d.y;
        };

        let that = this;

        let divStyle = {
            width: '100%'
        };
        let t = `translate(${margins.left}, ${margins.top})`;

        let tX = `translate(0, ${height - margins.top})`;
        return (
            <div style={divStyle}>
                <svg
                    height={height}
                    width='100%'
                    id={id}
                    ref="svgContainer"
                >
                    <g
                        transform={t}
                        height={height}
                        width='100%'
                    >
                        <g id="line">
                            {this._mkLine()}
                        </g>
                        <g id="marker">
                            {this._mkMarker()}
                        </g>
                        <g id="focus">
                            {this._mkFocus()}
                        </g>
                        <g id="Xaxis-line" transform={`translate(0, ${height - margins.top - margins.bottom})`}>
                            <line x1={0} y1={0}
                                  x2={width - margins.left - margins.right} y2={0}
                                  stroke="black"
                                  strokeWidth={2}
                                  fill="none"/>
                        </g>
                        <g id="Yaxis-line">
                            <line x1={0} y1={0}
                                  x2={0} y2={height - margins.top - margins.bottom}
                                  stroke="black"
                                  strokeWidth={2}
                                  fill="none"/>
                        </g>

                        <Xaxis
                            id="Xaxis"
                            {...this.props}
                            xDomain={this.state.xDomain}
                            xRange={this.state.xRange}
                            x={x}
                        />
                        <Yaxis
                            id="Yaxis"
                            {...this.props}
                            y={y}
                            yDomain={this.state.yDomain}
                            yRange={this.state.yRange}
                            yAxisClassName='y-axis'
                        />
                    </g>
                </svg>
            </div>
        )
    }

}

export default LineChartWithDeviations;