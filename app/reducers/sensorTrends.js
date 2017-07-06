/*
 * @flow
 */

import { ADD_TRENDS, ADD_TRENDS_ARGS, ADD_CUSTOM_TREND_LOCATION_FILTER } from '../actions';
import type { trendsSensorsState,  Sensors } from '../utils/flowtype';

type TrendsSensorAction = {| type:'ADD_TRENDS' | 'ADD_TRENDS_ARGS',
    sensor:Sensors,
    chosenParameter:string,
    baselinePeriod:string,
    rollingPeriod:string,
    thresholdChooseValue:string |};

const defaultState = {
    chosen_parameter: '',
    baseline_period: '',
    rolling_period: '',
    threshold_value: '',
    data: [],
    available_sensors: [],
};

const sensorTrends = (state:trendsSensorsState = defaultState, action:TrendsSensorAction) => {
    switch(action.type) {
        case ADD_TRENDS:
            // push the new sensor into sensorTrends.data
            let tmpsensor = [action.sensor];
            let tmpdata = tmpsensor.concat(state["data"]);
            return Object.assign({}, state, { "data" : tmpdata });

        case ADD_TRENDS_ARGS:
            return Object.assign({}, state, {
                        "chosen_parameter": action.chosenParameter,
                        "baseline_period": action.baselinePeriod,
                        "rolling_period": action.rollingPeriod,
                        "threshold_value": action.thresholdChooseValue,
                        //remove the old trends result
                        "data":[]
            });

        case ADD_CUSTOM_TREND_LOCATION_FILTER:
            let customTrendLocationSensors =
                filterCustomTrendLocation(action.selectedPointsLocations, action.origSensors);
            return Object.assign({}, state, {
                "available_sensors": customTrendLocationSensors,
                "data": customTrendLocationSensors
            });

        default:
            return state
    }
};

function filterCustomTrendLocation(selectedPointsLocations:Array<string>, origSensors) {
    let original_sensors = origSensors;
    let filteredSensors = [];

    if (selectedPointsLocations[0] == 'reset_points') {

        filteredSensors = original_sensors;

    } else {

        original_sensors.map((sensor) => {
            if (selectedPointsLocations.includes(sensor.name)) {
                filteredSensors.push(sensor);
            }
        });

    }

    return filteredSensors;
}

export default sensorTrends