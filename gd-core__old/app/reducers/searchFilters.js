/*
 * @flow
 */


import {ADD_SEARCH_FILTER, ADD_FILTER, CHANGE_FILTER, DELETE_FILTER, DELETE_FILTERS_AFTER} from '../actions';
import type {searchFiltersState} from '../utils/flowtype';

type SearchFilterAction = {|
    type: string, filter: Array<Object>, selectedFilter: Array<string>, allFilters: Object, idx: number
|};

const defaultState = {
    filters: [{'id': 'locations'}, {'id': 'data_sources'}, {'id': 'parameters'}, {'id': 'time'},
        {'id': 'span'}, {'id': 'online'}],
    selected: []
};

const filters = (state: searchFiltersState = defaultState, action: SearchFilterAction) => {
    switch (action.type) {
        case ADD_SEARCH_FILTER:
            return Object.assign({}, state, {
                filters: {$push: action.filter}
            });

        case ADD_FILTER:
            const newSelected = state.selected.concat(action.selectedFilter);
            return Object.assign({}, state, {selected: newSelected});

        case CHANGE_FILTER:
            return Object.assign({}, state, {selected: action.selectedFilter});

        case DELETE_FILTER:
            let newFiltersDelete = state.selected.slice(0, action.idx);
            newFiltersDelete = newFiltersDelete.concat(state.selected.slice(parseInt(action.idx) + 1));
            return Object.assign({}, state, {selected: newFiltersDelete});

        case DELETE_FILTERS_AFTER:
            let newFiltersDeleteAfter = state.selected.slice(0, action.idx + 1);
            return Object.assign({}, state, {selected: newFiltersDeleteAfter});

        default:
            return state
    }
};

export default filters;
