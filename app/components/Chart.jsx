import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {
    Card, CardHeader, CardTitle, CardText, CardMedia, Icon
} from 'react-mdc-web';
import {
    getParameterName, getAlternateParameters
} from '../utils/getConfig';
import styles from "../styles/detail.css";
import mainStyles from '../styles/main.css'
import BoxAndWhisker from '../components/BoxAndWhisker';
import Line from './Line';


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openInfoButton: false
        };
    }

    render() {

        let selected_parameter = this.props.category_parameters.find(x => x.name === this.props.param);
        let BAWValues = [];
        let boxAndWhiskers = [];
        let param_name;
        let values = [];
        let that = this;
        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            param_name = selected_parameter.title;
            let sensor_data =  this.props.sensorData[this.props.param];

            if(this.props.filterBySeason) {

                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }

            sensor_data.map(function(d) {
                    const bin_date = that.props.filterBySeason ? new Date(d.label.substring(0, 4)): new Date(d.label);
                    if(bin_date.getTime() > that.props.selectedStartDate.getTime() &&
                    bin_date.getTime() < that.props.selectedEndDate.getTime()) {
                        values.push({date: bin_date, average: d.average});
                        BAWValues.push(d.average);
                    }

            });
            if(values.length === 0) {
                return (<div></div>);
            }

            boxAndWhiskers.push(
                <BoxAndWhisker key={param_name}
                               paramName={param_name}
                               paramValues={BAWValues}
                               paramColor={'#000000'}/>
            );
        }
        if(values.length === 0 ){
            values.push({date: new Date(0), average: 0})
        }

        // Get Units for Chart
        let units = selected_parameter.unit;
        let chartTitle = selected_parameter.title;
        if(units !== "") {
             chartTitle += " (" + units + ")";
        }

        let {interval_val} = this.props;
        let sources = [];
        if(this.props.parameterSources) {
            sources = this.props.parameterSources[this.props.param];
        }
        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={6}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            <Line data={values}
                                  class_name_line={styles.graph_line}
                                  class_name_dots={styles.graph_dot}
                                  selectedStartDate={this.props.selectedStartDate}
                                  selectedEndDate={this.props.selectedEndDate}
                                  yAxisLabel={units}
                                  title={chartTitle}
                                  sources={sources}
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
