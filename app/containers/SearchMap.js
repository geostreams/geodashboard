/*
 * @flow
 */
import { connect } from 'react-redux'
import SearchMapComponent from '../components/SearchMap'
import { addCustomLocationFilter, addCustomTrendLocationFilter } from '../actions'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        updateSensors: state.sensors.available_sensors,
        drawn_sensors: state.sensors.draw_available_sensors,
        selectedLocation: state.selectedSearch.locations.selected
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
