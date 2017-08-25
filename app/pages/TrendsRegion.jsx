/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import MenuPage from '../components/MenuPage';
import Map from '../containers/TrendsRegionMap';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsSeasons from '../containers/TrendsSeasons';
import {Grid, Cell, Content, List} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import {connect} from 'react-redux';
import {
    getTrendsPageSettings,
    getTrendsPageSeasons,
    getTrendsDefaultValues
} from '../utils/getConfig';


class Trends extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsPageSeasons = getTrendsPageSeasons();
        let trendsPageViewType = "by-regions";
        let trendsThresholdChoice = false;
        let trendsPageType = 'Trends';

        return (

            <div>
                <MenuPage selected='trends'/>
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
                                    trends_page={trendsPageType}
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
                                    <Map display_draw='False'/>
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        view_type: state.chosenTrends.view_type
    }
};

export default connect(mapStateToProps)(Trends);
