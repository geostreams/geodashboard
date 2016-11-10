import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import FilterOption from './FilterOption';
import UpdateFilters from '../containers/UpdateFilters';
import dimensions from '../../data/dimensions.json';
import { connect } from 'react-redux';
import { addSearchParameter, addSearchDataSource } from '../actions';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class FilterList extends Component {
	constructor(props) {
		super(props)
	   	this.state = {
	   		selectValue: props.attribute,
	   		divId: props.idx
	    }
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
			)

			showButtons = hideShowContents;

		} else if(this.state.selectValue == "parameters") {
			divContents = this.props.parameters.map(p =>
				<UpdateFilters id={p.id} name={this.state.selectValue} label={p.label} key={p.id}/>
			)
			showButtons = hideShowContents;
		} else if(this.state.selectValue == "time") {
			divContents =
				<div><h5> Start Date</h5>

				<DatePicker hintText="Start Date" container="inline" />

				<h5> End Date</h5>
			    <DatePicker hintText="End Date" container="inline" /></div>

		} else if(this.state.selectValue == "locations") {
			divContents = "Locations"
		}
		const {selectedValues, idx} = this.props;
		const options = dimensions.map(d => {
			if(selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx){
		  		return <option value={d.id} key={d.id}>{d.name}</option>
		  	}
		})
				  	
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

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.sensors.locations,
    sources: state.sensors.sources,
    parameters: state.sensors.parameters,
    time: state.sensors.time,
	selectedParameters: state.selectedParameters.parameters,
	selectedDataSources: state.selectedDataSources.data_sources,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSelectAllParameters: (event, selectedParameters) => {
			dispatch(addSearchParameter(selectedParameters));
		},
		onSelectAllDataSources: (event, selectedDataSources) => {
			dispatch(addSearchDataSource(selectedDataSources));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)