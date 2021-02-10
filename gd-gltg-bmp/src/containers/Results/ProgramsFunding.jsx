// @flow
import React from 'react';
import { VegaLite } from 'react-vega';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { entries } from 'gd-core/src/utils/array';
import { precision } from 'gd-core/src/utils/format';

import type { ElementRect } from 'gd-core/src/utils/flowtype';

import type { Filters, QueryParams } from '../../utils/flowtype';


export const config = {
    label: 'Programs Funding',
    prepareParams: (params: QueryParams) => {
        params.group_by.push('program');
        params.group_by.push('applied_date');
        params.aggregates.push('funding-sum');
        params.order_by.push('-funding-sum');
    },
    chartSpec: {
        data: { name: 'funding' },
        mark: 'bar',
        selection: {
            program: {
                type: 'multi',
                fields: ['program'],
                bind: 'legend'
            }
        },
        encoding: {
            row: { field: '', title: '' },
            x: {
                field: 'funding-sum',
                title: 'Funding ($)',
                type: 'quantitative',
                axis: { format: ',.0f' }
            },
            y: { field: 'applied_date', title: 'Year' },
            color: {
                field: 'program',
                scale: { scheme: 'category10' },
                title: 'Program',
                legend: { orient: 'top' }
            },
            opacity: {
                condition: { selection: 'program', value: 1 },
                value: 0.2
            },
            tooltip: { field: 'funding-sum', format: '$,.01f' }
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
     *   { "applied_date": 2010, "program": "CSP", "state": "Illinois", "funding-sum": 236754 },
     *   { "applied_date": 2011, "program": "CSP", "state": "Indiana", "funding-sun": null },
     *   ...
     * ]
     */
    data: Array<{
        'program': string;
        'applied_date': number;
        'funding-sum': number;
        // Each item has only one of the following boundary types:
        'state'?: string;
        'huc_8'?: string;
    }>;
    containerRect: ElementRect;
};

const ProgramsFunding = (props: Props) => {
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

    const programsSet = new Set();
    const tableData = {};
    props.data.forEach((d) => {
        const boundaryId: string = filters.selectedBoundaries.length ? (d[filters.boundaryType]: any) : 'Total';

        programsSet.add(d.program);

        if (tableData[boundaryId]) {
            tableData[boundaryId][d.program] = (tableData[boundaryId][d.program] || 0) + (d['funding-sum'] || 0);
        } else {
            tableData[boundaryId] = {
                [d.program]: d['funding-sum'] || 0
            };
        }
    });
    const programs = Array.from(programsSet);

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
                data={{ funding: props.data }}
                spec={config.chartSpec}
            />
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {programs.map((program) => (
                                <TableCell key={program} align="center">{program}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries(tableData).map(([
                            boundary,
                            boundaryPrograms
                        ]) => (
                            <TableRow key={boundary}>
                                <TableCell>
                                    {boundary}
                                </TableCell>
                                {programs.map((program: string) => (
                                    <TableCell key={program} align="center">
                                        {boundaryPrograms[program] ? `$${precision(boundaryPrograms[program], 0)}` : '-'}
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

export default ProgramsFunding;
