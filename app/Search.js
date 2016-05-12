import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';
import sensorsData from '../data/sensors.json'
import Sensors from './Sensors'
import Map from './Map'
import FilterList from './FilterList'

class Search extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<div>{config.greetText}</div>
				<Map sensors={sensorsData} />
				<div>
					<FilterList />
					<FilterList />
					<FilterList />
					<FilterList />
					<FilterList />
				</div>
				<div>
					<Sensors title={title} sensors={sensorsData} />
				</div>
			</div>
		);
	}
}

export default Search