import { connect } from 'react-redux'
import AnalysisComponent from '../components/Analysis'
import { addSearchParameter } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        parameters: state.sensors.parameters,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectParameter: (event) => {
            dispatch(addSearchParameter(event.target.value));
        },
    }
};

const Analysis = connect(mapStateToProps, mapDispatchToProps)(AnalysisComponent);

export default Analysis