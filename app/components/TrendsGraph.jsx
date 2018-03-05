/*
 * @flow
 */

import React, { Component } from 'react';
import LineChartWithDeviations from './LineChartWithDeviations';
import {getAlternateParameters, getParameterName} from '../utils/getConfig';

class TrendsGraph extends Component {
    constructor(props: Object) {
        super(props);
    }

    componentWillMount() {
        this.props.loadDetailSensor(this.props.trends_parameter, this.props.trends_season, this.props.trends_region_id)
    }

    render() {
        let that = this;
        let chartTitle = 'No Chosen Parameter';
        let pageSettings = this.props.trends_settings;
        let unitIndex;
        let units;
        if (pageSettings) {
            pageSettings.map(p => {
                if (p.parameter.id == this.props.trends_parameter) {
                    chartTitle = p.parameter.title;
                    unitIndex = chartTitle.lastIndexOf(" ");
                    units = chartTitle.substr(unitIndex + 1);
                }
            })
        }

        let dataRaw = [];
        let trend = this.props.trends_regions.find(function(element) {
            return element !== undefined && element.name === that.props.trends_region_id;
        });
        // convert the array to a single object.
        let trends_detail ={};
        trend.trends_detail.map( d =>
            trends_detail = Object.assign({}, trends_detail, d)
        );
        let trends_deviation = {};

        trend.trends_deviation.map( d =>
            trends_deviation = Object.assign({}, trends_deviation, d)
        );
        // Add Values
        Object.keys(trends_detail).forEach(function(key) {
            dataRaw.push({"x": parseInt(key), "y": parseFloat(trends_detail[key]), "d": parseFloat(trends_deviation[key])})
        });

        dataRaw.sort(function (a, b) {
            return Number(a.x) - Number(b.x);
        });
	    const alternateParameters = getAlternateParameters();
        return (
            <div>
                <LineChartWithDeviations
                    width={800} height={600}
                    margins={{top: 10, right: 10, bottom: 50, left: 60}}
                    chartData={dataRaw}
                    xScale= 'linear'
                    xLabel= "Year"
                    yScale='linear'
                    yLabel={getParameterName(this.props.trends_parameter, alternateParameters)}
                />
            </div>
        )

    }
}

export default TrendsGraph;
