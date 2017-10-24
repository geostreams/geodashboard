/*
 * @flow
 */

import React, { Component } from 'react';
import rd3 from 'react-d3';
import d3 from 'd3';

class RegionChart extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {

        let chartTitle = 'No Chosen Parameter';
        let trendsPageSettings = this.props.trends_settings;
        if (trendsPageSettings) {
            trendsPageSettings.map(p => {
                if (p.parameter.id == this.props.selectedParameter) {
                    chartTitle = p.parameter.title;
                }
            })
        }

        let trendsRegionName = this.props.trends_region_name;
        let trendRegions = this.props.trendRegions;

        let trendDataRaw = [];
        let trendData = [];
        let trendDeviationDataRaw = [];
        let trendPositiveDeviation = [];
        let trendNegativeDeviation = [];
        for (let i = 1 ; i < trendRegions.length; i++) {

            if (trendRegions[i].name == trendsRegionName) {

                // The Values
                trendRegions[i].trends_detail.map( d => {
                    for (let x in d )
                    {
                        trendDataRaw.push({"x": x, "y": d[x]})
                    }
                });
                trendDataRaw.sort(function(a, b) {
                    return Number(a.x) - Number(b.x);
                });

                // The Deviations
                trendRegions[i].trends_deviation.map( d => {
                    for (let y in d )
                    {
                        trendDeviationDataRaw.push({"x": y, "y": d[y]})
                    }
                });
                trendDeviationDataRaw.sort(function(a, b) {
                    return Number(a.x) - Number(b.x);
                });

                // The Positive Deviations
                for (let g = 0; g < trendDeviationDataRaw.length; g++) {
                    trendPositiveDeviation.push({
                        "x":trendDeviationDataRaw[g].x,
                        "y":(Number(trendDataRaw[g].y) + Number(trendDeviationDataRaw[g].y))
                    });
                }

                // The Negative Deviations
                for (let g = 0; g < trendDeviationDataRaw.length; g++) {
                    trendNegativeDeviation.push({
                        "x":trendDeviationDataRaw[g].x,
                        "y":(Number(trendDataRaw[g].y) - Number(trendDeviationDataRaw[g].y))
                    });
                }

                trendData.push(
                    {
                        name: "Base Value",
                        values: trendDataRaw,
                        circleRadius: Number(5)
                    },
                    {
                        name: "Positive",
                        values: trendPositiveDeviation,
                        circleRadius: Number(1)
                    },
                    {
                        name: "Negative",
                        values: trendNegativeDeviation,
                        circleRadius: Number(1)
                    }
                )
            }

        }

        let LineChart = rd3.LineChart;

        let lineChart = (
            <LineChart
                data={trendData}
                title={chartTitle} legend={true}
                width={600} height={400}
                yAxisLabel="Amount" yAxisLabelOffset={Number(50)}
                xAxisLabel="Time" xAxisLabelOffset={Number(50)}
                gridHorizontal={true} gridVertical={true}
                hoverAnimation={true}
                colors={d3.scale.category10()}
                margins={{top: 10, right: 120, bottom: 50, left: 100}}
            />
        );

        return (
            <div>{lineChart}</div>
        )
    }
}

export default RegionChart;