/*
 * @flow
 */

import { connect } from 'react-redux'
import { addSearchParameter, addSearchDataSource } from '../actions'
import filterOption from '../components/FilterOption'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        selectedParameters: state.selectedSearch.parameters.selected,
        selectedDataSources: state.selectedSearch.data_sources.selected,
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        onOptionChange: (event, selectedParameters, selectedDataSources) => {

            var value = event.target.value;
            if (event.target.checked) {
                if (event.target.name == "parameters") {
                    selectedParameters.push(value);
                    dispatch(addSearchParameter(selectedParameters));

                } else if (event.target.name == "data_source") {
                    selectedDataSources.push(value);
                    dispatch(addSearchDataSource(selectedDataSources));
                }

            } else {
                if (event.target.name == "parameters") {
                    var idx:number = selectedParameters.indexOf(value);
                    if (idx > -1) {
                        selectedParameters.splice(idx, 1);
                        dispatch(addSearchParameter(selectedParameters));
                    }
                } else if (event.target.name == "data_source") {
                    var idx:number = selectedDataSources.indexOf(value);
                    if (idx > -1) {
                        selectedDataSources.splice(idx, 1);
                        dispatch(addSearchDataSource(selectedDataSources));

                    }
                }
            }
        }
    }
};

const FilterOption = connect(mapStateToProps, mapDispatchToProps)(filterOption);

export default FilterOption