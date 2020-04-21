/*
 * @flow
 */

import {connect} from 'react-redux';
import ExploreLayersItemsComponent from '../components/ExploreLayersItems';
import {updateLayer, setLayerOpacity} from '../actions';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    return {
        layersVisibility: state.exploreLayers.layers_visibility
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectLayers: (layersVisibility) => {
            dispatch(updateLayer(layersVisibility));
        },
        onOpacityChange: (layersVisibility) => {
            dispatch(setLayerOpacity(layersVisibility));
        }
    }
};

const ExploreLayersItems = connect(mapStateToProps, mapDispatchToProps)(ExploreLayersItemsComponent);

export default ExploreLayersItems;
