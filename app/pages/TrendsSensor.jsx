/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/TrendsMap';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsSeasons from '../containers/TrendsSeasons';
import TrendsRegions from '../containers/TrendsRegions';
import {Grid, Cell, Content, List, Card, CardHeader, CardTitle, CardText} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import {connect} from 'react-redux';
import {
    getTrendsPageSettings, getTrendsPageSeasons,
    getTrendsRegionsSettings, getTrendsDefaultValues
} from '../utils/getConfig';


class TrendsSensor extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsPageSeasons = getTrendsPageSeasons();
        let trendsPageRegions = getTrendsRegionsSettings();
        let trendsPageViewType = "by-sensors";
        let trendsThresholdChoice = false;

        let loading_spinner;
        if (this.props.show_spinner == true && this.props.parameter != '') {
            loading_spinner = (
                <div className={styles.make_modal}>
                    <div className={styles.loading_spinner}></div>
                </div>
            );
        }

        let selections = '';
        if (this.props.sensor_parameter != '') {
            selections = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle>
                            Trends Selections
                        </CardTitle>
                    </CardHeader>
                    <CardText>
                        Season: <span className={trendsStyles.capitalize_word}>
                                                {this.props.sensor_season}</span> <br/>
                        Parameter: <span className={trendsStyles.capitalize_word}>
                                                {this.props.sensor_parameter.slice(0, -7)}</span> <br/>
                        Region: <span className={trendsStyles.capitalize_word}>
                                                {this.props.sensor_region}</span> <br/>
                    </CardText>
                </Card>
            );
        }

        return (

            <div>
                {loading_spinner}
                <Menu selected='trends'/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                <List className={trendsStyles.liststyle}>
                                    {selections}
                                    <TrendsSeasons
                                        trends_seasons={trendsPageSeasons}
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                    <TrendsParameters
                                        className={trendsStyles.parametersCardStyle}
                                        trends_settings={trendsPageSettings}
                                        trends_threshold_choice={trendsThresholdChoice}
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                    <TrendsRegions
                                        trends_regions={trendsPageRegions}
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                </List>
                            </Cell>
                            <Cell col={9}>
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

const mapStateToProps = (state) => {
    return {
        view_type: state.chosenTrends.view_type,
        parameter: state.chosenTrends.parameter,
        sensor_season: state.chosenTrends.sensor_season,
        sensor_region: state.chosenTrends.sensor_region,
        sensor_parameter: state.chosenTrends.sensor_parameter,
        show_spinner: state.chosenTrends.show_spinner
    }
};

export default connect(mapStateToProps)(TrendsSensor);

