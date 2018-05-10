/*
 * @flow
 */

import { connect } from 'react-redux';
import ExploreSourcesTabComponent from '../components/ExploreSourcesTab';
import { selectSensorDetail } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapStateToProps = (state) => {
    return {
        data: state.sensors.data,
        regions: state.sensors.regions
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSelectClick: (id, name, coordinates) => {
            dispatch(selectSensorDetail(id, name, coordinates));
        }
    }
};

const ExploreSourcesTab = connect(mapStateToProps, mapDispatchToProps)(ExploreSourcesTabComponent);

export default ExploreSourcesTab;
