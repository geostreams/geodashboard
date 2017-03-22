import React, { Component } from 'react'
import styles from '../styles/switchAPI.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SwitchAPI extends Component {

	handleChange = (e, index, value) => {
		this.props.onBackendChange(value);
	}

	render() {
		return (
			<div className={styles.root}>
				<h4>Pick an instance</h4>
				<SelectField  value={this.props.selected} onChange={this.handleChange}>
					{this.props.endpoints.map( (b, index) =>
						<MenuItem value={b.url} key={index} primaryText={b.label} />
					)}
				</SelectField>
			</div>
		)
	}
}

export default SwitchAPI