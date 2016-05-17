import React, {Component} from 'react'
import Menu from '../Menu'

class Home extends Component {
	render() {
		var title = 'Sensors';
		return (
			<div>
				<Menu selected='home'/>
				<div>Hello from home!</div>
			</div>
		);
	}
}

export default Home;