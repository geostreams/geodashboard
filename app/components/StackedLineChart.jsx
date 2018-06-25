import React, {Component} from "react";
import ChartMultiLine from '../components/ChartMultiLine';
import Spinner from './Spinner';
import {Row} from 'react-flexbox-grid';
import mainStyles from '../styles/main.css'

class StackedLineChart extends Component {

    componentWillMount() {
        this.props.loadSensor(null, this.props.sensor.name, this.props.filterBySeason);
    }

    render() {
        if(Object.keys(this.props.sensorData).length === 0) {
            return (
                <Spinner/>
            )
        }
        const {sensor, selected_parameters, num_years, sensorData} = this.props;
        let charts = [];
        if(sensor) {
            let interval_val = 5;
            if (num_years <= 5) {
                interval_val = 1;
            }
            if(selected_parameters.length > 0) {
                charts.push(<Row key='multi-line-chart' className={mainStyles.fullWidth}>
                    <ChartMultiLine
                        sensorData={sensorData}
                        interval_val={interval_val}
                        id={sensor.name}
                        selectedStartDate={this.props.selectedStartDate}
                        selectedEndDate={this.props.selectedEndDate}
                        filterBySeason={this.props.filterBySeason}
                        selectedSeason={this.props.selectedSeason}
                        params={selected_parameters}
                        num_params={selected_parameters.length}
                        open_box_and_whiskers={this.props.open_box_and_whiskers}
                        category_parameters={this.props.category_parameters}
                    />
                </Row>)
            }
        }

        return (
            <Row className={mainStyles.fullWidth}>
            {charts}
            </Row>
        );
    }

}

export default StackedLineChart;
