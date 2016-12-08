import { connect } from 'react-redux'
import { addStartDate, addEndDate } from '../actions'
import TimeFilterComponent from '../components/TimeFilter'

const mapStateToProps = (state, ownProps) => {
    return {
        selectedStartDate: state.selectedDate.selectedStartDate,
        selectedEndDate: state.selectedDate.selectedEndDate
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
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