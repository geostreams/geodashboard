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
import ol from 'openlayers';

require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {Icon} from 'react-mdc-web';
import type {MapProps, BasicMapState} from '../utils/flowtype';
import {getMapTileURLSetting, getClustersDistance, maxZoom, minZoom, mapCenter} from '../utils/getConfig';
import {clusteringOptions, getAttribution, getControls} from '../utils/mapUtils';
import {removePopup} from '../utils/mapPopup';


class BasicMap extends Component {
    centerButton: ?HTMLButtonElement;
    ol_centercontrol: ?HTMLButtonElement;
    drawCircleButton: ?HTMLButtonElement;
    ol_drawcirclecontrol: ?HTMLButtonElement;
    drawCustomButton: ?HTMLButtonElement;
    ol_drawsquarecontrol: ?HTMLButtonElement;
    drawSquareButton: ?HTMLButtonElement;
    ol_drawcustomcontrol: ?HTMLButtonElement;
    drawClearButton: ?HTMLButtonElement;
    ol_drawclearcontrol: ?HTMLButtonElement;
    state: BasicMapState;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            center: mapCenter(),
            vectorSource: new ol.source.Vector(),
            clusterSource: new ol.source.Cluster({distance: 1, source: new ol.source.Vector()}),
            customLocationFilterVectorExtent: [],
            currentZoom: 5.5,
            maxZoom: maxZoom(),
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
                <div id='map' className={styles.root}> </div>
                <div style={{display: 'none'}}>
                    <div id="marker" title="Marker" className="marker"> </div>
                    <div id="popup" className={styles.olPopup}>
                        <a href="#" id="popup-closer" className={styles.olPopupCloser}>
                            <Icon name="close"/>
                        </a>
                        <div id="popup-content"> </div>
                    </div>

                    <div id="ol-centercontrol" className={styles.olCenterButton}
                         ref={(div) => {
                             this.ol_centercontrol = div;
                         }}>
                    </div>
                    <button id="centerButton" title="Click to Center the Map"
                            ref={(button) => {
                                this.centerButton = button;
                            }}>
                        <Icon name="gps_fixed"/>
                    </button>

                    <div id="ol-drawcirclecontrol"
                         className={styles.olDrawCircleButton + ' ' + styles.olSharedDrawStyles + ' drawing_buttons'}
                         ref={(div) => {
                             this.ol_drawcirclecontrol = div;
                         }}>
                    </div>
                    <button id="drawCircleButton" title="Click to Draw a Circle"
                            ref={(button) => {
                                this.drawCircleButton = button;
                            }}>
                        <Icon name="panorama_fish_eye"/>
                    </button>

                    <div id="ol-drawsquarecontrol"
                         className={styles.olDrawSquareButton + ' ' + styles.olSharedDrawStyles + ' drawing_buttons'}
                         ref={(div) => {
                             this.ol_drawsquarecontrol = div;
                         }}>
                    </div>
                    <button id="drawSquareButton" title="Click to Draw a Square"
                            ref={(button) => {
                                this.drawSquareButton = button;
                            }}>
                        <Icon name="crop_square"/>
                    </button>

                    <div id="ol-drawcustomcontrol"
                         className={styles.olDrawCustomButton + ' ' + styles.olSharedDrawStyles + ' drawing_buttons'}
                         ref={(div) => {
                             this.ol_drawcustomcontrol = div;
                         }}>
                    </div>
                    <button id="drawCustomButton" title="Click to Draw a Custom Shape"
                            ref={(button) => {
                                this.drawCustomButton = button;
                            }}>
                        <Icon name="star_border"/>
                    </button>

