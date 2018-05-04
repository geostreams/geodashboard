import React, {Component} from 'react';
import Chart from '../containers/Chart';
import ChartRawProcessed from '../containers/ChartRawProcessed';
import ChartMobile from '../containers/ChartMobile';
import {Row} from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import {
    getParameterName, getAlternateParameters, getMobileSizeMax,
    getDetailPageSeparateInfoText, getShowRawProcessed, getRawProcessedInfoText
} from '../utils/getConfig';
import {
    Checkbox, Dialog, DialogBody, DialogHeader, DialogTitle,
    FormField, Icon, label, List, ListItem
} from 'react-mdc-web';
import DetailPageContents from './DetailPageContents';


class DataGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paralistselect: [],
            openInfoButton: false
        };
        (this:any).handleInfoIcon = this.handleInfoIcon.bind(this);
    }

    handleInfoIcon(button_status: boolean) {
        this.setState({
            openAboutButton: button_status
        });
    };

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
        let info_box_data = '';

        if (getShowRawProcessed()) {
            let info_text = [];

            getRawProcessedInfoText().map(value => {
                info_text.push(<ListItem>{value.listText}</ListItem>);
            });

            info_box_data = (
                <div>
                    <Dialog open={Boolean(this.state.openAboutButton)}
                            onClose={()=>{this.setState({openAboutButton:false})}}>
                        <DialogHeader >
                            <DialogTitle>Levels of Processing</DialogTitle>
                            <a className={styles.close_button_style}
                               onClick={()=>{this.setState({openAboutButton: false})}}>
                                <Icon name="close"/>
                            </a>
                        </DialogHeader>
                        <DialogBody >
                            <List>{info_text}</List>
                        </DialogBody>
                    </Dialog>
                    <a className={styles.open_button_style}
                       onClick={this.handleInfoIcon}>
                        <Icon name="info"/>
                    </a>
                </div>
            );
        }

        let charts = [];
        let sensor = this.props.property.find(x => x.name === this.props.sensorName);

        if (sensor) {
            // If there are not selected parameters, we mark all as selected. This was added to mark them all selected
            // on page load, since all the graphs are displayed initially.
            if(this.state.paralistselect.length < 1) {
                this.setState({paralistselect: sensor.parameters })
            }

            // These calculations determine the X-Axis interval for the graphs
            let start_year = new Date(sensor.min_start_time).getFullYear();
            let end_year = new Date(sensor.max_end_time).getFullYear();
            let num_years = end_year - start_year;
            // Set interval
            let interval_val = 5;
            if (num_years <= 5) {
                interval_val = 1;
            }
            if (num_years >= 20) {
                interval_val = 10;
            }
            if (num_years >= 40) {
                interval_val = 20;
            }
            if (num_years >= 100) {
                interval_val = 50;
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
                            if (getShowRawProcessed() === true) {
                                charts.push(<Row key={p}>
                                    <ChartRawProcessed interval_val={interval_val}
                                                       id={this.props.sensorName} param={p}/></Row>)
                            } else {
                                charts.push(<Row key={p}>
                                    <Chart interval_val={interval_val}
                                           id={this.props.sensorName} param={p}/></Row>)
                            }
                        } else {
                            charts.push(<Row key={p}>
                                <ChartMobile interval_val={interval_val}
                                             id={this.props.sensorName} param={p}/></Row>)
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
                paramChartsInfoText={info_box_data}
                charts={charts} paralist={paralist}
            />
        );
    }
}

export default DataGraph;