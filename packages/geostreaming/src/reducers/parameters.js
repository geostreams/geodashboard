// @flow
import { ACTIONS } from '../actions/parameters';

import type { Action } from '../actions/parameters';
import type {
    ParameterCategoryType,
    ParameterMappingsType,
    ParameterType
} from '../utils/flowtype';

type State = {
    parameters: ParameterType[];
    categories: ParameterCategoryType[];
    mappings: ParameterMappingsType[];
}

const INIT_STATE = {
    parameters: [],
    categories: [],
    mappings: []
};

export default (state: State = INIT_STATE, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_PARAMETERS_DATA:
            return action.data;
        default:
            return state;
    }
};
