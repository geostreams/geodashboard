/*
 * @flow
 */

import ol from 'openlayers';
import {
    getSourceName, getCustomTrendsRegion,
    getTrendColor, getColor, getTrendsPageLakeRegions, getMapAttributionsSetting,
    getMapAttributionsCollapsibleSetting, getMapMiniAttributionsCollapsibleSetting,
    getMobileSizeMax, getMobileSourceNames, getClustersDistance
} from './getConfig';
import {matchRegionTrends, getRegionalThreshold} from '../utils/trendsUtils';
import type {Parameters, Sensors} from '../utils/flowtype';
import {pnpoly} from "./arrayUtils";


// FIXME: TEMPORARY CORRECTION - All usages should be removed in the future
export function checkPopupContent(sensor: Object) {
    let sensorID = sensor.properties.popupContent;
    if (sensor.properties.popupContent === sensor.properties.name && sensor.properties.location) {
        sensorID = sensor.properties.location;
    }

    return sensorID;
}

export function sensorsToFeatures(sensors: Sensors, parameters: Parameters): Array<ol.Feature> {
    let features = Array();

    if (screen.width <= getMobileSizeMax()) {
        let mobile_sourcenames = getMobileSourceNames().toUpperCase();
        if (mobile_sourcenames !== 'ALL') {
            let mobile_data = sensors;
            mobile_data = mobile_data
                .filter(data => mobile_sourcenames
                    .includes((data.properties.type.id).toString().toUpperCase()));
            sensors = mobile_data;
        }
    }

    sensors.map((sensor) => {

        let feature = new ol.Feature({
            geometry: new ol.geom.Point(
                [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]]
            ).transform('EPSG:4326', 'EPSG:3857')
        });
        let sensor_parameters = [];
        sensor.parameters.filter(x => x !== null).map(y => {
                const parameter = parameters.find(x => x.name === y);
                if (parameter !== undefined && parameter.title !== undefined) {
                    sensor_parameters.push(parameter.title);
                }
            }
        );

        let onlineStatusVal = 'none';
        if (sensor.properties.online_status) {
            onlineStatusVal = sensor.properties.online_status;
        }

        feature.attributes = {
            "name": sensor.name,
            "dataSource": getSourceName(sensor.properties.type),
            "maxEndTime": sensor.max_end_time,
            "minStartTime": sensor.min_start_time,
            "latitude": sensor.geometry.coordinates[1],
            "longitude": sensor.geometry.coordinates[0],
            "location": sensor.properties.region,
            "parameters": sensor_parameters,
            "color": getColor(sensor.properties.type.id),
            "type": "single",
            "onlineStatus": onlineStatusVal,
            "id": sensor.id
        };

        let sensorID = checkPopupContent(sensor);

        feature.setId(sensorID);
        features.push(feature);

    });
    return features;
}

