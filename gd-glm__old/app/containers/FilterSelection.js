/*
 * @flow
 */

import {connect} from 'react-redux';
import FilterSelectionComponent from '../components/FilterSelection';
import {
    addSearchParameter, addSearchDataSource, addStartDate, addEndDate, addSearchOnline,
    addSearchLocation, addFilter, deleteFilter, changeFilter, addSpanStart, addSpanEnd
} from '../actions';
import type {Dispatch} from '../utils/flowtype';

const mapStateToProps = (state) => {
    return {
        filters: state.searchFilters.filters,
        selectedFilters: state.searchFilters.selected
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onClearFilter: (clearSelectedParameters, clearSelectedDataSources) => {
            if (clearSelectedParameters) {
                const selectedParameters = [];
                dispatch(addSearchParameter(selectedParameters));
            }
            if (clearSelectedDataSources) {
                const selectedDataSources = [];
                dispatch(addSearchDataSource(selectedDataSources));
            }
        },
        onClearTime: () => {
            dispatch(addStartDate(null));
            dispatch(addEndDate(null));
        },
        onClearLocation: () => {
            dispatch(addSearchLocation(null));
        },
        onClearSpan: () => {
            dispatch(addSpanStart(null));
            dispatch(addSpanEnd(null));
        },
        onClearOnline: () => {
            dispatch(addSearchOnline(null));
        },
        onAddFilter: (selectedFilter) => {
            dispatch(addFilter(selectedFilter));
        },
        onDeleteFilter: (idx) => {
            dispatch(deleteFilter(idx));
        },
        onChangeFilter: (selectedFilter, idx) => {
            dispatch(changeFilter(selectedFilter, idx));
        }
    }
};

const FilterSelection = connect(mapStateToProps, mapDispatchToProps)(FilterSelectionComponent);

export default FilterSelection;