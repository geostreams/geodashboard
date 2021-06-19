/* eslint-disable no-restricted-syntax */
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

// Test Point in Polygon. same function from core__old
// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html the Vertices

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

// Serializes object into query parameters
export function serialize(obj: Object): string {
    const str = [];
    for (const p in obj)
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                // eslint-disable-next-line guard-for-in
                for (const a in obj[p]) {
                    str.push(`${encodeURIComponent(p) }=${ encodeURIComponent(obj[p][a])}`);
                }
            } else {
                str.push(`${encodeURIComponent(p) }=${ encodeURIComponent(obj[p])}`);
            }
        }
    return str.join('&');
}