                    <div id="ol-drawclearcontrol"
                         className={styles.olDrawClearButton + ' ' + styles.olSharedDrawStyles + ' drawing_buttons'}
                         ref={(div) => {
                             this.ol_drawclearcontrol = div;
                         }}>
                    </div>
                    <button id="drawClearButton" title="Click to Reset Drawing Selection"
                            ref={(button) => {
                                this.drawClearButton = button;
                            }}>
                        <Icon name="clear"/>
                    </button>
                </div>
            </div>
        );

    }

    componentDidUpdate() {
        let {features, disableClusters, mapDidUpdate} = this.props;
        mapDidUpdate(this.state.map, this.state.customLocationFilterVectorExtent);
        clusteringOptions(this.state.map, disableClusters);

        this.state.clusterSource.clear();
        this.state.clusterSource.addFeatures(features);
        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);
    }

    componentDidMount() {
        let {getCluster, mapDidMount, customLayers} = this.props;
        if (mapDidMount) {
            mapDidMount(this.state.map, this.state.customLocationFilterVectorExtent);
        }

        const clusterSource = new ol.source.Cluster({
            projection: "EPSG:3857",
            distance: getClustersDistance(),
            source: this.state.vectorSource
        });
        this.setState({clusterSource: clusterSource});

        let clusters = getCluster(clusterSource);
        clusters.setZIndex(1);

        let customLocationFilterVector = new ol.source.Vector();
        let customLocationFilterLayer = new ol.layer.Vector({
            source: customLocationFilterVector,
            name: 'drawing_layer'
        });

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: getAttribution(),
                    url: getMapTileURLSetting()
                })
            }),
            clusters,
            customLocationFilterLayer
        ];

        const container = document.getElementById('popup');
        const closer = document.getElementById('popup-closer');

        let overlay = new ol.Overlay({
            id: "marker",
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        let view = new ol.View({
            projection: 'EPSG:3857',
            center: ol.proj.fromLonLat(this.state.center),
            zoom: this.state.currentZoom,
            minZoom: minZoom(),
            maxZoom: this.state.maxZoom
        });

        let theMap;

        const that = this;

        // If the User clicks the closing 'X' Button in Popups opened from the
        // - Map Points: The view WILL NOT reset and recenter
        // - Accordions: The view WILL reset and recenter
        if (closer) {
            closer.onclick = function () {
                that.props.onMapSingleClick(theMap);
                removePopup(theMap);
                return false;
            };
        }

        let centerControl;

        const centerButton = this.centerButton;
        let element = this.ol_centercontrol;

        let handleCenterButton = function () {
            view.fit(that.state.vectorSource.getExtent(), that.state.map.getSize());
        };

        if (centerButton && element) {
            centerButton.addEventListener('click', handleCenterButton, false);
            centerButton.addEventListener('touchstart', handleCenterButton, false);


            element.className += ' ol-unselectable ol-control';
            element.appendChild(centerButton);

            centerControl = new ol.control.Control({
                element: element
            });
        }

        let drawClearControl;
        let selectPoints = [];

        // Add Draw Clear/Reset Button
        const drawClearButton = this.drawClearButton;
        let drawElement = this.ol_drawclearcontrol;

        let resetDrawPoints = function () {

            customLocationFilterLayer.getSource().clear();

            // Create empty array for points
            let selectPointsLocations = [];

            // Set this for resetting the points
            selectPointsLocations[0] = 'reset_points';

            // Get the shape coordinates
            let drawCoordinates = [];

            // This is the button that will reset the points
            that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

            // Reset the State Variable
            that.setState({customLocationFilterVectorExtent: []});

            let keep_draw_active = document.getElementById('draw');
            if (keep_draw_active) {
                keep_draw_active.click();
            }

        };

        let drawEndSharedSteps = function (e) {

            customLocationFilterLayer.getSource().clear();
            selectItems.setActive(true);

            theMap.getInteractions().forEach(function (e) {
                if (e instanceof ol.interaction.Draw) {
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
                    for (let j = 0; j < selectPointFeatures.length; j++) {
                        let featureName = selectPointFeatures[j].attributes.name;
                        if (!selectPointsLocations.includes(featureName.toString())) {
                            selectPointsLocations.push(featureName);
                        }
                    }
                }
            }

            return [drawExtent, selectPointsLocations];

        };

        let handleDrawClearButton = function () {
            theMap.getInteractions().forEach(function (e) {
                if (e instanceof ol.interaction.Draw) {
                    theMap.removeInteraction(e);
                }
            });

            resetDrawPoints();

        };

        if (drawElement && drawClearButton) {

            drawClearButton.addEventListener('click', handleDrawClearButton, false);
            drawClearButton.addEventListener('touchstart', handleDrawClearButton, false);

            drawElement.className += ' ol-unselectable ol-control';
            drawElement.appendChild(drawClearButton);

            drawClearControl = new ol.control.Control({
                element: drawElement,
            });

        }

        // Add Draw Square Button
        let drawSquareControl;
        const drawSquareButton = this.drawSquareButton;
        drawElement = this.ol_drawsquarecontrol;

        let handleDrawSquareButton = function () {

            let drawSquare = new ol.interaction.Draw({
                type: 'Circle',
                source: customLocationFilterVector,
                geometryFunction: ol.interaction.Draw.createRegularPolygon(4),
            });

            resetDrawPoints();

            theMap.addInteraction(drawSquare);

            drawSquare.on('drawstart', function () {
                selectItems.setActive(false);
                selectPoints = [];
            });

            drawSquare.on('drawend', function (e) {
                let drawExtent = drawEndSharedSteps(e)[0];
                let selectPointsLocations = drawEndSharedSteps(e)[1];

                // Get the shape coordinates
                let drawCoordinates = drawExtent.getCoordinates();
                that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

            });

        };

        if (drawElement && drawSquareButton) {

            drawSquareButton.addEventListener('click', handleDrawSquareButton, false);
            drawSquareButton.addEventListener('touchstart', handleDrawSquareButton, false);
            drawElement.className += ' ol-unselectable ol-control';
            drawElement.appendChild(drawSquareButton);

            drawSquareControl = new ol.control.Control({
                element: drawElement,
            });
        }

        // Add Draw Circle Button
        let drawCircleControl;
        const drawCircleButton = this.drawCircleButton;
        drawElement = this.ol_drawcirclecontrol;

        let handleDrawCircleButton = function () {

            let drawCircle = new ol.interaction.Draw({
                type: 'Circle',
                source: customLocationFilterVector,
            });

            resetDrawPoints();

            theMap.addInteraction(drawCircle);

            drawCircle.on('drawstart', function () {
                selectItems.setActive(false);
                selectPoints = [];
            });

            drawCircle.on('drawend', function (e) {
                let drawExtent = drawEndSharedSteps(e)[0];
                let selectPointsLocations = drawEndSharedSteps(e)[1];

                // Get the shape coordinates
                // (1) Get the Units for the Map Projection
                let units = theMap.getView().getProjection().getUnits();
                // (2) Get the Center Point of the Circle
                let drawCenter = drawExtent.getCenter();
                // (3) Get the Radius of the Circle in Meters
                let drawRadius = (drawExtent.getRadius() * ol.proj.METERS_PER_UNIT[units]) / 1000;
                // Assemble the Coordinates for the API call
                let drawCoordinates = [drawCenter.concat(drawRadius)];
                // Call the appropriate function
                that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

            });

        };

        if (drawElement && drawCircleButton) {
            drawCircleButton.addEventListener('click', handleDrawCircleButton, false);
            drawCircleButton.addEventListener('touchstart', handleDrawCircleButton, false);
            drawElement.className += ' ol-unselectable ol-control';
            drawElement.appendChild(drawCircleButton);

            drawCircleControl = new ol.control.Control({
                element: drawElement,
            });
        }

        // Add Draw Custom Button
        let drawCustomControl;
        const drawCustomButton = this.drawCustomButton;
        drawElement = this.ol_drawcustomcontrol;

        let handleDrawCustomButton = function () {

            let drawCustom = new ol.interaction.Draw({
                type: 'Polygon',
                source: customLocationFilterVector,
            });

            resetDrawPoints();

            theMap.addInteraction(drawCustom);

            drawCustom.on('drawstart', function () {
                selectItems.setActive(false);
                selectPoints = [];
            });

            drawCustom.on('drawend', function (e) {
                let drawExtent = drawEndSharedSteps(e)[0];
                let selectPointsLocations = drawEndSharedSteps(e)[1];

                // Get the shape coordinates
                let drawCoordinates = drawExtent.getCoordinates();
                that.props.selectShapeLocation(selectPointsLocations, drawCoordinates);

            });

        };

        if (drawCustomButton && drawElement) {
            drawCustomButton.addEventListener('click', handleDrawCustomButton, false);
            drawCustomButton.addEventListener('touchstart', handleDrawCustomButton, false);
            drawElement.className += ' ol-unselectable ol-control';
            drawElement.appendChild(drawCustomButton);

            drawCustomControl = new ol.control.Control({
                element: drawElement,
            });
        }

        theMap = new ol.Map({
            target: 'map',
            layers: layers,
            view: view,
            overlays: [overlay],
            controls: getControls()
        });

        theMap.addControl(centerControl);
        theMap.addControl(drawClearControl);
        theMap.addControl(drawSquareControl);
        theMap.addControl(drawCircleControl);
        theMap.addControl(drawCustomControl);

        let selectItems = new ol.interaction.Select({
            layers: [customLocationFilterLayer]
        });
        theMap.addInteraction(selectItems);

        theMap.getView().on("change:resolution", function (e) {
            that.props.onMapChangeResolution(theMap, e);
        });

        theMap.on('singleclick', function (e) {
            selectItems.setActive(false);
            that.props.onMapSingleClick(theMap, e);
        });

        theMap.on('pointerdrag', function (e) {
            removePopup(theMap);
        });

        if (customLayers) {
            customLayers.map(l => theMap.addLayer(l));
        }

        this.setState({map: theMap});
    }
}

export default BasicMap;