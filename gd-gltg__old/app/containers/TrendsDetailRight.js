/*
 * @flow
 */


import {connect} from "react-redux";
import TrendsDetailRightComponent from "gd-core__old/app/components/TrendsDetailRight";
import {fetchRegionDetailTrends, fetchRegionTrends} from "gd-core__old/app/actions";
import type {Dispatch} from "gd-core__old/app/utils/flowtype";


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
