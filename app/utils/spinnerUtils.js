/*
 * @flow
 */


import {getIntervalTime, getLoadingTimeLimit} from "./getConfig";

export function intervalCounts(checkVal: any, spinner: any, item: any = null) {
    let setInterval_time = getIntervalTime();
    let loading_time = 0;
    let resolveVal;

    return (
        new Promise((resolve) => {
            let x = setInterval(() => {
                let value = true;
                if (item) {
                    value = Object.keys(checkVal[item]).length > 2;
                    resolveVal = checkVal[item];
                } else {
                    value = true;
                    resolveVal = checkVal;
                }
                if (
                    (checkVal !== undefined && value) ||
                    setInterval_time >= getLoadingTimeLimit()
                ) {
                    clearInterval(x);
                    resolve(resolveVal);
                    if (!spinner) {
                        resolve([]);
                    }
                    loading_time  = 0
                } else {
                    setInterval_time = setInterval_time + 1000;
                    loading_time = setInterval_time;
                }
            }, setInterval_time);
        })
    );
}
