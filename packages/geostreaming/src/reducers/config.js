// @flow
import { ACTIONS } from '../actions/config';

import type { Action } from '../actions/config';
import type { Config } from '../utils/flowtype';

export default (state: Config = {}, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_GEOSTREAMING_CONFIG:
            return action.config;
        default:
            return state;
    }
};
