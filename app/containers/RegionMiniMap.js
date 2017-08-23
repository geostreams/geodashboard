/*
 * @flow
 */

import { connect } from 'react-redux';
import RegionMiniMapComponent from '../components/RegionMiniMap';


const mapStateToProps = (state) => {
    return {
        threshold_value: state.chosenTrends.threshold,
        trendSensors: state.chosenTrends.trends_sensors,
        selectedParameter: state.chosenTrends.parameter,
    }
};

const RegionMiniMap = connect(mapStateToProps)(RegionMiniMapComponent);

export default RegionMiniMap;
