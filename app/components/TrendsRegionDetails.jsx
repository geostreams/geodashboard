/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {Card, CardHeader, CardTitle, CardText} from 'react-mdc-web';
import {sensorsToFeaturesTrendPage} from '../utils/mapUtils';


class TrendsRegionDetails extends Component {

    render() {

        let return_item;
        let regionName = this.props.trends_region_name;
        let trendsPageSettings = sensorsToFeaturesTrendPage(this.props.regionsStations);
        let trendsCheckRegion;
        let trendsDetailListItems = '';

        if (trendsPageSettings && regionName) {
            for (let i = 0; i < trendsPageSettings.length; i++) {
                trendsCheckRegion = trendsPageSettings[i].attributes.location;
                if (trendsCheckRegion == regionName) {
                    trendsDetailListItems =
                        <ul className={trendsStyles.list_style}>
                            <li>Baseline Avg: {trendsPageSettings[i].attributes.trend_values[0]} </li>
                            <li>Rolling Avg: {trendsPageSettings[i].attributes.trend_values[1]}</li>
                            <li>Latest Value: {trendsPageSettings[i].attributes.trend_values[2]}</li>
                            <li>Latest Time: {trendsPageSettings[i].attributes.trend_values[3]} </li>
                        </ul>;
                }
            }
        }

        return_item=(
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        Trend Details
                    </CardTitle>
                </CardHeader>
                <CardText>
                    {trendsDetailListItems}
                </CardText>
            </Card>
        );

        return return_item;

    }

}

export default TrendsRegionDetails;
