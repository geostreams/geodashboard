import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';
import Sensors from './Sensors'
import Map from './Map'
import FilterList from './FilterList'
import Menu from './Menu'
import { connect } from 'react-redux'

class Search extends Component {

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<Menu selected="search"/>
				<Map sensors={this.props.sensorsData} />
				<div>
					<FilterList attribute="data_source" values={this.props.sources}/>
					<FilterList attribute="parameters" values={this.props.parameters}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
  	sensorsData: state.sensors.data,
    parameters: state.sensors.parameters,
    sources: state.sensors.sources
  }
}

export default connect(mapStateToProps)(Search)