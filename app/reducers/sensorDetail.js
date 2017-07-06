import { SELECT_SENSOR, RECEIVE_SENSOR, UPDATE_DETAIL } from '../actions'

const defaultState = {id: null, datapoints: []};

const sensorDetail = (state:backendsState = defaultState, action) => {
    switch(action.type) {
        case SELECT_SENSOR:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                coordinates: action.coordinates
            });
        case RECEIVE_SENSOR:
            return Object.assign({}, state, {
                datapoints: collectdata(action.sensor_data)
            });
        case UPDATE_DETAIL:
            return Object.assign({}, state, {
                id: action.id,
                name: action.name,
                coordinates: action.coordinates
            });
        default:
            return state
    }
};

//TODO: sum to average
function groupBy(array, col, value) {
    var r = [], o = {};
    array.forEach(function (a) {
        if (!o[a[col]]) {
            o[a[col]] = {};
            o[a[col]][col] = a[col];
            o[a[col]][value] = 0;
            r.push(o[a[col]]);
        }
        o[a[col]][value] += +a[value];
    });
    return r;
};

function collectdata(data){
    //console.log(data[0]);
    for(var key in data[0].properties){
        data[0].properties[key] = groupBy(data[0].properties[key], 'label', 'average');
    }
    return data[0].properties;
}

export default sensorDetail