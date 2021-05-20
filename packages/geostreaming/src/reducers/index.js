// @flow
import coreReducers from '@geostreams/core/src/reducers';

import config from './config';
import __new_parameters from './parameters';
import __new_sensors from './sensors';
import __new_searchFilters from './searchFilters';

export default {
    config,
    __new_parameters,
    __new_sensors,
    __new_searchFilters,
    ...coreReducers
};
