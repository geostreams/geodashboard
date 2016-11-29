import { connect } from 'react-redux'
import DownloadButtonsComponent from '../components/DownloadButtons'

const mapStateToProps = (state, ownProps) => {
    return {
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources
    }
}

const DownloadButtons = connect(mapStateToProps)(DownloadButtons)

export default DownloadButtons;