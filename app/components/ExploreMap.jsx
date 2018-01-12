/*
 * @flow
 */

import React, {Component} from 'react';
let ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {Icon} from 'react-mdc-web';
import {sensorsToFeatures, getMultiLineLayer} from '../utils/mapUtils';
import {popupHeader, popupParameters, removePopup} from '../utils/mapPopup';
import BasicMap from './BasicMap';
import type {InputEventMap} from '../utils/flowtype';


class ExploreMap extends Component {
    state: {
        multiLineLayer: ol.layer.Vector,
        multiLineString: ol.geom.MultiLineString,
        expandedClusterLayer: ol.layer.Vector,
        expandedCluster: boolean
    };
    constructor(props: Object) {
        super(props);
        this.state = {
            multiLineLayer: new ol.layer.Vector,
            multiLineString: new ol.geom.MultiLineString,
            expandedClusterLayer: new ol.layer.Vector,
            expandedCluster: false,
        }
    }

    displayOverlappingMarkers = (featuresAtPixel: ol.features, theMap: ol.Map) => {
        const multiLineLayers = getMultiLineLayer(featuresAtPixel, theMap);
        const multiLineLayer = multiLineLayers[0];
        const newFeaturesLayer = multiLineLayers[1];
        theMap.addLayer(newFeaturesLayer);
        theMap.addLayer(multiLineLayer);

        this.setState({expandedClusterLayer: newFeaturesLayer, multiLineLayer: multiLineLayer, expandedCluster: true})
    };

    removeSpiderfiedClusterLayers = (theMap: ol.Map) => {
        theMap.removeLayer(this.state.expandedClusterLayer);
        theMap.removeLayer(this.state.multiLineLayer);
    };

    popupHandler = (theMap: ol.Map, e: InputEventMap) => {
        const that = this;
        const overlay = theMap.getOverlayById("marker");

        let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
            return featureChange;
        });

        // If a cluster is expanded we want to close it, unless there was a click in one of the features that is expanded
        let closeClusters = true;
        if (featuresAtPixel && ((featuresAtPixel.attributes && featuresAtPixel.attributes.type == "single"))) {
            // Case when a feature is expanded
            that.popupHandleHelper(featuresAtPixel, e.coordinate, overlay);
            closeClusters = false;
        } else if (featuresAtPixel && featuresAtPixel.get('features') != undefined && featuresAtPixel.get('features').length == 1) {
            // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
            const feature = featuresAtPixel.get('features')[0];
            that.popupHandleHelper(feature, e.coordinate, overlay);
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
            removePopup(theMap)
        }
        if (closeClusters && that.state.expandedCluster) {
            that.removeSpiderfiedClusterLayers(theMap);
        }
    };

    popupHandleHelper = (feature: ol.Feature, coordinate: number[], overlay: ol.Overlay) =>{
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

        let exploreLayers = [];
        let keep_map_view = false;

        if (this.props.exploreLayersDetails) {

            this.props.exploreLayersDetails.map(layerDetails => {

                if (this.props.layersVisibility) {

                    let index = this.props.layersVisibility.findIndex(
                        layer_visibility => layer_visibility.title == layerDetails.title
                    );

                    if (index > -1 && this.props.layersVisibility[index].visibility == true) {
                        exploreLayers.push(
                            new ol.layer.Image({
                                source: new ol.source.ImageWMS({
                                    url: layerDetails.wms,
                                    params: {'LAYERS': layerDetails.id},
                                }),
                                name: layerDetails.title,
                                opacity: this.props.layersVisibility[index].opacity,
                                visible: true
                            })
                        )
                    }
                    else if (index > -1 && this.props.layersVisibility[index].visibility == false) {
                        exploreLayers.push(
                            new ol.layer.Image({
                                name: layerDetails.title,
                                visible: false
                            })
                        )
                    }

                }

            });

        }

        if(exploreLayers.length > 0){

            let all_map_layers = theMap.getLayers().getArray().slice();
            all_map_layers.map(map_layer => {
                let layer_name = map_layer.get('name');
                exploreLayers.map(explore_layer_remove => {
                    let explore_layer_name = explore_layer_remove.get('name');
                    if (explore_layer_name == layer_name) {
                        keep_map_view = true;
                        theMap.removeLayer(map_layer);
                    }
                });
            });

            exploreLayers.map(explore_layer_add => {
                let explore_layers_visibility = explore_layer_add.get('visible');
                if (explore_layers_visibility == true) {
                    theMap.addLayer(explore_layer_add);
                    keep_map_view = true;
                }
            });

        }

        let features = this.getFeature();
        let that = this;

        let tmpvectorSource = new ol.source.Vector({
            features: features
        });

        if (features.length > 0) {
            if (!this.state.expandedCluster && keep_map_view == false){
                theMap.getView().fit(tmpvectorSource.getExtent(), theMap.getSize());
            }
        }

        if (this.props.popupSensorname) {
            let featuresAtPixel = tmpvectorSource.getFeatures().find(function (feature) {
                return feature.attributes.name === that.props.popupSensorname;
            });
            const overlay = theMap.getOverlayById("marker");

            this.popupHandleHelper(featuresAtPixel, this.props.popupCoordinates, overlay);

            //TODO: Need to update the global state. This is causing an infinite loop.
            // After calling the overlapping markers we need to clear out the this.props.coordinates through the global state
            // if(that.state.expandedCluster) {
            //     that.removeSpiderfiedClusterLayers(that.state.map);
            // }
            // that.displayOverlappingMarkers(featuresAtPixel, that.state.map, that);

        }

    };

    getFeature(){
        return sensorsToFeatures(this.props.sensors);
    };

    getCluster = (clusterSource: ol.source.Cluster) => {
        return new ol.layer.Vector({
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
                            src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( iconSvg ),
                            imgSize: [15, 25]
                        })

                    }));
                }

                return style;

            }
        });
    };

    onChangeZoom = (theMap: ol.map) =>{
        const that = this;
        removePopup(theMap);
        if (that.state.expandedCluster) {
            that.removeSpiderfiedClusterLayers(theMap);
        }
    };

    render() {
        return (
            <div>
                <BasicMap features={this.getFeature()}
                          getCluster={this.getCluster}
                          onMapSingleClick={this.popupHandler}
                          onMapChangeResolution={this.onChangeZoom}
                          mapDidUpdate={this.mapDidUpdate}
                />
            </div>
        );
    }
}

export default ExploreMap;
