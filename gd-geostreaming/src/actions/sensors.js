// @flow
import { callAPI } from '../utils/io';

import type { SensorType, SourceConfig } from '../utils/flowtype';

const UPDATE_SENSORS_DATA = 'UPDATE_SENSORS_DATA';
type UpdateSensorsDataAction = {
    type: 'UPDATE_SENSORS_DATA',
    sources: { [k: string]: SourceConfig; },
    data: SensorType[]
}
export const updateSensors = (
    sources: { [k: string]: SourceConfig; },
    data: SensorType[]
): UpdateSensorsDataAction => ({
    type: UPDATE_SENSORS_DATA,
    sources,
    data
});

export const fetchSensors = () => {
    return (dispatch: Function, getState: Function) => {
        const { config } = getState();
        callAPI(
            config.geostreamingEndpoint,
            'sensors',
            ({ sensors }) => {
                dispatch(updateSensors(config.source, sensors));
            },
            dispatch
        );
    };
};

export type Action =
    | UpdateSensorsDataAction


export const ACTIONS = {
    UPDATE_SENSORS_DATA
};
