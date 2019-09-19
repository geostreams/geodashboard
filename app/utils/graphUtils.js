/*
 * @flow
 */


// These calculations determine the X-Axis interval for the graphs
export function getIntervalValue(num_years: number) {
    let interval_val = 5;
    if (num_years <= 5) {
        interval_val = 1;
    }
    if (num_years >= 20) {
        interval_val = 10;
    }
    if (num_years >= 40) {
        interval_val = 20;
    }
    if (num_years >= 100) {
        interval_val = 50;
    }

    return interval_val;
}

export function removeCharsIDs(updateValue: string) {
    // Remove the following characters and replace with nothing
    // ("(", "") (")", "") ("/", "") (",", "") (" ", "") ("^", "")
    return updateValue.replace(/[\s()^/, ]/g, "");
}
