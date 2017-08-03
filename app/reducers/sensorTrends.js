/*
 * @flow
 */

import { ADD_TRENDS, ADD_TRENDS_ARGS, ADD_CUSTOM_TREND_LOCATION_FILTER,
    FETCH_TRENDS_REGION, ADD_TRENDS_COUNT } from '../actions';
import type { trendsSensorsState, Sensor, Sensors } from '../utils/flowtype';
import {pnpoly} from '../utils/arrayUtils';

type TrendsSensorAction = {| type:'ADD_TRENDS' | 'ADD_TRENDS_ARGS',
    sensor:Sensors,
    chosenParameter:string,
    baselinePeriod:string,
    rollingPeriod:string,
    thresholdChooseValue:string,
    chosenRegion: string,
    numberToFilter: number |};

const defaultState = {
    chosen_parameter: '',
    baseline_period: '',
    rolling_period: '',
    threshold_value: '',
    chosen_region: '',
    data: [],
    available_sensors: [],
    number_to_filter: 0,
};

const sensorTrends = (state:trendsSensorsState = defaultState, action:TrendsSensorAction) => {
    switch(action.type) {
        case ADD_TRENDS:
            // push the new sensor into sensorTrends.data
            let tmpsensor = [action.sensor];
            let tmpdata = tmpsensor.concat(state["data"]);

            return Object.assign({}, state, {
                "data" : tmpdata
            });

        case ADD_TRENDS_COUNT:
            return Object.assign({}, state, {
                "number_to_filter": action.number_to_filter
            });

        case ADD_TRENDS_ARGS:
            return Object.assign({}, state, {
                "chosen_parameter": action.chosenParameter,
                "baseline_period": action.baselinePeriod,
                "rolling_period": action.rollingPeriod,
                "threshold_value": action.thresholdChooseValue,
                "chosen_region": action.chosenRegion,
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

        case FETCH_TRENDS_REGION:
            let regionTrendSensors = state.available_sensors;
            if (action.chosenRegion != 'all' && action.chosenRegion != 'draw'
                    && action.chosenRegion != '') {
                regionTrendSensors =
                    filterPresetTrendLocation(action.chosenRegion, action.origSensors);
            }

            return Object.assign({}, state, {
                "available_sensors": regionTrendSensors,
            });

        default:
            return state;
    }
};

function filterCustomTrendLocation(selectedPointsLocations:Array<string>, origSensors: Sensors) {
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

function filterPresetTrendLocation(chosenRegion:string, origSensors: Sensors) {
    let original_sensors = origSensors;
    let region_sensors = [];

    original_sensors.map((sensor) => {
        if (presetRegionCheck(chosenRegion, sensor)) {
            region_sensors.push(sensor);
        }
    });

    return region_sensors;
}

function presetRegionCheck(selectedRegion:string, sensor: Sensor) {

    function findRegion(location) {
        return location.region.id === selectedRegion;
    }

    let customLocation = window.configruntime.trend_regions.find(findRegion);

    if (!customLocation) {
        return false;
    }

    return pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0],
        customLocation.region.geometry.coordinates);

}

export default sensorTrends