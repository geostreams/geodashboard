// @flow
import type { GeometryType } from 'gd-core/src/utils/flowtype';

export type PropertiesType = {
    name: string;
    popupContent: string;
    region: string;
    location: string;
    type: {
        id: string;
        title: string;
    };
    online_status: string;
}

export type CategoryType = {
    id: number;
    name: string;
    title: string;
}

export type ParameterType = {
    id: number;
    name: string;
    title: string;
    unit: string;
    search_view: boolean;
    explore_view: boolean;
    scale_names: string[];
    scale_colors: string[];
}

export type ParameterCategoryType = {
    id: number;
    name: string;
    detail_type: string;
}

export type ParameterMappingsType = {
    id: number;
    parameter_id: number;
    category_id: number;
}

export type ParameterValue = {
    data: {};
    count: number;
    average: number;
    year: number;
    month: number;
    date: string;
    label: string;
    sources: []
}

export type SensorType = {
    id: number;
    idx: ?number;
    created: string;
    geometry: GeometryType;
    max_end_time: string;
    min_end_time: string;       // FIXME missing from API
    name: string;
    parameters: string[];
    properties: PropertiesType;
    geoType: string;            // FIXME should it be type in API?
    type: string;               // FIXME missing from API
    min_start_time: string;
    trend_end_time: string;     // FIXME missing from API
    trend_start_time: string;   // FIXME missing from API
    trends: [];                 // FIXME missing from API
}

export type MapConfig = {
    clusterExpandCountThreshold: number;
    clusterExpandZoomThreshold: number;
}

export type SourceType = {
    id: string;
    label: string;
}

export type SourceConfig = {
    label: string;
    order: number;
    color: string;
    description: string;
    qaqc: string;
    more_info: string;
    link: string;
    useSeasonFilter: boolean;
}

export type Config = {
    geostreamingEndpoint: string;

    map: MapConfig;

    sensors: {
        displayOnlineStatus: boolean;
    };

    source: {
        [k: string]: SourceConfig;
    };
}
