/*
 * @flow
 */

import React, {Component} from 'react';

class TimeFilter extends Component {
    constructor(props: Object) {
        super(props);
        (this: any).changeStartDate = this.changeStartDate.bind(this);
        (this: any).changeEndDate = this.changeEndDate.bind(this);
    }

    changeStartDate(event: Object) {
        const date = new Date(event.target.value.replace(/-/g, '\/'));
        // Update if the date is not Nan when the selected End Date is null (hasn't been selected)
        // or the start date is before the currently selected end date
        if (!isNaN(date.getTime()) && (this.props.selectedEndDate === null ||
            date.getTime() < this.props.selectedEndDate.getTime())) {
            this.props.onDateChange(event, date, true);
        } else if (event.target.value === "") {
            //When the x next to date is selected set the date as null.
            this.props.onDateChange(event, null, true);
        }
    }

    changeEndDate(event: Object) {
        const date = new Date(event.target.value.replace(/-/g, '\/'));
        // Update if the date is not Nan when the selected start date is null (hasn't been selected)
        // or the end date is after the selected start date
        if (!isNaN(date.getTime()) && (this.props.selectedStartDate === null
            || date.getTime() > this.props.selectedStartDate.getTime())) {
            this.props.onDateChange(event, date, false);
        } else if (event.target.value === "") {
            //When the x next to date is selected set the date as null.
            this.props.onDateChange(event, null, false);
        }
    }

    render() {
        // $FlowFixMe
        Date.prototype.toDateInputValue = (function () {
            const local = new Date(this);
            local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
            return local.toJSON().slice(0, 10)
        });

        const availableStartDate = this.props.availableStartDate.toDateInputValue();
        // If maximum end date is in the future. Use today as the last available end date.
        // $FlowFixMe
        const availableEndDate = (this.props.availableEndDate.getTime() > new Date().getTime()) ? new Date().toDateInputValue() : this.props.availableEndDate.toDateInputValue();
        const selectedStartDate = (this.props.selectedStartDate !== "" && this.props.selectedStartDate !== null) ?
            this.props.selectedStartDate.toDateInputValue() : "";
        const selectedEndDate = (this.props.selectedEndDate !== "" && this.props.selectedEndDate !== null) ?
            this.props.selectedEndDate.toDateInputValue() : "";
        //If the selectedEndDate is empty, use availableEndDate
        const maxStartDate = (this.props.selectedEndDate !== "" && this.props.selectedEndDate !== null)
            ? selectedEndDate : availableEndDate;
        //If the selected start date is not available, use the available start date as minimum time for the end date.
        const minEndDate = (this.props.selectedStartDate !== "" && this.props.selectedStartDate !== null)
            ? selectedStartDate : availableStartDate;

        return (
            <div>
                <h5> Start Date</h5>
                <input type="date" id="startDate" data-filterId={this.props.filterId}
                       min={availableStartDate} max={maxStartDate}
                       value={selectedStartDate} onChange={this.changeStartDate}/>

                <h5> End Date</h5>
                <input type="date" id="endDate" data-filterId={this.props.filterId}
                       min={minEndDate} max={availableEndDate}
                       value={selectedEndDate} onChange={this.changeEndDate}/>

            </div>

        );
    }
}

export default TimeFilter;
