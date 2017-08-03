/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardText
} from 'react-mdc-web';


class TrendsThresholds extends Component {

    state: {
        chosenThreshold: Object,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenThreshold: {},
        };
    }

    handleThresholdChangeChoice = (event: Object) => {
        this.setState({chosenThreshold: event.target.value});
        this.props.onSelectTrendsThreshold(event.target.value);
    };

    render() {

        // These are necessary for both situations
        let trendsPageThresholdChoice = this.props.trends_threshold_choice;
        let trendsPageSettings = this.props.trends_thresholds;
        let trendsPageParameter = this.props.chosenParameter;
        let trendsCheckParameter;
        let trendsPageThreshold = [];
        let trendsPageThresholds = [];
        let trendsPageThresholdsMap = [];

        trendsPageThreshold =
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        No Threshold
                    </CardTitle>
                </CardHeader>
                <CardText>
                    None Available
                </CardText>
            </Card>;

        // Choice is Not Allowed
        if (trendsPageThresholdChoice == false) {
            let trendsCheckParameter;
            if (trendsPageSettings && trendsPageParameter) {
                for (let i = 0; i < trendsPageSettings.length; i++) {
                    trendsCheckParameter = trendsPageSettings[i].parameter.id;
                    if (trendsCheckParameter == trendsPageParameter) {
                        trendsPageThresholdsMap = trendsPageSettings[i].thresholds
                            .map(t => <p>{t.title}: {t.value} </p>);
                        trendsPageThresholds = trendsPageThresholds.concat(trendsPageThresholdsMap);
                    }
                    trendsPageThreshold =
                        <Card className={trendsStyles.cardMargin}>
                            <CardHeader>
                                <CardTitle>
                                    Threshold
                                </CardTitle>
                            </CardHeader>
                            <CardText>
                                {trendsPageThresholds}
                            </CardText>
                        </Card>;
                }
            }

            if (trendsPageThresholdsMap.length == 0) {
                trendsPageThreshold =
                    <Card className={trendsStyles.cardMargin}>
                        <CardHeader>
                            <CardTitle>
                                Threshold
                            </CardTitle>
                        </CardHeader>
                        <CardText>
                            None Available
                        </CardText>
                    </Card>
            }
        }

        // Choice is Allowed
        if (trendsPageThresholdChoice == true) {
            let trendsCheckParameter;

            if (trendsPageSettings && trendsPageParameter) {
                for (let i = 0; i < trendsPageSettings.length; i++) {
                    trendsCheckParameter = trendsPageSettings[i].parameter.id;
                    if (trendsCheckParameter == trendsPageParameter) {
                        trendsPageThresholdsMap = trendsPageSettings[i].thresholds
                            .map(t => <Radio id={t.title} value={t.value}
                                             key={t.value}> {t.title}</Radio>);
                        trendsPageThresholds = trendsPageThresholds.concat(trendsPageThresholdsMap);
                    }
                    trendsPageThreshold =
                        <Card className={trendsStyles.cardMargin}>
                            <CardHeader>
                                <CardTitle>
                                    Select Threshold
                                </CardTitle>
                                <CardSubtitle>
                                    Threshold to Explore
                                </CardSubtitle>
                            </CardHeader>
                            <CardActions>
                                <RadioGroup
                                    name="thresholds"
                                    value={Number(this.state.chosenThreshold)}
                                    onChange={this.handleThresholdChangeChoice.bind(this)}>
                                        {trendsPageThresholds}
                                    </RadioGroup>
                            </CardActions>
                        </Card>;
                }
            }

            if (trendsPageThresholdsMap.length == 0) {
                trendsPageThreshold =
                    <Card className={trendsStyles.cardMargin}>
                        <CardHeader>
                            <CardTitle>
                                Select Threshold
                            </CardTitle>
                            <CardSubtitle>
                                Threshold to Explore
                            </CardSubtitle>
                        </CardHeader>
                        <CardText>
                            None Available
                        </CardText>
                    </Card>
            }
        }

        return (
            trendsPageThreshold
        );

    }

}

export default TrendsThresholds;
