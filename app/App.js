import React, {Component} from 'react'
import config from './config.json';
import sensorsData from '../data/sensors.json'
import Search from './Search'

class App extends Component {
	render() {
		return (
			<Search />
		);
	}

}

export default Search