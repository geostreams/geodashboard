// @flow
import React from 'react';
import {
    area,
    axisBottom,
    axisLeft,
    line,
    max,
    scaleBand,
    scaleLinear,
    select,
    ScaleLinear,
    Selection
} from 'd3';

import type { SVGElement, SVGGElement } from 'dom-helpers';

import { xAxisLabel, yAxisLabel } from './utils';

type Props = {
    className: string;
    width: number;
    height: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    xAxisProps: {
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number;
    };
    yAxisProps: {
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number;
    };
    barStroke: string | Function;
    barStrokeWidth: string | Function;
    barStrokeOpacity: string | Function;
    barFill: string | Function;
    barFillOpacity: string | Function;
    lineFill: string | Function;
    lineFillOpacity: string | Function;
    lineStroke: string | Function;
    lineStrokeWidth: string | Function;
    lineStrokeOpacity: string | Function;
    intervalFill: string | Function;
    intervalFillOpacity: string | Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    barsData: Array<{ x: number, y: number }>;
    lineData: Array<{ x: number, y: number }> | null;
    intervalData: Array<{ x: number, y0: number, y1: number }> | null;
}

class BarChart extends React.Component<Props> {
    svgRef: { current: null | SVGElement } = React.createRef();

    chartProps: {
        gEl: Selection<SVGGElement>,
        x: ScaleLinear,
        y: ScaleLinear,
        xAxisGroup: Selection<SVGGElement>,
        yAxisGroup: Selection<SVGGElement>
    };

    static defaultProps = {
        lineData: null,
        intervalData: null,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        barStroke: '#4682b4',
        barStrokeWidth: 1,
        barStrokeOpacity: 0.3,
        barFill: '#4682b4',
        barFillOpacity: 0.3,
        lineStroke: '#69b3a2',
        lineStrokeWidth: 1.5,
        lineStrokeOpacity: 1,
        lineFill: 'none',
        lineFillOpacity: 1,
        intervalFill: '#27ae8f',
        intervalFillOpacity: .5,
        className: '',
        mouseOver: () => {
        },
        mouseOut: () => {
        },
        click: () => {
        }
    };

    componentDidMount = (): void => {
        this.createChart();
    };

    componentDidUpdate = (): void => {
        this.updateData();
    };

    updateData = (): void => {
        const {
            barsData,
            lineData,
            intervalData,
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
            lineStroke,
            lineStrokeWidth,
            lineStrokeOpacity,
            lineFill,
            lineFillOpacity,
            intervalFill,
            intervalFillOpacity,
            mouseOver,
            mouseOut,
            click
        } = this.props;

        const {
            gEl,
            x,
            y,
            xAxisGroup,
            yAxisGroup
        } = this.chartProps;

        x.domain(barsData.map((d) => d.x));
        y.domain([0, max(barsData, (d) => d.y)]);

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

        // Update Bars
        // Data join
        const bars = gEl.selectAll('.bar').data(barsData);

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
            .attr('class', 'bar')
            .attr('x', (d) => x(d.x))
            .attr('width', x.bandwidth)
            .attr('y', y(0))
            .attr('height', 0)
            .on('mouseover', mouseOver)
            .on('mouseout', mouseOut)
            .on('click', click)
            .merge(bars)
            .transition()
            .duration(500)
            .attr('y', (d) => y(d.y))
            .attr('x', (d) => x(d.x))
            .attr('width', x.bandwidth)
            .attr('height', (d) => (height - marginBottom - marginTop) - y(d.y))
            .attr('stroke', barStroke)
            .attr('stroke-width', barStrokeWidth)
            .attr('stroke-opacity', barStrokeOpacity)
            .attr('fill', barFill)
            .attr('fill-opacity', barFillOpacity);

        // Update Line
        // Data join
        if (lineData) {
            // Remove the existing line
            gEl
                .selectAll('.line')
                .transition()
                .duration(250)
                .attr('y', y(0))
                .attr('height', 0)
                .remove();

            // Add the new path
            gEl
                .append('path')
                .attr('class', 'line')
                .datum(lineData)
                .transition()
                .duration(500)
                .attr('x', (d) => x(d.x))
                .attr('y', y(0))
                .attr('fill', lineFill)
                .attr('fill-opacity', lineFillOpacity)
                .attr('stroke', lineStroke)
                .attr('stroke-width', lineStrokeWidth)
                .attr('stroke-opacity', lineStrokeOpacity)
                .attr('d', line()
                    .x((d) => x(d.x))
                    .y((d) => y(d.y)));
        }

        // Update Intervals
        // Data join
        if (intervalData) {
            gEl
                .selectAll('.interval')
                .transition()
                .duration(250)
                .attr('y', y(0))
                .attr('height', 0)
                .remove();

            gEl
                .append('path')
                .attr('class', 'interval')
                .datum(intervalData)
                .transition()
                .duration(500)
                .attr('fill', intervalFill)
                .attr('fill-opacity', intervalFillOpacity)
                .attr('stroke', 'none')
                .attr('d', area()
                    .x((d) => x(d.x))
                    .y0((d) => y(d.y0))
                    .y1((d) => y(d.y1)));
        }
    };

    createChart = (): void => {
        const {
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            width,
            height,
            xAxisProps,
            yAxisProps
        } = this.props;

        const innerWidth = width - marginLeft - marginRight;
        const innerHeight = height - marginBottom - marginTop;

        const svgEl = select(this.svgRef.current);

        const gEl = svgEl
            .append('g')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('transform', `translate(${marginLeft},${marginTop})`);

        const xAxisGroup = gEl
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${innerHeight})`);

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

        this.chartProps = {
            gEl,
            x,
            y,
            xAxisGroup,
            yAxisGroup
        };
        this.updateData();
    };

    render() {
        const { width, height, className } = this.props;
        return (
            <div className={className}>
                <svg ref={this.svgRef} width={width} height={height} />
            </div>
        );
    }
}

export default BarChart;
