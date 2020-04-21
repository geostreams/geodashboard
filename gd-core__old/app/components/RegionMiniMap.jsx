/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ol from 'openlayers';

require("openlayers/css/ol.css");
import trendsStyles from '../styles/trends.css';
import mainStyles from '../styles/main.css';
import {
    Card, CardHeader, CardTitle, CardMedia,
    Dialog, DialogBody, DialogHeader, DialogTitle,
    List, ListItem, Icon
} from 'react-mdc-web/lib';
import styles from '../styles/regionMiniMap.css';
import {getTrendColor, getCustomLocation, getMapTileURLSetting, maxZoom} from '../utils/getConfig';
import {
    popupHelperTrendDetailPage, sensorsToFeaturesTrendDetailPage,
    getAttribution, getMiniControls
} from '../utils/mapUtils';
import {drawHelper} from '../utils/mapDraw';
import type {MapProps, TrendsMapState} from '../utils/flowtype';
import {matchRegionTrends} from '../utils/trendsUtils';


class RegionMiniMap extends Component {

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
        };
        (this: any).handleInfoIcon = this.handleInfoIcon.bind(this);
    }

    handleInfoIcon(button_status: boolean) {
        this.setState({
            openAboutButton: button_status
        });
    };

    render() {

        let return_item;
        return_item = (
            <div>
                <Dialog open={Boolean(this.state.openAboutButton)}
                        onClose={() => {
                            this.setState({openAboutButton: false})
                        }}>
                    <DialogHeader>
                        <DialogTitle>Monitoring Stations</DialogTitle>
                        <a className={trendsStyles.close_button_style}
                           onClick={() => {
                               this.setState({openAboutButton: false})
                           }}>
                            <Icon name="close"/>
                        </a>
                    </DialogHeader>
                    <DialogBody scrollable id="stations-content"> </DialogBody>
                </Dialog>
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle className={mainStyles.title_card}>
                            <p className={styles.locations_text_style}>Location</p>
                            <a className={trendsStyles.locations_button_style}
                               onClick={this.handleInfoIcon}>
                                <Icon name="info"/>
                            </a>
                        </CardTitle>
                    </CardHeader>
                    <CardMedia>
                        <div>
                            <div id='map' className={styles.map_style}> </div>
                            <div style={{display: "none"}}>
                                <div id="marker" title="Marker" className="marker"> </div>
                                <div id="popup" className={styles.regionPopup}>
                                    <a href="#" id="popup-closer" className={styles.regionPopupCloser}>
                                        <Icon name="close"/>
                                    </a>
                                    <div id="popup-content"> </div>
                                </div>
                            </div>
                        </div>
                    </CardMedia>
                </Card>
            </div>
        );

        return return_item;

    }

    stationsPopupMenu(features: ol.Feature) {

        let {trends_region_title} = this.props;

        let icon_content = document.getElementById('stations-content');
        let sensorID = '';
        let popupText = '<ul class=' + styles.list_style + '>';

        if (features) {
            features.map(s => {
                    sensorID = s.getId().toUpperCase();
                    if (sensorID !== trends_region_title.toUpperCase()) {
                        popupText += ('<li>' + sensorID + '</li>');
                    }
                }
            )
        }

        popupText += '</ul>';

        if (icon_content) {
            icon_content.innerHTML = popupText.toString();
        }

    }

    popupHandler(feature: ol.Feature, coordinate: number[]) {

        const content = document.getElementById('popup-content');

        if (feature && feature.getId()) {

            let popupText = popupHelperTrendDetailPage(feature, styles);

            if (content) {
                content.innerHTML = popupText;
            }
            let overlay = this.state.map.getOverlayById("marker");
            overlay.setPosition(coordinate);

        }

    }

    componentDidUpdate() {

        let {trends_region, allSensors, parameter, selectedParameter} = this.props;

        let trends_region_page = trends_region.toLowerCase();
        let features;
        let copyOfMap = this.state.map;
        let that = this;

        drawHelper(copyOfMap, true, that);

        let map_items;
        let area;
        let feature = new ol.Feature();
        let region_features = [];

        map_items = allSensors;

        // This is for the Region Outlines for one Region at a time
        area = getCustomLocation(trends_region_page);
        if (area && area.geometry) {
            feature = new ol.Feature({
                geometry: new ol.geom.Polygon(area.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857')
            });
            region_features.push(feature);
        }

        this.state.areaPolygonSource.clear();
        this.state.areaPolygonSource.addFeatures(region_features);
        let regionalSensors = [];

        map_items.map(m => {
            if (matchRegionTrends(trends_region, m)) {
                regionalSensors.push(m);
            }
        });

        let region_parameter;
        if (parameter !== '') {
            region_parameter = selectedParameter;
        } else {
            region_parameter = parameter;
        }

        features = sensorsToFeaturesTrendDetailPage(regionalSensors, region_parameter, trends_region);

        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        if (area && this.state.map.getSize()) {
            this.state.map.getView().fit(
                this.state.areaPolygonSource.getExtent(), this.state.map.getSize());
        }
        this.stationsPopupMenu(features);

    }

    componentDidMount() {

        let {trends_region, allSensors, selectedParameter} = this.props;

        let map_items;

        map_items = allSensors;

        let features = sensorsToFeaturesTrendDetailPage(
            map_items, selectedParameter, trends_region);

        const clusterSource = new ol.source.Cluster({
            distance: 1,
            source: this.state.vectorSource
        });
        this.setState({clusterSource: clusterSource});

        let clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function () {
                let style = (new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color: getTrendColor("noTrend")}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
                return style;
            }
        });

        clusters.setZIndex(1);

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: getAttribution(),
                    url: getMapTileURLSetting()
                })
            }),
            clusters
        ];

        const that = this;
        const container = document.getElementById('popup');
        const closer = document.getElementById('popup-closer');

        let theMap;
        if (container) {
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
                minZoom: 5.5,
                maxZoom: this.state.maxZoom
            });

            theMap = new ol.Map({
                target: 'map',
                layers: layers,
                view: view,
                overlays: [overlay],
                controls: getMiniControls()
            });

            let selectItems = new ol.interaction.Select();
            theMap.addInteraction(selectItems);

            if (closer) {
                closer.onclick = function () {
                    overlay.setPosition(undefined);
                    closer.blur();
                    return false;
                };
            }

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

            let areaPolygonSource = new ol.source.Vector({
                features: [
                    new ol.Feature({})
                ]
            });

            this.setState({areaPolygonSource: areaPolygonSource});

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

            this.setState({map: theMap});

            this.stationsPopupMenu(features);
        }
    }

}

RegionMiniMap.propTypes = {
    trends_region: PropTypes.string.isRequired,
    trends_region_title: PropTypes.string.isRequired,
    trendSensors: PropTypes.array.isRequired,
    selectedParameter: PropTypes.string.isRequired
};

export default RegionMiniMap;