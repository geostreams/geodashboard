import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'
import selectedDate from './selectedDate'
import selectedLocation from './selectedLocation'

const geodashboardApp = combineReducers({
  backends,
  sensors,
  searchFilters,
  selectedParameters,
  selectedDataSources,
  selectedDate,
  selectedLocation,
})

export default geodashboardApp
