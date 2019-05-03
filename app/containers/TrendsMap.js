/*
 * @flow
 */


import {connect} from 'react-redux';
import TrendsMapComponent from '../components/TrendsMap';


const mapStateToProps = (state) => {
    return {
        sensors: state.chosenTrends.sensors,
        threshold_value: state.chosenTrends.threshold,
        trendSensors: state.chosenTrends.trends_sensors,
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter,
        selectedRegion: state.chosenTrends.region,
        trendViewType: state.chosenTrends.view_type,
        trendAllRegions: state.chosenTrends.all_regions,
        parameters: state.parameters.parameters
    }
};

const TrendsMap = connect(mapStateToProps)(TrendsMapComponent);

export default TrendsMap;