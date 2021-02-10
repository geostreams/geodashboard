// @flow
import React from 'react';
import { VegaLite } from 'react-vega';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { entries } from 'gd-core/src/utils/array';
import { precision } from 'gd-core/src/utils/format';

import type { ElementRect } from 'gd-core/src/utils/flowtype';

import type { Filters, QueryParams } from '../../utils/flowtype';


export const config = {
    label: 'Nutrient reduction',
    prepareParams: (params: QueryParams) => {
        params.aggregates.push('p_reduction_fraction-sum');
        params.aggregates.push('n_reduction_fraction-sum');
        params.order_by.push('-p_reduction_fraction-sum');
        params.order_by.push('-p_reduction_fraction-sum');
    },
    chartSpec: {
        data: { name: 'nutrient_reduction' },
        transform: [
            { calculate: 'datum["p_reduction_fraction-sum"] * 100', as: 'P' },
            { calculate: 'datum["n_reduction_fraction-sum"] * 100', as: 'N' },
            { fold: ['P', 'N'], as: ['nutrient', 'reduction'] }
        ],
        mark: 'bar',
        selection: {
            nutrient: {
                type: 'multi',
                fields: ['nutrient'],
                bind: 'legend'
            }
        },
        encoding: {
            row: { field: '', title: '' },
            x: {
                field: 'reduction',
                title: 'Reduction (%)',
                type: 'quantitative',
                axis: { format: ',.01f' }
            },
            y: { field: 'nutrient', axis: { title: '' } },
            color: {
                field: 'nutrient',
                scale: { scheme: 'category10' },
                title: 'Nutrient',
                legend: { orient: 'top' }
            },
            opacity: {
                condition: { selection: 'nutrient', value: 1 },
                value: 0.2
            },
            tooltip: { field: 'reduction', format: ',.02f' }
        }
    }
};

const useStyle = makeStyles({
    tableContainer: {
        height: '100%'
    }
});

type Props = {
    filters: Filters;
    /** Sample data
     * [
     *   { "state": "Illinois", "p_reduction_fraction-sum": 0.0004683620385481556, "n_reduction_fraction-sum": 0.000493042593381203 },
     *   { "state": "Iowa", "p_reduction_fraction-sum": 0.0015097308506042226, "n_reduction_fraction-sum": 0.0018844352499341763 },
     *   ...
     * ]
     */
    data: Array<{
        'p_reduction_fraction-sum': number;
        'n_reduction_fraction-sum': number;
        // Each item has only one of the following boundary types:
        'state'?: string;
        'huc_8'?: string;
    }>;
    containerRect: ElementRect;
};

const NutrientReduction = (props: Props) => {
    const classes = useStyle();

    const { containerRect, filters } = props;

    if (filters.selectedBoundaries.length) {
        if (filters.boundaryType === 'state') {
            config.chartSpec.encoding.row.field = 'state';
            config.chartSpec.encoding.row.title = 'State';
        } else if (filters.boundaryType === 'huc_8') {
            config.chartSpec.encoding.row.field = 'huc_8';
            config.chartSpec.encoding.row.title = 'HUC8';
        }
    } else {
        config.chartSpec.encoding.row = { field: '', title: '' };
    }

    const nutrients = ['p_reduction_fraction-sum', 'n_reduction_fraction-sum'];
    const tableData = {};
    props.data.forEach((d) => {
        const boundaryId: string = filters.selectedBoundaries.length ? (d[filters.boundaryType]: any) : 'Total';

        if (tableData[boundaryId]) {
            tableData[boundaryId]['p_reduction_fraction-sum'] += (d['p_reduction_fraction-sum'] || 0);
            tableData[boundaryId]['n_reduction_fraction-sum'] += (d['n_reduction_fraction-sum'] || 0);
        } else {
            tableData[boundaryId] = {
                'p_reduction_fraction-sum': d['p_reduction_fraction-sum'] || 0,
                'n_reduction_fraction-sum': d['n_reduction_fraction-sum'] || 0
            };
        }
    });

    return (
        <>
            <VegaLite
                width={(containerRect.width || 0) * 0.6}
                height={(containerRect.height || 0) * 0.6}
                actions={{
                    export: true,
                    source: process.env.NODE_ENV === 'development',
                    compiled: process.env.NODE_ENV === 'development',
                    editor: process.env.NODE_ENV === 'development'
                }}
                data={{ nutrient_reduction: props.data }}
                spec={config.chartSpec}
            />
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">P</TableCell>
                            <TableCell align="center">N</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            <TableCell colSpan={2} align="center">Reduction (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries(tableData).map(([
                            boundary,
                            boundaryNutrients
                        ]) => (
                            <TableRow key={boundary}>
                                <TableCell>{boundary}</TableCell>
                                {nutrients.map((nutrient: string) => (
                                    <TableCell key={nutrient} align="center">
                                        {boundaryNutrients[nutrient] ? `${precision((boundaryNutrients[nutrient] || 0) * 100, 5)}%` : '-'}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default NutrientReduction;
