/*
 * @flow
 */


import {
    ADD_ANALYSIS_COUNT, ADD_CHOOSE_ANALYSIS, ADD_CHOOSE_TRENDS, ADD_CUSTOM_TREND_LOCATIONS_FILTER,
    ADD_REGION_TRENDS, ADD_REGION_DETAIL_TRENDS, CLEAR_TRENDS_SENSORS,
    FETCH_ANALYSIS_REGION, RESET_TRENDS_SENSORS, SELECT_TRENDS_CALC_BASELINE_SETTING,
    SELECT_ANALYSIS_REGION, SELECT_TRENDS_REGION, SELECT_TRENDS_CALC_ROLLING_SETTING,
    SELECT_ANALYSIS_PARAMETER, SELECT_TRENDS_PARAMETER, SELECT_TRENDS_SEASON,
    SELECT_TRENDS_THRESHOLD, SELECT_TRENDS_VIEW_TYPE, SET_TRENDS_TIMEFRAMES,
    SET_REGIONS_SENSORS, SET_TRENDS_SENSORS, UPDATE_TRENDS_SENSORS, FAILED_RETRIEVING_REGION_TRENDS,
    ANALYSIS_SAVED_SEARCH
} from '../actions';
import {
    getTrendsPageTimeframes, getTrendsRegionsSettings, getTrendSettings,
    getTrendsPageSettings, getTrendsSources
} from '../utils/getConfig';
import {
    createRegionalTrends, filterCustomTrendLocation, filterPresetTrendLocation,
    getAllRegions, handleThresholdChangeNoChoice, matchRegionAnalysis, matchRegionTrends
} from '../utils/trendsUtils';
import type {
    ChosenTrendsState, Sensors, TrendsBaselineTotalYear, TrendsPageSensorsState,
    TrendsPageRegionsState, TrendsParameter, TrendsRegion, TrendsRollingInterval,
    TrendsThreshold, TrendsThresholdChoice, TrendsViewType
} from '../utils/flowtype';


type ChosenTrendsAction = {|
    type: string,
    parameter: TrendsParameter,
    season: TrendsParameter,
    region: TrendsRegion,
    threshold_choice: TrendsThresholdChoice,
    threshold: TrendsThreshold,
    sensor: Sensors,
    sensors: Sensors,
    trends_sensors: TrendsPageSensorsState,
    trends_regions: TrendsPageRegionsState,
    baseline_total_year: TrendsBaselineTotalYear,
    rolling_interval: TrendsRollingInterval,
    view_type: TrendsViewType,
    number_to_filter: number,
    draw_available_sensors: TrendsPageSensorsState,
    selectedPointsLocations: Array<string>,
    trends_detail: Object,
    trends_deviation: Object,
    region_trends: Object,
    detail_region: string,
    regions_trends: Object,
    sensors_trends: Object,
    sensorsToFilter: Object
|};


const defaultState = {
    parameter: '',
    season: 'spring',
    region: '',
    all_regions: [],
    threshold_choice: false,
    threshold: '',
    sensors: [],
    trends_sensors: [],
    trends_regions: [],
    baseline_total_year: 30,
    rolling_interval: 17,
    view_type: '',
    number_to_filter: 0,
    draw_available_sensors:[],
    detail_region: '',
    show_spinner: false,
    region_parameter: '',
    region_season: '',
    sensor_parameter: '',
    sensor_season: '',
    sensor_region: ''
};


