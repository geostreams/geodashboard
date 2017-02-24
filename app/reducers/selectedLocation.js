import update from 'react/lib/update'
import { ADD_SEARCH_PARAMETER} from '../actions'

const defaultState = {location: null}
const location = (state = defaultState, action) => {
	switch(action.type) {
		case 'ADD_SEARCH_LOCATION':
			return Object.assign({}, state, {
		        location: action.payload.location}
    		)
		default:
			return state
	}
}

export default location