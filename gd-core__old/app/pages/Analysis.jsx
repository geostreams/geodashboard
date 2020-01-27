/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/main.css';
import analysisStyles from '../styles/analysis.css';
import {
    Card, CardHeader, CardActions, CardTitle, CardSubtitle, CardText,
    Content, List, Cell, Grid, Textfield, Button, Tab, Tabbar
} from 'react-mdc-web/lib';
import Map from '../containers/AnalysisMap';
import {
    getTrendSettings, getTrendRegions, getTrendsAnalysisDefaultValues, getMobileSizeMax
} from '../utils/getConfig';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsThresholds from '../containers/TrendsThresholds';
import TrendsRegions from '../containers/TrendsRegions';
import Spinner from '../components/Spinner';
import TrendsCalculationSettings from '../containers/TrendsCalculationSettings';
import TrendsSubmitButton from '../containers/TrendsSubmitButton';
import {connect} from "react-redux";
import {generateMobilePageTabs} from "../utils/mobileUtils";


class Analysis extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            viewSelection: "list-view"
        };
        (this: any).clickedViewSelection = this.clickedViewSelection.bind(this);

    }

    state: {
        viewSelection: string
    };

    clickedViewSelection(value: string) {
        this.setState({viewSelection: value});
    }

    render() {

        let trendsPageSettings = getTrendSettings();
        let trendsPageDefaults = getTrendsAnalysisDefaultValues();
        let trendsPageRegions = getTrendRegions();

        let trendsThresholdChoice = true;
        let trendsPageViewType = 'by-analysis';

        let loading_spinner;
        if (this.props.show_spinner === true && this.props.parameter !== '') {
            loading_spinner = (<Spinner/>);
        }

        let mapObject = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'map-view') {
            mapObject = <Map display_trends='True'
                             display_draw='True'
                             chosen_region='all'
            />;
        }

        // Setup Mobile View Tabs
        let mobilePageTabs = '';
        if (screen.width <= getMobileSizeMax()) {
            mobilePageTabs = generateMobilePageTabs("Map View", this.state.viewSelection, this.clickedViewSelection);
        }

        return (
            <div>
                {loading_spinner}
                <Content>
                    {mobilePageTabs}
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
                                        {mapObject}
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
