import React, {Component} from 'react'
import styles from '../styles/filterOption.css'

class FilterOption extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      dimension: ""
	    };
	}

	handleChange(event) {
	    var value = event.target.value
	    console.log(value, " option was selected")
	    this.setState({selectValue: event.target.value})
  	}

	render() {
		return (
			<div className={styles.row}>
				<div className={styles.col1}>
					<input type="checkbox" name={this.props.id} value={this.props.id} onChange={this.handleChange}></input>
				</div>
				<div className={styles.col2}>{this.props.label}</div>
			</div>
		);
	}
}

export default FilterOption