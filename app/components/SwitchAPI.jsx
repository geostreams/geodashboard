import React, { Component } from 'react'
import styles from '../styles/main.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SwitchAPI extends Component {

	handleChange = (e, index, value) => {

		this.props.onBackendChange(this.props.endpoints[index].url, this.props.endpoints[index].title,
			this.props.endpoints[index].subtitle);
	}

	render() {
		return (
			<div className={styles.contentcenter}>
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