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
    available_sensors: json,
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
export const UPDATE_AVAILABLE_SENSORS = 'UPDATE_AVAILABLE_SENSORS'
export const DELETE_FILTERS_AFTER = 'DELETE_FILTERS_AFTER'
export const ADD_SEARCH_PARAMETER = 'ADD_SEARCH_PARAMETER'
export function addSearchParameter(parameter) {
    return (dispatch, getState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch({
            type: ADD_SEARCH_PARAMETER,
                parameter,
                selected_filters

        })
        const idx = selected_filters.indexOf('parameters');
        if(state.searchFilters.selected.length > (idx +1 )) {
            dispatch({
                type: DELETE_FILTERS_AFTER,
                idx
            })
        }
        const state2 = getState();
        const selected_search = state2.selectedSearch;
        dispatch({
            type: 'UPDATE_AVAILABLE_SENSORS',
            selected_filters,
            selected_search
        })

    }
}

export const ADD_SEARCH_DATASOURCE = 'ADD_SEARCH_DATASOURCE'
export function addSearchDataSource(data_source){
  return (dispatch, getState) => {
      const state = getState();
      const selected_filters = state.searchFilters.selected;
    dispatch ({
        type: ADD_SEARCH_DATASOURCE,
            data_source,
            selected_filters
    })
      const idx = selected_filters.indexOf('data_source');
      if(state.searchFilters.selected.length > (idx +1 )) {
          dispatch({
              type: DELETE_FILTERS_AFTER,
              idx
          })
      }
    const state2= getState();
    const selected_search = state2.selectedSearch;
    dispatch({
        type: 'UPDATE_AVAILABLE_SENSORS',
        selected_filters,
        selected_search
    })
  }
}

export const ADD_START_DATE = 'ADD_START_DATE'
export function addStartDate(date){

    return (dispatch, getState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch ({
            type: ADD_START_DATE,
            date,
            selected_filters
        })
  }
}

export const ADD_END_DATE = 'ADD_END_DATE'
export function addEndDate(date){
    return (dispatch, getState) => {
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        dispatch ({
            type: ADD_END_DATE,
            date, selected_filters
        })
  }
}

export const ADD_SEARCH_LOCATION = 'ADD_SEARCH_LOCATION'
export function addSearchLocation(location){
  return (dispatch, getState) => {
      const state = getState();
      const selected_filters = state.searchFilters.selected;
    dispatch({
      type: ADD_SEARCH_LOCATION,
          location,
            selected_filters

    })
      const idx = selected_filters.indexOf('locations');
      if(selected_filters.length > (idx + 1 )) {
          dispatch({
              type: DELETE_FILTERS_AFTER,
              idx
          })
      }
      const state1 = getState();
      const selected_search = state1.selectedSearch;
      dispatch({
          type: 'UPDATE_AVAILABLE_SENSORS',
          selected_filters,
          selected_search
      })
  }
}

export const UPDATE_AVAILABLE_FILTERS = 'UPDATE_AVAILABLE_FILTERS'
export const ADD_FILTER = 'ADD_FILTER'
export function addFilter(selectedFilter) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_FILTER,
            selectedFilter
        });
        const state = getState();
        const selected_filters = state.searchFilters.selected;
        const selected_search = state.selectedSearch;
        const sensors = state.sensors.available_sensors;
        const allFilters = state.searchFilters.filters;
        dispatch({
            type: 'UPDATE_AVAILABLE_FILTERS',
            selected_filters,
            selected_search,
            allFilters,
            sensors
        })
    }
}

export const CHANGE_FILTER = 'CHANGE_FILTER'
export function changeFilter(selectedFilter, idx) {
  return {
    type: CHANGE_FILTER,
      selectedFilter,
      idx
  }
}

export const DELETE_FILTER = 'DELETE_FILTER'
export function deleteFilter(idx) {
  return  {
    type: DELETE_FILTER,
      idx
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
