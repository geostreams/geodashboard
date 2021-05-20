import { SET_FILTER, REMOVE_FILTER } from '../actions/search';

const defaultState = {
    filters: {
        parameters: [],
        locations: [],
        sources: [],
        time: [],
        online: []
    }
};

export default function filterReducer(state = defaultState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [payload.attribute]: payload.query
                }
            };
        case REMOVE_FILTER: {
            const { filters: { [payload.attribute]: omit, ...res } } = state;
            return { ...state, filters: { ...res } };
        }
        default:
            return state;
    }
}