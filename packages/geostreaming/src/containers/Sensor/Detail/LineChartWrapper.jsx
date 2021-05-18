// @flow
import * as React from 'react';
import { ascending, extent, scaleLinear, scaleTime, select, timeYear } from 'd3';
import { Grid } from '@material-ui/core';
import { BoxPlot, LineChart } from '@geostreams/core/src/components/d3';
import { precision } from '@geostreams/core/src/utils/format';
import { useElementRect } from '@geostreams/core/src/utils/hooks';

import type { ParameterValue } from '../../../utils/flowtype';

type Props = {
    classes: {
        chartContainer: string;
        chartDownloadIcon: string;
    };
    label: string;
    unit: string;
    startDate: Date;
    endDate: Date;
    data: ParameterValue[];
    startAtZero: boolean;
    sameTimeScale: boolean;
    tooltipContainerRef: { current: HTMLDivElement | null };
};

const LineChartWrapper = (props: Props) => {
    const {
        classes,
        label,
        unit,
        startDate,
        endDate,
        data,
        startAtZero,
        sameTimeScale,
        tooltipContainerRef
    } = props;

    const lineChartContainer = React.useRef();
    const lineChartContainerRect = useElementRect(lineChartContainer);
    const boxPlotContainer = React.useRef();
    const boxPlotContainerRect = useElementRect(boxPlotContainer);

    const lineData = [];
    const boxData = [];

    let minDate = null;
    let maxDate = null;
    let minAverage = Infinity;
    let maxAverage = -Infinity;

    data.forEach(({ average, date }) => {
        lineData.push({ date: new Date(date), average });
        boxData.push(average);
        if (maxAverage < average) {
            maxAverage = average;
        }
        if (minAverage > average) {
            minAverage = average;
        }
        if (!maxDate || maxDate < date) {
            maxDate = date;
        }
        if (!minDate || minDate > date) {
            minDate = date;
        }
    });

    lineData.sort((d1, d2) => ascending(d1.date, d2.date));
    boxData.sort(ascending);

    const dateRange = sameTimeScale ?
        [startDate, endDate] :
        extent(lineData, (d) => d.date);

    return (
        <>
            <Grid item xs={10}>
                <div ref={lineChartContainer} className={classes.chartContainer}>
                    {lineData.length ?
                        <LineChart
                            data={lineData}
                            xAxisProps={{
                                key: 'date',
                                scale: scaleTime().domain(dateRange),
                                ticks: [timeYear.every(1)]
                            }}
                            yAxisProps={{
                                key: 'average',
                                scale: scaleLinear().domain( [startAtZero ? 0 : minAverage, maxAverage]),
                                title: unit,
                                titlePadding: 10
                            }}
                            lineStroke="#56B4E9"
                            lineStrokeWidth={2}
                            dotRadius={2}
                            dotFill={({ average }, boxPlotData) => average < boxPlotData.whiskerLower || average > boxPlotData.whiskerUpper ? 'red' : '#0072B2'}
                            height="320"
                            width={lineChartContainerRect.width || 0}
                            marginTop={30}
                            marginBottom={30}
                            marginRight={20}
                            marginLeft={55}
                            boxPlot
                            boxPlotStyle={{
                                fill: '#dceef5',
                                fillOpacity: 1
                            }}
                            trace
                            traceStyle={{
                                circle: {
                                    fill: '#009E73',
                                    stroke: '#009E73',
                                    radius: 6
                                },
                                line: {
                                    stroke: '#009E73',
                                    strokeWidth: 2,
                                    strokeDashArray: '3 3'
                                }
                            }}
                            download
                            downloadClass={classes.chartDownloadIcon}
                            downloadFilename={`${label}.svg`}
                            mouseOver={(d, el, x, y) => {
                                const elPosition = el.getBoundingClientRect();
                                select(tooltipContainerRef.current)
                                    .html(`
                                                Date: ${d.date.toLocaleDateString()}
                                                <br />
                                                Average: ${precision(d.average, 2)} ${unit ? ` ${unit}` : ''}
                                            `)
                                    .style('opacity', .9)
                                    .style('left', `${elPosition.x + x}px`)
                                    .style('top', `${elPosition.y + y}px`);
                            }}
                            mouseOut={() => {
                                select(tooltipContainerRef.current).style('opacity', 0);
                            }}
                        /> :
                        'No Data Available'}
                </div>
            </Grid>
            <Grid item xs={2}>
                <div ref={boxPlotContainer} className={classes.chartContainer}>
                    {boxData.length ?
                        <BoxPlot
                            data={boxData}
                            axisProps={{
                                scale: scaleLinear()
                                    .domain( [startAtZero ? 0 : minAverage, maxAverage])
                                    .clamp(true)
                            }}
                            box={{
                                strokeWidth: 0.1,
                                fill: '#dceef5',
                                fillOpacity: 1
                            }}
                            mainLine={{
                                strokeDashArray: '2'
                            }}
                            medianLine={{
                                strokeDashArray: '2'
                            }}
                            labels={{
                                whiskerUpper: 10,
                                whiskerLower: 10,
                                median: 10,
                                q1: 10,
                                q3: 10
                            }}
                            height="320"
                            width={(boxPlotContainerRect.width || 0) * 0.7}
                            marginTop={30}
                            marginBottom={30}
                            marginRight={20}
                            marginLeft={55}
                        /> :
                        null}
                </div>
            </Grid>
        </>
    );
};

export default LineChartWrapper;
