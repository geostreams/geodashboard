/*
 * @flow
 */


import {connect} from 'react-redux';
import RegionMiniMapComponent from '../components/RegionMiniMap';

const mapStateToProps = (state) => {
    return {
        trendSensors: state.chosenTrends.trends_sensors,
        allSensors: state.sensors.available_sensors,
        selectedParameter: state.chosenTrends.parameter
    }
};

const RegionMiniMap = connect(mapStateToProps)(RegionMiniMapComponent);

export default RegionMiniMap;
