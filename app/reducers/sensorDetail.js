import { SELECT_SENSOR } from '../actions'

const defaultState = {id: null, datapoints: []}

const sensorDetail = (state:backendsState = defaultState, action) => {
    switch(action.type) {
        case SELECT_SENSOR:
            return Object.assign({}, state, {
                id: action.id,
                coordinates: action.coordinates
            })
        default:
            return state
    }
};

export default sensorDetail