/*
 * @flow
 */

import React, {Component} from 'react'
var ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css'
import DeviceGpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import type { Sensors } from '../utils/flowtype'

type MapProps = {
    sensors:Sensors,
    availableSensors:Sensors
};

type MapState = {
    center:Array < number >,
    vectorSource:ol.source.Vector,
    map:ol.Map,
};

class Map extends Component {
    state:MapState;

    constructor(props:MapProps) {
        super(props);
        this.state = {
            center: [-84.44799549, 38.9203417],
            vectorSource: new ol.source.Vector,
            // create a fake map to avoid checking map.isdefined every time for flow.
            map: new ol.Map({
                view: new ol.View({
                    center: [0, 0],
                    zoom: 1
                }),
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                target: 'map'
            })
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


    //TODO: get this info from settings.
    getColor(source:string):string {
        var sourcecolor = {
            "epa": "#0D71BA", "glfmsp": "#F7941E", "gsfmp": "#CC2128", "heidelberg": "#CC2128", "iadn": "#8A2BE2",
            "lec": "#4D6363", "noaa": "#043C82", "usgs": "#39B54A", "wqp": "#F28E1E",
        };
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    updateLayers() {
        var features = Array();
        this.props.availableSensors.map((sensor) => {

            var feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 4,
                    fill: new ol.style.Fill({color: this.getColor(sensor.properties.type.id)}),
                    stroke: new ol.style.Stroke({color: '#000000', width: 1})
                })
            }));

            feature.attributes = {
                "dataSource": sensor.properties.type.id,
                "maxEndTime": sensor.max_end_time,
                "minStartTime": sensor.min_start_time,
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);

        });


        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        if (this.state.vectorSource.getFeatures().length > 0) {
            this.state.map.getView().fit(this.state.vectorSource.getExtent(), this.state.map.getSize());
        }

    }

    componentDidUpdate() {
        // FIXME: this does not get called all the time
        // Try switching API and quickly switching to the search page
        console.log("Map component got new props");
        this.updateLayers()
    }

    componentDidMount() {
        let features = Array();
        this.props.sensors.map((sensor) => {
            let feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({color: this.getColor(sensor.properties.type.id)}),
                    stroke: new ol.style.Stroke({color: '#467A9E', width: 1})
                })
            }));

            feature.attributes = {
                "dataSource": sensor.properties.type.id,
                "maxEndTime": sensor.max_end_time,
                "minStartTime": sensor.min_start_time,
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);
        });

        var vectorSource = new ol.source.Vector({
            features: features
        });
        this.setState({vectorSource: vectorSource});

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        //this is not used now
        //this.state.vectorLayer = vectorLayer;

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
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        var overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        if (closer) {
            closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
        }


        var view = new ol.View({
            projection: 'EPSG:4326',
            center: this.state.center,
            zoom: 5.5,
            minZoom: 5.5,
            maxZoom: 12
        });
        var theMap;
        window.app = {};
        var app = window.app;
        app.centerControl = function (opt_options) {
            var options = opt_options || {};
            const centerButton = document.getElementById('centerButton');

            var handleCenterButton = function () {
                view.fit(vectorSource.getExtent(), theMap.getSize());
            };
            if (centerButton) {
                centerButton.addEventListener('click', handleCenterButton, false);
                centerButton.addEventListener('touchstart', handleCenterButton, false);
            }

            const element = document.getElementById('ol-centercontrol');
            if (element && centerButton) {
                element.className += ' ol-unselectable ol-control';
                element.appendChild(centerButton);

                ol.control.Control.call(this, {
                    element: element,
                    target: options.target
                });
            }

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


        //this.state.map = theMap;
        theMap.on('singleclick', function (e) {
            theMap.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                var id = feature.getId().toUpperCase();
                var coordinate = e.coordinate;

                var sensorInfo = feature.attributes;

                var dataSourceValue = sensorInfo.dataSource.toUpperCase();
                var dataSource = '<tr><td><strong>Data Source: </strong></td>'.concat('<td>', dataSourceValue, ' Monitoring Site</td></tr>');

                var startTime = new Date(sensorInfo.minStartTime).toLocaleDateString();
                var endTime = new Date(sensorInfo.maxEndTime).toLocaleDateString();
                var timePeriod = '<tr><td><strong>Time Period: </strong></td>'.concat('<td>', startTime, ' - ', endTime, '</td></tr>');

                var latitude = Number(sensorInfo.latitude).toPrecision(5).toString();
                if (latitude.includes("-")) {
                    latitude = latitude.substring(1);
                    latitude = latitude.concat('&degS');
                } else {
                    latitude = latitude.concat('&degN');
                }
                var longitude = Number(sensorInfo.longitude).toPrecision(5).toString();
                if (longitude.includes("-")) {
                    longitude = longitude.substring(1);
                    longitude = longitude.concat('&degW');
                } else {
                    longitude = longitude.concat('&degE');
                }
                var latlong = '<tr><td><strong>Lat, Long: </strong></td>'.concat('<td>', latitude, ', ', longitude, '</td></tr>');

                var headerText = '<h2 style="text-align: center">' + id + '</h2>';

                var bodyText =
                    '<table align="center" style="border-top: solid;">' +
                    dataSource +
                    timePeriod +
                    latlong +
                    '</table>';

                var popupText = headerText + bodyText;

                if (content) {
                    content.innerHTML = popupText;
                }
                overlay.setPosition(coordinate);
            });

        });
        this.setState({map: theMap});
    }
}

export default Map