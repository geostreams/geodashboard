/*
 * @flow
 */

import type { PropertiesType } from './flowtype';

export function getSourceName(source:PropertiesType):string {
    const sourcename = window.configruntime.gd3.sourcename;
    return sourcename[source.id] !== undefined ? sourcename[source.id] : source.title;
}

export function getMobileSourceNames() {
    return window.configruntime.gd3.mobile_sourcename;
}

export function getMobileSizeMax() {
    return window.configruntime.gd3.mobile_size_max;
}

export function getMobileDetailPath() {
    return window.configruntime.gd3.mobile_detail_path;
}

export function getMobileExplorePath() {
    return window.configruntime.gd3.mobile_explore_path;
}

export function getCustomLocation(location:string):Object {
    const additional_location = window.configruntime.gd3.additional_locations;

    const custom_location = additional_location.find(
        function (custom_location) {
            return custom_location.properties.id === location;
        });
    return custom_location;
}

export function getLocationName(location:string):string {
    // old code, keep this for other geodashboard
    //const named_locations = window.configruntime.gd3.named_locations;
    //if( named_locations[location] !== undefined)
    //    return named_locations[location]

    const custom_location = getCustomLocation(location);

    if( custom_location)
        return custom_location.properties.title;
    return location;
}

function capitalize(a:string):string {
    return a.charAt(0).toUpperCase() + a.slice(1);
}

export function getAlternateParameters(){
    let parameters = {};
	Object.keys(window.configruntime.gd3.multi_parameter_map).map((parameter) =>
		window.configruntime.gd3.multi_parameter_map[parameter].map((alternate) => {
            parameters[alternate] = parameter;
        })
    );
    return parameters;
}

export function getAlternateParameterName(alternate: string, alternate_parameters_map:{}) {
	const parameter = alternate_parameters_map[alternate];
	return getParameterNameNoAlternate(parameter);
}

export function getParameterNameNoAlternate(parameter:string):?string {
    const parameter_maps = Object.assign({}, window.configruntime.gd3.parameter_maps);
    return parameter_maps[parameter] !== undefined ? parameter_maps[parameter] :
        null;
}

export function getParameterName(parameter:string, alternate_parameters_map:{} ):?string {
	const name = getParameterNameNoAlternate(parameter);
	return name !== null ? name : getAlternateParameterName(parameter, alternate_parameters_map);
}

export function getTrendSettings() {
    return window.configruntime.gd3.trend_settings;
}

export function getTrendsPageViewTypes() {
    return window.configruntime.gd3.trends_page_view_types;
}

export function getTrendsPageSettings() {
    return window.configruntime.gd3.trends_page_settings;
}

export function getTrendsPageLakeRegions() {
    return window.configruntime.gd3.trends_page_lake_regions;
}

export function getTrendsRegionsSettings() {
    return window.configruntime.gd3.additional_locations;
}

export function getTrendsPageSeasons() {
    return window.configruntime.gd3.trends_page_seasons;
}

export function getTrendsPageTimeframes() {
    return window.configruntime.gd3.trends_page_timeframes;
}

export function getCustomTrendsRegion(region:string):string {

    let custom_trends_region = '';
    let custom_trends_region_map;
    let trendsPageRegions = getTrendsRegionsSettings();

    if (trendsPageRegions) {
        custom_trends_region_map = trendsPageRegions.map(r => {
            if (r.properties.id.toUpperCase() == region.toUpperCase()) {
                custom_trends_region = r.properties.title;
                return custom_trends_region;
            }
        })
    }

    return custom_trends_region;
}

export function getTrendsDefaultValues() {
    return window.configruntime.gd3.trends_page_defaults;
}

export function getTrendsAnalysisDefaultValues() {
    return window.configruntime.gd3.trends_analysis_defaults;
}

export function getTrendsThresholdsSettings() {
    return window.configruntime.gd3.trends_page_settings;
}

export function getTrendRegions() {
    return window.configruntime.gd3.trend_analysis_regions;
}

export function getCustomTrendRegion(region:string):Object {

    const trendsPageRegions = getTrendRegions();

    const custom_trends_region = trendsPageRegions.find(
        function (custom_trends_region) {
            return custom_trends_region.properties.id === region;
        });

    return custom_trends_region;
}

