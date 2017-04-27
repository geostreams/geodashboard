import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedSearch from './selectedSearch'
import sensorDetail from './sensorDetail'


const geodashboardApp = combineReducers({
  backends,
  searchFilters,
  sensors,
  selectedSearch,
  sensorDetail
})

export default geodashboardApp
