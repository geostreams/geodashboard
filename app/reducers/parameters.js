/*
 * @flow
 */


import {RECEIVE_PARAMETERS, FAILED_RECEIVE_PARAMETERS} from "../actions";
import type {Parameters, parameterState} from "../utils/flowtype";

type ParameterAction = {|
    type: typeof RECEIVE_PARAMETERS, parameters: Array<Object>,
    categories: [], mappings: []
|};

const defaultState = {
    parameters: [],
    categories: [],
    mappings: [],
    explore: [],
    search: [],
    failed: false,
    multi_parameter_map: []
};

const parameters = (state: parameterState = defaultState, action: ParameterAction) => {
    switch (action.type) {
        case RECEIVE_PARAMETERS:
            const {search_parameters, multi_parameters} = collectSearchParameters(action.parameters);
            return Object.assign({}, state, {
                parameters: updateParameterTitle(action.parameters),
                categories: action.categories,
                mappings: action.mappings,
                explore: collectExploreParameters(action.parameters),
                search: search_parameters,
                multi_parameter_map: multi_parameters
            });
        case FAILED_RECEIVE_PARAMETERS:
            return Object.assign({}, state, {
                failed: true
            });
        default:
            return state
    }
};

export function updateParameterTitle(parameters: Parameters) {
    let new_parameters = [];
    parameters.map(parameter => {
        let {title, unit} = parameter;
        if (unit !== "") {
            title += " (" + unit + ")";
        }

        const new_parameter = Object.assign({}, parameter, {title: title});
        new_parameters.push(new_parameter);
    });
    return new_parameters;
}

export function collectExploreParameters(parameters: Parameters) {

    return updateParameterTitle(parameters.filter(parameter => parameter.explore_view === true))
}

export function collectSearchParameters(parameters: Parameters) {
    let search_parameters = parameters.filter(parameter => parameter.search_view === true);
    let new_search_parameters = [];
    let visited_parameters_names = [];
    let multi_parameters = {};
    search_parameters.map(parameter => {
        if (visited_parameters_names.indexOf(parameter.name) === -1) {
            const matched_parameters = search_parameters.filter(x => x.title === parameter.title && x.unit === parameter.unit);
            if (matched_parameters.length > 1) {
                multi_parameters[parameter.name] = matched_parameters.filter(x => x.name !== parameter.name).map(x => x.name);
                matched_parameters.map(parameter => visited_parameters_names.push(parameter.name))
            }
            new_search_parameters.push(parameter);
        }

    });
    return {search_parameters: updateParameterTitle(new_search_parameters), multi_parameters: multi_parameters};
}

export default parameters;
