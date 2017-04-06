/*
 * @flow
 */
import type { PropertiesType } from './flowtype'

export function getSourceName(source:PropertiesType):string {
    var sourcename = window.configruntime.sourcename;
    return sourcename[source.id] !== undefined ? sourcename[source.id] : source.title;
}

//TODO: need Update
export function getLocationName(source:string):string {
    const named_locations =
    {
        "OH": "Ohio",
        "HU": "Lake Huron",
        "ON": "Lake Ontario",
        "MI": "Lake Michigan",
        "ER": "Lake Erie",
        "SU": "Lake Superior",
    };
    return named_locations[source] !== undefined ? named_locations[source] : source;
}