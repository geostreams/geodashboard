/*
 * @flow
 */

import { connect } from 'react-redux';
import LineChartWithDeviationsComponent from '../components/LineChartWithDeviations';
import type { Dispatch } from '../utils/flowtype';
import { fetchRegionDetailTrends } from '../actions/index';


const mapStateToProps = (state) => {
    return {
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter,
        selectedSeason: state.chosenTrends.season,
        detailRegion: state.chosenTrends.detail_region
    }
};


const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadDetailSensor: (parameter, season, region) => {
            dispatch(fetchRegionDetailTrends(parameter, season, region))
        }
    }
};

const LineChartWithDeviations = connect(mapStateToProps, mapDispatchToProps)(LineChartWithDeviationsComponent);

export default LineChartWithDeviations
