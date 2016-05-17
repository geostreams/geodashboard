import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';
import sensorsData from '../data/sensors.json'
import Sensors from './Sensors'
import Map from './Map'
import FilterList from './FilterList'
import Menu from './Menu'

class Search extends Component {
	constructor(props) {
		super(props);
	    // this.state.parameters = this.collectParameters();
	   	this.state = {
	      parameters: this.collectParameters(),
	      sources: this.collectSources()
	    };
	}

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<Menu selected="search"/>
				<h1>{config.searchHeader}</h1>
				<Map sensors={sensorsData} />
				<div>
					<FilterList attribute="data_source" values={this.state.sources}/>
					<FilterList attribute="parameters" values={this.state.parameters}/>

				</div>
				<div>
					<Sensors title={title} sensors={sensorsData}/>
				</div>
			</div>
		);
	}

	collectParameters() {
		var params = [];
		sensorsData.map(s => {
			s.parameters.map(p => {
				// check if paremets exists already
				var found = params.some(function (e) {
					return e.id === p;
				})
				if (!found) params.push({'id': p, 'label': p});
			});
		});
		// sort
		return this.sortByLabel(params);

	}

	collectSources() {
		var sources = [];
		sensorsData.map(s => {
			var source = s.properties.type;
			// check if source exists already
			var found = sources.some(function (e) {
				return e.id === source.id;
			})
			if (!found) sources.push({'id':source.id, 'label': source.title});
		});
		// sort
		return this.sortByLabel(sources);
	}

	sortByLabel(list) {
		list.sort(function(a, b) {
		  var labelA = a.label.toUpperCase();
		  var labelB = b.label.toUpperCase();
		  if (labelA < labelB) {
		    return -1;
		  }
		  if (labelA > labelB) {
		    return 1;
		  }
		  return 0;
		});
		return list;
	}
}

export default Search;