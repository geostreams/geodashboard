import React, {Component} from "react";
import { Row } from 'react-flexbox-grid';
import Chart from './Chart';
import ChartRawProcessed from './ChartRawProcessed';
import ChartMobile from './ChartMobile';
import {getMobileSizeMax, getShowRawProcessed} from "../utils/getConfig";
import {getIntervalValue} from "../utils/graphUtils"

class LineChart extends Component {

    componentWillMount() {
        this.props.loadSensor(null, this.props.sensor.name);
    }

    render() {
        const {sensor, selected_parameters, num_years} = this.props;
        let charts=[];
        if(sensor) {
            const interval_val = getIntervalValue(num_years);

            selected_parameters.map(parameter => {
                if (screen.width > getMobileSizeMax()) {
                    if (getShowRawProcessed() === true) {
                        charts.push(<Row key={parameter}>
                            <ChartRawProcessed interval_val={interval_val}
                                               id={sensor.name} parameter={parameter} sensorData={this.props.sensorData}/>
                        </Row>)
                    } else {
                        charts.push(<Row key={parameter}>
                            <Chart interval_val={interval_val} title={parameter.title}
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
            <div>
                {charts}
            </div>
        );
    }

}

export default LineChart;
