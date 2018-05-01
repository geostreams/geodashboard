import { connect } from 'react-redux';
import ChartMultiLineComponent from '../components/ChartMultiLine';

const mapStateToProps = (state) => {
    return {
        sensorData: state.sensorDetail.datapoints
    }
};

const ChartMultiLine = connect(mapStateToProps)(ChartMultiLineComponent);

export default ChartMultiLine;