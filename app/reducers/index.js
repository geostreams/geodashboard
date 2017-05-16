import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'
import searchFilters from './searchFilters'
import selectedSearch from './selectedSearch'
import sensorDetail from './sensorDetail'
import sensorTrends from './sensorTrends'


const geodashboardApp = combineReducers({
  backends,
  searchFilters,
  sensors,
  selectedSearch,
  sensorDetail,
  sensorTrends
})

export default geodashboardApp
