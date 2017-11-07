/*
 * @flow
 */

import React, { Component } from 'react';
import rd3 from 'react-d3';
import d3 from 'd3';

class LineChartWithDeviations extends Component {

    state = {
        lineChart: ''
    };

    constructor(props: Object) {
        super(props);
    }

    componentWillMount() {

        let chartTitle = 'No Chosen Parameter';
        let pageSettings = this.props.trends_settings;
        if (pageSettings) {
            pageSettings.map(p => {
                if (p.parameter.id == this.props.selectedParameter) {
                    chartTitle = p.parameter.title;
                }
            })
        }

        let regionName = this.props.trends_region_name;
        let regions = this.props.trendRegions;

        let dataRaw = [];
        let averageData = [];
        let deviationDataRaw = [];
        let positiveDeviation = [];
        let negativeDeviation = [];

        if (regions.length > 0) {

            for (let i = 1; i < regions.length; i++) {

                if (regions[i].properties.region.toUpperCase() == regionName.toUpperCase() &&
                    regions[i].trends_detail.length > 0) {

                    // The Values
                    regions[i].trends_detail.map(d => {
                        for (let x in d) {
                            dataRaw.push({"x": x, "y": d[x]})
                        }
                    });
                    dataRaw.sort(function (a, b) {
                        return Number(a.x) - Number(b.x);
                    });

                    // The Deviations
                    regions[i].trends_deviation.map(d => {
                        for (let y in d) {
                            deviationDataRaw.push({"x": y, "y": d[y]})
                        }
                    });
                    deviationDataRaw.sort(function (a, b) {
                        return Number(a.x) - Number(b.x);
                    });

                    // The Positive Deviations
                    for (let g = 0; g < deviationDataRaw.length; g++) {
                        positiveDeviation.push({
                            "x": deviationDataRaw[g].x,
                            "y": (Number(dataRaw[g].y) + Number(deviationDataRaw[g].y))
                        });
                        negativeDeviation.push({
                            "x": deviationDataRaw[g].x,
                            "y": (Number(dataRaw[g].y) - Number(deviationDataRaw[g].y))
                        });
                    }

                    averageData.push(
                        {
                            name: "Deviation Up",
                            values: positiveDeviation,
                            strokeWidth: 2,
                            strokeDashArray: "4"
                        },
                        {
                            name: "Average Values",
                            values: dataRaw
                        },
                        {
                            name: "Deviation Down",
                            values: negativeDeviation,
                            strokeWidth: 2,
                            strokeDashArray: "4"
                        }
                    )
                }

            }
        }

        if (averageData.length == 0) {
            averageData.push(
                {
                    name: "Deviation Up",
                    values: [{x:0, y:0}]
                },
                {
                    name: "Average Values",
                    values: [{x:0, y:0}]
                },
                {
                    name: "Deviation Down",
                    values: [{x:0, y:0}]
                }
            )
        }

        let LineChart = rd3.LineChart;
        this.lineChart = (
            <LineChart
                data={averageData}
                title={chartTitle} legend={true}
                width={650} height={400}
                yAxisLabel="Amount" yAxisLabelOffset={Number(50)}
                xAxisLabel="Time" xAxisLabelOffset={Number(50)}
                gridHorizontal={true} gridVertical={true}
                hoverAnimation={true}
                colors={d3.scale.category20b()}
                margins={{top: 10, right: 150, bottom: 50, left: 60}}
                xAccessor={(xa)=> {
                    return new Date(xa.x);
                }}
                xAxisTickInterval={{unit: 'year', interval: 5}}
            />
        );

    }

    render() {
        return (<div>{this.lineChart} </div>)
    }

}

export default LineChartWithDeviations;