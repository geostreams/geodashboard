/*
 * @flow
 */
import { connect } from 'react-redux'
import MapComponent from '../components/Map'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        availableSensors: state.sensors.available_sensors
    }
};

const Map = connect(mapStateToProps)(MapComponent);

export default Map;
