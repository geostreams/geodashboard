import React, {Component} from 'react'
import FilterList from './FilterList'
import { connect } from 'react-redux'
import styles from '../styles/filterSelection.css'
import { addSearchParameter, addSearchDataSource } from '../actions'
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class FilterSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValues: ['locations'],
            showAddButton: true
        };
        this.handleClickAddFilter = this.handleClickAddFilter.bind(this);
        this.handleChange = this.handleChange.bind(this)
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

    handleChange(event) {
        let value = event.target.value;
        let idx = event.target.dataset.idx;
        console.log(value, " was selected");
        if(value=="parameters" || this.state.selectedValues[idx] == "parameters"){
            this.props.onClearFilter(true, false);
        }
        if(value == "data_source" || this.state.selectedValues[idx] == "data_source") {
            this.props.onClearFilter(false, true);
        }
        let newSelected = Object.assign([], this.state.selectedValues);
        newSelected = newSelected.splice(0, idx);
        newSelected.push(value);
        let showAdd = newSelected.length < this.props.filters.length;

        this.setState({selectedValues: newSelected, showAddButton: showAdd });
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

const mapStateToProps = (state, ownProps) => {
    return {
  	    filters: state.searchFilters.filters,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClearFilter: (clearSelectedParameters, clearSelectedDataSources) => {
            if(clearSelectedParameters) {
                const selectedParameters = [];
                dispatch(addSearchParameter(selectedParameters));
            }
            if(clearSelectedDataSources) {
                const selectedDataSources = [];
                dispatch(addSearchDataSource(selectedDataSources));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelection);