/*
 * @flow
 */

import React, {Component} from 'react'
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {Button, Icon, List, ListHeader, ListGroup} from 'react-mdc-web/lib';
import {
    getMobileSourceNames, getMobileSizeMax, getMobileDetailPath, getRegionToTitleMap,
    getMobileFilterSensors, getSourceInfo, getShowSourceInfoBoxes, getExploreSourcesOpen
} from '../utils/getConfig';
import DialogWrapper from '../components/DialogWrapper';
import ExploreAccordionSections from '../containers/ExploreAccordionSections';
import {sortSitesNumerically} from '../utils/arrayUtils';
import ExploreSourceGroup from '../containers/ExploreSourceGroup';


class ExploreSourcesTab extends Component {
    state: {
        accordion_icon: boolean,
        source_icon: boolean,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            accordion_icon: getExploreSourcesOpen(),
            source_icon: true,
        };
        (this: any).clickSensor = this.clickSensor.bind(this);
        (this: any).clickedSourcesAccordion = this.clickedSourcesAccordion.bind(this);
    }

    clickSensor(id: string, name: string, coordinates: Array<number>) {
        this.props.selectSensor(id, name, coordinates.slice(0, 2));
    };

    clickedSourcesAccordion() {
        this.setState({accordion_icon: !this.state.accordion_icon});
    }

    render() {

        //ref: https://github.com/pka/ol3-react-example/blob/master/index.js
        let source_card = [];
        let source_card_group = [];
        let dialogContents = '';
        let sourcesSection = '';
        let sites_count = 0;

        this.props.sources.map(source => {

            let contents = [];

            // Mobile
            if (screen.width <= getMobileSizeMax()) {

                let mobile_sourcenames = getMobileSourceNames().toUpperCase();
                let mobile_data = this.props.data
                    .filter(data => data.properties.type.id === source.id);
                if (mobile_sourcenames !== 'ALL') {
                    mobile_data = mobile_data
                        .filter(data => mobile_sourcenames
                            .includes((data.properties.type.title).toString().toUpperCase()));
                }
                if (this.props.userStations !== 'all') {
                    mobile_data = mobile_data
                        .filter(data => this.props.userStations.includes(data.properties.type.location));
                }
                if (getMobileFilterSensors() === true) {
                    // Date Today
                    let dateToday = new Date();
                    dateToday.setDate(dateToday.getDate());
                    dateToday = dateToday.toJSON();

                    // Date Two Weeks Ago
                    let twoWeeksAgo = new Date();
                    twoWeeksAgo.setDate((twoWeeksAgo.getDate() - 14));
                    twoWeeksAgo = twoWeeksAgo.toJSON();

                    // Filter the Data
                    mobile_data = mobile_data
                        .filter(data => (data.max_end_time) >= twoWeeksAgo)
                        .filter(data => (data.max_end_time) <= dateToday);
                }

                if (mobile_data.length === 0) {
                    contents.push(
                        <span key="no_data">
                        <Button className={styles.exploreButtonMobile} raised disabled>
                            No Data Available
                        </Button>
                        <br/>
                    </span>)
                } else {
                    mobile_data.map(data => {
                        let location = (getMobileDetailPath() + data.name.toString() + '/separate/');
                        contents.push(
                            <span key={data.id}>
                            <a key={data.id} href={location}>
                                <Button className={styles.exploreButtonMobile} raised key={data.id} id={data.id}>
                                    {data.name}
                                </Button>
                            </a>
                            <br/>
                        </span>
                        )
                    });
                }

            } else {

                sites_count = 0;
                let sourceInfo = getSourceInfo(source.id);
                if (getShowSourceInfoBoxes() && sourceInfo !== undefined) {
                    dialogContents = <DialogWrapper title={source.label} body={sourceInfo}/>;
                } else {
                    dialogContents = '';
                }

                let regionToTitleMap = getRegionToTitleMap();

                this.props.regions.map(region => {

                    let tooltip_val = regionToTitleMap[region];
                    if (tooltip_val === undefined) {
                        tooltip_val = region;
                    }
                    let key_val = region + 'Sources';
                    let section_label = region;

                    let source_data = this.props.data.filter(data =>
                        data.properties.type.id === source.id &&
                        data.properties.region === region);

                    // If the Name is a Number, then sort numerically instead of alphabetically
                    source_data = sortSitesNumerically(source_data);
                    sites_count = sites_count + source_data.length;
                    if (source_data.length > 0) {
                        contents.push(
                            <ExploreAccordionSections
                                sourceData={source_data} tooltipVal={tooltip_val} id={key_val}
                                key={key_val} sectionLabel={section_label} sourceId={source.id}
                            />
                        )
                    }

                });

            }

            if (contents.length > 0) {

                source_card = <ExploreSourceGroup sites_count={sites_count} source={source} contents={contents}
                                                  dialog_contents={dialogContents} key={source.id}/>;
                if (screen.width > getMobileSizeMax()) {
                    source_card_group.push(
                        <List className={this.state.accordion_icon ?
                            exploreStyles.listItemsStyleOpen : exploreStyles.listItemsStyleClosed}
                              key={source.id + 'sources'}
                        >
                            {source_card}
                        </List>
                    );
                } else {
                    source_card_group.push(source_card)
                }

            }

        });

        if (screen.width > getMobileSizeMax()) {
            sourcesSection = (
                <ListGroup className={exploreStyles.listWidthStyle}>
                    <ListHeader className={exploreStyles.listHeaderStyle}
                                onClick={() => {
                                    this.clickedSourcesAccordion()
                                }}
                    >
                        Explore Sources
                        <Icon className={"material-icons " + exploreStyles.accordionIcon}
                              name={this.state.accordion_icon ? 'expand_more' : 'chevron_right'}
                        />
                    </ListHeader>
                    {source_card_group}
                </ListGroup>
            );
        } else {
            sourcesSection = (
                <List className={styles.leftColumn}>
                    {source_card_group}
                </List>
            )
        }

        return (
            <div>{sourcesSection}</div>
        );

    }
}

export default ExploreSourcesTab;
