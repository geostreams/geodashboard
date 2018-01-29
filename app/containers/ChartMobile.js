import { connect } from 'react-redux';
import ChartMobileComponent from '../components/ChartMobile';

const mapStateToProps = (state) => {
    return {
        sensorData: state.sensorDetail.datapoints
    }
};

const ChartMobile = connect(mapStateToProps)(ChartMobileComponent);

export default ChartMobile