import { connect } from 'react-redux'
import { addStartDate } from '../actions'
import timeFilterComponent from '../components/TimeFilter'

const mapStateToProps = (state, ownProps) => {
    return {
        selectedStartDate: state.selectedStartDate.date
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onStartDateChange:(event, date) =>{
            dispatch(addStartDate(date));
        }
    }
};

const TimeFilter = connect(mapStateToProps, mapDispatchToProps)(timeFilterComponent);

export default TimeFilter