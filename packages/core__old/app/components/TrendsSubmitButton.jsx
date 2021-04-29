/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import {Button} from 'react-mdc-web/lib';


class TrendsSubmitButton extends Component {

    state: {
        showResults: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            showResults: false
        };
        (this: any).handleClickAnalysis = this.handleClickAnalysis.bind(this);
    }

    handleClickAnalysis() {

        this.state.showResults = true;
        let chosenParameter = this.props.chosenParameter;
        let chosenRegion = this.props.chosenRegion;
        let baselinePeriod = this.props.baselinePeriod;
        let rollingPeriod = this.props.rollingPeriod;

        this.props.onClickAnalysis(
            chosenParameter, chosenRegion, baselinePeriod, rollingPeriod
        )
    }

    render() {

        let trendsCompleted = 0;
        let trendsTotal = 0;
        if (this.state.showResults === true) {
            trendsCompleted = this.props.trendNumberCompleted;
            trendsTotal = (this.props.originalSensors.filter(s =>
                s.parameters.indexOf(this.props.chosenParameter) >= 0)).length;
        }

        let submit_button;
        if (this.props.chosenRegion === '' || this.props.chosenParameter === '' ||
            this.props.baselinePeriod === '' || this.props.rollingPeriod === '' ||
            isNaN(this.props.baselinePeriod) || isNaN(this.props.rollingPeriod) ||
            this.props.thresholdChooseValue === 'none' ||
            this.props.thresholdChooseValue === undefined ||
            isNaN(this.props.thresholdChooseValue)) {
            submit_button =
                (<Button disabled raised className={trendsStyles.submitButtonStyle}
                         onClick={this.handleClickAnalysis}> Apply Settings </Button>);
        } else {
            submit_button =
                (<Button raised className={trendsStyles.submitButtonStyle}
                         onClick={this.handleClickAnalysis}> Apply Settings </Button>);
        }

        return (
            <div>
                {submit_button}
                <div className={trendsStyles.counterText}>
                    Processed: {trendsCompleted}
                    <br/>
                    Available: {trendsTotal}
                </div>
            </div>
        );

    }

}

TrendsSubmitButton.propTypes = {
    chosenParameter: PropTypes.string.isRequired,
    chosenRegion: PropTypes.string.isRequired,
    baselinePeriod: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rollingPeriod: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    thresholdChooseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trends_defaults: PropTypes.array.isRequired
};

export default TrendsSubmitButton;