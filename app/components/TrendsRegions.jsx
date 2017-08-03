/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';


class TrendsRegions extends Component {

    state: {
        chosenRegion: Object,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenRegion: this.props.trends_defaults[3].value,
        };
    }

    handleRegionChange = (event: Object) => {
        this.setState({chosenRegion: event.target.value});
        this.props.onSelectTrendsRegion(event.target.value);
    };

    render() {

        let trendsViewType = this.props.trends_view_type;

        let return_item;

        if (trendsViewType == 'by-sensors') {

            let trendsPageSettings = this.props.trends_regions;

            let trendsPageRegions = [];
            let trendsPageRegionsMap = [];
            if (trendsPageSettings) {
                trendsPageRegionsMap = trendsPageSettings
                    .map(r => <Radio id={r.properties.title} value={r.properties.id}
                                     key={r.properties.id}> {r.properties.title}</Radio>);
            }
            trendsPageRegions = trendsPageRegions.concat(trendsPageRegionsMap);
            if (trendsPageRegionsMap.length == 0) {
                trendsPageRegions = [<Radio id="9999" value="9999" key="9999"
                                            disabled={true}> None Available </Radio>];
            }

            return_item = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle>
                            Select Region
                        </CardTitle>
                        <CardSubtitle>
                            Region to Explore
                        </CardSubtitle>
                    </CardHeader>
                    <CardActions>
                        <RadioGroup name="regions"
                                    value={this.props.chosenRegion.toString()}
                                    onChange={this.handleRegionChange.bind(this)}>
                            {trendsPageRegions}
                        </RadioGroup>
                    </CardActions>
                </Card>
            );

        } else {

            return_item = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle>
                            Select Region
                        </CardTitle>
                        <CardSubtitle>
                            Click a Map Region to Explore
                        </CardSubtitle>
                    </CardHeader>
                </Card>
            );

        }

        return return_item;

    }

}

export default TrendsRegions;
