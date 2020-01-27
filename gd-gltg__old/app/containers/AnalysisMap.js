/*
 * @flow
 */

import {connect} from 'react-redux';
import AnalysisMapComponent from '../components/AnalysisMap';
import {addCustomTrendLocationsFilter} from 'gd-core__old/app/actions';
import type {Dispatch} from 'gd-core__old/app/utils/flowtype';

const mapStateToProps = (state) => {
    return {
        sensors: state.chosenTrends.sensors,
        threshold_value: state.chosenTrends.threshold,
        trendSensors: state.chosenTrends.trends_sensors,
        selectedRegion: state.chosenTrends.region,
        selectedParameter: state.chosenTrends.parameter,
        parameters: state.parameters.parameters
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {

    return {
        onSelectShapeLocationTrend: (selectedPointsLocations) => {
            dispatch(addCustomTrendLocationsFilter(selectedPointsLocations));
        }
    }

};

const AnalysisMap = connect(mapStateToProps, mapDispatchToProps)(AnalysisMapComponent);

export default AnalysisMap;
