import React, {Component} from 'react'
import Menu from '../Menu'

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