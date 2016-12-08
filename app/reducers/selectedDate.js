import update from 'react/lib/update'
import { ADD_START_DATE, ADD_END_DATE} from '../actions'

const defaultState = {selectedStartDate: new Date("1983-01-01"), selectedEndDate: new Date()}

const date = (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_START_DATE':
            return Object.assign({}, state, {
                selectedStartDate: action.date}
            )
        case 'ADD_END_DATE':
            return Object.assign({}, state, {
                selectedEndDate: action.date}
            )
        default:
            return state
    }
}

export default date