// @flow
import React from 'react';
import {
    axisBottom,
    format,
    interpolatePuBu,
    range,
    rgb,
    scaleLinear,
    scaleSequential,
    select,
    ScaleLinear,
    Selection
} from 'd3';
import { SVGElement } from 'dom-helpers';

type Props = {
    domain: Array<number>,
    clamp: boolean,
    width: number,
    height: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
    color: {},
    ticks: number,
    tickSize: number,
    tickFormat: string | Function,
    indicator: {
        value: number,
        stroke: string,
        width: number
    }
}

class LegendHorizontalContinuous extends React.Component<Props> {
    containerEl: { current: null | HTMLElement } = React.createRef()

    legendProps: {
        indicatorLine: Selection<SVGElement>,
        scale: ScaleLinear
    }

    static defaultProps = {
        clamp: false,
        width: 350,
        height: 40,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: interpolatePuBu,
        ticks: 4,
        tickSize: 6,
        tickFormat: format('0,'),
        indicator:null
    }

    componentDidMount = (): void => {
        this.createLegend();
    }

    componentDidUpdate = (): void => {
        if (this.legendProps.indicatorLine) {
            this.updateIndicator();
        }
    }

    updateIndicator = () => {
        const { indicator } = this.props;
        const { indicatorLine, scale } = this.legendProps;
        if (indicator) {
            const xPos = scale(indicator.value);
            indicatorLine
                .transition()
                .duration(200)
                .attr('x1', xPos)
                .attr('x2', xPos)
                .attr('opacity', 1);
        } else {
            indicatorLine
                .transition()
                .duration(200)
                .attr('opacity', 0);
        }
    }

    createLegend = () => {
        const {
            domain,
            clamp,
            color,
            width,
            height,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            ticks,
            tickSize,
            tickFormat,
            indicator
        } = this.props;

        const colorScale = scaleSequential(color).domain(domain);

        const canvas = select(this.containerEl.current)
            .style('height', `${height * 2}px`)
            .style('width', `${width}px`)
            .style('position', 'relative')
            .append('canvas')
            .attr('height', 1)
            .attr('width', width - marginRight - marginLeft)
            .style('height', `${height - marginTop - marginBottom}px`)
            .style('width', `${width - marginLeft - marginRight}px`)
            .style('border', '1px solid #000')
            .style('position', 'absolute')
            .style('top', `${marginTop}px`)
            .style('left', `${marginLeft}px`)
            .node();

        const ctx = canvas.getContext('2d');

        const scale = scaleLinear()
            .range([1, width - marginRight - marginLeft])
            .domain(colorScale.domain())
            .clamp(clamp);

        const image = ctx.createImageData(width, 1);
        range(width).forEach((i) => {
            const c = rgb(colorScale(scale.invert(i)));
            const idx = 4 * i;
            image.data[idx] = c.r;
            image.data[idx + 1] = c.g;
            image.data[idx + 2] = c.b;
            image.data[idx + 3] = 255;
        });
        ctx.putImageData(image, 0, 0);

        const legendAxis = axisBottom()
            .scale(scale)
            .tickSize(tickSize)
            .ticks(ticks)
            .tickFormat(tickFormat);

        const svg = select(this.containerEl.current)
            .append('svg')
            .attr('height', `${height * 2}px`)
            .attr('width', `${width + marginLeft + marginRight}px`)
            .style('position', 'absolute')
            .style('left', '0px')
            .style('top', '0px');

        svg
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${marginLeft},${(height - marginTop) + 1})`)
            .call(legendAxis);

        let indicatorLine;
        if (indicator) {
            svg
                .append('svg:defs')
                .append('svg:marker')
                .attr('id', 'triangle')
                .attr('refX', 6)
                .attr('refY', 6)
                .attr('markerWidth', 30)
                .attr('markerHeight', 30)
                .attr('markerUnits', 'userSpaceOnUse')
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M 0 0 12 6 0 12 3 6')
                .style('fill', indicator.stroke || 'black');

            const xPos = scale(indicator.value);
            indicatorLine = svg
                .append('line')
                .attr('x1', xPos)
                .attr('y1', 0)
                .attr('x2', xPos)
                .attr('y2', 20)

                .attr('stroke-width', indicator.width || 1)
                .attr('stroke', indicator.stroke || 'black')
                .attr('marker-end', 'url(#triangle)');
        }

        this.legendProps = {
            indicatorLine,
            scale
        };
    }

    render() {
        return (
            <div ref={this.containerEl} />
        );
    }
}

export default LegendHorizontalContinuous;
