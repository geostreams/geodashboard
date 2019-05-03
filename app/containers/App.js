/*
 * @flow
 */

import {connect} from 'react-redux';
import AppComponent from '../components/App';
import {fetchSensors, addEndpoints} from '../actions/index';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    return {
        sensors: state.sensors
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadSensors: (selected) => {
            dispatch(addEndpoints())
            dispatch(fetchSensors(selected))
        }
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
