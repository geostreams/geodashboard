import React, {Component} from 'react'
import FilterList from '../containers/FilterList'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from '../styles/filterSelection.css'

class FilterSelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValues: ['locations'],
			showAddButton: true
		};
	    this.handleClickAddFilter = this.handleClickAddFilter.bind(this);
	    this.handleChange = this.handleChange.bind(this)
		this.handleClickRemoveFilter = this.handleClickRemoveFilter.bind(this);
	}

    handleClickAddFilter(event) {
        let notUsedFilters = [];
        this.props.filters.map((f, key) => {
            if(!this.state.selectedValues.includes(f.id)) {
                notUsedFilters.push(f.id)
            }
        });
        if(notUsedFilters.length > 0) {
            let selectedVal = this.state.selectedValues.slice();
            selectedVal.push(notUsedFilters[0]);
            this.setState({selectedValues: selectedVal, showAddButton: true});
        }
        if(notUsedFilters.length <=1) {
            this.setState({showAddButton: false});
        }
    }

	handleChange(event, valueIdx, value) {
		var idx = event.target.parentElement.parentElement.parentElement.dataset.idx; //Idx of the selected filter
	    console.log(value, " was selected");
	    if(value=="parameters" || this.state.selectedValues[idx] == "parameters"){
	    	this.props.onClearFilter(true, false);
	    }
	    if(value == "data_source" || this.state.selectedValues[idx] == "data_source") {
			this.props.onClearFilter(false, true);
	    }
	    var newSelected = Object.assign([], this.state.selectedValues);
	    newSelected = newSelected.splice(0, idx);
	    newSelected.push(value);
	    var showAdd = newSelected.length < this.props.filters.length;

	    this.setState({selectedValues: newSelected, showAddButton: showAdd });

  	}

  	handleClickRemoveFilter(event) {
		var idx = event.target.parentElement.dataset.idx;
		var value = this.state.selectedValues[idx];

		console.log(value, " was removed");
		if(value=="parameters" || this.state.selectedValues[idx] == "parameters"){
			this.props.onClearFilter(true, false);
		}
		if(value == "data_source" || this.state.selectedValues[idx] == "data_source") {
			this.props.onClearFilter(false, true);
		}
		var newSelected = Object.assign([], this.state.selectedValues);
		newSelected.splice(idx, 1);
		var showAdd = newSelected.length < this.props.filters.length;

		this.setState({selectedValues: newSelected, showAddButton: showAdd});

	}



    render() {
        const filterIds = this.props.filters.map(f => f.id);
        const filters = this.state.selectedValues.map((selected) => {
            let idx = filterIds.indexOf(selected);
            let f = this.props.filters[idx];
            return <FilterList key={idx} onChangeSelection={this.handleChange} selectedValues={this.state.selectedValues} idx={this.state.selectedValues.indexOf(f.id)} attribute={f.id}/>
        });
        let addButton;
        if(this.state.showAddButton) {
            addButton = <FloatingActionButton id="addButton" onClick={this.handleClickAddFilter} className={styles.add}><ContentAdd/></FloatingActionButton>
        }
        return (
            <div>
                <div id="filters-div">
                    {filters}
                    {addButton}
                </div>
            </div>
        );
    }
}

export default FilterSelection