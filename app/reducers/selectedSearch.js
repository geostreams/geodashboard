import {ADD_SEARCH_DATASOURCE, ADD_SEARCH_PARAMETER, ADD_SEARCH_LOCATION, UPDATE_AVAILABLE_FILTERS  } from '../actions'

const defaultState = {  data_sources: {selected: [], available: []},
                        parameters: {selected: [], available: []},
                        locations: {selected: null, available: []},
                        dates: {selected: {start: [], end: []}, available: {start: [], end: []}}
                    };

const selectedSearch = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_SEARCH_DATASOURCE:
            return Object.assign({}, state, {data_sources: {selected: action.payload.data_source, available: state.data_sources.available}});

        case ADD_SEARCH_PARAMETER:
            return Object.assign({}, state, {parameters: {selected: action.payload.parameter, available: state.parameters.available}});

        case ADD_SEARCH_LOCATION:
            return Object.assign({}, state, {locations: {selected: action.payload.location, available: state.locations.available}});

        case UPDATE_AVAILABLE_FILTERS:
            const newFilters = updateAvailable(sensors, selected_filters, state);
            return Object.assign({}, state, newFilters);

        default:
            return state
    }
}

function updateAvailable(sensors, selected_filters, state){


}

export default selectedSearch