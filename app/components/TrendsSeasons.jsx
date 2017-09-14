/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup, Button,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';
import type {InputEvent} from '../utils/flowtype';

class TrendsSeasons extends Component {

    state: {
        chosenSeason: string
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenSeason: this.props.trends_defaults[1].value
        };
        (this:any).handleSeasonChange = this.handleSeasonChange.bind(this);
    }

    handleSeasonChange(event: InputEvent) {
        this.setState({chosenSeason: event.target.value});
        this.props.onSelectTrendsSeason(event.target.value, this.props.trends_view_type);
    }

    render() {

        let trendsPageSeasonsList = this.props.trends_seasons;
        let trendsPageSeasons = [];
        let trendsPageSeasonsMap = [];

        if (trendsPageSeasonsList) {
            trendsPageSeasonsMap = trendsPageSeasonsList
                .map(p => <Radio id={p.id} value={p.id}
                                 key={p.id}> {p.title}</Radio>);
        }
        trendsPageSeasons = trendsPageSeasons.concat(trendsPageSeasonsMap);
        if (trendsPageSeasonsMap.length == 0) {
            trendsPageSeasons = [<Radio id="9998" value="9998" key="9998"
                                           disabled={true}> None Available </Radio>];
        }

        return (
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        Select Season
                    </CardTitle>
                    <CardSubtitle>
                        Season to Explore
                    </CardSubtitle>
                </CardHeader>
                <CardActions>
                    <RadioGroup name="season"
                                value={this.state.chosenSeason.toString()}
                                onChange={this.handleSeasonChange}>
                        {trendsPageSeasons}
                    </RadioGroup>
                </CardActions>
            </Card>
        );

    }

}

export default TrendsSeasons;
