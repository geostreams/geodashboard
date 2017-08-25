/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsParametersComponent from '../components/TrendsParameters';
import { selectTrendsParameter } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenParameter: state.chosenTrends.parameter,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsParameter:(parameter, threshold_choice, page, viewtype) => {
            dispatch(selectTrendsParameter(parameter, threshold_choice, page, viewtype));
        },
    }
};

const TrendsParameters = connect(mapStateToProps, mapDispatchToProps)(TrendsParametersComponent);

export default TrendsParameters;
