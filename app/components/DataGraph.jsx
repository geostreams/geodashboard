import React, {Component} from 'react';
import Chart from '../containers/Chart';
import ChartMobile from '../containers/ChartMobile';
import MiniMap from '../components/MiniMap';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from "../styles/detail.css"
import {getParameterName, getAlternateParameters, getMobileSizeMax} from '../utils/getConfig'
import { Checkbox, FormField, label} from 'react-mdc-web';

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
        const paralistselect = [];
        const checkboxes = document.querySelectorAll('input[name=param]:checked');
        for (let i = 0; i < checkboxes.length; i++) {
            paralistselect.push(checkboxes[i].value);
        }

        this.setState({paralistselect: paralistselect});
    };

    render() {
        let sensor = this.props.property.find(x => x.name == this.props.sensorName);
        let center = [0,1];
        if(sensor && sensor.geometry && sensor.geometry.coordinates){
            center =  sensor.geometry.coordinates.slice(0,2);
        }

        let paralist = [];
        let charts = [];

        if (sensor) {
            // If there are not selected parameters, we mark all as selected. This was added to mark them all selected
            // on page load, since all the graphs are displayed initially.
            if(this.state.paralistselect.length < 1) {
                this.setState({paralistselect: sensor.parameters })
            }

            sensor.parameters.map(p => {
                if (getParameterName(p, getAlternateParameters()) != null) {
                    paralist.push(
                        <span key={p}>
                            <FormField id={p} key={p}>
                                <Checkbox onChange={this.handleSelectParam} value={p} key={p} name="param"
                                          checked={this.state.paralistselect.includes(p)}
                                />
                                <label>{getParameterName(p, getAlternateParameters())}</label>
                            </FormField>
                            <br/>
                        </span>
                    );

                    if (this.state.paralistselect.length == 0 || this.state.paralistselect.indexOf(p) > -1) {
                        if (screen.width > getMobileSizeMax()) {
                            charts.push(<Row key={p}>
                                <Chart id={this.props.sensorName} param={p}/></Row>)
                        } else {
                            charts.push(<Row key={p}>
                                <ChartMobile id={this.props.sensorName} param={p}/></Row>)
                        }
                    }


                }

            })

        } else {
            paralist = <div></div>;
            charts = <div></div>;
        }

        if (paralist.length == 0) {
            paralist = <div className={styles.noData}>No Parameters Available</div>;
        }

        let miniMapObject;
        if (screen.width > getMobileSizeMax()) {
            miniMapObject = (
                <Row key="3" className={styles.parameters_list}>
                    <MiniMap sensor={sensor} center={center} />
                </Row>
            );
        }

        return (
            <Grid fluid>
                <Row key="a">
                    <h1>{this.props.sensorName}</h1>
                </Row>
                <Row key="b" around="xs">
                    <Col md={3}>
                        <Row key="1" className={styles.parameters_list} >
                            <h3>Selected Parameters</h3>
                        </Row>
                        <Row key="2" className={styles.parameters_list} >
                            <div>
                                {paralist}
                            </div>
                        </Row>
                        {miniMapObject}
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