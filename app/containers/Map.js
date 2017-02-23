import { connect } from 'react-redux'
import MapComponent from '../components/Map'

const mapStateToProps = (state, ownProps) => {
    return {
        sensors: state.sensors.data,
        availableSensors: state.sensors.available_sensors,
        selectedParameters: state.selectedParameters.parameters,
        selectedDataSources: state.selectedDataSources.data_sources,
        selectedStartDate: state.selectedDate.selectedStartDate,
        selectedEndDate: state.selectedDate.selectedEndDate,
        selectedLocation: state.selectedLocation.location,
    }
};

const Map = connect(mapStateToProps)(MapComponent);

export default Map;
