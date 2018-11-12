/*
 * @flow
 */

import {
    RECEIVE_SENSORS, UPDATE_AVAILABLE_SENSORS, UPDATE_EXPLORE_SENSORS, RESET_EXPLORE_SENSORS,
    ADD_CUSTOM_LOCATION_FILTER, CLEAR_SENSORS, RECEIVE_MULTI_PARAMETERS
} from '../actions';
import type {Sensor, Sensors, sensorsState, MapWithLabel, MapWithLabels, Parameters} from '../utils/flowtype';
import {
    inArray, sortByLabel, pnpoly, intersectArrays, sortByLake, sortByRegion, sortBySource
} from '../utils/arrayUtils';
import {getSourceName, getSourceOrder, getLakesOrdering} from '../utils/getConfig';

type SensorAction = {|
    type: 'RECEIVE_SENSORS' | 'UPDATE_AVAILABLE_SENSORS' | 'UPDATE_EXPLORE_SENSORS',
    sensors: Sensors,
    api: string,
    receivedAt: Date,
    selected_search: Object,
    selected_filters: Array<string>,
    multi_parameter_map: { [string]: Array<string> },
    shape_coordinates: Array<number>,
    explore_filtering: Object,
|};

const defaultState = {
    data: [],
    parameters: [],
    sources: [],
    regions: [],
    locations: [],
    sensors: [],
    available_sensors: [],
    draw_available_sensors: [],
    shape_coordinates: [],
    explore_sensors: [],
};

const sensors = (state: sensorsState = defaultState, action: SensorAction) => {

    let shapeCoordinates = [];

    switch (action.type) {
        case RECEIVE_SENSORS:
            return Object.assign({}, state, {
                data: action.sensors,
                receivedAt: action.receivedAt,
                api: action.api,
                sources: collectSources(action.sensors),
                regions: collectRegions(action.sensors),
                locations: collectLocations(action.sensors),
                available_sensors: action.sensors,
                shape_coordinates: [],
                explore_sensors: action.sensors,
            });

        case RECEIVE_MULTI_PARAMETERS:
            const copy_sensors = state.sensors.slice(0);
            return Object.assign({}, state, {
                parameters: collectParameters(copy_sensors, action.parameters, action.multi_parameter_map)
            });

        case UPDATE_AVAILABLE_SENSORS:
            let newSensors = filterAvailableSensors(state, action.selected_filters, action.selected_search, action.multi_parameter_map);
            if (action.selected_search.locations.selected === 'Custom Location') {
                shapeCoordinates = state.shape_coordinates;
                return Object.assign({}, state, {
                    available_sensors: newSensors,
                    shape_coordinates: shapeCoordinates
                });
            } else {
                shapeCoordinates = [];
                return Object.assign({}, state, {
                    available_sensors: newSensors,
                    draw_available_sensors: [],
                    shape_coordinates: shapeCoordinates
                });
            }

        case UPDATE_EXPLORE_SENSORS:
            let exploreSensors = filterExploreSensors(state, action.explore_filtering);
            return Object.assign({}, state, {
                explore_sensors: exploreSensors,
            });

        case RESET_EXPLORE_SENSORS:
            return Object.assign({}, state, {
                explore_sensors: action.reset_sensors,
            });

        case ADD_CUSTOM_LOCATION_FILTER:
            let customLocationSensors = filterCustomLocation(state, action.selectedPointsLocations);
            let availableSensors = customLocationSensors;

            shapeCoordinates = action.shapeCoordinates;

            if (action.selectedPointsLocations.length === 0) {
                availableSensors = [];
            }

            return Object.assign({}, state, {
                available_sensors: availableSensors,
                draw_available_sensors: customLocationSensors,
                shape_coordinates: shapeCoordinates
            });

        case CLEAR_SENSORS:
            return Object.assign({}, state, {
                api: '',
                data: [],
                parameters: [],
                sources: [],
                locations: [],
                available_sensors: [],
                draw_available_sensors: [],
                shape_coordinates: [],
                explore_sensors: []
            });

        default:
            return state
    }
};

