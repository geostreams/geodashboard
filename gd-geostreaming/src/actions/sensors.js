// @flow
import { callAPI } from '../utils/io';

import type { SensorType } from '../utils/flowtype';

const UPDATE_SENSORS_DATA = 'UPDATE_SENSORS_DATA';
type UpdateSensorsDataAction = {
    type: 'UPDATE_SENSORS_DATA',
    data: SensorType[]
}
export const updateSensors = (data: SensorType[]): UpdateSensorsDataAction => ({
    type: UPDATE_SENSORS_DATA,
    data
});

export const fetchSensors = () => {
    return (dispatch: Function) => {
        callAPI(
            'sensors',
            ({ sensors }) => {
                dispatch(updateSensors(sensors));
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
