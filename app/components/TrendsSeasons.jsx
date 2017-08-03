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


class TrendsSeasons extends Component {

    state: {
        chosenSeason: string,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenSeason: this.props.trends_defaults[1].value,
        };
    }

    handleSeasonChange = (event: Object) => {
        this.setState({chosenSeason: event.target.value});
        this.props.onSelectTrendsSeason(event.target.value);
    };


    render() {

        let return_item;

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

        return_item=(
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
                                onChange={this.handleSeasonChange.bind(this)}>
                        {trendsPageSeasons}
                    </RadioGroup>
                </CardActions>
            </Card>
        );

        return return_item;

    }

}

export default TrendsSeasons;
