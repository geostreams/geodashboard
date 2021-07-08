// @flow
import { ACTIONS } from '../actions/config';

import type { Action } from '../actions/config';
import type { Config } from '../utils/flowtype';

const defaultConfig: Config = {
    visualizations: {
        forceVega: false,
        defaultStartAtZero: false,
        defaultSameTimeScale: true
    }
}

export default (state: Config = defaultConfig, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_GEOSTREAMING_CONFIG:
            return {...state, ...action.config};
        default:
            return state;
    }
};
