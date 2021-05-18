/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsCalculationSettingsComponent from '../components/TrendsCalculationSettings';
import {selectTrendsCalcBaselineSetting, selectTrendsCalcRollingSetting} from '../actions';
import type {Dispatch} from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenCalculationSetting: state.chosenTrends.threshold,
        chosenParameter: state.chosenTrends.parameter,
        chosenBaseline: state.chosenTrends.baseline_total_year,
        chosenRolling: state.chosenTrends.rolling_interval
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsCalcBaselineSetting: (baseline_total_year) => {
            dispatch(selectTrendsCalcBaselineSetting(baseline_total_year));
        },
        onSelectTrendsCalcRollingSetting: (rolling_interval) => {
            dispatch(selectTrendsCalcRollingSetting(rolling_interval));
        }
    }
};

const TrendsCalculationSettings = connect(mapStateToProps, mapDispatchToProps)(TrendsCalculationSettingsComponent);

export default TrendsCalculationSettings;
