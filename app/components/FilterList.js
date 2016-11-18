import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import FilterOption from './FilterOption';
import TimeFilter from '../containers/TimeFilter';
import UpdateFilters from '../containers/FilterOption';
import dimensions from '../../data/dimensions.json';
import { connect } from 'react-redux';
import { addSearchParameter, addSearchDataSource } from '../actions';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';



class FilterList extends Component {
	constructor(props) {
		super(props);
	   	this.state = {
	   		selectValue: props.attribute,
	   		divId: props.idx
	    };
	    this.selectAll = this.selectAll.bind(this)
	}

	selectAll(event) {
		var name = event.target.getAttribute("data-name");
		if(name == "data_source") {
			var selectedDataSources;
			if(event.target.checked) {
				selectedDataSources = Object.assign([], this.props.sources.map(s=> s.id));	
			} else {
				selectedDataSources = Object.assign([]);
			}
			this.props.onSelectAllDataSources(event, selectedDataSources)
		} else if(name == "parameters") {
			var selectedParameters;
			if(event.target.checked) {
				selectedParameters = Object.assign([], this.props.parameters.map(s=> s.id));
			} else {
				selectedParameters = Object.assign([]);
			}
			this.props.onSelectAllParameters(event, selectedParameters)
		}
	}

	render() {
		var divContents;
		var showButtons;
		var isAllSelected = false; 
		if(this.state.selectValue == "data_source") {
			isAllSelected = this.props.selectedDataSources.length == this.props.sources.length
		} else if(this.state.selectValue == "parameters") {
			isAllSelected = this.props.selectedParameters.length == this.props.parameters.length
		}
		var hideShowContents = <div><input type="checkbox" data-name={this.state.selectValue} onChange={this.selectAll} checked={isAllSelected}></input> Select All</div>;
		if(this.state.selectValue == "data_source") {
			divContents = this.props.sources.map(p =>
				<UpdateFilters id={p.id} name={this.state.selectValue} label={p.label} key={p.id}/>
			);

			showButtons = hideShowContents;

		} else if(this.state.selectValue == "parameters") {
			divContents = this.props.parameters.map(p =>
				<UpdateFilters id={p.id} name={this.state.selectValue} label={p.label} key={p.id}/>
			);
			showButtons = hideShowContents;
		} else if(this.state.selectValue == "time") {
			//the UI of date picker
			divContents =
				<TimeFilter />

		} else if(this.state.selectValue == "locations") {
			divContents = "Locations"
		}
		const {selectedValues, idx} = this.props;
		const options = dimensions.map(d => {
			if(selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx){
		  		return <option value={d.id} key={d.id}>{d.name}</option>
		  	}
		});
				  	
		return (
			<div className={styles.root} id={this.state.divId}>
				<select value={this.state.selectValue} onChange={this.props.onChangeSelection} data-idx={idx} className={styles.select}>
					{options}
				</select>
				{showButtons}
				<div>
					{divContents}
				</div>
			</div>
		);
	}
}

export default FilterList;