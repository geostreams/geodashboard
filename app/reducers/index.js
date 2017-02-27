import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedSearch from './selectedSearch'


const geodashboardApp = combineReducers({
  backends,
  searchFilters,
  sensors,
  selectedSearch
})

export default geodashboardApp
