/*
 * @flow
 */

import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';
import analysisStyles from '../styles/analysis.css';
import {
    Card, CardHeader, CardActions, CardTitle, CardSubtitle, CardText,
    Content, List, Cell, Grid, Textfield, Button
} from 'react-mdc-web';
import Map from '../containers/AnalysisMap';
import {
    getTrendSettings, getTrendRegions, getTrendsAnalysisDefaultValues,
    getTrendsPageBaseline, getTrendsPageRolling
} from '../utils/getConfig';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsThresholds from '../containers/TrendsThresholds';
import TrendsRegions from '../containers/TrendsRegions';
import TrendsCalculationSettings from '../containers/TrendsCalculationSettings';
import TrendsSubmitButton from '../containers/TrendsSubmitButton';
import {connect} from "react-redux";


class Analysis extends Component {

    render() {

        let trendsPageSettings = getTrendSettings();
        let trendsPageDefaults = getTrendsAnalysisDefaultValues();
        let trendsPageRegions = getTrendRegions();
        let trendsPageBaseline = getTrendsPageBaseline();
        let trendsPageRolling = getTrendsPageRolling();

        let trendsThresholdChoice = true;
        let trendsPageViewType = 'by-analysis';

        let loading_spinner;
        if (this.props.show_spinner === true && this.props.parameter !== '') {
            loading_spinner = (
                <div className={styles.make_modal}>
                    <div className={styles.loading_spinner}> </div>
                </div>
            );
        }

        return (
            <div>
                {loading_spinner}
                <Menu selected="analysis"/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                <TrendsParameters
                                    className={analysisStyles.parametersCardStyle}
                                    trends_settings={trendsPageSettings}
                                    trends_threshold_choice={trendsThresholdChoice}
                                    trends_defaults={trendsPageDefaults}
                                    trends_view_type={trendsPageViewType}
                                />
                                <List className={analysisStyles.liststyle}>
                                    <TrendsCalculationSettings
                                        trends_defaults={trendsPageDefaults}
                                        trends_baseline={trendsPageBaseline}
                                        trends_rolling={trendsPageRolling}
                                    />
                                    <TrendsThresholds
                                        trends_thresholds={trendsPageSettings}
                                        trends_threshold_choice={trendsThresholdChoice}
                                        trends_defaults={trendsPageDefaults}
                                    />
                                    <TrendsRegions
                                        trends_regions={trendsPageRegions}
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                </List>
                                <div className={analysisStyles.actionStyle}>
                                    <TrendsSubmitButton
                                        trends_defaults={trendsPageDefaults}
                                        trends_view_type={trendsPageViewType}
                                    />
                                </div>
                            </Cell>
                            <Cell col={9}>
                                <div className={styles.rightMap}>
                                    <Card>
                                        <Map display_trends='True'
                                             display_draw='True'
                                             chosen_region='all'
                                        />
                                    </Card>
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>
        );

    }

}

const mapStateToProps = (state) => {
    return {
        show_spinner: state.chosenTrends.show_spinner
    }
};

export default connect(mapStateToProps)(Analysis);
