import update from 'react/lib/update'

import { ADD_END_DATE} from '../actions'

const defaultState = {date: new Date()}

const end_date = (state = defaultState, action) => {
    switch(action.type) {
        case 'ADD_END_DATE':
            return Object.assign({}, state, {
                date: action.date}
            )
        default:
            return state
    }
}

export default end_date