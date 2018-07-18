import React, {Component} from 'react';
import DialogWrapper from './DialogWrapper';
import MiniMap from '../components/MiniMap';
import DetailParameterList from './DetailParameterList';
import LineChart from './LineChart';
import StackedLineChart from './StackedLineChart';
import styles from '../styles/detail.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Checkbox, FormField, Icon} from 'react-mdc-web';
import {
    getMobileSizeMax, getDetailPageSeparateInfoText, getDetailPageCombinedInfoText,
    getDetailPageBAWInfoText, getChartLineDefault, getChartLineChoice
} from '../utils/getConfig';
import Select from './material/Select';
import DateSlider from "./DateSlider";
import DetailPageDownload from "../containers/DetailPageDownload";


class DetailContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openParameterDialog: false,
            openBoxAndWhiskerDialog: false,
            selected_parameters: [],
            selectedStartDate: new Date(0),
            selectedEndDate: new Date(0),
            showSeasonFilter: false,
            selectedSeason: "",
            displayLines: getChartLineDefault()
        };
        this.closeParameterDialog = this.closeParameterDialog.bind(this);
        this.openParameterDialog = this.openParameterDialog.bind(this);
        this.openBoxAndWhiskerDialog = this.openBoxAndWhiskerDialog.bind(this);
        this.closeBoxAndWhiskerDialog = this.closeBoxAndWhiskerDialog.bind(this);
        this.handleSelectedParameter = this.handleSelectedParameter.bind(this);
        this.updateParametersAndSeason = this.updateParametersAndSeason.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onChangeSeason = this.onChangeSeason.bind(this);
        this.displayChartLines = this.displayChartLines.bind(this);
    }

    componentWillMount() {
        this.updateParametersAndSeason(this.props);
    }

    componentWillReceiveProps(newProps) {

        this.updateParametersAndSeason(newProps)
    }

    onChangeSeason(event) {
        if(this.state.showSeasonFilter) {
            const value = event.target.options[event.target.selectedIndex].value;
            this.setState({selectedSeason: value});
        }

    }

    updateParametersAndSeason(newProps){
        const {sensor} = newProps;
        if(sensor && sensor.properties && sensor.properties.type.id.toLowerCase() === "epa") {
            this.setState({showSeasonFilter: true});
        }
        // Note: Stacked_line has a limit of 3 parameters that the user should select
        if(newProps.chart_type !== 'stacked_line') {
            const all_parameters = newProps.category_parameters.map(parameter => {return parameter.name} );
            this.setState({selected_parameters: all_parameters})
        } else {
            this.setState({selected_parameters: []})
        }
    }

    onSliderChange(value) {
        this.setState({selectedStartDate: value[0], selectedEndDate: value[1]})
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

    displayChartLines() {
        const checkbox = document.getElementById('displayLines');
        if (checkbox.checked === true) {
            this.setState({displayLines: true});
        } else {
            this.setState({displayLines: false});
        }
    };

    render() {

        const parameter_dialog_title = "Selected Parameters";
        const box_and_whisker_title = "Box and Whisker Plots ";

        let parameter_dialog_contents = getDetailPageSeparateInfoText();
        const box_and_whisker_contents = getDetailPageBAWInfoText();
        let max_parameters = 0;
        let mini_map_object, box_and_whiskers_header;
        let {sensor, chart_type} = this.props;
        let graph = {};
        let filters;
        // Set up the variables for the slider
        const minDate = new Date(sensor.min_start_time);
        const maxDate = new Date(sensor.max_end_time);
        const selected_start = this.state.selectedStartDate.getTime() === new Date(0).getTime() ? minDate : this.state.selectedStartDate;
        const selected_end = this.state.selectedEndDate.getTime() === new Date(0).getTime() ? maxDate: this.state.selectedEndDate;

        if (sensor) {
            // These calculations determine the X-Axis interval for the graphs
            let start_year = selected_start.getFullYear();
            let end_year = selected_end.getFullYear();
            let num_years = end_year - start_year;

            let center = sensor.geometry.coordinates.slice(0, 2);
            if (screen.width > getMobileSizeMax()) {
                mini_map_object = (
                    <Row key="miniMap" className={styles.parameters_list}>
                        <MiniMap sensor={sensor} center={center}/>
                    </Row>
                );
                box_and_whiskers_header = (
                    <Col md={4}>
                        <h3>Box and Whiskers
                            <DialogWrapper title={box_and_whisker_title}
                                           body={box_and_whisker_contents}
                                           isOpen={this.openBoxAndWhiskerDialog}
                                           closeDialog ={this.closeBoxAndWhiskerDialog}
                            />
                        </h3>
                    </Col>
                );

                let season_filter;
                if(this.state.showSeasonFilter) {
                    // Setup the filter for region. Do more stuff
                    season_filter = (<div>
                        <span className={styles.season_label}> Season </span>
                        <Select value={this.props.season} onChange={this.onChangeSeason} >
                            <option value="spring" key="spring"> Spring </option>
                            <option value="summer" key="summer"> Summer </option>
                        </Select>
                    </div>);
                }

                filters = (
                    <Row key="detail_filters" around="xs">
                        <Col md={3}>
                            {season_filter}
                        </Col>
                        <Col md={7}>
                            <DateSlider start={minDate} end={maxDate}
                                        selectedStart={selected_start} selectedEnd={selected_end}
                                        onSliderChange={this.onSliderChange}
                            />
                        </Col>
                        <Col md={2}>
                            <DetailPageDownload
                                selected_parameters={this.state.selected_parameters}
                                sensor_id={sensor.id}
                                selected_start_date={selected_start}
                                selected_end_date={selected_end}
                            />
                        </Col>
                    </Row>
                )

            }
            if(chart_type === "time") {
                graph = <LineChart sensorName={sensor.name} sensor={sensor}
                                   sensorData={this.props.sensorData}
                                   parameterSources={this.props.parameterSources}
                                   selectedStartDate={selected_start}
                                   selectedEndDate={selected_end}
                                   filterBySeason={this.state.showSeasonFilter}
                                   selectedSeason={this.state.selectedSeason}
                                   num_years ={num_years}
                                   loadSensor={this.props.loadSensor}
                                   category_parameters={this.props.category_parameters}
                                   selected_parameters={this.state.selected_parameters}
                                   displayLines={this.state.displayLines}
                />;
            } else if(chart_type === "stacked_line") {
                graph = <StackedLineChart sensorName={sensor.name} sensor={sensor}
                                          sensorData={this.props.sensorData}
                                          selectedStartDate={selected_start}
                                          selectedEndDate={selected_end}
                                          num_years ={num_years}
                                          filterBySeason={this.state.showSeasonFilter}
                                          selectedSeason={this.state.selectedSeason}
                                          loadSensor={this.props.loadSensor}
                                          category_parameters={this.props.category_parameters}
                                          selected_parameters={this.state.selected_parameters}
                                          displayLines={this.state.displayLines}
                />;
                parameter_dialog_contents = getDetailPageCombinedInfoText();
                max_parameters = 3;

            } else {
                graph= <div> Coming Soon</div>
            }
        }

        let displayLinesChoice = <div> </div>;
        if (getChartLineChoice() === true) {
            displayLinesChoice =
                <FormField id="displayLines" key="displayLines">
                    <Checkbox onChange={this.displayChartLines}
                              value="displayLines" key="displayLines" name="displayLines" id="displayLines"
                              checked={this.state.displayLines}
                    />
                    <label>Display Graph Lines</label>
                </FormField>;
        }

        return (
            <Grid fluid>
                {filters}
                <Row key="detail_contents" around="xs">
                    <Col md={3}>
                        <Row key="parameter_title" className={styles.parameters_list} >
                            <h3>Selected Parameters
                                <DialogWrapper title={parameter_dialog_title}
                                               body={parameter_dialog_contents}
                                               isOpen={this.openParameterDialog}
                                               closeDialog ={this.closeParameterDialog}
                                />
                            </h3>
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
                            <Col md={8}>
                            <h3>Parameter Charts</h3>
                            </Col>
                            {box_and_whiskers_header}
                        </Row>
                        <Row>
                            {displayLinesChoice}
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
