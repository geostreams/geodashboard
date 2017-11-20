/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {Button} from 'react-mdc-web';


class TrendsSubmitButton extends Component {

    state: {
        showResults: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            showResults: false
        };
        (this:any).handleClickAnalysis = this.handleClickAnalysis.bind(this);
    }

    handleClickAnalysis() {

        this.state.showResults = true;

        let chosenParameter = this.props.chosenParameter;
        let chosenRegion = this.props.chosenRegion;
        let baselinePeriod = this.props.baselinePeriod;
        let rollingPeriod = this.props.rollingPeriod;
        let thresholdChooseValue = this.props.thresholdChooseValue;
        let trendsSeason = this.props.trends_season;
        let trendsViewType = this.props.trends_view_type;

        if (baselinePeriod == '') {
            baselinePeriod = this.props.trends_defaults[4].value;
        }
        if (rollingPeriod == '') {
            rollingPeriod = this.props.trends_defaults[5].value;
        }

        this.props.onClickAnalysis(
            chosenParameter, chosenRegion, baselinePeriod, rollingPeriod,
            thresholdChooseValue, trendsSeason, trendsViewType
        )
    }

    render() {

        let trendsCompleted = 0;
        let trendsTotal = 0;
        if (this.state.showResults == true) {
            trendsCompleted = this.props.trendNumberCompleted;
            trendsTotal = (this.props.originalSensors.filter(s =>
                s.parameters.indexOf(this.props.chosenParameter) >= 0)).length;
        }

        let submit_button;
        if (this.props.chosenParameter == '' ||
            this.props.thresholdChooseValue == 'none' ||
            this.props.thresholdChooseValue === undefined ||
            isNaN(this.props.thresholdChooseValue) )
        {
            submit_button =
                (<Button disabled raised className={trendsStyles.submitButtonStyle}
                         primary onClick={this.handleClickAnalysis}> Apply Settings </Button>);
        } else {
            submit_button =
                (<Button raised className={trendsStyles.submitButtonStyle}
                         primary onClick={this.handleClickAnalysis}> Apply Settings </Button>);
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

export default TrendsSubmitButton;
