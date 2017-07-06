import React, {Component} from 'react'
import styles from '../styles/main.css';
import stylesearch from '../styles/search.css';
import Map from '../containers/Map'
import Menu from '../containers/MenuBar'
import DownloadButtons from '../containers/DownloadButtons'
import FilterSelection from '../containers/FilterSelection'
import {Card, CardText, CardMedia, List, Content, Grid, Cell} from 'react-mdc-web';

Object.assign(styles, stylesearch);

class Search extends Component {
    render() {
        return (
            <div>
                <MenuPage selected="search"/>
                <Content>
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={2}>
                                <List className={styles.list}>
                                    <FilterSelection/>
                                </List>
                                <div className={styles.leftActions}>
                                <DownloadButtons/>
                                </div>
                            </Cell>
                            <Cell col={10}>
                                <div className={styles.rightmap} >
                                    <Map updateSensors={this.props.availableSensors}
                                         locationSelected={this.props.selectedSearchLocation}
                                         display_draw='True'/>
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