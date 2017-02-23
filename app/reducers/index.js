import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'
import selectedDate from './selectedDate'
import selectedLocation from './selectedLocation'
import selectedFilters from './selectedFilters'

const geodashboardApp = combineReducers({
  backends,

  searchFilters,
  selectedParameters,
  selectedDataSources,
  selectedDate,
  selectedLocation,
    sensors,
    selectedFilters
})

export default geodashboardApp
