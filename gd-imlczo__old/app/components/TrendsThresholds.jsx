/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import mainStyles from '../styles/main.css';
import {
    Textfield, Cell, Grid,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardText
} from 'react-mdc-web/lib';
import Select from './material/Select';


class TrendsThresholds extends Component {

    state: {
        chosenThreshold: number,
        thresholdMin: number,
        thresholdMax: number
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenThreshold: Number(this.props.chosenThreshold) ? Number(this.props.chosenThreshold) : Number(''),
            thresholdMin: this.props.trends_defaults[4].value,
            thresholdMax: this.props.trends_defaults[5].value
        };
        (this: any).handleThresholdChooseValue = this.handleThresholdChooseValue.bind(this);
    }

    handleThresholdChooseValue(event: Object) {
        let value = event.target.value;
        if (value < this.state.thresholdMin) {
            value = this.state.thresholdMin
        }
        if (value > this.state.thresholdMax) {
            value = this.state.thresholdMax
        }
        value = parseFloat(value);
        this.setState({chosenThreshold: value});

        this.props.onSelectTrendsThreshold(value);
    }

    render() {

        // These are necessary for both situations
        let trendsPageThresholdChoice = this.props.trends_threshold_choice;
        let trendsPageSettings = this.props.trends_thresholds;
        let trendsPageParameter = this.props.chosenParameter;
        let trendsCheckParameter;
        let trendsPageThresholds = [];
        let trendsPageThresholdsMap = [];
        let trendsPageThreshold;

        // Choice is Not Allowed
        if (trendsPageThresholdChoice === false) {

            let trendsCheckParameter;
            if (trendsPageSettings && trendsPageParameter) {
                for (let i = 0; i < trendsPageSettings.length; i++) {
                    trendsCheckParameter = trendsPageSettings[i].parameter.id;
                    if (trendsCheckParameter === trendsPageParameter) {
                        trendsPageThresholdsMap = trendsPageSettings[i].thresholds
                            .map(t => <p>{t.title}: {t.value} </p>);
                        trendsPageThresholds = trendsPageThresholds.concat(trendsPageThresholdsMap);
                    }
                }
            }

            trendsPageThreshold = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle className={mainStyles.title_card}>
                            Threshold
                        </CardTitle>
                    </CardHeader>
                    <CardText>
                        {trendsPageThresholds}
                    </CardText>
                </Card>
            );

        }

        // Choice is Allowed
        if (trendsPageThresholdChoice === true) {

            if (trendsPageSettings && trendsPageParameter) {
                for (let i = 0; i < trendsPageSettings.length; i++) {
                    trendsCheckParameter = trendsPageSettings[i].parameter.id;
                    if (trendsCheckParameter === trendsPageParameter) {
                        trendsPageThresholdsMap = trendsPageSettings[i].thresholds
                            .map(p => <option value={p.value} key={p.value} id={p.title}> {p.title} </option>);
                        trendsPageThresholds = trendsPageThresholds.concat(
                            <option value={'none'} key={0}> Enter a Value</option>);
                        trendsPageThresholds = trendsPageThresholds.concat(trendsPageThresholdsMap);
                    }
                }
            }

            trendsPageThreshold = (
                <Card className={trendsStyles.cardMargin} key="Threshold">
                    <CardHeader>
                        <CardTitle className={mainStyles.title_card}>
                            Select Threshold Value
                        </CardTitle>
                        <CardSubtitle>
                            {window.configruntime.gd3.threshold_subtitle}
                        </CardSubtitle>
                    </CardHeader>
                    <CardText>
                        <Grid>
                            <Cell col={6}>
                                <Select className={trendsStyles.select}
                                        value={this.state.chosenThreshold.toString()}
                                        onChange={this.handleThresholdChooseValue}
                                >
                                    {trendsPageThresholds}
                                </Select>
                            </Cell>
                            <Cell col={6}>
                                <Textfield
                                    floatingLabel="Threshold"
                                    type="number" step="any"
                                    min={this.state.thresholdMin} max={this.state.thresholdMax}
                                    className={trendsStyles.textField}
                                    value={this.state.chosenThreshold.toString()}
                                    onChange={this.handleThresholdChooseValue}
                                    helptext="Must be a Number"
                                />
                            </Cell>
                        </Grid>
                    </CardText>
                </Card>
            );

        }

        // Condition possible for both situations
        if (trendsPageThresholdsMap.length === 0) {
            trendsPageThreshold =
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle className={mainStyles.title_card}>
                            Select Threshold
                        </CardTitle>
                        <CardSubtitle>
                            {window.configruntime.gd3.threshold_none_subtitle}
                        </CardSubtitle>
                    </CardHeader>
                    <CardText>
                        None Available
                    </CardText>
                </Card>
        }

        return (
            trendsPageThreshold
        );

    }

}

TrendsThresholds.propTypes = {
    chosenParameter: PropTypes.string.isRequired,
    trends_thresholds: PropTypes.array.isRequired,
    trends_threshold_choice: PropTypes.bool.isRequired,
    trends_defaults: PropTypes.array.isRequired
};

export default TrendsThresholds;