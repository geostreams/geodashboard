/*
 * @flow
 */

import {
    ADD_SEARCH_DATASOURCE, ADD_SEARCH_PARAMETER, ADD_SEARCH_LOCATION, ADD_SEARCH_ONLINE, ADD_SPAN_START, ADD_SPAN_END,
    UPDATE_AVAILABLE_FILTERS, ADD_START_DATE, ADD_END_DATE, RECEIVE_SENSORS
} from '../actions';
import {
    collectSources, collectLocations, collectParameters, collectDates, collectOnlineOffline, collectSpanDates
} from './sensors';
import type {
    selectedSearchState, Sensors, DatasourceParameter, Location, Parameters
} from '../utils/flowtype';
import {intersectArrays} from '../utils/arrayUtils';

type SelectedSearchAction = {|
    type: string, sensors: Sensors, data_sources: DatasourceParameter,
    parameters: DatasourceParameter, locations: Location, data_sources: Array<string>, parameter: Array<string>,
    location: ?string, date: ?Date, availableSensors: Sensors, selected_filters: Array<string>, allFilters: Array<Object>,
    multi_parameter_map: { [string]: Array<string> }, searchParameters: Parameters,
    span: ?Date, online: ?string
|};

const defaultState = {
    data_sources: {selected: [], available: []},
    parameters: {selected: [], available: []},
    locations: {selected: null, available: []},
    dates: {
        selected: {start: null, end: null},
        available: {start: new Date("1951-04-10"), end: new Date()}
    },
    span: {
        selected: {start: null, end: null},
        available: {start: new Date("1951-04-10"), end: new Date()}
    },
    online: {selected: null, available: []},
};

const selectedSearch = (state: selectedSearchState = defaultState, action: SelectedSearchAction) => {
    switch (action.type) {
        case ADD_SEARCH_DATASOURCE:
            const tempState = Object.assign({}, state,
                {data_sources: {selected: action.data_sources, available: state.data_sources.available}});
            const newState = updateSelected(action.selected_filters, tempState, 'data_sources');
            return Object.assign({}, state, newState);

        case ADD_SEARCH_PARAMETER:
            const tempStateP = Object.assign({}, state,
                {parameters: {selected: action.parameter, available: state.parameters.available}});
            const newStateP = updateSelected(action.selected_filters, tempStateP, 'parameters');
            return Object.assign({}, state, newStateP);

        case ADD_SEARCH_LOCATION:
            const tempStateL = Object.assign({}, state,
                {locations: {selected: action.location, available: state.locations.available}});
            const newStateL = updateSelected(action.selected_filters, tempStateL, 'locations');
            return Object.assign({}, state, newStateL);

        case ADD_START_DATE:
            const availableDatesS = collectDates(action.availableSensors);
            let newStart = action.date;
            if (newStart !== "" && newStart !== null && newStart !== undefined) {
                if (newStart.getTime() < availableDatesS.start.getTime()) {
                    newStart = availableDatesS.start;
                }
            }
            const newStateSD = Object.assign({}, state, {
                dates: {
                    selected: {start: newStart, end: state.dates.selected.end},
                    available: {start: availableDatesS.start, end: availableDatesS.end}
                }
            });
            return Object.assign({}, state, newStateSD);

        case ADD_END_DATE:
            const availableDatesE = collectDates(action.availableSensors);
            let newEnd = action.date;
            if (newEnd !== "" && newEnd !== null && newEnd !== undefined) {
                if (newEnd.getTime() > availableDatesE.end.getTime()) {
                    newEnd = availableDatesE.end;
                }
            }
            const newStateED = Object.assign({}, state, {
                dates: {
                    selected: {start: state.dates.selected.start, end: newEnd},
                    available: {start: availableDatesE.start, end: availableDatesE.end}
                }
            });
            return Object.assign({}, state, newStateED);

        case ADD_SEARCH_ONLINE:
            const tempStateO = Object.assign({}, state,
                {online: {selected: action.online, available: state.online.available}});
            const newStateO = updateSelected(action.selected_filters, tempStateO, 'online');
            return Object.assign({}, state, newStateO);

        case ADD_SPAN_START:
            const availableSpanDatesS = collectSpanDates(action.availableSensors);
            let newSpanStart = action.span;
            if (newSpanStart !== "" && newSpanStart !== null && newSpanStart !== undefined) {
                if (newSpanStart.getTime() < availableSpanDatesS.start.getTime()) {
                    newSpanStart = availableSpanDatesS.start;
                }
            }
            const newStateSpanSD = Object.assign({}, state, {
                span: {
                    selected: {start: newSpanStart, end: state.span.selected.end},
                    available: {start: availableSpanDatesS.start, end: availableSpanDatesS.end}
                }
            });
            return Object.assign({}, state, newStateSpanSD);

        case ADD_SPAN_END:
            const availableSpanDatesE = collectSpanDates(action.availableSensors);
            let newSpanEnd = action.span;
            if (newSpanEnd !== "" && newSpanEnd !== null && newSpanEnd !== undefined) {
                if (newSpanEnd.getTime() > availableSpanDatesE.end.getTime()) {
                    newSpanEnd = availableSpanDatesE.end;
                }
            }
            const newStateSpanED = Object.assign({}, state, {
                span: {
                    selected: {start: state.span.selected.start, end: newSpanEnd},
                    available: {start: availableSpanDatesE.start, end: availableSpanDatesE.end}
                }
            });
            return Object.assign({}, state, newStateSpanED);
            
        case UPDATE_AVAILABLE_FILTERS:
            const newFilters = updateAvailable(action.sensors, action.selected_filters, action.allFilters,
                action.searchParameters, action.multi_parameter_map, state);
            return Object.assign({}, state, newFilters);

        case RECEIVE_SENSORS:
            const initialAvailableDates = collectDates(action.sensors);
            const newStateAvailableDates = Object.assign({}, state, {
                dates: {selected: {start: state.dates.selected.start, end: state.dates.selected.end}},
                available: {start: initialAvailableDates.start, end: initialAvailableDates.end}
            });
            return Object.assign({}, state, newStateAvailableDates);

        default:
            return state
    }
};

