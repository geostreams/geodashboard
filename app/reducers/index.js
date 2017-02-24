import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'
import selectedDate from './selectedDate'
import selectedLocation from './selectedLocation'
import selectedFilters from './selectedFilters'
import selectedSearch from './selectedSearch'


const geodashboardApp = combineReducers({
  backends,
  searchFilters,
  selectedParameters,
  selectedDataSources,
  selectedDate,
  selectedLocation,
  sensors,
  selectedFilters,
  selectedSearch
})

export default geodashboardApp
