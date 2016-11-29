import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import dimensions from '../../data/dimensions.json';
import { connect } from 'react-redux';
import { addStartDate, addEndDate} from '../actions';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class TimeFilter extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        minDate.setFullYear(1983);
        minDate.setHours(0, 0, 0, 0);
        this.state = {
            minDate: minDate,
        };
    }


    changeDate = (isStart, event, date) => {
        if(isStart) {
            this.setState({
                minDate: date,
            });
        }
        this.props.onDateChange(event, date, isStart);
    }


    render(){
        return (
                <div>
                    <h5> Start Date</h5>
                    <DatePicker id="startDate" hintText="Start Date" container="inline" onChange={this.changeDate.bind(this, true)}/>

                    <h5> End Date</h5>
                    <DatePicker id="endDate" hintText="End Date" container="inline" minDate={this.state.minDate} onChange={this.changeDate.bind(this, false)}/>
                </div>

        );
    }
}

export default TimeFilter;