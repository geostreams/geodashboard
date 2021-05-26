/* eslint-disable no-plusplus */
// @flow

export const entries = (obj: { [string]: any }): Array<[string, any]> => {
    const keys: string[] = Object.keys(obj);
    return keys.map(key => [key, obj[key]]);
};

export const values = (obj: { [string]: any }): Array<any> => {
    const keys: string[] = Object.keys(obj);
    return keys.map(key => obj[key]);
};

// Point in Polygon. same function from geodashboard
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#Listing the Vertices

export const pnpoly = (x: any, y: number, coords: Object) => {
    const vert = [[0, 0]];

    for (let i = 0; i < coords.length; i++) {
        for (let j = 0; j < coords[i].length; j++) {
            vert.push(coords[i][j]);
        }
        vert.push(coords[i][0]);
        vert.push([0, 0]);
    }

    let inside = false;
    for (let i = 0, j = vert.length - 1; i < vert.length; j = i++) {
        if (((vert[i][0] > y) !== (vert[j][0] > y)) && 
        (x < (vert[j][1] - vert[i][1]) * (y - vert[i][0]) / (vert[j][0] - vert[i][0]) + vert[i][1])) 
            inside = !inside;
    }

    return inside;
};
