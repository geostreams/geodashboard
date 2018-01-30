import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardTitle} from 'react-mdc-web';
import {getParameterName} from '../utils/getConfig';
import styles from '../styles/detail.css';


let LineChart = rd3.LineChart;

class ChartMobile extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let values = [];
        let chartTitle = '';
        let unitIndex = -1;
        let units = '';
        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            chartTitle = getParameterName(this.props.param);
            unitIndex = chartTitle.lastIndexOf("(");
            if (unitIndex == -1) {
                units = 'Amount';
            } else {
                units = chartTitle.substr(unitIndex);
            }
            this.props.sensorData[this.props.param].map(
                d => {
                    let makeValueX;
                    makeValueX = new Date(d.label);
                    values.push({x: makeValueX, y: d.average})
                }
            );
        }

        let subtitleText = '';

        if(values.length == 0 ){
            values.push({x: 0, y: 0});
            subtitleText = (
                <div className={styles.noData}>No Data to Display for {getParameterName(this.props.param)}</div>
            );
        }

        let lineData = [
            {
                values: values
            },
        ];

        let lineChartObject;

        if(values.length > 0 && subtitleText.length < 1){
            lineChartObject = (
                <Col md={10}>
                    {subtitleText}
                    <LineChart
                        data={lineData}
                        width={800} height={600}
                        margins={{top: 10, right: 150, bottom: 100, left: 150}}
                        title={getParameterName(this.props.param)}
                        yAxisLabel={units} yAxisLabelOffset={Number(120)}
                        xAxisLabel="Time" xAxisLabelOffset={Number(75)}
                        gridHorizontal={true} gridVertical={true}
                        hoverAnimation={true}
                        xAxisTickInterval={{unit: 'day', interval: 4}}
                    />
                </Col>
            );
        } else {
            lineChartObject = (
                <Col md={10}>
                    {subtitleText}
                </Col>
            );
        }

        return (
            <Row>
                {lineChartObject}
            </Row>

        )
    }
}

export default ChartMobile;
