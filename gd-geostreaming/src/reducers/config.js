// @flow
import { ACTIONS } from '../actions/config';

import type { Action } from '../actions/config';
import type { Config } from '../utils/flowtype';

const INIT_STATE: Config = {
    geostreamingEndpoint: process.env.GEOSTREAMS_URL || '',

    map: {
        clusterExpandCountThreshold: 10,
        clusterExpandZoomThreshold: 12
    },

    sensors: {
        displayOnlineStatus: true
    },

    source: {}
};

export default (state: Config = INIT_STATE, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_GEOSTREAMING_CONFIG:
            return {
                ...INIT_STATE,
                ...action.config
            };
        default:
            return state;
    }
};
