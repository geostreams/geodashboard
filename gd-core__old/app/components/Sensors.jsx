/*
 * @flow
 */

import React, {Component} from 'react'
import Sensor from './Sensor'

class Sensors extends Component {
    render() {
        const sensors = this.props.sensorsData.map((sensor) => {
            return <Sensor id={sensor.id}
                           key={sensor.id}
                           title={sensor.name}
                           source={sensor.properties.type.id}
                           lat={sensor.geometry.coordinates[1]}
                           lon={sensor.geometry.coordinates[0]}/>
        });

        return (
            <div>
                <h1>Sensors</h1>
                {sensors}
            </div>
        );
    }
}

export default Sensors