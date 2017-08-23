/*
 * @flow
 */

import React, { Component } from 'react';
import rd3 from 'react-d3';

class RegionChart extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {

        let chartTitle = this.props.selectedParameter;
        let trendsPageSettings = this.props.trends_settings;
        if (trendsPageSettings) {
            trendsPageSettings.map(p => {
                    if (p.parameter.id == this.props.selectedParameter) {
                        chartTitle = p.parameter.title;
                    }
                }
            )
        }

        let LineChart = rd3.LineChart;
        let trendData = [
            {
                name: "Line 1",
                values: [{ x: 0, y: 0 },{ x: 50, y: 20 },{ x: 100, y: 40 }]
            },
            {
                name: "Line 2",
                values: [{ x: 0, y: 40 },{ x: 50, y: 40 },{ x: 100, y: 60 }]
            },
            {
                name: "Line 3",
                values: [{ x: 0, y: 80 },{ x: 50, y: 60 },{ x: 100, y: 80}]
            }
        ];

        return (

            <LineChart
                data={trendData}
                width={500}
                height={500}
                title={chartTitle}
                yAxisLabel="Amount (unit)"
                xAxisLabel="Time (unit)"
            />

        )
    }
}

export default RegionChart;