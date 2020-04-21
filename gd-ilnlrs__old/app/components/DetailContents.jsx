/*
 * @flow
 */

import React, {Component} from 'react';
import DialogWrapper from './DialogWrapper';
import MiniMap from '../components/MiniMap';
import DetailParameterList from './DetailParameterList';
import LineChart from './LineChart';
import StackedLineChart from './StackedLineChart';
import StackedBarChart from './StackedBarChart';
import styles from '../styles/detail.css';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Checkbox, FormField} from 'react-mdc-web/lib';
import {
    getMobileSizeMax, getDetailPageCombinedInfoText, getTimeSeriesZeroStart,
    getDetailPageBAWInfoText, getChartLineDefault, getChartLineChoice, getStartAtZeroChoice,
    getUseSameTimescaleChoice, getTimeSeriesSensorExtent, getSourceInfo, getSourceName
} from '../utils/getConfig';
import Select from './material/Select';
import DateSlider from "./DateSlider";
import DetailPageDownload from "../containers/DetailPageDownload";
import {detailSeasonBins, detailSeasonBinsSources} from '../utils/getConfig';


let moment = require('moment');

class DetailContents extends Component {

    constructor(props: Object) {
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
        (this: any).closeParameterDialog = this.closeParameterDialog.bind(this);
        (this: any).openParameterDialog = this.openParameterDialog.bind(this);
        (this: any).openBoxAndWhiskerDialog = this.openBoxAndWhiskerDialog.bind(this);
        (this: any).closeBoxAndWhiskerDialog = this.closeBoxAndWhiskerDialog.bind(this);
        (this: any).handleSelectedParameter = this.handleSelectedParameter.bind(this);
        (this: any).updateParametersAndSeason = this.updateParametersAndSeason.bind(this);
        (this: any).onSliderChange = this.onSliderChange.bind(this);
        (this: any).onChangeSeason = this.onChangeSeason.bind(this);
        (this: any).displayChartLines = this.displayChartLines.bind(this);
        (this: any).updateBinningType = this.updateBinningType.bind(this);
        (this: any).startAtZero = this.startAtZero.bind(this);
        (this: any).sameTimeScale = this.sameTimeScale.bind(this);
        (this: any).selectAllDates = this.selectAllDates.bind(this);
    }

    state: {
        openParameterDialog: boolean,
        openBoxAndWhiskerDialog: boolean,
        selected_parameters: [],
        selectedStartDate: Object,
        selectedEndDate: Object,
        showSeasonFilter: boolean,
        selectedSeason: string,
        displayLines: boolean,
        startAtZero: boolean,
        sameTimeScale: boolean,
        selectAllDates: boolean,
        binType: string
    };

    componentWillMount() {
        this.updateParametersAndSeason(this.props);

        // Use URL Dates if they exist
        let initial_start = this.state.selectedStartDate;
        let initial_end = this.state.selectedEndDate;
        if (this.props.start_date) {
            this.setState({selectAllDates: false});
            initial_start = this.props.start_date;
        }
        if (this.props.end_date) {
            this.setState({selectAllDates: false});
            initial_end = this.props.end_date;
        }
        // $FlowFixMe
        this.updateBinningType(new Date(initial_start), new Date(initial_end));
        // $FlowFixMe
        this.onSliderChange([new Date(initial_start), new Date(initial_end)]);
    }

    componentDidUpdate(newProps: Object, oldState: Object) {
        // Make sure the correct Sensor information displays
        if (oldState.sensorID !== newProps.sensorID) {
            let that = this;
            window.onhashchange = function () {
                if (window.location.href.indexOf("detail/location") > -1) {
                    that.props.loadSensor(that.props.sensor.id, that.props.sensor.name, that.state.showSeasonFilter,
                        that.state.binType, that.props.selectedStartDate, that.props.selectedEndDate);
                    that.selectAllDates();
                }
            };
        }

        // Only show ONE miniMap item
        let miniMapID = document.getElementById('miniMap');
        if (miniMapID) {
            let mapElements = miniMapID.getElementsByClassName('ol-viewport');
            for (let i = 1; i < mapElements.length; i++) {
                mapElements[i].style.display = 'none';
            }
        }
    }

    componentWillReceiveProps(newProps: Object) {
        this.updateParametersAndSeason(newProps);
    }

