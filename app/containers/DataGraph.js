// @flow

import { connect } from 'react-redux'
import DataGraphComponent from '../components/DataGraph'
import { fetchSensor } from '../actions/index'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        property: state.sensors.data,
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadSensor: (id, name) => {
            dispatch(fetchSensor(name))
        }
    }
};

const DataGraph = connect(mapStateToProps, mapDispatchToProps)(DataGraphComponent);

export default DataGraph;