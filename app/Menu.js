import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from './menu.css'

class Menu extends Component {

	render() {
		return (
			<header>
				<div className={styles.nav}>
			        <ul>
			          	<li><Link to="/" className={this.props.selected === 'home'? styles.selected : null}>Home</Link></li>
			          	<li><Link to="/explore" className={this.props.selected === 'explore'? styles.selected : null}>Explore</Link></li>
			            <li><Link to="/search" className={this.props.selected === 'search'? styles.selected : null}>Search</Link></li>
			            <li><Link to="/about" className={this.props.selected === 'about'? styles.selected : null}>About</Link></li>
			        </ul>
		      	</div>
	      	</header>
		);
	}

}

export default Menu;