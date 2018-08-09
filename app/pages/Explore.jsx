import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/ExploreMap';
import ExploreSourcesTab from '../components/ExploreSourcesTab';
import ExploreCustomItemsTab from '../components/ExploreCustomItemsTab';
import ExploreLayers from '../components/ExploreLayers';
import {Cell, Content, Grid, Tabbar, Tab} from 'react-mdc-web';
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {connect} from 'react-redux';
import {
    getMobileSourceNames, getMobileSizeMax, getLayersDetails,
    getChromeDisabled, clustersChoiceOption, getExploreSections
} from '../utils/getConfig';
import MapToggleClusters from "../components/MapToggleClusters";
import Spinner from "../components/Spinner";


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
        let sourcesSection = '';
        let exploreCustomSections = [];
        let sources;
        let mobile_sourcenames = getMobileSourceNames();
        if (screen.width <= getMobileSizeMax() && mobile_sourcenames.toUpperCase() !== 'ALL') {
            sources = this.props.sources
                .filter(data => mobile_sourcenames.toUpperCase().includes((data.id).toString().toUpperCase()))
                .filter(data => (data.id).toString() !== '');
        } else {
            sources = this.props.sources;
        }

        if (sources.length === 0) {
            return (
                <div>
                    <Menu selected='explore'/>
                    <Spinner/>
                </div>
            );
        }

        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'list-view') {

            sourcesSection = <ExploreSourcesTab
                key='source_data' regions={this.props.regions} data={this.props.data}
                userStations={this.props.params.stations} sources={sources}
            />;

            if (screen.width > getMobileSizeMax()) {
                if (getExploreSections().length > 0) {
                    getExploreSections().map(item => {
                        exploreCustomSections.push(
                            <ExploreCustomItemsTab
                                key={item.title} data={this.props.data} sources={sources} item={item}
                            />
                        );
                    });
                }
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
                                <div className={exploreStyles.leftColumnExplore}>
                                    {sourcesSection}
                                    {exploreCustomSections}
                                </div>
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
        layersVisibility: state.exploreLayers.layers_visibility,
        data: state.sensors.data,
        regions: state.sensors.regions
    }
};

export default connect(mapStateToProps)(Explore);
