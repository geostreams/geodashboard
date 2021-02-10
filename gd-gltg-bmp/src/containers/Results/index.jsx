// @flow
import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Grid, Select, makeStyles } from '@material-ui/core';
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import { entries } from 'gd-core/src/utils/array';
import { useElementRect } from 'gd-core/src/utils/hooks';
import logger from 'gd-core/src/utils/logger';

import type { Action as PageAction } from 'gd-core/src/actions/page';

import { BMP_API_URL } from '../../config';
import { BMPContext } from '../Context';
import NutrientReduction, { config as nutrientReductionConfig } from './NutrientReduction';
import ProgramsCount, { config as programsCountConfig } from './ProgramsCount';
import ProgramsFunding, { config as programsFundingConfig } from './ProgramsFunding';
import ProgramsAreaTreated, { config as programsAreaTreatedConfig } from './ProgramsAreaTreated';

import type { Filters, QueryParams } from '../../utils/flowtype';

const RESULTS = {
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
    }
};

const createRequestParams = (prepareParams: (params: QueryParams) => void, filters: Filters): string => {
    const params: QueryParams = {
        limit: 0,
        applied_date: filters.years[0],
        sunset: filters.years[1],
        group_by: [],
        aggregates: [],
        order_by: []
    };

    if (filters.selectedBoundaries.length) {
        params.group_by.push(filters.boundaryType);
        params[filters.boundaryType] = filters.selectedBoundaries;
        params.order_by.push(filters.boundaryType);
    }

    prepareParams(params);

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

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    plotContainer: {
        height: '100%',
        overflowY: 'auto'
    },
    plotTooltip: {
        position: 'fixed',
        background: '#283d4b',
        color: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    }
}));

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const Results = ({ dispatch }: Props) => {
    const classes = useStyle();

    const { filters, results, updateResults } = React.useContext(BMPContext);

    const [activeResultKey, updateActiveResultKey] = React.useState<string>('');
    const [activeResultCategory, updateActiveResultCategory] = React.useState<$Keys<typeof RESULTS>>('programsCount');
    const { component: ResultComponent, config: resultConfig } = RESULTS[activeResultCategory];

    const plotTooltipRef = React.useRef<null | HTMLDivElement>(null);

    const fetchResults = () => {
        const queryParams = createRequestParams(resultConfig.prepareParams, filters);
        const queryParamsBase64 = btoa(queryParams);
        if (results[queryParamsBase64]) {
            updateActiveResultKey(queryParamsBase64);
        } else {
            dispatch(updateLoadingStatus(true));
            fetch(
                `${BMP_API_URL}/practices?${queryParams}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            )
                .then((response) => response.json())
                .then((response) => {
                    updateResults({
                        ...results,
                        [queryParamsBase64]: response.results
                    });
                    updateActiveResultKey(queryParamsBase64);
                })
                .catch(logger.error)
                .finally(() => {
                    dispatch(updateLoadingStatus(false));
                });
        }
    };

    React.useEffect(() => {
        fetchResults();
    }, [activeResultCategory]);

    const plotContainer = React.useRef();
    const plotContainerRect = useElementRect(plotContainer);

    return (
        <Grid container direction="column">
            <Grid item>
                <FormControl className={classes.formControl}>
                    <Select
                        native
                        value={activeResultCategory}
                        onChange={({ target: { value } }) => {
                            updateActiveResultKey('');
                            updateActiveResultCategory(value);
                        }}
                    >
                        {entries(RESULTS).map(([name, { config: { label } }]) => (
                            <option
                                key={name}
                                value={name}
                            >
                                {label}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid ref={plotContainer} className={classes.plotContainer} item>
                {results[activeResultKey] ?
                    <ResultComponent
                        filters={filters}
                        data={results[activeResultKey]}
                        containerRect={plotContainerRect}
                        tooltipRef={plotTooltipRef}
                    /> :
                    null}
                <div ref={plotTooltipRef} className={classes.plotTooltip} />
            </Grid>
        </Grid>
    );
};

export default connect()(Results);
