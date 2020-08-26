// @flow
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import logger from 'gd-core/src/utils/logger';

export const callAPI = (host: string, endpoint: string, successCallback: ?Function, dispatch: ?Function) => {
    if (dispatch) {
        dispatch(updateLoadingStatus(true));
    }

    return fetch(`${host}/api/${endpoint}`)
        .then(response => response.json())
        .then((json) => {
            if (successCallback) {
                successCallback(json);
            }
        })
        .catch((error) => {
            logger.error(`Error: ${error}`);
        })
        .finally(() => {
            if (dispatch) {
                dispatch(updateLoadingStatus(false));
            }
        });
};
