// @flow
import coreReducers from 'gd-core/src/reducers'

import __new_parameters from './parameters'
import __new_sensors from './sensors'

export default {
    __new_parameters,
    __new_sensors,
    ...coreReducers
}
