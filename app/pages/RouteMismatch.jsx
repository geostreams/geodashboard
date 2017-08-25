import React, {Component} from 'react';
import MenuPage from '../components/MenuPage';
import styles from '../styles/main.css';

class RouteMismatch extends Component {
	render() {
		return (
			<div>
				<MenuPage/>
				<div className={styles.contentcenter}>
					<h3>404 Not Found.</h3>
				</div>
			</div>
		);
	}
}

export default RouteMismatch;