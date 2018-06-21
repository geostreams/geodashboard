import React, {Component} from "react";
import ChartMultiLine from '../components/ChartMultiLine';
import {Row} from 'react-flexbox-grid';

class StackedLineChart extends Component {

    componentWillMount() {
        this.props.loadSensor(null, this.props.sensor.name);
    }

    render() {
        const {sensor, selected_parameters, num_years, sensorData} = this.props;
        let charts = [];
        if(sensor) {
            let interval_val = 5;
            if (num_years <= 5) {
                interval_val = 1;
            }
            if(selected_parameters.length > 0) {
                charts.push(<Row key='multi-line-chart'>
                    <ChartMultiLine
                        sensorData={sensorData}
                        interval_val={interval_val}
                        id={sensor.name}
                        params={selected_parameters}
                        num_params={selected_parameters.length}
                        open_box_and_whiskers={this.props.open_box_and_whiskers}
                    />
                </Row>)
            }
        }

        return (
            <div>
            {charts}
            </div>
        );
    }

}

export default StackedLineChart;
