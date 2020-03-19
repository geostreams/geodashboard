// @flow
import { callAPI } from '../utils/io';

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

export const fetchParameters = () => {
    return (dispatch: Function) => {
        callAPI(
            'parameters',
            ({ parameters, categories, mappings }) => {
                dispatch(updateParameters({ parameters, categories, mappings }));
            },
            dispatch
        );
    };
};

export type Action =
    | UpdateParametersDataAction


export const ACTIONS = {
    UPDATE_PARAMETERS_DATA
};
