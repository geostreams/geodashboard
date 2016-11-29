import update from 'react/lib/update'

import { ADD_START_DATE} from '../actions'

const defaultState = {date: new Date()}

const start_date = (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_START_DATE':
            return Object.assign({}, state, {
                date: action.date}
            )
        default:
            return state
    }
}

export default start_date