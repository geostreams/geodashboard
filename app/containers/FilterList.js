/*
 * @flow
 */

import {connect} from 'react-redux';
import FilterListComponent from '../components/FilterList';
import {addSearchParameter, addSearchDataSource, addSearchLocation} from '../actions';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    let startDate, endDate;
    if (state.selectedSearch.dates.selected.start !== null) {
        startDate = state.selectedSearch.dates.selected.start.toISOString().slice(0, 10)
    } else {
        startDate = ""
    }
    if (state.selectedSearch.dates.selected.end !== null) {
        endDate = state.selectedSearch.dates.selected.end.toISOString().slice(0, 10)
    } else {
        endDate = ""
    }
    return {
        locations: state.selectedSearch.locations.available,
        sources: state.selectedSearch.data_sources.available,
        parameters: state.selectedSearch.parameters.available,
        selectDate: startDate + "-" + endDate,
        selectedParameters: state.selectedSearch.parameters.selected,
        selectedDataSources: state.selectedSearch.data_sources.selected,
        selectedLocation: state.selectedSearch.locations.selected,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectAllParameters: (event, selectedParameters) => {
            dispatch(addSearchParameter(selectedParameters));
        },
        onSelectAllDataSources: (event, selectedDataSources) => {
            dispatch(addSearchDataSource(selectedDataSources));
        },
        onSelectLocation: (event) => {
            dispatch(addSearchLocation(event.target.value));
        }
    }
};

const FilterList = connect(mapStateToProps, mapDispatchToProps)(FilterListComponent);

export default FilterList;
