/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsRegionsComponent from '../components/TrendsRegions';
import { selectTrendsRegion } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        chosenRegion: state.chosenTrends.region,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectTrendsRegion:(region, page, view_type) => {
            dispatch(selectTrendsRegion(region, page, view_type));
        }
    }
};

const TrendsRegions = connect(mapStateToProps, mapDispatchToProps)(TrendsRegionsComponent);

export default TrendsRegions;
