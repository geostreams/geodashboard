import React, {Component} from 'react'
import styles from '../styles/main.css';
import {Button, Fab} from 'react-mdc-web';
import {
    getMobileSourceNames, getMobileSizeMax, getMobileDetailPath, getColor
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
        let tabs = [];
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
                tabs.push(
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
            this.props.data.filter(data => data.properties.type.id === this.props.source.id)
                .map(data => {
                    // Convert to Web Mercator Format
                    let lonLatPoint = [data.geometry.coordinates[0],data.geometry.coordinates[1]];
                    let webMercatorPoint = ol.proj.fromLonLat(lonLatPoint);
                    let color = getColor(data.properties.type.id);
                    tabs.push(<Fab key={data.id} className={styles.exploreButton} style={{backgroundColor: color}}
                                   onClick={this.clickSensor.bind(this, data.id, data.name, webMercatorPoint)}
                                   id={data.id} title={data.name}>
                        <span className={styles.exploreButtonText}>{data.id}</span></Fab>)
                });
        }

        return (
            <div key={this.id}>
                {tabs}
            </div>
        );
    }
}

export default ExploreSourcesTab;