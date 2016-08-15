import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'

const geodashboardApp = combineReducers({
  backends,
  sensors,
  searchFilters,
  selectedParameters,
  selectedDataSources,
})

export default geodashboardApp
