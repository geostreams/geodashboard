/*
 * @flow
 */

import ol from 'openlayers';

import {
    getColor, getMobileSizeMax, getMobileDetailPath, displayOnlineStatus, maxDisplayParams
} from './getConfig';

export function popupHeader(feature: ol.Feature, styles: Object, online: boolean = false) {
    let id = feature.getId().toUpperCase();
    let sensorInfo = feature.attributes;

    let dataSourceValue = (sensorInfo.dataSource);
    let dataSource = '<tr><td width="30%" align="right" class=' + styles.table_title + '>' +
        '<strong>Data Source </strong></td>'.concat(
            '<td width="70%">', dataSourceValue, ' Monitoring Site</td></tr>');

    let startTime = new Date(sensorInfo.minStartTime).toLocaleDateString();
    let endTime = new Date(sensorInfo.maxEndTime).toLocaleDateString();
    let timePeriod = '<tr><td width="30%" align="right"><strong>Time Period </strong></td>'.concat(
        '<td>', startTime, ' - ', endTime, '</td></tr>');

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
    let latlong = '<tr><td width="30%" align="right"><strong>Lat, Long </strong></td>'.concat(
        '<td>', latitude, ', ', longitude, '</td></tr>');

    let sourceColor = sensorInfo.color;

    let headerText = '<h2 class=' + styles.header2style + ' style="background-color: ' +
        sourceColor + ';">' + id + '</h2>';

    let onlineStatus = '';
    if (displayOnlineStatus() === true && online === true && sensorInfo.onlineStatus !== 'none') {
        let onlineStatusVal = sensorInfo.onlineStatus.charAt(0).toUpperCase() + sensorInfo.onlineStatus.slice(1);
        onlineStatus = '<tr><td width="30%" align="right"><strong>Online Status </strong></td>'.concat(
            '<td width="70%">', onlineStatusVal, '</td></tr>');
    }

    let bodyText =
        '<table class=' + styles.popup_table + '> ' +
            dataSource +
            timePeriod +
            latlong +
            onlineStatus +
        '</table>';

    return headerText + bodyText;
}

export function popupParameters(feature: ol.Feature, styles: Object) {

    let detail_link = `/${location.pathname.split('/')[1]}/detail/location/`;
    if (screen.width <= getMobileSizeMax()) {
        detail_link = getMobileDetailPath();
    }
    let sensorInfo = feature.attributes;

    let paramsLength = (sensorInfo.parameters).length;
    let paramsOrig = (sensorInfo.parameters);
    let paramsAlt = '<tr><td width="30%" align="right"> </td>'.concat(
        '<td width="70%">', 'No Parameters Available', '</td></tr>');
    if (paramsLength <= maxDisplayParams()) {
        for (let i = 0; i < paramsLength; i++) {
            let paramsParts = paramsOrig[i].split('(', 2);
            let paramsName = paramsParts[0];
            let paramsUnit = '';
            if (paramsOrig[i].indexOf('(') >= 0) {
                paramsUnit = '<span class=' + styles.params_unit + '>' +
                    paramsOrig[i].substring(paramsOrig[i].indexOf('(')) + ' </span>';
            }
            if (i === 0) {
                paramsAlt =
                    '<tr><td width="30%" align="right" class=' + styles.table_title + '>' +
                    '<strong>Parameters (' + paramsLength + ') </strong></td>' +
                    '<td width="70%"> ' + paramsName + paramsUnit + ' </td></tr>';
            } else {
                paramsAlt = paramsAlt +
                    '<tr><td width="30%" align="right"> </td>'.concat(
                        '<td width="70%">', paramsName + paramsUnit, '</td></tr>');
            }
        }
    } else {
        paramsAlt =
            '<tr><td width="30%" align="right" class=' + styles.table_title + '>' +
            '<strong class=' + styles.table_title + '>Parameters </strong>' +
            '<i class="material-icons ' + styles.params_icon + '">warning </i>' + '</td>' +
            '<td width="70%">' + 'There are too many parameters to display here. </td></tr>' +
            '<tr><td width="30%" align="right"> </td>' + '<td width="70%"> ' +
            '<a href="' + detail_link + encodeURIComponent(sensorInfo.name) + '/All/" >View Data</a> ' +
            'to see a full list of parameters for this site.' + ' </td></tr>';
    }

    let params =
        '<table class=' + styles.params_table + '> ' +
            paramsAlt +
        '</table>';

    let bodyText = '<div class=' + styles.paramsborder + '>' + params + '</div>';

    bodyText += '<a href="' + detail_link + encodeURIComponent(sensorInfo.name) + '/All/" class=' +
        styles.viewdetail + ' >View Data</a>';

    return bodyText;

}

