// @flow
import React from 'react'
import {
    axisBottom,
    axisLeft,
    event,
    max,
    scaleBand,
    scaleLinear,
    select
} from 'd3'

type Props = {
    width: number,
    height: number,
    margin?: {
        top?: number,
        right?: number,
        bottom?: number,
        left?: number
    },
    xAxisProps: {
        key: string | number,
        title?: string,
        stroke?: string
    },
    yAxisProps: {
        key: string | number,
        title?: string,
        stroke?: string
    },
    barStroke?: string | Function,
    barStrokeWidth?: string | Function,
    barStrokeOpacity: string | Function,
    barFill?: string | Function,
    barFillOpacity?: string | Function,
    tooltipContent?: string | Function,
    mouseOver?: Function,
    mouseOut?: Function,
    click?: Function,
    data: Array<{}>
}
class BarChart extends React.Component<Props> {
    static defaultProps = {
        margin: {
            top: 50,
            right: 20,
            bottom: 40,
            left: 60
        },
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

    chartProps = {
        g: null,
        x: null,
        y: null,
        xAxisGroup: null,
        yAxisGroup: null,
        tooltip: null
    }

    componentDidMount = (): void => {
        this.createChart()
    }

    componentDidUpdate = (): void => {
        this.updateData()
    }

    updateData = (): void => {
        const {
            data,
            xAxisProps,
            yAxisProps,
            margin,
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
        } = this.props

        const {
            g,
            x,
            y,
            xAxisGroup,
            yAxisGroup,
            tooltip
        } = this.chartProps

        x.domain(data.map((d) => d[xAxisProps.key] ))
        y.domain([0, max(data, (d) => +d[yAxisProps.key] )])

        // X Axis
        const xAxis = axisBottom(x)
        xAxisGroup
            .call(xAxis)
            .selectAll('text')
            .attr('x', -25)
            .attr('y', -5)
            .attr('transform', 'rotate(-90)')
        xAxisGroup
            .selectAll('line')
            .style('stroke', xAxisProps.stroke || 'currentColor')

        // Y Axis
        const yAxis = axisLeft(y)
        yAxisGroup
            .transition()
            .duration(500)
            .call(yAxis)
            .selectAll('line')
            .style('stroke', yAxisProps.stroke || 'currentColor')

        // Data join
        const bars = g.selectAll('rect')
            .data(data)
            .attr('stroke', barStroke)
            .attr('stroke-width', barStrokeWidth)
            .attr('stroke-opacity', barStrokeOpacity)
            .attr('fill', barFill)
            .attr('fill-opacity', barFillOpacity)

        // Exit
        bars.exit()
            .transition()
            .duration(500)
            .attr('y', y(0))
            .attr('height', 0)
            .remove()

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
                        .style('top', `${event.clientY - 50}px`)
                }
            })
            .on('mouseout', (d) => {
                if (tooltip) {
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0)
                }
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr('y', (d) => y(+d[yAxisProps.key]))
            .attr('x', (d) => x(d[xAxisProps.key]))
            .attr('width', x.bandwidth)
            .attr('height', (d) => (height - margin.bottom - margin.top) - y(d[yAxisProps.key]))
    }

    createChart = (): void => {
        const {
            margin,
            width,
            height,
            xAxisProps,
            yAxisProps,
            tooltipContent
        } = this.props

        const svg = select(this.svgEl)

        const g = svg.append('g')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.bottom - margin.top + 40)
            .attr('transform', `translate(${ margin.left },${ margin.top })`)

        const xAxisGroup = g.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${ height - margin.bottom - margin.top })`)

        const yAxisGroup = g.append('g')
            .attr('class', 'yAxis')

        // X Scale
        const x = scaleBand()
            .range([0, width - margin.left - margin.right])
            .paddingInner(0.1)
            .paddingOuter(0.3)

        if (xAxisProps.title) {
            g.append('text')
                .attr('x', (width - margin.left - margin.right) / 2)
                .attr('y', height - margin.top - margin.bottom + 50)
                .attr('text-anchor', 'middle')
                .text(xAxisProps.title)
        }

        // Y Scale
        const y = scaleLinear()
            .range([height - margin.bottom - margin.top, 0])

        if (yAxisProps.title) {
            g.append('text')
                .attr('x', -(height - margin.bottom - margin.top) / 2)
                .attr('y', -30)
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(-90)')
                .text(yAxisProps.title)
        }

        const tooltip = tooltipContent ?
            select(this.tooltipEl)
                .attr('class', 'tooltip')
                .style('position', 'fixed')
                .style('background', '#fff')
                .style('border-radius', '5px')
                .style('padding', '5px')
                .style('opacity', 0) :
            null

        this.chartProps = {
            g,
            x,
            y,
            xAxisGroup,
            yAxisGroup,
            tooltip
        }
        this.updateData()
    }

    render() {
        const { width, height, xAxisProps } = this.props
        const xPadding = xAxisProps.title ? 40 : 0
        return (
            <div>
                <svg key="svg" ref={(c) => this.svgEl = c} width={width} height={height + xPadding} />
                <div key="tooltip" ref={(c) => this.tooltipEl = c} />
            </div>
        )
    }
}

export default BarChart
