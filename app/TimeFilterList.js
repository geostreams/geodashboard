import React, {Component} from 'react'
import styles from './styles/filterList.css';
import FilterOption from './FilterOption';
import dimensions from '../data/dimensions.json'
import { connect } from 'react-redux'

class TimeFilterList extends Component {
	constructor(props) {
		super(props)
	   	this.state = {
	   		selectValue: 'time'
	    }
	}

	handleChange(event) {
	    var value = event.target.value
	    console.log(value, " was selected")
	    this.setState({selectValue: event.target.value})
  	}

	render() {
		return (
			<div className={styles.root}>
				<select value={this.state.selectValue} onChange={this.handleChange} className={styles.select}>
				  {dimensions.map(d =>
				  	<option value={d.id} key={d.id}>{d.name}</option>
				  )}
				</select>
				<div>
					Start time / End time
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    parameters: state.sensors.time,
  }
}

export default connect(mapStateToProps)(TimeFilterList)