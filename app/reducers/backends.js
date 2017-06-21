/*
 * @flow
 */
import type { backendsState } from '../utils/flowtype'

type BackendAction = {| type:'SWITCH_BACKEND', selected:string |};

const defaultState = {
	endpoints:[],
    selected: "",
    title: "",
    subtitle: ""
};


const backends = (state:backendsState = defaultState, action:BackendAction) => {
	switch(action.type) {
        case 'ADD_ENDPOINTS':
            return Object.assign({}, state, {
                endpoints: window.configruntime.clowder_endpoints,
                selected: window.configruntime.clowder_endpoints[0].url,
                title: window.configruntime.clowder_endpoints[0].title,
                subtitle: window.configruntime.clowder_endpoints[0].subtitle
            });
        case 'SWITCH_BACKEND':
          return Object.assign({}, state, {
              selected: action.selected,
              title: action.title,
              subtitle: action.subtitle
          });
		default:
			return state
	}
};

export default backends