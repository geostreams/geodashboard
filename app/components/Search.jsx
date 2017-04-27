import React, {Component} from 'react'
import styles from '../styles/search.css';
import stylesearch from '../styles/search.css';
import Map from '../containers/Map'
import Menu from './MenuPage'
import DownloadButtons from '../containers/DownloadButtons'
import FilterSelection from '../containers/FilterSelection'
import Card from 'material-ui/Card';
import List from 'material-ui/List';

Object.assign(styles, stylesearch);

class Search extends Component {
    render() {
        return (
        	<div>
				<div className={styles.menu}>
					<Menu selected="search"/>
				</div>
				<div className={styles.body}>
					<div>
						<List className={styles.list}>
							<FilterSelection/>
						</List>
						<Card className={styles.download}>
							<DownloadButtons/>
						</Card>
					</div>
					<div className={styles.rightmap}>
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