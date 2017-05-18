import React, { Component } from 'react';
import rd3 from 'react-d3';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import {getParameterName} from '../utils/getConfig'

var LineChart = rd3.LineChart;

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        var values = [];
        // Getting the datapoints for parameter: this.props.param
        if(this.props.sensorData[this.props.param]) {
            this.props.sensorData[this.props.param].filter(p => p.label.includes("spring")).map(
                d => values.push({x: parseInt(d.label), y: d.average})
            );
        }
        if(values.length == 0 ){
            values.push({x: 0, y: 0})
        }
        var lineData = [
            {
                values: values
            },
        ];

        return (
            <Row>
                <Col md={8}>
                <LineChart
                    data={lineData}
                    width='100%'
                    height={400}
                    viewBoxObject={{
                        x: 0,
                        y: 0,
                        width: 700,
                        height: 400
                      }}
                    title={getParameterName(this.props.param)}
                    yAxisLabel="Altitude"
                    xAxisLabel="Elapsed Time (sec)"
                    //domain={{x: [,10], y: [0,]}}
                />
             </Col>
                <Col md={3}
                     style={{"align-items":"center"}}
                >
                    <Card >
                        <CardHeader
                            title="box and Whisker holder"
                        />
                    </Card>
                    </Col>
            </Row>

        )
    }
}

export default Chart;