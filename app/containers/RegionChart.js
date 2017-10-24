/*
 * @flow
 */

import { connect } from 'react-redux';
import RegionChartComponent from '../components/RegionChart';

const mapStateToProps = (state) => {
    return {
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter
    }
};

const RegionChart = connect(mapStateToProps)(RegionChartComponent);

export default RegionChart
