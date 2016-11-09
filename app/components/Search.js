import React, {Component} from 'react'
import styles from '../styles/search.css';
import Sensors from '../containers/Sensors'
import Map from '../containers/Map'
import Menu from './Menu'
import FilterSelection from '../containers/FilterSelection'

class Search extends Component {

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<Menu selected="search"/>
				<Map sensors={this.props.sensorsData}/>
				<FilterSelection/>
			</div>
		);
	}
}

export default Search