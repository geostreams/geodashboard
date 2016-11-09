import { connect } from 'react-redux'
import FilterSelectionComponent from '../components/FilterSelection'
import { addSearchParameter, addSearchDataSource } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        filters: state.searchFilters.filters,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClearFilter: (clearSelectedParameters, clearSelectedDataSources) => {
            if(clearSelectedParameters) {
                const selectedParameters = [];
                dispatch(addSearchParameter(selectedParameters));
            }
            if(clearSelectedDataSources) {
                const selectedDataSources = [];
                dispatch(addSearchDataSource(selectedDataSources));
            }
        }
    }
};

const FilterSelection = connect(mapStateToProps, mapDispatchToProps)(FilterSelectionComponent);

export default FilterSelection;