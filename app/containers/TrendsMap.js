/*
 * @flow
 */


import { connect } from 'react-redux';
import TrendsMapComponent from '../components/TrendsMap';
import { addCustomTrendLocationFilter } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        threshold_value: state.chosenTrends.threshold,
        trendSensors: state.chosenTrends.trends_sensors,
        trendRegions: state.chosenTrends.trends_regions,
        selectedParameter: state.chosenTrends.parameter,
        selectedRegion: state.chosenTrends.region,
        trendViewType: state.chosenTrends.view_type,
        trendAllRegions: state.chosenTrends.all_regions,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectShapeLocationTrend: (selectPointsLocations) => {
            dispatch(addCustomTrendLocationFilter(selectPointsLocations));
        }
    }

};

const TrendsMap = connect(mapStateToProps, mapDispatchToProps)(TrendsMapComponent);

export default TrendsMap;
