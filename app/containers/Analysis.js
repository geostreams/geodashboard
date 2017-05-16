import { connect } from 'react-redux'
import AnalysisComponent from '../components/Analysis'
import { fetchTrends, fetchTrendsArgs } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        parameters: state.sensors.parameters,
        sensorsData: state.sensors.data,
        trendNumberCompleted: state.sensorTrends.data.length
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClickAnalysis:(chosenParameter, baselinePeriod, rollingPeriod, thresholdChooseValue) => {
            //TODO: check if all arguments are set. otherwise alert
            dispatch(fetchTrendsArgs(
                chosenParameter, baselinePeriod, rollingPeriod, thresholdChooseValue
            ));
             dispatch(fetchTrends(chosenParameter, baselinePeriod, rollingPeriod));
        }
    }
};

const Analysis = connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);

export default Analysis
