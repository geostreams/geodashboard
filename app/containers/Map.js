import { connect } from 'react-redux'
import MapComponent from '../components/Map'

const mapStateToProps = (state, ownProps) => {
    return {
        sensors: state.sensors.data,
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources,
    }
};

const Map = connect(mapStateToProps)(MapComponent);

export default Map;
