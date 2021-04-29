/*
 * @flow
 */

import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {getProcessedProperty} from '../utils/getConfig';
import styles from "../styles/detail.css";
import RawProcessedLine from "./RawProcessedLine";
import BoxAndWhiskers from '../components/BoxAndWhiskers';


class ChartRawProcessed extends Component {
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

        let units = this.props.units;
        let param_name = this.props.title;
        let BAWValues = [];
        let boxAndWhiskers = [];
        const that = this;

        // Initialize for all 4 possible levels of processing
        let valuesLevel0 = [];
        let valuesLevel1 = [];
        let valuesLevel2 = [];
        let valuesLevel3 = [];
        let valuesPoints = [];

        // This is passed to the Chart Component
        let lineData = [];

        // Range of colors
        let colorsRange = ["#FF6600", "#008000", "#800080", "#000000"];

        // The property name we are looking for to style the lines
        let processedProperty = getProcessedProperty();

        // Getting the datapoints for parameter
        if (this.props.sensorData[this.props.param]) {
            let sensor_data = this.props.sensorData[this.props.param];
            if (this.props.filterBySeason) {
                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }
            sensor_data.map(function (d) {
                const datapoint_date = new Date(d.date);
                if (datapoint_date.getTime() > that.props.selectedStartDate.getTime() &&
                    datapoint_date.getTime() < that.props.selectedEndDate.getTime()) {
                    if (d[processedProperty] === 0 || processedProperty.length === 0) {
                        valuesLevel0.push({date: datapoint_date, average: d.average});
                        valuesPoints.push({date: datapoint_date, average: d.average, color: colorsRange[0]});
                    }
                    if (d[processedProperty] === 1) {
                        valuesLevel1.push({date: datapoint_date, average: d.average});
                        valuesPoints.push({date: datapoint_date, average: d.average, color: colorsRange[1]});
                    }
                    if (d[processedProperty] === 2) {
                        valuesLevel2.push({date: datapoint_date, average: d.average});
                        valuesPoints.push({date: datapoint_date, average: d.average, color: colorsRange[2]});
                    }
                    if (d[processedProperty] === 3) {
                        valuesLevel3.push({date: datapoint_date, average: d.average});
                        valuesPoints.push({date: datapoint_date, average: d.average, color: colorsRange[3]});
                    }
                    BAWValues.push(d.average);
                }
            });
            boxAndWhiskers.push(
                <BoxAndWhiskers key={param_name}
                                data={BAWValues}
                                startAtZero={this.props.startAtZero}
                />
            );
        }

        // Give default values if empty
        if (valuesPoints.length !== 0) {
            valuesPoints = valuesPoints.sort(function (a, b) {
                return a.date - b.date;
            });
        }
        if (valuesLevel0.length !== 0) {
            valuesLevel0 = valuesLevel0.sort(function (a, b) {
                return a.date - b.date;
            });
            lineData.push(
                {
                    name: "Level 0",
                    values: valuesLevel0,
                    color: colorsRange[0],
                })
        }
        if (valuesLevel1.length !== 0) {
            valuesLevel1 = valuesLevel1.sort(function (a, b) {
                return a.date - b.date;
            });
            lineData.push(
                {
                    name: "Level 1",
                    values: valuesLevel1,
                    color: colorsRange[1],
                })
        }
        if (valuesLevel2.length !== 0) {
            valuesLevel2 = valuesLevel2.sort(function (a, b) {
                return a.date - b.date;
            });
            lineData.push(
                {
                    name: "Level 2",
                    values: valuesLevel2,
                    color: colorsRange[2],
                })
        }
        if (valuesLevel3.length !== 0) {
            valuesLevel3 = valuesLevel3.sort(function (a, b) {
                return a.date - b.date;
            });
            lineData.push(
                {
                    name: "Level 3",
                    values: valuesLevel3,
                    color: colorsRange[3],
                })
        }

        if (lineData.length === 0) {
            lineData.push(
                {
                    name: "No Data",
                    values: [{date: 0, average: 0}],
                    color: "#FFFFFF",
                })
        }

        return (
            <Row>
                <Col md={8}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            <RawProcessedLine data={lineData}
                                              pointData={valuesPoints}
                                              yAxisLabel={units}
                                              selectedStartDate={this.props.selectedStartDate}
                                              selectedEndDate={this.props.selectedEndDate}
                                              startAtZero={this.props.startAtZero}
                                              title={param_name}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={4} className={styles.float_item_left}>
                    {boxAndWhiskers}
                </Col>
            </Row>
        );

    }
}

export default ChartRawProcessed;