// @flow
import React from 'react';
import { VegaLite } from 'react-vega';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { entries } from 'gd-core/src/utils/array';
import { precision } from 'gd-core/src/utils/format';

import type { ElementRect } from 'gd-core/src/utils/flowtype';

import type { Filters, QueryParams } from '../../utils/flowtype';


export const config = {
    label: 'Programs - Area Treated',
    prepareParams: (params: QueryParams) => {
        params.group_by.push('program');
        params.group_by.push('applied_date');
        params.aggregates.push('area_treated-sum');
        params.order_by.push('-area_treated-sum');
    },
    chartSpec: {
        data: { name: 'area_treated' },
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
                field: 'area_treated-sum',
                title: 'Area treated',
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
            tooltip: { field: 'area_treated-sum', format: ',.01f' }
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
     *   { "state": "Illinois", "program": "EQIP", "applied_date": 2007, "area_treated-sum": 36.63392857142857 },
     *   { "state": "Iowa", "program": "CSP", "applied_date": 2015, "area_treated-sum": 269182.60000000003 },
     *   ...
     * ]
     */
    data: Array<{
        'program': string;
        'applied_date': number;
        'area_treated-sum': number;
        // Each item has only one of the following boundary types:
        'state'?: string;
        'huc_8'?: string;
    }>;
    containerRect: ElementRect;
};

const ProgramsAreaTreated = (props: Props) => {
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
            tableData[boundaryId][d.program] = (tableData[boundaryId][d.program] || 0) + (d['area_treated-sum'] || 0);
        } else {
            tableData[boundaryId] = {
                [d.program]: d['area_treated-sum'] || 0
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
                data={{ area_treated: props.data }}
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
                        <TableRow>
                            <TableCell />
                            <TableCell colSpan={programs.length} align="center">Acres</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries(tableData).map(([
                            boundary,
                            boundaryPrograms
                        ]) => (
                            <TableRow key={boundary}>
                                <TableCell>{boundary}</TableCell>
                                {programs.map((program: string) => (
                                    <TableCell key={program} align="center">
                                        {boundaryPrograms[program] ? precision(boundaryPrograms[program] || 0, 0) : '-'}
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

export default ProgramsAreaTreated;
