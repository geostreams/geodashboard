/*
 * @flow
 */


import React, {Component, PropTypes} from 'react';
import MenuPage from '../components/MenuPage';
import TrendsParameters from '../containers/TrendsParameters';
import RegionMiniMap from '../containers/RegionMiniMap';
import TrendsRegionDetails from '../containers/TrendsRegionDetails';
import LineChartWithDeviations from '../containers/LineChartWithDeviations';
import {Grid, Cell, Content, List, Card, CardTitle} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import { getCustomTrendsRegion, getTrendsPageSettings, getTrendsDefaultValues } from '../utils/getConfig';
import {Link} from 'react-router';


class TrendsDetail extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsThresholdChoice = false;
        let trendsRegionsSensors = [];
        let trendsRegionTitle =  getCustomTrendsRegion(this.props.params.region);
        let trendsRegionTitleLink =  " / " + getCustomTrendsRegion(this.props.params.region);
        let trendsRegionName = this.props.params.region;

        return (
            <div>
                <MenuPage/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={4}>
                                <Card className={trendsStyles.detailTitle}>
                                    <CardTitle>
                                        <Link href={"#trendsregions"}>Trends Regions</Link>
                                        {trendsRegionTitleLink} Trends Detail
                                    </CardTitle>
                                </Card>
                                <List className={trendsStyles.detailListStyle}>
                                    <TrendsParameters
                                        className={trendsStyles.parametersCardStyleDetail}
                                        trends_settings={trendsPageSettings}
                                        trends_threshold_choice={trendsThresholdChoice}
                                        trends_defaults={trendsPageDefaults}
                                        trends_detail_page={true}
                                    />
                                    <TrendsRegionDetails
                                        trends_region_name={trendsRegionName}
                                    />
                                    <RegionMiniMap
                                        trends_region={this.props.params.region}
                                        trends_region_sensors={trendsRegionsSensors}
                                        trends_region_title={trendsRegionTitle}
                                    />
                                </List>
                            </Cell>
                            <Cell col={6}>
                                <div className={trendsStyles.detailChart}>
                                    <LineChartWithDeviations
                                        trends_settings={trendsPageSettings}
                                        trends_region_name={trendsRegionName}
                                    />
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>
        );

    }

}

export default TrendsDetail