/*
 * @flow
 */
import { connect } from 'react-redux'
import AnalysisMapComponent from '../components/AnalysisMap'
import { addCustomLocationFilter, addCustomTrendLocationFilter } from '../actions'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors.data,
        drawn_sensors: state.sensors.draw_available_sensors,
        selectedLocation: state.selectedSearch.locations.selected,
        threshold_value: state.sensorTrends.threshold_value,
        trendsparameter: state.sensorTrends.chosen_parameter,
        trendSensors: state.sensorTrends.data
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectShapeLocationTrend: (selectPointsLocations) => {
            dispatch(addCustomTrendLocationFilter(selectPointsLocations));
        }
    }

};

const AnalysisMap = connect(mapStateToProps, mapDispatchToProps)(AnalysisMapComponent);

export default AnalysisMap;
