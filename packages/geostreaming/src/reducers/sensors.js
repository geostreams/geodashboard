// @flow
import logger from '@geostreams/core/src/utils/logger';
import { values } from '@geostreams/core/src/utils/array';

import { ACTIONS } from '../actions/sensors';
import { getSourceName } from '../utils/sensors';

import type { Action } from '../actions/sensors';
import type {
    SensorType, SourceConfig,
    SourceType
} from '../utils/flowtype';

type State = {
    sensors: SensorType[];
    sources: SourceType[];
    regions: string[];
}

const INIT_STATE = {
    sensors: [],
    sources: [],
    regions: []
};

const processData = (sourcesConfig: { [k: string]: SourceConfig; }, data: SensorType[]): State => {
    const sensors = [];
    const sources = {};
    const regions = [];

    data.forEach((sensor) => {
        sensor.type = sensor.geoType;    // FIXME Replace `geoType` with `type` in API (?)
        sensors.push(sensor);

        const source = sensor.properties.type;
        if (source) {
            if (!sources[source.id]) {
                sources[source.id] = { id: source.id, label: getSourceName(sourcesConfig[source.id], source) || '' };
            }
        } else {
            logger.debug(`Found sensor ${sensor.id} without data source`);
        }

        const region = sensor.properties.region;
        if (region) {
            if (regions.indexOf(region) === -1) {
                regions.push(region);
            }
        } else {
            logger.debug(`Found sensor ${sensor.id} without region ${region}`);
        }
    });

    return {
        sensors,
        sources: values(sources)
            .sort((s1, s2) => {
                const s1Rank = (sourcesConfig[s1.id.toLowerCase()] && sourcesConfig[s1.id.toLowerCase()].order) || 9999;
                const s2Rank = (sourcesConfig[s2.id.toLowerCase()] && sourcesConfig[s2.id.toLowerCase()].order) || 9999;
                if (s1Rank !== 9999 || s2Rank !== 9999) {
                    if (s1Rank > s2Rank) {
                        return 1;
                    }
                    if (s1Rank < s2Rank) {
                        return -1;
                    }
                    return 0;
                }
                return s1.label.toUpperCase().localeCompare(s2.label.toUpperCase());
            }),
        regions
    };
};

export default (state: State = INIT_STATE, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_SENSORS_DATA:
            return processData(action.sources, action.data);
        default:
            return state;
    }
};
