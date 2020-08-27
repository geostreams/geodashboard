// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
    Checkbox,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    Tab,
    Tabs,
    Typography,
    withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { Map } from 'gd-core/src/components/ol';
import { dateUTC } from 'gd-core/src/utils/format';

import type { History, Location } from 'connected-react-router';

import { getSensorMarker, getSensorName, getSourceName } from '../../../utils/sensors';
import Filters from './Filters';

import InfoDialog from './InfoDialog';
import Parameters from './Parameters';
import { getBinType } from './utils';

import type {
    CategoryType,
    ParameterCategoryType,
    ParameterMappingsType,
    ParameterType,
    SensorType,
    SourceConfig
} from '../../../utils/flowtype';

const styles = (theme) => ({
    header: {
        color: theme.palette.primary.contrastText,
        padding: 10
    },
    map: {
        width: '100%',
        height: 200
    }
});

type Props = {
    classes: {
        header: string;
        map: string;
    };
    geostreamingEndpoint: string;
    sourceConfig: SourceConfig;
    sensor: SensorType;
    displayOnlineStatus: boolean;
    allParameters: CategoryType[];
    allCategories: ParameterCategoryType[];
    mappings: ParameterMappingsType[];
    handleClose: ?Function;
    history: History;
    location: Location;
    match: { params: { [k: string]: string } };
}

type State = {
    hasSensor: boolean;
    sensorMarkerLayer: ?VectorLayer;
    categories: string[];
    parameters: Array<ParameterType & { category: string; visualization: string; isSelected: boolean; }>;
    activeCategory: ?string;
    showDialog: boolean;
    dialogContent: ?string;
    minStartTime: ?Date;
    maxEndTime: ?Date;
    startDate: ?Date;
    endDate: ?Date;
    selectedSeason: string;
    displayLines: boolean;
    startAtZero: boolean;
    sameTimeScale: boolean;
    selectAllDates: boolean;
    binType: ?string;
    showSeasonFilter: boolean;
    activeSeason: string;
}

