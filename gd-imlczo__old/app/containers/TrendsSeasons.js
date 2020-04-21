/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsSeasonsComponent from '../components/TrendsSeasons';
import {selectTrendsSeason} from '../actions';
import type {Dispatch} from '../utils/flowtype';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsSeason: (season, view_type) => {
            dispatch(selectTrendsSeason(season, view_type));
        }
    }
};

const TrendsSeasons = connect(null, mapDispatchToProps)(TrendsSeasonsComponent);

export default TrendsSeasons;
