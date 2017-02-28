import React, {Component} from 'react'
import FilterList from '../containers/FilterList'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import styles from '../styles/filterSelection.css'

class FilterSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddButton: true
        };
    }

    handleClickAddFilter(event) {
        let notUsedFilters = [];
        this.props.filters.map((f, key) => {
            if (!this.props.selectedFilters.includes(f.id)) {
                notUsedFilters.push(f.id)
            }
        });
        if (notUsedFilters.length > 0) {
            this.setState({showAddButton: true});
            this.props.onAddFilter(notUsedFilters[0]);
        }
        if (notUsedFilters.length <= 1) {
            this.setState({showAddButton: false});
        }

    }

    handleChange(event, valueIdx, value) {
        var idx = event.target.parentElement.parentElement.parentElement.dataset.idx; //Idx of the selected filter
        console.log(value, " was selected");
        if (value == "parameters" || this.props.selectedFilters[idx] == "parameters") {
            this.props.onClearFilter(true, false);
        }
        if (value == "data_source" || this.props.selectedFilters[idx] == "data_source") {
            this.props.onClearFilter(false, true);
        }
        if (value == "time" || this.props.selectedFilters[idx] == "time") {
            this.props.onClearTime();
        }
        if (value == "locations" || this.props.selectedFilters[idx] == "locations") {
            this.props.onClearLocation();
        }
        var newSelected = Object.assign([], this.props.selectedFilters);
        newSelected = newSelected.splice(0, idx);
        newSelected.push(value);
        var showAdd = newSelected.length < this.props.filters.length;

        this.setState({showAddButton: showAdd});
        this.props.onChangeFilter(newSelected, idx);

    }

    handleClickRemoveFilter(event) {
        var idx = event.target.parentElement.dataset.idx;
        var value = this.props.selectedFilters[idx];

        console.log(value, " was removed");
        if (value == "parameters" || this.props.selectedFilters[idx] == "parameters") {
            this.props.onClearFilter(true, false);
        }
        if (value == "data_source" || this.props.selectedFilters[idx] == "data_source") {
            this.props.onClearFilter(false, true);
        }
        if (value == "time" || this.props.selectedFilters[idx] == "time") {
            this.props.onClearTime();
        }
        if (value == "locations" || this.props.selectedFilters[idx] == "locations") {
            this.props.onClearLocation();
        }
        var newSelected = Object.assign([], this.props.selectedFilters);
        newSelected.splice(idx, 1);
        var showAdd = newSelected.length < this.props.filters.length;

        this.setState({showAddButton: showAdd});
        this.props.onDeleteFilter(idx);

    }


    componentWillMount() {
        this.props.onAddFilter("locations");
        if(this.props.selectedFilters.length < this.props.filters.length) {
            this.setState({showAddButton: true});
        }
    }

    render() {
        const filterIds = this.props.filters.map(f => f.id);
        const filters = this.props.selectedFilters.map((selected) => {
            let idx = filterIds.indexOf(selected);
            let f = this.props.filters[idx];
            return <FilterList key={idx} onChangeSelection={this.handleChange.bind(this)}
                               selectedValues={this.props.selectedFilters} idx={this.props.selectedFilters.indexOf(f.id)}
                               attribute={f.id} onClickRemove={this.handleClickRemoveFilter.bind(this)}/>
        });
        let addButton;
        if (this.state.showAddButton) {
            addButton = <FloatingActionButton id="addButton" onClick={this.handleClickAddFilter.bind(this)} className={styles.add}><ContentAdd/></FloatingActionButton>
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