/*
 * @flow
 */

import { connect } from 'react-redux';
import RegionChartComponent from '../components/RegionChart';

const mapStateToProps = (state) => {
    return {
        trendSensors: state.chosenTrends.trends_sensors,
        selectedParameter: state.chosenTrends.parameter
    }
};

const RegionChart = connect(mapStateToProps)(RegionChartComponent);

export default RegionChart
