// @flow

const UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS';
type LoadingStatusAction = {
    type: 'UPDATE_LOADING_STATUS',
    isLoading: boolean
}
export const updateLoadingStatus = (isLoading: boolean): LoadingStatusAction => ({
    type: UPDATE_LOADING_STATUS,
    isLoading
});

export type Action =
    | LoadingStatusAction

export const ACTIONS = {
    UPDATE_LOADING_STATUS
};
