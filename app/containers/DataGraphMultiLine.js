// @flow

import { connect } from 'react-redux';
import DataGraphMultiLineComponent from '../components/DataGraphMultiLine';
import { fetchSensor } from '../actions/index';
import type { Dispatch } from '../utils/flowtype';

const mapStateToProps = (state) => {
    return {
        property: state.sensors.data,
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadSensor: (id, name) => {
            dispatch(fetchSensor(name, 'day'))
        }
    }
};

const DataGraphMultiLine = connect(mapStateToProps, mapDispatchToProps)(DataGraphMultiLineComponent);

export default DataGraphMultiLine;