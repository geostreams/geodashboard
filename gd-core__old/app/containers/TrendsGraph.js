/*
 * @flow
 */

import {connect} from 'react-redux';
import TrendsGraphComponent from '../components/TrendsGraph';


const mapStateToProps = (state) => {
    return {
        trends_regions: state.chosenTrends.trends_regions
    }
};

const TrendsGraph = connect(mapStateToProps)(TrendsGraphComponent);

export default TrendsGraph;
