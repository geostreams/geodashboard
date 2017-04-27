/*
 * @flow
 */


import { connect } from 'react-redux'
import ExploreSourcesTabComponent from '../components/ExploreSourcesTab'
import { selectAction } from '../actions'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        locations: state.sensors.data,
        data: state.sensors.data,
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectClick: (id, coordinates) => {
            dispatch(selectAction(id, coordinates));
        }
    }
};

const ExploreSourcesTab = connect(mapStateToProps, mapDispatchToProps)(ExploreSourcesTabComponent);

export default ExploreSourcesTab;