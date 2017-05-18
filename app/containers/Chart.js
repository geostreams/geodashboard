import { connect } from 'react-redux'
import ChartComponent from '../components/Chart'

const mapStateToProps = (state) => {
    return {
        sensorData: state.sensorDetail.datapoints
    }
};

const Chart = connect(mapStateToProps)(ChartComponent);

export default Chart
