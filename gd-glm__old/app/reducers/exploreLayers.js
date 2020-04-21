/*
 * @flow
 */

import {SET_AVAILABLE_LAYERS, UPDATE_LAYER, SET_LAYER_OPACITY} from '../actions';
import {getAvailableLayers} from '../utils/getConfig';
import type {exploreLayersState} from '../utils/flowtype';

type layersAction = {|
    type: 'SET_AVAILABLE_LAYERS' | 'UPDATE_LAYER' | 'SET_LAYER_OPACITY',
    name: string, layer: string, opacity: string
|};

const defaultState = {
    layers_visibility: [],
};

const exploreLayers = (state: exploreLayersState = defaultState, action: layersAction) => {
    switch (action.type) {

        case SET_AVAILABLE_LAYERS:
            let available_layers = getAvailableLayers();
            return Object.assign({}, state, {
                layers_visibility: available_layers,
            });

        case UPDATE_LAYER:
            return Object.assign({}, state, {
                layers_visibility: action.layer,
            });

        case SET_LAYER_OPACITY:
            return Object.assign({}, state, {
                layers_visibility: action.opacity,
            });

        default:
            return state;

    }
};

export default exploreLayers
