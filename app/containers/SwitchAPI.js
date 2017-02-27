import { connect } from 'react-redux'
import { switchBackend, fetchSensors } from '../actions'
import SwitchAPIComponent from '../components/SwitchAPI'

const mapStateToProps = (state, ownProps) => {
	return {
		selected: state.backends.selected,
    	endpoints: state.backends.endpoints
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onBackendChange: (selected) => {
			dispatch(switchBackend(selected));
			dispatch(fetchSensors(selected))
		}
	}
};

const SwitchAPI = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchAPIComponent);

export default SwitchAPI