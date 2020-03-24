/*
 * @flow
 */

import {connect} from 'react-redux';
import DownloadButtonsComponent from '../components/DownloadButtons';
import {countNumberPoints} from "../actions";
import type {Dispatch} from "../utils/flowtype";

const mapStateToProps = (state) => {
    return {
        selectedParameters: state.selectedSearch.parameters.selected,
        selectedDataSources: state.selectedSearch.data_sources.selected,
        selectedStartDate: state.selectedSearch.dates.selected.start,
        selectedEndDate: state.selectedSearch.dates.selected.end,
        selectedLocation: state.selectedSearch.locations.selected,
        selectedFilters: state.searchFilters.selected,
        api: state.backends.selected,
        drawShapeCoordinates: state.sensors.shape_coordinates,
        showSensors: state.sensors.search_sensors,
        availableSensors: state.sensors.available_sensors,
        multi_parameter_map: state.parameters.multi_parameter_map,
        numberPoints: state.sensors.number_datapoints
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectDownload: (countLink) => {
            dispatch(countNumberPoints(countLink));
        }
    }
};

const DownloadButtons = connect(mapStateToProps, mapDispatchToProps)(DownloadButtonsComponent);

export default DownloadButtons;
