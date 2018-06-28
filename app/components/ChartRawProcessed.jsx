import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {
    Card, CardHeader, CardTitle, CardText, CardMedia,
    Dialog, DialogBody, DialogHeader, DialogTitle, Icon
} from 'react-mdc-web';
import {getProcessedProperty} from '../utils/getConfig';
import styles from "../styles/detail.css";
import BoxAndWhisker from '../components/BoxAndWhisker';


class ChartRawProcessed extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let ChartType = rd3.ScatterChart;
        if (this.props.displayLines === true) {
            ChartType = rd3.LineChart;
        }

        let param_name = this.props.title;
        let BAWValues = [];
        let boxAndWhiskers = [];
        const that = this;

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
        if(this.props.sensorData[this.props.parameter]) {
            let sensor_data = this.props.sensorData[this.props.parameter];
            if(this.props.filterBySeason) {
                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }
            sensor_data.map(function(d) {
                let datapoint_date = that.props.filterBySeason ? new Date(d.label.substring(0, 4)): new Date(d.label);
                if(datapoint_date.getTime() > that.props.selectedStartDate.getTime() &&
                    datapoint_date.getTime() < that.props.selectedEndDate.getTime()) {
                    if (d[processedProperty] === 0 || processedProperty === '') {
                        valuesLevel0.push({x: datapoint_date, y: d.average})
                    }
                    if (d[processedProperty] === 1) {
                        valuesLevel1.push({x: datapoint_date, y: d.average})
                    }
                    if (d[processedProperty] === 2) {
                        valuesLevel2.push({x: datapoint_date, y: d.average})
                    }
                    if (d[processedProperty] === 3) {
                        valuesLevel3.push({x: datapoint_date, y: d.average})
                    }
                    BAWValues.push(d.average);
                }
            });
            boxAndWhiskers.push(
                <BoxAndWhisker key={param_name}
                               paramName={param_name}
                               paramValues={BAWValues}
                               paramColor={'#000000'}/>
            );
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
        } else {
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
        } else {
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
        } else {
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

        const units = this.props.unit === "" ? "Value" : this.props.unit;
        const chartTitle = this.props.title;

        let {interval_val} = this.props;

        return (
            <Row>
                <Col md={8}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            <span className={styles.rawProcessedLineChart}>
                                <ChartType
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
                        </div>
                        <div className={styles.float_item_left}>
                            <Card className={styles.card_margins}>
                                <CardText>
                                    {boxAndWhiskers}
                                </CardText>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        );

    }
}

export default ChartRawProcessed;
