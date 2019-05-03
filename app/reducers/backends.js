/*
 * @flow
 */

import type {backendsState} from '../utils/flowtype';

type BackendAction = {| type: 'SWITCH_BACKEND', selected: string, title: string, subtitle: string |};

const defaultState = {
    endpoints: [],
    selected: "",
    title: "",
    subtitle: "",
    error: false
};

const backends = (state: backendsState = defaultState, action: BackendAction) => {
    switch (action.type) {
        case 'ADD_ENDPOINTS':
            return Object.assign({}, state, {
                endpoints: window.configruntime.gd3.geostreaming_endpoints,
                selected: window.configruntime.gd3.geostreaming_endpoints[0].url,
                title: window.configruntime.gd3.geostreaming_endpoints[0].title,
                subtitle: window.configruntime.gd3.geostreaming_endpoints[0].subtitle,
                error: false
            });
        case 'SWITCH_BACKEND':
            return Object.assign({}, state, {
                selected: action.selected,
                title: action.title,
                subtitle: action.subtitle,
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

export default backends;
