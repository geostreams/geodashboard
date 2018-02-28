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
    Card, CardText, CardMedia, List, Content, Grid, Cell,
    Radio, RadioGroup
} from 'react-mdc-web';
import {getMobileSizeMax} from '../utils/getConfig';

Object.assign(styles, stylesearch);

class Search extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            viewSelection: "list-view"
        };
        (this:any).clickedViewSelection = this.clickedViewSelection.bind(this);
    }

    state: {
        viewSelection: string
    };

    clickedViewSelection(event: Object) {
        this.setState({viewSelection: event.target.value});
    }

    render() {

        let filterLists = '';
        if (screen.width > getMobileSizeMax()  || this.state.viewSelection === 'list-view') {
            filterLists =
                <List className={styles.list}>
                    <FilterSelection/>
                </List>
        }
        let mapObject = '';
        if (screen.width > getMobileSizeMax()  || this.state.viewSelection === 'map-view') {
            mapObject = <SearchMap />
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