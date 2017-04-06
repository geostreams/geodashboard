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
import Checkbox from 'material-ui/Checkbox';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import {getLocationName} from '../utils/getConfig'
import type { InputEvent } from '../utils/flowtype'

injectTapEventPlugin();

class FilterList extends Component {

    constructor(props:Object) {
        super(props);
    }

    selectAll = (event:InputEvent) => {
        let name = event.target.getAttribute("data-name");
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
    };

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
                <Checkbox iconStyle = {{height: '1.5em', marginRight: '0.5em'}} label="Select All"
                          data-name={this.props.attribute} onCheck={this.selectAll} checked={isAllSelected}/>
            </div>;
        let cardsubtitle;
        switch (this.props.attribute) {
            case 'data_source':
                divContents = this.props.sources.map(p =>
                    <UpdateFilters id={p.id} name={this.props.attribute} label={p.label} key={p.id}/>
                );
                cardsubtitle = this.props.sources.filter(x => this.props.selectedDataSources.indexOf(x.id) >=0 ).map(x => x.label).join(", ");

                showButtons = hideShowContents;
                break;
            case "parameters":
                divContents = this.props.parameters.map(p =>
                    <UpdateFilters id={p.id} name={this.props.attribute} label={p.label} key={p.id}/>
                );
                //TODO: replace with label
                cardsubtitle = this.props.selectedParameters.join(", ");
                showButtons = hideShowContents;
                break;
            case "time":
                //the UI of date picker
                divContents = <TimeFilter />;
                cardsubtitle = this.props.selectDate;
                break;
            case "locations":
                let locationList;
                if (this.props.locations) {
                    locationList = this.props.locations.map(
                        p => <RadioButton iconStyle = {{height: '1.5em', marginRight: '0.5em'}}
                                          id={p.id} value={p.id} label={p.label} key={p.id}/>);
                } else {
                    locationList = <div></div>;
                }
                divContents =
                    (<div>
                        <RadioButtonGroup name="location" onChange={this.selectLocation.bind(this)} defaultSelected={this.props.selectedLocation} >
                            {locationList}
                        </RadioButtonGroup>
                    </div>
                    );
                cardsubtitle = getLocationName(this.props.selectedLocation);
                break;
            default:
        }

        const {selectedValues, idx} = this.props;
        const options = dimensions.map(d => {
            if (selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx) {
                return <MenuItem value={d.id} key={d.id} primaryText={d.name} data-idx={idx}/>
            }
        });
        let cardhead;
        // if this filter is open
        if(this.props.idx === this.props.selectedId) {
            cardhead =  (
                <div>
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
                </div>
            );
        } else {
            cardsubtitle = cardsubtitle !== null && (Array.isArray(cardsubtitle) && cardsubtitle.length > 0) ? cardsubtitle : "No selection";
            cardhead = (
                <div>
                <CardTitle title={this.props.attribute.replace("data_source", "data source")}
                            subtitle={cardsubtitle}
                            onClick={this.props.onExpand}
                            titleStyle={{'fontSize':'15px', 'fontWeight':'bold', 'text-transform':'capitalize'}}
                    //TODO: this is not working, need to fix or remove
                    //iconRightElement={<HardwareVideogameAsset />}
                />

                    </div>
            )
        }
        return (
            <Card expanded={this.props.idx === this.props.selectedId} className={styles.paperstyle} zDepth={2} id={this.props.idx} >
                {cardhead}
                <CardMedia expandable={true}>
                    <div className={styles.listspacing}>
                        {showButtons}
                        {divContents}
                    </div>
                </CardMedia>
            </Card>
        );
    }

}

export default FilterList;