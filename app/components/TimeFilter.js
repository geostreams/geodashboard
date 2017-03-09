import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import { connect } from 'react-redux';
import { addStartDate, addEndDate} from '../actions';
import DatePicker from 'material-ui/DatePicker';

class TimeFilter extends Component {
    constructor(props) {
        super(props);
    }


    changeDate = (isStart, event, date) => {
        this.props.onDateChange(event, date, isStart);
    }

    render(){
        return (
                <div>
                    <h5> Start Date</h5>
                    <DatePicker id="startDate" hintText="Start Date" container="inline" minDate={this.props.availableStartDate} maxDate={this.props.selectedEndDate}  defaultDate={this.props.selectedStartDate} onChange={this.changeDate.bind(this, true)}/>

                    <h5> End Date</h5>
                    <DatePicker id="endDate" hintText="End Date" container="inline" minDate={this.props.selectedStartDate} maxDate={this.props.availableEndDate} defaultDate={this.props.selectedEndDate} onChange={this.changeDate.bind(this, false)}/>
                </div>

        );
    }
}

export default TimeFilter;