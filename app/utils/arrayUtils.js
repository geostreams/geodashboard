export function inArray(array1, array2) {
    if(array1.length > 0 && array2.length > 0) {
        for(var i = 0; i < array1.length; i++) {
            if(array2.indexOf(array1[i]) > -1) {
                return true;
            }
        }
    }
    return false;
}

export function intersectArrays(array1, array2) {
    let t;
    if(array2.length > array1.length) {
        t=array2, array2=array1, array1 = t; //Swap array's so 1 is shorter than2
    }
    return array1.filter(function(e) {
        return array2.indexOf(e) > -1
    });
}