/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/filterList.css';
import mainStyles from '../styles/main.css';
import TimeFilter from '../containers/TimeFilter';
import UpdateFilters from '../containers/FilterOption';
import dimensions from '../../data/dimensions.json';
import {getLocationName, getMobileSizeMax} from '../utils/getConfig';
import {
    Body2, Card, CardHeader, CardTitle, CardSubtitle, CardText,
    Checkbox, FormField, Icon, label, RadioGroup, Radio
} from 'react-mdc-web/lib';
import type {InputEvent} from '../utils/flowtype';
import Select from './material/Select';
import {handleParamsWithItalics} from '../utils/configUtils';


class FilterList extends Component {

    constructor(props: Object) {
        super(props);
    }

    selectAll = (event: InputEvent) => {
        let name = event.target.getAttribute("data-name");
        if (name === "data_sources") {
            let selectedDataSources;
            if (event.target.checked) {
                selectedDataSources = Object.assign([], this.props.sources.map(s => s.id));
            } else {
                selectedDataSources = Object.assign([]);
            }
            this.props.onSelectAllDataSources(event, selectedDataSources)
        } else if (name === "parameters") {
            let selectedParameters;
            if (event.target.checked) {
                selectedParameters = Object.assign([], this.props.parameters.map(s => s.id));
            } else {
                selectedParameters = Object.assign([]);
            }
            this.props.onSelectAllParameters(event, selectedParameters)
        }
    };

    selectLocation(event: InputEvent) {
        this.props.onSelectLocation(event);
    }

    selectOnline(event: InputEvent) {
        this.props.onSelectOnline(event);
    }

