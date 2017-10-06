/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsRegionDetailsComponent from '../components/TrendsRegionDetails';


const mapStateToProps = (state) => {
    return {
        regionsStations: state.chosenTrends.trends_regions
    }
};

const TrendsRegionDetails = connect(mapStateToProps)(TrendsRegionDetailsComponent);

export default TrendsRegionDetails;
