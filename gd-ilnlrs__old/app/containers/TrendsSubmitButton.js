/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsSubmitButtonComponent from '../components/TrendsSubmitButton';
import {fetchAnalysis, fetchAnalysisRegion} from '../actions';
import type {Dispatch} from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenParameter: state.chosenTrends.parameter,
        chosenRegion: state.chosenTrends.region,
        baselinePeriod: state.chosenTrends.baseline_total_year,
        rollingPeriod: state.chosenTrends.rolling_interval,
        thresholdChooseValue: state.chosenTrends.threshold,
        originalSensors: state.chosenTrends.sensors,
        trendNumberCompleted: state.chosenTrends.number_to_filter,
        parameters: state.sensors.parameters
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClickAnalysis: (chosenParameter, chosenRegion, baselinePeriod, rollingPeriod) => {

            dispatch(fetchAnalysisRegion(chosenRegion));

            dispatch(fetchAnalysis(chosenParameter, baselinePeriod, rollingPeriod));

        }
    }
};

const TrendsSubmitButton = connect(mapStateToProps, mapDispatchToProps)(TrendsSubmitButtonComponent);

export default TrendsSubmitButton;