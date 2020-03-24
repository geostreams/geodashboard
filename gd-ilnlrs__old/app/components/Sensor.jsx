/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/sensor.css';

class Sensor extends Component {
    render() {
        return (
            <div className={styles.root}>
                <h4>ID: {this.props.title}</h4>
                <div>
                    <dl>
                        <dt>Source</dt>
                        <dd>{this.props.source}</dd>
                        <dt>Latitude</dt>
                        <dd>{this.props.lat}</dd>
                        <dt>Longitude</dt>
                        <dd>{this.props.lon}</dd>
                    </dl>
                </div>
            </div>
        )
    }
}

export default Sensor;