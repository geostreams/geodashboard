import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import { connect } from 'react-redux';
import { addStartDate, addEndDate} from '../actions';
import DatePicker from 'material-ui/DatePicker';

class TimeFilter extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        minDate.setFullYear(1983);
        minDate.setHours(0, 0, 0, 0);
        this.state = {
            minDate: minDate,
            maxDate: new Date()
        };
    }


    changeDate = (isStart, event, date) => {
        this.props.onDateChange(event, date, isStart);
    }

    render(){
        return (
                <div>
                    <h5> Start Date</h5>
                    <DatePicker id="startDate" hintText="Start Date" container="inline" minDate={this.state.minDate} maxDate={this.props.selectedEndDate} onChange={this.changeDate.bind(this, true)}/>

                    <h5> End Date</h5>
                    <DatePicker id="endDate" hintText="End Date" container="inline" minDate={this.props.selectedStartDate} maxDate={this.state.maxDate} onChange={this.changeDate.bind(this, false)}/>
                </div>

        );
    }
}

export default TimeFilter;