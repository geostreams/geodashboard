// @flow

import type { Sensors, Dispatch, GetState } from "../utils/flowtype";

export const SWITCH_BACKEND = 'SWITCH_BACKEND';
export const switchBackend = (selected:string) => {
    return {
        type: SWITCH_BACKEND,
        selected
    }
};

export const SWITCH_BACKEND_ERROR = 'SWITCH_BACKEND_ERROR';
export const switchBackendError = () => {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        let fetched_api = state.sensors.api;
        dispatch({
            type: SWITCH_BACKEND_ERROR,
            fetched_api
        });
        dispatch({
            type: CLEAR_SENSORS
        });
        dispatch({
            type: CLEAR_TRENDS_SENSORS
        });
    }
};

export const CLEAR_SENSORS = 'CLEAR_SENSORS';

export const CLEAR_TRENDS_SENSORS = 'CLEAR_TRENDS_SENSORS';

export const ADD_ENDPOINTS = 'ADD_ENDPOINTS';
export const addEndpoints = () =>{
    return {
        type: ADD_ENDPOINTS
    }
};

export const REQUEST_SENSORS = 'REQUEST_SENSORS';
function requestSensors(api:string) {
    return {
        type: REQUEST_SENSORS,
        api
    }
}

export const RECEIVE_SENSORS = 'RECEIVE_SENSORS';
function receiveSensors(api:string, json:Sensors) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: RECEIVE_SENSORS,
            api,
            sensors: json,
            available_sensors: json,
            receivedAt: Date.now()
        });
        dispatch(updateAvailableFilters());
        dispatch(setTrendsSensors());
    }
}

export const RECEIVE_SENSOR = 'RECEIVE_SENSOR';
function receiveSensor(json:Sensors) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: RECEIVE_SENSOR,
            sensor_data: json,
        });
    }
}

export const UPDATE_DETAIL = 'UPDATE_DETAIL';
export function updateDetail(id:string, name:string, coordinates:number[]){
    return (dispatch:Dispatch) => {
        dispatch({
            type: UPDATE_DETAIL,
            id,
            name,
            coordinates
        });
    }
}

export const ADD_SEARCH_FILTER = 'ADD_SEARCH_FILTER';
// this is not used for now, it push a new field in state.searchFilters.filters, not state.searchFilters.selected
function addSearchFilter(filter:string) {
    return {
        type: ADD_SEARCH_FILTER,
        filter
    }
}

export const ADD_SEARCH_PARAMETER = 'ADD_SEARCH_PARAMETER';
export function addSearchParameter(parameter:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_PARAMETER,
            parameter,
            selected_filters
        });
        const idx = selected_filters.indexOf('parameters');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_TRENDS = 'ADD_TRENDS';
