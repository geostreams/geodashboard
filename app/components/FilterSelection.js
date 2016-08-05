import React, {Component} from 'react'
import SourceFilterList from './SourceFilterList'
import ParamsFilterList from './ParamsFilterList'
import LocationsFilterList from './LocationsFilterList'
import TimeFilterList from './TimeFilterList'
import FilterList from './FilterList'
import { connect } from 'react-redux'
import styles from '../styles/filterSelection.css'

class FilterSelection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedValues: ['locations']
		}
	    this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		var notUsedFilters = []
		this.props.filters.map((f, key) => {
		 	if(!this.state.selectedValues.includes(f.id)) {
		 		notUsedFilters.push(f.id)
				
			}
		})
		if(notUsedFilters.length > 0) {
			var selectedVal = this.state.selectedValues.slice()
			selectedVal.push(notUsedFilters[0]);
			this.setState({selectedValues: selectedVal});
			console.log("clicked");	
			$('#addButton').removeClass("hidden");
		}

	}

	render() {
		
		console.log(this.state.selectedValues)
		const filters = this.props.filters.map((f, key) => {
			console.log(f.id)
			if(this.state.selectedValues.includes(f.id)) {
				return <FilterList key={key} idx={this.state.selectedValues.indexOf(f.id)} attribute={f.id}/>
			}
		})
		
		return (
			<div>
				<div id="filters-div">
					{filters}
					<button id="addButton" className={styles.add} onClick={this.handleClick}>+</button>
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