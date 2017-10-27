/*
 * @flow
 */
import type { PropertiesType } from './flowtype';

export function getSourceName(source:PropertiesType):string {
    const sourcename = window.configruntime.gd3.sourcename;
    return sourcename[source.id] !== undefined ? sourcename[source.id] : source.title;
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

export function getParameterName(parameter:string):?string {
    const parameter_maps = window.configruntime.gd3.parameter_maps;
    return parameter_maps[parameter] !== undefined ? parameter_maps[parameter] :
        null;
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
            if (r.properties.region == region) {
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
