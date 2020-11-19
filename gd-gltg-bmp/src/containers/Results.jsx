// @flow
import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Grid, Select, makeStyles } from '@material-ui/core';
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import { BarChart } from 'gd-core/src/components/d3';
import { entries } from 'gd-core/src/utils/array';
import { useElementRect } from 'gd-core/src/utils/hooks';
import logger from 'gd-core/src/utils/logger';

import type { Action as PageAction } from 'gd-core/src/actions/page';

import { BMP_API_URL } from '../config';
import { BMPContext } from './Context';

import type { QueryParams } from '../utils/flowtype';

const RESULTS = {
    programs_grouped: {
        label: 'Programs count',
        component: (data, containerRect) => <BarChart
            width={(containerRect.width || 0) * 0.95}
            height={(containerRect.height || 0) * 0.95}
            marginTop={50}
            marginBottom={80}
            marginLeft={70}
            marginRight={20}
            xAxisProps={{
                title: 'Program',
                titlePadding: 70
            }}
            yAxisProps={{
                title: 'Count',
                titlePadding: 0
            }}
            barStroke="#4682b4"
            barsData={data}
        />
    }
};

const useStyle = makeStyles({
    plotContainer: {
        height: 300
    }
});

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const Results = ({ dispatch }: Props) => {
    const classes = useStyle();

    const { filters, results, updateResults } = React.useContext(BMPContext);

    const [activeResultKey, updateActiveResultKey] = React.useState<string>('');
    const [activeResultCategory, updateActiveResultCategory] = React.useState<$Keys<typeof RESULTS>>('programs_grouped');

    const createRequestParams = (): string => {
        const params: QueryParams = {
            applied_date: filters.years[0],
            sunset: filters.years[1],
            group_by: [],
            aggregates: []
        };

        switch (activeResultCategory) {
            case 'programs_grouped':
                params.group_by.push('program');
                params.aggregates.push('program-count');
                break;
        }

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

    const fetchResults = () => {
        const queryParams = createRequestParams();
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
                    let categoryResults;
                    switch (activeResultCategory) {
                        case 'programs_grouped':
                            categoryResults = response.results.map(({ program: x, count: y }) => ({ x, y }));
                            break;
                    }
                    updateResults({
                        ...results,
                        [queryParamsBase64]: categoryResults
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
                        onChange={({ target: { value } }) => updateActiveResultCategory(value)}
                    >
                        {entries(RESULTS).map(([name, { label }]) => (
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
                    RESULTS[activeResultCategory].component(results[activeResultKey], plotContainerRect) :
                    null}
            </Grid>
        </Grid>
    );
};

export default connect()(Results);
