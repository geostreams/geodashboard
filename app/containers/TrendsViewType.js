/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsViewTypeComponent from '../components/TrendsViewType';
import { selectTrendsViewType } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenViewType: state.chosenTrends.view_type,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsViewType:(view_type) => {
            dispatch(selectTrendsViewType(view_type));
        }
    }
};

const TrendsViewType = connect(mapStateToProps, mapDispatchToProps)(TrendsViewTypeComponent);

export default TrendsViewType;
