import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'

const geodashboardApp = combineReducers({
  backends,
  sensors,
  searchFilters
})

export default geodashboardApp
