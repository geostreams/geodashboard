/*
 * @flow
 */

import React, {Component} from 'react';
import ol from 'openlayers';

require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {getCustomLocation, getMobileSizeMax} from '../utils/getConfig';
import {sensorsToFeatures, getMultiLineLayer} from '../utils/mapUtils';
import {drawHelper} from '../utils/mapDraw';
import {popupHeader, popupParameters, removePopup} from '../utils/mapPopup';
import BasicMap from './BasicMap';
import type {InputEventMap} from '../utils/flowtype';


class SearchMap extends Component {
    state: {
        multiLineLayer: ol.layer.Vector,
        multiLineString: ol.geom.MultiLineString,
        expandedClusterLayer: ol.layer.Vector,
        expandedCluster: boolean,
        areaPolygonSource: ol.source.Vector,
        customLocationFilterVectorExtent: Array<number>
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            multiLineLayer: new ol.layer.Vector,
            multiLineString: new ol.geom.MultiLineString,
            expandedClusterLayer: new ol.layer.Vector,
            areaPolygonSource: new ol.source.Vector,
            expandedCluster: false,
            customLocationFilterVectorExtent: []
        }
    }

    selectShapeLocation = (selectPointsLocations: Array<string>, drawExtent: Array<number>) => {
        let {onSelectShapeLocation} = this.props;
        onSelectShapeLocation(selectPointsLocations, drawExtent);
    };

    displayOverlappingMarkers = (featuresAtPixel: ol.features, theMap: ol.Map) => {
        const multiLineLayers = getMultiLineLayer(featuresAtPixel, theMap);
        const multiLineLayer = multiLineLayers[0];
        const newFeaturesLayer = multiLineLayers[1];
        theMap.addLayer(newFeaturesLayer);
        theMap.addLayer(multiLineLayer);

        this.setState({
            expandedClusterLayer: newFeaturesLayer, multiLineLayer: multiLineLayer, expandedCluster: true
        })
    };

    removeSpiderfiedClusterLayers = (theMap: ol.Map) => {
        theMap.removeLayer(this.state.expandedClusterLayer);
        theMap.removeLayer(this.state.multiLineLayer);
    };

    popupHandler = (theMap: ol.Map, e: InputEventMap) => {
        const that = this;
        const overlay = theMap.getOverlayById("marker");
        if (typeof e !== 'undefined') {
            let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
                return featureChange;
            });

            // If a cluster is expanded we want to close it, unless there was a click in one of the features that is expanded
            let closeClusters = true;
            if (featuresAtPixel && ((featuresAtPixel.attributes && featuresAtPixel.attributes.type === "single"))) {
                // Case when a feature is expanded
                that.popupHandleHelper(featuresAtPixel, e.coordinate, overlay);
                closeClusters = false;
            } else if (featuresAtPixel && featuresAtPixel.get('features') !== undefined && featuresAtPixel.get('features').length === 1) {
                // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
                const feature = featuresAtPixel.get('features')[0];
                that.popupHandleHelper(feature, e.coordinate, overlay);
            } else if (featuresAtPixel && featuresAtPixel.get('features') !== undefined && featuresAtPixel.get('features').length > 1) {
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
                removePopup(theMap)

            }
            if (closeClusters && that.state.expandedCluster) {
                that.removeSpiderfiedClusterLayers(theMap);
            }
        }
    };

    popupHandleHelper = (feature: ol.Feature, coordinate: number[], overlay: ol.Overlay) => {
        const content = document.getElementById('popup-content');
        if (feature && feature.getId()) {

            let popupText = popupHeader(feature, styles) + popupParameters(feature, styles);

            if (content) {
                content.innerHTML = popupText;
            }
            overlay.setPosition(coordinate);
        }
    };

    mapDidUpdate = (theMap: ol.Map, customLocationFilterVectorExtent: Array<number>) => {

        let {drawn_sensors, selectedLocation, shapeCoordinates} = this.props;

        drawHelper(theMap, false, this.selectShapeLocation.bind(this), drawn_sensors);

        const area = getCustomLocation(selectedLocation);
        let feature = new ol.Feature();
        if (area && area.geometry) {
            feature = new ol.Feature({
                geometry: new ol.geom.Polygon(area.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857')
            });
        }

        this.state.areaPolygonSource.clear();
        this.state.areaPolygonSource.addFeatures([feature]);

        let features = this.getFeature();
        // If the User drew a custom location, zoom to the shape
        if (customLocationFilterVectorExtent.length > 0 &&
            selectedLocation === 'Custom Location') {
            if (!this.state.expandedCluster) {
                if (shapeCoordinates.length > 0) {
                    theMap.getView().fit(customLocationFilterVectorExtent, theMap.getSize());
                }
                if (drawn_sensors.length === 0) {
                    let tmpVectorSource = new ol.source.Vector({
                        features: features
                    });
                    theMap.getView().fit(tmpVectorSource.getExtent(), theMap.getSize());
                }
            }
            // If the User selected a predefined location, zoom to the features
        } else if (features.length > 0) {
            if (!this.state.expandedCluster) {
                let tmpvectorSource = new ol.source.Vector({
                    features: features
                });
                theMap.getView().fit(tmpvectorSource.getExtent(), theMap.getSize());
            }
        }

    };

    getFeature = () => {
        let {parameters, sensors, showSensors} = this.props;
        let showSensorsMap = [];
        sensors.map(sensor => {
            if (showSensors.includes(sensor.id)) {
                showSensorsMap.push(sensor);
            }
        });

        if (showSensors) {
            return sensorsToFeatures(showSensorsMap, parameters);
        } else {
            return sensorsToFeatures(sensors, parameters);
        }
    };

    getCluster = (clusterSource: ol.source.Cluster) => {
        return new ol.layer.Vector({
            source: clusterSource,
            name: 'clusters_layer',
            style: function (feature) {
                let size = feature.get('features').length;
                let style;

                if (size > 1) {
                    let radius_value = 20;
                    let font_value = '14px sans-serif';
                    if (screen.width <= getMobileSizeMax()) {
                        radius_value = 20;
                        font_value = '20px sans-serif';
                    }

                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: radius_value,
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
                            }),
                            font: font_value
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

                    let scale_value = 1.0;
                    if (screen.width <= getMobileSizeMax()) {
                        scale_value = 2.0;
                    }

                    style = (new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSvg),
                            scale: scale_value
                        })
                    }));
                }

                return style;
            }
        });
    };

    onChangeZoom = (theMap: ol.Map) => {
        const that = this;
        removePopup(theMap);
        if (that.state.expandedCluster) {
            that.removeSpiderfiedClusterLayers(theMap);
        }
    };

    getCustomLayers = () => {
        let areaPolygonLayer = new ol.layer.Vector({
            id: "areaPolygon",
            source: this.state.areaPolygonSource,
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
        return [areaPolygonLayer];
    };

    componentWillMount() {
        let areaPolygonSource = new ol.source.Vector({
            features: [
                new ol.Feature({})
            ]
        });

        this.setState({areaPolygonSource: areaPolygonSource});
    }

    render() {
        let {disable_clusters} = this.props;

        return (
            <div>
                <BasicMap features={this.getFeature()}
                          customLayers={this.getCustomLayers()}
                          getCluster={this.getCluster}
                          selectShapeLocation={this.selectShapeLocation}
                          onMapSingleClick={this.popupHandler}
                          onMapChangeResolution={this.onChangeZoom}
                          mapDidUpdate={this.mapDidUpdate}
                          disableClusters={disable_clusters}
                />
            </div>

        );
    }
}

export default SearchMap;