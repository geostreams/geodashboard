import update from 'react/lib/update'

import { ADD_SEARCH_PARAMETER} from '../actions'

const defaultState = {parameters: []}

const parameters = (state = defaultState, action) => {
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