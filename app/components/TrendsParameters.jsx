/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions,
    Button
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

    handleParameterChange = (id: string) => {
        this.setState({chosenParameter: id});
        let trendsPageThresholdChoice = this.props.trends_threshold_choice;
        this.props.onSelectTrendsParameter(id, trendsPageThresholdChoice);
    };


    render() {

        let return_item;

        let trendsPageSettings = this.props.trends_settings;
        let trendsPageParameters = [];
        let trendsPageParametersMap = [];
        if (trendsPageSettings) {
             trendsPageSettings.map(p => {
                     if (p.parameter.id == this.props.chosenParameter) {
                         // Change color of selected Parameter button
                         trendsPageParametersMap.push(
                             <Button className={trendsStyles.buttonstyle}
                                     raised accent key={p.parameter.id} id={p.parameter.id}
                                     onClick={this.handleParameterChange.bind(this, p.parameter.id)}>
                                 {p.parameter.title}
                             </Button>
                         )
                     } else {
                         trendsPageParametersMap.push(
                             <Button className={trendsStyles.buttonstyle}
                                     raised key={p.parameter.id} id={p.parameter.id}
                                     onClick={this.handleParameterChange.bind(this, p.parameter.id)}>
                                 {p.parameter.title}
                             </Button>
                         )
                     }
                 }
             )
        }
        trendsPageParameters = trendsPageParameters.concat(trendsPageParametersMap);
        if (trendsPageParametersMap.length == 0) {
            trendsPageParameters = [<Button raised >None Available</Button>];
        }

        return_item=(
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        Select Parameter
                    </CardTitle>
                    <CardSubtitle>
                        Click a Parameter to Explore
                    </CardSubtitle>
                </CardHeader>
                <CardActions>
                    <div>{trendsPageParameters}</div>
                </CardActions>
            </Card>
        );

        return return_item;

    }

}

export default TrendsParameters;
