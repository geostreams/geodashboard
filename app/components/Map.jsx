/*
 * @flow
 */

import React, {Component} from 'react'
let ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css'
import DeviceGpsFixed from 'material-ui/svg-icons/device/gps-fixed';
import {getSourceName, getParameterName} from '../utils/getConfig'
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
    state: MapState;

    constructor(props: MapProps) {
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


    getColor(source:string):string {
        var sourcecolor = window.configruntime.sourcecolor;
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    updateLayers(sensors) {
        var features = Array();
        sensors.map((sensor) => {

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
                "dataSource": getSourceName(sensor.properties.type),
                "maxEndTime": sensor.max_end_time,
                "minStartTime": sensor.min_start_time,
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
                //parameters has null in the array
                "parameters": sensor.parameters.filter(x => x !== null).map(x => getParameterName(x)),
                "color": this.getColor(sensor.properties.type.id),
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);

        });
        return features;
    }

    componentDidUpdate() {
        // FIXME: this does not get called all the time
        // Try switching API and quickly switching to the search page
        var features;
        if(this.props.updateSensors){
            console.log("Map component got new props");
            features = this.updateLayers(this.props.updateSensors);
        } else {
            features = this.updateLayers(this.props.sensors);
        }
        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        if (this.state.vectorSource.getFeatures().length > 0) {
            this.state.map.getView().fit(this.state.vectorSource.getExtent(), this.state.map.getSize());
        }

    }

    componentDidMount() {

        var features = this.updateLayers(this.props.sensors);

        let vectorSource = new ol.source.Vector({
            features: features
        });
        this.setState({vectorSource: vectorSource});

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        let attribution = new ol.Attribution({
            html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, ' +
            'UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
        });

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [attribution],
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
                })
            }),
            vectorLayer
        ];

        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        let overlay = new ol.Overlay({
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

        let view = new ol.View({
            projection: 'EPSG:4326',
            center: this.state.center,
            zoom: 5.5,
            minZoom: 5.5,
            maxZoom: 12
        });
        let theMap;

        window.app = {};
        let app = window.app;
        app.centerControl = function (opt_options) {
            let options = opt_options || {};
            const centerButton = document.getElementById('centerButton');

            let handleCenterButton = function () {
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

        theMap.getView().on("change:resolution", function () {
            if (closer) {
                overlay.setPosition(undefined);
                closer.blur();
            }
        });

        theMap.on('singleclick', function (e) {

            let feature = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange, layer) {
                return featureChange;
            });

            if (feature) {
                let id = feature.getId().toUpperCase();
                let coordinate = e.coordinate;

                let sensorInfo = feature.attributes;

                let dataSourceValue = (sensorInfo.dataSource);
                let dataSource = '<tr><td width="35%"><strong>Data Source: </strong></td>'.concat('<td width="65%">', dataSourceValue,
                    ' Monitoring Site</td></tr>');

                let startTime = new Date(sensorInfo.minStartTime).toLocaleDateString();
                let endTime = new Date(sensorInfo.maxEndTime).toLocaleDateString();
                let timePeriod = '<tr><td><strong>Time Period: </strong></td>'.concat('<td>', startTime, ' - ',
                    endTime, '</td></tr>');

                let latitude = Number(sensorInfo.latitude).toPrecision(5).toString();
                if (latitude.includes("-")) {
                    latitude = latitude.substring(1);
                    latitude = latitude.concat('&degS');
                } else {
                    latitude = latitude.concat('&degN');
                }
                let longitude = Number(sensorInfo.longitude).toPrecision(5).toString();
                if (longitude.includes("-")) {
                    longitude = longitude.substring(1);
                    longitude = longitude.concat('&degW');
                } else {
                    longitude = longitude.concat('&degE');
                }
                let latlong = '<tr><td><strong>Lat, Long: </strong></td>'.concat('<td>', latitude, ', ',
                    longitude, '</td></tr>');

                let paramsLength = (sensorInfo.parameters).length;
                let paramsOrig = (sensorInfo.parameters);
                let paramsAlt = '';
                for (let i = 0; i < paramsLength; i++) {
                    paramsAlt = paramsAlt + '<li>' + paramsOrig[i] + '</li>';
                }
                let params = '<ul>'.concat(paramsAlt, '</ul>');

                let sourceColor = sensorInfo.color;

                let headerText = '<h2 class=' + styles.header2style + ' style="background-color: ' +
                    sourceColor + ';">' + id + '</h2>';

                let bodyText =
                    '<table class=' + styles.tablestyle + '>' +
                        dataSource +
                        timePeriod +
                        latlong +
                    '</table>' +
                    '<div class=' + styles.greyborder + '></div>' +
                    '<h3 class=' + styles.header3style + '>' + 'Parameters (' + paramsLength + '): </h3>' +
                    '<div class=' + styles.paramsborder + '>' + params + '</div>';

                let popupText = headerText + bodyText;

                if (content) {
                    content.innerHTML = popupText;
                }
                overlay.setPosition(coordinate);

            } else {
                if (closer) {
                    overlay.setPosition(undefined);
                    closer.blur();
                }
            }

        });

        this.setState({map: theMap});

    };

}

export default Map
