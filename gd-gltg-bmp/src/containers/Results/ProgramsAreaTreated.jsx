// @flow
import React from 'react';
import { scaleBand, scaleLinear } from 'd3';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { StackedBarChart } from 'gd-core/src/components/d3';
import { entries } from 'gd-core/src/utils/array';
import { precision } from 'gd-core/src/utils/format';

import type { ElementRect } from 'gd-core/src/utils/flowtype';

import type { Filters, QueryParams } from '../../utils/flowtype';


export const config = {
    label: 'Programs - Area Treated',
    prepareParams: (params: QueryParams) => {
        params.group_by.push('program');
        params.aggregates.push('area_treated-sum');
        params.order_by.push('-area_treated-sum');
    },
    prepareData: (filters: Filters, data: { [k: string]: any }) => {
        const chartDataObject = {};
        const tableDataObject = {};
        const programs = [];
        const colors = {};
        const colorScale = scaleLinear([0, filters.selectedBoundaries.length], ['blue', 'green']);

        data.forEach((d, idx) => {
            const boundaryId: string = filters.selectedBoundaries.length ? (d[filters.boundaryType]: any) : 'Total';
            const color = colorScale(idx);

            if (!colors[boundaryId]) {
                colors[boundaryId] = color;
            }

            if (chartDataObject[d.program]) {
                chartDataObject[d.program][boundaryId] = d['area_treated-sum'];
            } else {
                chartDataObject[d.program] = {
                    [boundaryId]: d['area_treated-sum']
                };
            }

            if (tableDataObject[boundaryId]) {
                tableDataObject[boundaryId][d.program] = d['area_treated-sum'];
            } else {
                tableDataObject[boundaryId] = {
                    color,
                    [d.program]: d['area_treated-sum']
                };
            }
        });

        const chartData = entries(chartDataObject).reduce(
            (processedData, [program, d]) => {
                filters.selectedBoundaries.forEach((boundary) => {
                    if (!d[boundary]) {
                        d[boundary] = 0;
                    }
                });
                processedData.push({
                    ...d,
                    program
                });
                programs.push(program);
                return processedData;
            },
            []
        );

        programs.sort();

        return {
            programs,
            colors,
            chartData,
            tableData: tableDataObject
        };
    }
};

const useStyle = makeStyles({
    tableContainer: {
        height: '100%'
    }
});

type Props = {
    filters: Filters;
    data: {
        colors: { [boundary: string]: string };
        programs: string[];
        chartData: Array<{ [k: string]: any }>;
        tableData: {
            color: string;
            [program: string]: number;
        }
    };
    containerRect: ElementRect;
};

const ProgramsAreaTreated = ({
    filters,
    data,
    containerRect
}: Props) => {
    const classes = useStyle();
    return (
        <>
            <StackedBarChart
                width={(containerRect.width || 0) * 0.95}
                height={(containerRect.height || 0) * 0.95}
                marginTop={50}
                marginBottom={80}
                marginLeft={70}
                marginRight={20}
                xAxisProps={{
                    scale: scaleBand().domain(data.chartData.map(({ program }) => program)),
                    key: 'program',
                    title: 'Program',
                    titleYPadding: 40
                }}
                yAxisProps={{
                    scale: scaleLinear(),
                    keys: filters.selectedBoundaries.length ? filters.selectedBoundaries : ['Total'],
                    title: 'Area Treated (acre)',
                    titleXPadding: 30,
                    titleYPadding: 15,
                    titleSize: '1rem'
                }}
                data={data.chartData}
                barFill={(d) => data.colors[d.key]}
            />
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {data.programs.map((program) => (
                                <TableCell key={program} align="center">{program}</TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell />
                            <TableCell colSpan={data.programs.length} align="center">Acres</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries(data.tableData).map(([
                            boundary,
                            boundaryPrograms
                        ]) => (
                            <TableRow key={boundary}>
                                <TableCell>
                                    <div
                                        style={{
                                            display: 'inline-block',
                                            width: 10,
                                            height: 10,
                                            marginRight: 10,
                                            background: boundaryPrograms.color
                                        }}
                                    />
                                    {boundary}
                                </TableCell>
                                {data.programs.map((program: string) => (
                                    <TableCell key={program} align="center">
                                        {boundaryPrograms[program] ? precision(boundaryPrograms[program], 0) : '-'}
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
