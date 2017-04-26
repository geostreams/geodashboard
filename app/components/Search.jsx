import React, {Component} from 'react'
import styles from '../styles/search.css';
import Map from '../containers/Map'
import Menu from './MenuPage'
import DownloadButtons from '../containers/DownloadButtons'
import FilterSelection from '../containers/FilterSelection'
import Card from 'material-ui/Card';
import List from 'material-ui/List';

class Search extends Component {
    render() {
        return (
        	<div>
				<div className={styles.menustyle}>
					<Menu selected="search"/>
				</div>
				<div className={styles.bodystyle}>
					<div>
						<List className={styles.liststyle}>
							<FilterSelection/>
						</List>
						<Card className={styles.downloadstyle}>
							<DownloadButtons/>
						</Card>
					</div>
					<div className={styles.root}>
						<Card>
							<Map updateSensors={this.props.availableSensors} />
						</Card>
					</div>
				</div>
			</div>
        );
    }
}

export default Search