export function sensorsToFeaturesTrendPage(
    sensors: Sensors, parameter: string, trends_parameter_lake_regions: Array<string>,
    parameters: Array<any>): Array<ol.Feature> {

    let features = Array();

    let trends_lake_regions_config = getTrendsPageLakeRegions();

    //This is the lakes with regions
    let trends_lakes_with_regions = [];
    trends_lake_regions_config.map(p => trends_lakes_with_regions = p.lake);

    //This is the regions within the lakes
    let trends_lake_regions = [];
    trends_lake_regions_config.map(p => trends_lake_regions = p.regions.split(','));
    let the_parameter = '';
    sensors.map((sensor: any) => {

        the_parameter = parameters.find(x => x.name === parameter);
        const units = the_parameter !== undefined ? the_parameter.unit : '';
        const param_title = the_parameter !== undefined ? the_parameter.title : '';

        if (sensor.name && sensor.name !== 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point(
                    [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]]
                ).transform('EPSG:4326', 'EPSG:3857')
            });

            let trend_type = "";
            let trend_values = "";
            let threshold = 'n/a';

            if (sensor.hasOwnProperty("trends")) {
                // Not enough information present
                if (sensor.trends === null) {
                    trend_type = "noTrend";
                } else {
                    // For Trends Page, only check Threshold and assign red arrows for certain parameters.
                    // Otherwise, only assign blue or yellow arrows with no Threshold check.
                    if (trends_parameter_lake_regions.indexOf(parameter) >= 0) {
                        if (trends_lakes_with_regions.indexOf(sensor.properties.region) >= 0) {
                            for (let i = 0; i < trends_lake_regions.length; i++) {
                                if (matchRegionTrends(trends_lake_regions[i], sensor)) {
                                    threshold = getRegionalThreshold(trends_lake_regions[i], sensor, parameter);
                                }
                            }
                        } else {
                            threshold = getRegionalThreshold(sensor.properties.region, sensor, parameter);
                        }
                    }
                    // Only blue or yellow arrows
                    if (threshold === 'n/a') {
                        if (sensor.trends["percentage_change"] > 0) {

                            trend_type = "trendUp";

                        } else if (sensor.trends["percentage_change"] < 0) {

                            trend_type = "trendDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    } else {
                        // May have red arrows with Threshold check
                        if (sensor.trends["percentage_change"] > 0 &&
                            sensor.trends["last_average"] >= threshold) {

                            trend_type = "overThresholdUp";

                        } else if (sensor.trends["percentage_change"] > 0 &&
                            sensor.trends["last_average"] < threshold) {

                            trend_type = "trendUp";

                        } else if (sensor.trends["percentage_change"] < 0 &&
                            sensor.trends["last_average"] < threshold) {

                            trend_type = "trendDown";

                        } else if (sensor.trends["percentage_change"] < 0 &&
                            sensor.trends["last_average"] > threshold) {

                            trend_type = "overThresholdDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    }
                    // the_parameter = parameters.find(x => x.name === parameter);
                    // const units = the_parameter !== undefined ? the_parameter.unit : '';
                    // const param_title = the_parameter !== undefined ? the_parameter.title : '';

                    trend_values = [
                        (Number(sensor.trends["total_average"]).toFixed(2) + ' ' + units),
                        (Number(sensor.trends["interval_average"]).toFixed(2) + ' ' + units),
                        (Number(sensor.trends["last_average"]).toFixed(2) + ' ' + units),
                        (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                        (Number(sensor.trends["percentage_change"]).toFixed(2) + " %")
                    ]
                }
            }

            if (trend_type === "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "noTrend" || trend_type === "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            }

            let sensor_parameters = [];
            if (sensor.parameters && (sensor.parameters.length > 0)) {
                sensor.parameters.filter(x => x !== null).map(y => {
                        const parameter = parameters.find(x => x.name === y);
                        if (parameter !== undefined && parameter.title !== undefined) {
                            sensor_parameters.push(parameter.title);
                        }
                    }
                );
            }

            feature.attributes = {
                "dataSource": getSourceName(sensor.properties.type),
                "maxEndTime": sensor.max_end_time,
                "minStartTime": sensor.min_start_time,
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
                "location": sensor.properties.region,
                "name": sensor.name,
                "parameters": sensor_parameters,
                "color": getColor(sensor.properties.type.id),
                "trend_color": getTrendColor(trend_type),
                "trend_type": trend_type,
                "trend_values": trend_values,
                "display_trends": true,
                "trends_detail": true,
                "region": getCustomTrendsRegion(sensor.properties.region),
                "trend_parameter": param_title
            };

            let sensorID = checkPopupContent(sensor);

            feature.setId(sensorID);
            features.push(feature);
        }
    });

    return features;
}

export function sensorsToFeaturesTrendRegionPage(
    sensors: Sensors, parameter: string, season: string,
    trends_parameter_lake_regions: Array<string>, parameters: Array<Object>): Array<ol.Feature> {

    let features = Array();

    let trends_lake_regions_config = getTrendsPageLakeRegions();

    //This is the lakes with regions
    let trends_lakes_with_regions = [];
    trends_lake_regions_config.map(p => trends_lakes_with_regions = p.lake);

    //This is the regions within the lakes
    let trends_lake_regions = [];
    trends_lake_regions_config.map(p => trends_lake_regions = p.regions.split(','));
    const the_parameter = parameters.find(x => x.name === parameter);
    sensors.map((sensor: any) => {

        if (sensor.name !== 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point(
                    [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]]
                ).transform('EPSG:4326', 'EPSG:3857')
            });

            let trend_type = "";
            let trend_values = "";
            let threshold = 'n/a';

            if (sensor.hasOwnProperty("region_trends")) {
                let ten_years_average = sensor.region_trends["tenyearsaverage"];
                let total_average = sensor.region_trends["totalaverage"];
                let last_average = sensor.region_trends["lastaverage"];

                // Not enough information present
                if (sensor.trends === null) {
                    trend_type = "noTrend";
                } else {

                    // For Trends Page, only check Threshold and assign red arrows for certain parameters.
                    // Otherwise, only assign blue or yellow arrows with no Threshold check.
                    if (trends_parameter_lake_regions.indexOf(parameter) >= 0) {
                        if (trends_lakes_with_regions.indexOf(sensor.properties.region) >= 0) {
                            for (let i = 0; i < trends_lake_regions.length; i++) {
                                if (matchRegionTrends(trends_lake_regions[i], sensor)) {
                                    threshold = getRegionalThreshold(trends_lake_regions[i], sensor, parameter);
                                }
                            }
                        } else {
                            threshold = getRegionalThreshold(sensor.properties.region, sensor, parameter);
                        }
                    }

                    // Only blue or yellow arrows
                    if (threshold === 'n/a') {
                        if (ten_years_average > total_average) {
                            trend_type = "trendUp";

                        } else if (ten_years_average < total_average) {
                            trend_type = "trendDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    } else {
                        // May have red arrows with Threshold check
                        if (ten_years_average > total_average && ten_years_average >= threshold) {

                            trend_type = "overThresholdUp";

                        } else if (ten_years_average > total_average && ten_years_average < threshold) {

                            trend_type = "trendUp";

                        } else if (ten_years_average < total_average && ten_years_average < threshold) {

                            trend_type = "trendDown";

                        } else if (ten_years_average < total_average && ten_years_average > threshold) {

                            trend_type = "overThresholdDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    }
                }


                const units = the_parameter !== undefined ? the_parameter.unit : '';
                let percentage_change =
                    (Number(ten_years_average) - Number(total_average))
                    / Number(total_average) * 100;

                trend_values = [
                    (Number(total_average).toFixed(2) + ' ' + units),
                    (Number(ten_years_average).toFixed(2) + ' ' + units),
                    (Number(last_average).toFixed(2) + ' ' + units),
                    (Number(percentage_change).toFixed(2) + '%')
                ]

            }

            if (trend_type === "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "noTrend" || trend_type === "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            }
            const parameter_title = the_parameter !== undefined ? the_parameter.title : '';

            feature.attributes = {
                "dataSource": getSourceName(sensor.properties.type),
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
                "location": sensor.properties.region,
                "name": sensor.name,
                "color": getColor(sensor.properties.type.id),
                "trend_color": getTrendColor(trend_type),
                "trend_type": trend_type,
                "trend_values": trend_values,
                "display_trends": true,
                "trends_detail": true,
                "region": getCustomTrendsRegion(sensor.properties.region),
                "parameter": parameter_title,
                "url_parameter": parameter,
                "season": season,
            };

            let sensorID = checkPopupContent(sensor);

            feature.setId(sensorID);
            features.push(feature);
        }
    });

    return features;
}

export function sensorsToFeaturesAnalysisPage(
    sensors: Sensors, parameter: string, threshold: string, parameters: Parameters): Array<ol.Feature> {
    let features = Array();

    sensors.map((sensor: any) => {

        if (sensor.name && sensor.name !== 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point(
                    [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]]
                ).transform('EPSG:4326', 'EPSG:3857')
            });

            let trend_type = "";
            let trend_values = "";

            if (sensor.hasOwnProperty("trends")) {
                if (sensor.trends === null) {
                    trend_type = "noTrend";
                    trend_values = [
                        threshold,
                        "null",
                        "null",
                        "null",
                        (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                        "null"
                    ]

                } else {
                    if (sensor.trends["percentage_change"] > 0 &&
                        sensor.trends["last_average"] >= threshold) {

                        trend_type = "overThresholdUp";

                    } else if (sensor.trends["percentage_change"] > 0 &&
                        sensor.trends["last_average"] < threshold) {

                        trend_type = "trendUp";

                    } else if (sensor.trends["percentage_change"] < 0 &&
                        sensor.trends["last_average"] < threshold) {

                        trend_type = "trendDown";

                    } else if (sensor.trends["percentage_change"] < 0 &&
                        sensor.trends["last_average"] > threshold) {

                        trend_type = "overThresholdDown";

                    } else {
                        trend_type = "noTrend";
                    }

                    const the_parameter = parameters.find(x => x.name === parameter);
                    const units = the_parameter !== undefined ? the_parameter.unit : '';

                    trend_values = [
                        (Number(sensor.trends["total_average"]).toFixed(2) + ' ' + units),
                        (Number(sensor.trends["interval_average"]).toFixed(2) + ' ' + units),
                        (Number(sensor.trends["last_average"]).toFixed(2) + ' ' + units),
                        (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                        (Number(sensor.trends["percentage_change"]).toFixed(2) + " %")
                    ]

                }

            }

            if (trend_type === "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type === "noTrend" || trend_type === "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            }

            let sensor_parameters = [];
            if (sensor.parameters && (sensor.parameters.length > 0)) {
                sensor.parameters.filter(x => x !== null).map(y => {
                        const parameter = parameters.find(x => x.name === y);
                        if (parameter !== undefined && parameter.title !== undefined) {
                            sensor_parameters.push(parameter.title);
                        }
                    }
                );
            }

            feature.attributes = {
                "dataSource": getSourceName(sensor.properties.type),
                "maxEndTime": sensor.max_end_time,
                "minStartTime": sensor.min_start_time,
                "latitude": sensor.geometry.coordinates[1],
                "longitude": sensor.geometry.coordinates[0],
                "location": sensor.properties.region,
                "name": sensor.name,
                "parameters": sensor_parameters,
                "color": getColor(sensor.properties.type.id),
                "trend_color": getTrendColor(trend_type),
                "trend_type": trend_type,
                "trend_values": trend_values,
                "display_trends": true,
                "trends_detail": true,
                "region": getCustomTrendsRegion(sensor.properties.region),
            };

            let sensorID = checkPopupContent(sensor);

            feature.setId(sensorID);
            features.push(feature);
        }
    });

    return features;
}