    onChangeSeason(event: Object) {
        if (this.state.showSeasonFilter) {
            const value = event.target.options[event.target.selectedIndex].value;
            this.setState({selectedSeason: value});
        }
    }

    updateParametersAndSeason(newProps: Object) {
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
            // Use URL values if they exist, but preserve working changes as well
            if (this.props.parameters_list && this.props.parameters_list.length >= 1) {
                if (
                    this.state.selected_parameters !== this.props.parameters_list &&
                    this.state.selected_parameters.length !== 0
                ) {
                    this.setState({selected_parameters: this.state.selected_parameters});
                } else {
                    this.setState({selected_parameters: this.props.parameters_list.split(",")});
                }
            } else {
                let index_params = location.hash.indexOf('?params=');
                if (index_params < 1) {
                    let location_hash_reset = location.hash;
                    let params_part = '?params=' + all_parameters.sort();
                    window.history.pushState('', '', location.hash.slice(0, index_params));
                    window.history.pushState('', '', location_hash_reset + params_part);
                }

                this.setState({selected_parameters: all_parameters});
            }
        } else {
            this.setState({selected_parameters: []});
        }
    }

    static getBinType(diff_years, diff_days) {
        let binType = "day";
        if (diff_years > 10) {
            binType = "year";
        } else if (diff_years >= 2 && diff_years <= 10) {
            binType = "month";
        } else if (diff_days > 3 && diff_days <= 14) {
            binType = "hour";
        }

        return binType;
    }

    updateBinningType(start_date: Date, end_date: Date) {
        let start_moment = moment(start_date);
        let end_moment = moment(end_date);
        let diff_days = end_moment.diff(start_moment, 'days');
        let diff_years = end_moment.diff(start_moment, 'years');
        let binType = DetailContents.getBinType(diff_years, diff_days);

        if (this.state.binType !== binType) {
            this.props.loadSensor(this.props.sensor.id, this.props.sensor.name, this.state.showSeasonFilter, binType,
                start_date, end_date);
            this.setState({binType: binType});
        }
    }

    onSliderChange(value: Array<Date>) {
        this.setState({selectedStartDate: value[0], selectedEndDate: value[1]});

        // URL Date Index if it Exists
        let index_dates = location.hash.indexOf('&');
        let update_hash = location.hash;

        if (value[0].getTime() !== new Date(this.props.sensor.min_start_time).getTime() ||
            value[1].getTime() !== new Date(this.props.sensor.max_end_time).getTime()) {
            this.setState({selectAllDates: false});

            // Update URL Dates
            if (index_dates > -1) {
                update_hash = location.hash.slice(0, index_dates);
            }
            let current_href = location.href;
            let time_part =
                '&start=' + value[0].toISOString().split('T')[0] +
                '&end=' + value[1].toISOString().split('T')[0];
            if (current_href.slice(-1) === '/') {
                time_part =
                    '&start=' + value[0].toISOString().split('T')[0] +
                    '&end=' + value[1].toISOString().split('T')[0];
            }
            update_hash = update_hash + time_part;
            window.history.pushState('', '', update_hash);
        } else {
            update_hash = update_hash.slice(0, index_dates);
            window.history.pushState('', '', update_hash);
        }
        if (value[0].getTime() === new Date(this.props.sensor.min_start_time).getTime() &&
            value[1].getTime() === new Date(this.props.sensor.max_end_time).getTime()) {
            this.setState({selectAllDates: true});
            // Remove URL Dates if the full range is selected
            if (index_dates > -1) {
                window.history.pushState('', '', location.hash.slice(0, index_dates));
            }
        }
        this.updateBinningType(value[0], value[1]);
    }

    selectAllDates() {
        let startDate = new Date(this.props.sensor.min_start_time);
        let endDate = new Date(this.props.sensor.max_end_time);

        this.setState({
            selectedStartDate: startDate,
            selectedEndDate: endDate,
            selectAllDates: true,
        });
        this.updateBinningType(startDate, endDate);

        // Remove Dates from the URL if they exist
        let index_dates = location.hash.indexOf('&start=');
        if (index_dates > -1) {
            window.history.pushState('', '', location.hash.slice(0, index_dates));
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

    handleSelectedParameter(parameter: string) {
        // $FlowFixMe
        let new_parameters = Object.assign([], this.state.selected_parameters);
        const idx = this.state.selected_parameters.indexOf(parameter);
        if (idx === -1) {
            new_parameters.push(parameter);
        } else {
            new_parameters.splice(idx, 1);
        }

        this.setState({selected_parameters: new_parameters.sort()});

        // Update the URL with the Selected Parameters, and preserve Dates if they exist
        let current_href = location.href;
        let index_params = location.hash.indexOf('?params=');
        let index_dates = location.hash.indexOf('&start=');
        let location_hash_dates = '';
        let location_hash_params = '';
        if (index_params > -1) {
            location_hash_params = location.hash.slice(0, index_params);
        }
        if (index_dates > -1) {
            location_hash_dates = location.hash.slice(index_dates);
        }
        let location_hash_reset = location.hash;
        if (new_parameters.sort().length > 0) {
            let params_part = '?params=' + new_parameters.sort();
            // Sometimes the URL ends in a slash, and sometimes it does not.
            // We need to account for this when updating the URL.
            if (current_href.slice(-1) === '/') {
                params_part = '?params=' + new_parameters.sort();
            }
            if (index_params > -1) {
                location_hash_reset = location.hash.slice(0, index_params);
                window.history.pushState('', '', location_hash_reset + params_part + location_hash_dates);
            } else if (index_dates > -1) {
                location_hash_reset = location.hash.slice(0, index_dates);
                window.history.pushState('', '', location_hash_reset + params_part + location_hash_dates);
            } else {
                location_hash_reset = location.hash;
                window.history.pushState('', '', location_hash_reset + params_part + location_hash_dates);
            }
        } else {
            window.history.pushState('', '', location_hash_params + location_hash_dates);
        }
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

        const box_and_whisker_title = "Box and Whisker Plots ";
        const box_and_whisker_contents = getDetailPageBAWInfoText();

        let parameter_dialog_title = getSourceName(this.props.sensor.properties.type);
        let parameter_dialog_contents = getSourceInfo(this.props.sensor.properties.type.id);
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
                    <h3>Box and Whiskers
                        <span className={styles.position_icon}>
                            <DialogWrapper title={box_and_whisker_title}
                                       body={box_and_whisker_contents}
                                       isOpen={this.openBoxAndWhiskerDialog}
                                       closeDialog={this.closeBoxAndWhiskerDialog}
                            />
                        </span>
                    </h3>
                );

                let season_filter;
                if (this.state.showSeasonFilter) {
                    // Setup the filter for region. Do more stuff
                    season_filter = (<div className={styles.filterPadding}>
                        <span className={[styles.filterTitle, styles.season_margin_title].join(" ")}>
                            Season
                        </span>
                        <br/>
                        <Select className={styles.season_margin_select} value={this.props.season}
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
                        <Row className={styles.filterMargin}>
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
                        <Col md={4}>
                            <div className={styles.filterTitle}>Date Range</div>
                            <FormField id="selectAllDates" key="selectAllDates">
                                <Checkbox onChange={this.selectAllDates}
                                          value="selectAllDates" key="selectAllDates" name="selectAllDates"
                                          id="selectAllDates"
                                          checked={this.state.selectAllDates}
                                />
                                <label>Select All Dates</label>
                            </FormField>
                            <br/>
                            <div className={styles.leftMargin}>
                                <DateSlider start={minDate} end={maxDate}
                                            selectedStart={selected_start} selectedEnd={selected_end}
                                            onSliderChange={this.onSliderChange}
                                />
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className={styles.filterTitle}>Binning</div>
                            <div className={styles.binningText}>
                                {this.state.binType.charAt(0).toUpperCase() + this.state.binType.slice(1)}
                            </div>
                        </Col>

                        {graphOptions}

                        <Col md={1}>
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

            } else if (chart_type === "stacked_bar") {
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
                                    <span className={styles.position_icon}>
                                        <DialogWrapper title={parameter_dialog_title}
                                                   body={parameter_dialog_contents}
                                                   isOpen={this.openParameterDialog}
                                                   closeDialog={this.closeParameterDialog}
                                        />
                                    </span>
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
                        <Col md={9}>
                            <Row key="paramChartTitle" className={styles.parameters_chart_title}>
                                <Col md={10}>
                                    <h3>Parameter Charts</h3>
                                </Col>
                                <Col md={2}>
                                    {box_and_whiskers_header}
                                </Col>
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