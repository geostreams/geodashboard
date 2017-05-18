import React, {Component} from 'react'
import Chart from '../containers/Chart'
import MiniMap from '../components/MiniMap'
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from "../styles/detail.css"
import {getParameterName} from '../utils/getConfig'

class DataGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paralistselect: []
        };
    }

    componentWillMount() {
        const { loadSensor } = this.props;
        loadSensor(null, this.props.sensorName);
    }

    handleSelectParam = () => {
        var paralistselect = [];
        var checkboxes = document.querySelectorAll('input[name=param]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            paralistselect.push(checkboxes[i].value);
        }

        this.setState({paralistselect: paralistselect});
    }

    render() {
        let sensor = this.props.property.find(x => x.name == this.props.sensorName);
        var center = [0,1];
        if(sensor && sensor.geometry && sensor.geometry.coordinates){
            center =  sensor.geometry.coordinates.slice(0,2);
        }

        let paralist = [];
        let charts = [];

        if (sensor) {
            sensor.parameters.map(p => {
                if (getParameterName(p) != null) {
                    paralist.push(<Checkbox name="param" key={p} label={getParameterName(p)} value={p}
                                                    defaultChecked={true} onCheck={this.handleSelectParam}/>)

                    if (this.state.paralistselect.length == 0 || this.state.paralistselect.indexOf(p) > -1) {
                        charts.push(<Row key={p}>
                                <Chart id={this.props.sensorName} param={p}/></Row>)
                    }

                }

            })

        } else {
            paralist = <div></div>;
            charts = <div></div>;
        }


        return (
            <Grid fluid>
                <Row key="a">
                    <h1>{this.props.sensorName}</h1>
                </Row>
                <Row key="b"  around="xs">
                    <Col md={3}>
                        <Row key="1" className={styles.parameters_list} >
                            <h3>Selected Parameters</h3>
                        </Row>
                        <Row key="2" className={styles.parameters_list} >
                            <div>
                                {paralist}
                            </div>
                        </Row>
                        <Row key="3" className={styles.parameters_list}>
                            <MiniMap sensor={sensor} center={center} />
                        </Row>
                    </Col>

                    <Col md={8}>
                        {charts}
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default DataGraph