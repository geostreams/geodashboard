import { combineReducers } from 'redux'
import backends from './backends'
import sensors from './sensors'

const geodashboardApp = combineReducers({
  backends,
  sensors
})

export default geodashboardApp
