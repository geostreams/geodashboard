import update from 'react/lib/update'

import {ADD_SEARCH_DATASOURCE } from '../actions'

const defaultState = {data_sources: []};

const data_sources = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_SEARCH_DATASOURCE:
			return Object.assign({}, state, {
		        data_sources:  action.payload.data_source}
    		)
		default:
			return state
	}
}

export default data_sources