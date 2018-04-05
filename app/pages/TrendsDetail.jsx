/*
 * @flow
 */

import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import RegionMiniMap from '../containers/RegionMiniMap';
import TrendsRegionDetails from '../containers/TrendsRegionDetails';
import TrendsGraph from '../containers/TrendsGraph';
import {Grid, Cell, Content, List, Card, CardTitle} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import { getCustomTrendsRegion, getTrendsPageSettings } from '../utils/getConfig';
import {Link} from 'react-router';

class TrendsDetail extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsRegionTitle =  getCustomTrendsRegion(this.props.params.region);
        let trendsRegionTitleLink =  " > " + getCustomTrendsRegion(this.props.params.region);

        return (
            <div>
                <Menu selected='trends'/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={4}>
                                <Card className={trendsStyles.detailTitle}>
                                    <CardTitle className={styles.title_card}>
                                        <Link href={"#trendsregions"}>Trends Regions</Link>
                                        {trendsRegionTitleLink}
                                    </CardTitle>
                                </Card>
                                <List className={trendsStyles.detailListStyle}>
                                    <TrendsRegionDetails
                                        trends_region_name={this.props.params.region}
                                        trends_season={this.props.params.season}
                                        trends_parameter={this.props.params.parameter}
                                    />
                                    <RegionMiniMap
                                        trends_region={this.props.params.region}
                                        trends_parameter={this.props.params.parameter}
                                        trends_region_title={trendsRegionTitle}
                                    />
                                </List>
                            </Cell>
                            <Cell col={8}>
                                <div className={trendsStyles.detailChart}>
                                    <TrendsGraph
                                        trends_settings={trendsPageSettings}
                                        trends_region_id={this.props.params.region}
                                        trends_parameter={this.props.params.parameter}
                                        trends_season={this.props.params.season}
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
