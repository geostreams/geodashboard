// @flow
import { fromJS, List, Record } from 'immutable'

import type { RecordOf } from 'immutable'

import { ACTIONS } from '../actions/parameters'

import type { Action } from '../actions/parameters'
import type {
    ImmutableParameterCategoryType,
    ImmutableParameterMappingsType,
    ImmutableParameterType,
    ParameterCategoryType,
    ParameterMappingsType,
    ParameterType
} from '../utils/flowtype'

type State = RecordOf<{
    parameters: List<ImmutableParameterType>;
    categories: List<ImmutableParameterCategoryType>;
    mappings: List<ImmutableParameterMappingsType>;
}>

const stateRecord = Record({
    parameters: List(),
    categories: List(),
    mappings: List()
})

const processData = (data: {
    parameters: ParameterType[],
    categories: ParameterCategoryType[],
    mappings: ParameterMappingsType[]
}): {
    parameters: List<ImmutableParameterType>;
    categories: List<ImmutableParameterCategoryType>;
    mappings: List<ImmutableParameterMappingsType>;
} => {
    const parameters = List().asMutable()
    data.parameters.forEach((parameter) => {
        parameters.push(fromJS(parameter))
    })

    const categories = List().asMutable()
    data.categories.forEach((parameter) => {
        categories.push(fromJS(parameter))
    })

    const mappings = List().asMutable()
    data.mappings.forEach((parameter) => {
        mappings.push(fromJS(parameter))
    })
    return { parameters, categories, mappings }
}

export default (state: State = stateRecord(), action: Action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_PARAMETERS_DATA: {
            const { parameters, categories, mappings } = processData(action.data)
            return state
                .set('parameters', parameters)
                .set('categories', categories)
                .set('mappings', mappings)
        }
        default:
            return state
    }
}
