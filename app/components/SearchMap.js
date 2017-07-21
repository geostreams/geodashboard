/*
 * @flow
 */

import React, {Component} from 'react';
let ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css'
import {Icon} from 'react-mdc-web'
import {getSourceName, getParameterName, getCustomLocation, getTrendColor, getColor} from '../utils/getConfig'
import {popupHelper, sensorsToFeatures, getMultiLineLayer, getAttribution} from '../utils/mapUtils'
import {drawHelper, centerHelper} from '../utils/mapAction'

import type {Sensors, MapState, MapProps} from '../utils/flowtype'


class SearchMap extends Component {
    state: MapState;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            center: [-84.44799549, 38.9203417],
            vectorSource: new ol.source.Vector,
            clusterSource: new ol.source.Cluster({distance: 1, source: new ol.source.Vector}),
            multiLineLayer: new ol.layer.Vector,
            multiLineString: new ol.geom.MultiLineString,
            expandedClusterLayer: new ol.layer.Vector,
            areaPolygonSource: new ol.source.Vector,
            expandedCluster: false,
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
                <div id="search" style={{position: 'absolute', bottom: '10px', left: '25em', padding: '5px'}}>
                    <button id="centerButton"><Icon name="gps_fixed"/></button>
                </div>

                <div style={{display: "none"}}>
                    <div id="marker" title="Marker" className="marker"></div>
                    <div id="popup" className={styles.olPopup}>
                        <a href="#" id="popup-closer" className={styles.olPopupCloser}></a>
                        <div id="popup-content"></div>
                    </div>

