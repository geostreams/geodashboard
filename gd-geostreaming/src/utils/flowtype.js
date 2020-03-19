// @flow
import type { Map } from 'immutable';
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

export type ParameterType = {
    id: number;
    name: string;
    title: string;
    unit: string;
    search_view: boolean;
    explore_view: boolean;
    scale_names: [];
    scale_colors: [];
}
export interface ImmutableParameterType extends Map<string, any> {
    id: number;
    name: string;
    title: string;
    unit: string;
    search_view: boolean;
    explore_view: boolean;
    scale_names: [];
    scale_colors: [];
}

export type ParameterCategoryType = {
    id: number;
    name: string;
    detail_type: string;
}
export interface ImmutableParameterCategoryType extends Map<string, any> {
    id: number;
    name: string;
    detail_type: string;
}

export type ParameterMappingsType = {
    id: number;
    parameter_id: number;
    category_id: number;
}
export interface ImmutableParameterMappingsType extends Map<string, any> {
    id: number;
    parameter_id: number;
    category_id: number;
}

export type ParameterValue = {
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
    min_end_time: string;
    name: string;
    parameters: string[];
    properties: PropertiesType;
    geoType: string;
    type: string;
    min_start_time: string;
    trend_end_time: string;
    trend_start_time: string;
    trends: [];
}

export interface ImmutableSensorType extends Map<string, any> {
    id: number;
    created: string;
    geometry: GeometryType;
    max_end_time: string;
    min_end_time: string; // FIXME missing from API
    name: string;
    parameters: string[];
    properties: PropertiesType;
    type: string; // FIXME missing from API
    geoType: string;     // FIXME should it be type in API?
    min_start_time: Date;
    trend_end_time: Date; // FIXME missing from API
    trend_start_time: Date; // FIXME missing from API
    trends: []; // FIXME missing from API
}

export type SourceType = {
    id: string;
    label: string;
}

export interface ImmutableSourceType extends Map<string, any> {
    id: string;
    label: string;
}
