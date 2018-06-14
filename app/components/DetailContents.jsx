import React, {Component} from 'react';
import DialogWrapper from './DialogWrapper';
import MiniMap from '../components/MiniMap';
import DetailParameterList from './DetailParameterList';
import LineChart from '../containers/LineChart';
import StackedLineChart from '../containers/StackedLineChart';
import styles from '../styles/detail.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Icon} from 'react-mdc-web';
import {getMobileSizeMax, getDetailPageSeparateInfoText, getDetailPageCombinedInfoText,
    getDetailPageBAWInfoText} from '../utils/getConfig';

class DetailContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openParameterDialog: false,
            openBoxAndWhiskerDialog: false,
            selected_parameters: []
        };
        this.closeParameterDialog = this.closeParameterDialog.bind(this);
        this.openParameterDialog = this.openParameterDialog.bind(this);
        this.openBoxAndWhiskerDialog = this.openBoxAndWhiskerDialog.bind(this);
        this.closeBoxAndWhiskerDialog = this.closeBoxAndWhiskerDialog.bind(this);
        this.handleSelectedParameter = this.handleSelectedParameter.bind(this);
        this.updateSelectedParameters = this.updateSelectedParameters.bind(this);
    }

    componentWillMount() {
        this.updateSelectedParameters(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.updateSelectedParameters(newProps)
    }

    updateSelectedParameters(newProps){
        // Note: Stacked_line has a limit of 3 parameters that the user should select
        if(newProps.chart_type !== 'stacked_line') {
            const all_parameters = newProps.category_parameters.map(parameter => {return parameter.name} );
            this.setState({selected_parameters: all_parameters})
        } else {
            this.setState({selected_parameters: []})
        }
    }

    closeParameterDialog() {
        this.setState({openParameterDialog: false})
    }

    openParameterDialog() {
        this.setState({openParameterDialog: true})
    }

    closeBoxAndWhiskerDialog() {
        this.setState({openBoxAndWhiskerDialog: false})
    }

    openBoxAndWhiskerDialog() {
        this.setState({openBoxAndWhiskerDialog: true})
    }

    handleSelectedParameter(parameter) {
        let new_parameters = Object.assign([], this.state.selected_parameters);
        const idx = this.state.selected_parameters.indexOf(parameter);
        if( idx === -1) {
           new_parameters.push(parameter);
        } else {
            new_parameters.splice(idx, 1);
        }

        this.setState({selected_parameters: new_parameters.sort()});
    }

    render() {

        const parameter_dialog_title = "Selected Parameters";
        const box_and_whisker_title = "Box and Whisker Plots ";

        let parameter_dialog_contents = getDetailPageSeparateInfoText();
        const box_and_whisker_contents = getDetailPageBAWInfoText();
        let max_parameters = 0;
        let mini_map_object, box_and_whiskers_header;
        let {sensor, chart_type} = this.props;
        let graph = {};
        if (sensor) {
            // These calculations determine the X-Axis interval for the graphs
            let start_year = new Date(sensor.min_start_time).getFullYear();
            let end_year = new Date(sensor.max_end_time).getFullYear();
            let num_years = end_year - start_year;

            let center = sensor.geometry.coordinates.slice(0, 2);
            if (screen.width > getMobileSizeMax()) {
                mini_map_object = (
                    <Row key="miniMap" className={styles.parameters_list}>
                        <MiniMap sensor={sensor} center={center}/>
                    </Row>
                );
                box_and_whiskers_header = (
                    <Col md={6}>
                        <h3>Box and Whiskers <a className={styles.open_button_style_baw}
                                                onClick={this.openBoxAndWhiskerDialog}>
                            <Icon name="info"/>
                        </a> </h3>
                    </Col>
                )
            }
            if(chart_type === "time") {
                graph = <LineChart sensorName={sensor.name} sensor={sensor}
                                   sensorData={this.props.sensorData}
                                   num_years ={num_years}
                                   category_parameters={this.props.category_parameters}
                                   selected_parameters={this.state.selected_parameters}/>;
            } else if(chart_type === "stacked_line") {
                graph = <StackedLineChart sensorName={sensor.name} sensor={sensor}
                                          sensorData={this.props.sensorData}
                                          num_years ={num_years}
                                          category_parameters={this.props.category_parameters}
                                          selected_parameters={this.state.selected_parameters}/>;
                parameter_dialog_contents = getDetailPageCombinedInfoText();
                max_parameters = 3;

            } else {
                graph= <div> Coming Soon</div>
            }
        }

        return (
            <Grid fluid>
                <DialogWrapper title={parameter_dialog_title} body={parameter_dialog_contents} isOpen={this.state.openParameterDialog}
                closeDialog ={this.closeParameterDialog}/>
                <DialogWrapper title={box_and_whisker_title} body={box_and_whisker_contents} isOpen={this.state.openBoxAndWhiskerDialog}
                               closeDialog ={this.closeBoxAndWhiskerDialog}/>
                <Row key="detail_contents" around="xs">
                    <Col md={3}>
                        <Row key="parameter_title" className={styles.parameters_list} >
                            <h3>Selected Parameters</h3>
                            <a className={styles.open_button_style}
                               onClick={this.openParameterDialog}>
                                <Icon name="info"/>
                            </a>
                        </Row>
                        <Row key="parameter_list" className={styles.parameters_list} >
                            <DetailParameterList sensor={sensor}
                                                 category_parameters={this.props.category_parameters}
                                                 selected_parameters={this.state.selected_parameters}
                                                 handleSelectParam={this.handleSelectedParameter}
                                                 maxParameters={max_parameters}/>
                        </Row>
                        {mini_map_object}
                    </Col>
                    <Col md={8}>
                        <Row key="paramChartTitle" className={styles.parameters_chart_title} >
                            <Col md={6}>
                            <h3>Parameter Charts</h3>
                            </Col>
                            {box_and_whiskers_header}
                        </Row>
                        <Row className={styles.parameters_chart_positioning}>
                            {graph}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default DetailContents;
