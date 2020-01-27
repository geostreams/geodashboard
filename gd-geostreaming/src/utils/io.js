// @flow
import { updateLoadingStatus } from 'gd-core/src/actions/page'

import CONFIG from '../config'

export const callAPI = (endpoint: string, successCallback: Function, dispatch: ?Function) => {
    if (dispatch) {
        dispatch(updateLoadingStatus(true))
    }

    return fetch(`${CONFIG.geostreamingEndpoints}/api/${endpoint}`)
        .then(response => response.json())
        .then((json) => {
            successCallback(json)
        })
        .catch((error) => {
            console.error(`Error: ${error}`)
        })
        .finally(() => {
            if (dispatch) {
                dispatch(updateLoadingStatus(false))
            }
        })
}
