import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import FilterOption from './FilterOption';
import UpdateFilters from '../containers/UpdateFilters';
import dimensions from '../../data/dimensions.json'
import { connect } from 'react-redux'

class FilterList extends Component {
	constructor(props) {
		super(props)
	   	this.state = {
	   		selectValue: props.attribute,
	   		divId: props.idx
	    }
	}

	render() {
		var divContents;
		if(this.state.selectValue == "data_source") {
			divContents = this.props.sources.map(p =>
				<UpdateFilters id={p.id} name={this.state.selectValue} label={p.label} key={p.id}/>
			)

		} else if(this.state.selectValue == "parameters") {
			divContents = this.props.parameters.map(p =>
				<UpdateFilters id={p.id} name={this.state.selectValue} label={p.label} key={p.id}/>
			)
		} else if(this.state.selectValue == "time") {
			divContents = "Start time / End time"
		} else if(this.state.selectValue == "locations") {
			divContents = "Locations"
		}
		const {selectedValues, idx} = this.props;
		const options = dimensions.map(d => {
			if(selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx){
		  		return <option value={d.id} key={d.id}>{d.name}</option>
		  	}
		})
				  	
		return (
			<div className={styles.root} id={this.state.divId}>
				<select value={this.state.selectValue} onChange={this.props.onChangeSelection} data-idx={idx} className={styles.select}>
					{options}
				</select>
				<div>
					{divContents}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.sensors.locations,
    sources: state.sensors.sources,
    parameters: state.sensors.parameters,
    time: state.sensors.time,
    selectedParameters: state.searchFilters.selectedParameters,
  	selectedDataSources: state.searchFilters.selectedDataSources,
  }
}

export default connect(mapStateToProps)(FilterList)