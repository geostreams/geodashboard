/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import mainStyles from '../styles/main.css';
import {
    Radio, RadioGroup, Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web/lib';
import type {InputEvent} from '../utils/flowtype';

class TrendsRegions extends Component {

    constructor(props: Object) {
        super(props);
        (this: any).handleRegionChange = this.handleRegionChange.bind(this);
    }

    handleRegionChange(event: InputEvent) {
        this.props.onSelectTrendsRegion(event.target.value, this.props.trends_view_type);
    }

    render() {

        let trendsPageSettings = this.props.trends_regions;
        let trendsPageRegions = [];
        let trendsPageRegionsMap = [];
        if (trendsPageSettings) {
            trendsPageSettings.map(r => {
                if (r.properties.id.toString().toUpperCase() !== 'ER') {
                    trendsPageRegionsMap.push(
                        <Radio id={r.properties.id} value={r.properties.id}
                               key={r.properties.id}> {r.properties.title}</Radio>
                    )
                }
            });
        }
        trendsPageRegions = trendsPageRegions.concat(trendsPageRegionsMap);
        if (trendsPageRegionsMap.length === 0) {
            trendsPageRegions = [<Radio id="9999" value="9999" key="9999"
                                        disabled={true}> None Available </Radio>];
        }

        if (trendsPageRegions.length !== 0) {

            return (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle className={mainStyles.title_card}>
                            Select Region
                        </CardTitle>
                        <CardSubtitle>
                            {window.configruntime.gd3.region_subtitle}
                        </CardSubtitle>
                    </CardHeader>
                    <CardActions>
                        <RadioGroup name="regions"
                                    value={this.props.chosenRegion.toString()}
                                    onChange={this.handleRegionChange}>
                            {trendsPageRegions}
                        </RadioGroup>
                    </CardActions>
                </Card>
            );

        } else {

            return (null);

        }

    }

}

TrendsRegions.propTypes = {
    trends_view_type: PropTypes.string.isRequired,
    trends_regions: PropTypes.array.isRequired,
    chosenRegion: PropTypes.string.isRequired
};

export default TrendsRegions;