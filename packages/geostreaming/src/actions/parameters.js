// @flow
import { callAPI } from '@geostreams/core/src/utils/io';
import logger from '@geostreams/core/src/utils/logger';

import type { ParameterCategoryType, ParameterMappingsType, ParameterType } from '../utils/flowtype';

const UPDATE_PARAMETERS_DATA = 'UPDATE_PARAMETERS_DATA';
type UpdateParametersDataAction = {
    type: 'UPDATE_PARAMETERS_DATA',
    data: {
        parameters: ParameterType[],
        categories: ParameterCategoryType[],
        mappings: ParameterMappingsType[]
    }
}
export const updateParameters = (
    data: {
        parameters: ParameterType[],
        categories: ParameterCategoryType[],
        mappings: ParameterMappingsType[]
    }
): UpdateParametersDataAction => ({
    type: UPDATE_PARAMETERS_DATA,
    data
});

export const fetchParameters = () => (dispatch: Function, getState: Function) => {
    callAPI(
        getState().config.geostreamingEndpoint,
        '/api/parameters',
        ({ parameters, categories, mappings }) => {
            dispatch(updateParameters({ parameters, categories, mappings }));
        },
        logger.error,
        dispatch
    );
};

export type Action =
    | UpdateParametersDataAction


export const ACTIONS = {
    UPDATE_PARAMETERS_DATA
};
