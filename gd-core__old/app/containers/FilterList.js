/*
 * @flow
 */

import {connect} from 'react-redux';
import FilterListComponent from '../components/FilterList';
import {addSearchParameter, addSearchDataSource, addSearchLocation, addSearchOnline} from '../actions';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    let startDate, endDate, startSpan, endSpan;
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

    if (state.selectedSearch.span.selected.start !== null) {
        startSpan = state.selectedSearch.span.selected.start.toISOString().slice(0, 10)
    } else {
        startSpan = ""
    }
    if (state.selectedSearch.span.selected.end !== null) {
        endSpan = state.selectedSearch.span.selected.end.toISOString().slice(0, 10)
    } else {
        endSpan = ""
    }

    return {
        locations: state.selectedSearch.locations.available,
        sources: state.selectedSearch.data_sources.available,
        parameters: state.selectedSearch.parameters.available,
        online: state.selectedSearch.online.available,
        selectDate: startDate + "-" + endDate,
        selectedParameters: state.selectedSearch.parameters.selected,
        selectedDataSources: state.selectedSearch.data_sources.selected,
        selectedLocation: state.selectedSearch.locations.selected,
        selectedOnline: state.selectedSearch.online.selected,
        selectSpan: startSpan + "-" + endSpan,
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
        },
        onSelectOnline: (event) => {
            dispatch(addSearchOnline(event.target.value));
        },
    }
};

const FilterList = connect(mapStateToProps, mapDispatchToProps)(FilterListComponent);

export default FilterList;
