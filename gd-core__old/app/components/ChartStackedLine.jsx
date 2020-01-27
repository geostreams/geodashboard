/*
 * @flow
 */

import React, {Component} from 'react';
import {Subheading2} from 'react-mdc-web/lib';
import {Row, Col} from 'react-flexbox-grid';
import BoxAndWhisker from '../components/BoxAndWhisker';
import styles from '../styles/detail.css';
import mainStyles from '../styles/main.css';
import StackedLine from "./StackedLine";
import {handleParamsWithItalics} from "../utils/configUtils";


class ChartStackedLine extends Component {
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

        // Up to three parameters on one graph
        let loopValues = [];
        let lineDataValues = {};
        let lineData = [];
        let {params} = this.props;
        let chartTitle = [];
        let param_name = '';
        let title_param_name = '';
        let param_color = '';
        let BAWValues = [];
        let boxAndWhiskers = [];
        let colorsRange = ["#FF6600", "#006600", "#000099"];
        const that = this;
        chartTitle = chartTitle.concat(" | ");

        params.map(p => {
            const parameter = this.props.category_parameters.find(x => x.name === p);
            loopValues = [];
            lineDataValues = {};
            BAWValues = [];

            if (this.props.sensorData[p]) {
                let sensor_data = this.props.sensorData[p];
                if (this.props.filterBySeason) {
                    const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                    sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
                }
                sensor_data.map(function (d) {
                    const datapoint_date = new Date(d.date);
                    if (datapoint_date.getTime() > that.props.selectedStartDate.getTime() &&
                        datapoint_date.getTime() < that.props.selectedEndDate.getTime()) {
                        loopValues.push({date: datapoint_date, average: d.average});
                        BAWValues.push(d.average);
                    }
                });

                param_name = handleParamsWithItalics(parameter.title);
                param_color = colorsRange[params.indexOf(p)];

                loopValues = loopValues.sort(function (a, b) {
                    return a.date - b.date;
                });

                lineDataValues = {
                    name: param_name,
                    color: param_color,
                    values: loopValues
                };
                lineData.push(lineDataValues);
                boxAndWhiskers.push(
                    <BoxAndWhisker key={param_name}
                                   paramName={param_name}
                                   paramValues={BAWValues}
                                   paramColor={param_color}/>
                );
                title_param_name = param_name.toString() + ' | ';
                chartTitle = chartTitle
                    .concat(<span key={param_name} style={{'color': param_color}}>{param_name}</span>)
                    .concat(" | ");
            }
        });

        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={8}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            <Subheading2 className={styles.parameters_chart_subheading}>{chartTitle}</Subheading2>
                            <StackedLine data={lineData}
                                         selectedStartDate={this.props.selectedStartDate}
                                         selectedEndDate={this.props.selectedEndDate}
                                         startAtZero={this.props.startAtZero}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={4} className={styles.float_item_left}>
                    {boxAndWhiskers}
                </Col>
            </Row>
        )

    }
}

export default ChartStackedLine;