function updateSelected(selected_filters, state, type) {
    let newState = Object.assign({}, state);
    const idx = selected_filters.indexOf(type);
    if (idx > -1) {
        const filtersToUpdate = selected_filters.slice(idx + 1);
        filtersToUpdate.map((filter) => {
            switch (filter) {
                case 'data_sources':
                    newState = Object.assign({}, newState, {data_sources: {selected: []}});
                    return;
                case 'parameters':
                    newState = Object.assign({}, newState, {parameters: {selected: []}});
                    return;
                case 'locations':
                    newState = Object.assign({}, newState, {locations: {selected: null}});
                    return;
                case 'online':
                    newState = Object.assign({}, newState, {online: {selected: null}});
            }
        })
    }
    return newState

}

function updateAvailable(sensors, selected_filters, allFilters, searchParameters, multi_parameter_map, state) {
    let newState = Object.assign({}, state);
    allFilters.map((filterA) => {
        if (selected_filters.indexOf(filterA.id) === selected_filters.length - 1) {
            switch (filterA.id) {
                case 'data_sources':
                    const newAvailableDataSources = collectSources(sensors);
                    const newSelectedDataSources = intersectArrays(newAvailableDataSources, state.data_sources.selected);
                    newState = Object.assign({}, newState,
                        {data_sources: {selected: newSelectedDataSources, available: newAvailableDataSources}});
                    return;
                case 'parameters':
                    const newAvailableParameters = collectParameters(sensors, searchParameters, multi_parameter_map);
                    const newSelectedParameters = intersectArrays(newAvailableParameters, state.parameters.selected);
                    newState = Object.assign({}, newState,
                        {parameters: {selected: newSelectedParameters, available: newAvailableParameters}});
                    return;
                case 'locations':
                    const newAvailableLocations = collectLocations(sensors);
                    let location = state.locations.selected;

                    //comment this out since newAvailableLocations is not an array of string so cannot use
                    // newAvailableLocations.indexOf(location)
                    // if( location!== null && newAvailableLocations.indexOf(location) < 0) {
                    location = null;
                    //}
                    newState = Object.assign({}, newState,
                        {locations: {selected: location, available: newAvailableLocations}});
                    return;
                case 'time':
                    const newAvailableDates = collectDates(sensors);
                    let selected = state.dates.selected;
                    newState = Object.assign({}, {
                        dates: {
                            selected: {start: selected.start, end: selected.end},
                            available: {start: newAvailableDates.start, end: newAvailableDates.end}
                        }
                    });
                    return;
                case 'span':
                    const newAvailableSpan = collectDates(sensors);
                    let selectedSpan = state.span.selected;
                    newState = Object.assign({}, {
                        span: {
                            selected: {start: selectedSpan.start, end: selectedSpan.end},
                            available: {start: newAvailableSpan.start, end: newAvailableSpan.end}
                        }
                    });
                    return;
                case 'online':
                    const newOnlineOfflineOptions = collectOnlineOffline(sensors);
                    let onlineStatus = state.online.selected;
                    onlineStatus = null;
                    newState = Object.assign({}, newState,
                        {online: {selected: onlineStatus, available: newOnlineOfflineOptions}});
                    return;

            }
        }
    });
    return newState

}

export default selectedSearch;
