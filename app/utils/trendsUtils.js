/*
 * @flow
 */

import {getTrendsRegionsSettings, getTrendRegions,} from '../utils/getConfig';
import {pnpoly} from '../utils/arrayUtils';
import type { Sensors, TrendsRegions } from '../utils/flowtype';

export function createRegionalTrends(trendsPageRegionsSettings: Object, allRegions: Array<string>) {

    // Update each Region item

    let trendsCheckRegionsAll = allRegions;
    let trendsRegionsSensors: TrendsRegions = [];

    // Create an item to represent each Region
    for (let i = 0; i < trendsCheckRegionsAll.length; i++) {
        trendsRegionsSensors[i] = {
            id:i,
            created: "",
            geometry: {
                type: "Point",
                coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
            },
            max_end_time: "",
            min_start_time: "",
            min_end_time:"",
            name:trendsCheckRegionsAll[i].toString(),
            parameters:[],
            properties:{
                region: trendsCheckRegionsAll[i].toString(),
                type: {
                    id: i.toString(),
                    title: "",
                },
                name: trendsCheckRegionsAll[i].toString(),
                popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
            },
            type:"Feature",
            trend_end_time:"",
            trend_start_time:"",
            trends:[],
        };
    }

    return trendsRegionsSensors;
}

// ************************************************************
// FIXME: DO NOT CALCULATE REGIONAL TRENDS MANUALLY - USE API
function createTrendsRegionSensorData(trendsChosenParameter: string, the_trends: Array<string>) {
    // All the Variables in this Function
    let the_trends_average = [];
    let trends_interval_all = 0;
    let trends_last_all = 0;
    let trends_percentage_change_all = 0;
    let trends_total_all = 0;
    let trends_interval_average = 0;
    let trends_last_average = 0;
    let trends_percentage_change_average = 0;
    let trends_total_average = 0;
    let trends_interval_id = '';
    let trends_last_id = '';
    let trends_percentage_change_id = '';
    let trends_total_id = '';

    // Trends needs to be averaged for all four values
    if (the_trends.length > 0) {
        for (let j = 0; j < the_trends.length; j++) {
            trends_interval_all += the_trends[j][(trendsChosenParameter + "_interval_average")];
            trends_last_all += the_trends[j][(trendsChosenParameter + "_last_average")];
            trends_percentage_change_all += the_trends[j][(trendsChosenParameter + "_percentage_change")];
            trends_total_all += the_trends[j][(trendsChosenParameter + "_total_average")];
        }

        trends_interval_average = Number(trends_interval_all)/the_trends.length;
        trends_last_average = Number(trends_last_all)/the_trends.length;
        trends_percentage_change_average = Number(trends_percentage_change_all)/the_trends.length;
        trends_total_average = Number(trends_total_all)/the_trends.length;

        trends_interval_id = (trendsChosenParameter + "_interval_average");
        trends_last_id = (trendsChosenParameter + "_last_average");
        trends_percentage_change_id = (trendsChosenParameter + "_percentage_change");
        trends_total_id = (trendsChosenParameter + "_total_average");

        the_trends_average = [
            {
                [trends_interval_id] : trends_interval_average ,
                [trends_last_id] : trends_last_average ,
                [trends_percentage_change_id] : trends_percentage_change_average  ,
                [trends_total_id] : trends_total_average
            },
        ];

    }

    return the_trends_average;
}

