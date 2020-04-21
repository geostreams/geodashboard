/*
 * @flow
 */

import backends from 'gd-core__old/app/reducers/backends';
import sensors from 'gd-core__old/app/reducers/sensors';
import searchFilters from 'gd-core__old/app/reducers/searchFilters';
import selectedSearch from 'gd-core__old/app/reducers/selectedSearch';
import exploreLayers from 'gd-core__old/app/reducers/exploreLayers';
import exploreFiltering from 'gd-core__old/app/reducers/exploreFiltering';
import parameters from 'gd-core__old/app/reducers/parameters';

import sensorDetail from './sensorDetail';
import chosenTrends from './chosenTrends';


const geodashboardApp = {
    backends,
    searchFilters,
    sensors,
    selectedSearch,
    sensorDetail,
    chosenTrends,
    exploreLayers,
    exploreFiltering,
    parameters
};

export default geodashboardApp;
