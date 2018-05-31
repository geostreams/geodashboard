/*
 * @flow
 */

import React, {Component} from 'react'
import styles from '../styles/main.css';
import stylesearch from '../styles/search.css';
import SearchMap from '../containers/SearchMap';
import Menu from '../containers/MenuBar';
import DownloadButtons from '../containers/DownloadButtons';
import FilterSelection from '../containers/FilterSelection';
import {
    Card, CardText, CardMedia, Cell, Checkbox, Content,
    FormField, Grid, List, Radio, RadioGroup
} from 'react-mdc-web';
import {clustersChoiceOption, getMobileSizeMax} from '../utils/getConfig';
import MapToggleClusters from "../components/MapToggleClusters";


Object.assign(styles, stylesearch);

class Search extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            viewSelection: "list-view",
            disableClusters: false
        };
        (this:any).clickedViewSelection = this.clickedViewSelection.bind(this);
        (this:any).toggleClustersSearch = this.toggleClustersSearch.bind(this);

    }

    state: {
        viewSelection: string,
        disableClusters: boolean
    };

    clickedViewSelection(event: Object) {
        this.setState({viewSelection: event.target.value});
    }

    toggleClustersSearch() {
        this.setState({disableClusters: !this.state.disableClusters});
    };

    render() {

        let disableClusters = this.state.disableClusters;

        let filterLists = '';
        if (screen.width > getMobileSizeMax()  || this.state.viewSelection === 'list-view') {
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

        let mobileViewSelection = '';
        if (screen.width <= getMobileSizeMax()) {
            let map_radio = (<Radio value="map-view" name="map-view">Map</Radio>);
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                map_radio = (
                    <Radio disabled={true} value="map-view" name="map-view">
                        Map (View unavailable with Chrome Mobile)
                    </Radio>
                )
            }

            mobileViewSelection =
                <div className={styles.viewSelectionStyle}>
                    <h2 className={styles.viewSelectionLabel}>View By: </h2>
                    <RadioGroup
                        className={styles.viewSelectionRadios}
                        name="view-selection"
                        value={this.state.viewSelection}
                        onChange={this.clickedViewSelection}
                    >
                        <Radio value="list-view" name="list-view">List</Radio>
                        {map_radio}
                    </RadioGroup>
                </div>
        }

        return (
            <div>
                <Menu selected="search"/>
                <Content>
                    {mobileViewSelection}
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
                                <div className={styles.rightMap} >
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