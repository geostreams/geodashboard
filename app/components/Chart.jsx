import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardTitle} from 'react-mdc-web';
import {getParameterName, getAlternateParameters} from '../utils/getConfig';
import styles from "../styles/detail.css";
let LineChart = rd3.LineChart;

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let values = [];
        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            this.props.sensorData[this.props.param].filter(p => p.label.includes("spring"))
                .map(function(d) {
                    values.push({x: new Date(d.label.substring(0, 4)), y: d.average});
                });
        }
        if(values.length === 0 ){
            values.push({x: 0, y: 0})
        }
        let lineData = [
            {
                values: values
            },
        ];

        // Get Units for Chart
        let unitIndex;
        let units = "Value";
        if (this.props.param) {
            let chartTitle = this.props.param;
            unitIndex = chartTitle.lastIndexOf(" ");
            units = chartTitle.substr(unitIndex + 1);
        }

        return (
            <Row>
                <Col md={8}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            <LineChart
                                data={lineData}
                                width={500} height={400}
                                margins={{top: 10, right: 150, bottom: 50, left: 100}}
                                viewBoxObject={{x: 0, y: 0, width: 700, height: 400}}
                                title={getParameterName(this.props.param, getAlternateParameters())}
                                yAxisLabelOffset={Number(60)}
                                yAxisLabel={units}
                                xAxisLabelOffset={Number(50)}
                                xAxisLabel="Time"
                                xAxisTickInterval={{unit: 'year'}}
                            />
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle> Box and Whisker holder</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        )

    }
}

export default Chart;