const chosenTrends = (state:ChosenTrendsState = defaultState, action:ChosenTrendsAction) => {

    switch(action.type) {

        case ANALYSIS_SAVED_SEARCH:
            return Object.assign({}, state, {
                parameter: action.parameter,
                region: action.region,
                baseline_total_year: action.baseline_total_year,
                rolling_interval: action.rolling_interval,
                threshold: action.threshold.toString()
            });

        case SELECT_TRENDS_VIEW_TYPE:
            return Object.assign({}, state, {
                view_type: action.view_type
            });

        case SET_TRENDS_SENSORS:

            let origSensors = action.sensors;
            const trends_sources = getTrendsSources();
            let temp_sensors_object = [];
            let epa_sensor;

            origSensors.map(sensor => {
                if (trends_sources.size > 0) {
                    if (trends_sources.indexOf(sensor.properties.type.id) > -1) {
                        epa_sensor = sensor;
                        temp_sensors_object = temp_sensors_object.concat(epa_sensor);
                    }
                } else {
                    temp_sensors_object = temp_sensors_object.concat(sensor);
                }
            });

            return Object.assign({}, state, {
                sensors: origSensors,
                trends_sensors: temp_sensors_object,
                view_type: state.view_type,
                show_spinner: false
            });

        case SET_REGIONS_SENSORS:

            let trendsPageRegionsSettings = getTrendsRegionsSettings();
            let allRegions = getAllRegions(trendsPageRegionsSettings);
            let create_regional_trends = createRegionalTrends(trendsPageRegionsSettings, allRegions);

            return Object.assign({}, state, {
                trends_regions: create_regional_trends,
                view_type: state.view_type,
                all_regions: allRegions,
                show_spinner: false
            });

        case ADD_CHOOSE_ANALYSIS:

            let temp_analysis_object = [];

            action.sensors_trends.map(sensor_trend => {
                let temp_sensor = sensor_trend.sensor;
                temp_sensor['trends'] = sensor_trend.data;
                temp_sensor['trend_start_time'] = sensor_trend.trend_start_time;
                temp_sensor['trend_end_time'] = sensor_trend.trend_end_time;
                temp_analysis_object = temp_analysis_object.concat(temp_sensor);
            });

            let analysis_parameters = getTrendSettings();
            let analysis_param = analysis_parameters
                .find(p => p.parameter.id.toString() === action.parameter.toString());
            if (analysis_param) {
                analysis_param = analysis_param.parameter.title
            }

            return Object.assign({}, state, {
                trends_sensors : temp_analysis_object,
                show_spinner: false,
                analysis_parameter: analysis_param,
                sensor_season: 'all',
                sensor_region: state.region
            });

        case ADD_CHOOSE_TRENDS:

            let temp_sensor_object = [];

            action.sensors_trends.map(sensor_trend => {
                let temp_sensor = sensor_trend.sensor;
                temp_sensor['trends'] = sensor_trend.data;
                temp_sensor['trend_start_time'] = sensor_trend.trend_start_time;
                temp_sensor['trend_end_time'] = sensor_trend.trend_end_time;
                temp_sensor_object = temp_sensor_object.concat(temp_sensor);
            });

            let sensors_parameters = getTrendsPageSettings();
            let sensor_param = action.parameter;
            if (sensors_parameters) {
                sensors_parameters.map(p => {
                        if (p.parameter.id === action.parameter) {
                            sensor_param = p.parameter.title
                        }
                    }
                )
            }

            return Object.assign({}, state, {
                trends_sensors : temp_sensor_object,
                show_spinner: false,
                sensor_parameter: sensor_param,
                sensor_season: action.season,
                sensor_region: state.region
            });

        case FAILED_RETRIEVING_REGION_TRENDS:
            return Object.assign({}, state, {
                show_spinner: false,
                region_parameter: action.parameter,
                region_season: action.season
            });

        case ADD_REGION_TRENDS:

            let temp_regions_object = [];
            // $FlowFixMe
            let temp_trends_regions = Object.assign([], state.trends_regions);
            temp_trends_regions.map(region_sensor =>{
                let region = action.regions_trends.filter((x) => x.region_id === region_sensor.name);
                if(region.length >0 ){
                    region_sensor['region_trends'] = region[0];
                } else {
                    // this is add because of the old API
                    region_sensor['region_trends'] = "no data";
                }
                temp_regions_object = temp_regions_object.concat(region_sensor);
            });


            let regions_parameters = getTrendsPageSettings();
            let region_param = action.parameter;
            if (regions_parameters) {
                regions_parameters.map(p => {
                        if (p.parameter.id === action.parameter) {
                            region_param = p.parameter.title
                        }
                    }
                )
            }

            return Object.assign({}, state, {
                trends_regions : temp_regions_object,
                show_spinner: false,
                region_parameter: region_param,
                region_season: action.season
            });

        case ADD_REGION_DETAIL_TRENDS:

            let temp_region_detail = [action.sensor];
            let temp_new_sensors = temp_region_detail.concat(state["trends_sensors"]);

            return Object.assign({}, state, {
                trends_sensors : temp_new_sensors,
                trends_regions : state.trends_regions,
                detail_region : action.region,
                show_spinner: false
            });

        case SET_TRENDS_TIMEFRAMES:

            let trends_timeframes = getTrendsPageTimeframes();

            return Object.assign({}, state, {
                baseline_total_year: trends_timeframes[0].value,
                rolling_interval: trends_timeframes[1].value,
                show_spinner: false
            });

        case SELECT_ANALYSIS_PARAMETER:

            let analysisPageSettings = getTrendSettings();
            let params_threshold;

            if (action.threshold_choice === false) {
                params_threshold = handleThresholdChangeNoChoice(
                    action.parameter, state.region, analysisPageSettings);
            }

            return Object.assign({}, state, {
                parameter: action.parameter,
                threshold_choice: action.threshold_choice,
                threshold: params_threshold,
                show_spinner: false
            });

        case SELECT_TRENDS_PARAMETER:
            const cleared_details_state = clearDetails(state);
            return Object.assign({}, cleared_details_state, {
                parameter: action.parameter,
                threshold_choice: action.threshold_choice,
                show_spinner: true
            });

        case SELECT_TRENDS_SEASON:
            return Object.assign({}, state, {
                season: action.season,
                show_spinner: true
            });

        case SELECT_ANALYSIS_REGION:
            return Object.assign({}, state, {
                region: action.region,
                show_spinner: false
            });

        case SELECT_TRENDS_REGION:
            return Object.assign({}, state, {
                region: action.region,
                show_spinner: true
            });

        case UPDATE_TRENDS_SENSORS:
            let updated_trends_sensors = filterTrendsSensors(state, action.view_type);

            let spinner_value = true;
            if (action.view_type === 'by-analysis') {
                spinner_value = false
            }

            return Object.assign({}, state, {
                trends_sensors: updated_trends_sensors,
                trends_regions: state.trends_regions,
                view_type: action.view_type,
                show_spinner: spinner_value
            });

        case SELECT_TRENDS_THRESHOLD:
            return Object.assign({}, state, {
                threshold: action.threshold,
                show_spinner: false
            });

        case SELECT_TRENDS_CALC_BASELINE_SETTING:
            return Object.assign({}, state, {
                baseline_total_year: action.baseline_total_year,
                show_spinner: false
            });

        case SELECT_TRENDS_CALC_ROLLING_SETTING:
            return Object.assign({}, state, {
                rolling_interval: action.rolling_interval,
                show_spinner: false
            });

        case ADD_ANALYSIS_COUNT:
            return Object.assign({}, state, {
                number_to_filter: action.number_to_filter,
                show_spinner: true
            });

        case ADD_CUSTOM_TREND_LOCATIONS_FILTER:
            let customTrendLocationSensors =
                filterCustomTrendLocation(action.selectedPointsLocations, state);

            return Object.assign({}, state, {
                trends_sensors: customTrendLocationSensors,
            });

        case FETCH_ANALYSIS_REGION:
            let regionTrendSensors = state.trends_sensors;

            // Filter out sensors that do not have the selected parameter
            if (state.parameter !== '') {
                let new_sensors = [];
                state.trends_sensors.map((sensor) => {
                    if (sensor.parameters.includes(state.parameter)) {
                        new_sensors.push(sensor);
                    }
                });
                regionTrendSensors = new_sensors;
            }

            if ((action.region !== 'all') && (action.region !== 'draw')
                && (action.region !== '')) {
                regionTrendSensors =
                    filterPresetTrendLocation(action.region, regionTrendSensors);
            }

            return Object.assign({}, state, {
                trends_sensors: regionTrendSensors,
                show_spinner: false
            });

        case CLEAR_TRENDS_SENSORS:
            return Object.assign({}, state, {
                parameter: '',
                season: 'spring',
                region: '',
                all_regions: [],
                threshold_choice: false,
                threshold: '',
                sensors: [],
                trends_sensors: [],
                trends_regions: [],
                baseline_total_year: 30,
                rolling_interval: 17,
                view_type: 'by-sensors',
                number_to_filter: 0,
                draw_available_sensors:[],
                show_spinner: false
            });

        case RESET_TRENDS_SENSORS:
            return Object.assign({}, state, {
                trends_sensors: [],
                show_spinner: true
            });

        default:
            return state;

    }

};

