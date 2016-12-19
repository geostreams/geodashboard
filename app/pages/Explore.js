import React, {Component} from 'react'
import Menu from '../components/MenuPage'
import Sensors from '../containers/Sensors'
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
};

export default connect(mapStateToProps)(Explore)