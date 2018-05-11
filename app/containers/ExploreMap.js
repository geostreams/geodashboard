/*
 * @flow
 */

import { connect } from 'react-redux';
import ExploreMapComponent from '../components/ExploreMap';

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        popupSensorname: state.sensorDetail.name,
        popupCoordinates: state.sensorDetail.coordinates,
        showPopup: state.sensorDetail.showExplorePopup
    }
};

const ExploreMap = connect(mapStateToProps)(ExploreMapComponent);

export default ExploreMap;
