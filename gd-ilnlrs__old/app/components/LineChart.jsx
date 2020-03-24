/*
* @flow
*/

import React, {Component} from "react";
import {Row} from 'react-flexbox-grid';
import Chart from './Chart';
import ChartRawProcessed from './ChartRawProcessed';
import ChartMobile from './ChartMobile';
import Spinner from './Spinner';
import {getMobileSizeMax, getShowRawProcessed} from "../utils/getConfig";
import {getIntervalValue} from "../utils/graphUtils";
import mainStyles from '../styles/main.css';


class LineChart extends Component {

    componentWillMount() {
        this.props.loadSensor(null, this.props.sensor.name, this.props.filterBySeason, this.props.binType,
            this.props.selectedStartDate, this.props.selectedEndDate);
    }

    render() {
        if (Object.keys(this.props.sensorData).length === 0) {
            return (
                <Spinner/>
            )
        }
        const {sensor, selected_parameters, num_years} = this.props;
        let charts = [];
        if (sensor) {
            const interval_val = getIntervalValue(num_years);

            selected_parameters.map(parameter_id => {
                const parameter = this.props.category_parameters.find(x => x.name === parameter_id);
                if (parameter) {
                    if (screen.width > getMobileSizeMax()) {
                        if (getShowRawProcessed() === true) {
                            charts.push(<Row key={parameter_id}>
                                <ChartRawProcessed interval_val={interval_val}
                                                   title={parameter.title}
                                                   units={parameter.unit}
                                                   selectedStartDate={this.props.selectedStartDate}
                                                   selectedEndDate={this.props.selectedEndDate}
                                                   filterBySeason={this.props.filterBySeason}
                                                   selectedSeason={this.props.selectedSeason}
                                                   category_parameters={this.props.category_parameters}
                                                   parameterSources={this.props.parameterSources}
                                                   displayLines={this.props.displayLines}
                                                   binType={this.props.binType}
                                                   id={sensor.name} param={parameter_id}
                                                   sensorData={this.props.sensorData}
                                                   startAtZero={this.props.startAtZero}
                                                   sameTimeScale={this.props.sameTimeScale}
                                />
                            </Row>)
                        } else {
                            charts.push(<Row key={parameter_id} className={mainStyles.fullWidth}>
                                <Chart interval_val={interval_val}
                                       title={parameter.title}
                                       units={parameter.unit}
                                       selectedStartDate={this.props.selectedStartDate}
                                       selectedEndDate={this.props.selectedEndDate}
                                       filterBySeason={this.props.filterBySeason}
                                       selectedSeason={this.props.selectedSeason}
                                       category_parameters={this.props.category_parameters}
                                       parameterSources={this.props.parameterSources}
                                       displayLines={this.props.displayLines}
                                       binType={this.props.binType}
                                       id={sensor.name} param={parameter_id} sensorData={this.props.sensorData}
                                       startAtZero={this.props.startAtZero}
                                       sameTimeScale={this.props.sameTimeScale}
                                />
                            </Row>)
                        }
                    } else {
                        charts.push(<Row key={parameter_id}>
                            <ChartMobile interval_val={interval_val}
                                         title={parameter.title}
                                         id={sensor.name} param={parameter_id} sensorData={this.props.sensorData}
                            />
                        </Row>)
                    }
                }
            });

        }
        return (
            <Row className={mainStyles.fullWidth}>
                {charts}
            </Row>
        );
    }

}

export default LineChart;
