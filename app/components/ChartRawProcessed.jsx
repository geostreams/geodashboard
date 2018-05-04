import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardTitle} from 'react-mdc-web';
import {
    getParameterName, getAlternateParameters, getProcessedProperty
} from '../utils/getConfig';
let LineChart = rd3.LineChart;
import styles from "../styles/detail.css";


class ChartRawProcessed extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        // Initialize for all 4 possible levels of processing
        let valuesLevel0 = [];
        let valuesLevel1 = [];
        let valuesLevel2 = [];
        let valuesLevel3 = [];

        // This is passed to the Chart Component
        let lineData = [];

        // Range of colors
        let colorsRange = ["#FF6600", "#008000", "#800080", "#000000"];

        // The property name we are looking for to style the lines
        let processedProperty = getProcessedProperty();

        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            this.props.sensorData[this.props.param].map(function(d) {
                let datepoint_date = new Date(d.label);
                if (d[processedProperty] === 0 || processedProperty === '') {
                    valuesLevel0.push({x: datepoint_date, y: d.average})
                }
                if (d[processedProperty] === 1) {
                    valuesLevel1.push({x: datepoint_date, y: d.average})
                }
                if (d[processedProperty] === 2) {
                    valuesLevel2.push({x: datepoint_date, y: d.average})
                }
                if (d[processedProperty] === 3) {
                    valuesLevel3.push({x: datepoint_date, y: d.average})
                }
            });
        }

        // Give default values if empty
        if (valuesLevel0.length === 0) {
            let index = colorsRange.indexOf("#FF6600");
            if (index >=0) {
                colorsRange.splice(index, 1);
            }
        } else {
            lineData.push(
                {
                    name: "Level 0",
                    values: valuesLevel0,
                    strokeWidth: 3,
                    strokeDashArray: "3",
                })
        }
        if (valuesLevel1.length === 0) {
            let index = colorsRange.indexOf("#008000");
            if (index >=0) {
                colorsRange.splice(index, 1);
            }
        }else {
            lineData.push(
                {
                    name: "Level 1",
                    values: valuesLevel1,
                    strokeWidth: 3,
                    strokeDashArray: "2",
                })
        }
        if (valuesLevel2.length === 0) {
            let index = colorsRange.indexOf("#800080");
            if (index >=0) {
                colorsRange.splice(index, 1);
            }
        }else {
            lineData.push(
                {
                    name: "Level 2",
                    values: valuesLevel2,
                    strokeWidth: 3,
                    strokeDashArray: "1",
                })
        }
        if (valuesLevel3.length === 0) {
            let index = colorsRange.indexOf("#000000");
            if (index >=0) {
                colorsRange.splice(index, 1);
            }
        }else {
            lineData.push(
                {
                    name: "Level 3",
                    values: valuesLevel3,
                    strokeWidth: 3,
                    strokeDashArray: "0",
                })
        }

        if (lineData.length === 0) {
            lineData.push(
                {
                    name: "No Data",
                    values: [{x: 0, y: 0}],
                })
        }

        let units = 'Value';
        let chartTitle = getParameterName(this.props.param, getAlternateParameters());
        let unitIndex = chartTitle.lastIndexOf("(");
        if (unitIndex > 0) {
            units = chartTitle.substr(unitIndex);
        }

        let {interval_val} = this.props;

        let chartData = (
            <Row>
                <Col md={8}>
                    <span className={styles.rawProcessedLineChart}>
                    <LineChart
                        legend={true}
                        data={lineData}
                        width={700} height={400}
                        margins={{top: 10, right: 150, bottom: 50, left: 100}}
                        viewBoxObject={{x: 0, y: 0, width: 700, height: 400}}
                        title={chartTitle}
                        yAxisLabel={units} yAxisLabelOffset={Number(50)}
                        xAxisLabel="Time" xAxisLabelOffset={Number(50)}
                        xAxisTickInterval={{unit: 'year', interval: Number(interval_val)}}
                        colors={d3.scale.quantize().domain([0, 1, 3]).range(colorsRange)}
                    />
                    </span>
                </Col>
            </Row>
        );

        return (chartData)
    }
}

export default ChartRawProcessed;
