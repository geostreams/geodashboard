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
    return (dispatch) => {
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

export const ADD_SEARCH_FILTER = 'ADD_SEARCH_FILTER'
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
