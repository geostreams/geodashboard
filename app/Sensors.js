import React, { Component } from 'react'
import Sensor from './Sensor'
import { connect } from 'react-redux'

class Sensors extends Component {
	render() {
		var sensors = this.props.sensorsData.map((sensor) => {
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
const mapStateToProps = (state, ownProps) => {
  return {
    sensorsData: state.sensors.data
  }
}

export default connect(mapStateToProps)(Sensors)