/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup, Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';
import type {InputEvent} from '../utils/flowtype';

class TrendsParameters extends Component {

    constructor(props: Object) {
        super(props);
        (this:any).handleParameterChange = this.handleParameterChange.bind(this);
    }

    handleParameterChange(event: InputEvent) {
        let trendsPageThresholdChoice = this.props.trends_threshold_choice;
        this.props.onSelectTrendsParameter(
            event.target.value, trendsPageThresholdChoice, this.props.trends_view_type
        );
    }

    render() {

        let trendsPageSettings = this.props.trends_settings;
        let trendsPageParameters = [];
        let trendsPageParametersMap = [];
        let title = "Select Parameter";
        let subtitle = window.configruntime.gd3.parameter_subtitle;

        if (trendsPageSettings) {
            trendsPageSettings.map(p => {
                    if (p.parameter.id == this.props.chosenParameter) {
                        trendsPageParametersMap.push(
                            <Radio id={p.parameter.id} value={p.parameter.id}
                                   key={p.parameter.id}>
                                <p className={trendsStyles.selectedParameter}>{p.parameter.title}</p>
                            </Radio>
                        )
                    } else {
                        trendsPageParametersMap.push(
                            <Radio id={p.parameter.id} value={p.parameter.id}
                                   key={p.parameter.id}> {p.parameter.title} </Radio>
                        )
                    }
                }
            )
        }

        trendsPageParameters = trendsPageParameters.concat(trendsPageParametersMap);
        if (trendsPageParametersMap.length == 0) {
            trendsPageParameters = [<Radio id="9999" value="9999" key="9999"
                                           disabled={true}> None Available </Radio>];
        }

        return (
            <Card className={this.props.className}>
                <CardHeader>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardSubtitle>
                        {subtitle}
                    </CardSubtitle>
                </CardHeader>
                <CardActions>
                    <RadioGroup name="params"
                                value={this.props.chosenParameter}
                                onChange={this.handleParameterChange}>
                        {trendsPageParameters}
                    </RadioGroup>
                </CardActions>
            </Card>
        );

    }

}

export default TrendsParameters;
