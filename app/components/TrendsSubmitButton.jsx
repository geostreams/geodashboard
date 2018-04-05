/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

        this.props.onClickAnalysis(
            chosenParameter, chosenRegion, baselinePeriod, rollingPeriod,
            thresholdChooseValue, trendsSeason, trendsViewType
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
        if (this.props.chosenParameter === '' ||
            this.props.baselinePeriod === '' || this.props.rollingPeriod === '' ||
            isNaN(this.props.baselinePeriod) || isNaN(this.props.rollingPeriod) ||
            this.props.thresholdChooseValue === 'none' ||
            this.props.thresholdChooseValue === undefined ||
            isNaN(this.props.thresholdChooseValue) )
        {
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
    chosenParameter: React.PropTypes.string.isRequired,
    chosenRegion: React.PropTypes.string.isRequired,
    baselinePeriod: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    rollingPeriod: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    thresholdChooseValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    trends_season: React.PropTypes.string.isRequired,
    trends_view_type: React.PropTypes.string.isRequired,
    trends_defaults: React.PropTypes.array.isRequired
};

export default TrendsSubmitButton;
