/*
 * @flow
 */

import {connect} from 'react-redux';
import ExploreSourceGroupComponent from '../components/ExploreSourceGroup';
import {resetDetailPage, updateExploreDataSource} from '../actions';
import type {Dispatch} from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        selectedDataSources: state.exploreFiltering.data_sources.selected,
        availableDataSources: state.exploreFiltering.data_sources.available,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clickedSource: (selected_sources) => {
            dispatch(resetDetailPage());
            dispatch(updateExploreDataSource(selected_sources));
        }
    }
};

const ExploreSourceGroup = connect(mapStateToProps, mapDispatchToProps)(ExploreSourceGroupComponent);

export default ExploreSourceGroup;