    render() {
        let divContents;
        let showButtons;
        // Default Icon
        let descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="bookmark"/>;
        let isAllSelected: boolean = false;
        if (this.props.attribute === "data_sources") {
            isAllSelected = this.props.selectedDataSources.length === this.props.sources.length
        } else if (this.props.attribute === "parameters") {
            isAllSelected = this.props.selectedParameters.length === this.props.parameters.length
        }

        let hideShowContents =
            <div className={styles.select_all}>
                <FormField id={this.props.attribute}>
                    <Checkbox data-filterId={this.props.idx} data-name={this.props.attribute}
                              onChange={this.selectAll} checked={isAllSelected}/>
                    <label>Select All</label>
                </FormField>
            </div>;

        let subtitleMessage;
        let cardsubtitle: Array<any> = [];
        let value = '';
        let trim_length = 15;
        let longer_name = '';
        let label = '';

        switch (this.props.attribute) {
            case 'data_sources':
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="group_work"/>;
                divContents = this.props.sources.map(p =>
                    <UpdateFilters id={p.id} filterId={this.props.idx} name={this.props.attribute} label={p.label}
                                   key={p.id}/>
                );

                this.props.sources.filter(x => this.props.selectedDataSources.indexOf(x.id) >= 0).map(x => {
                    label = x.label;
                    if (label.length >= trim_length) {
                        longer_name = '...';
                        label = x.label.substring(0, trim_length).trim();
                    }
                    value =
                        <Body2 key={label} component="button" className={styles.filterPills}>
                            {label}{longer_name}
                        </Body2>;
                    cardsubtitle.push(value);
                });

                showButtons = hideShowContents;
                break;
            case "parameters":
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="description"/>;
                divContents = this.props.parameters.map(p => {
                    let parameter_label_array = handleParamsWithItalics(p.label);
                    return (<UpdateFilters id={p.id} filterId={this.props.idx} name={this.props.attribute}
                                           label={parameter_label_array}
                                           key={p.id}/>);
                });
                this.props.selectedParameters.map(p => {
                    let label =
                        this.props.parameters.find(item => item.id === p).label.replace('<i>', '').replace('</i>', '');
                    let hover_label = label;
                    if (label.length >= trim_length) {
                        longer_name = '...';
                        label = label.substring(0, trim_length).trim();
                    }
                    value =
                        <Body2 key={label} component="button" className={styles.filterPills} title={hover_label}>
                            {label}{longer_name}
                        </Body2>;
                    cardsubtitle.push(value);

                });
                showButtons = hideShowContents;
                break;
            case "time":
                // To match the style of the other three Icons, this Icon needs to be displayed inverted
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoiceInvert} name="access_time"/>;
                //the UI of date picker
                divContents =
                    <TimeFilter
                        filterId={this.props.idx}
                        filterType={"time"}
                    />;
                cardsubtitle = this.props.selectDate;
                break;
            case "locations":
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="location_on"/>;
                let locationList;
                let drawRadio;
                let drawRadioGroup;
                let allLocations;
                let dividerLine;

                if (this.props.locations) {

                    // Add Divider Line to separate sections
                    dividerLine = <hr className={styles.divider_style}/>;

                    // Add All Locations option
                    // Setting the radio button's value alters the selected value in the list
                    allLocations = [
                        <Radio className={styles.radio} id="allLocations" data-filterId={this.props.idx}
                               value="All Locations" key="allLocations">Select All Available Locations</Radio>
                    ];

                    if (screen.width > getMobileSizeMax()) {
                        // Add Draw Radio option not on mobile
                        // Setting the radio button's value alters the selected value in the list
                        drawRadio = [
                            <Radio className={styles.radio} id="draw" data-filterId={this.props.idx}
                                   value="Custom Location" key="draw">Click to Draw Custom Location</Radio>
                        ];
                        drawRadioGroup = (
                            <span key="draw">
                                <RadioGroup name="draw_location" onChange={this.selectLocation.bind(this)}
                                            value={this.props.selectedLocation}>
                                    {drawRadio}
                                </RadioGroup>
                                {dividerLine}
                            </span>
                        );
                    }
                    // Add Locations Radio options
                    locationList = this.props.locations.map(p =>
                        <Radio className={styles.radio} data-filterId={this.props.idx}
                               value={p.id} key={p.id}> {p.label}</Radio>);

                } else {
                    dividerLine = <div> </div>;
                    allLocations = <div> </div>;
                    drawRadioGroup = <div> </div>;
                    locationList = <div> </div>;
                }

                divContents =
                    (
                        <div>
                            <RadioGroup name="all_locations" onChange={this.selectLocation.bind(this)}
                                        value={this.props.selectedLocation}>
                                {allLocations}
                            </RadioGroup>
                            {dividerLine}

                            {drawRadioGroup}

                            <RadioGroup name="location" onChange={this.selectLocation.bind(this)}
                                        value={this.props.selectedLocation}>
                                {locationList}
                            </RadioGroup>
                        </div>
                    );
                cardsubtitle.push(getLocationName(this.props.selectedLocation));
                break;

            case "span":
                // To match the style of the other three Icons, this Icon needs to be displayed inverted
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="timelapse"/>;
                //the UI of date picker
                divContents =
                    <TimeFilter
                        filterId={this.props.idx}
                        filterType={"span"}
                    />;
                cardsubtitle = this.props.selectSpan;
                subtitleMessage = <span><br/>(NOT reflected in Downloads)</span>;
                break;

            case "online":
                descriptiveIconComponent = <Icon className={styles.descriptiveIconChoice} name="offline_bolt"/>;
                let onlineList;

                if (this.props.online) {
                    // Add Online/Offline to the Radio Options
                    onlineList = this.props.online.map(p =>
                        [<Radio className={styles.radio} data-filterId={this.props.idx}
                                value={p.id} key={p.id}> {p.label}</Radio>]);

                } else {
                    onlineList = <div> </div>;
                }

                divContents =
                    (<div>
                        <RadioGroup name="online" onChange={this.selectOnline.bind(this)}
                                    value={this.props.selectedOnline}>
                            {onlineList}
                        </RadioGroup>
                    </div>);
                cardsubtitle = this.props.selectedOnline;
                subtitleMessage = <span><br/>(NOT reflected in Downloads)</span>;
                break;

            default:
        }

