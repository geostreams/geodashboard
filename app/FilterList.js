import React, {Component} from 'react'
import styles from './filterList.css';
import FilterOption from './FilterOption';
import dimensions from '../data/dimensions.json'

class FilterList extends Component {
	render() {
		return (
			<div className={styles.root}>
				<select name="select">
				  {dimensions.map(d =>
				  	<option value="{d.id}">{d.name}</option>
				  )}
				</select>
				<div>
					<FilterOption id="Entry 1"/>
					<FilterOption id="Entry 2"/>
					<FilterOption id="Entry 3"/>
					<FilterOption id="Entry 4"/>
				</div>
			</div>
		);
	}
}

export default FilterList