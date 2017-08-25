/*
 * @flow
 */

import { connect } from 'react-redux';
import AnalysisComponent from '../components/Analysis';


const mapStateToProps = (state) => {
    return {
        parameters: state.sensors.parameters,
        sensorsData: state.sensors.data,
        trendNumberCompleted: state.chosenTrends.number_to_filter,
    }
};

const Analysis = connect(mapStateToProps)(AnalysisComponent);

export default Analysis
