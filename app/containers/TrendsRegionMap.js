/*
 * @flow
 */


import { connect } from 'react-redux';
import TrendsRegionMapComponent from '../components/TrendsRegionMap';

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
    }
};

const TrendsRegionMap = connect(mapStateToProps)(TrendsRegionMapComponent);

export default TrendsRegionMap;

