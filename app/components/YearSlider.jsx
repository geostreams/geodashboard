import 'rc-slider/assets/index.css';
import React, {Component} from "react";
import Slider from 'rc-slider';
import styles from '../styles/yearSlider.css';

class YearSlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);

        return (
            <div>
                <span className={styles.startYear}>{this.props.start_year}</span>
                <div className={styles.wrapperStyle} >
                <Range min={this.props.start_year} max={this.props.end_year}
                       value={[this.props.selectedStartYear, this.props.selectedEndYear]}
                       allowCross={false}
                       tipFormatter={value => `${value}`}
                       onChange={this.props.onSliderChange}
                       dots
                />
                </div>
                <span className={styles.endYear}>{this.props.end_year}</span> <br/>
                Selected: {this.props.selectedStartYear} - {this.props.selectedEndYear}
            </div>
        );
    }

}

export default YearSlider;