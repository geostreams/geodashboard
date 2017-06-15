import React, {Component} from 'react'
import styles from '../styles/search.css';
import {Button} from 'react-mdc-web';
import myHandler from '../components/Map.jsx'


class ExploreSourcesTab extends Component {
    constructor(props) {
        super(props);
    }

    clickSensor = (id, name, coordinates, e) => {
        this.props.onSelectClick(id, name, coordinates.slice(0, 2));
    }

    render() {
        //ref: https://github.com/pka/ol3-react-example/blob/master/index.js
        let tabs = [];
            this.props.data.filter(data => data.properties.type.id === this.props.source.id)
            .map(data =>
               tabs.push(<Button key={data.id}  onClick={this.clickSensor.bind(this, data.id, data.name, data.geometry.coordinates)} id={data.id}>
                   {data.name}</Button>)
            );
        return (
            <div key={this.id}>
                {tabs}
            </div>
        );
    }
}

export default ExploreSourcesTab;
