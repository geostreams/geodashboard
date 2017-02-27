import { ADD_SEARCH_FILTER, ADD_FILTER, CHANGE_FILTER, DELETE_FILTER } from '../actions'

const defaultState = {filters:[{'id':'locations'}, {'id':'data_source'}, {'id':'parameters'}, {'id':'time'}], selected: []};

const filters = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_SEARCH_FILTER:
			return Object.assign({}, state, {
		        filters: {$push: action.filter}
    	})

        case ADD_FILTER:
        	const newSelected = state.selected.concat(action.selectedFilter);
            return Object.assign({}, state, {selected: newSelected});

        case CHANGE_FILTER:
            return Object.assign({}, state, {selected: action.selectedFilter});

        case DELETE_FILTER:
            let newFiltersDelete = state.selected.slice(0, action.idx);
            newFiltersDelete = newFiltersDelete.concat(state.selected.slice(parseInt(action.idx)+1));
            return Object.assign({}, state, {selected: newFiltersDelete});
		default:
			return state
	}
}

export default filters