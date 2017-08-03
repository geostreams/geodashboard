import React, {Component} from 'react'

class TimeFilter extends Component {
    constructor(props) {
        super(props);
    }

    changeDate = (isStart, event) => {
        const date = new Date(event.target.value);
        this.props.onDateChange(event, date, isStart);
    }

    render() {
        Date.prototype.toDateInputValue = (function() {
            const local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0, 10)
        });

        const selectedStartDate = this.props.selectedStartDate.toDateInputValue();
        const availableStartDate = this.props.availableStartDate.toDateInputValue();
        const selectedEndDate = this.props.selectedEndDate.toDateInputValue();
        const availableEndDate = this.props.availableEndDate.toDateInputValue();

        return (
            <div>
                <h5> Start Date</h5>
                <input type="date" id="startDate" data-filterId={this.props.filterId}
                       min={availableStartDate} max={selectedEndDate}
                       value={selectedStartDate} onChange={this.changeDate.bind(this, true)}/>

                <h5> End Date</h5>
                <input type="date"  id="endDate" data-filterId={this.props.filterId}
                       min={selectedStartDate} max={availableEndDate}
                       value={selectedEndDate} onChange={this.changeDate.bind(this, false)}/>

            </div>

        );
    }
}

export default TimeFilter;