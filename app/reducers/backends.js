/*
 * @flow
 */

import type { backendsState } from '../utils/flowtype';

type BackendAction = {| type:'SWITCH_BACKEND', selected:string |};

const defaultState = {
    endpoints: [],
    selected: "",
    error: false
};

const backends = (state:backendsState = defaultState, action:BackendAction) => {
	switch(action.type) {
        case 'ADD_ENDPOINTS':
            return Object.assign({}, state, {
                endpoints: window.configruntime.gd3.clowder_endpoints,
                selected: window.configruntime.gd3.clowder_endpoints[0].url,
                error: false
            });
        case 'SWITCH_BACKEND':
            return Object.assign({}, state, {
                selected: action.selected,
                error: false
            });
        case 'SWITCH_BACKEND_ERROR':
            return Object.assign({}, state, {
                error: true
            });
		default:
			return state
	}
};

export default backends
