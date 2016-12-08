import update from 'react/lib/update'
import { ADD_SEARCH_FILTER } from '../actions'

const defaultState = {filters:[{'id':'locations'}, {'id':'data_source'}, {'id':'parameters'}, {'id':'time'}]}

const filters = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_SEARCH_FILTER:
			return Object.assign({}, state, {
		        filters: {$push: action.filter}
    	})
		default:
			return state
	}
}

export default filters