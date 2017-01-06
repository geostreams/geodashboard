import React, {Component} from 'react'
var ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css'
import DeviceGpsFixed from 'material-ui/svg-icons/device/gps-fixed';


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      center: [-84.44799549, 38.9203417],
    }
  }

  render() {
    // this.updateLayers()
    return (<div>
            <div id='map' className={styles.root}></div>
            <div style={{display: "none"}}>
              <a className="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
              <div id="marker" title="Marker" className="marker"></div>
              <div id="popup" className={styles.olPopup}>
                <a href="#" id="popup-closer" className={styles.olPopupCloser}></a>
                <div id="popup-content"></div>
              </div>
              <div id="ol-zoomslider" className="ol-zoomslider"></div>
              <div id="ol-centercontrol" className={styles.olCenterButton}></div>
              <button id="centerButton"><DeviceGpsFixed/></button>
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
      if((this.props.selectedParameters.length == 0 || this.inArray(sensor.parameters, this.props.selectedParameters))
       && (this.props.selectedDataSources.length == 0  || this.props.selectedDataSources.indexOf(sensor.properties.type.id) > -1)
       && this.props.selectedStartDate < new Date(sensor.max_end_time) && this.props.selectedEndDate > new Date(sensor.min_start_time)
       && (this.props.selectedLocation == null ||  this.props.selectedLocation === sensor.properties.region)) {

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
        feature.setId(sensor.name);
        features.push(feature);
      }

    });
    this.vectorSource.clear();
    this.vectorSource.addFeatures(features);

    if(this.vectorSource.getFeatures().length > 0 ) {
      this.map.getView().fit(this.vectorSource.getExtent(), this.map.getSize());
    }
  }

  componentDidUpdate() {
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
      feature.setId(sensor.name);
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

    var attribution = new ol.Attribution({
      html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
      'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
    });

    var layers = [
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          attributions: [attribution],
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
        })
      }),
      vectorLayer
    ];

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };


    var view =  new ol.View({
      projection: 'EPSG:4326',
      center: this.state.center,
      zoom: 5.5,
      minZoom: 5.5,
      maxZoom: 12
    });
    var theMap;
    var initialCenter = this.state.initialCenter;
    window.app = {};
    var app = window.app;
    app.centerControl = function(opt_options) {
      var options= opt_options || {};
      var centerButton = document.getElementById('centerButton');
      
      var handleCenterButton = function() {
        view.fit(vectorSource.getExtent(), theMap.getSize());
      };

      centerButton.addEventListener('click', handleCenterButton, false);
      centerButton.addEventListener('touchstart', handleCenterButton, false);

      var element = document.getElementById('ol-centercontrol');
      element.className += ' ol-unselectable ol-control';
      element.appendChild(centerButton);

      ol.control.Control.call(this, {
        element: element,
        target: options.target
      });

    };
    ol.inherits(app.centerControl, ol.control.Control);


    theMap = new ol.Map({
      target: 'map',
      layers: layers,
      view: view,
      overlays: [overlay],
      controls: ol.control.defaults({
        attributionOptions: ({
          collapsible: false
        })
      }).extend([
        new ol.control.ZoomSlider(),
        new app.centerControl()

      ])
    });
    this.map = theMap;
    this.map.on('singleclick', function(e){
      theMap.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
        var id = feature.getId();
        var coordinate = e.coordinate;

        content.innerHTML = id;
        overlay.setPosition(coordinate);


      });

    });
  }
}

export default Map