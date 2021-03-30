// @flow
import { entries } from 'gd-core/src/utils/array';

import ProgramsCount, { config as programsCountConfig } from './ProgramsCount';
import ProgramsFunding, { config as programsFundingConfig } from './ProgramsFunding';
import ProgramsAreaTreated, { config as programsAreaTreatedConfig } from './ProgramsAreaTreated';
import NutrientReduction, { config as nutrientReductionConfig } from './NutrientReduction';
import TopPracticesByArea, { config as topPracticesByAreaConfig } from './TopPracticesByArea';

import type { Filters, QueryParams } from '../../utils/flowtype';

export const RESULTS = {
    programsCount: {
        component: ProgramsCount,
        config: programsCountConfig
    },
    programsFunding: {
        component: ProgramsFunding,
        config: programsFundingConfig
    },
    programsAreaTreated: {
        component: ProgramsAreaTreated,
        config: programsAreaTreatedConfig
    },
    nutrientReduction: {
        component: NutrientReduction,
        config: nutrientReductionConfig
    },
    topPracticesByArea: {
        component: TopPracticesByArea,
        config: topPracticesByAreaConfig
    }
};

export const createRequestParams = (category: string, filters: Filters): string => {
    const prepareParams = RESULTS[category].config.prepareParams;

    const params: QueryParams = {
        limit: 0,
        applied_date: filters.years[0],
        sunset: filters.years[1],
        group_by: [],
        aggregates: [],
        partitions: [],
        partition_size: 0,
        order_by: []
    };

    if (filters.selectedBoundaries.length) {
        params.group_by.push(filters.boundaryType);
        params[filters.boundaryType] = filters.selectedBoundaries;
        params.order_by.push(filters.boundaryType);
    }

    prepareParams(params, filters.selectedBoundaries.length ? filters.boundaryType : null);

    return entries(params).reduce((queryParams, [param, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => {
                queryParams.push(`${param}=${v}`);
            });
        } else {
            queryParams.push(`${param}=${value}`);
        }
        return queryParams;
    }, []).join('&');
};