export function popupAnalysis(feature: ol.Feature, styles: Object) {
    let sensorInfo = feature.attributes;
    let sensorTrends = sensorInfo.trend_type;
    let trendColor = sensorInfo.trend_color;
    let trendValues = sensorInfo.trend_values;
    let trendsLeft = '';
    let trendsRight = '';

    if (sensorTrends === "noTrend" || sensorTrends === "") {

        let leftText = " ";
        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
            trendColor + '; border-color: ' + trendColor + ';">' + leftText + '</p></td></tr>';

        let rightText = "Not enough data to display";
        trendsRight = '' +
            '<tr><td><strong>' + rightText + ' </strong></td></tr>';

    } else {

        if (sensorTrends === 'trendUp' || sensorTrends === 'overThresholdUp') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.upArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + '; ">' + trendValues[4] + '</p></td></tr>';
        } else if (sensorTrends === 'trendDown' || sensorTrends === 'overThresholdDown') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.downArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        } else if (sensorTrends === 'noTrend') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        } else {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        }

        trendsRight = '' +
            '<tr><td><strong>Baseline Avg: </strong>' + trendValues[0] + '</td></tr>' +
            '<tr><td><strong>Rolling Avg: </strong>' + trendValues[1] + '</td></tr>' +
            '<tr><td><strong>Latest Value: </strong>' + trendValues[2] + '</td></tr>'
    }

    let trends = trendsLeft + trendsRight;

    let bodyText =
        '<table class=' + styles.tablestyle + '> ' +
            trends +
        '</table>';
    let paramsLength = 0;
    if (sensorInfo.parameters && sensorInfo.parameters.length > 0) {
        paramsLength = sensorInfo.parameters.length;
    }

    if (paramsLength > 0 && sensorInfo.trends_detail) {
        bodyText += `<a href="/${location.pathname.split('/')[1]}/detail/location/` +
            encodeURIComponent(sensorInfo.name) + '/All/" class=' +
            styles.viewsitedetail + ' >View Data for the ' + sensorInfo.name + ' Site </a>';
    }

    return bodyText;

}

export function popupTrends(feature: ol.Feature, styles: Object) {
    let sensorInfo = feature.attributes;
    let sensorTrends = sensorInfo.trend_type;
    let trendColor = sensorInfo.trend_color;
    let trendValues = sensorInfo.trend_values;
    let parameter = sensorInfo.trend_parameter;
    let trendsLeft = '';
    let trendsRight = '';

    if (sensorTrends === "noTrend" || sensorTrends === "") {

        let leftText = " ";
        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
            trendColor + '; border-color: ' + trendColor + ';">' + leftText + '</p></td></tr>';

        let rightText = "Not enough data to display";
        trendsRight = '' +
            '<tr><td><strong>' + rightText + ' </strong></td></tr>';

    } else {

        if (sensorTrends === 'trendUp' || sensorTrends === 'overThresholdUp') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.upArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + '; ">' + trendValues[4] + '</p></td></tr>';
        } else if (sensorTrends === 'trendDown' || sensorTrends === 'overThresholdDown') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.downArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        } else if (sensorTrends === 'noTrend') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        } else {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';">' + trendValues[4] + '</p></td></tr>';
        }

        trendsRight = '' +
            '<tr><td><strong>Parameter: </strong>' + parameter + '</td></tr>' +
            '<tr><td><strong>Total Avg: </strong>' + trendValues[0] + '</td></tr>' +
            '<tr><td><strong>Ten Year Avg: </strong>' + trendValues[1] + '</td></tr>' +
            '<tr><td><strong>Latest Avg: </strong>' + trendValues[2] + '</td></tr>';
    }

    let trends = trendsLeft + trendsRight;

    let bodyText =
        '<table class=' + styles.tablestyle + '> ' +
            trends +
        '</table>';
    let paramsLength = 0;
    if (sensorInfo.parameters && sensorInfo.parameters.length > 0) {
        paramsLength = sensorInfo.parameters.length;
    }

    if (paramsLength > 0 && sensorInfo.trends_detail) {
        bodyText += `<a href="/${location.pathname.split('/')[1]}/detail/location/` +
            encodeURIComponent(sensorInfo.name) + '/All/" class=' +
            styles.viewsitedetail + ' >View Data for the ' + sensorInfo.name + ' Site </a>';
    }

    return bodyText;

}

