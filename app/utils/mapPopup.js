export function popupHeader(feature: ol.Feature, styles){
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

    return headerText + bodyText;
}

export function popupParameters(feature: ol.Feature, styles){
    let sensorInfo = feature.attributes;
    let sourceColor = sensorInfo.color;

    let paramsLength = (sensorInfo.parameters).length;
    let paramsOrig = (sensorInfo.parameters);
    let paramsAlt = '';
    for (let i = 0; i < paramsLength; i++) {
        paramsAlt = paramsAlt + '<li>' + paramsOrig[i] + '</li>';
    }
    let params = '<ul>'.concat(paramsAlt, '</ul>');

    let bodyText =
        '<h3 class=' + styles.header3style + '>' + 'Parameters (' + paramsLength + '): </h3>' +
        '<div class=' + styles.paramsborder + '>' + params + '</div>' ;

    if(paramsLength > 0) {
        bodyText += '<a href="#/detail/location/'+ sensorInfo.name + '" class=' + styles.viewdetail + ' style="background-color: ' +
            sourceColor + ';">View detail</a>';
    }

    return bodyText;
}

export function popupTrends(feature: ol.Feature, styles){
    let sensorInfo = feature.attributes;

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

    let bodyText =
        '<table class=' + styles.tablestyle + '>' +
        trends +
        '</table>';
    let paramsLength = (sensorInfo.parameters).length;
    let sourceColor = sensorInfo.color;
    if(paramsLength > 0 && sensorInfo.trends_detail){
        bodyText += '<a href="#/detail/location/'+ sensorInfo.name + '" class=' + styles.viewsitedetail +
            ' style="background-color: ' + sourceColor + ';">View Details for the ' +
            sensorInfo.name + ' Site </a>';
    }

    if(sensorInfo.trends_detail) {
        bodyText += '<a href="#/trendsdetail/region/'+ sensorInfo.location + '" class=' + styles.viewdetail +
            ' style="background-color: ' + sourceColor + ';">View Details for the ' +
            sensorInfo.region + ' Region </a>';
    }
    return bodyText;
}

export function removePopup(theMap){
    const closer = document.getElementById('popup-closer');
    if (closer) {
        theMap.getOverlayById("marker").setPosition(undefined);
        closer.blur();
    }
}

export function popupRegion(feature: ol.Feature, styles){

    let id = feature.getId().toUpperCase();
    let sensorInfo = feature.attributes;

    let sensorTrends = sensorInfo.trend_type;
    let trendColor = sensorInfo.trend_color;
    let trendValues = sensorInfo.trend_values;

    let trendsLeft = '';
    let trendsRight = '';

    let startTime = new Date(sensorInfo.minStartTime).toLocaleDateString();
    let endTime = new Date(sensorInfo.maxEndTime).toLocaleDateString();
    let timePeriod = '<tr><td><strong>Time Period: </strong></td>'.concat('<td>', startTime, ' - ',
        endTime, '</td></tr>');

    let sourceColor = sensorInfo.color;

    let headerText = '<h2 class=' + styles.header2style + ' style="background-color: ' +
        sourceColor + ';">' + id + '</h2>';

    let bodyText =
        '<table class=' + styles.popup_table + '>' +
            timePeriod +
        '</table>' +
        '<div class=' + styles.greyborder + '></div>';

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

    let regionText =
        '<table class=' + styles.tablestyle + '>' +
            trends +
        '</table>';

    if(sensorInfo.trends_detail) {
        regionText += '<a href="#/trendsdetail/region/'+ sensorInfo.location + '" class=' + styles.viewdetail +
            ' style="background-color: ' + sourceColor + ';">View Details for the ' +
            sensorInfo.region + ' Region </a>';
    }
    return headerText + bodyText + regionText;
}