/*
 * @flow
 */

import {connect} from 'react-redux';
import {addStartDate, addEndDate, addSpanEnd, addSpanStart} from '../actions';
import TimeFilterComponent from '../components/TimeFilter';
import type {Dispatch} from '../utils/flowtype';


const mapStateToProps = (state, ownProps) => {
    if (ownProps.filterType === 'span') {
        return {
            selectedStartDate: state.selectedSearch.span.selected.start,
            selectedEndDate: state.selectedSearch.span.selected.end,
            availableStartDate: state.selectedSearch.span.available.start,
            availableEndDate: state.selectedSearch.span.available.end
        }
    } else {
        return {
            selectedStartDate: state.selectedSearch.dates.selected.start,
            selectedEndDate: state.selectedSearch.dates.selected.end,
            availableStartDate: state.selectedSearch.dates.available.start,
            availableEndDate: state.selectedSearch.dates.available.end,
        }
    }
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps) => {
    return {
        onDateChange: (event, date, isStart) => {
            if (ownProps.filterType === 'span') {
                if (isStart) {
                    dispatch(addSpanStart(date));
                } else {
                    dispatch(addSpanEnd(date));
                }
            } else {
                if (isStart) {
                    dispatch(addStartDate(date));
                } else {
                    dispatch(addEndDate(date));
                }
            }
        }
    }
};

const TimeFilter = connect(mapStateToProps, mapDispatchToProps)(TimeFilterComponent);

export default TimeFilter;