export function popupRegion(feature: ol.Feature, styles: Object) {

    let id = feature.getId().toUpperCase();
    let sensorInfo = feature.attributes;

    let trendColor = sensorInfo.trend_color;
    let sensorTrends = sensorInfo.trend_type;
    let trendValues = sensorInfo.trend_values;
    let sourceColor = getColor('epa');
    let parameter = sensorInfo.parameter;

    let headerText = '<h2 class=' + styles.header2style + ' style="background-color: ' +
        sourceColor + ';">' + id + '</h2>';

    let trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
        trendColor + '; border-color: ' + trendColor + ';"></p></td></tr>';

    let trendsRight = '';

    if (sensorTrends === "noTrend" || sensorTrends === "") {

        let leftText = " ";
        trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
            trendColor + '; border-color: ' + trendColor + ';">' + leftText + '</p></td></tr>';

        let rightText = "Not enough data to display";
        trendsRight = '' +
            '<tr><td><strong>' + rightText + '</strong></td></tr>';

    } else {

        if (sensorTrends === 'trendUp' || sensorTrends === 'overThresholdUp') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.upArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + '; "> ' + trendValues[3] + ' </p></td></tr>';
        } else if (sensorTrends === 'trendDown' || sensorTrends === 'overThresholdDown') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.downArrow + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';"> ' + trendValues[3] + ' </p></td></tr>';
        } else if (sensorTrends === 'noTrend') {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';"> ' + trendValues[3] + ' </p></td></tr>';
        } else {
            trendsLeft = '<tr><td rowspan="5"><p class=' + styles.noValue + ' style="background: ' +
                trendColor + '; border-color: ' + trendColor + ';"> ' + trendValues[3] + ' </p></td></tr>';
        }

        trendsRight = '' +
            '<tr><td><strong>Parameter: </strong>' + parameter + '</td></tr>' +
            '<tr><td><strong>Total Avg: </strong>' + trendValues[0] + '</td></tr>' +
            '<tr><td><strong>Ten Year Avg: </strong>' + trendValues[1] + '</td></tr>' +
            '<tr><td><strong>Latest Avg: </strong>' + trendValues[2] + '</td></tr>';
    }

    let trends = trendsLeft + trendsRight;

    let regionText =
        '<table class=' + styles.tablestyle + '> ' +
            trends +
        '</table>';

    if (sensorInfo.trend_type !== 'noTrend' && sensorInfo.trend_type !== "") {
        regionText += '<a href="/trendsdetail/region/' + sensorInfo.location +
            '/' + sensorInfo.url_parameter + '/' + sensorInfo.season + '" class=' +
            styles.viewdetail + '>View Data for the ' + sensorInfo.region + ' Region </a>';

    }
    return headerText + regionText;
}

export function removePopup(theMap: ol.Map) {
    const closer = document.getElementById('popup-closer');
    if (closer) {
        theMap.getOverlayById("marker").setPosition(undefined);
        closer.blur();
    }
}
