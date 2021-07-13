// @flow
import { pnpoly } from '@geostreams/core/src/utils/array';


export const matchLocation = (
    selectedLocation: string, 
    sensorRegion: string, 
    locations: [], 
    coordinates: []
) => {


    function findLocation(location) {
        return location.properties.id === selectedLocation;
    }

    const customLocation = locations.find(findLocation);
    if (!customLocation)
        return false;
    return pnpoly( Number(coordinates[1]), 
        Number(coordinates[0]), 
        customLocation.geometry.coordinates);
};

export const isLocationInPolygon = (location, polygon) =>
    pnpoly(Number(location[1]), Number(location[0]), polygon.geometry.coordinates);