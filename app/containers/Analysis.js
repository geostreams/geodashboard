import { connect } from 'react-redux';
import AnalysisComponent from '../components/Analysis';
import { fetchTrends, fetchTrendsArgs, fetchTrendsRegion } from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        parameters: state.sensors.parameters,
        sensorsData: state.sensors.data,
        trendNumberCompleted: state.sensorTrends.number_to_filter,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClickAnalysis:(chosenParameter, baselinePeriod, rollingPeriod,
                         thresholdChooseValue, chosenRegion) => {
            let type = 'ADD_TRENDS';
            let season = 'all';
            //TODO: check if all arguments are set. otherwise alert
            dispatch(
                fetchTrendsRegion(chosenRegion)
            );
            dispatch(
                fetchTrendsArgs(chosenParameter, baselinePeriod, rollingPeriod, thresholdChooseValue, chosenRegion)
            );
            dispatch(
                fetchTrends(chosenParameter, baselinePeriod, rollingPeriod, type, season)
            );
        }
    }
};

const Analysis = connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);

export default Analysis
