import React, { Component } from 'react'
import styles from '../styles/switchAPI.css'

class SwitchAPI extends Component {
	handleChange = (e) => {
		this.props.onBackendChange(e.target.value)
	}

	render() {
		return (
			<div className={styles.root}>
				<h4>Pick an instance</h4>
				<select value={this.props.selected} onChange={this.handleChange.bind(this)}>
		          {this.props.endpoints.map( (b, index) => 
		            <option value={b.url} key={index}>{b.label}</option>
		          )}
				</select>
			</div>
		)
	}
}

export default SwitchAPI