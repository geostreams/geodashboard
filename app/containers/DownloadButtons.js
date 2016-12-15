import { connect } from 'react-redux'
import DownloadButtonsComponent from '../components/DownloadButtons'

const mapStateToProps = (state, ownProps) => {
    return {
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources,
        selectedStartDate: state.selectedDate.selectedStartDate,
        selectedEndDate: state.selectedDate.selectedEndDate,
        selectedLocation: state.selectedLocation.location,
        api: state.backends.selected,
    }
};

const DownloadButtons = connect(mapStateToProps)(DownloadButtonsComponent);

export default DownloadButtons;