function filterTrendsSensors(state:ChosenTrendsState, view_type:string) {

    let all_sensors: Sensors = state.sensors;
    const trends_sources = getTrendsSources();
    let trends_sensors = [];
    let epa_sensor;

    all_sensors.map(sensor => {
        if (trends_sources.size > 0) {
            if (trends_sources.indexOf(sensor.properties.type.id) > -1) {
                epa_sensor = sensor;
                trends_sensors = trends_sensors.concat(epa_sensor);
            }
        }else {
            trends_sensors = trends_sensors.concat(sensor);
        }
    });

    let new_sensors: Sensors = [];
    let selected_parameter = state.parameter;
    let selected_season = state.season;
    let selected_region = state.region;

    let draw_sensors = state.draw_available_sensors;
    let draw_sensors_names = [];
    for (let i = 0; i < draw_sensors.length; i++) {
        if (!draw_sensors_names.includes((draw_sensors[i].name).toString())) {
            draw_sensors_names.push(draw_sensors[i]);
        }
    }

    let selections = [];
    if (selected_region !== '') {
        selections = selections.concat('region');
    }
    if (selected_season !== '') {
        selections = selections.concat('season');
    }
    if (selected_parameter !== '') {
        selections = selections.concat('parameter');
    }

    selections.map ((filter) => {

        switch(filter) {

            case 'region':
                if (selected_region !== '') {
                    if (selected_region === 'all') {

                        new_sensors = trends_sensors;
                        trends_sensors = new_sensors;

                    } else if (selected_region === 'draw') {

                        if (draw_sensors_names.length <= 0) {
                            new_sensors = trends_sensors;
                        } else {
                            new_sensors = trends_sensors.filter(function (e) {
                                return this.indexOf(e) >= 0;
                            }, draw_sensors_names);
                        }
                        trends_sensors = new_sensors;

                    } else {

                        trends_sensors.map((sensor => {
                            if (view_type === 'by-sensors' || view_type === 'by-regions' ) {
                                if (matchRegionTrends(selected_region, sensor)) {
                                    new_sensors.push(sensor);
                                }
                            }
                            if (view_type === 'by-analysis') {
                                if (matchRegionAnalysis(selected_region, sensor)) {
                                    new_sensors.push(sensor);
                                }
                            }
                        }));
                        trends_sensors = new_sensors;

                    }
                }
                return;

            case 'season':
                if (selected_season !== '') {
                    new_sensors = trends_sensors;
                    trends_sensors = new_sensors;
                }
                return;

            case 'parameter':
                if (selected_parameter !== '') {
                    new_sensors = [];
                    trends_sensors.map((sensor) => {
                        if (sensor.parameters.includes(selected_parameter)) {
                            new_sensors.push(sensor);
                        }
                    });
                    trends_sensors = new_sensors;
                }
                return;
        }

    });

    return trends_sensors;

}

function clearDetails(state) {
    let newState = Object.assign({}, state);

    newState.trends_regions.map( region => {
        region.trends_detail = {'id':0, 'value':0};
        region.trends_deviation = {'id':0, 'value':0};
    });

    return newState;
}

export default chosenTrends;
