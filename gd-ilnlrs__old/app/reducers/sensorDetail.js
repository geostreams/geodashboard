/*
 * @flow
 */

import {
    SELECT_SENSOR, RECEIVE_SENSOR, UPDATE_DETAIL, CLEAN_DETAIL
} from '../actions';
import {getProcessedProperty} from '../utils/getConfig';
import type {sensorDetailState} from '../utils/flowtype';


const defaultState = {
    id: null,
    datapoints: []
};

const sensorDetail = (state: sensorDetailState = defaultState, action: any) => {
    switch (action.type) {
        case SELECT_SENSOR:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                coordinates: action.coordinates,
                showExplorePopup: true
            });
        case RECEIVE_SENSOR:
            let sensor_datapoints = Object.assign({}, action.sensor_data);
            let sensor_sources = Object.assign({}, action.sensor_data);
            return Object.assign({}, state, {
                datapoints: collect_data(sensor_datapoints),
                sources: collect_sources(sensor_sources),
                showExplorePopup: false
            });
        case UPDATE_DETAIL:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                coordinates: action.coordinates,
                showExplorePopup: false
            });
        case CLEAN_DETAIL:
            return Object.assign({}, state, {
                datapoints: [],
                id: null,
                name: null,
                showExplorePopup: false
            });
        default:
            return state
    }
};

function groupBy(array, col, col2, col3, value, processed) {
    let r = [], o = {};
    let copy_array = array;
    array.forEach(function (a) {
        if (!o[a[col]]) {
            o[a[col]] = {};
            o[a[col]][col] = a[col];
            o[a[col]][col2] = a[col2];
            o[a[col]][col3] = a[col3];
            o[a[col]][processed] = a[processed];

            const same_year_values = copy_array.filter(x => x[col] === a[col]);
            let count = 0;
            let values = 0;
            same_year_values.forEach(function (x) {
                count += x.count;
                values += x.count * x.average;
            });
            o[a[col]][value] = values / count;
            r.push(o[a[col]]);
        }
    });
    return r;
}

function collect_data(data) {
    // Handle no return from API
    if (data.length <= 0) {
        return [];
    }

    let output = [];
    for (let key: any in data.properties) {
        output[key] = groupBy(data.properties[key], 'date', 'label', 'data', 'average', getProcessedProperty());
    }
    return output;
}

function collect_sources(data) {
    let output = [];
    for (let key: any in data.properties) {
        let sources = [];
        data.properties[key].forEach(x => {
            x.sources.forEach(source => {
                if (sources.indexOf(source) === -1) {
                    sources.push(source);
                }
            })
        });
        output[key] = sources;
    }
    return output;
}

export default sensorDetail;