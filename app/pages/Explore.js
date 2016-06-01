import React, {Component} from 'react'
import Menu from '../Menu'
import sensorsData from '../../data/sensors.json'
import Sensors from '../Sensors'
import styles from './explore.css'

class Explore extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div>
				<Menu selected='explore'/>
				<div className={styles.content}>
					<div>
						<Sensors title={title} sensors={sensorsData}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Explore