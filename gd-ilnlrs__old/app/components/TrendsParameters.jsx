/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import mainStyles from '../styles/main.css';
import {
    Radio, RadioGroup, Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web/lib';
import type {InputEvent} from '../utils/flowtype';
import {handleParamsWithItalics} from "../utils/configUtils";


class TrendsParameters extends Component {

    constructor(props: Object) {
        super(props);
        (this: any).handleParameterChange = this.handleParameterChange.bind(this);
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
        let parameter_label_array = [];

        if (trendsPageSettings) {
            trendsPageSettings.map(p => {
                    parameter_label_array = handleParamsWithItalics(p.parameter.title);
                    trendsPageParametersMap.push(
                        <Radio id={p.parameter.id} value={p.parameter.id}
                               key={p.parameter.id}> {parameter_label_array}</Radio>
                    )
                }
            )
        }

        trendsPageParameters = trendsPageParameters.concat(trendsPageParametersMap);
        if (trendsPageParametersMap.length === 0) {
            trendsPageParameters = [<Radio id="9999" value="9999" key="9999"
                                           disabled={true}> None Available </Radio>];
        }

        return (
            <Card className={this.props.className}>
                <CardHeader>
                    <CardTitle className={mainStyles.title_card}>
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

TrendsParameters.propTypes = {
    chosenParameter: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    trends_settings: PropTypes.array.isRequired,
    trends_threshold_choice: PropTypes.bool.isRequired,
    trends_view_type: PropTypes.string.isRequired
};

export default TrendsParameters;
