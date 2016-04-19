import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';
import sensorsData from '../data/sensors.json'
import Sensors from './Sensors'

class Search extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<div>{config.greetText}</div>
				<div>
					<Sensors title={title} sensors={sensorsData} />
				</div>
			</div>
		);
	}
}

export default Search