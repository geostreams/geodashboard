/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {Card, CardHeader, CardTitle, CardText} from 'react-mdc-web';
import {sensorsToFeaturesTrendPage} from '../utils/mapUtils';
import { getTrendsPageSettings } from '../utils/getConfig';


class TrendsRegionDetails extends Component {

    render() {

        let regionName = this.props.trends_region_name;

        let trends_parameter_lake_regions = [];
        let trends_settings = getTrendsPageSettings();
        trends_settings.map(p => {
            if (p.parameter.lake_regions == true) {
                trends_parameter_lake_regions.push(p.parameter.id);
            }
        });
        let trendsPageSettings = sensorsToFeaturesTrendPage(
            this.props.regionsStations, this.props.selectedParameter, trends_parameter_lake_regions);

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

        return (
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

    }

}

export default TrendsRegionDetails;