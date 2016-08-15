import update from 'react/lib/update'

import { ADD_SEARCH_PARAMETER} from '../actions'

const defaultState = {parameters: [], data_sources: []}

const parameters = (state = defaultState, action) => {
	console.log("In Parameters reducer");
	switch(action.type) {
		case 'ADD_SEARCH_PARAMETER':
			return Object.assign({}, state, {
		        parameters: action.parameter}
    		)
		default:
			return state
	}
}

export default parameters