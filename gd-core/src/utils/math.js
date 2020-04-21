// @flow

/**
 * Returns slope of the Simple Linear Regression (SLR) for the given x and y data.
 * `x` and `y` must have the same length.
 * Formula is from https://en.wikipedia.org/wiki/Simple_linear_regression
 */
export const SLRSlope = (x: number[], y: number[]): number => {
    const n = x.length;
    let sumX = 0;
    let sumY = 0;
    let sumXX = 0;
    let sumXY = 0;
    for (let i = 0; i < n; i += 1) {
        const xi = x[i];
        const yi = y[i];
        sumX += xi;
        sumY += yi;
        sumXX += xi * xi;
        sumXY += xi * yi;
    }
    return ((n * sumXY) - (sumX * sumY)) / ((n * sumXX) - (sumX * sumX));
};