export function popupHelperTrendDetailPage(feature: ol.Feature, styles: any) {

    let id = feature.getId().toUpperCase();
    let sourceColor = feature.attributes.color;

    let popupText = '<p class=' + styles.regionPopupText + ' style="background-color: ' +
        sourceColor + ';">' + id + '</p>';

    return popupText;
}

export function sensorsToFeaturesTrendDetailPage(
    sensors: Sensors, parameter: string, region: string): Array<ol.Feature> {

    let features = Array();
    sensors.map((sensor) => {

        if (sensor.properties.type.id === 'epa') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point(
                    [sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]]
                ).transform('EPSG:4326', 'EPSG:3857')
            });

            feature.attributes = {
                "name": sensor.name,
                "color": getColor(sensor.properties.type.id),
            };

            let sensorID = checkPopupContent(sensor);

            feature.setId(sensorID);
            features.push(feature);
        }
    });

    return features;

}

export function generatePointsCircle(count: number, centerPixel: Array<number>) {
    // Generate points within a circle where the markers will be displayed.
    let separation = 20;
    if (screen.width <= getMobileSizeMax()) {
        separation = 100;
    }
    const twoPi = Math.PI * 2;
    const start_angle = twoPi / 12;
    const circumference = separation * (2 + count);
    const legLength = circumference / twoPi;
    const angleStep = twoPi / count;
    const res = [];

    for (let i = count - 1; i >= 0; i--) {
        const angle = start_angle + i * angleStep;
        res[i] = [centerPixel[0] + legLength * Math.cos(angle),
            centerPixel[1] + legLength * Math.sin(angle)];
    }

    return res;
}