        const {selectedValues, idx} = this.props;
        const options = dimensions.map(d => {
            if (selectedValues.indexOf(d.id) < 0 || selectedValues.indexOf(d.id) >= idx) {
                return <option data-filterId={this.props.idx} value={d.id} key={d.id} data-idx={idx}> {d.name} </option>
            }
        });
        let cardhead;
        // if this filter is open
        if (this.props.idx === this.props.selectedId) {
            // Default Icon
            let icon_value = <Icon className={styles.descriptiveIconBefore} name='label'/>;
            // Case Icons
            if (this.props.attribute === "data_sources") {
                icon_value = <Icon className={styles.descriptiveIconChoice} name="group_work"/>;
            }
            if (this.props.attribute === "parameters") {
                icon_value = <Icon className={styles.descriptiveIconChoice} name="description"/>;
            }
            if (this.props.attribute === "time") {
                icon_value = <Icon className={styles.descriptiveIconChoiceInvert} name="access_time"/>;
            }
            if (this.props.attribute === "locations") {
                icon_value = <Icon className={styles.descriptiveIconChoice} name="location_on"/>;
            }
            if (this.props.attribute === "online") {
                icon_value = <Icon className={styles.descriptiveIconChoice} name="offline_bolt"/>;
            }
            if (this.props.attribute === "span") {
                icon_value = <Icon className={styles.descriptiveIconChoice} name="timelapse"/>;
            }

            cardhead = (
                <CardHeader>
                    <div className={styles.left}>
                        {icon_value}
                        <Select value={this.props.attribute} onChange={this.props.onChangeSelection}
                                dataIdx={idx}>
                            {options}
                        </Select>
                    </div>
                    <a className={styles.close_button_open_card} onClick={this.props.onClickRemove} data-idx={idx}>
                        <Icon className={styles.closeIcon} name='close'/>
                    </a>
                    <br/>
                </CardHeader>
            );
            // if this filter is closed
        } else {
            // Display selected values if they exist, or "No Selection" otherwise
            cardsubtitle =
                cardsubtitle !== null && cardsubtitle !== undefined && cardsubtitle.length > 1 ?
                    cardsubtitle : "No selection";
            cardsubtitle = handleParamsWithItalics(cardsubtitle);

            // Display a message if necessary
            subtitleMessage =
                subtitleMessage !== null && subtitleMessage !== undefined && subtitleMessage.toString().length > 1 ?
                    subtitleMessage : "";

            cardhead = (
                <CardHeader>
                    <CardTitle className={mainStyles.title_card}>
                        {this.props.attribute.replace("data_sources", "data source")}
                        {descriptiveIconComponent}
                        <a className={styles.close_button_collapsed_card} onClick={this.props.onClickRemove}
                           data-idx={idx}>
                            <Icon className={styles.closeIcon} name='close'/>
                        </a>
                    </CardTitle>
                    <CardSubtitle className={styles.subtitleSpacing}> {cardsubtitle} {subtitleMessage} </CardSubtitle>
                </CardHeader>
            )
        }

        let cardMedia;
        if (this.props.idx === this.props.selectedId) {
            cardMedia = <CardText className={styles.listspacing}>

                {showButtons}
                {divContents}

            </CardText>;
        } else {
            // if the filter is closed, display an open icon
            cardMedia =
                <a id={this.props.attribute} className={styles.edit_filter_button} onClick={this.props.onExpand}>
                    <Icon name='keyboard_arrow_down'/>
                </a>
        }

        return (

            <Card className={styles.filter_card} id={this.props.idx}>
                {cardhead}
                {cardMedia}
            </Card>

        );
    }

}

export default FilterList;
