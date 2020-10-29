// @flow
import { ACTIONS } from '../actions/page';

import type { Action } from '../actions/page';

type State = {
    isLoading: boolean
}

const INIT_STATE = {
    isLoading: false
};

export default (state: State = INIT_STATE, action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_LOADING_STATUS:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};
