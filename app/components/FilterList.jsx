/*
 * @flow
 */
import React, {Component} from 'react'
import styles from '../styles/filterList.css';
import TimeFilter from '../containers/TimeFilter';
import UpdateFilters from '../containers/FilterOption';
import dimensions from '../../data/dimensions.json'
import {getLocationName} from '../utils/getConfig'
import {
    Button, Icon, Checkbox, FormField, label, RadioGroup, Radio, Elevation, Card, CardHeader, CardTitle, CardSubtitle,
    CardText, CardMedia
} from 'react-mdc-web';
import DatePicker from 'material-ui/DatePicker';
import type {InputEvent} from '../utils/flowtype'
import Select from './material/Select'
class FilterList extends Component {

    constructor(props: Object) {
        super(props);

    }

    selectAll = (event: InputEvent) => {
        let name = event.target.getAttribute("data-name");
        if (name == "data_source") {
            let selectedDataSources;
            if (event.target.checked) {
                selectedDataSources = Object.assign([], this.props.sources.map(s => s.id));
            } else {
                selectedDataSources = Object.assign([]);
            }
            this.props.onSelectAllDataSources(event, selectedDataSources)
        } else if (name == "parameters") {
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

    render() {
        let divContents;
        let showButtons;
        let isAllSelected: boolean = false;
        if (this.props.attribute == "data_source") {
            isAllSelected = this.props.selectedDataSources.length == this.props.sources.length
        } else if (this.props.attribute == "parameters") {
            isAllSelected = this.props.selectedParameters.length == this.props.parameters.length
        }

        let hideShowContents =
            <div className={styles.select_all}>
                <FormField id={this.props.attribute}>
                    <Checkbox data-filterId={this.props.idx} data-name={this.props.attribute}
                              onChange={this.selectAll} checked={isAllSelected}/>
                    <label>Select All</label>
                </FormField>
            </div>;

        let cardsubtitle;
        switch (this.props.attribute) {
            case 'data_source':
                divContents = this.props.sources.map(p =>
                    <UpdateFilters id={p.id} filterId={this.props.idx} name={this.props.attribute} label={p.label}
                                   key={p.id}/>
                );
                cardsubtitle = this.props.sources.filter(x => this.props.selectedDataSources.indexOf(x.id) >= 0).map(x => x.label).join(", ");

                showButtons = hideShowContents;
                break;
            case "parameters":
                divContents = this.props.parameters.map(p =>
                    <UpdateFilters id={p.id} filterId={this.props.idx} name={this.props.attribute} label={p.label}
                                   key={p.id}/>
                );
                //TODO: replace with label
                cardsubtitle = this.props.selectedParameters.join(", ");
                showButtons = hideShowContents;
                break;
            case "time":
                //the UI of date picker
                divContents = <TimeFilter filterId={this.props.idx}/>;
                cardsubtitle = this.props.selectDate;
                break;
            case "locations":
                let locationList;
                if (this.props.locations) {
                    locationList = this.props.locations.map(p =>
                        <Radio className={styles.radio} data-filterId={this.props.idx} value={p.id} key={p.id}> {p.label}</Radio>)

                } else {
                    locationList = <div></div>;
                }
                divContents =
                    (<div>
                            <RadioGroup name="location" onChange={this.selectLocation.bind(this)}
                                        value={this.props.selectedLocation}>
                                {locationList}
                            </RadioGroup>
                        </div>
                    );
                cardsubtitle = getLocationName(this.props.selectedLocation);
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
            cardhead = (
                <CardHeader>
                    <div className={styles.left}>
                        <Select value={this.props.attribute} onChange={this.props.onChangeSelection}
                                dataIdx={idx}>
                            {options}
                        </Select>
                    </div>
                    <div className={styles.right}>
                        <a onClick={this.props.onClickRemove} data-idx={idx}>
                            <Icon className={styles.closeIcon} name='close'/>
                        </a>
                    </div>
                    <br/>
                </CardHeader>
            );
        } else {
            cardsubtitle = cardsubtitle !== null && cardsubtitle !== undefined && cardsubtitle.length > 0 ? cardsubtitle : "No selection";
            cardhead = (
                <CardHeader>
                    <CardTitle
                        className={styles.title_card}>{this.props.attribute.replace("data_source", "data source")}</CardTitle>
                    <CardSubtitle> {cardsubtitle} </CardSubtitle>
                </CardHeader>
            )
        }

        let cardMedia;
        if (this.props.idx === this.props.selectedId) {
            cardMedia = <CardText className={styles.listspacing}>

                {showButtons}
                {divContents}

            </CardText>;
        }
        return (


            <Card className={styles.filter_card} id={this.props.idx} onClick={this.props.onExpand}>
                {cardhead}
                {cardMedia}
            </Card>


        );
    }

}

export default FilterList;