import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedParameters from './selectedParameters'
import selectedDataSources from './selectedDataSources'
import selectedStartDate from './selectedStartDate'
import selectedEndDate from './selectedEndDate'

const geodashboardApp = combineReducers({
  backends,
  sensors,
  searchFilters,
  selectedParameters,
  selectedDataSources,
  selectedStartDate,
  selectedEndDate
})

export default geodashboardApp
