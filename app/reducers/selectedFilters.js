import {ADD_FILTER, CHANGE_FILTER, DELETE_FILTER} from '../actions'

const defaultState = {selected_filters: []};

const selected_filters = (state = defaultState, action) => {
    switch(action.type) {
        case ADD_FILTER:
            return Object.assign({}, state, {
                selected_filters: action.selectedFilter
            });

        case CHANGE_FILTER:
            return Object.assign({}, state, {selected_filters: action.selectedFilter});

        case DELETE_FILTER:
            let newFiltersDelete = state.selected_filters.slice(0, action.idx);
            newFiltersDelete = newFiltersDelete.concat(state.selected_filters.slice(parseInt(action.idx)+1));
            return Object.assign({}, state, {selected_filters: newFiltersDelete});

        default:
            return state
    }
}

export default selected_filters