// ************************************************************
// FIXME: DO NOT CALCULATE REGIONAL TRENDS MANUALLY - USE API
export function getRegionalTrends(state: Object, trendsPageRegionsSettings: Object) {

    // All the Variables in this Function
    let trendsCheckRegionsAll = state.all_regions;
    let trendsSensors = state.trends_sensors;
    let trendsRegionsSensors: TrendsRegions = [];
    let start_time_all = [];
    let end_time_all = [];
    let trend_start_time_all = [];
    let trend_end_time_all = [];
    let start_time_all_sorted = [];
    let end_time_all_sorted = [];
    let end_time_all_sorted_max = [];
    let trend_start_time_all_sorted = [];
    let trend_end_time_all_sorted = [];
    let start_time = '';
    let end_time = '';
    let end_time_max = '';
    let trend_start_time = '';
    let trend_end_time = '';
    let the_trends = [];
    let the_trends_average = [];
    let trendsChosenParameter = state.parameter;

    // Create an item to represent each Region
    for (let i = 0; i < trendsCheckRegionsAll.length; i++) {
        // step through each region
        trendsSensors.filter(s => s.properties.region.indexOf(trendsCheckRegionsAll[i]) >= 0)
            .map(sensor => {
                if (
                    sensor.trends != ["trends return no data"] &&
                    sensor.trends != ['not enough data'] &&
                    sensor.trends != [''] &&
                    sensor.trends !== undefined
                ) {
                    start_time_all.push(new Date(sensor.min_start_time));
                    end_time_all.push(new Date(sensor.max_end_time));
                    the_trends.push(sensor.trends);
                    trend_start_time_all.push(sensor.trend_start_time);
                    trend_end_time_all.push(sensor.trend_end_time);
                }
            });

        // Trends needs to be averaged for all four values
        the_trends_average = createTrendsRegionSensorData(trendsChosenParameter, the_trends);

        // Need appropriate earliest and latest values
        start_time_all_sorted = start_time_all.sort();
        start_time = start_time_all_sorted[0];
        end_time_all_sorted = end_time_all.reverse();
        end_time = end_time_all_sorted[0];
        end_time_all_sorted_max = end_time_all.sort();
        end_time_max = end_time_all_sorted_max[0];
        trend_start_time_all_sorted = trend_start_time_all.sort();
        trend_start_time = trend_start_time_all_sorted[0];
        trend_end_time_all_sorted = trend_end_time_all.reverse();
        trend_end_time = trend_end_time_all_sorted[0];

        // Create the Point for the Map
        if (the_trends.length > 0) {
            trendsRegionsSensors[i] = {
                id: i,
                created: "",
                geometry: {
                    type: "Point",
                    coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
                },
                max_end_time: end_time_max.toString(),
                min_start_time: start_time.toString(),
                min_end_time: end_time.toString(),
                name: trendsCheckRegionsAll[i].toString(),
                parameters: [],
                properties: {
                    region: trendsCheckRegionsAll[i].toString(),
                    type: {
                        id: i.toString(),
                        title: "",
                    },
                    name: trendsCheckRegionsAll[i].toString(),
                    popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
                },
                type: "Feature",
                trend_end_time: trend_end_time.toString(),
                trend_start_time: trend_start_time.toString(),
                trends: the_trends_average[0],
            };
        } else {
            trendsRegionsSensors[i] = {
                id:i,
                created: "",
                geometry: {
                    type: "Point",
                    coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate
                },
                max_end_time: "",
                min_start_time: "",
                min_end_time:"",
                name:trendsCheckRegionsAll[i].toString(),
                parameters:[],
                properties:{
                    region: trendsCheckRegionsAll[i].toString(),
                    type: {
                        id: i.toString(),
                        title: "",
                    },
                    name: trendsCheckRegionsAll[i].toString(),
                    popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
                },
                type:"Feature",
                trend_end_time:"",
                trend_start_time:"",
                trends:[],
            };
        }
    }

    return trendsRegionsSensors;

}

export function filterPresetTrendLocation(region:string, origSensors: Sensors) {
    let original_sensors = origSensors;
    let region_sensors = [];

    original_sensors.map((sensor) => {
        if (matchRegionAnalysis(region, sensor)) {
            region_sensors.push(sensor);
        }
    });

    return region_sensors;
}

export function filterCustomTrendLocation(selectedPointsLocations:Array<string>, state: Object) {
    let original_sensors: Sensors = state.sensors;
    let filteredSensors = [];

    if (selectedPointsLocations[0] == 'reset_points') {
        filteredSensors = original_sensors;

    } else {
        original_sensors.map((sensor) => {
            if (selectedPointsLocations.includes(sensor.name)) {
                filteredSensors.push(sensor);
            }
        });

    }

    return filteredSensors;
}

export function matchRegionTrends(selectedRegion:string, sensor: Object) {

    if (selectedRegion.toUpperCase() === sensor.properties.region)
        return true;

    function findRegion(location) {
        return location.properties.id === selectedRegion;
    }

    let customLocation = getTrendsRegionsSettings().find(findRegion);

    if (!customLocation)
        return false;

    return pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0], customLocation.geometry.coordinates)

}

export function matchRegionAnalysis(selectedRegion:string, sensor: Object) {

    if (selectedRegion.toUpperCase() == sensor.properties.region) {
        return true;
    }

    let the_analysis_regions = getTrendRegions();
    let customLocation = [];

    if (the_analysis_regions) {
        the_analysis_regions.map(r => {
                if (r.properties.id == selectedRegion) {
                    customLocation = r.geometry.coordinates;
                }
            }
        );
    }

    if (!customLocation) {
        return false;
    }

    return pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0], customLocation);

}

export function getAllRegions(trendsPageRegionsSettings: Object) {
    // Create one Item for each Region

    let trendsCheckRegion;
    let trendsCheckRegionsAll = [];

    // Get all the available Regions
    for (let i = 0; i < trendsPageRegionsSettings.length; i++) {
        trendsCheckRegion = trendsPageRegionsSettings[i].properties.region;
        trendsCheckRegionsAll = trendsCheckRegionsAll.concat(trendsCheckRegion);
    }

    return trendsCheckRegionsAll;

}

export function handleThresholdChangeNoChoice(
    parameter: string, region: string, trendsPageSettings: Object) {

    let trendsCheckParameter;
    let trendsPageThreshold = [];

    for (let i = 0; i < trendsPageSettings.length; i++) {
        trendsCheckParameter = trendsPageSettings[i].parameter.id;
        if (trendsCheckParameter == parameter) {
            trendsPageSettings[i].thresholds.map( t => {
                if (t.region.toLowerCase() == region) {
                    trendsPageThreshold = t.value;
                }
            });
        }
    }

    return trendsPageThreshold;
}

export function getRegionalThreshold(selectedRegion:string, sensor: Object, parameter: string) {

    function findRegion(location) {
        return location.properties.id === selectedRegion.toLowerCase();
    }

    let customLocation = getTrendsRegionsSettings().find(findRegion);

    if (!customLocation)
        return false;

    if (pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0], customLocation.geometry.coordinates)) {
        return customLocation.properties.threshold[parameter];
    }

    return false;

}
