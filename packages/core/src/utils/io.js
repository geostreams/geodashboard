// @flow
import { updateLoadingStatus } from '../actions/page';

export const callAPI = (
    host: string,
    endpoint: string,
    successCallback: ?Function,
    errorCallback: ?Function,
    dispatch: ?Function
) => {
    if (dispatch) {
        dispatch(updateLoadingStatus(true));
    }

    return fetch(`${host}${endpoint}`)
        .then(response => response.json())
        .then((json) => {
            if (successCallback) {
                successCallback(json);
            }
        })
        .catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            }
        })
        .finally(() => {
            if (dispatch) {
                dispatch(updateLoadingStatus(false));
            }
        });
};
