/*
 * @flow
 */


import React, {Component} from 'react';
import Spinner from './Spinner';
import StackedBar from './StackedBar';
import {Row} from 'react-flexbox-grid';
import mainStyles from '../styles/main.css';

class StackedBarChart extends Component {

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
        const {
            sensor, sensorData, selected_parameters, num_years, category_parameters, filterBySeason,
            selectedSeason, selectedStartDate, selectedEndDate
        } = this.props;
        let charts = [];

        if (sensor) {
            selected_parameters.map(parameter_id => {
                const parameter = category_parameters.find(x => x.name === parameter_id);
                if (parameter) {
                    let sensor_data = sensorData[parameter_id];
                    let values = [];
                    if (sensor_data !== undefined) {

                        let selected_season;
                        if (filterBySeason) {

                            selected_season = selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                            sensor_data = sensor_data.filter(p => p.label.includes(selected_season))

                        }
                        sensor_data.map(function (d) {
                            const bin_date = new Date(d.date);
                            if (bin_date.getTime() > selectedStartDate.getTime() &&
                                bin_date.getTime() < selectedEndDate.getTime()) {
                                values.push({date: bin_date, data: d.data});

                            }
                        });
                        charts.push(
                            <Row key={parameter_id} className={mainStyles.fullWidth}>
                                <StackedBar
                                    title={parameter.title}
                                    yAxisLabel={parameter.unit}
                                    selectedStartDate={this.props.selectedStartDate}
                                    selectedEndDate={this.props.selectedEndDate}
                                    filterBySeason={this.props.filterBySeason}
                                    selectedSeason={selected_season}
                                    data={values}
                                    scale_colors={parameter.scale_colors}
                                    scale_names={parameter.scale_names}
                                />
                            </Row>
                        )
                    }
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

export default StackedBarChart;
