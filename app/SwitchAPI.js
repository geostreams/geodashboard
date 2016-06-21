import React, { Component } from 'react'
import styles from './styles/switchAPI.css'

class SwitchAPI extends Component {

	render() {
		return (
			<div className={styles.root}>
				<h4>Pick an instance</h4>
				<select value={this.props.selected} onChange={this.handleChange}>
		          {this.props.endpoints.map( (b, index) => 
		            <option value={b.url} key={index}>{b.label}</option>
		          )}
				</select>
			</div>
		)
	}

  handleChange = (e) => {
    this.props.onBackendChange(e.target.value)
  }
}

export default SwitchAPI