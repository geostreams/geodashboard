import { connect } from 'react-redux'
import { switchBackend } from '../actions'
import SwitchAPI from '../SwitchAPI'

const mapStateToProps = (state, ownProps) => {
	return {
		selected: state.selected,
    endpoints: state.backends.endpoints
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onBackendChange: (selected) => {
			dispatch(switchBackend(selected))
		}
	}
}

const SwitchBackend = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchAPI)

export default SwitchBackend