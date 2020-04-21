// @flow
import React from 'react';
import {
    axisBottom,
    axisLeft,
    event,
    max,
    scaleBand,
    scaleLinear,
    select,
    ScaleLinear,
    Selection
} from 'd3';
import { withStyles } from '@material-ui/core';

import type { SVGElement, SVGGElement } from 'dom-helpers';

import { sharedStyle, xAxisLabel, yAxisLabel } from './utils';

type Props = {
    classes: {
        tooltip: string
    },
    width: number;
    height: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    xAxisProps: {
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
        key: string | number;
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number
    };
    barStroke: string | Function;
    barStrokeWidth: string | Function;
    barStrokeOpacity: string | Function;
    barFill: string | Function;
    barFillOpacity: string | Function;
    tooltipContent: string | Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: Array<{}>;
}
class BarChart extends React.Component<Props> {
    svgRef: { current: null | SVGElement } = React.createRef()

    tooltipRef: { current: null | HTMLDivElement } = React.createRef()

    chartProps: {
        gEl: Selection<SVGGElement>,
        x: ScaleLinear,
        y: ScaleLinear,
        xAxisGroup: Selection<SVGGElement>,
        yAxisGroup: Selection<SVGGElement>,
        tooltip: Selection<HTMLElement>
    }

    static defaultProps = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        barStroke: '#4682b4',
        barStrokeWidth: 1,
        barStrokeOpacity: 0.3,
        barFill: '#4682b4',
        barFillOpacity: 0.3,
        tooltipContent: null,
        mouseOver: () => {},
        mouseOut: () => {},
        click: () => {}
    }

    componentDidMount = (): void => {
        this.createChart();
    }

    componentDidUpdate = (): void => {
        this.updateData();
    }

    updateData = (): void => {
        const {
            data,
            xAxisProps,
            yAxisProps,
            marginTop,
            marginBottom,
            height,
            barStroke,
            barStrokeWidth,
            barStrokeOpacity,
            barFill,
            barFillOpacity,
            tooltipContent,
            mouseOver,
            mouseOut,
            click
        } = this.props;

        const {
            gEl,
            x,
            y,
            xAxisGroup,
            yAxisGroup,
            tooltip
        } = this.chartProps;

        x.domain(data.map((d) => d[xAxisProps.key] ));
        y.domain([0, max(data, (d) => +d[yAxisProps.key] )]);

        // X Axis
        const xAxis = axisBottom(x);
        if (xAxisProps.ticks) {
            xAxis.ticks(...xAxisProps.ticks);
        }
        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .attr('x', -25)
            .attr('y', -5)
            .attr('transform', 'rotate(-90)')
            .attr('fill', xAxisProps.textColor || 'currentColor')
            .attr('fill-opacity', xAxisProps.textOpacity || 0.3);
        xAxisGroup
            .selectAll('line,path')
            .style('stroke', xAxisProps.stroke || 'currentColor')
            .attr('stroke-width', xAxisProps.strokeWidth || 1);

        // Y Axis
        const yAxis = axisLeft(y);
        if (yAxisProps.ticks) {
            yAxis.ticks(...yAxisProps.ticks);
        }
        yAxisGroup
            .transition()
            .duration(500)
            .call(yAxis);
        yAxisGroup
            .selectAll('text')
            .attr('fill', yAxisProps.textColor || 'currentColor')
            .attr('fill-opacity', yAxisProps.textOpacity || 0.3);
        yAxisGroup
            .selectAll('line,path')
            .attr('stroke', yAxisProps.stroke || 'currentColor')
            .attr('stroke-width', yAxisProps.strokeWidth || 1);

        // Data join
        const bars = gEl.selectAll('rect').data(data);

        // Exit
        bars.exit()
            .transition()
            .duration(500)
            .attr('y', y(0))
            .attr('height', 0)
            .remove();

        // Enter
        bars
            .enter()
            .append('rect')
            .attr('x', (d) => x(d[xAxisProps.key]))
            .attr('width',x.bandwidth)
            .attr('y', y(0))
            .attr('height', 0)
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
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr('y', (d) => y(+d[yAxisProps.key]))
            .attr('x', (d) => x(d[xAxisProps.key]))
            .attr('width', x.bandwidth)
            .attr('height', (d) => (height - marginBottom - marginTop) - y(d[yAxisProps.key]))
            .attr('stroke', barStroke)
            .attr('stroke-width', barStrokeWidth)
            .attr('stroke-opacity', barStrokeOpacity)
            .attr('fill', barFill)
            .attr('fill-opacity', barFillOpacity);
    }

    createChart = (): void => {
        const {
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            width,
            height,
            xAxisProps,
            yAxisProps,
            tooltipContent
        } = this.props;

        const innerWidth = width - marginLeft - marginRight;
        const innerHeight = height - marginBottom - marginTop;

        const svgEl = select(this.svgRef.current);

        const gEl = svgEl
            .append('g')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('transform', `translate(${ marginLeft },${ marginTop })`);

        const xAxisGroup = gEl
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${ innerHeight })`);

        const yAxisGroup = gEl
            .append('g')
            .attr('class', 'yAxis');

        // X Scale
        const x = scaleBand()
            .range([0, innerWidth])
            .paddingInner(0.1)
            .paddingOuter(0.3);

        if (xAxisProps.title) {
            xAxisLabel(
                gEl,
                innerWidth / 2,
                innerHeight + xAxisProps.titlePadding,
                xAxisProps.textColor,
                xAxisProps.textOpacity,
                xAxisProps.title
            );
        }

        // Y Scale
        const y = scaleLinear().range([innerHeight, 0]);

        if (yAxisProps.title) {
            yAxisLabel(
                gEl,
                -(innerHeight) / 2,
                -yAxisProps.titlePadding,
                yAxisProps.textColor,
                yAxisProps.textOpacity,
                yAxisProps.title
            );
        }

        const tooltip = tooltipContent ? select(this.tooltipRef.current) : null;

        this.chartProps = {
            gEl,
            x,
            y,
            xAxisGroup,
            yAxisGroup,
            tooltip
        };
        this.updateData();
    }

    render() {
        const { width, height, classes } = this.props;
        return (
            <>
                <svg ref={this.svgRef} width={width} height={height} />
                <div ref={this.tooltipRef} className={`${classes.tooltip} tooltip`} />
            </>
        );
    }
}

export default withStyles(sharedStyle)(BarChart);
