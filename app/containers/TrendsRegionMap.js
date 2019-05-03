/*
 * @flow
 */


import {connect} from 'react-redux';
import TrendsRegionMapComponent from '../components/TrendsRegionMap';


const mapStateToProps = (state) => {
    return {
        sensors: state.chosenTrends.sensors,
        threshold_value: state.chosenTrends.threshold,
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter,
        selectedSeason: state.chosenTrends.season,
        selectedRegion: state.chosenTrends.region,
        trendViewType: state.chosenTrends.view_type,
        trendAllRegions: state.chosenTrends.all_regions,
        parameters: state.parameters.parameters
    }
};

const TrendsRegionMap = connect(mapStateToProps)(TrendsRegionMapComponent);

export default TrendsRegionMap;