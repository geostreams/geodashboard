import {connect} from "react-redux";
import TrendsDetailRightComponent from "../components/TrendsDetailRight";
import {fetchRegionDetailTrends} from "../actions";
import type {Dispatch} from "../utils/flowtype";


const mapStateToProps = (state) => {
    return {
        trends_regions: state.chosenTrends.trends_regions
    }
};


const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        fetchRegionDetailTrends: (parameter, season, region) => {
            dispatch(fetchRegionDetailTrends(parameter, season, region))
        }
    }
};

const TrendsDetailRight = connect(mapStateToProps, mapDispatchToProps)(TrendsDetailRightComponent);

export default TrendsDetailRight;
