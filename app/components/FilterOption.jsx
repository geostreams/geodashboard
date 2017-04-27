import React, {Component} from 'react'
import styles from '../styles/filterOption.css'
import Checkbox from 'material-ui/Checkbox';

class FilterOption extends Component {
	constructor(props) {
	    super(props);
	}

	handleChange(event) {
		const selectedParameters = Object.assign([], this.props.selectedParameters);
		const selectedDataSources = Object.assign([], this.props.selectedDataSources);
	    this.props.onOptionChange(event, selectedParameters, selectedDataSources);
  	}

	render() {
		let checkedVar = (this.props.name == "data_source" &&
							this.props.selectedDataSources.indexOf(this.props.id) > -1) ||
						(this.props.name == "parameters" &&
							this.props.selectedParameters.indexOf(this.props.id) > -1);

		return (
			<div className={styles.col}>
				<Checkbox iconStyle = {{height: '1.5em', marginRight: '0.5em'}}
						  label={this.props.label} name={this.props.name} value={this.props.id}
						  onCheck={this.handleChange.bind(this)} checked={checkedVar} />
			</div>
		);
	}
}

export default FilterOption