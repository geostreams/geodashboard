import React, {Component} from 'react'
import SourceFilterList from './SourceFilterList'
import ParamsFilterList from './ParamsFilterList'
import LocationsFilterList from './LocationsFilterList'
import TimeFilterList from './TimeFilterList'
import FilterList from './FilterList'
import { connect } from 'react-redux'
import styles from './filterSelection.css'

class FilterSelection extends Component {

	render() {
		const filters = this.props.filters.map(f => {
			if (f.id === 'data_source') return <SourceFilterList values={this.props.sources}/>
			else if (f.id === 'parameters') return <ParamsFilterList values={this.props.parameters}/>
			else if (f.id === 'time') return <TimeFilterList value={this.props.time}/>
			else if (f.id === 'locations') return <LocationsFilterList value={this.props.locations}/>
			else console.log(`Filter selection widget type '${f.id}' not found`)
		})
		return (
			<div>
				<div>
					{filters}
					<button className={styles.add}>+</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
  	filters: state.searchFilters.filters,
  }
}

export default connect(mapStateToProps)(FilterSelection)