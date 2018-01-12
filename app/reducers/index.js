import {combineReducers} from 'redux';
import backends from './backends';
import sensors from './sensors';
import searchFilters from './searchFilters';
import selectedSearch from './selectedSearch';
import sensorDetail from './sensorDetail';
import chosenTrends from './chosenTrends';
import exploreLayers from './exploreLayers';


const geodashboardApp = combineReducers({
    backends,
    searchFilters,
    sensors,
    selectedSearch,
    sensorDetail,
    chosenTrends,
    exploreLayers
});

export default geodashboardApp