export function getColor(source: string): string {
    let sourcecolor = window.configruntime.gd3.sourcecolor;
    return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
}

export function getTrendColor(source: string): string {
    let trend_colors = window.configruntime.gd3.trend_colors;
    return trend_colors[source] !== undefined ? trend_colors[source] : '#7F7F7F';
}

export function getApplicationOptions() {
    return window.configruntime.gd3.application_options;
}

export function getApplicationBackends() {
    return window.configruntime.gd3.clowder_endpoints;
}

export function getApplicationWebsite() {
    return window.configruntime.gd3.application_website;
}

export function getErrorText() {
    return window.configruntime.gd3.error_text;
}

export function getLayersDetails() {
    let layersDetails = [];
    if (window.configruntime.gd3.exploreLayers){
        layersDetails = window.configruntime.gd3.exploreLayers;
    }
    return layersDetails;
}

export function getAvailableLayers() {
    let available_layers = [];

    getLayersDetails().map(p =>
        available_layers.push({
            'title': p.title,
            'opacity': p.opacity,
            'visibility': p.visibility,
        })
    );

    return available_layers;
}

export function getMapTileURLSetting() {
    let mapTileURLSetting = '';
    if (window.configruntime.gd3.mapTileURL) {
        mapTileURLSetting = window.configruntime.gd3.mapTileURL;
    }
    return mapTileURLSetting;
}

export function getMapAttributionsSetting() {
    let mapAttributionsSetting = '';
    if (window.configruntime.gd3.mapAttributions) {
        mapAttributionsSetting = window.configruntime.gd3.mapAttributions;
    }
    return mapAttributionsSetting;
}

export function getMapAttributionsCollapsibleSetting() {
    let CollapsibleSetting = '';
    if (window.configruntime.gd3.mapAttributionsCollapsible) {
       CollapsibleSetting = window.configruntime.gd3.mapAttributionsCollapsible;
    }
    return CollapsibleSetting;
}

export function getMapMiniAttributionsCollapsibleSetting() {
    let miniCollapsibleSetting = '';
    if (window.configruntime.gd3.mapMiniAttributionsCollapsible) {
        miniCollapsibleSetting = window.configruntime.gd3.mapMiniAttributionsCollapsible;
    }
    return miniCollapsibleSetting;
}

export function getIEAlertBoxTitle() {
    let getValue = '';
    if (window.configruntime.gd3.ie_message_title) {
        getValue = window.configruntime.gd3.ie_message_title;
    }
    return getValue;
}

export function getIEAlertBoxBody() {
    let getValue = '';
    if (window.configruntime.gd3.ie_message_text) {
        getValue = window.configruntime.gd3.ie_message_text;
    }
    return getValue;
}

export function getIEAlertHeader() {
    let getValue = '';
    if (window.configruntime.gd3.ie_menu_bar_message_text) {
        getValue = window.configruntime.gd3.ie_menu_bar_message_text;
    }
    return getValue;
}

export function getIEVersionsBeforeEleven() {
    let getValue = '';
    if (window.configruntime.gd3.ie_versions_before_eleven) {
        getValue = window.configruntime.gd3.ie_versions_before_eleven;
    }
    return getValue;
}

export function getIEVersionEleven() {
    let getValue = '';
    if (window.configruntime.gd3.ie_version_eleven) {
        getValue = window.configruntime.gd3.ie_version_eleven;
    }
    return getValue;
}

export function getIEVersionEdge() {
    let getValue = '';
    if (window.configruntime.gd3.ie_version_edge) {
        getValue = window.configruntime.gd3.ie_version_edge;
    }
    return getValue;
}

export function getIEAlertButtonText() {
    let getValue = '';
    if (window.configruntime.gd3.ie_button_text) {
        getValue = window.configruntime.gd3.ie_button_text;
    }
    return getValue;
}

export function getIEAlertShow() {
    let getValue = '';
    if (window.configruntime.gd3.ie_show_alert_popup) {
        getValue = window.configruntime.gd3.ie_show_alert_popup;
    }
    return getValue;
}

export function getIEAlertMenuBarShow() {
    let getValue = '';
    if (window.configruntime.gd3.ie_show_alert_popup) {
        getValue = window.configruntime.gd3.ie_show_menu_bar_alert;
    }
    return getValue;
}
