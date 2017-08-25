/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsSubmitButtonComponent from '../components/TrendsSubmitButton';
import { fetchTrends, fetchAnalysisRegion } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenParameter: state.chosenTrends.parameter,
        chosenRegion: state.chosenTrends.region,
        baselinePeriod: state.chosenTrends.baseline_totalyear,
        rollingPeriod: state.chosenTrends.rolling_interval,
        thresholdChooseValue: state.chosenTrends.threshold,
        originalSensors: state.chosenTrends.sensors,
        trendNumberCompleted: state.chosenTrends.number_to_filter,
        parameters: state.sensors.parameters,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClickAnalysis:(chosenParameter, chosenRegion, baselinePeriod, rollingPeriod,
                         thresholdChooseValue, trendsSeason, trendsType, view_type) => {

            dispatch(fetchAnalysisRegion(
                chosenRegion
            ));

            dispatch(fetchTrends(
                chosenParameter, baselinePeriod, rollingPeriod, trendsType, trendsSeason, view_type
            ));

        }
    }
};

const TrendsSubmitButton = connect(mapStateToProps, mapDispatchToProps)(TrendsSubmitButtonComponent);

export default TrendsSubmitButton;
