/*
 * @flow
 */

import React, {Component} from 'react';
import ol from 'openlayers';

require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {Icon} from 'react-mdc-web/lib';
import {
    getCustomTrendRegion, getTrendColor, getMapTileURLSetting, maxZoom,
    getAnalysisLayersDetails, getAnalysisAvailableLayers
} from '../utils/getConfig';
import {sensorsToFeaturesAnalysisPage, getAttribution, getControls} from '../utils/mapUtils';
import {popupHeader, popupAnalysis, removePopup} from '../utils/mapPopup';
import {drawHelper, centerHelper} from '../utils/mapDraw';
import type {MapProps, TrendsMapState} from '../utils/flowtype';


class AnalysisMap extends Component {

    state: TrendsMapState;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            center: [-84.44799549, 38.9203417],
            vectorSource: new ol.source.Vector,
            clusterSource: new ol.source.Cluster({distance: 1, source: new ol.source.Vector}),
            areaPolygonSource: new ol.source.Vector,
            currentZoom: 5.5,
            maxZoom: maxZoom(),
            openMenu: false,
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
            }),
            openAboutButton: false
        }
    }

    render() {

        return (
            <div>
                <div id='map' className={styles.root}> </div>
                <div id="trends_legend" className={styles.trends_legend}> </div>
                <div id="search" style={{position: 'absolute', bottom: '10px', left: '25em', padding: '5px'}}>
                    <button id="centerButton"><Icon name="gps_fixed"/></button>
                </div>
                <div style={{display: "none"}}>

                    <div id="marker" title="Marker" className="marker"> </div>
                    <div id="popup" className={styles.olPopup}>
                        <a href="#" id="popup-closer" className={styles.olPopupCloser}>
                            <Icon name="close"/>
                        </a>
                        <div id="popup-content"> </div>
                    </div>
                    <div id="ol-drawcirclecontrol"
                         className={styles.olDrawCircleButton + ' ' +
                         styles.olSharedDrawStyles + ' drawing_buttons'}> </div>
                    <button id="drawCircleButton" title="Click to Draw a Circle">
                        <Icon name="panorama_fish_eye"/></button>

                    <div id="ol-drawsquarecontrol"
                         className={styles.olDrawSquareButton + ' ' +
                         styles.olSharedDrawStyles + ' drawing_buttons'}> </div>
                    <button id="drawSquareButton" title="Click to Draw a Square">
                        <Icon name="crop_square"/></button>

                    <div id="ol-drawcustomcontrol"
                         className={styles.olDrawCustomButton + ' ' +
                         styles.olSharedDrawStyles + ' drawing_buttons'}> </div>
                    <button id="drawCustomButton" title="Click to Draw a Custom Shape">
                        <Icon name="star_border"/></button>

                    <div id="ol-drawclearcontrol"
                         className={styles.olDrawClearButton + ' ' +
                         styles.olSharedDrawStyles + ' drawing_buttons'}> </div>
                    <button id="drawClearButton" title="Click to Reset Drawing Selection">
                        <Icon name="clear"/></button>

                </div>
            </div>
        );

    }

    selectShapeLocation(event: Array<string>) {
        this.props.onSelectShapeLocationTrend(event);
    }

    popupHandler(feature: ol.Feature, coordinate: number[]) {
        const content = document.getElementById('popup-content');
        if (feature && feature.getId()) {

            let popupText = popupHeader(feature, styles) + popupAnalysis(feature, styles);

            if (content) {
                content.innerHTML = popupText;
            }
            let overlay = this.state.map.getOverlayById("marker");
            overlay.setPosition(coordinate);
        }
    }

    componentDidUpdate() {

        let {threshold_value, trendSensors, parameters, selectedParameter} = this.props;

        let features;
        let copyOfMap = this.state.map;
        let that = this;

        drawHelper(copyOfMap, true, that.selectShapeLocation.bind(this), that.props.drawn_sensors);

        let area;
        let feature = new ol.Feature();
        let region_features = [];

        // This is for the Region Outlines for one Region at a time
        if (that.props.selectedRegion !== 'all' && that.props.selectedRegion !== 'draw') {
            area = getCustomTrendRegion(that.props.selectedRegion);
            if (area && area.geometry) {
                feature = new ol.Feature({
                    geometry: new ol.geom.Polygon(area.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857')
                });
                region_features.push(feature);
            }
        }

        this.state.areaPolygonSource.clear();
        this.state.areaPolygonSource.addFeatures(region_features);

        features = sensorsToFeaturesAnalysisPage(trendSensors, selectedParameter, threshold_value, parameters);

        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        if (area) {
            this.state.map.getView().fit(
                this.state.areaPolygonSource.getExtent(), this.state.map.getSize());
        } else {
            if (features.length > 0) {
                this.state.map.getView().fit(
                    this.state.vectorSource.getExtent(), this.state.map.getSize());
            }
        }

    }

    componentDidMount() {

        let {threshold, sensors, parameters, selectedParameter} = this.props;

        let features = sensorsToFeaturesAnalysisPage(
            sensors, selectedParameter, threshold, parameters);

        let vectorSource = new ol.source.Vector({
            features: features
        });

        const clusterSource = new ol.source.Cluster({
            distance: 1,
            source: this.state.vectorSource
        });

        let clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function (feature) {
                let style;

                const trend_type = feature.getProperties().features[0].attributes.trend_type;
                if (trend_type === "trendUp") {
                    style = (new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type === "trendDown") {
                    style = (new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            rotation: 3.141592654,
                            fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type === "overThresholdUp") {
                    style = (new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type === "overThresholdDown") {
                    style = (new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            rotation: 3.141592654,
                            fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type === "noTrend" || trend_type === "") {
                    style = (new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 4,
                            fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                }

                return style;

            }
        });

        let customLocationFilterVector = new ol.source.Vector();
        let customLocationFilterLayer = new ol.layer.Vector({
            source: customLocationFilterVector,
            name: 'drawing_layer'
        });

        clusters.setZIndex(1);

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

        if (closer) {
            closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
        }

        let view = new ol.View({
            projection: 'EPSG:3857',
            center: ol.proj.fromLonLat(this.state.center),
            zoom: this.state.currentZoom,
            minZoom: 5.5,
            maxZoom: this.state.maxZoom
        });
        let theMap;

        window.app = {};

        let selectPoints = [];

        const that = this;

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

                // This is the button that will reset the points
                that.selectShapeLocation(selectPointsLocations);

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

                    that.selectShapeLocation(selectPointsLocations);

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

                    that.selectShapeLocation(selectPointsLocations);

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

                    that.selectShapeLocation(selectPointsLocations);

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
            controls: getControls().extend([
                new appDrawCircle.drawCircleControl(),
                new appDrawSquare.drawSquareControl(),
                new appDrawCustom.drawCustomControl(),
                new appDrawClear.drawClearControl()
            ])
        });

        let selectItems = new ol.interaction.Select();
        theMap.addInteraction(selectItems);

        theMap.getView().on("change:resolution", function () {
            if (closer) {
                overlay.setPosition(undefined);
                closer.blur();
            }
        });

        theMap.on('singleclick', function (e) {
            selectItems.setActive(false);
            let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
                return featureChange;
            });
            if (featuresAtPixel && featuresAtPixel.get('features')
                !== undefined && featuresAtPixel.get('features').length === 1) {
                const feature = featuresAtPixel.get('features')[0];
                that.popupHandler(feature, e.coordinate);
            } else {
                // Case when the click is anywhere else in the map
                if (closer) {
                    overlay.setPosition(undefined);
                    closer.blur();
                }
            }
        });

        theMap.on('pointerdrag', function (e) {
            removePopup(theMap);
        });

        const trends_legend_var = document.getElementById('trends_legend');

        const noTrendArrow = '<p class=' + styles.noValueLegend + ' style="background: ' +
            getTrendColor("noTrend") + '; border-color: ' +
            getTrendColor("noTrend") + '; margin-left: 1em;"></p>';

        const trendUpArrow = '<p class=' + styles.upArrowLegend + ' style="border-color: ' +
            getTrendColor("trendUp") + '; margin-left: 1em; "></p>';

        const trendDownArrow = '<p class=' + styles.downArrowLegend + ' style="border-color: ' +
            getTrendColor("trendDown") + '; margin-left: 1em;"></p>';

        const overThresholdUpArrow = '<p class=' + styles.upArrowLegend + ' style="border-color: ' +
            getTrendColor("overThresholdUp") + ';"></p>';

        const overThresholdDownArrow = '<p class=' + styles.downArrowLegend + ' style="border-color: ' +
            getTrendColor("overThresholdDown") + ';"></p>';

        if (trends_legend_var) {
            trends_legend_var.innerHTML =
                (
                    '<div class=' + styles.trends_legend_text + '>' +
                    trendUpArrow + ' - Trending Up <br/>' +
                    trendDownArrow + ' - Trending Down <br/>' +
                    noTrendArrow + ' - No Data Available <br/>' +
                    overThresholdUpArrow + overThresholdDownArrow + ' - Over Threshold  <br/>' +
                    '</div>'
                );
        }

        let areaPolygonSource = new ol.source.Vector({
            features: [
                new ol.Feature({})
            ]
        });

        // This is for the Region Outlines
        let areaPolygonLayer = new ol.layer.Vector({
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

        let analysisLayers = [];
        let analysisLayersDetails = getAnalysisLayersDetails();
        let layersVisibility = getAnalysisAvailableLayers();

        if (analysisLayersDetails) {
            analysisLayersDetails.map(layerDetails => {
                if (layersVisibility) {
                    let index = layersVisibility.findIndex(
                        layer_visibility => layer_visibility.title === layerDetails.title
                    );

                    if (index > -1 && layersVisibility[index].visibility === true) {
                        analysisLayers.push(
                            new ol.layer.Image({
                                source: new ol.source.ImageWMS({
                                    url: layerDetails.wms,
                                    params: {'LAYERS': layerDetails.id},
                                }),
                                name: layerDetails.title,
                                opacity: layersVisibility[index].opacity,
                                visible: true
                            })
                        )
                    }
                    else if (index > -1 && layersVisibility[index].visibility === false) {
                        analysisLayers.push(
                            new ol.layer.Image({
                                name: layerDetails.title,
                                visible: false
                            })
                        )
                    }
                }
            });
        }

        if (analysisLayers.length > 0) {
            let all_map_layers = this.state.map.getLayers().getArray().slice();
            all_map_layers.map(map_layer => {
                let layer_name = map_layer.get('name');
                analysisLayers.map(analysis_layer_remove => {
                    let analysis_layer_name = analysis_layer_remove.get('name');
                    if (analysis_layer_name === layer_name) {
                        theMap.removeLayer(map_layer);
                    }
                });
            });

            analysisLayers.map(analysis_layer_add => {
                let analysis_layers_visibility = analysis_layer_add.get('visible');
                if (analysis_layers_visibility === true) {
                    theMap.addLayer(analysis_layer_add);
                }
            });
        }

        this.setState(
            {
                clusterSource: clusterSource,
                areaPolygonSource: areaPolygonSource,
                map: theMap
            }
        );
    }

}

export default AnalysisMap;