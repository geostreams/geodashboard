/*
 * @flow
 */

import { connect } from 'react-redux';
import ExploreAccordionSectionsComponent from '../components/ExploreAccordionSections';
import { selectSensorDetail } from '../actions';
import type { Dispatch } from '../utils/flowtype';


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectSensor: (id, name, coordinates) => {
            dispatch(selectSensorDetail(id, name, coordinates));
        }
    }
};

const ExploreAccordionSections = connect(null, mapDispatchToProps)(ExploreAccordionSectionsComponent);

export default ExploreAccordionSections;
