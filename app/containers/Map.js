/*
 * @flow
 */
import { connect } from 'react-redux'
import MapComponent from '../components/Map'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        coordinates: state.sensorDetail.coordinates,
        threshold_value: state.sensorTrends.threshold_value,
        trendsparameter: state.sensorTrends.chosen_parameter,
        trendSensors: state.sensorTrends.data
    }
};

const Map = connect(mapStateToProps)(MapComponent);

export default Map;
