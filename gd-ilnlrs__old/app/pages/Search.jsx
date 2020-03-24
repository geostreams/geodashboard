/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/main.css';
import styleSearch from '../styles/search.css';
import stylesMobile from '../styles/mobilePageTabs.css';
import SearchMap from '../containers/SearchMap';
import DownloadButtons from '../containers/DownloadButtons';
import FilterSelection from '../containers/FilterSelection';
import {
    Card, CardText, CardMedia, Cell, Checkbox, Content,
    FormField, Grid, List, Radio, RadioGroup, Tab, Tabbar
} from 'react-mdc-web/lib';
import {clustersChoiceOption, getMobileSizeMax} from '../utils/getConfig';
import MapToggleClusters from "../components/MapToggleClusters";
import {generateMobilePageTabs} from '../utils/mobileUtils';


Object.assign(styles, styleSearch, stylesMobile);

class Search extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            viewSelection: "list-view",
            disableClusters: false
        };
        (this: any).clickedViewSelection = this.clickedViewSelection.bind(this);
        (this: any).toggleClustersSearch = this.toggleClustersSearch.bind(this);

    }

    state: {
        viewSelection: string,
        disableClusters: boolean
    };

    clickedViewSelection(value: string): any {
        this.setState({viewSelection: value});
    }

    toggleClustersSearch() {
        this.setState({disableClusters: !this.state.disableClusters});
    };

    render() {

        let disableClusters = this.state.disableClusters;

        let filterLists = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'list-view') {
            filterLists =
                <List className={styles.list}>
                    <FilterSelection/>
                </List>
        }

        let toggleClustersSearch = '';
        let toggleClustersSearchOption = clustersChoiceOption();
        if (toggleClustersSearchOption === true && screen.width > getMobileSizeMax()) {
            toggleClustersSearch = <MapToggleClusters
                onChangeFunction={this.toggleClustersSearch}
                disableClusters={disableClusters}
            />
        }

        let mapObject = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'map-view') {
            if (screen.width <= getMobileSizeMax()) {
                disableClusters = false;
            }
            mapObject = <SearchMap disable_clusters={disableClusters}/>;
        }

        // Setup Mobile View Tabs
        let mobilePageTabs = '';
        if (screen.width <= getMobileSizeMax()) {
            mobilePageTabs = generateMobilePageTabs("Map View", this.state.viewSelection, this.clickedViewSelection);
        }

        return (
            <div>
                <Content>
                    {mobilePageTabs}
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                {toggleClustersSearch}
                                {filterLists}
                            </Cell>
                            <div className={styles.bottomSection}>
                                <DownloadButtons/>
                            </div>
                            <Cell col={9}>
                                <div className={styles.rightMap}>
                                    {mapObject}
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>
        );

    }
}

export default Search;
