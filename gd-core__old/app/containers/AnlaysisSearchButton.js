/*
 * @flow
 */

import {connect} from "react-redux";
import AnalysisSearchButtonComponent from "../components/AnalysisSearchButton";
import {analysisSavedSearch, fetchAnalysis, fetchAnalysisRegion} from "../actions";
import type {Dispatch} from "../utils/flowtype";

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
        onClickButton: (parameter, region, baseline, rolling, threshold) => {
            dispatch(analysisSavedSearch(parameter, region, baseline, rolling, threshold));
            dispatch(fetchAnalysisRegion(region));
            dispatch(fetchAnalysis(parameter, baseline, rolling));
        }
    }

};

const AnalysisSearchButton = connect(mapStateToProps, mapDispatchToProps)(AnalysisSearchButtonComponent);

export default AnalysisSearchButton;
