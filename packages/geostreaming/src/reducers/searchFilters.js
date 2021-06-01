import { SET_FILTER, REMOVE_FILTER, ADD_CUSTOM_LOCATION } from '../actions/search';

const defaultState = {
    filters: {
        parameters: [],
        locations: [],
        sources: [],
        time: [],
        online: []
    },
    custom_location: {}
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
        case ADD_CUSTOM_LOCATION:
            return { ...state, custom_location: payload };

        default:
            return state;
    }
}