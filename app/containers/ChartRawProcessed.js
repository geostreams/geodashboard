import { connect } from 'react-redux';
import ChartRawProcessedComponent from '../components/ChartRawProcessed';

const mapStateToProps = (state) => {
    return {
        sensorData: state.sensorDetail.datapoints
    }
};

const ChartRawProcessed = connect(mapStateToProps)(ChartRawProcessedComponent);

export default ChartRawProcessed;