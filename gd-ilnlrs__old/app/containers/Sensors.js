/*
 * @flow
 */

import {connect} from 'react-redux';
import SensorsComponent from '../components/Sensors';

const mapStateToProps = (state) => {
    return {
        sensorsData: state.sensors.data
    }
};

const Sensors = connect(mapStateToProps)(SensorsComponent);

export default Sensors;