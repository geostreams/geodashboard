/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {Card, CardHeader, CardTitle, CardText} from 'react-mdc-web';
import {sensorsToFeaturesTrendRegionPage} from '../utils/mapUtils';
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

        let trendsPageSettings = sensorsToFeaturesTrendRegionPage(
            this.props.regionsStations, this.props.selectedParameter, trends_parameter_lake_regions);

        let trendsCheckRegion;
        let trendsDetailListItems = '';

        if (trendsPageSettings && regionName) {
            for (let i = 0; i < trendsPageSettings.length; i++) {
                trendsCheckRegion = trendsPageSettings[i].attributes.location;
                if (trendsCheckRegion.toUpperCase() == regionName.toUpperCase()) {
                    trendsDetailListItems =
                        <ul className={trendsStyles.list_style}>
                            <li className={trendsStyles.capitalize_word}>Season: {this.props.selectedSeason}</li>
                            <li>Total Avg: {trendsPageSettings[i].attributes.trend_values[0]} </li>
                            <li>Ten Year Avg: {trendsPageSettings[i].attributes.trend_values[1]}</li>
                            <li>Latest Avg: {trendsPageSettings[i].attributes.trend_values[2]}</li>
                        </ul>;
                }
            }
        }

        return (
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        Trends Summary
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

