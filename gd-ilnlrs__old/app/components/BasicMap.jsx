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
import {Icon} from 'react-mdc-web/lib';
import type {MapProps, BasicMapState} from '../utils/flowtype';
import {getMapTileURLSetting, getClustersDistance, maxZoom, minZoom, mapCenter} from '../utils/getConfig';
import {clusteringOptions, getAttribution, getControls} from '../utils/mapUtils';
import {removePopup} from '../utils/mapPopup';
import {drawClearButtonFunction, drawControlElements} from '../utils/mapDraw';


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
            clusterSource: new ol.source.Cluster({distance: 60, source: new ol.source.Vector()}),
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
        if (this.state.map.getSize() !== undefined) {
            mapDidUpdate(this.state.map, this.state.customLocationFilterVectorExtent);
            clusteringOptions(this.state.map, disableClusters);
        }

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

        let mapTiles = new ol.layer.Tile({
            source: new ol.source.XYZ({
                attributions: getAttribution(),
                url: getMapTileURLSetting()
            })
        });

        let layers = [
            mapTiles,
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
            removePopup(theMap);
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

        // Shared Draw Variables
        let drawClearControl, drawCircleControl, drawSquareControl, drawCustomControl;
        let selectPoints = [];
        let selectPointsLocations = '';
        let returnCustomLocationFilterVectorExtent;

        theMap = new ol.Map({
            target: 'map',
            layers: layers,
            view: view,
            overlays: [overlay],
            controls: getControls()
        });

        // The Map requires the interaction for the Draw Buttons
        let selectItems = new ol.interaction.Select({
            layers: [customLocationFilterLayer]
        });
        theMap.addInteraction(selectItems);

        // Add Draw Clear/Reset Button
        that.setState({customLocationFilterVectorExtent: []});
        [returnCustomLocationFilterVectorExtent, drawClearControl] =
            drawClearButtonFunction(
                this.drawClearButton, this.ol_drawclearcontrol, theMap,
                customLocationFilterLayer, this.props.selectShapeLocation
            );
        that.setState({customLocationFilterVectorExtent: returnCustomLocationFilterVectorExtent});

        // Add Draw Circle Button
        that.setState({customLocationFilterVectorExtent: []});
        [returnCustomLocationFilterVectorExtent, drawCircleControl] =
            drawControlElements('circle', 0, 'Circle',
                this.drawCircleButton, this.ol_drawcirclecontrol, customLocationFilterVector, selectPoints, clusters,
                customLocationFilterLayer, this.props.selectShapeLocation, theMap, selectItems, selectPointsLocations,
            );
        that.setState({customLocationFilterVectorExtent: returnCustomLocationFilterVectorExtent});

        // Add Draw Square Button
        that.setState({customLocationFilterVectorExtent: []});
        [returnCustomLocationFilterVectorExtent, drawSquareControl] =
            drawControlElements('square', 4, 'Circle',
                this.drawSquareButton, this.ol_drawsquarecontrol, customLocationFilterVector, selectPoints, clusters,
                customLocationFilterLayer, this.props.selectShapeLocation, theMap, selectItems, selectPointsLocations,
            );
        that.setState({customLocationFilterVectorExtent: returnCustomLocationFilterVectorExtent});

        // Add Draw Custom Button
        that.setState({customLocationFilterVectorExtent: []});
        [returnCustomLocationFilterVectorExtent, drawCustomControl] =
            drawControlElements('custom', 4, 'Polygon',
                this.drawCustomButton, this.ol_drawcustomcontrol, customLocationFilterVector, selectPoints, clusters,
                customLocationFilterLayer, this.props.selectShapeLocation, theMap, selectItems, selectPointsLocations,
            );
        that.setState({customLocationFilterVectorExtent: returnCustomLocationFilterVectorExtent});

        // Add the Controls to the Map
        theMap.addControl(centerControl);
        theMap.addControl(drawClearControl);
        theMap.addControl(drawSquareControl);
        theMap.addControl(drawCircleControl);
        theMap.addControl(drawCustomControl);

        theMap.getView().on("change:resolution", function (e) {
            that.props.onMapChangeResolution(theMap, e);
        });

        theMap.on('singleclick', function (e) {
            // Always remove previous popup if it is open
            removePopup(theMap);
            selectItems.setActive(false);
            that.props.onMapSingleClick(theMap, e);
        });

        theMap.on('pointerdrag', function (e) {
            removePopup(theMap);
            that.props.onMapSingleClick(theMap, e, true);
        });

        if (customLayers) {
            customLayers.map(l => theMap.addLayer(l));
        }

        this.setState({map: theMap});
    }
}

export default BasicMap;
