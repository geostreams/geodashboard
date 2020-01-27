/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsParametersComponent from 'gd-core__old/app/components/TrendsParameters';
import {selectTrendsParameter, selectAnalysisParameter} from 'gd-core__old/app/actions';
import type {Dispatch} from 'gd-core__old/app/utils/flowtype';


const mapStateToProps = (state) => {

    return {
        chosenParameter: state.chosenTrends.parameter
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsParameter: (parameter, threshold_choice, view_type) => {
            if (view_type === 'by-analysis') {
                dispatch(selectAnalysisParameter(parameter, threshold_choice, view_type));
            }

            if (view_type === 'by-sensors' || view_type === 'by-regions') {
                dispatch(selectTrendsParameter(parameter, threshold_choice, view_type));
            }
        },
    }
};

const TrendsParameters = connect(mapStateToProps, mapDispatchToProps)(TrendsParametersComponent);

export default TrendsParameters;
