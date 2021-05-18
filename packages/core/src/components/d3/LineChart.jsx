// @flow
import React from 'react';
import {
    ascending,
    axisBottom,
    axisLeft,
    bisector,
    line,
    mouse,
    quantile,
    select
} from 'd3';
import { Box, Button } from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/GetApp';

import { downloadSvg, xAxisLabel, yAxisLabel } from './utils';

type Props = {
    className: string;
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
    dotRadius: number | Function;
    dotFill: string | Function;
    boxPlot: boolean;
    boxPlotStyle: {
        fill: string;
        fillOpacity: number;
        stroke: string;
        strokeWidth: number;
        strokeDashArray: string;
    };
    trace: boolean;
    traceStyle: {
        circle: {
            show: boolean;
            radius: number;
            stroke: string;
            strokeWidth: number;
            fill: string;
            opacity: number;
        };
        line: {
            show: boolean;
            stroke: string;
            strokeWidth: number;
            strokeDashArray: string;
            opacity: number;
        };
    };
    download: boolean;
    downloadClass: string;
    downloadFilename: ?string | ?Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: Array<{}>;
}

const LineChart = (props: Props) => {
    const {
        className,
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
        boxPlotStyle,
        trace,
        traceStyle,
        download,
        downloadClass,
        downloadFilename,
        mouseOver,
        mouseOut,
        click,
        data
    } = props;

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginBottom - marginTop;

    const svgRef = React.useRef(null);

    React.useEffect(() => {
        if (svgRef.current) {
            const svgEl = select(svgRef.current);
            svgEl.selectAll('*').remove();
            const gEl = svgEl
                .append('g')
                .attr('width', innerWidth)
                .attr('height', innerHeight)
                .attr('transform', `translate(${marginLeft},${marginTop})`);

            const x = xAxisProps.scale.range([0, innerWidth]);
            const y = yAxisProps.scale.range([innerHeight, 0]);

            // Add bounds box
            const boxPlotData = {};
            if (boxPlot) {
                // Box Plot can only work for data with numerical values for their y axis
                const yData = data.map(d => d[yAxisProps.key]);
                yData.sort(ascending);
                boxPlotData.q1 = quantile(yData, .25);
                boxPlotData.median = quantile(yData, .5);
                boxPlotData.q3 = quantile(yData, .75);

                const interQuantileRange = boxPlotData.q3 - boxPlotData.q1;

                const lowerIQR = boxPlotData.q1 - (1.5 * interQuantileRange);
                const upperIQR = boxPlotData.q3 + (1.5 * interQuantileRange);
                let whiskerLowerIndex = 0;
                let whiskerUpperIndex = yData.length - 1;
                while (yData[whiskerLowerIndex] < lowerIQR) {
                    whiskerLowerIndex += 1;
                }
                while (yData[whiskerUpperIndex] > upperIQR) {
                    whiskerUpperIndex -= 1;
                }
                boxPlotData.whiskerLower = yData[whiskerLowerIndex];
                boxPlotData.whiskerUpper = yData[whiskerUpperIndex];

                const boxPlotBoxStyle = {
                    ...LineChart.defaultProps.boxPlotStyle,
                    ...boxPlotStyle
                };

                const boxPlotEl = gEl.append('g');

                boxPlotEl
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', y(boxPlotData.q3))
                    .attr('width', innerWidth)
                    .attr('height', y(boxPlotData.q1) - y(boxPlotData.q3))
                    .attr('fill', boxPlotBoxStyle.fill)
                    .attr('fill-opacity', boxPlotBoxStyle.fillOpacity || 0.3);

                // Add whiskers
                const values = [boxPlotData.whiskerLower, boxPlotData.median, boxPlotData.whiskerUpper];
                values.forEach((lineY) => {
                    boxPlotEl
                        .append('line')
                        .attr('x1', 0)
                        .attr('y1', y(lineY))
                        .attr('x2', innerWidth)
                        .attr('y2', y(lineY))
                        .attr('stroke', boxPlotBoxStyle.stroke || 'black')
                        .attr('stroke-width', boxPlotBoxStyle.strokeWidth || 1)
                        .attr('stroke-dasharray', boxPlotBoxStyle.strokeDashArray || '0');
                });
            }

            // Add X axis
            const xAxis = axisBottom(x);
            if (xAxisProps.ticks) {
                xAxis.ticks(...xAxisProps.ticks);
            }
            gEl.append('g')
                .attr('transform', `translate(0,${innerHeight})`)
                .call(xAxis);

            if (xAxisProps.title) {
                xAxisLabel(
                    gEl,
                    xAxisProps.title,
                    innerWidth / 2,
                    innerHeight + (xAxisProps.titlePadding || 0),
                    xAxisProps.textColor,
                    xAxisProps.textOpacity
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
                    yAxisProps.title,
                    0,
                    -yAxisProps.titlePadding || 0,
                    yAxisProps.textColor,
                    yAxisProps.textOpacity
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
                    .y((d) => y(d[yAxisProps.key])))
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', click);

            // Add the points
            gEl
                .append('g')
                .selectAll()
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', (d) => x(d[xAxisProps.key]))
                .attr('cy', (d) => y(d[yAxisProps.key]))
                .attr('r', (d) => {
                    if (typeof dotRadius === 'function') {
                        return dotRadius(d, boxPlotData);
                    }
                    return dotRadius;
                })
                .attr('fill', (d) => {
                    if (typeof dotFill === 'function') {
                        return dotFill(d, boxPlotData);
                    }
                    return dotFill;
                });

            // Add tracer
            const tracerCircleStyle = {
                ...LineChart.defaultProps.traceStyle.circle,
                ...traceStyle.circle
            };
            const tracerLineStyle = {
                ...LineChart.defaultProps.traceStyle.line,
                ...traceStyle.line
            };

            let tracerEl;
            if (trace) {
                tracerEl = gEl
                    .append('g')
                    .style('opacity', 0);

                tracerEl
                    .append('circle')
                    .style('fill', tracerCircleStyle.fill)
                    .attr('stroke', tracerCircleStyle.stroke)
                    .attr('stroke-width', tracerCircleStyle.strokeWidth)
                    .attr('r', tracerCircleStyle.radius)
                    .style('opacity', tracerCircleStyle.opacity);

                tracerEl
                    .append('line')
                    .attr('stroke', tracerLineStyle.stroke)
                    .attr('stroke-width', tracerLineStyle.strokeWidth)
                    .attr('stroke-dasharray', tracerLineStyle.strokeDashArray)
                    .style('opacity', tracerLineStyle.opacity);
            }

            // Create a container that returns the closest data point to mouse event functions
            const bisect = bisector((d) => d[xAxisProps.key]).left;

            const dataContainer = gEl
                .append('rect')
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .attr('width', innerWidth)
                .attr('height', innerHeight);

            dataContainer
                .on('mouseover', () => {
                    if (tracerEl) {
                        tracerEl.style('opacity', 1);
                    }
                })
                .on('mousemove', () => {
                    const dataContainerEl = dataContainer.node();
                    const x0 = x.invert(mouse(dataContainerEl)[0]);
                    const selectedData = data[bisect(data, x0, 1)];
                    if (selectedData) {
                        const x2 = x(selectedData[xAxisProps.key]);
                        const y2 = y(selectedData[yAxisProps.key]);
                        if (tracerEl) {
                            tracerEl
                                .select('circle')
                                .attr('cx', x2)
                                .attr('cy', y(selectedData[yAxisProps.key]));

                            tracerEl
                                .select('line')
                                .attr('x1', x2)
                                .attr('y1', innerHeight)
                                .attr('x2', x2)
                                .attr('y2', y2);
                        }
                        mouseOver(selectedData, dataContainerEl, x2, y2);
                    } else {
                        mouseOut();
                    }
                })
                .on('mouseout', () => {
                    if (tracerEl) {
                        tracerEl.style('opacity', 0);
                    }
                    mouseOut();
                });
        }
    });

    return (
        <div className={className}>
            {download ?
                <Box className={downloadClass} display="flex" justifyContent="flex-end">
                    <Button
                        className={downloadClass}
                        startIcon={<DownloadIcon />}
                        onClick={() => {
                            downloadSvg(svgRef.current, downloadFilename);
                        }}
                    >
                        Download Chart
                    </Button>
                </Box> :
                null}
            <svg xmlns="http://www.w3.org/2000/svg" ref={svgRef} width={width} height={height} />
        </div>
    );
};

LineChart.defaultProps = {
    className: '',
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
    boxPlot: false,
    boxPlotStyle: {
        fill: '#dceef5',
        fillOpacity: 0.3,
        stroke: 'black',
        strokeWidth: 1,
        strokeDashArray: '0'
    },
    trace: false,
    traceStyle: {
        circle: {
            show: true,
            radius: 2,
            stroke: 'black',
            strokeWidth: 1,
            fill: 'none',
            opacity: 1
        },
        line: {
            show: true,
            stroke: 'black',
            strokeWidth: 1,
            strokeDashArray: '1 1',
            opacity: 1
        }
    },
    download: false,
    downloadClass: '',
    downloadFilename: 'linechart.svg',
    mouseOver: () => {
    },
    mouseOut: () => {
    },
    click: () => {
    }
};

export default LineChart;
