/*
 * @flow
 */
import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import TimeFilter from '../containers/TimeFilter';
import UpdateFilters from '../containers/FilterOption';
import dimensions from '../../data/dimensions.json'
import injectTapEventPlugin from 'react-tap-event-plugin'
import IconButton from 'material-ui/IconButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {red500} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import type { InputEvent } from '../utils/flowtype'

injectTapEventPlugin();

class FilterList extends Component {

    constructor(props:Object) {
        super(props);
    }

    selectAll = (event:InputEvent) => {
        var name = event.target.getAttribute("data-name");
        if (name == "data_source") {
            let selectedDataSources;
            if (event.target.checked) {
                selectedDataSources = Object.assign([], this.props.sources.map(s=> s.id));
            } else {
                selectedDataSources = Object.assign([]);
            }
            this.props.onSelectAllDataSources(event, selectedDataSources)
        } else if (name == "parameters") {
            let selectedParameters;
            if (event.target.checked) {
                selectedParameters = Object.assign([], this.props.parameters.map(s=> s.id));
            } else {
                selectedParameters = Object.assign([]);
            }
            this.props.onSelectAllParameters(event, selectedParameters)
        }
    }

    selectLocation(event:InputEvent) {
        this.props.onSelectLocation(event);
    }


    render() {
        let divContents;
        let showButtons;
        let isAllSelected:boolean = false;
        if (this.props.attribute == "data_source") {
            isAllSelected = this.props.selectedDataSources.length == this.props.sources.length
        } else if (this.props.attribute == "parameters") {
            isAllSelected = this.props.selectedParameters.length == this.props.parameters.length
        }
        let hideShowContents =
            <div className={styles.select_all_style}>
                <Checkbox label="Select All" data-name={this.props.attribute}
                          onCheck={this.selectAll} checked={isAllSelected}/>
            </div>;

        switch (this.props.attribute) {
            case 'data_source':
                divContents = this.props.sources.map(p =>
                    <UpdateFilters id={p.id} name={this.props.attribute} label={p.label} key={p.id}/>
                );

                showButtons = hideShowContents;
                break;
            case "parameters":
                divContents = this.props.parameters.map(p =>
                    <UpdateFilters id={p.id} name={this.props.attribute} label={p.label} key={p.id}/>
                );
                showButtons = hideShowContents;
                break;
            case "time":
                //the UI of date picker
                divContents =
                    <TimeFilter />
                break;
            case "locations":
                let locationList
                if (this.props.locations) {
                    locationList = this.props.locations.map(p => <RadioButton id={p.id} value={p.id} label={p.label}
                                                                              key={p.id}/>);
                } else {
                    locationList = <div></div>
                }
                divContents =
                    (<div>
                            <RadioButtonGroup name="location" onChange={this.selectLocation.bind(this)}>
                                {locationList}
                            </RadioButtonGroup>
                        </div>
                    );
                break;
            default:

        }

        const {selectedValues, idx} = this.props;
        const options = dimensions.map(d => {
            if (selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx) {
                return <MenuItem value={d.id} key={d.id} primaryText={d.name} data-idx={idx}/>
            }
        });

        return (
            <Paper className={styles.paperstyle} zDepth={2} id={this.props.idx}>
                <div className={styles.left}>
                    <SelectField fullWidth={true} value={this.props.attribute} onChange={this.props.onChangeSelection}
                                 data-idx={idx}>
                        {options}
                    </SelectField>
                </div>
                <div className={styles.right}>
                    <IconButton className={styles.right} onClick={this.props.onClickRemove} data-idx={idx}>
                        <ContentClear color={red500}/>
                    </IconButton>
                </div>
                <br/>
                <div className={styles.listspacing}>
                    {showButtons}
                    {divContents}
                </div>
            </Paper>
        );
    }

}

export default FilterList;