function filterCustomLocation(state: sensorsState, selectedPointsLocations: Array<string>) {
    let origSensors = state.data;
    let filteredSensors = [];

    if (selectedPointsLocations[0] !== undefined &&
        selectedPointsLocations[0] !== 'reset_points' &&
        state.available_sensors.length < state.draw_available_sensors.length) {

        origSensors = state.available_sensors;

    }

    if (selectedPointsLocations[0] === 'reset_points' ||
        selectedPointsLocations[0] === undefined ||
        selectedPointsLocations.length === 0) {

        filteredSensors = origSensors;

    } else {

        origSensors.map((sensor) => {
            if (selectedPointsLocations.includes(sensor.name)) {
                filteredSensors.push(sensor);
            }
        });

    }

    return filteredSensors;
}

export function collectParameters(sensorsData: Sensors, parameters: Parameters, multi_parameter_map: { [string]: Array<string> }): MapWithLabels {
    let params: MapWithLabels = [];
    const alternateParameters = getAlternateParameters(multi_parameter_map);
    sensorsData.map(s => {
        s.parameters.map(p => {
            // check if parameters exists already_
            let found = params.some(function (e: MapWithLabel) {
                return e.id === p || e.id === alternateParameters[p];
            });
            if (p === null) {
                console.log(`Found sensor ${s.id} with null parameters`);

            } else if (!found) {
                let parameter = parameters.find(x => x.name === p);
                if (parameter && parameter.name !== "") {
                    params.push({'id': p, 'label': parameter.title || ''});
                }

            }
        });
    });
    // sort
    return sortByLabel(params);
}

function getAlternateParameters(multi_parameter_map) {
    let parameters = {};
    if (multi_parameter_map) {
        Object.keys(multi_parameter_map).map((parameter) =>
            multi_parameter_map[parameter].map((alternate) => {
                parameters[alternate] = parameter;
            })
        );
    }
    return parameters;
}

export function collectRegions(sensorsData: Sensors) {
    let regions = [];
    sensorsData.map(s => {
        let region = s.properties.region;
        // Check if region exists already
        const found = regions.filter(x => x === region);
        if (region === null) {
            console.log(`Found sensor ${s.id} with null region`)
        } else if (found.length === 0) {
            regions.push(region);
        }

    });
    const order = getLakesOrdering("region");
    return sortByRegion(regions, order);
}

export function collectSources(sensorsData: Sensors): MapWithLabels {
    let sources: MapWithLabels = [];
    sensorsData.map(s => {
        let source = s.properties.type;
        // check if source exists already
        const found = sources.some(function (e: MapWithLabel) {
            return e.id === source.id;
        });
        if (source === null)
            console.log(`Found sensor ${s.id} with null data sources`);
        else if (!found)
            sources.push({'id': source.id, 'label': getSourceName(source) || ''});
    });
    // sort
    const source_order = getSourceOrder();
    return sortBySource(sources, source_order);
}

type CollectDate = { 'start': Date, 'end': Date };

export function collectDates(sensorsData: Sensors): CollectDate {
    let minDate = new Date();
    let maxDate = new Date("1983-01-01");

    sensorsData.map(s => {
        const sensorStartTime = new Date(s.min_start_time);
        const sensorEndTime = new Date(s.max_end_time);
        if (sensorStartTime.getTime() < minDate.getTime()) {
            minDate = sensorStartTime;
        }
        if (sensorEndTime.getTime() > maxDate) {
            maxDate = sensorEndTime;
        }
    });

    return {'start': minDate, 'end': maxDate};
}

export function collectLocations(sensorsData: Sensors): MapWithLabels {
    const locations: MapWithLabels = [];
    const additional_location = window.configruntime.gd3.additional_locations;

    sensorsData.map(s => {
        // old code, keep this for other geodashboard
        //const location = s.properties.region;
        //// check if location exists already
        //const found = locations.some(function (e:MapWithLabel) {
        //    return e.id === location;
        //});
        //if (location === null)
        //    console.log(`Found sensor ${s.id} without location`);
        //else if (!found)
        //    locations.push({'id': location, 'label': getLocationName(location) || ''});

        // for custom location, insert into locations if it is in sensor && not insert before
        additional_location.map(customLocation => {
                if (!locations.find(function (e) {
                    return e.id === customLocation.properties.id
                }) && pnpoly(s.geometry.coordinates[1], s.geometry.coordinates[0],
                    customLocation.geometry.coordinates)) {
                    locations.push({'id': customLocation.properties.id, 'label': customLocation.properties.title})
                }
            }
        )
    });

    // sort
    const order = getLakesOrdering("title");
    return sortByLake(locations, order);
}

