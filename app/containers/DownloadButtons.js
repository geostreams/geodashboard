/*
 * @flow
 */

import { connect } from 'react-redux';
import DownloadButtonsComponent from '../components/DownloadButtons';

const mapStateToProps = (state) => {
    return {
        selectedParameters: state.selectedSearch.parameters.selected,
        selectedDataSources: state.selectedSearch.data_sources.selected,
        selectedStartDate: state.selectedSearch.dates.selected.start,
        selectedEndDate: state.selectedSearch.dates.selected.end,
        selectedLocation: state.selectedSearch.locations.selected,
        api: state.backends.selected,
        drawShapeCoordinates: state.sensors.shape_coordinates,
        availableSensors: state.sensors.available_sensors
    }
};

const DownloadButtons = connect(mapStateToProps)(DownloadButtonsComponent);

export default DownloadButtons;
