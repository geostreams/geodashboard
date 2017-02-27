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
            const tempState = Object.assign({}, state, {data_sources: {selected: action.data_source, available: state.data_sources.available}});
            const newState = updateSelected(action.selected_filters, tempState, 'data_source');
            return Object.assign({}, state, newState);

        case ADD_SEARCH_PARAMETER:
            const tempStateP = Object.assign({}, state, {parameters: {selected: action.parameter, available: state.parameters.available}});
            const newStateP = updateSelected(action.selected_filters, tempStateP, 'parameters');
            return Object.assign({}, state, newStateP);

        case ADD_SEARCH_LOCATION:
            const tempStateL = Object.assign({}, state, {locations: {selected: action.location, available: state.locations.available}});
            const newStateL = updateSelected(action.selected_filters, tempStateL, 'location');
            return Object.assign({}, state, newStateL);

        case ADD_START_DATE:
            const tempStateSD = Object.assign({}, state, {date: {selected: {start: action.date}}});
            const newStateSD = updateSelected(action.selected_filters, tempStateSD, 'date');
            return Object.assign({}, state, newStateSD);

        case ADD_END_DATE:
            const tempStateED = Object.assign({}, state, {date: {selected: {end: action.date}}});
            const newStateED = updateSelected(action.selected_filters, tempStateED, 'date');
            return Object.assign({}, state, newStateED);

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

function updateSelected(selected_filters, state, type) {
    let newState = Object.assign({}, state);
    const idx = selected_filters.indexOf(type);
    if(idx > 0) {
        const filtersToUpdate = selected_filters.slice(idx + 1);
        filtersToUpdate.map((filter) => {
            switch(filter) {
                case 'data_source':
                    newState = Object.assign({}, newState, {data_sources: {selected: []}});
                    return;
                case 'parameters':
                    newState = Object.assign({}, newState, {parameters: {selected: []}});
                    return;
                case 'date':
                    return;
                case 'location':
                    newState = Object.assign({}, newState, {locations: {selected: null}});
            }
        })
    }
    return newState

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