/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/TrendsRegionMap';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsSeasons from '../containers/TrendsSeasons';
import {Grid, Cell, Content, List} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import { getTrendsPageSettings, getTrendsPageSeasons, getTrendsDefaultValues } from '../utils/getConfig';


class TrendsRegion extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsPageSeasons = getTrendsPageSeasons();
        let trendsPageViewType = "by-regions";
        let trendsThresholdChoice = false;

        return (

            <div>
                <Menu selected='trends'/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={2}>
                                <TrendsParameters
                                    className={trendsStyles.parametersCardStyle}
                                    trends_settings={trendsPageSettings}
                                    trends_threshold_choice={trendsThresholdChoice}
                                    trends_defaults={trendsPageDefaults}
                                    trends_view_type={trendsPageViewType}
                                />
                                <List className={trendsStyles.liststyle}>
                                    <TrendsSeasons
                                        trends_seasons={trendsPageSeasons}
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                </List>
                            </Cell>
                            <Cell col={10}>
                                <div className={styles.rightmap}>
                                    <Map
                                        display_draw='False'
                                        trends_settings={trendsPageSettings}
                                    />
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>

        )
    }

}

export default TrendsRegion;
