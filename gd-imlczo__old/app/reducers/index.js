/*
 * @flow
 */

import {combineReducers} from 'redux';
import backends from './backends';
import sensors from './sensors';
import searchFilters from './searchFilters';
import selectedSearch from './selectedSearch';
import sensorDetail from './sensorDetail';
import chosenTrends from './chosenTrends';
import exploreLayers from './exploreLayers';
import exploreFiltering from './exploreFiltering';
import parameters from './parameters';


const geodashboardApp = combineReducers({
    backends,
    searchFilters,
    sensors,
    selectedSearch,
    sensorDetail,
    chosenTrends,
    exploreLayers,
    exploreFiltering,
    parameters
});

export default geodashboardApp;