export const ADD_CHOOSE_TRENDS = 'ADD_CHOOSE_TRENDS';
export function fetchTrends(
    parameter:string, totalyear:number, interval:number, type:string, season_input:string, view_type:string
) {
    return (dispatch:Dispatch, getState:GetState) => {
        // For each sensor, get the start/end day for selected parameter from clowder API (the api is same as the one
        // used for detail page, thus it should be quick). then get the trends result from the /datapoints/trends api.
        // Each sensor wil have a dispatch with type = ADD_TRENDS or ADD_CHOOSE_TRENDS.
        const state = getState();
        const api = state.backends.selected;

        const season = season_input;
        const trendsendpoint = api + '/api/geostreams/datapoints/trends?binning=year';

        let sensorsToFilter;
        if (state.sensorTrends.available_sensors.length > 0  && type == 'ADD_TRENDS') {
            sensorsToFilter = state.sensorTrends.available_sensors;
        } else if (state.chosenTrends.trends_sensors.length > 0  && type == 'ADD_CHOOSE_TRENDS') {
            if (view_type == 'by-regions'){
                sensorsToFilter = state.sensors.data;
            } else {
                sensorsToFilter = state.chosenTrends.trends_sensors;
            }
        } else {
            sensorsToFilter = state.sensors.data;
        }

        let number_to_filter = (sensorsToFilter.length);

        dispatch({
            type: ADD_ANALYSIS_COUNT,
            number_to_filter,
        });

        sensorsToFilter.filter(s => s.parameters.indexOf(parameter) >= 0)
            .map(sensor => {
                let start_time = new Date(sensor.min_start_time);
                let end_time = new Date(sensor.max_end_time);
                let result;
                let timeframeDays = Math.floor((end_time - start_time) / (1000*60*60*24));
                if (isNaN(end_time.getTime()) || timeframeDays <= (totalyear * 365)) {
                    dispatch({
                        type: type,
                        sensor: Object.assign(sensor, {
                            "trends": "not enough data",
                            "trend_start_time": start_time,
                            "trend_end_time": end_time,
                        })
                    });
                    return undefined;
                } else {
                    const end_year:number = end_time.getFullYear();
                    const window_start:Date = new Date(end_time);
                    window_start.setFullYear(end_year - interval);

                    let start:Date = new Date(end_time);
                    if (totalyear == 0) {
                        start = start_time;
                    } else {
                        start.setFullYear(end_year - totalyear);
                    }

                    let trendsendpointargs;
                    if (type == 'ADD_TRENDS') {
                        trendsendpointargs = trendsendpoint +
                            "&window_start=" + window_start.toISOString() +
                            "&window_end=" + end_time.toISOString() +
                            "&since=" + start.toISOString() +
                            "&until=" + end_time.toISOString() +
                            "&sensor_id=" + sensor.id +
                            "&attributes=" + parameter;
                    } else {
                        trendsendpointargs = trendsendpoint +
                            "&sensor_id=" + sensor.id +
                            "&attributes=" + parameter;
                    }

                    if (season)
                        trendsendpointargs = trendsendpointargs + "&semi=" + season;

                    result = fetch(trendsendpointargs);
                    result
                        .then(response => {
                            if (response) {
                                return response.json();
                            } else {
                                return undefined
                            }
                        })
                        .then(json => {
                            if (json) {
                                // trends api return do result, not sure why.
                                if (json.length < 1) {
                                    dispatch({
                                        type: type,
                                        sensor: Object.assign(sensor, {
                                            "trends": "trends return no data",
                                            "trend_start_time": start_time,
                                            "trend_end_time": end_time,
                                        })
                                    });
                                } else {
                                    let trendStart = new Date(json[0].start_time);
                                    let trendEnd = new Date(json[0].end_time);
                                    let timeframeTrendsDays = Math.floor((trendEnd - trendStart) / (1000*60*60*24));

                                    if (timeframeTrendsDays >= (totalyear * 365)-180) {
                                        dispatch({
                                            type: type,
                                            sensor: Object.assign(sensor, {
                                                "trends": json[0].properties,
                                                "trend_start_time": start_time,
                                                "trend_end_time": end_time,
                                            })
                                        });
                                        if (type == 'ADD_CHOOSE_TRENDS') {
                                            // Create the Region Points from the individual Sensors
                                            dispatch(updateTrendsRegionsPoints());
                                        }
                                    } else {
                                        dispatch({
                                            type: type,
                                            sensor: Object.assign(sensor, {
                                                "trends": "trends return no data",
                                                "trend_start_time": start_time,
                                                "trend_end_time": end_time,
                                            })
                                        });
                                    }
                                }
                            }
                        })
                }
            });
    }

}

export const ADD_SEARCH_DATASOURCE = 'ADD_SEARCH_DATASOURCE';
export function addSearchDataSource(data_source:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_DATASOURCE,
            data_source,
            selected_filters
        });
        const idx = selected_filters.indexOf('data_source');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_START_DATE = 'ADD_START_DATE';
export function addStartDate(date:Date) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        const availableSensors = state.sensors.available_sensors;
        dispatch({
            type: ADD_START_DATE,
            date,
            selected_filters,
            availableSensors
        });
        const idx = selected_filters.indexOf('time');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_END_DATE = 'ADD_END_DATE';
export function addEndDate(date:Date) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        const availableSensors = state.sensors.available_sensors;
        dispatch({
            type: ADD_END_DATE,
            date,
            selected_filters,
            availableSensors
        });
        const idx = selected_filters.indexOf('time');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_SEARCH_LOCATION = 'ADD_SEARCH_LOCATION';
