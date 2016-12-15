import { connect } from 'react-redux'
import FilterListComponent from '../components/FilterList'
import { addSearchParameter, addSearchDataSource, addSearchLocation } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        locations: state.sensors.locations,
        sources: state.sensors.sources,
        parameters: state.sensors.parameters,
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources,
        selectedLocation: state.selectedLocation,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
