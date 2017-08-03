/*
 * @flow
 */

import {
    SELECT_TRENDS_PARAMETER,
    SELECT_TRENDS_SEASON,
    SELECT_TRENDS_REGION,
    SELECT_TRENDS_THRESHOLD,
    TRENDS_SENSORS,
    UPDATE_TRENDS_SENSORS,
    SET_TRENDS_TIMEFRAMES,
    ADD_CHOOSE_TRENDS,
    SELECT_TRENDS_VIEW_TYPE,
    UPDATE_TRENDS_REGIONS_POINTS
} from '../actions';
import {
    getTrendsPageSettings,
    getTrendsRegionsSettings,
    getTrendsPageTimeframes
} from '../utils/getConfig';
import type {
    ChosenTrendsState,
    Sensors,
    TrendsRegions,
    TrendsPageSensorsState,
    TrendsPageRegionsState,
    TrendsParameter,
    TrendsRegion,
    TrendsThreshold,
    TrendsThresholdChoice,
    TrendsBaselineTotalYear,
    TrendsRollingInterval,
    TrendsViewType
} from '../utils/flowtype';


type ChosenTrendsAction = {|
    type: string,
    parameter: TrendsParameter,
    season: TrendsParameter,
    region: TrendsRegion,
    threshold_choice: TrendsThresholdChoice,
    threshold: TrendsThreshold,
    sensor:Sensors,
    sensors: Sensors,
    trends_sensors: TrendsPageSensorsState,
    trends_regions: TrendsPageRegionsState,
    baseline_totalyear: TrendsBaselineTotalYear,
    rolling_interval: TrendsRollingInterval,
    view_type: TrendsViewType,
|};

const defaultState = {
    parameter: '',
    season: 'spring',
    region: 'all',
    all_regions: [],
    threshold_choice: false,
    threshold: 0,
    sensors: [],
    trends_sensors: [],
    trends_regions: [],
    baseline_totalyear: 10,
    rolling_interval: 2,
    view_type: 'by-sensors',
};

const chosenTrends = (state:ChosenTrendsState = defaultState,
                      action:ChosenTrendsAction) => {

    switch(action.type) {

        case SELECT_TRENDS_VIEW_TYPE:
            return Object.assign({}, state, {
                view_type: action.view_type
            });

        case TRENDS_SENSORS:

            let origSensors = action.sensors;
            let trendsPageRegionsSettings = getTrendsRegionsSettings();
            let allRegions = getAllRegions(trendsPageRegionsSettings);
            let create_regional_trends = createRegionalTrends(trendsPageRegionsSettings, allRegions);

            return Object.assign({}, state, {
                sensors: origSensors,
                trends_sensors: origSensors,
                trends_regions: create_regional_trends,
                view_type: state.view_type,
                all_regions: allRegions
            });

        case ADD_CHOOSE_TRENDS:

            // push the new sensor into chosenTrends.trends_sensors and
            // update chosenTrends.trends_regions with averages
            let tmpsensor = [action.sensor];
            let tmpdata = tmpsensor.concat(state["trends_sensors"]);

            return Object.assign({}, state, {
                trends_sensors : tmpdata,
                trends_regions : state.trends_regions
            });

        case UPDATE_TRENDS_REGIONS_POINTS:

            let trendsRegionsSettings = getTrendsRegionsSettings();
            let get_regional_trends = getRegionalTrends(state, trendsRegionsSettings);
            return Object.assign({}, state, {
                trends_regions : get_regional_trends
            });

        case SET_TRENDS_TIMEFRAMES:

            let trends_timeframes = getTrendsPageTimeframes();

            return Object.assign({}, state, {
                baseline_totalyear: trends_timeframes[0].value,
                rolling_interval: trends_timeframes[1].value,
            });

        case SELECT_TRENDS_PARAMETER:

            let trendsPageSettings = getTrendsPageSettings();
            let param_threshold = 0;

            if (action.threshold_choice == false) {
                param_threshold = handleThresholdChangeNoChoice(
                    action.parameter, state.region, trendsPageSettings);
            }

            return Object.assign({}, state, {
                parameter: action.parameter,
                threshold_choice: action.threshold_choice,
                threshold: param_threshold
            });

        case SELECT_TRENDS_SEASON:
            return Object.assign({}, state, {
                season: action.season
            });

        case SELECT_TRENDS_REGION:
            return Object.assign({}, state, {
                region: action.region
            });

        case UPDATE_TRENDS_SENSORS:
            let updated_trends_sensors = filterTrendsSensors(state);

            return Object.assign({}, state, {
                trends_sensors: updated_trends_sensors,
                trends_regions: state.trends_regions
            });

        case SELECT_TRENDS_THRESHOLD:
            return Object.assign({}, state, {
                threshold: action.threshold
            });

        default:
            return state

    }

};