export function getMultiLineLayer(featuresAtPixel: ol.features, theMap: ol.Map) {
    // Expand features if they are not expanded
    const feature0 = featuresAtPixel.get('features')[0];
    const geometry = feature0.getGeometry();
    const coordinates = geometry.getCoordinates();
    const px = theMap.getPixelFromCoordinate(coordinates);
    const size = featuresAtPixel.get('features').length;
    let points = generatePointsCircle(size, px);
    // Create lines to where each marker is going to be placed
    let multiLineString = new ol.geom.MultiLineString([]);
    let multiLineLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({geometry: multiLineString})
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
    let newFeatures = Array();
    featuresAtPixel.get('features').forEach(function (feature, index) {
        let cd_end = theMap.getCoordinateFromPixel(points[index]);

        multiLineString.appendLineString(
            new ol.geom.LineString([coordinates, cd_end])
        );

        // feature.setStyle(style);
        // feature.setOpacity(0.2);
        feature.setGeometry(new ol.geom.Point(cd_end));
        newFeatures.push(feature);

    });

    let newFeaturesSource = new ol.source.Vector({
        features: newFeatures
    });

    let newFeaturesLayer = new ol.layer.Vector({
        source: newFeaturesSource,
        style: function (feature) {
            let scale_value = 1.0;
            if (screen.width <= getMobileSizeMax()) {
                scale_value = 4.0;
            }
            let sensorColor = feature.attributes.color;
            let iconSvg = '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
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
                    src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSvg),
                    imgSize: [15, 25],
                    scale: scale_value
                })

            }));
        }
    });
    newFeaturesLayer.setZIndex(2);
    return [multiLineLayer, newFeaturesLayer];
}

