import React, {Component} from 'react'
import styles from './filterOption.css';

class FilterOption extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      dimension: ""
	    };
	  }

	render() {
		return (
			<div className={styles.row}>
				<div className={styles.col}>
					<input type="checkbox" name="{this.props.id}" value="{this.props.id}"></input>
				</div>
				<div className={styles.col}>{this.props.label}</div>
			</div>
		);
	}
}

export default FilterOption