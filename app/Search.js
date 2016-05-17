import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';
import sensorsData from '../data/sensors.json'
import Sensors from './Sensors'
import Map from './Map'
import FilterList from './FilterList'

class Search extends Component {
	constructor(props) {
		super(props);
	    // this.state.parameters = this.collectParameters();
	   	this.state = {
	      parameters: this.collectParameters()
	    };
	}

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<div>{config.greetText}</div>
				<Map sensors={sensorsData} />
				<div>
					<FilterList attribute="parameters" values={this.state.parameters}/>
				</div>
				<div>
					<Sensors title={title} sensors={sensorsData}/>
				</div>
			</div>
		);
	}

	collectParameters() {
		var params = new Set();
		sensorsData.map(s => {
			s.parameters.map(p => {
				params.add(p);
			});
		});
		console.log(params);
		return [...params];
	}
}

export default Search;