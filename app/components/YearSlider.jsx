/*
 * @flow
 */

import React, {Component} from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from '../styles/slider.css';

class YearSlider extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);

        return (
            <div>
                <span className={styles.start}>{this.props.start_year}</span>
                <div className={styles.yearWrapper}>
                    <Range min={this.props.start_year} max={this.props.end_year}
                           defaultValue={[this.props.selectedStartYear, this.props.selectedEndYear]}
                           allowCross={false}
                           tipFormatter={value => `${value}`}
                           onAfterChange={this.props.onSliderChange}
                           dots
                    />
                </div>
                <span className={styles.end}>{this.props.end_year}</span> <br/>
                Selected: {this.props.selectedStartYear} - {this.props.selectedEndYear}
            </div>
        );
    }

}

export default YearSlider;