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

export const RESET_TRENDS_SENSORS = 'RESET_TRENDS_SENSORS';

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

export const ADD_CHOOSE_TRENDS = 'ADD_CHOOSE_TRENDS';
export function fetchTrends(
    parameter:string, total_year:number, interval:number, view_type:string, season_input:string
) {
    return (dispatch:Dispatch, getState:GetState) => {
        // For each sensor, get the start/end day for selected parameter from clowder API (the api is same as the one
        // used for detail page, thus it should be quick). then get the trends result from the /datapoints/trends api.
        const state = getState();
        const api = state.backends.selected;

        const season = season_input;
        const trends_endpoint = api + '/api/geostreams/datapoints/trends?binning=year';

        let sensorsToFilter;
        if (state.chosenTrends.trends_sensors.length > 0) {
            sensorsToFilter = state.chosenTrends.trends_sensors;
        } else {
            sensorsToFilter = state.sensors.data;
        }

        let number_to_filter = (sensorsToFilter.length);

        dispatch({
            type: ADD_ANALYSIS_COUNT,
            number_to_filter
        });

        dispatch({
            type: RESET_TRENDS_SENSORS
        });

        sensorsToFilter.filter(s => s.parameters.indexOf(parameter) >= 0)
            .map(sensor => {
                let start_time = new Date(sensor.min_start_time);
                let end_time = new Date(sensor.max_end_time);
                let result;
                let time_frame_days = Math.floor((end_time - start_time) / (1000*60*60*24));
                if (isNaN(end_time.getTime()) || time_frame_days <= (total_year * 365)) {
                    dispatch({
                        type: ADD_CHOOSE_TRENDS,
                        sensor: Object.assign(sensor, {
                            "trends": "not enough data",
                            "trend_start_time": start_time,
                            "trend_end_time": end_time
                        })
                    });
                    return undefined;
                } else {
                    const end_year:number = end_time.getFullYear();
                    const window_start:Date = new Date(end_time);
                    window_start.setFullYear(end_year - interval);

                    let start:Date = new Date(end_time);
                    if (total_year == 0) {
                        start = start_time;
                    } else {
                        start.setFullYear(end_year - total_year);
                    }

                    let trends_endpoint_args;
                    trends_endpoint_args =
                        trends_endpoint +
                        "&sensor_id=" + sensor.id +
                        "&attributes=" + parameter;
                    if (view_type == 'by-analysis') {
                        trends_endpoint_args +=
                            "&window_start=" + window_start.toISOString() +
                            "&window_end=" + end_time.toISOString() +
                            "&since=" + start.toISOString() +
                            "&until=" + end_time.toISOString();
                    }

                    if (season)
                        trends_endpoint_args = trends_endpoint_args + "&semi=" + season;

                    result = fetch(trends_endpoint_args);
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
                                        type: ADD_CHOOSE_TRENDS,
                                        sensor: Object.assign(sensor, {
                                            "trends": "trends return no data",
                                            "trend_start_time": start_time,
                                            "trend_end_time": end_time
                                        })
                                    });
                                } else {
                                    let trend_start = new Date(json[0].start_time);
                                    let trend_end = new Date(json[0].end_time);
                                    let time_frame_trends_days = Math.floor((trend_end - trend_start) / (1000*60*60*24));

                                    if (time_frame_trends_days >= (total_year * 365)-180) {
                                        dispatch({
                                            type: ADD_CHOOSE_TRENDS,
                                            sensor: Object.assign(sensor, {
                                                "trends": json[0].properties,
                                                "trend_start_time": start_time,
                                                "trend_end_time": end_time
                                            })
                                        });
                                    } else {
                                        dispatch({
                                            type: ADD_CHOOSE_TRENDS,
                                            sensor: Object.assign(sensor, {
                                                "trends": "trends return no data",
                                                "trend_start_time": start_time,
                                                "trend_end_time": end_time
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

export const ADD_REGION_TRENDS = 'ADD_REGION_TRENDS';
export function fetchRegionTrends(parameter:string, season:string) {
    return (dispatch:Dispatch, getState:GetState) => {
        // For each region sensor, use the parameter, geocode, and season to get the Trends.

        const state = getState();
        const api = state.backends.selected;

        // Set trends_region_endpoint to be: API - '/clowder' + '/geostreams/api/trends/region/'
        const trends_region_endpoint = api.slice(0, -8) + '/geostreams/api/trends/region/';

        const sensorsToFilter = state.chosenTrends.trends_regions;

        sensorsToFilter.filter(s => s.geometry.geocode.length > 0)
            .map(sensor => {
                const trends_region_endpoint_args = trends_region_endpoint + parameter +
                    "?geocode=" + sensor.geometry.geocode.toString().replace(/,/g, "%2C") + "&season=" + season;

                const result = fetch(trends_region_endpoint_args);
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
                            if (json.length < 1) {
                                dispatch({
                                    type: ADD_REGION_TRENDS,
                                    sensor: Object.assign(sensor, {
                                        "region_trends": "trends return no data"
                                    })
                                });
                            } else {
                                dispatch({
                                    type: ADD_REGION_TRENDS,
                                    sensor: Object.assign(sensor, {
                                        "region_trends": json.trends
                                    })
                                });
                            }
                        }
                    });
            });
    }

}

export const ADD_REGION_DETAIL_TRENDS = 'ADD_REGION_DETAIL_TRENDS';
export function fetchRegionDetailTrends(parameter:string, season:string, region:string) {
    return (dispatch:Dispatch, getState:GetState) => {
        // For each region sensor for the Chart on the Trends Detail Page,
        // use the parameter, geocode, and season to get the Trends.

        const state = getState();
        const api = state.backends.selected;

        // Set trends_region_endpoint to be: API - '/clowder' + '/geostreams/api/trends/region/detail/'
        const trends_region_detail_endpoint = api.slice(0, -8) + '/geostreams/api/trends/region/detail/';

        const sensorsToFilter = state.chosenTrends.trends_regions.filter(r => r.name.toUpperCase() == region.toUpperCase());

        sensorsToFilter.filter(s => s.geometry.geocode.length > 0)
            .map(sensor => {
                const trends_region_detail_endpoint_args = trends_region_detail_endpoint + parameter +
                    "?geocode=" + sensor.geometry.geocode.toString().replace(/,/g, "%2C") + "&season=" + season;

                const detail_result = fetch(trends_region_detail_endpoint_args);
                detail_result
                    .then(response => {
                        if (response) {
                            return response.json();
                        } else {
                            return undefined
                        }
                    })
                    .then(json => {
                        if (json) {
                            if (json.length < 1) {
                                dispatch({
                                    type: ADD_REGION_DETAIL_TRENDS,
                                    sensor: Object.assign(sensor, {
                                        "trends_detail": "trends return no data",
                                        "trends_deviation": "trends return no data"
                                    })
                                });
                            } else {
                                dispatch({
                                    type: ADD_REGION_DETAIL_TRENDS,
                                    sensor: Object.assign(sensor, {
                                        "trends_detail": json.average,
                                        "trends_deviation": json.deviation
                                    })
                                });
                            }
                        }
                    });

            });
    }

}

export const ADD_SEARCH_DATASOURCE = 'ADD_SEARCH_DATASOURCE';
export function addSearchDataSource(data_sources:Array<string>) {
    return (dispatch:Dispatch, getState:GetState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_DATASOURCE,
            data_sources,
            selected_filters
        });
        const idx = selected_filters.indexOf('data_sources');
        dispatch(updateAvailableSensors(idx));
    }
}

export const ADD_START_DATE = 'ADD_START_DATE';
export function addStartDate(date:?Date) {
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
export function addEndDate(date:?Date) {
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
            shapeCoordinates
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
            origSensors
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

export const SELECT_ANALYSIS_PARAMETER = 'SELECT_ANALYSIS_PARAMETER';
export function selectAnalysisParameter(
    parameter:string, threshold_choice:boolean, view_type: string
) {
    return (dispatch:Dispatch) => {

        dispatch({
            type: SELECT_ANALYSIS_PARAMETER,
            parameter,
            threshold_choice
        });
        dispatch({
            type: SELECT_TRENDS_VIEW_TYPE,
            view_type
        });

    };
}

export const SELECT_TRENDS_PARAMETER = 'SELECT_TRENDS_PARAMETER';
export function selectTrendsParameter(
    parameter:string, threshold_choice:boolean, view_type: string
) {
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let total_year = state.chosenTrends.baseline_total_year;
        let interval = state.chosenTrends.rolling_interval;
        let season = state.chosenTrends.season;

        dispatch({
            type: SELECT_TRENDS_PARAMETER,
            parameter,
            threshold_choice
        });
        dispatch({
            type: SELECT_TRENDS_VIEW_TYPE,
            view_type
        });
        if (view_type == 'by-sensors') {
            dispatch(fetchTrends(parameter, total_year, interval, view_type, season));
        }
        if (view_type == 'by-regions') {
            dispatch(fetchRegionTrends(parameter, season));
        }
    };
}

export const SELECT_ANALYSIS_REGION = 'SELECT_ANALYSIS_REGION';
export function selectAnalysisRegion(region:string, view_type:string) {
    return (dispatch:Dispatch) => {

        dispatch({
            type: SELECT_ANALYSIS_REGION,
            region
        });
        dispatch(updateTrendsSensors(view_type));
    };
}

export const SELECT_TRENDS_REGION = 'SELECT_TRENDS_REGION';
export function selectTrendsRegion(region:string, view_type: string) {
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let total_year = state.chosenTrends.baseline_total_year;
        let interval = state.chosenTrends.rolling_interval;
        let season = state.chosenTrends.season;
        let parameter = state.chosenTrends.parameter;

        dispatch({
            type: SELECT_TRENDS_REGION,
            region
        });
        dispatch(updateTrendsSensors(view_type));

        if (parameter != '') {
            if (view_type == 'by-sensors') {
                dispatch(fetchTrends(parameter, total_year, interval, view_type, season));
            }
            if (view_type == 'by-regions') {
                dispatch(fetchRegionTrends(parameter, season));
            }
        }

    };
}

export const SELECT_TRENDS_SEASON = 'SELECT_TRENDS_SEASON';
export function selectTrendsSeason(season:string, view_type: string) {
    return (dispatch:Dispatch, getState:GetState) => {

        const state = getState();
        let total_year = state.chosenTrends.baseline_total_year;
        let interval = state.chosenTrends.rolling_interval;
        let parameter = state.chosenTrends.parameter;

        dispatch({
            type: SELECT_TRENDS_SEASON,
            season
        });
        dispatch(updateTrendsSensors(view_type));

        if (parameter != '') {
            if (view_type == 'by-sensors') {
                dispatch(fetchTrends(parameter, total_year, interval, view_type, season));
            }
            if (view_type == 'by-regions') {
                dispatch(fetchRegionTrends(parameter, season));
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
export function updateTrendsSensors(view_type:string) {
    return (dispatch:Dispatch) => {
        dispatch(setTrendsTimeframes());
        dispatch({
            type: UPDATE_TRENDS_SENSORS,
            view_type
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
        dispatch(selectTrendsRegion(region, view_type));
    };
}

export const SELECT_TRENDS_CALC_BASELINE_SETTING= 'SELECT_TRENDS_CALC_BASELINE_SETTING';
export function selectTrendsCalcBaselineSetting(baseline_total_year:number) {
    return {
        type: SELECT_TRENDS_CALC_BASELINE_SETTING,
        baseline_total_year
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
            number_to_filter
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
            sensors
        })
    }
}
