/*
 * @flow
 */

export function inArray(array1: Array<string>, array2: Array<string>) {
    if (array1.length > 0 && array2.length > 0) {
        for (let i = 0; i < array1.length; i++) {
            if (array2.indexOf(array1[i]) > -1) {
                return true;
            }
        }
    }
    return false;
}

export function intersectArrays(array1: any, array2: any) {
    let t;
    if (array2.length > array1.length) {
        t = array2, array2 = array1, array1 = t; //Swap array's so 1 is shorter than2
    }
    return array1.filter(function (e) {
        return array2.indexOf(e) > -1
    });
}

export function sortByLabel(list: any) {
    list.sort(function (a, b) {
        const labelA = a.label.toUpperCase();
        const labelB = b.label.toUpperCase();
        if (labelA < labelB) {
            return -1;
        }
        if (labelA > labelB) {
            return 1;
        }
        return 0;
    });
    return list;
}

function sortWithOrder(order, key, list) {
    list.sort(function (a, b) {
        let idxA = key === null ? order[a.toUpperCase()] : order[a[key].toUpperCase()];
        let idxB = key === null ? order[b.toUpperCase()] : order[b[key].toUpperCase()];

        // Handle missing values in the list
        idxA = idxA === undefined ? 9999 : idxA;
        idxB = idxB === undefined ? 9999 : idxB;

        if (idxA < idxB) {
            return -1;
        }
        if (idxA > idxB) {
            return 1;
        }

        return 0
    });
    return list
}

export function sortBySource(list: any, order: any) {
    if (Object.keys(order).length > 0) {
        list = sortWithOrder(order, "id", list);
    } else {
        list = sortByLabel(list);
    }
    return list;
}

export function sortByRegion(list: Array<Object>, order: Object) {
    if (Object.keys(order).length > 0) {
        list = sortWithOrder(order, null, list);
    } else {
        list.sort();
    }
    return list;

}

export function sortByLake(list: any, order: any) {
    return sortWithOrder(order, "label", list);
}

// Point in Polygon. same function from geodashboard
// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#Listing the Vertices

export function pnpoly(x: any, y: number, coords: Object) {
    let vert = [[0, 0]];

    for (let i = 0; i < coords.length; i++) {
        for (let j = 0; j < coords[i].length; j++) {
            vert.push(coords[i][j])
        }
        vert.push(coords[i][0]);
        vert.push([0, 0])
    }

    let inside = false;
    for (let i = 0, j = vert.length - 1; i < vert.length; j = i++) {
        if (((vert[i][0] > y) !== (vert[j][0] > y)) && (x < (vert[j][1] - vert[i][1]) * (y - vert[i][0]) / (vert[j][0] - vert[i][0]) + vert[i][1])) inside = !inside
    }

    return inside
}

export function serialize(obj: Object): string {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            if (Array.isArray(obj[p])) {
                for (let a in obj[p]) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][a]));
                }
            } else {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
    return str.join("&");
}

export function sortSitesNumerically(source_data: Object) {
    // If the Name is a Number, then sort numerically instead of alphabetically
    if (source_data.length > 0 && !isNaN(source_data[0].name)) {
        source_data.sort(function (x, y) {
            return x.name - y.name;
        });
    }
    return source_data;
}