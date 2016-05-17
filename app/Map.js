import React, {Component} from 'react'
var ol = require('openlayers')
require("openlayers/css/ol.css")
import styles from './map.css'
import Sensors from './Sensors'

class Map extends Component {

  render() {
    return (<div>
            <div id='map' className={styles.root}></div>
            <div style={{display: "none"}}>
              <a className="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
              <div id="marker" title="Marker" className="marker"></div>
              <div id="popup" title="Welcome to some location"></div>
            </div>
            </div>);
  }

  componentDidMount() {

    // var placeLayer = new ol.layer.Vector({
    //   source: new ol.source.Vector({
    //     format: new ol.format.GeoJSON(),
    //     //url: "http://www.geoforall.org/locations/OSGEoLabs.json" raises
    //     //Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://www.geoforall.org/locations/OSGEoLabs.json. (Reason: CORS header 'Access-Control-Allow-Origin' missing).
    //     features: Sensors
    //   })
    // });

    var features = Array();
    
    this.props.sensors.map((sensor) => {
      
      var feature = new ol.Feature({
        geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
      });

      feature.setStyle(new ol.style.Style({
        // image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        //   color: '#8959A8',
        //   src: 'data/dot.png'
        // }))
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({color: '#666666'}),
            stroke: new ol.style.Stroke({color: '#bada55', width: 1})
          })
      }));
      features.push(feature);
      // var pos = [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]];
      // var marker = new ol.Overlay({
      //   position: pos,
      //   positioning: 'center-center',
      //   element: document.getElementById('marker'),
      //   stopEvent: false
      // });
      // map.addOverlay(marker);
    });

    var vectorSource = new ol.source.Vector({
      features: features
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    // map.addLayer(vectorLayer);

    var layers = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
      // new ol.layer.Tile({
      //   source: new ol.source.TileWMS({
      //     url: 'http://demo.boundlessgeo.com/geoserver/wms',
      //     params: {
      //       'LAYERS': 'ne:NE1_HR_LC_SR_W_DR'
      //     }
      //   })
      // })
    ];

    var map = new ol.Map({
      target: 'map',
      layers: layers,
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [-84.44799549, 38.9203417],
        // center: ol.proj.fromLonLat([-84.44799549, 38.9203417]),
        zoom: 4
      })
    });
  }
}

export default Map