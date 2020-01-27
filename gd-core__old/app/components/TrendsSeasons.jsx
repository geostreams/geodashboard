/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import mainStyles from '../styles/main.css';
import {
    Radio, RadioGroup, Button,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web/lib';
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
        (this: any).handleSeasonChange = this.handleSeasonChange.bind(this);
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
        if (trendsPageSeasonsMap.length === 0) {
            trendsPageSeasons = [<Radio id="9998" value="9998" key="9998"
                                        disabled={true}> None Available </Radio>];
        }

        return (
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle className={mainStyles.title_card}>
                        Select Season
                    </CardTitle>
                    <CardSubtitle>
                        {window.configruntime.gd3.season_subtitle}
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

TrendsSeasons.propTypes = {
    trends_view_type: PropTypes.string.isRequired,
    trends_defaults: PropTypes.array.isRequired,
    trends_seasons: PropTypes.array.isRequired
};

export default TrendsSeasons;