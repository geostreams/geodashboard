import React, {Component} from "react";
import { Row } from 'react-flexbox-grid';
import Chart from './Chart';
import ChartRawProcessed from './ChartRawProcessed';
import ChartMobile from './ChartMobile';
import Spinner from './Spinner';
import {getMobileSizeMax, getShowRawProcessed} from "../utils/getConfig";
import {getIntervalValue} from "../utils/graphUtils";
import mainStyles from '../styles/main.css'

class LineChart extends Component {

    componentWillMount() {
        this.props.loadSensor(null, this.props.sensor.name, this.props.filterBySeason);
    }

    render() {
        if(Object.keys(this.props.sensorData).length === 0) {
            return (
                <Spinner/>
            )
        }
        const {sensor, selected_parameters, num_years} = this.props;
        let charts=[];
        if(sensor) {
            const interval_val = getIntervalValue(num_years);

            selected_parameters.map(parameter => {
                if (screen.width > getMobileSizeMax()) {
                    if (getShowRawProcessed() === true) {
                        charts.push(<Row key={parameter}>
                            <ChartRawProcessed interval_val={interval_val}
                                               selectedStartDate={this.props.selectedStartDate}
                                               selectedEndDate={this.props.selectedEndDate}
                                               filterBySeason={this.props.filterBySeason}
                                               selectedSeason={this.props.selectedSeason}
                                               id={sensor.name} parameter={parameter} sensorData={this.props.sensorData}/>
                        </Row>)
                    } else {
                        charts.push(<Row key={parameter} className={mainStyles.fullWidth}>
                            <Chart interval_val={interval_val} title={parameter.title}
                                   selectedStartDate={this.props.selectedStartDate}
                                   selectedEndDate={this.props.selectedEndDate}
                                   filterBySeason={this.props.filterBySeason}
                                   selectedSeason={this.props.selectedSeason}
                                   category_parameters={this.props.category_parameters}
                                   parameterSources={this.props.parameterSources}
                                   id={sensor.name} param={parameter} sensorData={this.props.sensorData}/></Row>)
                    }
                } else {
                    charts.push(<Row key={parameter}>
                        <ChartMobile interval_val={interval_val} title={parameter.title}
                                     id={sensor.name} param={parameter} sensorData={this.props.sensorData}/></Row>)
                }

            })

        }
        return (
            <Row className={mainStyles.fullWidth}>
                {charts}
            </Row>
        );
    }

}

export default LineChart;
