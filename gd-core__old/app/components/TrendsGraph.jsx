/*
 * @flow
 */

import React, {Component} from 'react';
import LineChartWithDeviations from './LineChartWithDeviations';
import {removeItalicsFromParams} from "../utils/configUtils";

const d3 = require('d3');


class TrendsGraph extends Component {

    state: {
        loading: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {

        let that = this;
        const {trends_settings, start_year, end_year, title, units} = this.props;

        let dataRaw = [];
        let trend = this.props.trends_regions.find(function (element) {
            return element !== undefined && element.name === that.props.trends_region_id;
        });
        // convert the array to a single object.
        if (Array.isArray(trend.trends_detail) && Array.isArray(trend.trends_deviation)) {
            let trends_detail = {};
            trend.trends_detail.map(function (d) {
                    trends_detail = Object.assign({}, trends_detail, d)
                }
            );
            let trends_deviation = {};

            trend.trends_deviation.map(d =>
                trends_deviation = Object.assign({}, trends_deviation, d)
            );
            // Add Values
            let parseDate = d3.timeParse("%Y");
            Object.keys(trends_detail).forEach(function (key) {
                if (parseInt(key) >= parseInt(start_year) && parseInt(key) <= parseInt(end_year)) {
                    dataRaw.push({
                        "x": parseDate(key),
                        "y": parseFloat(trends_detail[key]),
                        "d": parseFloat(trends_deviation[key])
                    })
                }
            });

            dataRaw.sort(function (a, b) {
                return Number(a.x) - Number(b.x);
            });
        }

        return (
            <div>
                <LineChartWithDeviations
                    width={800} height={600}
                    margins={{top: 10, right: 10, bottom: 50, left: 60}}
                    chartData={dataRaw}
                    xScale='time'
                    xLabel="Year"
                    yScale='linear'
                    yLabel={removeItalicsFromParams(title)}
                />
            </div>
        )

    }

}

export default TrendsGraph;
