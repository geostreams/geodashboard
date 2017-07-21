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
        drawn_sensors: state.sensors.draw_available_sensors,
        popupSensorname: state.sensorDetail.name,
        popupCoordinates: state.sensorDetail.coordinates,
        selectedLocation: state.selectedSearch.locations.selected,
        threshold_value: state.sensorTrends.threshold_value,

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
