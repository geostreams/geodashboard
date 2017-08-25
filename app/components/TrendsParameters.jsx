/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';


class TrendsParameters extends Component {

    state: {
        chosenParameter: string,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenParameter: this.props.trends_defaults[0].value,
        };
    }

    handleParameterChange = (event: Object) => {
        this.setState({chosenParameter: event.target.value});
        let trendsPageThresholdChoice = this.props.trends_threshold_choice;
        let typeOfPage = this.props.trends_page;
        this.props.onSelectTrendsParameter(
            event.target.value, trendsPageThresholdChoice, typeOfPage, this.props.trends_view_type
        );
    };

    render() {

        let return_item;

        let trendsPageSettings = this.props.trends_settings;
        let trendsPageParameters = [];
        let trendsPageParametersMap = [];

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

        return_item=(
            <Card className={this.props.className}>
                <CardHeader>
                    <CardTitle>
                        Select Parameter
                    </CardTitle>
                    <CardSubtitle>
                        Click a Parameter to Explore
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

        return return_item;

    }

}

export default TrendsParameters;