export function addSearchLocation(location:? string) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_LOCATION,
            location,
            selected_filters
        });
        const idx = selected_filters.indexOf('locations');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_CUSTOM_LOCATION_FILTER = 'ADD_CUSTOM_LOCATION_FILTER';
export function addCustomLocationFilter(selectedPointsLocations:Array<string>, shapeCoordinates: Array<number>) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_CUSTOM_LOCATION_FILTER,
            selectedPointsLocations,
            shapeCoordinates,
        })

    }
}

export const ADD_CUSTOM_TREND_LOCATION_FILTER = 'ADD_CUSTOM_TREND_LOCATION_FILTER';
export function addCustomTrendLocationFilter(selectedPointsLocations:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let origSensors = state.sensors.data;

        dispatch({
            type: ADD_CUSTOM_TREND_LOCATION_FILTER,
            selectedPointsLocations,
            origSensors,
        })

    }
}

export const ADD_CUSTOM_TREND_LOCATIONS_FILTER = 'ADD_CUSTOM_TREND_LOCATIONS_FILTER';
export function addCustomTrendLocationsFilter(selectedPointsLocations:Array<string>) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_CUSTOM_TREND_LOCATIONS_FILTER,
            selectedPointsLocations
        })
    }
}

export const ADD_FILTER = 'ADD_FILTER';
export function addFilter(selectedFilter:string) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_FILTER,
            selectedFilter
        });
        dispatch(updateAvailableFilters())
    }
}

export const CHANGE_FILTER = 'CHANGE_FILTER';
export function changeFilter(selectedFilter:string, idx:number) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: CHANGE_FILTER,
            selectedFilter,
            idx
        });
        dispatch(updateAvailableSensors(idx));
        dispatch(updateAvailableFilters());
    }
}

export const DELETE_FILTER = 'DELETE_FILTER';
export function deleteFilter(idx:number) {
    return (dispatch:Dispatch) => {
        dispatch(updateAvailableSensors(idx - 1));
    }
}

export const UPDATE_AVAILABLE_FILTERS = 'UPDATE_AVAILABLE_FILTERS';
export function updateAvailableFilters() {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        const selected_search = state.selectedSearch;
        const sensors = state.sensors.available_sensors;
        const allFilters = state.searchFilters.filters;
        dispatch({
            type: UPDATE_AVAILABLE_FILTERS,
            selected_filters,
            selected_search,
            allFilters,
            sensors
        })
    }
}

export const UPDATE_AVAILABLE_SENSORS = 'UPDATE_AVAILABLE_SENSORS';
export const DELETE_FILTERS_AFTER = 'DELETE_FILTERS_AFTER';
export function updateAvailableSensors(idx:number) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        if (state.searchFilters.selected.length > (idx + 1 )) {
            dispatch({
                type: DELETE_FILTERS_AFTER,
                idx
            })
        }
        const state2 = getState();
        const selected_filters = state2.searchFilters.selected;
        const selected_search = state2.selectedSearch;
        dispatch({
            type: UPDATE_AVAILABLE_SENSORS,
            selected_filters,
            selected_search
        })
    }
}

export const SELECT_SENSOR = 'SELECT_SENSOR';
export function selectSensorDetail(id:string, name:string, coordinates:Array<number>) {
    return {
        type: SELECT_SENSOR,
        id,
        name,
        coordinates
    };
}

export function fetchSensors(api:string) {
    //TODO: dispatch type is not defined.
    return (dispatch:any) => {
        dispatch(requestSensors(api));

        const endpoint = api + '/api/geostreams/sensors';
        return fetch(endpoint)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveSensors(api, json))
            })
            .then(dispatch(updateAvailableSensors(-1)))
            .catch((error) => {
                console.log('An ERROR occurred! ' + error);
                dispatch(switchBackendError());
            })
    }
}

function fetchSensorhelp(api:string, id:number){
    return (dispatch:any) => {
        const endpoint = api + '/api/geostreams/datapoints/bin/semi/1?sensor_id=' + id;
        return fetch(endpoint)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveSensor(json))
            })
    }
}

