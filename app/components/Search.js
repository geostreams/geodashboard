import React, {Component} from 'react'
import styles from '../styles/search.css';
import Sensors from '../containers/Sensors'
import Map from '../containers/Map'
import Menu from './MenuPage'
import { connect } from 'react-redux'
import DownloadButtons from '../containers/DownloadButtons'
import FilterSelection from '../containers/FilterSelection'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class Search extends Component {

    render() {
        var title = 'Sensors';
        return (
			<div>
				<Menu selected="search"/>
				<div>
					<Drawer width="380">
						<AppBar title="Geodashboard 3.0" showMenuIconButton={false}/>
						<FilterSelection/>
						<DownloadButtons/>
					</Drawer>
				</div>
				<div className={styles.root}>
					<Map sensors={this.props.sensorsData}/>
				</div>
			</div>
        );
    }
}

export default Search