export function aboutPopupMenu() {
    let icon_content = document.getElementById('about-this-data');

    let popupText = (
        '<br/> All trend calculations are utilizing the delta between the 10 year average ' +
        'minus the lifetime average over the lifetime average to calculate the trending ' +
        'direction. Even though this information provides a good indication towards the ' +
        'stability of the lake environment, it should not be used as a definitive indication ' +
        'and only predictor. <br/><br/>' +
        '* Trends based on sensor data are calculated using the average ' +
        'parameter value in the top two meters of the water column. Depth profiles for the ' +
        'entire water column can be found at the explore data link. <br/>'
    );

    if (icon_content) {
        icon_content.innerHTML = popupText.toString();
    }
}

export function getAttribution() {
    return new ol.Attribution({
        html: getMapAttributionsSetting()
    });
}

export function getControls() {
    return ol.control.defaults({
        attributionOptions: ({
            collapsible: getMapAttributionsCollapsibleSetting()
        })
    })
}

export function getMiniControls() {
    return ol.control.defaults({
        attributionOptions: ({
            collapsible: getMapMiniAttributionsCollapsibleSetting()
        })
    })
}

export function clusteringOptions(theMap: ol.Map, disable_clusters: boolean) {
    let clusterDistance = disable_clusters ? 0 : getClustersDistance();
    let all_map_layers = theMap.getLayers().getArray().slice();
    all_map_layers.map(map_layer => {
        let layer_name = map_layer.get('name');
        if ('clusters_layer' === layer_name) {
            let source = map_layer.getSource();
            source.setDistance(clusterDistance);
        }
    });
}

export function matchMapArea(lonLatPoint: Array<number>) {
    let sensorLocationValue = '';

    window.configruntime.gd3.sensors_regions.map((location) => {
        if (
            pnpoly(Number(lonLatPoint[1]), Number(lonLatPoint[0]),
                location.geometry.coordinates) === true
        ) {
            sensorLocationValue = location.properties.id;
        }
    });

    return sensorLocationValue;
}