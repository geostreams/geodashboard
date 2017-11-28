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
import {Card, CardText, CardMedia, List, Content, Grid, Cell} from 'react-mdc-web';

Object.assign(styles, stylesearch);

class Search extends Component {
    render() {
        return (
            <div>
                <Menu selected="search"/>
                <Content>
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                <List className={styles.list}>
                                    <FilterSelection/>
                                </List>
                                <div className={styles.bottomSection}>
                                    <DownloadButtons/>
                                </div>
                            </Cell>
                            <Cell col={9}>
                                <div className={styles.rightmap} >
                                    <SearchMap />
                                </div>
                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Search
