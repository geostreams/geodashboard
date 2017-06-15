/*
 * @flow
 */
import type { PropertiesType } from './flowtype'

export function getSourceName(source:PropertiesType):string {
    const sourcename = window.configruntime.sourcename;
    return sourcename[source.id] !== undefined ? sourcename[source.id] : source.title;
}

export function getLocationName(location:string):string {
    const named_locations = window.configruntime.named_locations;
    const additional_location = window.configruntime.additional_locations;

    if( named_locations[location] !== undefined)
        return named_locations[location]
    const custom_location = additional_location.find(
        function(custom_location) {
        return custom_location.properties.id === location;
    });
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
