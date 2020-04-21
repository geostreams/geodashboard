/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsThresholdsComponent from '../components/TrendsThresholds';
import {selectTrendsThreshold} from '../actions';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    return {
        chosenThreshold: state.chosenTrends.threshold,
        chosenParameter: state.chosenTrends.parameter
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsThreshold: (threshold) => {
            dispatch(selectTrendsThreshold(threshold));
        }
    }
};

const TrendsThresholds = connect(mapStateToProps, mapDispatchToProps)(TrendsThresholdsComponent);

export default TrendsThresholds;