class SensorDetail extends React.Component<Props, State> {
    static defaultProps = {
        handleClose: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.sensor) {
            if (!state.hasSensor) {
                const { sensor, allParameters, allCategories, mappings, location } = props;
                const queryParams = new URLSearchParams(location.search);
                const selectedParametersQuery = queryParams.get('params');
                const selectedParameters = selectedParametersQuery ? selectedParametersQuery.split(',') : [];

                const categories = new Set();
                const parameters = [];
                sensor.parameters.forEach(parameterName => {
                    const parameter = allParameters.find(({ name }) => name === parameterName);
                    if (parameter) {
                        const mappedCategories = mappings.find(m => m.parameter_id === parameter.id);
                        if (mappedCategories) {
                            const category = allCategories.find(c => c.id === mappedCategories.category_id);
                            if (category && category.name) {
                                categories.add(category.name);
                                parameters.push({
                                    ...parameter,
                                    category: category.name,
                                    visualization: category.detail_type,
                                    isSelected: (
                                        selectedParameters.length === 0 ||
                                        selectedParameters.indexOf(parameter.name) > -1
                                    )
                                });
                            }
                        }
                    }
                });

                const startDateQuery = queryParams.get('start');
                const endDateQuery = queryParams.get('end');
                const startTime = new Date(props.sensor.min_start_time);
                const endTime = new Date(props.sensor.max_end_time);
                // Some sensors might have invalid date strings, e.g. "N/A"; in those cases, fallback to the following start and end time.
                const minStartTime = startTime.valueOf() ? startTime : new Date('1980-01-01');
                const maxEndTime = endTime.valueOf() ? endTime : new Date();

                const startDate = startDateQuery ? dateUTC(startDateQuery) : minStartTime;
                const endDate = endDateQuery ? dateUTC(endDateQuery) : maxEndTime;

                return {
                    ...state,
                    hasSensor: true,
                    sensorMarkerLayer: getSensorMarker(sensor, props.sourceConfig, props.displayOnlineStatus),
                    categories: ['All', ...Array.from(categories).sort()],
                    parameters: parameters.sort(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
                    minStartTime,
                    maxEndTime,
                    startDate: startDate.valueOf() ? startDate : startTime,
                    endDate: endDate.valueOf() ? endDate : endTime,
                    binType: getBinType(startDate, endDate),
                    selectAllDates: (
                        startDate.valueOf() === minStartTime.valueOf() &&
                        endDate.valueOf() === maxEndTime.valueOf()
                    ),
                    showSeasonFilter: !!(queryParams.get('use-season') && sensor && props.sourceConfig.useSeasonFilter)
                };
            }
            return state;
        }
        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            hasSensor: false,
            sensorMarkerLayer: null,
            categories: [],
            parameters: [],
            activeCategory: this.props.match.params.category,
            showDialog: false,
            dialogContent: null,
            minStartTime: null,
            maxEndTime: null,
            startDate: null,
            endDate: null,
            selectedSeason: '',
            displayLines: true,
            startAtZero: false,
            sameTimeScale: true,
            selectAllDates: true,
            binType: null,
            showSeasonFilter: false,
            activeSeason: (new URLSearchParams(props.location.search)).get('season') || 'spring'
        };
    }

    getQueryParams = () => {
        const queryParams = [];
        const { startDate, endDate } = this.state;
        if (startDate) {
            queryParams.push(`since=${startDate.toISOString()}`);
            if (endDate) {
                queryParams.push(`until=${endDate.toISOString()}`);
            }
        }
        return queryParams.join('&');
    }

    updateUrl = () => {
        const queryParams = [];
        const { activeSeason, activeCategory, startDate, endDate, minStartTime, maxEndTime, parameters } = this.state;

        if ((new URLSearchParams(this.props.location.search)).get('use-season')) {
            queryParams.push('use-season=1');
        }

        queryParams.push(`season=${activeSeason}`);

        const selectedParameters = parameters.filter(({ isSelected }) => isSelected).map(({ name }) => name);
        if (selectedParameters.length !== parameters.length) {
            queryParams.push(`params=${selectedParameters.join(',')}`);
        }

        if (startDate && startDate !== minStartTime) {
            queryParams.push(`start=${startDate.toISOString().split('T')[0]}`);
        }
        if (endDate && endDate !== maxEndTime) {
            queryParams.push(`end=${endDate.toISOString().split('T')[0]}`);
        }

        const pathname = this.props.location.pathname.replace(/[^/]+(?=\/$|$)/, activeCategory);
        const search = queryParams.length ? `?${queryParams.join('&')}` : '';

        this.props.history.replace(`${pathname}${search}`, this.props.history.location.state);
    }

    getDownloadUrl = () => {
        const { geostreamingEndpoint, sensor } = this.props;
        const { startDate, endDate, minStartTime, maxEndTime, parameters } = this.state;

        const downloadParams = [];

        parameters.forEach(({ name, isSelected }) => {
            if (isSelected) {
                downloadParams.push(`attributes=${name}`);
            }
        });

        if (!downloadParams.length) {
            return '';
        }

        if (startDate && startDate !== minStartTime) {
            downloadParams.push(`since=${startDate.toISOString().split('T')[0]}`);
        }
        if (endDate && endDate !== maxEndTime) {
            downloadParams.push(`until=${endDate.toISOString().split('T')[0]}`);
        }

        return `${geostreamingEndpoint}/datapoints/download?format=csv&sensor_id=${sensor.id}&${downloadParams.join('&')}`;
    }

    handleCategoryChange = (e, category) => {
        this.setState(
            { activeCategory: category },
            this.updateUrl
        );
    }

    handleSeasonUpdate = (season) => {
        this.setState(
            { activeSeason: season },
            this.updateUrl
        );
    }

    handleSelectAllDatesToggle = (e, isChecked) => {
        this.setState(
            (state) => {
                state.selectAllDates = isChecked;
                if (isChecked) {
                    state.startDate = state.minStartTime;
                    state.endDate = state.maxEndTime;
                }
                if (state. startDate && state.endDate) {
                    state.binType = getBinType(state.startDate, state.endDate);
                }
                return state;
            },
            this.updateUrl
        );
    }

    handleDateRangeUpdate = (e, [start, end]) => {
        this.setState(
            (state) => {
                const { minStartTime, maxEndTime } = state;
                if (minStartTime && maxEndTime) {
                    const startDate = new Date(start);
                    const endDate = new Date(end);
                    state.selectAllDates = (
                        startDate.valueOf() === minStartTime.valueOf() &&
                        endDate.valueOf() === maxEndTime.valueOf()
                    );
                    state.binType = getBinType(startDate, endDate);
                    state.startDate = startDate;
                    state.endDate = endDate;
                }
                return state;
            },
            this.updateUrl
        );
    }

    handleStartDataAtZeroToggle = (e, isChecked) => {
        this.setState({ startAtZero: isChecked });
    }

    handleUseSameTimeScaleToggle = (e, isChecked) => {
        this.setState({ sameTimeScale: isChecked });
    }

    handleParameterToggle = (parameterName: string, isChecked: boolean) => {
        this.setState((state) => {
            const parameterIndex = state.parameters.findIndex(({ name }) => name === parameterName);
            if (parameterIndex > -1) {
                state.parameters[parameterIndex].isSelected = isChecked;
            }
            return state;
        });
    }

    handleClose = () => {
        if (this.props.handleClose) {
            this.props.handleClose();
        } else {
            const { parent } = this.props.match.params;
            if (parent) {
                let next = `/${parent}`;
                if (parent.toLowerCase().indexOf('explore') > -1) {
                    next = `${next}/all`;
                }
                this.props.history.push(next);
            }
        }
    }

    showInfoDialog = (content) => {
        this.setState({
            showDialog: true,
            dialogContent: content
        });
    }

    render() {
        const {
            hasSensor,
            sensorMarkerLayer,
            categories,
            activeCategory,
            parameters,
            selectAllDates,
            minStartTime,
            maxEndTime,
            startDate,
            endDate,
            binType,
            showSeasonFilter,
            activeSeason,
            startAtZero,
            sameTimeScale,
            showDialog,
            dialogContent
        } = this.state;

        if (
            hasSensor &&
            sensorMarkerLayer &&
            activeCategory &&
            minStartTime &&
            maxEndTime &&
            startDate &&
            endDate &&
            binType
        ) {
            const { classes, sourceConfig, sensor } = this.props;

            const { properties } = sensor;

            return (
                <>
                    <Grid container>
                        <Grid
                            item
                            className={classes.header}
                            xs={12}
                            style={{ backgroundColor: sourceConfig.color }}
                        >
                            <Typography variant="h4">
                                {getSensorName(properties)} - {getSourceName(sourceConfig, properties.type)}
                                <CloseIcon
                                    className="right actionIcon"
                                    onClick={this.handleClose}
                                />
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Tabs
                                centered
                                value={activeCategory}
                                onChange={this.handleCategoryChange}
                            >
                                {categories.map((category) => (
                                    <Tab
                                        key={category}
                                        label={category}
                                        value={category}
                                    />
                                ))}
                            </Tabs>
                        </Grid>

                        <Filters
                            showSeasonFilter={showSeasonFilter}
                            minStartTime={minStartTime}
                            maxEndTime={maxEndTime}
                            selectAllDates={selectAllDates}
                            startDate={startDate}
                            endDate={endDate}
                            binType={binType}
                            activeSeason={activeSeason}
                            startAtZero={startAtZero}
                            sameTimeScale={sameTimeScale}
                            downloadUrl={this.getDownloadUrl()}
                            handleSeasonUpdate={this.handleSeasonUpdate}
                            handleSelectAllDatesToggle={this.handleSelectAllDatesToggle}
                            handleDateRangeUpdate={this.handleDateRangeUpdate}
                            handleStartDataAtZeroToggle={this.handleStartDataAtZeroToggle}
                            handleUseSameTimeScaleToggle={this.handleUseSameTimeScaleToggle}
                        />

                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant="h6" align="center">
                                    Selected Parameters
                                    &nbsp;
                                    <InfoIcon
                                        className="actionIcon"
                                        fontSize="small"
                                        onClick={(() => this.showInfoDialog('parameters'))}
                                    />
                                </Typography>
                                <List>
                                    {parameters.map(({ category, id, title, unit, name, isSelected }) => (
                                        activeCategory === 'All' || activeCategory === category ?
                                            <ListItem key={id}>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        checked={isSelected}
                                                        onChange={(e, isChecked) => {
                                                            this.handleParameterToggle(name, isChecked);
                                                        }}
                                                    />}
                                                    label={<Typography variant="body2" dangerouslySetInnerHTML={{ __html: `${title}${unit ? ` (${unit})` : ''}` }} />}
                                                />
                                            </ListItem> :
                                            null
                                    ))}
                                </List>
                                <Map
                                    className={classes.map}
                                    zoom={5}
                                    center={fromLonLat(sensor.geometry.coordinates)}
                                    layers={[
                                        new TileLayer({
                                            type: 'base',
                                            title: 'OSM',
                                            source: new OSM()
                                        }),
                                        sensorMarkerLayer
                                    ]}
                                />
                            </Grid>
                            <Grid item container xs={9}>
                                <Parameters
                                    binType={showSeasonFilter ? 'season' : binType}
                                    season={showSeasonFilter ? activeSeason : null}
                                    sensorId={sensor.id}
                                    parameters={parameters.filter(({ category, isSelected }) => (activeCategory === 'All' || category === activeCategory) && isSelected )}
                                    queryParams={this.getQueryParams()}
                                    startDate={startDate}
                                    endDate={endDate}
                                    startAtZero={startAtZero}
                                    sameTimeScale={sameTimeScale}
                                    showInfoDialog={this.showInfoDialog}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <InfoDialog
                        showDialog={showDialog}
                        contentType={dialogContent}
                        source={sensor.properties.type}
                        handleClose={() => this.setState({ showDialog: false })}
                    />
                </>
            );
        }
        return null;
    }
}

const mapStateToProps = (state, props) => {
    const sensor = state.__new_sensors.sensors.find(({ name }) => name === props.match.params.name);
    return {
        geostreamingEndpoint: state.config.geostreamingEndpoint,
        sourceConfig: sensor && state.config.source[sensor.properties.type.id],
        sensor,
        displayOnlineStatus: state.config.displayOnlineStatus,
        allParameters: state.__new_parameters.parameters,
        allCategories: state.__new_parameters.categories,
        mappings: state.__new_parameters.mappings
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SensorDetail));
