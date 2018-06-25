import React, { Component } from 'react';
import rd3 from 'react-d3';
import {
    Card, CardHeader, CardTitle, CardText, CardMedia, Icon
} from 'react-mdc-web';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BoxAndWhisker from '../components/BoxAndWhisker';
import styles from '../styles/detail.css';
import mainStyles from '../styles/main.css'

let LineChart = rd3.LineChart;


class ChartMultiLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openInfoButton: false
        };
    }

    render() {

        // Up to three parameters on one graph
        let loopValues = [];
        let lineDataValues = {};
        let lineData = [];
        let {params, interval_val} = this.props;
        let chartTitle = ' | ';
        let param_name = '';
        let title_param_name = '';
        let param_color = '';
        let legend_box = [];
        let BAWValues = [];
        let boxAndWhiskers = [];
        let colorsRange = ["#FF6600", "#006600", "#000099"];
        const that = this;
        legend_box = legend_box.concat("Legend: ").concat('\n');

        params.map(p => {
            const parameter = this.props.category_parameters.find(x => x.name === p);
            loopValues = [];
            lineDataValues = {};
            BAWValues = [];

            if(this.props.sensorData[p]) {
                let sensor_data =  this.props.sensorData[p];
                if(this.props.filterBySeason) {
                    const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                    sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
                }
                sensor_data.map(function(d) {
                    const datapoint_date = that.props.filterBySeason ? new Date(d.label.substring(0, 4)): new Date(d.label);
                    if(datapoint_date.getTime() > that.props.selectedStartDate.getTime() &&
                        datapoint_date.getTime() < that.props.selectedEndDate.getTime()) {

                        loopValues.push({x: datapoint_date, y: d.average});
                        BAWValues.push(d.average);
                    }
                });
                param_name = parameter.title;
                param_color = colorsRange[params.indexOf(p)];
                lineDataValues = {
                    name: param_name,
                    values: loopValues
                };
                lineData.push(lineDataValues);
                boxAndWhiskers.push(
                    <BoxAndWhisker key={param_name}
                                   paramName={param_name}
                                   paramValues={BAWValues}
                                   paramColor={param_color}/>
                );
                title_param_name = param_name + ' | ';
                chartTitle = chartTitle.concat(title_param_name);
                legend_box = legend_box.concat(<li key={param_name} style={{'color': param_color}}>{param_name}</li>)
            }
        });

        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={6}>
                    <Card className={styles.card_margins}>
                        <CardHeader>
                            <CardTitle>
                                <span className={styles.card_title_style}>{chartTitle}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardMedia>
                            <LineChart
                                data={lineData}
                                width={500} height={300}
                                xAxisLabel="Time"
                                xAxisLabelOffset={Number(50)}
                                viewBoxObject={{x: 0, y: 0, width: 700, height: 400}}
                                colors={d3.scale.quantize().domain([0, 1, 2]).range(colorsRange)}
                                xAxisTickInterval={{unit: 'year', interval: Number(interval_val)}}
                            />
                        </CardMedia>
                        <CardText>
                            {legend_box}
                        </CardText>
                    </Card>
                </Col>
                <Col md={6}>
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

export default ChartMultiLine;
