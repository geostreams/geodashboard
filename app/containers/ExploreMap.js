/*
 * @flow
 */

import {connect} from 'react-redux';
import ExploreMapComponent from '../components/ExploreMap';
import type {Dispatch} from "../utils/flowtype";
import {resetDetailPage, resetExploreSensors, initializeExploreDataSources, selectSensorDetail} from "../actions";

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.explore_sensors,
        popupSensorID: state.sensorDetail.id,
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
        },
        selectSensor: (id, name, coordinates) => {
            dispatch(selectSensorDetail(id, name, coordinates));
        }
    }
};

const ExploreMap = connect(mapStateToProps, mapDispatchToProps)(ExploreMapComponent);

export default ExploreMap;