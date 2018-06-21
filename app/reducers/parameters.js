import {RECEIVE_PARAMETERS, FAILED_RECEIVE_PARAMETERS} from "../actions";
import type {Parameters, parametersState} from "../utils/flowtype";

type ParameterAction= {|type: RECEIVE_PARAMETERS, parameters: Array<string>|};

const defaultState = {
    parameters: [],
    categories: [],
    mappings: [],
    explore: [],
    search: [],
    failed: false
};

const parameters = (state: parametersState = defaultState, action: ParameterAction) => {
    switch(action.type) {
        case RECEIVE_PARAMETERS:
            return Object.assign({}, state, {
                parameters: action.parameters,
                categories: action.categories,
                mappings: action.mappings,
                explore: collectExploreParameters(action.parameters),
                search: collectSearchParameters(action.parameters)
            });
        case FAILED_RECEIVE_PARAMETERS:
            return Object.assign({}, state, {
                failed: true
            });
        default:
            return state
    }
};

export function collectDetailParameters(parameters: Parameters) {
    let detail_views = {};
    parameters.map(parameter => {
        parameter.categories.map(category => {
            if(Object.keys(detail_views).indexOf(category) === -1) {
                detail_views[category] = [parameter]
            } else {
                detail_views[category].push(parameter);
            }
        })
    });
    return detail_views
}

export function collectExploreParameters(parameters: Parameters) {
    return parameters.filter(parameter => parameter.explore_view === true)
}

export function collectSearchParameters(parameters: Parameters) {
    return parameters.filter(parameter => parameter.search_view === true)
}

export default parameters
