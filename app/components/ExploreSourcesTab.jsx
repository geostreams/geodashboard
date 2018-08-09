import React, {Component} from 'react'
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {
    Button, Card, CardTitle, CardHeader, CardText, Fab, Icon, List, ListHeader, ListGroup
} from 'react-mdc-web';
import {
    getMobileSourceNames, getMobileSizeMax, getMobileDetailPath, getRegionToTitleMap,
    getMobileFilterSensors, getSourceInfo, getShowSourceInfoBoxes, getExploreSourcesOpen
} from '../utils/getConfig';
import DialogWrapper from '../components/DialogWrapper';
import ExploreAccordionSections from '../containers/ExploreAccordionSections';
import {sortSitesNumerically} from '../utils/arrayUtils';


class ExploreSourcesTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion_icon: getExploreSourcesOpen(),
        };
        (this:any).clickSensor = this.clickSensor.bind(this);
        (this:any).clickedSourcesAccordion = this.clickedSourcesAccordion.bind(this);
    }

    clickSensor(id, name, coordinates, e) {
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
                    let twoWeeksAgo = new Date();
                    twoWeeksAgo.setDate((twoWeeksAgo.getDate() - 14));
                    twoWeeksAgo = twoWeeksAgo.toJSON();
                    mobile_data = mobile_data.filter(data => (data.max_end_time) >= twoWeeksAgo);
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

                if (this.state.accordion_icon) {

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

                        contents.push(
                            <ExploreAccordionSections
                                sourceData={source_data} tooltipVal={tooltip_val}
                                id={key_val} key={key_val} sectionLabel={section_label}
                            />
                        )

                    });

                }

            }

            if (contents.length > 0) {

                source_card = (
                    <Card id={source.id} className={exploreStyles.exploreCard} key={source.id}>
                        <CardHeader className={exploreStyles.headerSpacing}>
                            <span className={exploreStyles.exploreSourcesIcon}>
                                {dialogContents}
                            </span>
                            <CardTitle className={styles.title_card}>{source.label}</CardTitle>
                        </CardHeader>
                        <CardText>
                            <div key={this.id}>
                                {contents}
                            </div>
                        </CardText>
                    </Card>
                );

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
                <ListGroup>
                    <ListHeader className={exploreStyles.listHeaderStyle}
                                onClick={() => {this.clickedSourcesAccordion()}}
                    >
                        Explore Sources
                        <Icon className={"material-icons " + exploreStyles.accordionIcon}
                              name={this.state.accordion_icon ? 'expand_less' : 'expand_more'}
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
