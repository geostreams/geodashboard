let ol = require('openlayers');
import {
    getSourceName, getParameterName, getCustomTrendsRegion,
    getTrendColor, getColor, getTrendsPageLakeRegions
} from './getConfig';
import {matchRegionTrends, getRegionalThreshold} from '../utils/trendsUtils';

export function sensorsToFeatures(sensors: Sensors):Array<ol.Feature> {
    let features = Array();
    sensors.map((sensor) => {

        let feature = new ol.Feature({
            geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
        });

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
            "color": getColor(sensor.properties.type.id),
            "type": "single"
        };

        feature.setId(sensor.properties.popupContent);
        features.push(feature);

    });
    return features;
}

export function sensorsToFeaturesTrendPage(
    sensors: Sensors, parameter: string, trends_parameter_lake_regions: Array):Array<ol.Feature>
{

    let features = Array();

    let trends_lake_regions_config = getTrendsPageLakeRegions();

    //This is the lakes with regions
    let trends_lakes_with_regions = [];
    trends_lake_regions_config.map(p => trends_lakes_with_regions = p.lake);

    //This is the regions within the lakes
    let trends_lake_regions = [];
    trends_lake_regions_config.map(p => trends_lake_regions = p.regions.split(','));

    sensors.map((sensor) => {

        if (sensor.name != 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });

            let trend_type = "";
            let trend_values = "";
            let threshold = 'n/a';

            if (sensor.hasOwnProperty("trends")) {
                // Not enough information present
                if (sensor.trends === "not enough data" || sensor.trends === "trends return no data") {
                    trend_type = "noTrend";
                } else {
                    // For Trends Page, only check Threshold and assign red arrows for certain parameters.
                    // Otherwise, only assign blue or yellow arrows with no Threshold check.
                    if (trends_parameter_lake_regions.indexOf(parameter) >= 0 ) {
                        if (trends_lakes_with_regions.indexOf(sensor.properties.region) >= 0 ) {
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
                    if (threshold == 'n/a') {
                        if (sensor.trends[parameter + "_percentage_change"] > 0 ) {

                            trend_type = "trendUp";

                        } else if (sensor.trends[parameter + "_percentage_change"] < 0 ) {

                            trend_type = "trendDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    } else {
                        // May have red arrows with Threshold check
                        if (sensor.trends[parameter + "_percentage_change"] > 0 &&
                            sensor.trends[parameter + "_last_average"] >= threshold) {

                            trend_type = "overThresholdUp";

                        } else if (sensor.trends[parameter + "_percentage_change"] > 0 &&
                            sensor.trends[parameter + "_last_average"] < threshold) {

                            trend_type = "trendUp";

                        } else if (sensor.trends[parameter + "_percentage_change"] < 0 &&
                            sensor.trends[parameter + "_last_average"] < threshold) {

                            trend_type = "trendDown";

                        } else if (sensor.trends[parameter + "_percentage_change"] < 0 &&
                            sensor.trends[parameter + "_last_average"] > threshold) {

                            trend_type = "overThresholdDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    }
                }

                let units = '';

                if (parameter) {
                    let unitIndex = getParameterName(parameter).lastIndexOf(" ");
                    units = getParameterName(parameter).substr(unitIndex + 1);
                }

                trend_values = [
                    (Number(sensor.trends[parameter + "_total_average"]).toFixed(2) + ' ' + units),
                    (Number(sensor.trends[parameter + "_interval_average"]).toFixed(2) + ' ' + units),
                    (Number(sensor.trends[parameter + "_last_average"]).toFixed(2) + ' ' + units),
                    (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                    (Number(sensor.trends[parameter + "_percentage_change"]).toFixed(2) + " %")
                ]

            }

            if (trend_type == "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "noTrend" || trend_type == "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
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
                "color": getColor(sensor.properties.type.id),
                "trend_color": getTrendColor(trend_type),
                "trend_type": trend_type,
                "trend_values": trend_values,
                "display_trends": true,
                "trends_detail": true,
                "region": getCustomTrendsRegion(sensor.properties.region),
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);
        }
    });

    return features;
}

export function sensorsToFeaturesTrendRegionPage(
    sensors: Sensors, parameter: string, trends_parameter_lake_regions: Array):Array<ol.Feature>
{

    let features = Array();

    let trends_lake_regions_config = getTrendsPageLakeRegions();

    //This is the lakes with regions
    let trends_lakes_with_regions = [];
    trends_lake_regions_config.map(p => trends_lakes_with_regions = p.lake);

    //This is the regions within the lakes
    let trends_lake_regions = [];
    trends_lake_regions_config.map(p => trends_lake_regions = p.regions.split(','));

    sensors.map((sensor) => {

        if (sensor.name != 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });

            let trend_type = "";
            let trend_values = "";
            let threshold = 'n/a';

            if (sensor.hasOwnProperty("region_trends")) {
                // Not enough information present
                if (sensor.trends === "not enough data" || sensor.region_trends === "trends return no data") {
                    trend_type = "noTrend";
                } else {
                    // For Trends Page, only check Threshold and assign red arrows for certain parameters.
                    // Otherwise, only assign blue or yellow arrows with no Threshold check.
                    if (trends_parameter_lake_regions.indexOf(parameter) >= 0 ) {
                        if (trends_lakes_with_regions.indexOf(sensor.properties.region) >= 0 ) {
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
                    if (threshold == 'n/a') {
                        if (sensor.region_trends["lastaverage"] >
                            sensor.region_trends["totalaverage"] ) {
                            trend_type = "trendUp";

                        } else if (sensor.region_trends["lastaverage"] <
                            sensor.region_trends["totalaverage"] ) {
                            trend_type = "trendDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    } else {
                        // May have red arrows with Threshold check
                        if (sensor.region_trends["lastaverage"] >
                            sensor.region_trends["totalaverage"] &&
                            sensor.region_trends["lastaverage"] >= threshold) {

                            trend_type = "overThresholdUp";

                        } else if (sensor.region_trends["lastaverage"] >
                            sensor.region_trends["totalaverage"] &&
                            sensor.region_trends["lastaverage"] < threshold) {

                            trend_type = "trendUp";

                        } else if (sensor.region_trends["lastaverage"] <
                            sensor.region_trends["totalaverage"]&&
                            sensor.region_trends["lastaverage"] < threshold) {

                            trend_type = "trendDown";

                        } else if (sensor.region_trends["lastaverage"] <
                            sensor.region_trends["totalaverage"] &&
                            sensor.region_trends["lastaverage"] > threshold) {

                            trend_type = "overThresholdDown";

                        } else {
                            trend_type = "noTrend";
                        }
                    }
                }

                let units = '';

                if (parameter) {
                    let unitIndex = getParameterName(parameter).lastIndexOf(" ");
                    units = getParameterName(parameter).substr(unitIndex + 1);
                }

                trend_values = [
                    (Number(sensor.region_trends["totalaverage"]).toFixed(2) + ' ' + units),
                    (Number(sensor.region_trends["tenyearsaverage"]).toFixed(2) + ' ' + units),
                    (Number(sensor.region_trends["lastaverage"]).toFixed(2) + ' ' + units)
                ]

            }

            if (trend_type == "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "noTrend" || trend_type == "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            }

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
                "parameter": getParameterName(parameter),
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);
        }
    });

    return features;
}

export function sensorsToFeaturesAnalysisPage(sensors: Sensors, parameter: string, threshold: string):Array<ol.Feature> {
    let features = Array();
    sensors.map((sensor) => {

        if (sensor.name != 'ALL') {

            let feature = new ol.Feature({
                geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
            });

            let trend_type = "";
            let trend_values = "";

            if (sensor.hasOwnProperty("trends")) {
                if (sensor.trends === "not enough data" || sensor.trends === "trends return no data") {
                    trend_type = "noTrend";
                } else {
                    if (sensor.trends[parameter + "_percentage_change"] > 0 &&
                        sensor.trends[parameter + "_last_average"] >= threshold) {

                        trend_type = "overThresholdUp";

                    } else if (sensor.trends[parameter + "_percentage_change"] > 0 &&
                        sensor.trends[parameter + "_last_average"] < threshold) {

                        trend_type = "trendUp";

                    } else if (sensor.trends[parameter + "_percentage_change"] < 0 &&
                        sensor.trends[parameter + "_last_average"] < threshold) {

                        trend_type = "trendDown";

                    } else if (sensor.trends[parameter + "_percentage_change"] < 0 &&
                        sensor.trends[parameter + "_last_average"] > threshold) {

                        trend_type = "overThresholdDown";

                    } else {
                        trend_type = "noTrend";
                    }
                }

                trend_values = [
                    threshold,
                    (Number(sensor.trends[parameter + "_total_average"]).toFixed(2) + " mg/L"),
                    (Number(sensor.trends[parameter + "_interval_average"]).toFixed(2) + " mg/L"),
                    (Number(sensor.trends[parameter + "_last_average"]).toFixed(2) + " mg/L"),
                    (new Date(sensor["trend_end_time"]).toLocaleDateString()),
                    (Number(sensor.trends[parameter + "_percentage_change"]).toFixed(2) + " %")
                ]

            }

            if (trend_type == "trendUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "trendDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdUp") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "overThresholdDown") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.RegularShape({
                        points: 3,
                        radius: 10,
                        rotation: 3.141592654,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
                        stroke: new ol.style.Stroke({color: '#000000', width: 1})
                    })
                }));
            } else if (trend_type == "noTrend" || trend_type == "") {
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({color: getTrendColor(trend_type)}),
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
                "color": getColor(sensor.properties.type.id),
                "trend_color": getTrendColor(trend_type),
                "trend_type": trend_type,
                "trend_values": trend_values,
                "display_trends": true,
                "trends_detail": true,
                "region": getCustomTrendsRegion(sensor.properties.region),
            };

            feature.setId(sensor.properties.popupContent);
            features.push(feature);
        }
    });

    return features;
}

