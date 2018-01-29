import React, {Component} from 'react'
import styles from '../styles/main.css';
import {Button} from 'react-mdc-web';
import {getMobileSourceNames, getMobileSizeMax} from '../utils/getConfig';


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
            if (mobile_sourcenames != 'ALL') {
                mobile_data = mobile_data
                    .filter(data => mobile_sourcenames
                        .includes((data.properties.type.title).toString().toUpperCase()));
            }
            if (this.props.userStations != 'all') {
                mobile_data = mobile_data
                    .filter(data => this.props.userStations.includes(data.properties.type.location));
            }
            mobile_data.map(data => {
                let location = ("/#detail/location/" + data.name.toString());
                tabs.push(
                    <span key={data.id}>
                        <a key={data.id} href={location}>
                            <Button className={styles.exploreButton} raised key={data.id} id={data.id}>
                                {data.name}
                            </Button>
                        </a>
                        <br/>
                    </span>)
                });
        } else {
            this.props.data.filter(data => data.properties.type.id === this.props.source.id)
                .map(data => {
                    tabs.push(<Button key={data.id}
                                      onClick={this.clickSensor.bind(this, data.id, data.name, data.geometry.coordinates)}
                                      id={data.id}>
                        {data.name}</Button>)
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
