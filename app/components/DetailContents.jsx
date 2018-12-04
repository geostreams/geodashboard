import React, {Component} from 'react';
import DialogWrapper from './DialogWrapper';
import MiniMap from '../components/MiniMap';
import DetailParameterList from './DetailParameterList';
import LineChart from './LineChart';
import StackedLineChart from './StackedLineChart';
import StackedBarChart from './StackedBarChart';
import styles from '../styles/detail.css';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Checkbox, FormField, Icon} from 'react-mdc-web';
import {
    getMobileSizeMax, getDetailPageSeparateInfoText, getDetailPageCombinedInfoText, getTimeSeriesZeroStart,
    getDetailPageBAWInfoText, getChartLineDefault, getChartLineChoice, getStartAtZeroChoice,
    getUseSameTimescaleChoice, getTimeSeriesSensorExtent
} from '../utils/getConfig';
import Select from './material/Select';
import DateSlider from "./DateSlider";
import DetailPageDownload from "../containers/DetailPageDownload";
import {detailSeasonBins, detailSeasonBinsSources} from '../utils/getConfig';


let moment = require('moment');

class DetailContents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openParameterDialog: false,
            openBoxAndWhiskerDialog: false,
            selected_parameters: [],
            selectedStartDate: new Date(props.sensor.min_start_time),
            selectedEndDate: new Date(props.sensor.max_end_time),
            showSeasonFilter: false,
            selectedSeason: "",
            displayLines: getChartLineDefault(),
            startAtZero: getTimeSeriesZeroStart(),
            sameTimeScale: getTimeSeriesSensorExtent(),
            selectAllDates: true,
            binType: "year"
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
        this.updateBinningType = this.updateBinningType.bind(this);
        this.startAtZero = this.startAtZero.bind(this);
        this.sameTimeScale = this.sameTimeScale.bind(this);
        this.selectAllDates = this.selectAllDates.bind(this);
    }

    componentWillMount() {
        this.updateParametersAndSeason(this.props);
        this.updateBinningType(this.state.selectedStartDate, this.state.selectedEndDate);
    }

    componentWillReceiveProps(newProps) {
        this.updateParametersAndSeason(newProps);
    }

    onChangeSeason(event) {
        if (this.state.showSeasonFilter) {
            const value = event.target.options[event.target.selectedIndex].value;
            this.setState({selectedSeason: value});
        }
    }

    updateParametersAndSeason(newProps) {
        const {sensor} = newProps;
        let use_season = detailSeasonBins();
        if (
            use_season === true && sensor && sensor.properties &&
            detailSeasonBinsSources().includes(sensor.properties.type.id.toLowerCase())
        ) {
            this.setState({showSeasonFilter: true});
        }
        // Note: Stacked_line has a limit of 3 parameters that the user should select
        if (newProps.chart_type !== 'stacked_line') {
            const all_parameters = newProps.category_parameters.map(parameter => {
                return parameter.name
            });
            this.setState({selected_parameters: all_parameters})
        } else {
            this.setState({selected_parameters: []})
        }
    }

    static getBinType(diff_years, diff_days) {
        let binType = "day";
        if (diff_years > 10) {
            binType = "year";
        } else if (diff_years > 2 && diff_years <= 10) {
            binType = "month";
        } else if (diff_days > 3 && diff_days <= 14) {
            binType = "hour";
        }

        return binType;
    }

    updateBinningType(start_date, end_date) {
        let start_moment = moment(start_date);
        let end_moment = moment(end_date);
        let diff_days = end_moment.diff(start_moment, 'days');
        let diff_years = end_moment.diff(start_moment, 'years');
        let binType = DetailContents.getBinType(diff_years, diff_days);

        if (this.state.binType !== binType) {
            this.props.loadSensor(this.props.sensor.id, this.props.sensor.name, this.state.showSeasonFilter, binType,
                start_date, end_date);
            this.setState({binType: binType})
        }
    }

    onSliderChange(value) {
        this.setState({selectedStartDate: value[0], selectedEndDate: value[1]});
        if (value[0].getTime() !== new Date(this.props.sensor.min_start_time).getTime() ||
            value[1].getTime() !== new Date(this.props.sensor.max_end_time).getTime()) {
            this.setState({selectAllDates: false});
        }
        if (value[0].getTime() === new Date(this.props.sensor.min_start_time).getTime() &&
            value[1].getTime() === new Date(this.props.sensor.max_end_time).getTime()) {
            this.setState({selectAllDates: true});
        }
        this.updateBinningType(value[0], value[1]);
    }

    selectAllDates() {
        this.setState({
            selectedStartDate: new Date(this.props.sensor.min_start_time),
            selectedEndDate: new Date(this.props.sensor.max_end_time),
            selectAllDates: true
        })
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
        if (idx === -1) {
            new_parameters.push(parameter);
        } else {
            new_parameters.splice(idx, 1);
        }

        this.setState({selected_parameters: new_parameters.sort()});
    }

    displayChartLines() {
        this.setState({displayLines: !this.state.displayLines})
    };

    startAtZero() {
        this.setState({startAtZero: !this.state.startAtZero})
    }

    sameTimeScale() {
        this.setState({sameTimeScale: !this.state.sameTimeScale})
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
        let filters;

        // Set up the variables for the slider
        const minDate = new Date(sensor.min_start_time);
        const maxDate = new Date(sensor.max_end_time);
        const selected_start = this.state.selectedStartDate;
        const selected_end = this.state.selectedEndDate;

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
                                           closeDialog={this.closeBoxAndWhiskerDialog}
                            />
                        </h3>
                    </Col>
                );

                let season_filter;
                if (this.state.showSeasonFilter) {
                    // Setup the filter for region. Do more stuff
                    season_filter = (<div className={styles.filterPadding}>
                        <span className={[styles.filterTitle, styles.season_margin].join(" ")}> Season </span><br/>
                        <Select className={styles.season_margin} value={this.props.season}
                                onChange={this.onChangeSeason}>
                            <option value="spring" key="spring"> Spring</option>
                            <option value="summer" key="summer"> Summer</option>
                        </Select>
                    </div>);
                }

                let displayLineCheckbox;
                if (getChartLineChoice()) {
                    displayLineCheckbox =
                        <FormField id="displayLines" key="displayLines">
                            <Checkbox onChange={this.displayChartLines}
                                      value="displayLines" key="displayLines" name="displayLines" id="displayLines"
                                      checked={this.state.displayLines}
                            />
                            <label>Display Graph Lines</label>
                        </FormField>;
                }
                let startAtZeroCheckbox;
                if (getStartAtZeroChoice()) {
                    startAtZeroCheckbox = <FormField id="startAtZero" key="startAtZero">
                        <Checkbox onChange={this.startAtZero}
                                  value="startAtZero" key="startAtZero" name="startAtZero" id="startAtZero"
                                  checked={this.state.startAtZero}
                        />
                        <label>Start Data at Zero</label>
                    </FormField>;
                }
                let useSameTimescaleCheckbox;
                if (getUseSameTimescaleChoice() && chart_type !== "stacked_line") {
                    useSameTimescaleCheckbox =
                        <FormField id="sameTimescale" key="sameTimescale">
                            <Checkbox onChange={this.sameTimeScale}
                                      value="sameTimescale" key="sameTimescale" name="sameTimescale" id="sameTimescale"
                                      checked={this.state.sameTimeScale}
                            />
                            <label>Use Same Timescale</label>
                        </FormField>;
                }

                let graphOptions = (
                    <Col md={3} className={styles.filterPadding}>
                        <span className={styles.filterTitle}> Graph Options </span><br/>
                        <Row>
                            {displayLineCheckbox}
                            {startAtZeroCheckbox}
                            {useSameTimescaleCheckbox}
                        </Row>
                    </Col>
                );

                filters = (
                    <Row key="detail_filters" around="xs" className={styles.filterBackground}>
                        <Col md={2}>
                            {season_filter}
                        </Col>
                        <Col md={5}>
                            <div className={styles.filterTitle}> Date Range</div>
                            < FormField id="selectAllDates" key="selectAllDates">
                                <Checkbox onChange={this.selectAllDates}
                                          value="selectAllDates" key="selectAllDates" name="selectAllDates"
                                          id="selectAllDates"
                                          checked={this.state.selectAllDates}
                                />
                                <label>Select All Dates</label>
                            </FormField>
                            <br/>
                            <DateSlider start={minDate} end={maxDate}
                                        selectedStart={selected_start} selectedEnd={selected_end}
                                        onSliderChange={this.onSliderChange}
                            />
                        </Col>
                        {graphOptions}


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
            if (chart_type === "time") {
                graph = <LineChart sensorName={sensor.name} sensor={sensor}
                                   sensorData={this.props.sensorData}
                                   parameterSources={this.props.parameterSources}
                                   selectedStartDate={selected_start}
                                   selectedEndDate={selected_end}
                                   filterBySeason={this.state.showSeasonFilter}
                                   selectedSeason={this.state.selectedSeason}
                                   num_years={num_years}
                                   loadSensor={this.props.loadSensor}
                                   category_parameters={this.props.category_parameters}
                                   selected_parameters={this.state.selected_parameters}
                                   displayLines={this.state.displayLines}
                                   binType={this.state.binType}
                                   startAtZero={this.state.startAtZero}
                                   sameTimeScale={this.state.sameTimeScale}

                />;
            } else if (chart_type === "stacked_line") {
                graph = <StackedLineChart sensorName={sensor.name} sensor={sensor}
                                          sensorData={this.props.sensorData}
                                          parameterSources={this.props.parameterSources}
                                          selectedStartDate={selected_start}
                                          selectedEndDate={selected_end}
                                          filterBySeason={this.state.showSeasonFilter}
                                          selectedSeason={this.state.selectedSeason}
                                          num_years={num_years}
                                          loadSensor={this.props.loadSensor}
                                          category_parameters={this.props.category_parameters}
                                          selected_parameters={this.state.selected_parameters}
                                          displayLines={this.state.displayLines}
                                          binType={this.state.binType}
                                          startAtZero={this.state.startAtZero}
                />;
                parameter_dialog_contents = getDetailPageCombinedInfoText();
                max_parameters = 3;

            } else if(chart_type === "stacked_bar") {
                graph = <StackedBarChart sensorName={sensor.name} sensor={sensor}
                                         sensorData={this.props.sensorData}
                                         selectedStartDate={selected_start}
                                         selectedEndDate={selected_end}
                                         filterBySeason={this.state.showSeasonFilter}
                                         selectedSeason={this.state.selectedSeason}
                                         category_parameters={this.props.category_parameters}
                                         selected_parameters={this.state.selected_parameters}
                                         loadSensor={this.props.loadSensor}

                />;
                box_and_whiskers_header = "";
            } else {
                graph = <div> Coming Soon</div>
            }
        }

        return (
            <div>
                {filters}
                <Grid fluid>
                    <Row key="detail_contents" around="xs">
                        <Col md={3}>
                            <Row key="parameter_title" className={styles.parameters_list}>
                                <h3>Selected Parameters
                                    <DialogWrapper title={parameter_dialog_title}
                                                   body={parameter_dialog_contents}
                                                   isOpen={this.openParameterDialog}
                                                   closeDialog={this.closeParameterDialog}
                                    />
                                </h3>
                            </Row>
                            <Row key="parameter_list" className={styles.parameters_list}>
                                <DetailParameterList sensor={sensor}
                                                     category_parameters={this.props.category_parameters}
                                                     selected_parameters={this.state.selected_parameters}
                                                     handleSelectParam={this.handleSelectedParameter}
                                                     maxParameters={max_parameters}/>
                            </Row>
                            {mini_map_object}
                        </Col>
                        <Col md={8}>
                            <Row key="paramChartTitle" className={styles.parameters_chart_title}>
                                <Col md={8}>
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
            </div>
        );

    }

}

export default DetailContents;