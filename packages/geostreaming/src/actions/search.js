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
        type: 'Feature',
        properties: {
            title: 'Custom Location',
            id: 'custom_location'
        },
        geometry: {
            coordinates,
            type,
            properties
        }
    }
});

export const RESET_CUSTOM_LOCATION = 'ADD_CUSTOM_LOCATION';
export const resetCustomLocation = () => ({
    type: RESET_CUSTOM_LOCATION
});

export const COUNT_NUMBER_DATAPOINTS = 'COUNT_NUMBER_DATAPOINTS';
export function fetchDataPointsCount(countLink: string) {
    return (dispatch: Function) => {
        const result = fetch(countLink).then(response => {
            const json = response.json();
            return json;
        })
            .then(json => {
                if (json) {
                    dispatch({
                        type: COUNT_NUMBER_DATAPOINTS,
                        number_datapoints: json.datapointsLength
                    });
                }
            }).catch((error) => {
                console.error(`An ERROR occurred! ${error}`);
            });
        return result;
    };
}