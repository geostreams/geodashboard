/*
 * @flow
 */

import React, {Component} from 'react';
let ol = require('openlayers');
require("openlayers/css/ol.css");
import styles from '../styles/map.css';
import {Icon} from 'react-mdc-web';
import {getSourceName, getParameterName} from '../utils/getConfig';
import type {Sensors} from '../utils/flowtype';


type MapProps = {
    sensors: Sensors,
    availableSensors: Sensors
};

type MapState = {
    center:Array <number>,
    vectorSource:ol.source.Vector,
    clusterSource:ol.souce.Cluster,
    multiLineLayer: ol.layer.Vector,
    multiLineString: ol.geom.MultiLineString,
    expandedClusterLayer: ol.layer.Vector,
    expandedCluster: boolean,
    map:ol.Map,
    currentZoom: number,
    maxZoom: number
};

class Map extends Component {
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

        return (<div>
            <div id='map' className={styles.root}>
                <div id="trends_legend" className={styles.trends_legend}></div>
            </div>
            <div style={{display: "none"}}>
                <div id="marker" title="Marker" className="marker"></div>
                <div id="popup" className={styles.olPopup}>
                    <a href="#" id="popup-closer" className={styles.olPopupCloser}></a>
                    <div id="popup-content"></div>
                </div>
                <div id="ol-centercontrol" className={styles.olCenterButton}></div>
                <button id="centerButton"><Icon name="gps_fixed"/></button>

                <div id="ol-drawcirclecontrol"
                    className={styles.olDrawCircleButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawCircleButton" title="Click to Draw a Circle">
                    <Icon name="panorama_fish_eye"/></button>

                <div id="ol-drawsquarecontrol"
                    className={styles.olDrawSquareButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawSquareButton" title="Click to Draw a Square">
                    <Icon name="panorama_wide_angle"/></button>

                <div id="ol-drawcustomcontrol"
                    className={styles.olDrawCustomButton + ' ' +
                    styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawCustomButton" title="Click to Draw a Custom Shape">
                    <Icon name="change_history"/></button>

                <div id="ol-drawclearcontrol"
                     className={styles.olDrawClearButton + ' ' +
                     styles.olSharedDrawStyles + ' drawing_buttons'}></div>
                <button id="drawClearButton" title="Click to Reset Drawing Selection">
                    <Icon name="clear"/></button>

                <div id="ol-drawstopcontrol"
                     className={styles.olDrawStopButton + ' ' +
                     styles.olSharedDrawStyles}></div>
                <button id="drawStopButton" title="Click to Remove a Drawn Shape">
                    <Icon name="stop"/></button>

            </div>
        </div>);

    }

    getColor(source: string): string {
        let sourcecolor = window.configruntime.sourcecolor;
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    getTrendColor(source: string): string {
        let trend_colors = window.configruntime.trend_colors;
        return trend_colors[source] !== undefined ? trend_colors[source] : '#7F7F7F';
    }

    selectShapeLocation(event:Array<string>) {

        if( this.props.display_trends ){
            this.props.onSelectShapeLocationTrend(event);
        } else {
            this.props.onSelectShapeLocation(event);
        }
    }

    updateLayers(sensors: Sensors):Array<ol.Feature> {
        let features = Array();
        sensors.map((sensor) => {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });

            let trend_type = "";
            let trend_values = "";

            if (this.props.display_trends) {

                // TODO: The arrow color should be partially decided by the latest returned value in sensor.trends

                if (sensor.hasOwnProperty("trends")) {
                    if (sensor.trends === "not enough data" || sensor.trends === "trends return no data") {
                        trend_type = "noTrend";
                    } else {

                        const threshold = this.props.threshold_value;

                        if (sensor.trends[this.props.trendsparameter + "_percentage_change"] > 0 &&
                            sensor.trends[this.props.trendsparameter + "_last_average"] >= threshold) {

                            trend_type = "overThresholdUp";

                        } else if (sensor.trends[this.props.trendsparameter + "_percentage_change"] > 0 &&
                            sensor.trends[this.props.trendsparameter + "_last_average"] < threshold) {

                            trend_type = "trendUp";

                        } else if (sensor.trends[this.props.trendsparameter + "_percentage_change"] < 0 &&
                            sensor.trends[this.props.trendsparameter + "_last_average"] < threshold) {

                            trend_type = "trendDown";

                        } else if (sensor.trends[this.props.trendsparameter + "_percentage_change"] < 0 &&
                            sensor.trends[this.props.trendsparameter + "_last_average"] > threshold) {

                            trend_type = "overThresholdDown";

                        } else {

                            trend_type = "noTrend";

                        }
                    }

                    trend_values = [
                        (Number(sensor.trends[this.props.trendsparameter + "_total_average"]).toFixed(2) + " mg/L"),
                        (Number(sensor.trends[this.props.trendsparameter + "_interval_average"]).toFixed(2) + " mg/L"),
                        (Number(sensor.trends[this.props.trendsparameter + "_last_average"]).toFixed(2) + " mg/L"),
                        (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                        (Number(sensor.trends[this.props.trendsparameter + "_percentage_change"]).toFixed(2) + " %")
                    ]

                }

                if (trend_type == "trendUp") {
                    feature.setStyle(new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            fill: new ol.style.Fill({color: this.getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type == "trendDown") {
                    feature.setStyle(new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            rotation: 3.141592654,
                            fill: new ol.style.Fill({color: this.getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type == "overThresholdUp") {
                    feature.setStyle(new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            fill: new ol.style.Fill({color: this.getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type == "overThresholdDown") {
                    feature.setStyle(new ol.style.Style({
                        image: new ol.style.RegularShape({
                            points: 3,
                            radius: 10,
                            rotation: 3.141592654,
                            fill: new ol.style.Fill({color: this.getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                } else if (trend_type == "noTrend" || trend_type == "") {
                    feature.setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 4,
                            fill: new ol.style.Fill({color: this.getTrendColor(trend_type)}),
                            stroke: new ol.style.Stroke({color: '#000000', width: 1})
                        })
                    }));
                }

                feature.attributes = {
                    "dataSource": getSourceName(sensor.properties.type),
                    "maxEndTime": sensor.max_end_time,
                    "minStartTime": sensor.min_start_time,
                    "latitude": sensor.geometry.coordinates[1],
                    "longitude": sensor.geometry.coordinates[0],
                    "location": sensor.properties.region,
                    "name": sensor.name,
                    //parameters has null in the array
                    "parameters": sensor.parameters.filter(x => x !== null && getParameterName(x) != null).map(x => getParameterName(x)),
                    "color": this.getColor(sensor.properties.type.id),
                    "trend_color": this.getTrendColor(trend_type),
                    "trend_type": trend_type,
                    "trend_values": trend_values,
                    "display_trends": this.props.display_trends,
                };

            } else {

                feature.attributes = {
                    "name": sensor.name,
                    "dataSource": getSourceName(sensor.properties.type),
                    "maxEndTime": sensor.max_end_time,
                    "minStartTime": sensor.min_start_time,
                    "latitude": sensor.geometry.coordinates[1],
                    "longitude": sensor.geometry.coordinates[0],
                    "location": sensor.properties.region,
                    //parameters has null in the array
                    "parameters": sensor.parameters.filter(x => x !== null && getParameterName(x) != null).map(x => getParameterName(x)),
                    "color": this.getColor(sensor.properties.type.id),
                    "type": "single"

                };

            }

            feature.setId(sensor.properties.popupContent);
            features.push(feature);

        });
        return features;
    }

    generatePointsCircle(count: number, centerPixel) {
        // Generate points within a circle where the markers will be displayed.
        const separation = 20;
        const twoPi = Math.PI * 2;
        const start_angle = twoPi/12;
        const circumference = separation * (2 + count);
        const legLength = circumference/ twoPi;
        const angleStep = twoPi/count;
        const res=[];

        for(let i = count -1; i >=0; i--) {
            const angle = start_angle + i * angleStep;
            res[i] = [centerPixel[0] + legLength * Math.cos(angle),
                centerPixel[1] + legLength * Math.sin(angle)];
        }

        return res;
    }

    displayOverlappingMarkers(featuresAtPixel: ol.features, theMap) {

        // Expand features if they are not expanded
        const feature0 = featuresAtPixel.get('features')[0];
        const geometry = feature0.getGeometry();
        const coordinates = geometry.getCoordinates();
        const px = theMap.getPixelFromCoordinate(coordinates);
        const size = featuresAtPixel.get('features').length;
        var points = this.generatePointsCircle(size, px);

        // Create lines to where each marker is going to be placed
        var multiLineString = new ol.geom.MultiLineString([]);
        var multiLineLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({ geometry: multiLineString })
                ]
            }),
            style: [
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        width: 1,
                        color: [128, 128, 128, 1]
                        //lineDash: [1, 5]
                    }),
                    zIndex: 2
                })
            ],
            updateWhileAnimating: true
        });
        multiLineLayer.setZIndex(2);

        // Create new features to place in the ends of the line with the right styling
        var newFeatures = Array();
        featuresAtPixel.get('features').forEach(function(feature, index) {
            var cd_end = theMap.getCoordinateFromPixel(points[index]);

            multiLineString.appendLineString(
                new ol.geom.LineString([coordinates, cd_end])
            );

            // feature.setStyle(style);
            // feature.setOpacity(0.2);
            feature.setGeometry(new ol.geom.Point(cd_end));
            newFeatures.push(feature);

        });

        var newFeaturesSource = new ol.source.Vector({
            features: newFeatures
        });

        var newFeaturesLayer = new ol.layer.Vector({
            source: newFeaturesSource,
            style: function(feature) {
                var sensorColor = feature.attributes.color;
                var iconSvg = '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
                    + '<g class="marker-g">'
                    + '<path d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke="black" stroke-width="1" fill="white"/>'
                    + '	<ellipse cx="7.5" cy="8.5" rx="4.5" ry="5.5" class="map-pin-color" style="fill:' +
                    sensorColor + '"/>'
                    + '<path class="mouseCapture" d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke-width="1" opacity="0"/>'
                    + '</g>'
                    + '</svg>';
                return (new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src: 'data:image/svg+xml,' + iconSvg,
                    })

                }));
            }
        });
        newFeaturesLayer.setZIndex(2);

        theMap.addLayer(newFeaturesLayer);
        theMap.addLayer(multiLineLayer);
        const currentZoom = theMap.getView().getZoom();

        this.setState({currentZoom: currentZoom, multiLineString: multiLineString, expandedClusterLayer: newFeaturesLayer, multiLineLayer: multiLineLayer, expandedCluster: true})
    }

