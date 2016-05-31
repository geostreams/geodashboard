import React, {Component} from 'react'
import Menu from '../Menu'
import styles from './home.css'
import SwitchBackend from '../containers/SwitchBackend'

class Home extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div>
				<Menu selected='home'/>
				<div className={styles.content}>
					<div><h3>Welcome to the Geodashboard!</h3></div>
					<SwitchBackend/>
				</div>
			</div>
		);
	}
}

export default Home;