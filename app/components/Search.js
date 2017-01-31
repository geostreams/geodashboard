import React, {Component} from 'react'
import styles from '../styles/search.css';
import Sensors from '../containers/Sensors'
import Map from '../containers/Map'
import Menu from './MenuPage'
import { connect } from 'react-redux'
import DownloadButtons from '../containers/DownloadButtons'
import FilterSelection from '../containers/FilterSelection'
import Card from 'material-ui/Card';
import List from 'material-ui/List';


class Search extends Component {

    render() {
        var title = 'Sensors';
        return (
        	<div>
				<div className={styles.menustyle}>
					<Menu selected="search"/>
				</div>
				<div className={styles.bodystyle}>
					<div>
						<List className={styles.liststyle}>
							<FilterSelection/>
							<DownloadButtons/>
						</List>
					</div>
					<div className={styles.root}>
						<Card>
							<Map sensors={this.props.sensorsData}/>
						</Card>
					</div>
				</div>
			</div>
        );
    }
}

export default Search