import React, {Component} from 'react'
import Menu from '../components/MenuPage'

class RouteMismatch extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div>
				<Menu/>
				<div>Wrong url, friend.</div>
			</div>
		);
	}
}

export default RouteMismatch;