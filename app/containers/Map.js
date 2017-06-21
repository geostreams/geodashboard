/*
 * @flow
 */
import { connect } from 'react-redux'
import MapComponent from '../components/Map'
import { addCustomLocationFilter, addCustomTrendLocationFilter } from '../actions'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        coordinates: state.sensorDetail.coordinates,
        threshold_value: state.sensorTrends.threshold_value,
        trendsparameter: state.sensorTrends.chosen_parameter,
        trendSensors: state.sensorTrends.data
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectShapeLocation: (selectPointsLocations) => {
            dispatch(addCustomLocationFilter(selectPointsLocations));
        },
        onSelectShapeLocationTrend: (selectPointsLocations) => {
            dispatch(addCustomTrendLocationFilter(selectPointsLocations));
        }
    }
};

const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default Map;
