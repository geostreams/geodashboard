// @flow
import coreReducers from 'gd-core/src/reducers';

import config from './config';
import __new_parameters from './parameters';
import __new_sensors from './sensors';

export default {
    config,
    __new_parameters,
    __new_sensors,
    ...coreReducers
};
