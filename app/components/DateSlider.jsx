import React, {Component} from "react";
import styles from '../styles/slider.css';
import 'rc-slider/assets/index.css';
import Slider from "rc-slider";
let moment = require('moment');

class DateSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onSliderChange = this.onSliderChange.bind(this);
        this.popupDateValue = this.popupDateValue.bind(this);
    }

    onSliderChange(values) {
        // Use moment to get the date after x days, but send the date objects to the parent component.
        let start_moment = moment(this.props.start);
        let selected_start = start_moment.add(values[0], 'days').toDate();
        // NOTE: If you use the add function without resetting the start moment, it accumulates.
        // So the start moment is set here again to get absolute difference between minDate and the second selected value
        start_moment = moment(this.props.start);
        let selected_end = start_moment.add(values[1], 'days').toDate();

        this.props.onSliderChange([selected_start, selected_end]);
    }

    popupDateValue(value) {
        let minDate = moment(this.props.start);
        return minDate.add(value, 'days').format("MM/DD/YYYY");
    }

    render() {
        // The dates need to be converted to numbers for the slider to work. The slider uses numbers as input. 
        // minDate is used as a reference. The difference between minDate and maxDate is the range for the slider.
        let minDate = moment(this.props.start);
        let maxDate = moment(this.props.end);

        let selectedStartDate = moment(this.props.selectedStart);
        let selectedEndDate = moment(this.props.selectedEnd);

        // The difference in days between the selected startDate and selectedEndDate are the slider values/positions
        let maxValue = maxDate.diff(minDate, 'days');
        let selected_start = selectedStartDate.diff(minDate, 'days');
        let selected_end = selectedEndDate.diff(minDate, 'days');
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);

        return (

            <div>
            <span className={styles.start}>{minDate.format("MM/DD/YYYY")}</span>
            <div className={styles.wrapperStyle} >
            <Range min={0} max={maxValue}
                   defaultValue={[selected_start, selected_end]}
                   allowCross={false}
                   tipFormatter={value => this.popupDateValue(value)}
                   onAfterChange={this.onSliderChange}

            />
            </div>
            <span className={styles.end}>{maxDate.format("MM/DD/YYYY")}</span> <br/>
            Selected: {selectedStartDate.format("MM/DD/YYYY")} - {selectedEndDate.format("MM/DD/YYYY")}
        </div>
        );
    }

}

export default DateSlider;
