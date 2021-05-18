/*
 * @flow
 */

import {INITIALIZE_EXPLORE_DATASOURCES, UPDATE_EXPLORE_DATASOURCE} from '../actions';
import type {exploreFilteringState, Sensors} from '../utils/flowtype';
import {collectSources} from './sensors';

type exploreFilteringAction = {| type: string, sensors: Sensors, data_sources: Array<string> |};

const defaultState = {
    data_sources: {selected: [], available: []},
};

const exploreFiltering = (state: exploreFilteringState = defaultState, action: exploreFilteringAction) => {
    switch (action.type) {
        case INITIALIZE_EXPLORE_DATASOURCES:
            const exploreSources = updateExploreSources(action.sensors, state);
            return Object.assign({}, state, exploreSources);

        case UPDATE_EXPLORE_DATASOURCE:
            const tempState = Object.assign({}, state,
                {data_sources: {selected: action.data_sources, available: state.data_sources.available}});
            return Object.assign({}, state, tempState);

        default:
            return state;
    }
};

function updateExploreSources(sensors, state) {
    return Object.assign({}, state,
        {data_sources: {selected: collectSources(sensors), available: collectSources(sensors)}});
}

export default exploreFiltering;