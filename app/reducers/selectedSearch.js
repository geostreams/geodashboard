import {ADD_SEARCH_DATASOURCE, ADD_SEARCH_PARAMETER, ADD_SEARCH_LOCATION, UPDATE_AVAILABLE_FILTERS, ADD_START_DATE, ADD_END_DATE } from '../actions'
import {collectSources, collectLocations, collectParameters} from './sensors'
const defaultState = {  data_sources: {selected: [], available: []},
                        parameters: {selected: [], available: []},
                        locations: {selected: null, available: []},
                        dates: {selected: {start: [new Date("1983-01-01")], end: [new Date()]}, available: {start: [], end: []}}
                    };

const selectedSearch = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_SEARCH_DATASOURCE:
            let available_ds = state.data_sources.available;
            if(action.payload.data_source.length < 1 && available_ds < 1){
                available_ds = action.all_data_sources;
            }
            return Object.assign({}, state, {data_sources: {selected: action.payload.data_source, available: available_ds}});

        case ADD_SEARCH_PARAMETER:
            let available_p = state.parameters.available;
            if(action.payload.parameter.length < 1 && available_p.length < 1 ) {
                available_p = action.all_parameters;
            }
            return Object.assign({}, state, {parameters: {selected: action.payload.parameter, available: available_p}});

        case ADD_SEARCH_LOCATION:
            return Object.assign({}, state, {locations: {selected: action.payload.location, available: state.locations.available}});

        case ADD_START_DATE:
            return Object.assign({}, state, {date: {selected: {start: action.date}}});

        case ADD_END_DATE:
            return Object.assign({}, state, {date: {selected: {end: action.date}}});

        case UPDATE_AVAILABLE_FILTERS:
            const newFilters = updateAvailable(action.sensors, action.selected_filters, action.allFilters, state);
            return Object.assign({}, state, newFilters);

        default:
            return state
    }
}

function intersectArrays(array1, array2) {
    let t;
    if(array2.length > array1.length) {
        t=array2, array2=array1, array1 = t; //Swap array's so 1 is shorter than2
    }
    return array1.filter(function(e) {
        return array2.indexOf(e) > -1
    });
}

function updateAvailable(sensors, selected_filters, allFilters, state){
    let newState = Object.assign({}, state);
    allFilters.map((filterA) => {
        if(selected_filters.indexOf(filterA.id) == selected_filters.length -1) {
            switch(filterA.id) {
                case 'data_source':
                    const newAvailableDataSources = collectSources(sensors);
                    const newSelectedDataSources = intersectArrays(newAvailableDataSources, state.data_sources.selected);
                    newState = Object.assign({}, newState, {data_sources: {selected: newSelectedDataSources, available: newAvailableDataSources}} );
                    return;
                case 'parameters':
                    const newAvailableParameters = collectParameters(sensors);
                    const newSelectedParameters = intersectArrays(newAvailableParameters, state.parameters.selected);
                    newState = Object.assign({}, newState, {parameters: {selected: newSelectedParameters, available: newAvailableParameters}});
                    return;
                case 'date':
                    return;
                case 'locations':
                    const newAvailableLocations = collectLocations(sensors);
                    let location = state.locations.selected;
                    if(newAvailableLocations.indexOf(location) < 0) {
                        location = null;
                    }
                    newState = Object.assign({}, newState, {locations: {selected: location, available: newAvailableLocations}});
                    return
            }
        }
    });
    return newState

}

export default selectedSearch