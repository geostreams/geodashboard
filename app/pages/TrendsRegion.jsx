/*
 * @flow
 */

import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/TrendsRegionMap';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsSeasons from '../containers/TrendsSeasons';
import {Grid, Cell, Content, List, Card, CardHeader, CardTitle, CardText} from 'react-mdc-web';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import {connect} from 'react-redux';
import { getTrendsPageSettings, getTrendsPageSeasons, getTrendsDefaultValues } from '../utils/getConfig';

class TrendsRegion extends Component {

    render() {

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsPageSeasons = getTrendsPageSeasons();
        let trendsPageViewType = "by-regions";
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
        if (this.props.region_parameter != '') {
            selections = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle>
                            Trends Selections
                        </CardTitle>
                    </CardHeader>
                    <CardText>
                        Season: <span className={trendsStyles.capitalize_word}>
                                                {this.props.region_season}</span> <br/>
                        Parameter: <span className={trendsStyles.capitalize_word}>
                                                {this.props.region_parameter.slice(0, -7)}</span> <br/>
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
                                </List>
                            </Cell>
                            <Cell col={9}>
                                <div className={styles.rightMap}>
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
        show_spinner: state.chosenTrends.show_spinner,
        parameter: state.chosenTrends.parameter,
        region_season: state.chosenTrends.region_season,
        region_parameter: state.chosenTrends.region_parameter
    }
};

export default connect(mapStateToProps)(TrendsRegion);
