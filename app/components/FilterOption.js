import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import styles from '../styles/filterOption.css'
import * as ActionCreators from '../actions'

class FilterOption extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      dimension: ""
	    };
	    this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const selectedParameters = Object.assign([], this.props.selectedParameters);
		const selectedDataSources = Object.assign([], this.props.selectedDataSources);
	    this.props.onOptionChange(event, selectedParameters, selectedDataSources);
  	}

	render() {
		return (
			<div className={styles.row}>
				<div className={styles.col1}>
					<input type="checkbox" name={this.props.name} value={this.props.id} onChange={this.handleChange}></input>
				</div>
				<div className={styles.col2}>{this.props.label}</div>
			</div>
		);
	}
}

export default FilterOption