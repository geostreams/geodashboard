/*
 * @flow
 */

import {connect} from 'react-redux';
import ExploreMapComponent from '../components/ExploreMap';
import type {Dispatch} from "../utils/flowtype";
import {resetDetailPage, resetExploreSensors, initializeExploreDataSources} from "../actions";

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.explore_sensors,
        popupSensorname: state.sensorDetail.name,
        popupCoordinates: state.sensorDetail.coordinates,
        showPopup: state.sensorDetail.showExplorePopup,
        parameters: state.parameters.explore
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        resetDetailPageSelection: () => {
            dispatch(resetDetailPage());
            dispatch(initializeExploreDataSources());
            dispatch(resetExploreSensors());
        }
    }
};

const ExploreMap = connect(mapStateToProps, mapDispatchToProps)(ExploreMapComponent);

export default ExploreMap;