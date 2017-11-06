/*
 * @flow
 */

import { connect } from 'react-redux';
import LineChartWithDeviationsComponent from '../components/LineChartWithDeviations';

const mapStateToProps = (state) => {
    return {
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter
    }
};

const LineChartWithDeviations = connect(mapStateToProps)(LineChartWithDeviationsComponent);

export default LineChartWithDeviations
