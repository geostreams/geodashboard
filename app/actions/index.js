export const SWITCH_BACKEND = 'SWITCH_BACKEND'
export const switchBackend = (selected) => {
  return {
    type: SWITCH_BACKEND,
    selected
  }
}

export const REQUEST_SENSORS = 'REQUEST_SENSORS'
function requestSensors(api) {
  return {
    type: REQUEST_SENSORS,
    api
  }
}

export const RECEIVE_SENSORS = 'RECEIVE_SENSORS'
function receiveSensors(api, json) {
  return {
    type: RECEIVE_SENSORS,
    api,
    sensors: json,
    receivedAt: Date.now()
  }
}

export const ADD_SEARCH_FILTER = 'ADD_SEARCH_FILTER'
function addSearchFilter(filter) {
  return {
    type: ADD_SEARCH_FILTER,
    filter
  }
}

export const ADD_SEARCH_PARAMETER = 'ADD_SEARCH_PARAMETER'
export function addSearchParameter(parameter){
  return {
    type: ADD_SEARCH_PARAMETER,
    parameter
  }
}

export const ADD_SEARCH_DATASOURCE = 'ADD_SEARCH_DATASOURCE'
export function addSearchDataSource(data_source){
  return {
    type: ADD_SEARCH_DATASOURCE,
    data_source
  }
}

export const ADD_START_DATE = 'ADD_START_DATE'
export function addStartDate(date){
  return {
    type: ADD_START_DATE,
    date
  }
}

export const ADD_END_DATE = 'ADD_END_DATE'
export function addEndDate(date){
  return {
    type: ADD_END_DATE,
    date
  }
}

export function fetchSensors(api) {
  return dispatch => {
    dispatch(requestSensors(api))
    const endpoint = api + '/api/geostreams/sensors'
    return fetch(endpoint)
      .then(response => response.json())
      .then(json => {dispatch(receiveSensors(api, json))})
  }
}