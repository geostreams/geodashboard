import React, { Component } from 'react';
import styles from './switchAPI.css'

class SwitchAPI extends Component {

	constructor(props) {
		super(props);

   	this.state = {
      selected:  "http://gltg.ncsa.illinois.edu/clowder"
    };
	}

	render() {
		return (
			<div className={styles.root}>
				<h4>Pick an instance</h4>
				<select value={this.state.selected} onChange={this.handleChange}>
					<option value="https://greatlakesmonitoring.org/clowder">GLM</option>
					<option value="http://gltg.ncsa.illinois.edu/clowder">GLTG</option>
					<option value="http://data.imlczo.org/clowder">IMLCZO</option>
				</select>
				<button onClick={this.handleClick}>Submit</button>
			</div>
		);
	}

	handleChange = (e) => {
		this.setState({'selected': e.target.value});
	};

	handleClick = (e) => {
		console.log('switch api and update local store');
	};

}

export default SwitchAPI;