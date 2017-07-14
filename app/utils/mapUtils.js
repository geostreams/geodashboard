let ol = require('openlayers');
import {getSourceName, getParameterName, getCustomLocation, getTrendColor, getColor} from './getConfig'


export function popupHelper(feature: ol.Feature, styles){
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


    return headerText + bodyText;
}



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

export function sensorsToFeaturesTrend(sensors: Sensors):Array<ol.Feature> {
    let features = Array();
    sensors.map((sensor) => {

        let feature = new ol.Feature({
            geometry: new ol.geom.Point([sensor.geometry.coordinates[0], sensor.geometry.coordinates[1]])
        });

        let trend_type = "";
        let trend_values = "";

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
            };


        feature.setId(sensor.properties.popupContent);
        features.push(feature);

    });
    return features;
}

function generatePointsCircle(count: number, centerPixel) {
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