export function popupHelperTrendDetailPage(feature: ol.Feature, styles){

    let id = feature.getId().toUpperCase();
    let sourceColor = feature.attributes.color;

    let popupText = '<p class=' + styles.regionPopupText + ' style="background-color: ' +
        sourceColor + ';">' + id + '</p>';

    return popupText;
}

export function sensorsToFeaturesTrendDetailPage(
    sensors: Sensors, parameter: string, threshold: number, region: string):Array<ol.Feature> {

    let features = Array();
    sensors.map((sensor) => {

        let feature = new ol.Feature({
            geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
        });

        feature.attributes = {
            "dataSource": getSourceName(sensor.properties.type),
            "maxEndTime": sensor.max_end_time,
            "minStartTime": sensor.min_start_time,
            "latitude": sensor.geometry.coordinates[1],
            "longitude": sensor.geometry.coordinates[0],
            "location": sensor.properties.region,
            "name": sensor.name,
            "color": getColor(sensor.properties.type.id),
            "trend_color": getTrendColor(""),
            "trend_type": "",
            "trend_values": "",
            "display_trends": true,
            "trends_detail": true,
            "region": getCustomTrendsRegion(sensor.properties.region),
        };

        feature.setId(sensor.properties.popupContent);
        features.push(feature);

    });

    return features;

}

export function generatePointsCircle(count: number, centerPixel) {
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

export function getMultiLineLayer(featuresAtPixel: ol.features, theMap) {
    // Expand features if they are not expanded
    const feature0 = featuresAtPixel.get('features')[0];
    const geometry = feature0.getGeometry();
    const coordinates = geometry.getCoordinates();
    const px = theMap.getPixelFromCoordinate(coordinates);
    const size = featuresAtPixel.get('features').length;
    let points =generatePointsCircle(size, px);
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
    featuresAtPixel.get('features').forEach(function(feature, index) {
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
        style: function(feature) {
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
                    src: 'data:image/svg+xml,' + iconSvg,
                })

            }));
        }
    });
    newFeaturesLayer.setZIndex(2);
    return [multiLineLayer, newFeaturesLayer];
}

export function getAttribution(){
    return new ol.Attribution({
        html: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, ' +
        'UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
    });
}
