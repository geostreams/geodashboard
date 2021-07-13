// @flow
import { callAPI } from '@geostreams/core/src/utils/io';
import logger from '@geostreams/core/src/utils/logger';

import type { TrendDetailValues, TrendRegionBoundary, TrendValues } from '../../utils/flowtype';

export const getTrendValues = (
    geostreamingEndpoint: string,
    parameter: string,
    season: string,
    boundaries: TrendRegionBoundary[],
    success: (trendsValues: { [regionId: string]: TrendValues }) => void,
    dispatch: (action: any) => void
) => {
    callAPI(
        geostreamingEndpoint,
        `/api/trends/region/${parameter}?season=${season}`,
        (response) => {
            const trendsValues = {};
            response.trends.forEach((trendValues) => {
                const boundary = boundaries.find(({ properties: { id } }) => trendValues.region_id === id);
                if (boundary) {
                    trendValues.percent_change = 100 * (
                        (trendValues.tenyearsaverage - trendValues.totalaverage) / trendValues.totalaverage
                    );

                    const parameterThreshold = boundary.properties.threshold[parameter];
                    if (parameterThreshold) {
                        if (trendValues.tenyearsaverage > trendValues.totalaverage) {
                            if (trendValues.tenyearsaverage >= parameterThreshold) {
                                trendsValues[trendValues.region_id] = {
                                    ...trendValues,
                                    trend: 'overThresholdUp'
                                };
                                return;
                            }
                            trendsValues[trendValues.region_id] = {
                                ...trendValues,
                                trend: 'up'
                            };
                            return;
                        }

                        if (trendValues.tenyearsaverage < trendValues.totalaverage) {
                            if (trendValues.tenyearsaverage <= parameterThreshold) {
                                trendsValues[trendValues.region_id] = {
                                    ...trendValues,
                                    trend: 'overThresholdDown'
                                };
                                return;
                            }
                            trendsValues[trendValues.region_id] = {
                                ...trendValues,
                                trend: 'down'
                            };
                            return;
                        }

                        trendsValues[trendValues.region_id] = {
                            ...trendValues,
                            trend: 'noChange'
                        };
                        return;
                    }

                    if (trendValues.tenyearsaverage > trendValues.totalaverage) {
                        trendsValues[trendValues.region_id] = {
                            ...trendValues,
                            trend: 'up'
                        };
                        return;
                    }

                    if (trendValues.tenyearsaverage < trendValues.totalaverage) {
                        trendsValues[trendValues.region_id] = {
                            ...trendValues,
                            trend: 'down'
                        };
                        return;
                    }

                    trendsValues[trendValues.region_id] = {
                        ...trendValues,
                        trend: 'noChange'
                    };
                }
            });
            success(trendsValues);
        },
        logger.error,
        dispatch
    );
};

export const getTrendDetailValues = (
    geostreamingEndpoint: string,
    regionId: string,
    parameter: string,
    season: string,
    boundaries: TrendRegionBoundary[],
    success: (trendAverage: TrendDetailValues[]) => void,
    error: () => void
) => {
    const boundary = boundaries.find(({ properties }) => properties.id === regionId);
    if (boundary) {
        const coords = boundary.geometry.coordinates[0].map(([long, lat]) => `${lat},${long}`).join(',');

        callAPI(
            geostreamingEndpoint,
            `/api/trends/region/detail/${parameter}?season=${season}&geocode=${coords}`,
            (response) => {
                const trendDetailValues = [];
                for (let i = 0; i < response.average.length; i += 1) {
                    const year = parseInt(Object.keys(response.average[i])[0], 10);
                    const average = parseFloat(response.average[i][year]);
                    const deviation = parseFloat(response.deviation[i][year]);
                    trendDetailValues.push({
                        year,
                        average,
                        deviation,
                        lower: average - deviation,
                        upper: average + deviation
                    });
                }
                trendDetailValues.sort((v1, v2) => v1.year - v2.year);
                success(trendDetailValues);
            },
            error
        );
    }
};
