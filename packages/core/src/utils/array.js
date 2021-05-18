// @flow

export const entries = (obj: { [string]: any }): Array<[string, any]> => {
    const keys: string[] = Object.keys(obj);
    return keys.map(key => [key, obj[key]]);
};

export const values = (obj: { [string]: any }): Array<any> => {
    const keys: string[] = Object.keys(obj);
    return keys.map(key => obj[key]);
};
