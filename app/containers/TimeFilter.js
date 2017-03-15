/*
 * @flow
 */
import { connect } from 'react-redux'
import { addStartDate, addEndDate } from '../actions'
import TimeFilterComponent from '../components/TimeFilter'
import type { Dispatch } from '../utils/flowtype'

const mapStateToProps = (state) => {
    return {
        selectedStartDate: state.selectedSearch.dates.selected.start,
        selectedEndDate: state.selectedSearch.dates.selected.end,
        availableStartDate: state.selectedSearch.dates.available.start,
        availableEndDate: state.selectedSearch.dates.available.end
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        onDateChange: (event, date, isStart) => {
            if (isStart) {
                dispatch(addStartDate(date));
            } else {
                dispatch(addEndDate(date));
            }
        }
    }
};

const TimeFilter = connect(mapStateToProps, mapDispatchToProps)(TimeFilterComponent);

export default TimeFilter