function getAllRegions(trendsPageRegionsSettings: Object) {
    // Create one Item for each Region

    let trendsCheckRegion;
    let trendsCheckRegionsAll = [];

    // Get all the available Regions
    for (let i = 0; i < trendsPageRegionsSettings.length; i++) {
        trendsCheckRegion = trendsPageRegionsSettings[i].properties.region;
        trendsCheckRegionsAll = trendsCheckRegionsAll.concat(trendsCheckRegion);
    }

    return trendsCheckRegionsAll;

}

function createRegionalTrends(trendsPageRegionsSettings: Object, allRegions: Array<string>) {

    // Update each Region item

    let trendsCheckRegionsAll = allRegions;
    let trendsRegionsSensors: TrendsRegions = [];

    // Create an item to represent each Region
    for (let i = 0; i < trendsCheckRegionsAll.length; i++) {
        trendsRegionsSensors[i] = {
            id:i,
            created: "",
            geometry: {
                type: "Point",
                coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
            },
            max_end_time: "",
            min_start_time: "",
            min_end_time:"",
            name:trendsCheckRegionsAll[i].toString(),
            parameters:[],
            properties:{
                region: trendsCheckRegionsAll[i].toString(),
                type: {
                    id: i.toString(),
                    title: "",
                },
                name: trendsCheckRegionsAll[i].toString(),
                popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
            },
            type:"Feature",
            trend_end_time:"",
            trend_start_time:"",
            trends:[],
        };
    }

    return trendsRegionsSensors;
}

function getRegionalTrends(state, trendsPageRegionsSettings: Object) {

    // All the Variables in this Function
    let trendsCheckRegionsAll = state.all_regions;
    let trendsSensors = state.trends_sensors;
    let trendsRegionsSensors: TrendsRegions = [];
    let start_time_all = [];
    let end_time_all = [];
    let trend_start_time_all = [];
    let trend_end_time_all = [];
    let start_time_all_sorted = [];
    let end_time_all_sorted = [];
    let end_time_all_sorted_max = [];
    let trend_start_time_all_sorted = [];
    let trend_end_time_all_sorted = [];
    let start_time = '';
    let end_time = '';
    let end_time_max = '';
    let trend_start_time = '';
    let trend_end_time = '';
    let the_trends = [];
    let the_trends_average = [];
    let trends_interval_all = 0;
    let trends_last_all = 0;
    let trends_percentage_change_all = 0;
    let trends_total_all = 0;
    let trends_interval_average = 0;
    let trends_last_average = 0;
    let trends_percentage_change_average = 0;
    let trends_total_average = 0;
    let trendsChosenParameter = state.parameter;
    let trends_interval_id = '';
    let trends_last_id = '';
    let trends_percentage_change_id = '';
    let trends_total_id = '';

    // Create an item to represent each Region
    for (let i = 0; i < trendsCheckRegionsAll.length; i++) {
        // step through each region
        trendsSensors.filter(s => s.properties.region.indexOf(trendsCheckRegionsAll[i]) >= 0)
            .map(sensor => {
                if (
                    sensor.trends != ["trends return no data"] &&
                    sensor.trends != ['not enough data'] &&
                    sensor.trends != [''] &&
                    sensor.trends !== undefined
                    ) {
                    start_time_all.push(new Date(sensor.min_start_time));
                    end_time_all.push(new Date(sensor.max_end_time));
                    the_trends.push(sensor.trends);
                    trend_start_time_all.push(sensor.trend_start_time);
                    trend_end_time_all.push(sensor.trend_end_time);
                }
            });

        // Trends needs to be averaged for all four values
        if (the_trends.length > 0) {
            for (let j = 0; j < the_trends.length; j++) {
                trends_interval_all += the_trends[j][(trendsChosenParameter + "_interval_average")];
                trends_last_all += the_trends[j][(trendsChosenParameter + "_last_average")];
                trends_percentage_change_all += the_trends[j][(trendsChosenParameter + "_percentage_change")];
                trends_total_all += the_trends[j][(trendsChosenParameter + "_total_average")];
            }

            trends_interval_average = trends_interval_all/the_trends.length;
            trends_last_average = trends_last_all/the_trends.length;
            trends_percentage_change_average = trends_percentage_change_all/the_trends.length;
            trends_total_average = trends_total_all/the_trends.length;

            trends_interval_id = (trendsChosenParameter + "_interval_average");
            trends_last_id = (trendsChosenParameter + "_last_average");
            trends_percentage_change_id = (trendsChosenParameter + "_percentage_change");
            trends_total_id = (trendsChosenParameter + "_total_average");

            the_trends_average = [
                {
                    [trends_interval_id] : trends_interval_average ,
                    [trends_last_id] : trends_last_average ,
                    [trends_percentage_change_id] : trends_percentage_change_average  ,
                    [trends_total_id] : trends_total_average
                },
            ];

        }

        // Need appropriate earliest and latest values
        start_time_all_sorted = start_time_all.sort();
        start_time = start_time_all_sorted[0];
        end_time_all_sorted = end_time_all.reverse();
        end_time = end_time_all_sorted[0];
        end_time_all_sorted_max = end_time_all.sort();
        end_time_max = end_time_all_sorted_max[0];
        trend_start_time_all_sorted = trend_start_time_all.sort();
        trend_start_time = trend_start_time_all_sorted[0];
        trend_end_time_all_sorted = trend_end_time_all.reverse();
        trend_end_time = trend_end_time_all_sorted[0];

        // Create the Point for the Map
        if (the_trends.length > 0) {
            trendsRegionsSensors[i] = {
                id: i,
                created: "",
                geometry: {
                    type: "Point",
                    coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
                },
                max_end_time: end_time_max.toString(),
                min_start_time: start_time.toString(),
                min_end_time: end_time.toString(),
                name: trendsCheckRegionsAll[i].toString(),
                parameters: [],
                properties: {
                    region: trendsCheckRegionsAll[i].toString(),
                    type: {
                        id: i.toString(),
                        title: "",
                    },
                    name: trendsCheckRegionsAll[i].toString(),
                    popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
                },
                type: "Feature",
                trend_end_time: trend_end_time.toString(),
                trend_start_time: trend_start_time.toString(),
                trends: the_trends_average[0],
            };
        } else {
            trendsRegionsSensors[i] = {
                id:i,
                created: "",
                geometry: {
                    type: "Point",
                    coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
                },
                max_end_time: "",
                min_start_time: "",
                min_end_time:"",
                name:trendsCheckRegionsAll[i].toString(),
                parameters:[],
                properties:{
                    region: trendsCheckRegionsAll[i].toString(),
                    type: {
                        id: i.toString(),
                        title: "",
                    },
                    name: trendsCheckRegionsAll[i].toString(),
                    popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
                },
                type:"Feature",
                trend_end_time:"",
                trend_start_time:"",
                trends:[],
            };
        }
    }

    return trendsRegionsSensors;

}

