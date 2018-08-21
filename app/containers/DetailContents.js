import {connect} from "react-redux";
import DetailContentsComponent from "../components/DetailContents";
import {fetchSensorMobile, fetchSensor } from "../actions";
import { getMobileSizeMax} from '../utils/getConfig';
import type {Dispatch} from "../utils/flowtype";

const mapStateToProps = (state, ownProps) => {
    return {
        sensorData: state.sensorDetail.datapoints,
        parameterSources: state.sensorDetail.sources
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadSensor: (id, name, use_season, binType, selectedStartDate, selectedEndDate) => {
            if(screen.width <= getMobileSizeMax()) {
                dispatch(fetchSensorMobile(name))
            } else {
                if(use_season) {
                    dispatch(fetchSensor( name, 'season', selectedStartDate, selectedEndDate))
                } else {
                    dispatch(fetchSensor(name, binType, selectedStartDate, selectedEndDate))
                }
            }
        }
    }
};

const DetailContents = connect(mapStateToProps, mapDispatchToProps)(DetailContentsComponent);

export default DetailContents;
