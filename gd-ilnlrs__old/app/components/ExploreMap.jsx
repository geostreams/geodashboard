/*
 * @flow
 */

import React, {Component} from 'react';
import ol from 'openlayers';

require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {sensorsToFeatures, getMultiLineLayer, matchMapArea} from '../utils/mapUtils';
import {popupHeader, popupParameters} from '../utils/mapPopup';
import BasicMap from './BasicMap';
import type {InputEventMap} from '../utils/flowtype';
import {
    getMobileFilterSensors, getMobileSizeMax, getMobileSourceNames, displayOnlineStatus,
    getMapPopupZoom, maxZoom, clustersExpandMaxNumberFeatures, getAreaLocations
} from '../utils/getConfig';


class ExploreMap extends Component {
    state: {
        multiLineLayer: ol.layer.Vector,
        multiLineString: ol.geom.MultiLineString,
        expandedClusterLayer: ol.layer.Vector,
        expandedCluster: boolean,
        areaPolygonSource: ol.source.Vector
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            multiLineLayer: new ol.layer.Vector,
            multiLineString: new ol.geom.MultiLineString,
            expandedClusterLayer: new ol.layer.Vector,
            expandedCluster: false,
            areaPolygonSource: ol.source.Vector
        };
        (this: any).clickSensor = this.clickSensor.bind(this);
    }

    clickSensor(id: any, name: any, coordinates: any, e: any) {
        if (this.props.popupSensorID !== id) {
            this.props.selectSensor(id, name, coordinates.slice(0, 2));
        }
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

    popupHandler = (theMap: ol.Map, e: InputEventMap, dragEvent: boolean = false) => {
        let thisCopy = this;
        // Ensure this is a only a click event and not a drag event
        if (dragEvent === true) {
            thisCopy.state.areaPolygonSource.clear();
        } else {
            // Remove Pill color fill if it exists
            thisCopy.props.resetDetailPageSelection();

            // Remove Area Polygon if it exists
            thisCopy.state.areaPolygonSource.clear();

            const that = thisCopy;
            const overlay = theMap.getOverlayById("marker");
            if (typeof e !== 'undefined') {
                let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
                    return featureChange;
                });

                // If a cluster is expanded we want to close it, unless there was a click in one of the features that is expanded
                let closeClusters = true;
                if (featuresAtPixel && ((featuresAtPixel.attributes && featuresAtPixel.attributes.type === "single"))) {
                    // Case when a feature is expanded
                    that.popupHandleHelper(featuresAtPixel, e.coordinate, overlay, theMap);
                    closeClusters = false;
                } else if (
                    featuresAtPixel && featuresAtPixel.get('features') !== undefined &&
                    featuresAtPixel.get('features').length === 1
                ) {
                    // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
                    const feature = featuresAtPixel.get('features')[0];
                    that.popupHandleHelper(feature, e.coordinate, overlay, theMap);
                } else if (
                    featuresAtPixel && featuresAtPixel.get('features') !== undefined &&
                    featuresAtPixel.get('features').length > 1
                ) {
                    // Case when a clustered was click. If it has more than 4 features and is in a zoom level lower than maxZoom, zoom in
                    if (
                        featuresAtPixel.get('features').length > clustersExpandMaxNumberFeatures() &&
                        theMap.getView().getZoom() < maxZoom()
                    ) {
                        theMap.getView().setCenter(featuresAtPixel.get('features')[0].getGeometry().getCoordinates());
                        theMap.getView().animate({
                            zoom: theMap.getView().getZoom() + 1,
                            duration: 500
                        });
                    } else {
                        that.removeSpiderfiedClusterLayers(theMap);
                        that.displayOverlappingMarkers(featuresAtPixel, theMap, that);
                    }
                    closeClusters = false;
                }
                if (closeClusters && that.state.expandedCluster) {
                    that.removeSpiderfiedClusterLayers(theMap);
                }
            }
        }
    };

    popupHandleHelper = (feature: ol.Feature, coordinate: number[], overlay: ol.Overlay, theMap: ol.Map) => {
        const content = document.getElementById('popup-content');
        if (feature && feature.getId()) {
            if (theMap) {
                theMap.getView().setCenter(feature.getGeometry().getCoordinates());
            }
            let popupText = popupHeader(feature, styles, true) + popupParameters(feature, styles);

            if (content) {
                content.innerHTML = popupText;
            }

            // Use Sensor Coordinates for Popup location
            let sensorInfo = feature.attributes;
            let lonLatPoint = [sensorInfo.longitude, sensorInfo.latitude];
            let webMercatorPoint = ol.proj.fromLonLat(lonLatPoint);
            overlay.setPosition(webMercatorPoint);

            // Position the Map slightly North to help ensure the entire Popup is visible on smaller screens,
            // and to help the map pan to the selected location correctly
            let centerCoordinates = feature.getGeometry().getCoordinates();
            if (theMap.getView().getZoom() <= 7) {
                centerCoordinates[1] = centerCoordinates[1] + 200000;
            } else {
                centerCoordinates[1] = centerCoordinates[1] + 25000;
            }
            theMap.getView().setCenter(centerCoordinates);

            this.clickSensor(sensorInfo.id, sensorInfo.name, webMercatorPoint);

            // Filter Areas for the Sensor
            let AreaLocationID = matchMapArea(lonLatPoint);

            // Area Information from the Configuration File
            let area = getAreaLocations(AreaLocationID);

            // Drawn Feature for the Map
            let areaFeature = new ol.Feature();
            if (area && area.geometry) {
                areaFeature = new ol.Feature({
                    geometry: new ol.geom.Polygon(area.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857')
                });
            }

            this.state.areaPolygonSource.clear();
            this.state.areaPolygonSource.addFeatures([areaFeature]);
        }
    };

    mapDidUpdate = (theMap: ol.Map) => {
        // console.log("theMap = " + theMap);
        let {exploreLayersDetails, layersVisibility} = this.props;

        let exploreLayers = [];

        if (exploreLayersDetails) {

            exploreLayersDetails.map(layerDetails => {

                if (layersVisibility) {

                    let index = layersVisibility.findIndex(
                        layer_visibility => layer_visibility.title === layerDetails.title
                    );

                    if (index > -1 && layersVisibility[index].visibility === true) {
                        exploreLayers.push(
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

        if (exploreLayers.length > 0) {

            let all_map_layers = theMap.getLayers().getArray().slice();
            all_map_layers.map(map_layer => {
                let layer_name = map_layer.get('name');
                exploreLayers.map(explore_layer_remove => {
                    let explore_layer_name = explore_layer_remove.get('name');
                    if (explore_layer_name === layer_name) {
                        theMap.removeLayer(map_layer);
                    }
                });
            });

            exploreLayers.map(explore_layer_add => {
                let explore_layers_visibility = explore_layer_add.get('visible');
                if (explore_layers_visibility === true) {
                    theMap.addLayer(explore_layer_add);
                }
            });

        }

        let features = this.getFeature();
        let that = this;

        let tmpvectorSource = new ol.source.Vector({
            features: features
        });

        let vectorExtent = tmpvectorSource.getExtent();

        if (features.length > 0) {
            if (!this.state.expandedCluster) {
                theMap.getView().fit(vectorExtent, theMap.getSize());
            }
        }

        if (that.props.showPopup === true) {
            let featuresAtPixel = tmpvectorSource.getFeatures().find(function (feature) {
                return feature.attributes.name === that.props.popupSensorname;
            });
            const overlay = theMap.getOverlayById("marker");
            if (featuresAtPixel === undefined) {
                console.log("ERROR with popupHandleHelper: " +
                    "featuresAtPixel is " + featuresAtPixel + " for " + that.props.popupSensorname);
            }
            that.popupHandleHelper(featuresAtPixel, that.props.popupCoordinates, overlay, theMap);

            theMap.getView().animate({
                zoom: theMap.getView().setZoom(maxZoom()),
                duration: 500
            });
            let centerCoordinates = featuresAtPixel.getGeometry().getCoordinates();
            centerCoordinates[1] = centerCoordinates[1] + 500;
            theMap.getView().setCenter(centerCoordinates);
        }

    };

    mapDidMount = () => {
        let {resetDetailPageSelection} = this.props;
        resetDetailPageSelection();
    };

    componentWillMount() {
        let areaPolygonSource = new ol.source.Vector({
            features: [
                new ol.Feature({})
            ]
        });

        this.setState({areaPolygonSource: areaPolygonSource});
    }

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

    getFeature() {
        let {sensors, userStations, parameters} = this.props;

        if (screen.width <= getMobileSizeMax()) {
            let mobile_sourcenames = getMobileSourceNames().toUpperCase();
            let mobile_data = sensors;
            if (mobile_sourcenames !== 'ALL') {
                mobile_data = mobile_data
                    .filter(data => mobile_sourcenames
                        .includes((data.properties.type.title).toString().toUpperCase()));
            }
            if (userStations !== 'all') {
                mobile_data = mobile_data
                    .filter(data => userStations.includes(data.properties.type.location));
            }
            if (getMobileFilterSensors() === true) {
                let twoWeeksAgo = new Date();
                twoWeeksAgo.setDate((twoWeeksAgo.getDate() - 14));
                twoWeeksAgo = twoWeeksAgo.toJSON();
                mobile_data = mobile_data.filter(data => (data.max_end_time) >= twoWeeksAgo);
            }
            sensors = mobile_data;
        }

        return sensorsToFeatures(sensors, parameters);
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
                        radius_value = 30;
                        font_value = '40px sans-serif';
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
                    let outlineColor = "black";
                    if (displayOnlineStatus() === true) {
                        if (feature.getProperties().features[0].attributes.onlineStatus === 'online') {
                            outlineColor = "green";
                        }
                        if (feature.getProperties().features[0].attributes.onlineStatus === 'offline') {
                            outlineColor = "red";
                        }
                    }

                    let iconSvg =
                        '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
                        + '<g class="marker-g">'
                        + '<path d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke="' + outlineColor + '" stroke-width="1" fill="white" />'
                        + '	<ellipse cx="7.5" cy="8.5" rx="4.5" ry="5.5" class="map-pin-color" style="fill:' + featureColor + '"/>'
                        + '<path class="mouseCapture" d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke-width="1" opacity="0"/>'
                        + '</g>'
                        + '</svg>';

                    let scale_value = 1.0;
                    if (screen.width <= getMobileSizeMax()) {
                        scale_value = 4.0;
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

    onChangeZoom = (theMap: ol.map) => {
        const that = this;
        if (that.state.expandedCluster) {
            that.removeSpiderfiedClusterLayers(theMap);
        }
    };

    render() {
        let {disable_clusters} = this.props;

        return (
            <div>
                <BasicMap features={this.getFeature()}
                          getCluster={this.getCluster}
                          onMapSingleClick={this.popupHandler}
                          onMapChangeResolution={this.onChangeZoom}
                          mapDidUpdate={this.mapDidUpdate}
                          mapDidMount={this.mapDidMount}
                          disableClusters={disable_clusters}
                          customLayers={this.getCustomLayers()}
                />
            </div>
        );
    }
}

export default ExploreMap;