export function fetchSensor(name:string) {
    return (dispatch:any, getState:GetState) => {
        const state = getState();
        const api = state.backends.selected;

            //get sensor id from the name
            if (state.sensors.length > 0) {
                const sensor = state.sensors.data.find(x => x.name === name).id;
                dispatch(updateDetail(sensor.id, sensor.name, sensor.geometry.coordinates.slice(0, 2)));
                dispatch(fetchSensorhelp(api, sensor.id));

            } else {
                const endpointsensors = api + '/api/geostreams/sensors';
                let result = fetch(endpointsensors)
                    .then(response => response.json())
                    .then(json => {
                        const sensor = json.find(x => x.name === name);
                        console.log(sensor.id);
                        dispatch(updateDetail(sensor.id, sensor.name, sensor.geometry.coordinates.slice(0, 2)));
                        return fetch(api + '/api/geostreams/datapoints/bin/semi/1?sensor_id=' + sensor.id)
                    });
                result
                    .then(response => response.json())
                    .then(json => {
                    dispatch(receiveSensor(json))
                })
            }
    }
}

export const ADD_TRENDS_ARGS = 'ADD_TRENDS_ARGS';
export function fetchTrendsArgs(chosenParameter:string, baselinePeriod:number,
                                rollingPeriod:number, thresholdChooseValue:number,
                                chosenRegion:string){
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_TRENDS_ARGS,
            chosenParameter,
            baselinePeriod,
            rollingPeriod,
            thresholdChooseValue,
            chosenRegion,
        })
    }
}

export const ADD_TRENDS_COUNT = 'ADD_TRENDS_COUNT';
export function addTrendsCount(number_to_filter:number){
    return (dispatch:Dispatch) => {

        dispatch({
            type: ADD_TRENDS_COUNT,
            number_to_filter,
        })
    }
}

export const FETCH_TRENDS_REGION = 'FETCH_TRENDS_REGION';
export function fetchTrendsRegion(chosenRegion:string){
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let origSensors = state.sensors.data;

        dispatch({
            type: FETCH_TRENDS_REGION,
            chosenRegion,
            origSensors,
        })
    }
}



export const SELECT_TRENDS_PARAMETER = 'SELECT_TRENDS_PARAMETER';
export function selectTrendsParameter(
    parameter:string, threshold_choice:boolean, page:string, view_type: string
) {
    return (dispatch:Dispatch, getState:GetState) => {

        if (page == 'Analysis'){
            dispatch({
                type: SELECT_TRENDS_PARAMETER,
                parameter,
                threshold_choice
            });
            let view_type = 'by-analysis';
            dispatch({
                type: SELECT_TRENDS_VIEW_TYPE,
                view_type
            });
        }
        if (page == 'Trends') {
            const state = getState();
            let totalyear = state.chosenTrends.baseline_totalyear;
            let interval = state.chosenTrends.rolling_interval;
            let season = state.chosenTrends.season;
            let type = 'ADD_CHOOSE_TRENDS';
            dispatch({
                type: SELECT_TRENDS_PARAMETER,
                parameter,
                threshold_choice
            });
            dispatch({
                type: SELECT_TRENDS_VIEW_TYPE,
                view_type
            });
            dispatch(fetchTrends(parameter, totalyear, interval, type, season, view_type));
            dispatch(updateTrendsSensors(page));
        }

    };
}

export const SELECT_TRENDS_SEASON = 'SELECT_TRENDS_SEASON';
export function selectTrendsSeason(season:string, view_type: string) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        let totalyear = state.chosenTrends.baseline_totalyear;
        let interval = state.chosenTrends.rolling_interval;
        let parameter = state.chosenTrends.parameter;
        let type = 'ADD_CHOOSE_TRENDS';
        let page = 'Trends';
        dispatch({
            type: SELECT_TRENDS_SEASON,
            season,
        });
        dispatch(updateTrendsSensors(page));
        if (parameter != '') {
            dispatch(fetchTrends(parameter, totalyear, interval, type, season, view_type));
        }

    };
}

