/*
 * @flow
 */

import React, {Component} from 'react';
import Map from '../containers/TrendsRegionMap';
import TrendsParameters from '../containers/TrendsParameters';
import TrendsSeasons from '../containers/TrendsSeasons';
import Spinner from '../components/Spinner';
import {
    Grid, Cell, Content, List, Card, CardHeader, CardTitle, CardText, Tabbar, Tab
} from 'react-mdc-web/lib';
import styles from '../styles/main.css';
import trendsStyles from '../styles/trends.css';
import {connect} from 'react-redux';
import {
    getTrendsPageSettings, getTrendsPageSeasons, getTrendsDefaultValues, getMobileSizeMax
} from '../utils/getConfig';
import {generateMobilePageTabs} from "../utils/mobileUtils";
import {handleParamsWithItalics} from '../utils/configUtils';


class TrendsRegion extends Component {

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

        let trendsPageSettings = getTrendsPageSettings();
        let trendsPageDefaults = getTrendsDefaultValues();
        let trendsPageSeasons = getTrendsPageSeasons();
        let trendsPageViewType = "by-regions";
        let trendsThresholdChoice = false;

        let loading_spinner;
        if (this.props.show_spinner === true && this.props.parameter !== '') {
            loading_spinner = (
                <Spinner/>
            );
        }

        let selections = '';
        if (this.props.region_parameter !== '') {
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
                                                {handleParamsWithItalics(this.props.region_parameter.slice(0, -7))}
                                                </span> <br/>
                    </CardText>
                </Card>
            );
        }

        let mapObject = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'map-view') {
            mapObject = <Map display_draw='False'
                             trends_settings={trendsPageSettings}
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
                                    {mapObject}
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
