// @flow

import { connect } from 'react-redux';
import StackedLineChartComponent from '../components/StackedLineChart';
import { fetchSensor } from '../actions/index';
import type { Dispatch } from '../utils/flowtype';

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadSensor: (id, name) => {
            dispatch(fetchSensor(name, 'day'))
        }
    }
};

const StackedLineChart = connect(null, mapDispatchToProps)(StackedLineChartComponent);

export default StackedLineChart;
