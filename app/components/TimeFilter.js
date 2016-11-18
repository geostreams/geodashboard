import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import dimensions from '../../data/dimensions.json';
import { connect } from 'react-redux';
import { addStartDate} from '../actions';
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


    changeStartDate = (event, date) => {
        this.setState({
            minDate: date,
        });
        this.props.onStartDateChange(event, date);
    }


    render(){
        return (
                <div>
                    <h5> Start Date</h5>
                    <DatePicker id="startDate" hintText="Start Date" container="inline" onChange={this.changeStartDate.bind(this)}/>

                    <h5> End Date</h5>
                    <DatePicker id="endDate" hintText="End Date" container="inline" minDate={this.state.minDate}/>
                </div>

        );
    }
}

export default TimeFilter;