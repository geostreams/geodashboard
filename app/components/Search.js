import React, {Component} from 'react'
import config from '../config.json';
import styles from '../styles/search.css';
import Sensors from './Sensors'
import Map from './Map'
import SourceFilterList from './SourceFilterList'
import ParamsFilterList from './ParamsFilterList'
import Menu from './Menu'
import { connect } from 'react-redux'
import FilterSelection from './FilterSelection'

class Search extends Component {

	render() {
		var title = 'Sensors';
		return (
			<div className={styles.root}>
				<Menu selected="search"/>
				<Map sensors={this.props.sensorsData} />
				<FilterSelection/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
  	sensorsData: state.sensors.data,
    parameters: state.sensors.parameters,
    sources: state.sensors.sources,
  	selectedParameters: state.selectedParameters.parameters,
  	selectedDataSources: state.selectedDataSources.data_sources,
  }
}

export default connect(mapStateToProps)(Search)