export const SELECT_TRENDS_REGION = 'SELECT_TRENDS_REGION';
export function selectTrendsRegion(region:string, page:string, view_type: string) {
    return (dispatch:Dispatch, getState:GetState) => {
        if (page == 'Analysis'){
            dispatch({
                type: SELECT_TRENDS_REGION,
                region,
            });
            dispatch(updateTrendsSensors(page));
        }
        if (page == 'Trends') {
            const state = getState();
            let totalyear = state.chosenTrends.baseline_totalyear;
            let interval = state.chosenTrends.rolling_interval;
            let season = state.chosenTrends.season;
            let parameter = state.chosenTrends.parameter;
            let type = 'ADD_CHOOSE_TRENDS';
            dispatch({
                type: SELECT_TRENDS_REGION,
                region,
            });
            dispatch(updateTrendsSensors(page));
            if (parameter != '') {
                dispatch(fetchTrends(parameter, totalyear, interval, type, season, view_type));
            }
        }
    };
}

export const SET_TRENDS_SENSORS = 'SET_TRENDS_SENSORS';
export function setTrendsSensors() {
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let sensors = state.sensors.data;

        dispatch({
            type: SET_TRENDS_SENSORS,
            sensors
        });
    }
}

export const SET_TRENDS_TIMEFRAMES = 'SET_TRENDS_TIMEFRAMES';
export function setTrendsTimeframes() {
    return (dispatch:Dispatch) => {
        dispatch({
            type: SET_TRENDS_TIMEFRAMES
        });
    }
}

export const UPDATE_TRENDS_SENSORS = 'UPDATE_TRENDS_SENSORS';
export function updateTrendsSensors(page:string) {
    return (dispatch:Dispatch) => {
        dispatch(setTrendsTimeframes());
        dispatch({
            type: UPDATE_TRENDS_SENSORS,
            page
        })
    }
}

export const SELECT_TRENDS_THRESHOLD = 'SELECT_TRENDS_THRESHOLD';
export function selectTrendsThreshold(threshold:number) {
    return {
        type: SELECT_TRENDS_THRESHOLD,
        threshold
    };
}

export const SELECT_TRENDS_VIEW_TYPE = 'SELECT_TRENDS_VIEW_TYPE';
export function selectTrendsViewType(view_type:string) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: SELECT_TRENDS_VIEW_TYPE,
            view_type
        });
        let region = 'all';
        let page = 'Trends';
        dispatch(selectTrendsRegion(region, page, view_type));
    };
}

export const UPDATE_TRENDS_REGIONS_POINTS = 'UPDATE_TRENDS_REGIONS_POINTS';
export function updateTrendsRegionsPoints() {
    return (dispatch:Dispatch) => {
        dispatch({
            type: UPDATE_TRENDS_REGIONS_POINTS
        });
    };
}

export const SELECT_TRENDS_CALC_BASELINE_SETTING= 'SELECT_TRENDS_CALC_BASELINE_SETTING';
export function selectTrendsCalcBaselineSetting(baseline_totalyear:number) {
    return {
        type: SELECT_TRENDS_CALC_BASELINE_SETTING,
        baseline_totalyear
    };
}

export const SELECT_TRENDS_CALC_ROLLING_SETTING= 'SELECT_TRENDS_CALC_ROLLING_SETTING';
export function selectTrendsCalcRollingSetting(rolling_interval:number) {
    return {
        type: SELECT_TRENDS_CALC_ROLLING_SETTING,
        rolling_interval
    };
}

export const ADD_ANALYSIS_COUNT = 'ADD_ANALYSIS_COUNT';
export function addAnalysisCount(number_to_filter:number){
    return (dispatch:Dispatch) => {

        dispatch({
            type: ADD_ANALYSIS_COUNT,
            number_to_filter,
        })
    }
}

export const FETCH_ANALYSIS_REGION = 'FETCH_ANALYSIS_REGION';
export function fetchAnalysisRegion(region:string){
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let sensors = state.chosenTrends.sensors;

        dispatch({
            type: FETCH_ANALYSIS_REGION,
            region,
            sensors,
        })
    }
}
