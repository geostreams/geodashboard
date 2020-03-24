/*
 * @flow
 */

import React, {Component} from 'react';
import Map from '../containers/ExploreMap';
import ExploreSourcesTab from '../components/ExploreSourcesTab';
import ExploreCustomItemsTab from '../components/ExploreCustomItemsTab';
import ExploreCategoriesTab from '../components/ExploreCategoriesTab';
import ExploreLayers from '../components/ExploreLayers';
import {
    Cell, Content, Grid, Icon, List, ListHeader, ListGroup, Tabbar, Tab
} from 'react-mdc-web/lib';
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {connect} from 'react-redux';
import {
    getMobileSourceNames, getMobileSizeMax, getLayersDetails,
    getExploreCategoriesOpen, clustersChoiceOption, getExploreSections
} from '../utils/getConfig';
import MapToggleClusters from "../components/MapToggleClusters";
import Spinner from "../components/Spinner";
import {generateMobilePageTabs} from "../utils/mobileUtils";


class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewSelection: "list-view",
            disableClusters: false,
            categories_accordion_icon: false,
        };
        (this:any).clickedViewSelection = this.clickedViewSelection.bind(this);
        (this:any).toggleClustersExplore = this.toggleClustersExplore.bind(this);
        (this:any).clickedCategoriesAccordion = this.clickedCategoriesAccordion.bind(this);
    }

    clickedCategoriesAccordion() {
        this.setState({categories_accordion_icon: !this.state.categories_accordion_icon});
    }

    state: {
        viewSelection: string,
        disableClusters: boolean,
        categories_accordion_icon: boolean,
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
        let exploreCategories = [];
        let exploreCategoriesSections = [];
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
                                key={item.title} data={this.props.explore_data} sources={sources} item={item}
                            />
                        );
                    });
                }
                if (getExploreCategoriesOpen() && this.props.parameterCategories.length > 0) {
                    this.props.parameterCategories.map(category => {
                        exploreCategories.push(
                            <ExploreCategoriesTab
                                key={category.title} data={this.props.explore_data} sources={sources}
                                parameterCategory={category} parameterMappings={this.props.parameterMappings}
                                parameters={this.props.parameters}
                            />
                        );
                    });
                    exploreCategoriesSections = (
                        <ListGroup className={exploreStyles.listWidthStyle}>
                            <ListHeader className={exploreStyles.listHeaderStyle}
                                        onClick={() => {this.clickedCategoriesAccordion()}}>
                                Categories
                                <Icon className={"material-icons " + exploreStyles.accordionIcon}
                                      name={this.state.categories_accordion_icon ? 'expand_more' : 'chevron_right'}
                                />
                            </ListHeader>
                            <div className={this.state.categories_accordion_icon ?
                                exploreStyles.listItemsStyleOpen : exploreStyles.listItemsStyleClosed}>
                                {exploreCategories}
                            </div>
                        </ListGroup>
                    );
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

        // Setup Mobile View Tabs
        let mobilePageTabs = '';
        if (screen.width <= getMobileSizeMax()) {
            mobilePageTabs = generateMobilePageTabs("Map View", this.state.viewSelection, this.clickedViewSelection);
        }

        let page_content = (
            <div>
                <Content>
                    {mobilePageTabs}
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                <div className={exploreStyles.leftColumnExplore}>
                                    {sourcesSection}
                                    {exploreCustomSections}
                                    {exploreCategoriesSections}
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
        regions: state.sensors.regions,
        parameters: state.parameters.parameters,
        parameterCategories: state.parameters.categories,
        parameterMappings: state.parameters.mappings,
        explore_data: state.sensors.explore_sensors,
    }
};

export default connect(mapStateToProps)(Explore);
