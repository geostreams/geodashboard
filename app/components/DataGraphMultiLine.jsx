import React, {Component} from 'react';
import ChartMultiLine from '../containers/ChartMultiLine';
import {Row} from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import {
    getParameterName, getAlternateParameters, getDetailPageCombinedInfoText
} from '../utils/getConfig';
import {Checkbox, FormField, label} from 'react-mdc-web';
import DetailPageContents from './DetailPageContents';


class DataGraphMultiLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paramListSelect: []
        };
    }

    componentWillMount() {
        const { loadSensor } = this.props;
        loadSensor(null, this.props.sensorName);
    }

    handleSelectParam(event) {
        let paramsList = this.state.paramListSelect;

        if (paramsList.includes(event.target.value)) {
            let index = paramsList.indexOf(event.target.value);
            paramsList.splice(index, 1);
        } else {
            if (paramsList.length < 3) {
                paramsList.push(event.target.value);
            }
        }

        this.setState({paramListSelect: paramsList});
    };

    render() {
        let paralist = [];
        let charts = [];
        let sensor = this.props.property.find(x => x.name === this.props.sensorName);

        if (sensor) {

            sensor.parameters.map(p => {
                if (getParameterName(p, getAlternateParameters()) != null) {
                    let paramChecked = this.state.paramListSelect.includes(p);
                    let checkboxDisabled = false;
                    if (paramChecked === false && this.state.paramListSelect.length >= 3) {
                        checkboxDisabled = true;
                    }
                    paralist.push(
                        <span key={p}>
                            <FormField id={p} key={p}>
                                <Checkbox onChange={this.handleSelectParam.bind(this)}
                                          value={p} key={p} name="param" checked={paramChecked}
                                          disabled={checkboxDisabled ? "disabled" : false}
                                />
                                <label>{getParameterName(p, getAlternateParameters())}</label>
                            </FormField>
                            <br/>
                        </span>
                    );
                }

            });

            if (this.state.paramListSelect.length !== 0) {
                charts.push(
                    <Row key='multi-line-chart'>
                        <ChartMultiLine
                            id={this.props.sensorName}
                            params={this.state.paramListSelect}
                            num_params={this.state.paramListSelect.length}
                        />
                    </Row>
                )
            }

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
                paramInfoText={getDetailPageCombinedInfoText()}
                charts={charts} paralist={paralist}
            />
        );
    }
}

export default DataGraphMultiLine;
