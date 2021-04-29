/*
 * @flow
 */

import {getTrendsRegionsSettings, getTrendRegions,} from '../utils/getConfig';
import {pnpoly} from '../utils/arrayUtils';
import type {Sensors, TrendsRegions} from '../utils/flowtype';

export function createRegionalTrends(trendsPageRegionsSettings: Object, allRegions: Array<string>) {
    // Update each Region item

    let trendsCheckRegionsAll = allRegions;
    let trendsRegionsSensors: TrendsRegions = [];

    // Create an item to represent each Region (Excluding ER)
    for (let i = 0; i < trendsCheckRegionsAll.length; i++) {

        let geocodeArray = [];

        if (trendsPageRegionsSettings[i].geometry.coordinates.length > 0 &&
            trendsPageRegionsSettings[i].properties.id.toString().toUpperCase() !== 'ER') {

            trendsPageRegionsSettings[i].geometry.coordinates[0].map(function (coordinate) {
                // swap coordinate
                geocodeArray.push([coordinate[1], coordinate[0]]);
            }).join(",");

            trendsRegionsSensors[i] = {
                id: i,
                geometry: {
                    type: "Point",
                    coordinates: trendsPageRegionsSettings[i].geometry.region_coordinate,
                    geocode: geocodeArray
                },
                name: trendsCheckRegionsAll[i].toString(),
                properties: {
                    region: trendsPageRegionsSettings[i].properties.id.toString(),
                    type: {
                        id: i.toString(),
                        title: "",
                    },
                    name: trendsCheckRegionsAll[i].toString(),
                    popupContent: trendsPageRegionsSettings[i].properties.title.toString(),
                    online_status: "",
                },
                type: "Feature",
                region_trends: {
                    lastaverage: 0,
                    tenyearsaverage: 0,
                    totalaverage: 0
                },
                trends_detail: {
                    id: i,
                    value: 0
                },
                trends_deviation: {
                    id: i,
                    value: 0
                }
            };

        }

    }

    return trendsRegionsSensors;

}

export function filterPresetTrendLocation(region: string, origSensors: Sensors) {
    let original_sensors = origSensors;
    let region_sensors = [];

    original_sensors.map((sensor) => {
        if (matchRegionAnalysis(region, sensor)) {
            region_sensors.push(sensor);
        }
    });

    return region_sensors;
}

export function filterCustomTrendLocation(selectedPointsLocations: Array<string>, state: Object) {
    let original_sensors: Sensors = state.sensors;
    let filteredSensors = [];

    if (selectedPointsLocations[0] === 'reset_points') {
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

export function matchRegionTrends(selectedRegion: string, sensor: Object) {

    if (selectedRegion.toUpperCase() === sensor.properties.region.toUpperCase())
        return true;

    function findRegion(location) {
        return location.properties.id === selectedRegion;
    }

    let customLocation = getTrendsRegionsSettings().find(findRegion);

    if (!customLocation)
        return false;

    return pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0], customLocation.geometry.coordinates)

}

export function matchRegionAnalysis(selectedRegion: string, sensor: Object) {

    if (selectedRegion.toUpperCase() === sensor.properties.region) {
        return true;
    }

    let the_analysis_regions = getTrendRegions();
    let customLocation = {};

    if (the_analysis_regions) {
        the_analysis_regions.map(r => {
                if (r.properties.id === selectedRegion) {
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
        trendsCheckRegion = trendsPageRegionsSettings[i].properties.id;
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
        if (trendsCheckParameter === parameter) {
            trendsPageSettings[i].thresholds.map(t => {
                if (t.region.toLowerCase() === region) {
                    trendsPageThreshold = t.value;
                }
            });
        }
    }

    return trendsPageThreshold;
}

export function getRegionalThreshold(selectedRegion: string, sensor: Object, parameter: string) {

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
