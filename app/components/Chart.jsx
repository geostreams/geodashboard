import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Row, Col } from 'react-flexbox-grid';
import {
    Card, CardHeader, CardTitle, CardText, CardMedia, Icon
} from 'react-mdc-web';
import {
    getParameterName, getAlternateParameters, getDetailPageBAWInfoText
} from '../utils/getConfig';
import styles from "../styles/detail.css";
import mainStyles from '../styles/main.css'
import BoxAndWhisker from '../components/BoxAndWhisker';

let LineChart = rd3.LineChart;


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openInfoButton: false
        };
    }

    render() {

        let param_name;
        let BAWValues = [];
        let boxAndWhiskers = [];

        let values = [];
        let that = this;
        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            param_name = getParameterName(this.props.param, getAlternateParameters());
            let sensor_data =  this.props.sensorData[this.props.param];

            if(this.props.filterBySeason) {

                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }
            sensor_data.map(function(d) {
                    const bin_date = that.props.filterBySeason ? new Date(d.label.substring(0, 4)): new Date(d.label);
                    if(bin_date.getTime() > that.props.selectedStartDate.getTime() &&
                    bin_date.getTime() < that.props.selectedEndDate.getTime()) {
                        values.push({x: bin_date, y: d.average});
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
        if(values.length === 0 ){
            values.push({x: 0, y: 0})
        }
        let lineData = [
            {
                values: values
            },
        ];

        // Get Units for Chart
        let units = 'Value';
        let chartTitle = getParameterName(this.props.param, getAlternateParameters());
        let unitIndex = chartTitle.lastIndexOf("(");
        if (unitIndex > 0) {
            units = chartTitle.substr(unitIndex);
        }

        let {interval_val} = this.props;

        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={6}>
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
                                xAxisTickInterval={{unit: 'year', interval: Number(interval_val)}}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={6} className={styles.float_item_left}>
                    <Card className={styles.card_margins}>
                        <CardText>
                            {boxAndWhiskers}
                        </CardText>
                    </Card>
                </Col>
            </Row>
        )

    }
}

export default Chart;
