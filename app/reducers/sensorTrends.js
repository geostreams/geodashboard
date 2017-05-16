import { ADD_TRENDS, ADD_TRENDS_ARGS } from '../actions'

const defaultState = {
    "chosen_parameter": null,
    "baseline_period": null,
    "rolling_period": null,
    "threshold_value": null,
    "data": []};

const sensorTrends = (state:backendsState = defaultState, action) => {
    switch(action.type) {
        case ADD_TRENDS:
            // push the new sensor into sensorTrends.data
            let tmpsensor = [action.sensor];
            let tmpdata = tmpsensor.concat(state["data"]);
            return Object.assign({}, state, { "data" : tmpdata })

        case ADD_TRENDS_ARGS:
            return Object.assign({}, state, {
                        "chosen_parameter": action.chosenParameter,
                        "baseline_period": action.baselinePeriod,
                        "rolling_period": action.rollingPeriod,
                        "threshold_value": action.thresholdChooseValue,
                        //remove the old trends result
                        "data":[]
            })

        default:
            return state
    }
};

export default sensorTrends