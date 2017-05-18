import { connect } from 'react-redux'
import AppComponent from '../components/App'
import { fetchSensors } from '../actions/index'

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors,
        api: state.backends.selected,
        sensors_url: state.backends.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSensors: (selected) => {
            dispatch(fetchSensors(selected))
        }
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App
