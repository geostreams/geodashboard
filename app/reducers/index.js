import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'
import selectedDate from './selectedDate'


const geodashboardApp = combineReducers({
  backends,
  sensors,
  searchFilters,
  selectedParameters,
  selectedDataSources,
  selectedDate
})

export default geodashboardApp
