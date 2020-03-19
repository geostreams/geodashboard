// @flow
import React from 'react';
import {
    ascending,
    axisBottom,
    axisLeft,
    event,
    line,
    max,
    min,
    quantile,
    select
} from 'd3';
import { makeStyles } from '@material-ui/core';

import { sharedStyle, xAxisLabel, yAxisLabel } from './utils';

const useStyle = makeStyles(sharedStyle);

type Props = {
    width: number;
    height: number;
    marginTop: number;
    marginBottom: number;
    marginRight: number;
    marginLeft: number;
    xAxisProps: {
        scale: Function;
        key: string | number;
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number
    };
    yAxisProps: {
        scale: Function;
        key: string | number;
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number
    };
    lineStroke: string | Function;
    lineStrokeWidth: string | Function;
    lineStrokeOpacity: string | Function;
    lineFill: string | Function;
    lineFillOpacity: string | Function;
    dotRadius: number;
    dotFill: string | Function;
    boxPlot: {
        fill: string;
        fillOpacity: number;
        stroke: string;
        strokeWidth: number;
        strokeDashArray: string;
    };
    tooltipContent: string | Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: Array<{}>;
}

const LineChart = (props: Props) => {
    const classes = useStyle();

    const {
        width,
        height,
        marginTop,
        marginBottom,
        marginRight,
        marginLeft,
        xAxisProps,
        yAxisProps,
        lineStroke,
        lineStrokeWidth,
        lineStrokeOpacity,
        lineFill,
        lineFillOpacity,
        dotRadius,
        dotFill,
        boxPlot,
        tooltipContent,
        mouseOver,
        mouseOut,
        click,
        data
    } = props;

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginBottom - marginTop;

    const gRef = React.useRef(null);
    const tooltipRef = React.useRef(null);

    React.useEffect(() => {
        if (gRef.current) {
            const gEl = select(gRef.current);
            gEl.selectAll('*').remove();

            const x = xAxisProps.scale.range([ 0, innerWidth ]);
            const y = yAxisProps.scale.range([ innerHeight, 0 ]);

            // Add bounds box
            if (boxPlot) {
                // Box Plot can only work for data with numerical values for their y axis
                const yData = data.map(d => d[yAxisProps.key]);
                yData.sort(ascending);
                const q1 = quantile(yData, .25);
                const median = quantile(yData, .5);
                const q3 = quantile(yData, .75);

                const minY = min(data, (d) => d[yAxisProps.key]);
                const maxY = max(data, (d) => d[yAxisProps.key]);

                gEl
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', y(q3))
                    .attr('width', innerWidth)
                    .attr('height', y(q1) - y(q3))
                    .attr('fill', boxPlot.fill)
                    .attr('fill-opacity', boxPlot.fillOpacity || 0.3);

                // Add min and max lines
                const values = [minY, median, maxY];
                values.forEach((lineY) => {
                    gEl
                        .append('line')
                        .attr('x1', 0)
                        .attr('y1', y(lineY))
                        .attr('x2', innerWidth)
                        .attr('y2', y(lineY))
                        .attr('stroke', boxPlot.stroke || 'black')
                        .attr('stroke-width', boxPlot.strokeWidth || 1)
                        .attr('stroke-dasharray', boxPlot.strokeDashArray || '0');
                });
            }

            // Add X axis
            const xAxis = axisBottom(x);
            if (xAxisProps.ticks) {
                xAxis.ticks(...xAxisProps.ticks);
            }
            gEl.append('g')
                .attr('transform', `translate(0,${ innerHeight })`)
                .call(xAxis);
            if (xAxisProps.title) {
                xAxisLabel(
                    gEl,
                    innerWidth / 2,
                    innerHeight + (xAxisProps.titlePadding || 0),
                    xAxisProps.textColor,
                    xAxisProps.textOpacity,
                    xAxisProps.title
                );
            }

            // Add Y axis
            const yAxis = axisLeft(y);
            if (yAxisProps.ticks) {
                yAxis.ticks(...yAxisProps.ticks);
            }
            gEl.append('g')
                .call(yAxis);
            if (yAxisProps.title) {
                yAxisLabel(
                    gEl,
                    -(innerHeight) / 2,
                    -yAxisProps.titlePadding || 0,
                    yAxisProps.textColor,
                    yAxisProps.textOpacity,
                    yAxisProps.title
                );
            }

            // Add the line
            gEl
                .append('path')
                .datum(data)
                .attr('fill', lineFill)
                .attr('fill-opacity', lineFillOpacity)
                .attr('stroke', lineStroke)
                .attr('stroke-width', lineStrokeWidth)
                .attr('stroke-opacity', lineStrokeOpacity)
                .attr('d', line()
                    .x((d) => x(d[xAxisProps.key]))
                    .y((d) => y(d[yAxisProps.key])));

            // Prepare tooltip container
            const tooltip = tooltipContent ? select(tooltipRef.current) : null;

            // Add the points
            gEl
                .append('g')
                .selectAll()
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => x(d[xAxisProps.key]) )
                .attr('cy', (d) => y(d[yAxisProps.key]) )
                .attr('r', dotRadius)
                .attr('fill', dotFill)
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', click)
                .on('mouseover', (d) => {
                    if (tooltip) {
                        tooltip
                            .html(typeof tooltipContent === 'function' ? tooltipContent(d) : tooltipContent)
                            .transition()
                            .duration(200)
                            .style('opacity', .9)
                            .style('left', `${event.clientX}px`)
                            .style('top', `${event.clientY - 50}px`);
                    }
                })
                .on('mouseout', () => {
                    if (tooltip) {
                        tooltip
                            .transition()
                            .duration(500)
                            .style('opacity', 0);
                    }
                });
        }
    });

    return (
        <>
            <svg width={width} height={height}>
                <g ref={gRef} transform={`translate(${ marginLeft },${ marginTop })`} />
            </svg>
            <div ref={tooltipRef} className={classes.tooltip} />
        </>
    );
};

LineChart.defaultProps = {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    lineStroke: '#69b3a2',
    lineStrokeWidth: 1.5,
    lineStrokeOpacity: 1,
    lineFill: 'none',
    lineFillOpacity: 1,
    dotRadius: 5,
    dotFill: '#69b3a2',
    boxPlot: null,
    tooltipContent: null,
    mouseOver: () => {},
    mouseOut: () => {},
    click: () => {}
};

export default LineChart;
