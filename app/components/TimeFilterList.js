import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import FilterOption from './FilterOption';
import dimensions from '../../data/dimensions.json'
import { connect } from 'react-redux'

class TimeFilterList extends Component {
	constructor(props) {
		super(props)
	   	this.state = {
	   		selectValue: 'time'
	    }
	    this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
	    var value = event.target.value
	    console.log(value, " was selected")
	    this.setState({selectValue: event.target.value})
  	}

	render() {
		var divContents;
		if(this.state.selectValue == "data_source") {
			divContents = this.props.sources.map(p =>
				<FilterOption id={p.id} label={p.label} key={p.id}/>
			)
		} else if(this.state.selectValue == "parameters") {
			divContents = this.props.parameters.map(p =>
						<FilterOption id={p.id} label={p.label} key={p.id}/>
			)
		} else if(this.state.selectValue == "time") {
			divContents = "Start time / End time"
		} else if(this.state.selectValue == "locations") {
			divContents = "Locations"
		}
		return (
			<div className={styles.root}>
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
  }
}

export default connect(mapStateToProps)(TimeFilterList)