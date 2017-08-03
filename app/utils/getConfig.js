/*
 * @flow
 */
import type { PropertiesType } from './flowtype';

export function getSourceName(source:PropertiesType):string {
    const sourcename = window.configruntime.sourcename;
    return sourcename[source.id] !== undefined ? sourcename[source.id] : source.title;
}

export function getCustomLocation(location:string):Object {
    const additional_location = window.configruntime.additional_locations;

    const custom_location = additional_location.find(
        function (custom_location) {
            return custom_location.properties.id === location;
        });
    return custom_location;
}

export function getLocationName(location:string):string {
    // old code, keep this for other geodashboard
    //const named_locations = window.configruntime.named_locations;
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
    const parameter_maps = window.configruntime.parameter_maps;
    return parameter_maps[parameter] !== undefined ? parameter_maps[parameter] :
        null;
}

export function getTrendSettings() {
    return window.configruntime.trend_settings;
}

export function getTrendsPageViewTypes() {
    return window.configruntime.trends_page_view_types;
}

export function getTrendsPageSettings() {
    return window.configruntime.trends_page_settings;
}

export function getTrendsRegionsSettings() {
    return window.configruntime.trends_page_regions;
}

export function getTrendsPageSeasons() {
    return window.configruntime.trends_page_seasons;
}

export function getTrendsPageTimeframes() {
    return window.configruntime.trends_page_timeframes;
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
    return window.configruntime.trends_page_defaults;
}

export function getTrendsThresholdsSettings() {
    return window.configruntime.trends_page_thresholds;
}

export function getColor(source: string): string {
    let sourcecolor = window.configruntime.sourcecolor;
    return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
}

export function getTrendColor(source: string): string {
    let trend_colors = window.configruntime.trend_colors;
    return trend_colors[source] !== undefined ? trend_colors[source] : '#7F7F7F';
}