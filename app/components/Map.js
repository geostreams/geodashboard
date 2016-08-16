import React, {Component} from 'react'
var ol = require('openlayers')
require("openlayers/css/ol.css")
import styles from '../styles/map.css'
import Sensors from './Sensors'
import { connect } from 'react-redux'

class Map extends Component {

  constructor(props) {
    super(props)
    this.updateLayers = this.updateLayers.bind(this)
  }

  render() {
    return (<div>
            <div id='map' className={styles.root}></div>
            <div style={{display: "none"}}>
              <a className="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
              <div id="marker" title="Marker" className="marker"></div>
              <div id="popup" title="Welcome to some location"></div>
              <div id="ol-zoomslider" className="ol-zoomslider"></div>
            </div>
            </div>);
  }

  inArray(array1, array2) {
    if(array1.length > 0 && array2.length > 0) {
      for(var i = 0; i < array1.length; i++) {
        if(array2.indexOf(array1[i]) > -1) {
          return true;
        }
      }
    }
    
    return false;
  }

  updateLayers() {
    var features = Array();
    this.props.sensors.map((sensor) => {
      var showSensor = false;
      if(this.props.selectedParameters.length == 0 || this.inArray(sensor.parameters, this.props.selectedParameters)
       && this.props.selectedDataSources.length == 0  || this.inArray(sensor.properties.type.id, this.props.selectedDataSources)) {

        var feature = new ol.Feature({
          geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
        });
        feature.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
              radius: 4,
              fill: new ol.style.Fill({color: '#17495B'}),
              stroke: new ol.style.Stroke({color: '#467A9E', width: 1})
            })
        }));
        features.push(feature);
      }

    });
    this.vectorSource.clear();
    this.vectorSource.addFeatures(features);
  }

  componentWillReceiveProps() {
    // FIXME: this does not get called all the time
    // Try switching API and quickly switching to the search page
    console.log("Map component got new props");
    this.updateLayers()
  }

  componentDidMount() {
    var features = Array();
    this.props.sensors.map((sensor) => {
      var feature = new ol.Feature({
        geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
      });
      feature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({color: '#17495B'}),
            stroke: new ol.style.Stroke({color: '#467A9E', width: 1})
          })
      }));
      features.push(feature);
    });

    var vectorSource = new ol.source.Vector({
      features: features
    });
    this.vectorSource = vectorSource;

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    this.vectorLayer = vectorLayer;

    var layers = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ];

    this.map = new ol.Map({
      target: 'map',
      layers: layers,
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [-84.44799549, 38.9203417],
        zoom: 4
      }),
      controls: ol.control.defaults().extend([
          new ol.control.ZoomSlider()
        ]),
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sensors: state.sensors.data,
    selectedParameters: state.selectedParameters.parameters,
    selectedDataSources: state.selectedDataSources.data_sources,
  }
}

export default connect(mapStateToProps)(Map)