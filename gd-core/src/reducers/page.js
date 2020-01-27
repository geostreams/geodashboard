// @flow
import { Record } from 'immutable'

import type { RecordOf } from 'immutable'

import { ACTIONS } from '../actions/page'

import type { Action } from '../actions/page'

type State = {
    isLoading: boolean
}

const stateRecord = Record({
    isLoading: false
})

export default (state: RecordOf<State> = stateRecord(), action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_LOADING_STATUS:
            return state.set('isLoading', action.isLoading)
        default:
            return state
    }
}
