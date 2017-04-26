/*
 * @flow
 */
import { connect } from 'react-redux'
import MapComponent from '../components/Map'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
    }
};

const Map = connect(mapStateToProps)(MapComponent);

export default Map;
