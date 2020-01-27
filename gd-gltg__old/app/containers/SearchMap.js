/*
 * @flow
 */

import {connect} from 'react-redux';
import {addCustomLocationFilter} from 'gd-core__old/app/actions';
import type {Dispatch} from 'gd-core__old/app/utils/flowtype';
import SearchMapComponent from '../components/SearchMap';

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        drawn_sensors: state.sensors.draw_available_sensors,
        selectedLocation: state.selectedSearch.locations.selected,
        shapeCoordinates: state.sensors.shape_coordinates,
        parameters: state.parameters.search,
        showSensors: state.sensors.search_sensors
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectShapeLocation: (selectPointsLocations, shapeCoordinates) => {
            dispatch(addCustomLocationFilter(selectPointsLocations, shapeCoordinates));
        }
    }
};

const SearchMap = connect(mapStateToProps, mapDispatchToProps)(SearchMapComponent);

export default SearchMap;
