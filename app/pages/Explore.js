import React, {Component} from 'react'
import Menu from '../Menu'
import sensorsData from '../../data/sensors.json'
import Sensors from '../Sensors'
import styles from './explore.css'
import { connect } from 'react-redux'

class Explore extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div>
				<Menu selected='explore'/>
				<div className={styles.content}>
					<div>
						<Sensors/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    sensorsData: state.sensors.data
  }
}

export default connect(mapStateToProps)(Explore)