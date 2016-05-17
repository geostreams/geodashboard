import React, {Component} from 'react'
import styles from './filterList.css';
import FilterOption from './FilterOption';
import dimensions from '../data/dimensions.json'

class FilterList extends Component {
	constructor(props) {
		super(props);
		console.log(props.attribute);
	   	this.state = {
	   		selectValue: props.attribute
	    };
	}

	handleChange(event) {
	    var value = event.target.value;
	    console.log(value, " was selected");
	    this.setState({selectValue: event.target.value});
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
					{this.props.values.map(p =>
						<FilterOption id={p} key={p}/>
					)}
				</div>
			</div>
		);
	}
}

export default FilterList