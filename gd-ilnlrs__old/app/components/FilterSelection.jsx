/*
 * @flow
 */

import React, {Component} from 'react'
import FilterList from '../containers/FilterList'
import {Fab, Icon, Button} from 'react-mdc-web/lib';
import styles from '../styles/filterSelection.css'

class FilterSelection extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            selectedValue: 0
        };
    }

    state: {
        selectedValue: number
    };

    handleClickAddFilter() {
        let notUsedFilters = [];
        this.props.filters.map((f, key) => {
            if (!this.props.selectedFilters.includes(f.id)) {
                notUsedFilters.push(f.id)
            }
        });
        if (notUsedFilters.length > 0) {
            this.props.onAddFilter(notUsedFilters[0]);

            this.setState({selectedValue: this.props.selectedFilters.length});
        }

    }

    handleChange(event: Object) {
        const idx = event.target.dataset.idx; //Idx of the selected filter
        const value = event.target.options[event.target.selectedIndex].value;
        console.log(value, " was selected");
        if (value === "parameters" || this.props.selectedFilters[idx] === "parameters") {
            this.props.onClearFilter(true, false);
        }
        if (value === "data_sources" || this.props.selectedFilters[idx] === "data_sources") {
            this.props.onClearFilter(false, true);
        }
        if (value === "time" || this.props.selectedFilters[idx] === "time") {
            this.props.onClearTime();
        }
        if (value === "locations" || this.props.selectedFilters[idx] === "locations") {
            this.props.onClearLocation();
        }
        if (value === "span" || this.props.selectedFilters[idx] === "span") {
            this.props.onClearSpan();
        }
        if (value === "online" || this.props.selectedFilters[idx] === "online") {
            this.props.onClearOnline();
        }
        let newSelected = Object.assign([], this.props.selectedFilters);
        newSelected = newSelected.splice(0, idx);
        newSelected.push(value);
        this.props.onChangeFilter(newSelected, idx);
    }

    handleClickRemoveFilter(event: Object) {
        const idx = event.target.parentElement.dataset.idx;
        const value = this.props.selectedFilters[idx];

        console.log(value, " was removed");
        if (value === "parameters" || this.props.selectedFilters[idx] === "parameters") {
            this.props.onClearFilter(true, false);
        }
        if (value === "data_sources" || this.props.selectedFilters[idx] === "data_sources") {
            this.props.onClearFilter(false, true);
        }
        if (value === "time" || this.props.selectedFilters[idx] === "time") {
            this.props.onClearTime();
        }
        if (value === "locations" || this.props.selectedFilters[idx] === "locations") {
            this.props.onClearLocation();
        }
        if (value === "span" || this.props.selectedFilters[idx] === "span") {
            this.props.onClearSpan();
        }
        if (value === "online" || this.props.selectedFilters[idx] === "online") {
            this.props.onClearOnline();
        }
        let newSelected = Object.assign([], this.props.selectedFilters);
        newSelected.splice(idx, 1);
        this.props.onDeleteFilter(idx);

        this.setState({selectedValue: (idx > 0 ? idx - 1 : 0)});

    }

    componentWillMount() {
        if (this.props.selectedFilters.length < 1) {
            this.props.onAddFilter("locations");
        }
    }

    componentDidUpdate() {
        // when the filter list is changing, the filters after will be removed, then update selectedValue.
        if (this.state.selectedValue >= this.props.selectedFilters.length) {
            this.setState({selectedValue: this.props.selectedFilters.length - 1});
        }
    }

    handleExpand(event: Object) {
        // leave this line for debugging
        //console.log(event.target.parentElement.parentElement);
        if (!isNaN(parseInt(event.target.dataset.filterid))) {
            this.setState({selectedValue: parseInt(event.target.dataset.filterid)});
        } else if (!isNaN(parseInt(event.target.parentElement.parentElement.id))) {
            this.setState({selectedValue: parseInt(event.target.parentElement.parentElement.id)});
        } else if (!isNaN(parseInt(event.target.parentElement.parentElement.parentElement.id))) {
            this.setState({selectedValue: parseInt(event.target.parentElement.parentElement.parentElement.id)});
        } else if (!isNaN(parseInt(event.target.parentElement.parentElement.parentElement.parentElement.id))) {
            this.setState({selectedValue: parseInt(event.target.parentElement.parentElement.parentElement.parentElement.id)});
        } else if (!isNaN(parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id))) {
            this.setState({selectedValue: parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id)});
        } else {
            this.setState({selectedValue: parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id)});
        }
    };

    render() {
        const filterIds = this.props.filters.map(f => f.id);
        const filters = this.props.selectedFilters.map((selected) => {
            let idx = filterIds.indexOf(selected);
            let f = this.props.filters[idx];

            return <FilterList key={idx} selectedId={this.state.selectedValue}
                               onChangeSelection={this.handleChange.bind(this)}
                               selectedValues={this.props.selectedFilters}
                               idx={this.props.selectedFilters.indexOf(f.id)}
                               attribute={f.id} onClickRemove={this.handleClickRemoveFilter.bind(this)}
                               onExpand={this.handleExpand.bind(this)}/>
        });
        let addButton;
        if (this.props.selectedFilters.length < this.props.filters.length) {
            addButton = <Fab id="addButton" className={styles.add} onClick={this.handleClickAddFilter.bind(this)}>
                <Icon name="add"/>
            </Fab>
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

export default FilterSelection;
