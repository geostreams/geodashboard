import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import UpdateFilters from '../containers/FilterOption';
import dimensions from '../../data/dimensions.json'
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';

injectTapEventPlugin();

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
        let name = event.target.getAttribute("data-name");
        if(name == "data_source") {
            let selectedDataSources;
            if(event.target.checked) {
                selectedDataSources = Object.assign([], this.props.sources.map(s=> s.id));
            } else {
                selectedDataSources = Object.assign([]);
            }
            this.props.onSelectAllDataSources(event, selectedDataSources)
        } else if(name == "parameters") {
            let selectedParameters;
            if(event.target.checked) {
                selectedParameters = Object.assign([], this.props.parameters.map(s=> s.id));
            } else {
                selectedParameters = Object.assign([]);
            }
            this.props.onSelectAllParameters(event, selectedParameters)
        }

    }

    render() {
        let divContents;
        let showButtons;
        let isAllSelected = false;
        if(this.state.selectValue == "data_source") {
            isAllSelected = this.props.selectedDataSources.length == this.props.sources.length
        } else if(this.state.selectValue == "parameters") {
            isAllSelected = this.props.selectedParameters.length == this.props.parameters.length
        }
        let hideShowContents = <div><input type="checkbox" data-name={this.state.selectValue} onChange={this.selectAll} checked={isAllSelected}></input>Select All</div>;
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
            divContents = "Start time / End time"
        } else if(this.state.selectValue == "locations") {
            divContents = "Locations"
        }
        const {selectedValues, idx} = this.props;
        const options = dimensions.map(d => {
            if(selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx){
                return <MenuItem value={d.id} key={d.id} primaryText={d.name} data-idx={idx}/>
            }
        });

        return (
            <div className={styles.root} id={this.state.divId}>
                <div className={styles.right}>
                    <IconButton onClick={this.props.onClickRemove} data-idx={idx}>
                        <ContentClear color={red500}/>
                    </IconButton>
                </div>
                <SelectField value={this.state.selectValue} onChange={this.props.onChangeSelection} data-idx={idx}>
                    {options}
                </SelectField>

                {showButtons}
                <div>
                    {divContents}
                </div>
            </div>
        );
    }

}

export default FilterList;