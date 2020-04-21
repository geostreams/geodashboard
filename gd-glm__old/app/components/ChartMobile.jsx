/*
 * @flow
 */

import React, {Component} from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardTitle} from 'react-mdc-web/lib';
import styles from '../styles/detail.css';
let LineChart = rd3.LineChart;

class ChartMobile extends Component {
    constructor(props: Object) {
        super(props);
    }

    render() {

        let values = [];
        const {title, units} = this.props;

        let unitIndex = -1;
        // Getting the datapoints for parameter: this.props.param
        if (this.props.sensorData[this.props.param]) {
            this.props.sensorData[this.props.param].map(
                d => {
                    let makeValueX;
                    makeValueX = new Date(d.label);
                    values.push({x: makeValueX, y: d.average})
                }
            );
        }

        let subtitleText = '';

        if (values.length === 0) {
            values.push({x: 0, y: 0});
            subtitleText = (
                <div className={styles.noData}>No Data to Display for {title}</div>
            );
        }

        let lineData = [
            {
                values: values
            },
        ];

        let lineChartObject;

        // $FlowFixMe
        if (values.length > 0 && subtitleText.length < 1) {
            lineChartObject = (
                <Row>
                    <Col md={10} className={styles.positionChart}>
                        {subtitleText}
                        <LineChart
                            data={lineData}
                            width={800} height={600}
                            margins={{top: 10, right: 50, bottom: 100, left: 200}}
                            title={title}
                            yAxisLabel={units} yAxisLabelOffset={Number(150)}
                            xAxisLabel="Time (last two weeks)" xAxisLabelOffset={Number(75)}
                            gridHorizontal={true} gridVertical={true}
                            hoverAnimation={true}
                            xAxisTickInterval={{unit: 'week', interval: 1}}
                        />
                    </Col>
                </Row>
            );
        } else {
            lineChartObject = (
                <Row>
                    <Col md={10}>
                        {subtitleText}
                    </Col>
                </Row>
            );
        }

        return (lineChartObject)
    }
}

export default ChartMobile;
