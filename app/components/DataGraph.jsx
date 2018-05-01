import React, {Component} from 'react';
import Chart from '../containers/Chart';
import ChartMobile from '../containers/ChartMobile';
import {Row} from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import {
    getParameterName, getAlternateParameters, getMobileSizeMax, getDetailPageSeparateInfoText
} from '../utils/getConfig';
import {Checkbox, FormField, label} from 'react-mdc-web';
import DetailPageContents from './DetailPageContents';


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
        let paralist = [];
        let charts = [];
        let sensor = this.props.property.find(x => x.name === this.props.sensorName);

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
                    if (this.state.paralistselect.length === 0 || this.state.paralistselect.indexOf(p) > -1) {
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
            paralist = <div> </div>;
            charts = <div> </div>;
        }

        if (paralist.length === 0) {
            paralist = <div className={styles.noData}>No Parameters Available</div>;
        }

        return (
            <DetailPageContents
                sensorInfo={sensor}
                paramInfoText={getDetailPageSeparateInfoText()}
                charts={charts} paralist={paralist}
            />
        );
    }
}

export default DataGraph;