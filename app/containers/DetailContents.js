import {connect} from "react-redux";
import DetailContentsComponent from "../components/DetailContents";
import {fetchSensorMobile, fetchSensor } from "../actions";
import { getMobileSizeMax, getShowRawProcessed} from '../utils/getConfig';

const mapStateToProps = (state, ownProps) => {
    return {
        sensorData: state.sensorDetail.datapoints
    }
};

const DetailContents = connect(mapStateToProps)(DetailContentsComponent);

export default DetailContents;
