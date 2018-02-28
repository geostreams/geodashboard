import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/ExploreMap';
import ExploreSourcesTab from '../containers/ExploreSourcesTab';
import ExploreLayers from '../components/ExploreLayers';
import {
    Button, Card, CardTitle, CardHeader, CardText, Cell,
    Content, Grid, List, ListHeader, ListGroup, ListDivider, Radio, RadioGroup
} from 'react-mdc-web';
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {connect} from 'react-redux';
import {
    getMobileSourceNames, getMobileSizeMax, getLayersDetails
} from '../utils/getConfig';

class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewSelection: "list-view"
        };
        (this:any).clickedViewSelection = this.clickedViewSelection.bind(this);
    }

    state: {
        viewSelection: string
    };

    clickedViewSelection(event) {
        this.setState({viewSelection: event.target.value});
    }

    render() {

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
                        <CardTitle>{s.label} </CardTitle>
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

        let mapObject = '';
        if (screen.width > getMobileSizeMax() || this.state.viewSelection === 'map-view') {
            mapObject =
                <Map
                    exploreLayersDetails={exploreLayersDetails}
                    layersVisibility={layersVisibility}
                />;
        }

        let mobileViewSelection = '';
        if (screen.width <= getMobileSizeMax()) {
            let map_radio = (<Radio value="map-view" name="map-view">Map</Radio>);
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                map_radio = (
                    <Radio disabled={true} value="map-view" name="map-view">
                        Map (View unavailable with Chrome for Mobile)
                    </Radio>
                )
            }

            mobileViewSelection =
                <div className={styles.viewSelectionStyle}>
                    <h2 className={styles.viewSelectionLabel}>View By: </h2>
                    <RadioGroup
                        className={styles.viewSelectionRadios}
                        name="view-selection"
                        value={this.state.viewSelection}
                        onChange={this.clickedViewSelection}
                    >
                        <Radio value="list-view" name="list-view">List</Radio>
                        {map_radio}
                    </RadioGroup>
                </div>
        }

        return (
            <div>
                <Menu selected='explore'/>
                <Content>
                    {mobileViewSelection}
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={3}>
                                {sourcesSection}
                            </Cell>
                            <Cell col={9}>
                                <div id="mapItems" className={styles.rightMap}>
                                    {mapObject}
                                </div>
                            </Cell>
                        </Grid>
                        {exploreLayers}
                    </div>
                </Content>
            </div>
        )

    }
}


const mapStateToProps = (state) => {
    return {
        sources: state.sensors.sources,
        layersVisibility: state.exploreLayers.layers_visibility
    }
};

export default connect(mapStateToProps)(Explore);