function handleThresholdChangeNoChoice(
    parameter: string, region: string, trendsPageSettings: Object) {

    let trendsCheckParameter;
    let trendsPageThreshold = [];

    for (let i = 0; i < trendsPageSettings.length; i++) {
        trendsCheckParameter = trendsPageSettings[i].parameter.id;
        if (trendsCheckParameter == parameter) {
            trendsPageSettings[i].thresholds.map( t => {
                if (t.region.toLowerCase() == region) {
                    trendsPageThreshold = t.value;
                }
            });
        }
    }

    return trendsPageThreshold;
}


function filterTrendsSensors(state:ChosenTrendsState) {

    let all_sensors: Sensors = state.sensors;
    let trends_sensors: Sensors = state.sensors;
    let new_sensors: Sensors = [];
    let selected_parameter = state.parameter;
    let selected_season = state.season;
    let selected_region = state.region;

    let selections = [];
    if (selected_region != '') {
        selections = selections.concat('region');
    }
    if (selected_season != '') {
        selections = selections.concat('season');
    }
    if (selected_parameter != '') {
        selections = selections.concat('parameter');
    }

    selections.map ((filter) => {

        switch(filter) {

            case 'region':
                if (selected_region != '') {
                    if (selected_region == 'all') {
                        new_sensors = all_sensors;
                        trends_sensors = new_sensors;
                    } else {
                        new_sensors = [];
                        trends_sensors.map((sensor => {
                            if (selected_region.toUpperCase() == sensor.properties.region) {
                                new_sensors.push(sensor);
                            }
                        }));
                        trends_sensors = new_sensors;
                    }
                }
                return;

            case 'season':
                if (selected_season != '') {
                    new_sensors = trends_sensors;
                    trends_sensors = new_sensors;
                }
                return;

            case 'parameter':
                if (selected_parameter != '') {
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

export default chosenTrends

