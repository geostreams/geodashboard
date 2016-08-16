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
	   		divId: props.idx ,
	    }
	    this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
	    var value = event.target.value
	    console.log(value, " was selected")
	    if(value=="parameters"){
	    	this.setState({selectValue: event.target.value, selectedParameters: []})
	    } else if(value == "data_source") {
			this.setState({selectValue: event.target.value, selectedDataSources: []})
	    } else {
	    	this.setState({selectValue: event.target.value})
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
		
		return (
			<div className={styles.root} id={this.state.divId}>
				<select value={this.state.selectValue} onChange={this.handleChange} className={styles.select}>
				  {dimensions.map(d =>
				  	<option value={d.id} key={d.id}>{d.name}</option>
				  )}
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