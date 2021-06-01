// @flow

export const SET_FILTER = 'SET_FILTER';
export function setFilter(attribute: string, query: string) {
    return { type: SET_FILTER, payload: { attribute, query } };
}

export const REMOVE_FILTER = 'REMOVE_FILTER';
export function removeFilter(attribute: string) {
    return { type: REMOVE_FILTER, payload: { attribute } };
}

export const ADD_CUSTOM_LOCATION = 'ADD_CUSTOM_LOCATION';
export const addLocation = (coordinates, type = 'Polygon', properties) => ({
    type: ADD_CUSTOM_LOCATION,
    payload: { 
        properties: {
            title: 'Custom Location',
            id: 'custom-location'
        },
        geometry: {
            coordinates,
            type,
            properties
        }
    }
});