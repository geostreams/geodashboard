/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsDataGraphComponent from '../components/TrendsDataGraph';
import type { Dispatch } from '../utils/flowtype';
import { fetchRegionDetailTrends } from '../actions/index';

const mapStateToProps = (state) => {
    return {
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter,
        selectedSeason: state.chosenTrends.season,
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadDetailSensor: (parameter, season, region) => {
            dispatch(fetchRegionDetailTrends(parameter, season, region))
        }
    }
};

const TrendsDataGraph = connect(mapStateToProps, mapDispatchToProps)(TrendsDataGraphComponent);

export default TrendsDataGraph;