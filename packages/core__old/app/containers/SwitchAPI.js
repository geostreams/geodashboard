/*
 * @flow
 */

import {connect} from 'react-redux';
import {switchBackend, fetchSensors} from '../actions';
import SwitchAPIComponent from '../components/SwitchAPI';
import type {Dispatch} from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        selected: state.backends.selected,
        endpoints: state.backends.endpoints,
        error: state.backends.error
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onBackendChange: (selected: string, title: string, subtitle: string) => {
            dispatch(switchBackend(selected, title, subtitle));
            dispatch(fetchSensors(selected))
        }
    }
};

const SwitchAPI = connect(mapStateToProps, mapDispatchToProps)(SwitchAPIComponent);

export default SwitchAPI;