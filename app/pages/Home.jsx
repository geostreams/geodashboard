import React, {Component} from 'react'
import Menu from '../containers/MenuBar'
import styles from '../styles/main.css'
import SwitchBackend from '../containers/SwitchAPI'

class Home extends Component {
	render() {
		return (
			<div>
				<MenuPage selected='home'/>
				<div className={styles.contentcenter}>
					<div><h3>Welcome to the Geodashboard!</h3></div>
					<SwitchBackend/>
				</div>
			</div>
		);
	}
}

export default Home;