    removeSpiderfiedClusterLayers(theMap) {
        theMap.removeLayer(this.state.expandedClusterLayer);
        theMap.removeLayer(this.state.multiLineLayer);

    }

    popupHandler(feature: ol.Feature, coordinate: number[]) {
        const content = document.getElementById('popup-content');
        if (feature && feature.getId()) {
            let id = feature.getId().toUpperCase();
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

            let sourceColor = sensorInfo.color;

            let headerText = '<h2 class=' + styles.header2style + ' style="background-color: ' +
                sourceColor + ';">' + id + '</h2>';

            let bodyText =
                '<table class=' + styles.popup_table + '>' +
                dataSource +
                timePeriod +
                latlong +
                '</table>' +
                '<div class=' + styles.greyborder + '></div>';

            if (sensorInfo.display_trends) {

                let sensorTrends = sensorInfo.trend_type;
                let trendColor = sensorInfo.trend_color;
                let trendValues = sensorInfo.trend_values;

                let trendsLeft = '';
                let trendsRight = '';

                if (sensorTrends == "noTrend" || sensorTrends == "") {

                    let leftText = " ";
                    trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                        trendColor + '; border-color: ' + trendColor + ';">' + leftText + '</p></td></tr>';

                    let rightText = "Not enough data to display";
                    trendsRight = '' +
                        '<tr><td><strong>' + rightText + '</strong></td></tr>';

                } else {

                    if (sensorTrends == 'trendUp' || sensorTrends == 'overThresholdUp') {
                        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.upArrow + ' style="background: ' +
                            trendColor + '; border-color: ' + trendColor + '; ">' + trendValues[4] + '</p></td></tr>';
                    } else if (sensorTrends == 'trendDown' || sensorTrends == 'overThresholdDown') {
                        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.downArrow + ' style="background: ' +
                            trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
                    } else if (sensorTrends == 'noTrend') {
                        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                            trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
                    } else {
                        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                            trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
                    }

                    trendsRight = '' +
                        '<tr><td><strong>Baseline Avg: </strong>' + trendValues[0] + '</td></tr>' +
                        '<tr><td><strong>Rolling Avg: </strong>' + trendValues[1] + '</td></tr>' +
                        '<tr><td><strong>Latest Value: </strong>' + trendValues[2] + '</td></tr>' +
                        '<tr><td><strong>Latest Time: </strong>' + trendValues[3] + '</td></tr>';
                }

                let trends = trendsLeft + trendsRight;

                bodyText = bodyText +
                    '<table class=' + styles.tablestyle + '>' +
                    trends +
                    '</table>';

            } else {

                let paramsLength = (sensorInfo.parameters).length;
                let paramsOrig = (sensorInfo.parameters);
                let paramsAlt = '';
                for (let i = 0; i < paramsLength; i++) {
                    paramsAlt = paramsAlt + '<li>' + paramsOrig[i] + '</li>';
                }
                let params = '<ul>'.concat(paramsAlt, '</ul>');

                bodyText +=
                    '<h3 class=' + styles.header3style + '>' + 'Parameters (' + paramsLength + '): </h3>' +
                    '<div class=' + styles.paramsborder + '>' + params + '</div>' ;

                if(paramsLength > 0) {
                    bodyText += '<a href="#/detail/location/'+ sensorInfo.name + '" class=' + styles.viewdetail + ' style="background-color: ' +
                        sourceColor + ';">View detail</a>';
                }
            }

            let popupText = headerText + bodyText;

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

        let add_button = document.getElementById('addButton');
        if (add_button) {
            add_button.addEventListener('click', clickedAddButton);
        }

        let draw_buttons_group = document.getElementsByClassName('drawing_buttons');

        let draw_radio = document.getElementById('draw');
        if (draw_radio) {
            draw_radio.addEventListener('click', clickedDrawRadio);
        }

        let all_regions_radio = document.getElementById("all");
        if (all_regions_radio) {
            all_regions_radio.addEventListener('click', clickedNotDrawRadioTrends);
        }

        let copyOfMap = this.state.map;

        let that = this;

        function clickedDrawRadio() {
            if (draw_buttons_group){
                for (let i = 0; i < draw_buttons_group.length; i++) {
                    draw_buttons_group[i].style.visibility = "visible";
                }
            }
        }

        function clickedNotDrawRadio() {
            if (draw_buttons_group){
                for (let i = 0; i < draw_buttons_group.length; i++) {
                    draw_buttons_group[i].style.visibility = "hidden";
                }
            }

            copyOfMap.getInteractions().forEach(function (e) {
                if(e instanceof ol.interaction.Draw) {
                    copyOfMap.removeInteraction(e);
                }
            });

        }

        function clickedAddButton() {
            clickedNotDrawRadio();
        }

        function resetDrawPoints() {
            // Set this for resetting the points
            let selectPointsLocations = [];
            selectPointsLocations[0] = 'reset_points';

            that.selectShapeLocation(selectPointsLocations);

            let clear_drawn_shape = document.getElementById('drawStopButton');
            if (clear_drawn_shape) {
                clear_drawn_shape.click();
            }
        }

        function clickedNotDrawRadioTrends() {
            resetDrawPoints();
            clickedNotDrawRadio();
        }

        function clickedDrawRadioTrends() {
            clickedDrawRadio();
        }

        if (this.props.display_trends){

            if (draw_radio && all_regions_radio) {
                if (all_regions_radio.checked == false && draw_radio.checked == false) {
                    clickedNotDrawRadioTrends();
                }

                if (all_regions_radio.checked == true) {
                    clickedNotDrawRadioTrends();
                }

                if (draw_radio.checked == true) {
                    clickedDrawRadioTrends();
                }
            }

            if (Array.isArray(this.props.trendSensors) && this.props.trendSensors.length > 0) {
                features = this.updateLayers(this.props.trendSensors);
            } else {
                features = this.updateLayers(this.props.sensors);
            }

        } else {
            if (draw_radio) {
                if (draw_radio.checked == false) {
                    copyOfMap.getInteractions().forEach(function (e) {
                        if (e instanceof ol.interaction.Draw) {
                            copyOfMap.removeInteraction(e);
                        }
                    });
                    clickedNotDrawRadio();
                }

                if (draw_radio.checked == true) {
                    clickedDrawRadio();
                }
            }

            let the_filters_div = document.getElementById('filters-div');
            if (the_filters_div) {
                if (the_filters_div.children.length <=1) {
                    clickedNotDrawRadio();
                    resetDrawPoints();
                }
            }

            if (this.props.updateSensors){
                console.log("Map component got new props");
                features = this.updateLayers(this.props.updateSensors);
            } else {
                features = this.updateLayers(this.props.sensors);
            }

        }
        this.state.clusterSource.clear();
        this.state.clusterSource.addFeatures(features);
        this.state.vectorSource.clear();
        this.state.vectorSource.addFeatures(features);

        if (this.state.vectorSource.getFeatures().length > 0) {
            // Turn off auto zoom for Trends
            if (!this.props.display_trend && !this.state.expandedCluster) {
                this.state.map.getView().fit(this.state.vectorSource.getExtent(), this.state.map.getSize());
            }
        }

        if (this.props.coordinates) {
            const pixel = this.state.map.getPixelFromCoordinate(this.props.coordinates);
            let featuresAtPixel = this.state.map.forEachFeatureAtPixel(pixel, function (featureChange) {
                return featureChange;
            });
            if(featuresAtPixel.get('features').length == 1) {
                this.popupHandler(featuresAtPixel.get('features')[0], this.props.coordinates);
            } else {
                //TODO: Need to update the global state. This is causing an infinite loop.
                // After calling the overlapping markers we need to clear out the this.props.coordinates through the global state
                // if(that.state.expandedCluster) {
                //     that.removeSpiderfiedClusterLayers(that.state.map);
                // }
                // that.displayOverlappingMarkers(featuresAtPixel, that.state.map, that);

            }

        }
    }

    componentDidMount() {

        let features = this.updateLayers(this.props.sensors);
        let clusterIds = 0;
        let vectorSource = new ol.source.Vector({
            features: features
        });

        const clusterSource = new ol.source.Cluster({
            distance: 1,
            source: this.state.vectorSource
        });
        this.setState({clusterSource: vectorSource});

        var clusters = new ol.layer.Vector({
            source: clusterSource,
            style: function (feature) {
                var size = feature.get('features').length;
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

                    var featureColor = feature.getProperties().features[0].attributes.color;
                    var iconSvg = '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
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
                if(that.props.display_trends) {
                    const trend_type = feature.getProperties().features[0].attributes.trend_type;
                    if(trend_type == "trendUp") {
                        style = (new ol.style.Style({
                            image: new ol.style.RegularShape({
                                points: 3,
                                radius: 10,
                                fill: new ol.style.Fill({color: that.getTrendColor(trend_type)}),
                                stroke: new ol.style.Stroke({color: '#000000', width: 1})
                            })
                        }));
                    } else if (trend_type == "trendDown") {
                        style = (new ol.style.Style({
                            image: new ol.style.RegularShape({
                                points: 3,
                                radius: 10,
                                rotation: 3.141592654,
                                fill: new ol.style.Fill({color: that.getTrendColor(trend_type)}),
                                stroke: new ol.style.Stroke({color: '#000000', width: 1})
                            })
                        }));
                    } else if (trend_type == "overThresholdUp") {
                        style = (new ol.style.Style({
                            image: new ol.style.RegularShape({
                                points: 3,
                                radius: 10,
                                fill: new ol.style.Fill({color: that.getTrendColor(trend_type)}),
                                stroke: new ol.style.Stroke({color: '#000000', width: 1})
                            })
                        }));
                    } else if (trend_type == "overThresholdDown") {
                        style = (new ol.style.Style({
                            image: new ol.style.RegularShape({
                                points: 3,
                                radius: 10,
                                rotation: 3.141592654,
                                fill: new ol.style.Fill({color: that.getTrendColor(trend_type)}),
                                stroke: new ol.style.Stroke({color: '#000000', width: 1})
                            })
                        }));
                    } else if (trend_type == "noTrend" || trend_type == "") {
                        style = (new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 4,
                                fill: new ol.style.Fill({color: that.getTrendColor(trend_type)}),
                                stroke: new ol.style.Stroke({color: '#000000', width: 1})
                            })
                        }));
                    }
                }

                return style;

            }
        });
        clusters.setZIndex(1);

        let attribution = new ol.Attribution({
            html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, ' +
            'UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
        });

        let customLocationFilterVector = new ol.source.Vector();
        let customLocationFilterLayer = new ol.layer.Vector({
            source: customLocationFilterVector
        });

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: [attribution],
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

        window.app = {};

        // Add Center Map Button
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

        // Add Draw Stop Button
        let appDrawStop = window.app;
        appDrawStop.drawStopControl = function (opt_options) {
            let options = opt_options || {};
            const drawStopButton = document.getElementById('drawStopButton');

            let handleDrawStopButton = function () {
                theMap.getInteractions().forEach(function (e) {
                    if(e instanceof ol.interaction.Draw) {
                        theMap.removeInteraction(e);
                    }
                });

                customLocationFilterLayer.getSource().clear();

            };

            if (drawStopButton) {
                drawStopButton.addEventListener('click', handleDrawStopButton, false);
                drawStopButton.addEventListener('touchstart', handleDrawStopButton, false);
            }

            const element = document.getElementById('ol-drawstopcontrol');
            if (element && drawStopButton) {
                element.className += ' ol-unselectable ol-control';
                element.appendChild(drawStopButton);

                ol.control.Control.call(this, {
                    element: element,
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

        if( this.props.display_draw == 'True' ) {
            ol.inherits(appDrawClear.drawClearControl, ol.control.Control);
            ol.inherits(appDrawStop.drawStopControl, ol.control.Control);
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
                    new appDrawStop.drawStopControl,
                    new appDrawClear.drawClearControl(),
                ])
            });
        } else {
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
                ])
            });
        }

        let selectItems = new ol.interaction.Select();
        theMap.addInteraction(selectItems);

        theMap.getView().on("change:resolution", function () {
            if (closer) {
                overlay.setPosition(undefined);
                closer.blur();
            }
            if(that.state.expandedCluster) {
                that.removeSpiderfiedClusterLayers(theMap);
            }
        });

        var fill = new ol.style.Fill({color:[255,255,255,1]}),
            stroke = new ol.style.Stroke({color:[0,0,0,1]});



        theMap.on('singleclick', function (e) {
            selectItems.setActive(false);

            let featuresAtPixel = theMap.forEachFeatureAtPixel(e.pixel, function (featureChange) {
                return featureChange;
            });

            // If a cluster is expanded we want to close it, unless there was a click in one of the features that is expanded
            let closeClusters = true;
            if(featuresAtPixel && ((featuresAtPixel.attributes && featuresAtPixel.attributes.type == "single"))) {
                // Case when a feature is expanded
                that.popupHandler(featuresAtPixel, e.coordinate);
                closeClusters = false;
            } else if(featuresAtPixel &&  featuresAtPixel.get('features') != undefined && featuresAtPixel.get('features').length == 1  ){
                // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
                const feature = featuresAtPixel.get('features')[0];
                that.popupHandler(feature, e.coordinate);
            } else if (featuresAtPixel &&  featuresAtPixel.get('features') != undefined && featuresAtPixel.get('features').length > 1) {
                // Case when a clustered was click. If it has more than 4 features and is in a zoom level lower than maxZoom, zoom in
                // if(featuresAtPixel.get('features').length > 4 && theMap.getView().getZoom() < that.state.maxZoom) {
                //     theMap.getView().setZoom(theMap.getView().getZoom() + 1);
                //     theMap.getView().setCenter(featuresAtPixel.get('features')[0].getGeometry().getCoordinates());
                // } else {
                    if(that.state.expandedCluster) {
                        that.removeSpiderfiedClusterLayers(theMap);
                    }
                    that.displayOverlappingMarkers(featuresAtPixel, theMap, that);
                    closeClusters = false;

                // }

            } else {
                // Case when the click is anywhere else in the map
                if(closer) {
                    overlay.setPosition(undefined);
                    closer.blur();
                }

            }
            if(closeClusters && that.state.expandedCluster) {
                that.removeSpiderfiedClusterLayers(theMap);
            }

        });

        if (this.props.display_trends) {

            const trends_legend_var = document.getElementById('trends_legend');

            const noTrendArrow = '<p class=' + styles.noValueLegend + ' style="background: ' +
                this.getTrendColor("noTrend") + '; border-color: ' +
                this.getTrendColor("noTrend") + '; margin-left: 1em;"></p>';

            const trendUpArrow = '<p class=' + styles.upArrowLegend + ' style="border-color: ' +
                this.getTrendColor("trendUp") + '; margin-left: 1em; "></p>';

            const trendDownArrow = '<p class=' + styles.downArrowLegend + ' style="border-color: ' +
                this.getTrendColor("trendDown") + '; margin-left: 1em;"></p>';

            const overThresholdUpArrow = '<p class=' + styles.upArrowLegend + ' style="border-color: ' +
                this.getTrendColor("overThresholdUp") + ';"></p>';

            const overThresholdDownArrow = '<p class=' + styles.downArrowLegend + ' style="border-color: ' +
                this.getTrendColor("overThresholdDown") + ';"></p>';

            if (trends_legend_var) {
                trends_legend_var.innerHTML =
                    (
                        '<div class=' + styles.trends_legend_text + '>' +
                        trendUpArrow + ' - Trending Up <br/>' +
                        trendDownArrow + ' - Trending Down <br/>' +
                        noTrendArrow + ' - No Data Available <br/>' +
                        overThresholdUpArrow + overThresholdDownArrow + ' - Over Threshold  <br/> </div>'
                    );
            }

        }

        this.setState({map: theMap});
    }

}

export default Map