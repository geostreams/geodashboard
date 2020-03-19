// @flow
import React from 'react';
import {
    event,
    quantile,
    select
} from 'd3';
import { makeStyles } from '@material-ui/core';

import { precision } from '../../utils/format';
import { sharedStyle } from './utils';

const useStyle = makeStyles(sharedStyle);

type Props = {
    width: number;
    height: number;
    marginTop: number;
    marginBottom: number;
    marginRight: number;
    marginLeft: number;
    axisProps: {
        scale: Function;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number
    };
    box: {
        stroke: string;
        strokeWidth: number;
        fill: string;
        fillOpacity: number;
    };
    mainLine: {
        stroke: string;
        strokeWidth: number;
        strokeDashArray: string;
    };
    medianLine: {
        stroke: string;
        strokeWidth: number;
        strokeDashArray: string;
    };
    sideLine: {
        stroke: string;
        strokeWidth: number;
        strokeDashArray: string;
    };
    labels: {
        median: number;
        min: number;
        max: number;
        q1: number;
        q3: number;
    };
    tooltipContent: string | Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: Array<number>;    // data must be sorted
}

const BoxPlot = (props: Props) => {
    const classes = useStyle();

    const {
        width,
        height,
        marginTop,
        marginBottom,
        marginRight,
        marginLeft,
        axisProps,
        box,
        mainLine,
        medianLine,
        sideLine,
        labels,
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

            const q1 = quantile(data, .25);
            const median = quantile(data, .5);
            const q3 = quantile(data, .75);
            const interQuantileRange = q3 - q1;
            const min = q1 - (1.5 * interQuantileRange);
            const max = q1 + (1.5 * interQuantileRange);

            const y = axisProps.scale.range([innerHeight, 0]);

            const center = innerWidth / 2;

            // Show the main vertical line
            gEl
                .append('line')
                .attr('x1', center)
                .attr('y1', y(min))
                .attr('x2', center)
                .attr('y2', y(max))
                .attr('stroke', mainLine.stroke || 'black')
                .attr('stroke-width', mainLine.strokeWidth || 1)
                .attr('stroke-dasharray', mainLine.strokeDashArray || '0');

            // Show the box
            gEl
                .append('rect')
                .attr('x', center - (innerWidth / 2))
                .attr('y', y(q3))
                .attr('height', y(q1) - y(q3))
                .attr('width', innerWidth)
                .attr('stroke', box.stroke || 'black')
                .attr('stroke-width', box.strokeWidth || 1)
                .style('fill', box.fill || '#69b3a2')
                .style('fill-opacity', box.fillOpacity || 0.3);

            // Add min and max lines
            gEl
                .selectAll()
                .data([min, max])
                .enter()
                .append('line')
                .attr('x1', center - (innerWidth / 2))
                .attr('x2', center + (innerWidth / 2))
                .attr('y1', (d) => (y(d)) )
                .attr('y2', (d) => (y(d)) )
                .attr('stroke', sideLine.stroke || 'black')
                .attr('stroke-width', sideLine.strokeWidth || 1)
                .attr('stroke-dasharray', sideLine.strokeDashArray || '0');

            // Add median line
            gEl
                .append('line')
                .attr('x1', center - (innerWidth / 2))
                .attr('x2', center + (innerWidth / 2))
                .attr('y1', y(median))
                .attr('y2', y(median))
                .attr('stroke', medianLine.stroke || 'black')
                .attr('stroke-width', medianLine.strokeWidth || 1)
                .attr('stroke-dasharray', medianLine.strokeDashArray || '0');

            // Add value labels
            if (labels.max) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(max))
                    .attr('dy', '1em')
                    .attr('font-size', labels.max)
                    .text(precision(max, 0));
            }
            if (labels.min) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(min))
                    .attr('font-size', labels.min)
                    .text(precision(min, 0));
            }
            if (labels.median) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(median) - 5)
                    .attr('dy', '1em')
                    .attr('font-size', labels.median)
                    .text(precision(median, 0));
            }
            if (labels.q1) {
                gEl
                    .append('text')
                    .attr('x', center - (innerWidth / 2) - 5)
                    .attr('y', y(q1))
                    .attr('text-anchor', 'end')
                    .attr('font-size', labels.q1)
                    .text(precision(q1, 0));
            }
            if (labels.q3) {
                gEl
                    .append('text')
                    .attr('x', center - (innerWidth / 2) - 5)
                    .attr('y', y(q3))
                    .attr('text-anchor', 'end')
                    .attr('font-size', labels.q3)
                    .text(precision(q3, 0));
            }

            // Prepare tooltip container
            const tooltip = tooltipContent ? select(tooltipRef.current) : null;

            // Attach events
            gEl
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
                            .style('top', `${event.clientY}px`);
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

BoxPlot.defaultProps = {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    box: {},
    mainLine: {},
    medianLine: {},
    sideLine: {},
    labels: {},
    tooltipContent: null,
    mouseOver: () => {},
    mouseOut: () => {},
    click: () => {}
};

export default BoxPlot;