function filterAvailableSensors(state: sensorsState, selectedFilters: Array<string>, selectedSearch: Object, multi_parameter_map: Object) {
    let av_sensors: Sensors = state.data;
    let new_sensors: Sensors = [];
    let draw_sensors = state.draw_available_sensors;

    let draw_sensors_names = [];
    for (let i = 0; i < draw_sensors.length; i++) {
        if (!draw_sensors_names.includes((draw_sensors[i].name).toString())) {
            draw_sensors_names.push(draw_sensors[i]);
        }
    }

    selectedFilters.map((filter) => {
        switch (filter) {
            case 'data_sources':
                if (selectedSearch.data_sources.selected.length > 0) {
                    new_sensors = [];
                    av_sensors.map((sensor) => {
                        if (selectedSearch.data_sources.selected.indexOf(sensor.properties.type.id) > -1) {
                            new_sensors.push(sensor);
                        }
                    });
                    av_sensors = new_sensors;

                }
                return;

            case 'parameters':
                if (selectedSearch.parameters.selected.length > 0) {
                    new_sensors = [];
                    let parametersToSearch = Object.assign([], selectedSearch.parameters.selected);
                    let multiParameters = intersectArrays(Object.keys(multi_parameter_map), selectedSearch.parameters.selected);
                    multiParameters.map((parameter) =>
                        multi_parameter_map[parameter].map((alternate) => {
                            parametersToSearch.push(alternate);
                        })
                    );

                    av_sensors.map((sensor) => {
                        if (inArray(parametersToSearch, sensor.parameters)) {
                            new_sensors.push(sensor);
                        }
                    });
                    av_sensors = new_sensors;
                }

                return;

            case 'time':
                if (selectedSearch.dates.selected.start !== "" && selectedSearch.dates.selected.end !== ""
                    && selectedSearch.dates.selected.start !== null && selectedSearch.dates.selected.end !== null) {
                    new_sensors = [];
                    av_sensors.map((sensor) => {
                        if (selectedSearch.dates.selected.start <= new Date(sensor.max_end_time) &&
                            selectedSearch.dates.selected.end >= new Date(sensor.min_start_time)) {
                            new_sensors.push(sensor);
                        }
                    });
                    av_sensors = new_sensors;
                }
                return;

            case 'locations':
                // This uses the radio button's value
                if (selectedSearch.locations.selected !== null) {
                    new_sensors = [];

                    switch (selectedSearch.locations.selected) {

                        case 'All Locations':

                            return;

                        case 'Custom Location':
                            if (draw_sensors_names.length <= 0) {
                                new_sensors = av_sensors;
                            } else {
                                new_sensors = av_sensors.filter(function (e) {
                                    return this.indexOf(e) >= 0;
                                }, draw_sensors_names);
                            }
                            av_sensors = new_sensors;

                            return;

                        default:
                            av_sensors.map((sensor => {
                                if (matchLocation(selectedSearch.locations.selected, sensor)) {
                                    new_sensors.push(sensor);
                                }
                            }));
                            av_sensors = new_sensors;

                            return;

                    }

                }

                return;
        }

    });

    return av_sensors;
}

function filterExploreSensors(state: sensorsState, exploreFiltering: Object) {
    let av_sensors: Sensors = state.data;
    let new_sensors: Sensors = [];

    let data_source_ids = [];
    exploreFiltering.data_sources.selected.map(source => data_source_ids.push(source.id));

    av_sensors.map((sensor) => {
        if (data_source_ids.indexOf(sensor.properties.type.id) > -1) {
            new_sensors.push(sensor);
        }
    });
    av_sensors = new_sensors;

    return av_sensors;
}

function matchLocation(selectedLocation: string, sensor: Sensor) {
    if (selectedLocation === sensor.properties.region)
        return true;

    function findLocation(location) {
        return location.properties.id === selectedLocation;
    }

    const customLocation = window.configruntime.gd3.additional_locations.find(findLocation);
    if (!customLocation)
        return false;
    return pnpoly(sensor.geometry.coordinates[1], sensor.geometry.coordinates[0], customLocation.geometry.coordinates)
}

export default sensors;