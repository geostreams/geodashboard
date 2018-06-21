import { connect } from 'react-redux'
import LineChartComponent from '../components/Linechart'
import type {Dispatch} from "../utils/flowtype";
import {fetchSensor, fetchSensorMobile} from "../actions";
import { getMobileSizeMax, getShowRawProcessed} from '../utils/getConfig';

const mapStateToProps = (state) => {
    return {
        sensorData: state.sensorDetail.datapoints
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


const LineChart = connect(mapStateToProps, mapDispatchToProps)(LineChartComponent);

export default LineChart;
