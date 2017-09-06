/*
 * @flow
 *
 * Basic Map is the underline Component for all maps.
 * To create a button:
 *     a normal button: create it in your own map.
 *     a overlayer.control: create it in BasicMap and hide it unless all map will use it.
 * To create a new layer:
 *     a layer that will be add and remove from the map: refer to multiLineLayer in SearchMap
 *     a layer that exist all the time and its sources are updated according to redux store:
 *     refer to areaPolygonSource in SearchMap.
 */

import React, {Component} from 'react';
let ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {Icon} from 'react-mdc-web';
import {getAttribution} from '../utils/mapUtils';
import type {Sensors, MapProps, BasicMapState} from '../utils/flowtype';

class BasicMap extends Component {
    state: BasicMapState;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            center: [-84.44799549, 38.9203417],
            vectorSource: new ol.source.Vector,
            clusterSource: new ol.source.Cluster({distance: 1, source: new ol.source.Vector}),
            customLocationFilterVectorExtent: [],
            currentZoom: 5.5,
            maxZoom: 12,
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

        return (
         <div>
            <div id='map' className={styles.root}>
            </div>

            <div style={{display: 'none'}}>
                <div id="marker" title="Marker" className="marker"></div>
                <div id="popup" className={styles.olPopup}>
                    <a href="#" id="popup-closer" className={styles.olPopupCloser}></a>
                    <div id="popup-content"></div>
                </div>
                <div id="ol-centercontrol" className={styles.olCenterButton}></div>
                <button id="centerButton"><Icon name="gps_fixed"/></button>

                <div id="ol-drawcirclecontrol"
                     className={styles.olDrawCircleButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'} ></div>
                <button id="drawCircleButton" title="Click to Draw a Circle">
                    <Icon name="panorama_fish_eye"/></button>

                <div id="ol-drawsquarecontrol"
                     className={styles.olDrawSquareButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawSquareButton" title="Click to Draw a Square">
                    <Icon name="crop_square"/></button>

                <div id="ol-drawcustomcontrol"
                     className={styles.olDrawCustomButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawCustomButton" title="Click to Draw a Custom Shape">
                    <Icon name="star_border"/></button>

                <div id="ol-drawclearcontrol"
                     className={styles.olDrawClearButton + ' ' +
                     styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawClearButton" title="Click to Reset Drawing Selection">
                    <Icon name="clear"/></button>
            </div>
        </div>);

    }



    componentDidUpdate() {
        this.props.mapDidUpdate(this.state.map, this.state.customLocationFilterVectorExtent);
        this.state.clusterSource.clear();
        this.state.clusterSource.addFeatures(this.props.features);
        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(this.props.features);
    }

    componentDidMount() {

        let features = this.props.features;

        let vectorSource = new ol.source.Vector({
            features: features
        });

        const clusterSource = new ol.source.Cluster({
            distance: 1,
            source: this.state.vectorSource
        });
        this.setState({clusterSource: clusterSource});

        let clusters = this.props.getCluster(clusterSource);
        clusters.setZIndex(1);

        let customLocationFilterVector = new ol.source.Vector();
        let customLocationFilterLayer = new ol.layer.Vector({
            source: customLocationFilterVector,
            name: 'drawing_layer'
        });

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [getAttribution()],
                    url: window.configruntime.gd3.mapTileURL
                })
            }),
            clusters,
            customLocationFilterLayer
        ];

        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        let overlay = new ol.Overlay({
            id: "marker",
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
            zoom: this.state.currentZoom,
            minZoom: 5.5,
            maxZoom: this.state.maxZoom
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

        let selectPoints = [];

        const that = this;

        // Add Draw Clear/Reset Button
        let appDrawClear = window.app;
        appDrawClear.drawClearControl = function (opt_options) {
            let options = opt_options || {};
            const drawClearButton = document.getElementById('drawClearButton');

            let handleDrawClearButton = function () {
                theMap.getInteractions().forEach(function (e) {
                    if(e instanceof ol.interaction.Draw) {
                        theMap.removeInteraction(e);
                    }
                });

                customLocationFilterLayer.getSource().clear();

                selectPoints = [];

                // Create empty array for points
                let selectPointsLocations = [];

                // Set this for resetting the points
                selectPointsLocations[0] = 'reset_points';

                // Get the shape coordinates
                let drawCoordinates = [];

                // This is the button that will reset the points
                that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

                let keep_draw_active = document.getElementById('draw');
                if (keep_draw_active) {
                    keep_draw_active.click();
                }

            };

            if (drawClearButton) {
                drawClearButton.addEventListener('click', handleDrawClearButton, false);
                drawClearButton.addEventListener('touchstart', handleDrawClearButton, false);
            }

            const drawElement = document.getElementById('ol-drawclearcontrol');
            if (drawElement && drawClearButton) {
                drawElement.className += ' ol-unselectable ol-control';
                drawElement.appendChild(drawClearButton);

                ol.control.Control.call(this, {
                    element: drawElement,
                    target: options.target
                });
            }

        };

        // Add Draw Square Button
        let appDrawSquare = window.app;
        appDrawSquare.drawSquareControl = function (opt_options) {
            let options = opt_options || {};
            const drawSquareButton = document.getElementById('drawSquareButton');

            let handleDrawSquareButton = function () {

                let drawSquare = new ol.interaction.Draw({
                    type: 'Circle',
                    source: customLocationFilterVector,
                    geometryFunction: ol.interaction.Draw.createRegularPolygon(4),
                });

                theMap.addInteraction(drawSquare);

                drawSquare.on ('drawstart',function() {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawSquare.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if(e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();
                    that.setState({customLocationFilterVectorExtent: drawExtent.getExtent()});

                    // Get all the features in the layer
                    let featuresInLayer = clusters.getSource().getFeatures();

                    // Check each feature
                    let loopFeatureExtent;
                    for (let j = 0; j < featuresInLayer.length; j++) {
                        loopFeatureExtent = featuresInLayer[j].getGeometry().getExtent();
                        // Only select the features within the shape
                        if (drawExtent.intersectsExtent(loopFeatureExtent)) {
                            selectPoints.push(featuresInLayer[j]);
                        }
                    }

                    let selectPointsLocations = [];

                    if (selectPoints.length > 0) {
                        for (let i = 0; i < selectPoints.length; i++) {
                            let selectPointFeatures = selectPoints[i].get('features');
                            for(let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if(!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }

                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();
                    that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);
                });
            };

            if (drawSquareButton) {
                drawSquareButton.addEventListener('click', handleDrawSquareButton, false);
                drawSquareButton.addEventListener('touchstart', handleDrawSquareButton, false);
            }

            const drawElement = document.getElementById('ol-drawsquarecontrol');
            if (drawElement && drawSquareButton) {
                drawElement.className += ' ol-unselectable ol-control';
                drawElement.appendChild(drawSquareButton);

                ol.control.Control.call(this, {
                    element: drawElement,
                    target: options.target
                });
            }

        };

        // Add Draw Circle Button
        let appDrawCircle = window.app;
        appDrawCircle.drawCircleControl = function (opt_options) {
            let options = opt_options || {};
            const drawCircleButton = document.getElementById('drawCircleButton');

            let handleDrawCircleButton = function () {

                let drawCircle = new ol.interaction.Draw({
                    type: 'Circle',
                    source: customLocationFilterVector,
                    geometryFunction: ol.interaction.Draw.createRegularPolygon(40),
                });

                theMap.addInteraction(drawCircle);

                drawCircle.on ('drawstart',function() {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawCircle.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if(e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();
                    that.setState({customLocationFilterVectorExtent: drawExtent.getExtent()});

                    // Get all the features in the layer
                    let featuresInLayer = clusters.getSource().getFeatures();

                    // Check each feature
                    let loopFeatureExtent;
                    for (let j = 0; j < featuresInLayer.length; j++) {
                        loopFeatureExtent = featuresInLayer[j].getGeometry().getExtent();
                        // Only select the features within the shape
                        if (drawExtent.intersectsExtent(loopFeatureExtent)) {
                            selectPoints.push(featuresInLayer[j]);
                        }
                    }

                    let selectPointsLocations = [];

                    if (selectPoints.length > 0) {
                        for (let i = 0; i < selectPoints.length; i++) {
                            let selectPointFeatures = selectPoints[i].get('features');
                            for(let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if(!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }
                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();

                    that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

                });

            };

            if (drawCircleButton) {
                drawCircleButton.addEventListener('click', handleDrawCircleButton, false);
                drawCircleButton.addEventListener('touchstart', handleDrawCircleButton, false);
            }

            const drawElement = document.getElementById('ol-drawcirclecontrol');
            if (drawElement && drawCircleButton) {
                drawElement.className += ' ol-unselectable ol-control';
                drawElement.appendChild(drawCircleButton);

                ol.control.Control.call(this, {
                    element: drawElement,
                    target: options.target
                });
            }

        };

        // Add Draw Custom Button
        let appDrawCustom = window.app;
        appDrawCustom.drawCustomControl = function (opt_options) {
            let options = opt_options || {};
            const drawCustomButton = document.getElementById('drawCustomButton');

            let handleDrawCustomButton = function () {

                let drawCustom = new ol.interaction.Draw({
                    type: 'Polygon',
                    source: customLocationFilterVector,
                });

                theMap.addInteraction(drawCustom);

                drawCustom.on ('drawstart',function() {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawCustom.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if(e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();
                    that.setState({customLocationFilterVectorExtent: drawExtent.getExtent()});

                    // Get all the features in the layer
                    let featuresInLayer = clusters.getSource().getFeatures();

                    // Check each feature
                    let loopFeatureExtent;
                    for (let j = 0; j < featuresInLayer.length; j++) {
                        loopFeatureExtent = featuresInLayer[j].getGeometry().getExtent();
                        // Only select the features within the shape
                        if (drawExtent.intersectsExtent(loopFeatureExtent)) {
                            selectPoints.push(featuresInLayer[j]);
                        }
                    }

                    let selectPointsLocations = [];

                    if (selectPoints.length > 0) {
                        for (let i = 0; i < selectPoints.length; i++) {
                            let selectPointFeatures = selectPoints[i].get('features');
                            for(let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if(!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }
                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();

                    that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);
                });

            };

            if (drawCustomButton) {
                drawCustomButton.addEventListener('click', handleDrawCustomButton, false);
                drawCustomButton.addEventListener('touchstart', handleDrawCustomButton, false);
            }

            const drawElement = document.getElementById('ol-drawcustomcontrol');
            if (drawElement && drawCustomButton) {
                drawElement.className += ' ol-unselectable ol-control';
                drawElement.appendChild(drawCustomButton);

                ol.control.Control.call(this, {
                    element: drawElement,
                    target: options.target
                });
            }

        };

        ol.inherits(appDrawClear.drawClearControl, ol.control.Control);
        ol.inherits(appDrawSquare.drawSquareControl, ol.control.Control);
        ol.inherits(appDrawCircle.drawCircleControl, ol.control.Control);
        ol.inherits(appDrawCustom.drawCustomControl, ol.control.Control);

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
                new app.centerControl(),
                new appDrawCircle.drawCircleControl(),
                new appDrawSquare.drawSquareControl(),
                new appDrawCustom.drawCustomControl(),
                new appDrawClear.drawClearControl()
            ])
        });

        let selectItems = new ol.interaction.Select();
        theMap.addInteraction(selectItems);

        theMap.getView().on("change:resolution", function (e) {
            that.props.onMapChangeResolution(theMap, e);
        });


        theMap.on('singleclick', function (e) {
            selectItems.setActive(false);
            that.props.onMapSingleClick(theMap, e);
        });


        if(this.props.customLayers){
            this.props.customLayers.map(l=> theMap.addLayer(l));
        }

        this.setState({map: theMap});
    }

}

export default BasicMap;