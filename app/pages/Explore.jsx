import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/ExploreMap';
import ExploreSourcesTab from '../containers/ExploreSourcesTab';
import ExploreLayers from '../components/ExploreLayers';
import {
    Button, Card, CardTitle, CardHeader, CardText, Cell, Checkbox, Content,
    FormField, Grid, List, ListHeader, ListGroup, ListDivider, Radio, RadioGroup,
    Tabbar, Tab
} from 'react-mdc-web';
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {connect} from 'react-redux';
import {
    getMobileSourceNames, getMobileSizeMax, getLayersDetails, getChromeDisabled, clustersChoiceOption
} from '../utils/getConfig';
import MapToggleClusters from "../components/MapToggleClusters";


class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewSelection: "list-view",
            disableClusters: false
        };
        (this:any).clickedViewSelection = this.clickedViewSelection.bind(this);
        (this:any).toggleClustersExplore = this.toggleClustersExplore.bind(this);
    }

    state: {
        viewSelection: string,
        disableClusters: boolean
    };

    clickedViewSelection(value) {
        this.setState({viewSelection: value});
    }

    toggleClustersExplore() {
        this.setState({disableClusters: !this.state.disableClusters});
    };

    render() {

        let disableClusters = this.state.disableClusters;

        let sourceLists = '';
        let sourcesSection = '';
        let sources;
        let mobile_sourcenames = getMobileSourceNames();
        if (screen.width <= getMobileSizeMax() && mobile_sourcenames.toUpperCase() !== 'ALL') {
            sources = this.props.sources
                .filter(data => mobile_sourcenames.toUpperCase().includes((data.id).toString().toUpperCase()))
                .filter(data => (data.id).toString() !== '');
        } else {
            sources = this.props.sources;
        }

        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'list-view') {
            sourceLists = sources.map(s =>
                <Card id={s.id} className={exploreStyles.exploreCard} key={s.id}>
                    <CardHeader>
                        <CardTitle className={styles.title_card}>{s.label} </CardTitle>
                    </CardHeader>
                    <CardText>
                        <ExploreSourcesTab
                            userStations={this.props.params.stations}
                            source={s}
                        />
                    </CardText>
                </Card>
            );
            if (screen.width > getMobileSizeMax()) {
                sourcesSection = (
                    <ListGroup>
                        <ListHeader className={exploreStyles.listHeaderStyle}>Explore Sources</ListHeader>
                        <List id="listItems" className={exploreStyles.leftColumnExplore}>
                            {sourceLists}
                        </List>
                        <ListDivider/>
                    </ListGroup>
                )
            } else {
                sourcesSection = (
                    <List id="listItems" className={styles.leftColumn}>
                        {sourceLists}
                    </List>
                )
            }
        }

        let exploreLayers, exploreLayersDetails, layersVisibility;

        if (this.props.layersVisibility.length > 0) {
            exploreLayersDetails = getLayersDetails();
            exploreLayers = <ExploreLayers/>;
            layersVisibility = this.props.layersVisibility;
        }

        let toggleClustersExplore = '';
        let toggleClustersExploreOption = clustersChoiceOption();
        if (toggleClustersExploreOption === true && screen.width > getMobileSizeMax()) {
            toggleClustersExplore = <MapToggleClusters
                onChangeFunction={this.toggleClustersExplore}
                disableClusters={disableClusters}
            />
        }

        let mapObject = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'map-view') {
            if (screen.width <= getMobileSizeMax()) {
                disableClusters = false;
            }
            mapObject =
                <Map disable_clusters={disableClusters}
                     userStations={this.props.params.stations}
                     exploreLayersDetails={exploreLayersDetails}
                     layersVisibility={layersVisibility}
                />;
        }

        let mapViewText = (<span className={exploreStyles.tabTextStyle}>Map View</span>);
        let mobilePageTabs = '';
        if (screen.width <= getMobileSizeMax()) {
            let mapDisabled = false;
            if (navigator.userAgent.toLowerCase().indexOf('mobile/') > -1 && getChromeDisabled() === true) {
                mapDisabled = true;
                mapViewText = (
                    <span className={exploreStyles.tabTextStyleDisabled}>
                        Map View (Unavailable with Chrome for Mobile)
                    </span>
                );
            }

            mobilePageTabs = (
                <div className={exploreStyles.tabBackground}>
                    <Tabbar key='mobile_tabs'>
                        <Tab active={this.state.viewSelection === "list-view"}
                             key='list-view' value="list-view"
                             onClick={() => {this.clickedViewSelection("list-view")}}
                        >
                            <span className={exploreStyles.tabTextStyle}>List View</span>
                        </Tab>
                        <Tab active={this.state.viewSelection === "map-view"}
                             key='map-view' value="map-view"
                             onClick={() => {
                                 if (mapDisabled === false) {
                                     this.clickedViewSelection("map-view")
                                 }
                             }}
                        >
                            {mapViewText}
                        </Tab>
                    </Tabbar>
                </div>
            );
        }

        let page_content = (
            <div>
                <Menu selected='explore'/>
                <Content>
                    {mobilePageTabs}
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                {sourcesSection}
                            </Cell>
                            <Cell col={9}>
                                <div id="mapItems" className={styles.rightMap}>
                                    {toggleClustersExplore}
                                    {mapObject}
                                </div>
                            </Cell>
                        </Grid>
                        {exploreLayers}
                    </div>
                </Content>
            </div>
        );

        return (page_content)

    }

}


const mapStateToProps = (state) => {
    return {
        sources: state.sensors.sources,
        layersVisibility: state.exploreLayers.layers_visibility
    }
};

export default connect(mapStateToProps)(Explore);