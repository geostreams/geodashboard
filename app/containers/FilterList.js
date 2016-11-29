import { connect } from 'react-redux'
import FilterListComponent from '../components/FilterList'
import { addSearchParameter, addSearchDataSource } from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        locations: state.sensors.locations,
        sources: state.sensors.sources,
        parameters: state.sensors.parameters,
        time: state.sensors.time,
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSelectAllParameters: (event, selectedParameters) => {
            dispatch(addSearchParameter(selectedParameters));
        },
        onSelectAllDataSources: (event, selectedDataSources) => {
            dispatch(addSearchDataSource(selectedDataSources));
        }
    }
};

const FilterList = connect(mapStateToProps, mapDispatchToProps)(FilterListComponent);

export default FilterList;
