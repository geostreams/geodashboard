// @flow
import * as React from 'react';
import { scaleBand, scaleLinear, select } from 'd3';
import { Grid } from '@material-ui/core';
import { SimpleLegend, StackedBarChart } from '@geostreams/core/src/components/d3';
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
    season: ?string;
    data: ParameterValue[];
    categories: string[];
    colors: string[];
    tooltipContainerRef: { current: HTMLDivElement | null };
};

const StackedBarChartWrapper = (props: Props) => {
    const {
        classes,
        label,
        unit,
        season,
        data,
        categories,
        colors,
        tooltipContainerRef
    } = props;

    const barChartContainer = React.useRef();
    const barChartContainerRect = useElementRect(barChartContainer);
    const legendContainer = React.useRef();
    const legendContainerRect = useElementRect(legendContainer);

    const processedData = [];
    const years = new Set();

    data.forEach(({ year, data: d }) => {
        processedData.push({ ...d, year });
        years.add(year);
    });

    return (
        <>
            <Grid item xs={10}>
                <div ref={barChartContainer} className={classes.chartContainer}>
                    {data.length ?
                        <StackedBarChart
                            width={barChartContainerRect.width || 0}
                            height={500}
                            marginTop={50}
                            marginBottom={50}
                            marginLeft={60}
                            marginRight={20}
                            xAxisProps={{
                                scale: scaleBand().domain(Array.from(years).sort()),
                                key: 'year',
                                titleYPadding: 50
                            }}
                            yAxisProps={{
                                scale: scaleLinear(),
                                keys: categories,
                                title: unit,
                                titleYPadding: 20
                            }}
                            data={processedData}
                            barFill={(d) => colors[d.index]}
                            mouseOver={(values, idx, rects, target, position) => {
                                const content = [`Date: ${season ? `${season} ` : ''}${values.data.year}`];
                                categories.forEach((category) => {
                                    content.push(`${category}: ${precision(values.data[category], 2)} (${unit})`);
                                });
                                const targetPosition = target.getBoundingClientRect();
                                select(tooltipContainerRef.current)
                                    .html(content.join('<br />'))
                                    .style('opacity', .9)
                                    .style('left', `${targetPosition.x + position[0]}px`)
                                    .style('top', `${targetPosition.y + position[1]}px`);
                            }}
                            mouseOut={() => {
                                select(tooltipContainerRef.current).style('opacity', 0);
                            }}
                            download
                            downloadClass={classes.chartDownloadIcon}
                            downloadFilename={`${label}.svg`}
                        /> :
                        'No Data Available'}
                </div>
            </Grid>
            <Grid item xs={2}>
                <div ref={legendContainer} className={classes.chartContainer}>
                    <SimpleLegend
                        width={legendContainerRect.width || 0}
                        itemHeight={13}
                        marginBottom={4}
                        data={categories.map((category, idx) => ({
                            label: category,
                            type: 'polygon',
                            color: colors[idx],
                            size: 12
                        }))}
                    />
                </div>
            </Grid>
        </>
    );
};

export default StackedBarChartWrapper;