                    <div id="ol-drawcirclecontrol"
                         className={styles.olDrawCircleButton + ' ' +
                        styles.olSharedDrawStyles + ' drawing_buttons'}></div>
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
             </div>
        );

    }

    selectShapeLocation(event:Array<string>, drawExtent: Array<number>) {
            this.props.onSelectShapeLocation(event, drawExtent);
    }

    displayOverlappingMarkers(featuresAtPixel: ol.features, theMap) {
        const multiLineLayers = getMultiLineLayer(featuresAtPixel, theMap);
        const multiLineLayer = multiLineLayers[0];
        const newFeaturesLayer = multiLineLayers[1];
        theMap.addLayer(newFeaturesLayer);
        theMap.addLayer(multiLineLayer);
        const currentZoom = theMap.getView().getZoom();

        this.setState({currentZoom: currentZoom, multiLineString: multiLineString,
            expandedClusterLayer: newFeaturesLayer, multiLineLayer: multiLineLayer, expandedCluster: true})
    }

    removeSpiderfiedClusterLayers(theMap) {
        theMap.removeLayer(this.state.expandedClusterLayer);
        theMap.removeLayer(this.state.multiLineLayer);
    }

    popupHandler(feature: ol.Feature, coordinate: number[]) {
        const content = document.getElementById('popup-content');
        if (feature && feature.getId()) {

            let popupText = popupHelper(feature, styles);

            if (content) {
                content.innerHTML = popupText;
            }
            let overlay = this.state.map.getOverlayById("marker");
            overlay.setPosition(coordinate);
        }

    }

    componentDidUpdate() {
        // FIXME: this does not get called all the time
        // Try switching API and quickly switching to the search page
        let features;

        let copyOfMap = this.state.map;

        let that = this;

        drawHelper(copyOfMap, false, that);

        console.log("Map component got new props");
        features = sensorsToFeatures(this.props.updateSensors);
        // add polygon according to  selected location



        this.state.clusterSource.clear();
        this.state.clusterSource.addFeatures(features);
        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        const area = getCustomLocation(that.props.selectedLocation);
        var feature = new ol.Feature();
        if (area && area.geometry) {
            feature = new ol.Feature({geometry: new ol.geom.Polygon(area.geometry.coordinates)});
        }

        this.state.areaPolygonSource.clear();
        this.state.areaPolygonSource.addFeatures([feature]);


        if (this.state.vectorSource.getFeatures().length > 0) {
            // Turn off auto zoom for Trends
            if (!this.state.expandedCluster){
                this.state.map.getView().fit(this.state.vectorSource.getExtent(), this.state.map.getSize());
            }
        }

    }

    componentDidMount() {

        let features = sensorsToFeatures(this.props.sensors);

        let vectorSource = new ol.source.Vector({
            features: features
        });
        //this.setState({vectorSource: vectorSource});


        const clusterSource = new ol.source.Cluster({
            distance: 1,
            source: this.state.vectorSource
        });
        this.setState({clusterSource: clusterSource});

        let clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function (feature) {
                let size = feature.get('features').length;
                let style;

                if (size > 1) {
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            stroke: new ol.style.Stroke({
                                color: '#fff'
                            }),
                            fill: new ol.style.Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#fff'
                            })
                        })
                    });
                } else {

                    let featureColor = feature.getProperties().features[0].attributes.color;
                    let iconSvg = '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
                        + '<g class="marker-g">'
                        + '<path d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke="black" stroke-width="1" fill="white" />'
                        + '	<ellipse cx="7.5" cy="8.5" rx="4.5" ry="5.5" class="map-pin-color" style="fill:' +
                        featureColor + '"/>'
                        + '<path class="mouseCapture" d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke-width="1" opacity="0"/>'
                        + '</g>'
                        + '</svg>';

                    style = (new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: 'data:image/svg+xml;utf8,' + iconSvg,
                        })

                    }));
                }

                return style;

            }
        });
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
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
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

        let selectPoints = [];

        const that = this;
        window.app = {};


        // Add Draw Clear/Reset Button
        let appDrawClear = window.app;
        appDrawClear.drawClearControl = function (opt_options) {
            let options = opt_options || {};
            const drawClearButton = document.getElementById('drawClearButton');

            let handleDrawClearButton = function () {
                theMap.getInteractions().forEach(function (e) {
                    if (e instanceof ol.interaction.Draw) {
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
                that.selectShapeLocation(selectPointsLocations, drawCoordinates);

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

                drawSquare.on('drawstart', function () {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawSquare.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if (e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();

                    // Zoom to shape
                    view.fit(drawExtent.getExtent(), theMap.getSize());

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
                            for (let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if (!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }

                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();

                    that.selectShapeLocation(selectPointsLocations, drawCoordinates);

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

                drawCircle.on('drawstart', function () {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawCircle.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if (e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();

                    // Zoom to shape
                    view.fit(drawExtent.getExtent(), theMap.getSize());

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
                            for (let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if (!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }

                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();

                    that.selectShapeLocation(selectPointsLocations, drawCoordinates);

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

                drawCustom.on('drawstart', function () {
                    selectItems.setActive(false);
                    selectPoints = [];
                });

                drawCustom.on('drawend', function (e) {
                    customLocationFilterLayer.getSource().clear();
                    selectItems.setActive(true);

                    theMap.getInteractions().forEach(function (e) {
                        if (e instanceof ol.interaction.Draw) {
                            theMap.removeInteraction(e);
                        }
                    });

                    // Get the shape geometry
                    let drawExtent = e.feature.getGeometry();

                    // Zoom to shape
                    view.fit(drawExtent.getExtent(), theMap.getSize());

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
                            for (let j = 0; j < selectPointFeatures.length; j++) {
                                let featureName = selectPointFeatures[j].attributes.name;
                                if (!selectPointsLocations.includes(featureName.toString())) {
                                    selectPointsLocations.push(featureName);
                                }
                            }
                        }
                    }

                    // Get the shape coordinates
                    let drawCoordinates = drawExtent.getCoordinates();

                    that.selectShapeLocation(selectPointsLocations, drawCoordinates);

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
                //new app.centerControl(),
                new appDrawCircle.drawCircleControl(),
                new appDrawSquare.drawSquareControl(),
                new appDrawCustom.drawCustomControl(),
                new appDrawClear.drawClearControl(),
            ])
        });


        let selectItems = new ol.interaction.Select();
        theMap.addInteraction(selectItems);

        theMap.getView().on("change:resolution", function () {
            if (closer) {
                overlay.setPosition(undefined);
                closer.blur();
            }
            if (that.state.expandedCluster) {
                that.removeSpiderfiedClusterLayers(theMap);
            }
        });

        let fill = new ol.style.Fill({color: [255, 255, 255, 1]}),
            stroke = new ol.style.Stroke({color: [0, 0, 0, 1]});


        theMap.on('singleclick', function (e) {
            selectItems.setActive(false);

            let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
                return featureChange;
            });

            // If a cluster is expanded we want to close it, unless there was a click in one of the features that is expanded
            let closeClusters = true;
            if (featuresAtPixel && ((featuresAtPixel.attributes && featuresAtPixel.attributes.type == "single"))) {
                // Case when a feature is expanded
                that.popupHandler(featuresAtPixel, e.coordinate);
                closeClusters = false;
            } else if (featuresAtPixel && featuresAtPixel.get('features') != undefined && featuresAtPixel.get('features').length == 1) {
                // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
                const feature = featuresAtPixel.get('features')[0];
                that.popupHandler(feature, e.coordinate);
            } else if (featuresAtPixel && featuresAtPixel.get('features') != undefined && featuresAtPixel.get('features').length > 1) {
                // Case when a clustered was click. If it has more than 4 features and is in a zoom level lower than maxZoom, zoom in
                // if(featuresAtPixel.get('features').length > 4 && theMap.getView().getZoom() < that.state.maxZoom) {
                //     theMap.getView().setZoom(theMap.getView().getZoom() + 1);
                //     theMap.getView().setCenter(featuresAtPixel.get('features')[0].getGeometry().getCoordinates());
                // } else {
                if (that.state.expandedCluster) {
                    that.removeSpiderfiedClusterLayers(theMap);
                }
                that.displayOverlappingMarkers(featuresAtPixel, theMap, that);
                closeClusters = false;

                // }

            } else {
                // Case when the click is anywhere else in the map
                if (closer) {
                    overlay.setPosition(undefined);
                    closer.blur();
                }

            }
            if (closeClusters && that.state.expandedCluster) {
                that.removeSpiderfiedClusterLayers(theMap);
            }

        });


        var areaPolygonSource = new ol.source.Vector({
            features: [
                new ol.Feature({})
            ]
        });

        this.setState({areaPolygonSource: areaPolygonSource});

        var areaPolygonLayer = new ol.layer.Vector({
            id: "areaPolygon",
            source: areaPolygonSource,
            style: [
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 152, 254, 1)',
                        width: 2
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(254, 254, 254, 0.3)'
                    })
                })
            ]
        });
        theMap.addLayer(areaPolygonLayer);

        centerHelper(view, vectorSource, theMap);
        this.setState({map: theMap});
    }

}

export default SearchMap