/*
 * @flow
 */
import { connect } from 'react-redux'
import ExploreMapComponent from '../components/ExploreMap'
import { addCustomLocationFilter, addCustomTrendLocationFilter } from '../actions'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        popupSensorname: state.sensorDetail.name,
        popupCoordinates: state.sensorDetail.coordinates
    }
};

const ExploreMap = connect(mapStateToProps)(ExploreMapComponent);

export default ExploreMap;
