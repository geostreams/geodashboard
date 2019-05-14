/*
 * @flow
 */

import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import mainStyles from '../styles/main.css'
import BoxAndWhiskers from '../components/BoxAndWhiskers';
import LinePlot from './LinePlot';
import LineNoData from './LineNoData';


class Chart extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            openInfoButton: false
        };
    }

    state: {
        openInfoButton: boolean
    };

    render() {

        let chartData = '';
        let BAWValues = [];
        let boxAndWhiskers = [];
        const {units, title} = this.props;
        let values = [];
        let that = this;

        // Getting the datapoints for parameter: this.props.param
        if (this.props.sensorData[this.props.param]) {
            let sensor_data = this.props.sensorData[this.props.param];

            if (this.props.filterBySeason) {
                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }

            sensor_data.map(function (d) {
                const bin_date = new Date(d.date);
                if (bin_date.getTime() > that.props.selectedStartDate.getTime() &&
                    bin_date.getTime() < that.props.selectedEndDate.getTime()) {
                    values.push({date: bin_date, average: d.average});
                    BAWValues.push(d.average);
                }
            });

            boxAndWhiskers.push(
                <BoxAndWhiskers key={title}
                                data={BAWValues}
                                startAtZero={this.props.startAtZero}
                />
            );
        }

        let sources = [];
        if (this.props.parameterSources) {
            sources = this.props.parameterSources[this.props.param];
        }

        if (values.length === 0) {
            values.push({date: new Date(0), average: 0});
            boxAndWhiskers = '';
            chartData = (
                <LineNoData data={values}
                            yAxisLabel={units}
                            title={title}
                />
            );
        } else {
            chartData = (
                <LinePlot data={values}
                      selectedStartDate={this.props.selectedStartDate}
                      selectedEndDate={this.props.selectedEndDate}
                      yAxisLabel={units}
                      displayLines={this.props.displayLines}
                      title={title}
                      sources={sources}
                      startAtZero={this.props.startAtZero}
                      sameTimeScale={this.props.sameTimeScale}
                      binType={this.props.binType}
                />
            );
        }

        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={10}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            {chartData}
                        </div>
                    </div>
                </Col>
                <Col md={2} className={styles.float_item_left}>
                    {boxAndWhiskers}
                </Col>
            </Row>
        )

    }
}

export default Chart;