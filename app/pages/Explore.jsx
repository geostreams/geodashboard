import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import Map from '../containers/ExploreMap';
import ExploreSourcesTab from '../containers/ExploreSourcesTab';
import ExploreLayers from '../components/ExploreLayers';
import {
    Button, Card, CardTitle, CardHeader, CardText, Grid, Cell, Content, List
} from 'react-mdc-web';
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {connect} from 'react-redux';
import { getLayersDetails } from '../utils/getConfig';

class Explore extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let sourceLists = this.props.sources.map(s =>
            <Card id={s.id} className={exploreStyles.exploreCard} key={s.id}>
                <CardHeader>
                    <CardTitle>{s.label} </CardTitle>
                </CardHeader>
                <CardText>
                    <ExploreSourcesTab source={s}/>
                </CardText>
            </Card>
        );

        let exploreLayers, exploreLayersDetails, layersVisibility;

        if (this.props.layersVisibility.length > 0) {
            exploreLayersDetails = getLayersDetails();
            exploreLayers = <ExploreLayers/>;
            layersVisibility = this.props.layersVisibility;
        }

        return (
            <div>
                <Menu selected='explore'/>
                <Content>
                    <div className={styles.bodymap}>
                        <Grid className={styles.noPadding}>
                            <Cell col={2}>
                                <List className={styles.leftColumn}>
                                    {sourceLists}
                                </List>
                            </Cell>
                            <Cell col={10}>
                                <div className={styles.rightMap}>
                                    <Map
                                        exploreLayersDetails={exploreLayersDetails}
                                        layersVisibility={layersVisibility}
                                    />
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

export default connect(mapStateToProps)(Explore)