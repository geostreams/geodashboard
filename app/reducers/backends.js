/*
 * @flow
 */

import type { backendsState } from '../utils/flowtype'

type BackendAction = {| type:'SWITCH_BACKEND', selected:string |};

const defaultState = {
    endpoints: [],
    selected: ""
};

const backends = (state:backendsState = defaultState, action:BackendAction) => {
	switch(action.type) {
        case 'ADD_ENDPOINTS':
            return Object.assign({}, state, {
                endpoints: window.configruntime.gd3.clowder_endpoints,
                selected: window.configruntime.gd3.clowder_endpoints[0].url
            });
        case 'SWITCH_BACKEND':
            return Object.assign({}, state, {selected: action.selected});
		default:
			return state
	}
};

export default backends