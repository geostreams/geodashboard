// @flow
import { fromJS, List, Map, Record, Set } from 'immutable';

import type { RecordOf } from 'immutable';

import CONFIG from '../config';
import { ACTIONS } from '../actions/sensors';
import { getSourceName } from '../utils/sensors';

import type { Action } from '../actions/sensors';
import type {
    ImmutableSensorType,
    ImmutableSourceType,
    SensorType
} from '../utils/flowtype';

type State = RecordOf<{
    sensors: List<ImmutableSensorType>;
    sources: Set<ImmutableSourceType>;
    regions: Set<string>;
}>

const stateRecord = Record({
    sensors: List(),
    sources: Set(),
    regions: Set()
});

const processData = (data: SensorType[]): {
    sensors: List<ImmutableSensorType>;
    sources: Set<ImmutableSourceType>;
    regions: Set<string>;
} => {
    const sensors = List().asMutable();
    const sources = Set().asMutable();
    const regions = Set().asMutable();

    data.forEach((sensor) => {
        sensor.type = sensor.geoType;    // FIXME Replace `geoType` with `type` in API (?)
        sensors.push(fromJS(sensor));

        const source = sensor.properties.type;
        if (source) {
            sources.add(Map({ id: source.id, label: getSourceName(source) || '' }));
        } else {
            console.warn(`Found sensor ${sensor.id} without data source`);
        }

        const region = sensor.properties.region;
        if (region) {
            // Check if region exists already
            regions.add(region);
        } else {
            console.warn(`Found sensor ${sensor.id} without region`);
        }
    });
    return {
        sensors: sensors.asImmutable(),
        sources: sources
            .sort((s1, s2) => {
                const s1Rank = (CONFIG.source[s1.get('id').toLowerCase()] && CONFIG.source[s1.get('id').toLowerCase()].order) || 9999;
                const s2Rank = (CONFIG.source[s2.get('id').toLowerCase()] && CONFIG.source[s2.get('id').toLowerCase()].order) || 9999;
                if (s1Rank !== 9999 || s2Rank !== 9999) {
                    if (s1Rank > s2Rank) {
                        return 1;
                    }
                    if (s1Rank < s2Rank) {
                        return -1;
                    }
                    return 0;
                }
                return s1.get('label').toUpperCase().localeCompare(s2.get('label').toUpperCase());
            })
            .asImmutable(),
        regions: regions.asImmutable()
    };
};

export default (state: State = stateRecord(), action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_SENSORS_DATA: {
            const { sensors, sources, regions } = processData(action.data);
            return state
                .set('sensors', sensors)
                .set('sources', sources)
                .set('regions', regions);
        }
        default:
            return state;
    }
};
