import React, {Component} from 'react'
import styles from '../styles/main.css';
import exploreStyles from '../styles/explore.css';
import {Button, Fab} from 'react-mdc-web';
import {
    getMobileSourceNames, getMobileSizeMax, getMobileDetailPath, getColor, getRegionToTitleMap
} from '../utils/getConfig';
import ol from 'openlayers';


class ExploreSourcesTab extends Component {
    constructor(props) {
        super(props);
    }

    clickSensor = (id, name, coordinates, e) => {
        this.props.onSelectClick(id, name, coordinates.slice(0, 2));
    };

    render() {
        //ref: https://github.com/pka/ol3-react-example/blob/master/index.js
        let contents = [];
        // Mobile
        if (screen.width <= getMobileSizeMax()) {
            let mobile_sourcenames = getMobileSourceNames().toUpperCase();
            let mobile_data = this.props.data
                .filter(data => data.properties.type.id === this.props.source.id);
            if (mobile_sourcenames !== 'ALL') {
                mobile_data = mobile_data
                    .filter(data => mobile_sourcenames
                        .includes((data.properties.type.title).toString().toUpperCase()));
            }
            if (this.props.userStations !== 'all') {
                mobile_data = mobile_data
                    .filter(data => this.props.userStations.includes(data.properties.type.location));
            }
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
                    </span>)
            });
        } else {
            let regionToTitleMap = getRegionToTitleMap();

            this.props.regions.map(region => {
                let source_pills = [];
                this.props.data.filter(data => data.properties.type.id === this.props.source.id &&
                   data.properties.region === region ).map(data => {
                       let lonLatPoint = [data.geometry.coordinates[0],data.geometry.coordinates[1]];
                       let webMercatorPoint = ol.proj.fromLonLat(lonLatPoint);
                       let color = getColor(data.properties.type.id);
                    source_pills.push(<Fab key={data.id} className={exploreStyles.exploreButton} style={{backgroundColor: color}}
                                        onClick={this.clickSensor.bind(this, data.id, data.name, webMercatorPoint)}
                                        id={data.id} title={data.name}>
                           <span className={exploreStyles.exploreButtonText}>{data.id}</span></Fab>)
                   });
                if(source_pills.length > 0) {
                    const title = regionToTitleMap[region];
                    contents.push(<div key={region}><div><span data-tooltip={title} className={exploreStyles.regionLabel}>{region}</span> </div>{source_pills}</div>)
                }
            });
        }

        return (
            <div key={this.id}>
                {contents}
            </div>
        );
    }
}

export default ExploreSourcesTab;
