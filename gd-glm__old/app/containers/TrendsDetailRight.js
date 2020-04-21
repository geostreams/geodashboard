/*
 * @flow
 */


import {connect} from "react-redux";
import TrendsDetailRightComponent from "../components/TrendsDetailRight";
import {fetchRegionDetailTrends, fetchRegionTrends} from "../actions";
import type {Dispatch} from "../utils/flowtype";


const mapStateToProps = (state) => {
    return {
        trends_regions: state.chosenTrends.trends_regions,
        show_spinner: state.chosenTrends.show_spinner,
        parameters: state.parameters.parameters
    }
};


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchRegionDetailTrends: (parameter, season, region) => {
            dispatch(fetchRegionTrends(parameter, season));
            dispatch(fetchRegionDetailTrends(parameter, season, region));
        }
    }
};

const TrendsDetailRight = connect(mapStateToProps, mapDispatchToProps)(TrendsDetailRightComponent);

export default TrendsDetailRight;
