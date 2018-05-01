/*
 * @flow
 */

import { connect } from 'react-redux';
import TrendsGraphComponent from '../components/TrendsGraph';
import type { Dispatch } from '../utils/flowtype';
import { fetchRegionDetailTrends } from '../actions/index';


const mapStateToProps = (state) => {
    return {
        trends_regions: state.chosenTrends.trends_regions
    }
};

const TrendsGraph = connect(mapStateToProps)(TrendsGraphComponent);

export default TrendsGraph
