// @flow

import { connect } from 'react-redux';
import DataGraphComponent from '../components/DataGraph';
import { fetchSensor, fetchSensorMobile } from '../actions/index';
import type { Dispatch } from '../utils/flowtype';
import { getMobileSizeMax, getShowRawProcessed} from '../utils/getConfig';

const mapStateToProps = (state) => {
    return {
        property: state.sensors.data,
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        loadSensor: (id, name) => {
            if (screen.width <= getMobileSizeMax()) {
                dispatch(fetchSensorMobile(name))
            } else {
                if (getShowRawProcessed() === true) {
                    dispatch(fetchSensor(name, 'day'))
                } else {
                    dispatch(fetchSensor(name, 'semi'))
                }
            }
        }
    }
};

const DataGraph = connect(mapStateToProps, mapDispatchToProps)(DataGraphComponent);

export default DataGraph;
