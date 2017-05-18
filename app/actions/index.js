// @flow

import type { Sensors, Dispatch, GetState } from "../utils/flowtype";

export const SWITCH_BACKEND = 'SWITCH_BACKEND'
export const switchBackend = (selected:string) => {
    return {
        type: SWITCH_BACKEND,
        selected
    }
}

export const REQUEST_SENSORS = 'REQUEST_SENSORS'
function requestSensors(api:string) {
    return {
        type: REQUEST_SENSORS,
        api
    }
}

export const RECEIVE_SENSORS = 'RECEIVE_SENSORS'
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
    }
}

export const RECEIVE_SENSOR = 'RECEIVE_SENSOR'
function receiveSensor(json:Sensors) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: RECEIVE_SENSOR,
            sensor_data: json,
        });
    }
}

export const UPDATE_DETAIL = 'UPDATE_DETAIL'
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

export const ADD_SEARCH_FILTER = 'ADD_SEARCH_FILTER'
// this is not used for now, it push a new field in state.searchFilters.filters, not state.searchFilters.selected
function addSearchFilter(filter:string) {
    return {
        type: ADD_SEARCH_FILTER,
        filter
    }
}

export const ADD_SEARCH_PARAMETER = 'ADD_SEARCH_PARAMETER'
export function addSearchParameter(parameter:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_PARAMETER,
            parameter,
            selected_filters
        })
        const idx = selected_filters.indexOf('parameters');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_TRENDS = 'ADD_TRENDS';
export function fetchTrends(parameter:string, totalyear:number, interval:number) {
    return (dispatch:Dispatch, getState:GetState) => {
        // For each sensor, get the start/end day for selected parameter from clowder API (the api is same as the one
        // used for detail page, thus it should be quick). then get the trends result from the /datapoints/trends api.
        // Each sensor wil have a dispatch with type = ADD_TRENDS.
        const state = getState();
        const api = state.backends.selected;
        //TODO: add season for GLM
        const season = undefined;
        //TODO: change to year/semi for GLM, may need a config
        const trendsendpoint = api + '/api/geostreams/datapoints/trends?binning=year&semi=all';
        state.sensors.data.filter(s => s.parameters.indexOf(parameter) >= 0)
            .map(sensor => {
                let start_time = new Date(sensor.min_start_time);
                let end_time = new Date(sensor.max_end_time);
                let result;
                let timeframeDays = Math.floor((end_time - start_time) / (1000*60*60*24));
                if (isNaN(end_time.getTime()) || timeframeDays <= (totalyear * 365)) {
                    dispatch({
                        type: ADD_TRENDS,
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

                    let trendsendpointargs = trendsendpoint +
                        "&window_start=" + window_start.toISOString() +
                        "&window_end=" + end_time.toISOString() +
                        "&since=" + start.toISOString() +
                        "&until=" + end_time.toISOString() +
                        "&sensor_id=" + sensor.id +
                        "&attributes=" + parameter;
                    if (season)
                        trendsendpointargs = trendsendpointargs + "&semi=" + season;
                    console.log(trendsendpointargs);
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
                                        type: ADD_TRENDS,
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
                                            type: ADD_TRENDS,
                                            sensor: Object.assign(sensor, {
                                                "trends": json[0].properties,
                                                "trend_start_time": start_time,
                                                "trend_end_time": end_time,
                                            })
                                        });
                                    } else {
                                        dispatch({
                                            type: ADD_TRENDS,
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

export const ADD_SEARCH_DATASOURCE = 'ADD_SEARCH_DATASOURCE'
export function addSearchDataSource(data_source:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_DATASOURCE,
            data_source,
            selected_filters
        })
        const idx = selected_filters.indexOf('data_source');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_START_DATE = 'ADD_START_DATE'
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
        })
        const idx = selected_filters.indexOf('time');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_END_DATE = 'ADD_END_DATE'
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
        })
        const idx = selected_filters.indexOf('time');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_SEARCH_LOCATION = 'ADD_SEARCH_LOCATION'
export function addSearchLocation(location:? string) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_LOCATION,
            location,
            selected_filters

        })
        const idx = selected_filters.indexOf('locations');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_FILTER = 'ADD_FILTER'
export function addFilter(selectedFilter:string) {
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_FILTER,
            selectedFilter
        });
        dispatch(updateAvailableFilters())
    }
}

export const CHANGE_FILTER = 'CHANGE_FILTER'
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

export const DELETE_FILTER = 'DELETE_FILTER'
export function deleteFilter(idx:number) {
    return (dispatch:Dispatch) => {
        dispatch(updateAvailableSensors(idx - 1));
    }
}

export const UPDATE_AVAILABLE_FILTERS = 'UPDATE_AVAILABLE_FILTERS'
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

export const UPDATE_AVAILABLE_SENSORS = 'UPDATE_AVAILABLE_SENSORS'
export const DELETE_FILTERS_AFTER = 'DELETE_FILTERS_AFTER'
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

export const SELECT_SENSOR = 'SELECT_SENSOR'
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
                var result = fetch(endpointsensors)
                    .then(response => response.json())
                    .then(json => {
                        const sensor = json.find(x => x.name === name);
                        console.log(sensor.id)
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
export function fetchTrendsArgs(chosenParameter:string, baselinePeriod:number, rollingPeriod:number, thresholdChooseValue:number){
    return (dispatch:Dispatch) => {
        dispatch({
            type: ADD_TRENDS_ARGS,
            chosenParameter,
            baselinePeriod,
            rollingPeriod,
            thresholdChooseValue,
        })
    }
}