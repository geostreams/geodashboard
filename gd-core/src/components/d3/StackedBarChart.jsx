// @flow
import React from 'react';
import {
    axisBottom,
    axisLeft,
    max,
    mouse,
    select,
    stack
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
        key: string;
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
        keys: string[];
        title: string;
        titlePadding: number;
        ticks: Array<string | Function>;
        stroke: string;
        strokeWidth: number;
        textColor: string;
        textOpacity: number
    };
    barStroke: string | string[] | Function;
    barStrokeWidth: number | number[] | Function;
    barStrokeOpacity: number | number[] | Function;
    barFill: string | string[] | Function;
    barFillOpacity: number | number[] | Function;
    download: boolean;
    downloadClass: string;
    downloadFilename: ?string | ?Function;
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: { [k: string]: number };
}

const StackedBarChart = (props: Props) => {
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
        barStroke,
        barStrokeWidth,
        barStrokeOpacity,
        barFill,
        barFillOpacity,
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

    const getStyleAttr = (
        attr: string[] | Function,
        values,
        idx: number
    ) => {
        if (typeof attr === 'function') {
            return attr(values);
        }
        if (Array.isArray(attr)) {
            return attr[idx];
        }
        return attr;
    };

    React.useEffect(() => {
        if (svgRef.current) {
            const svgEl = select(svgRef.current);
            svgEl.selectAll('*').remove();
            const gEl = svgEl
                .append('g')
                .attr('width', innerWidth)
                .attr('height', innerHeight)
                .attr('transform', `translate(${marginLeft},${marginTop})`);

            const dataset = stack().keys(yAxisProps.keys)(data);

            const x = xAxisProps.scale.range([0, innerWidth]).paddingInner(.1).paddingOuter(.8);
            const y = yAxisProps.scale
                .domain([0, max(dataset, d => max(d, ([, v]) => v))])
                .range([innerHeight, 0]);

            const rects = gEl
                .selectAll('.bar')
                .data(dataset)
                .enter()
                .append('g')
                .attr('class', 'bar')
                .attr('fill', (d, idx) => getStyleAttr(barFill, d, idx))
                .attr('fill-opacity', (d, idx) => getStyleAttr(barFillOpacity, d, idx))
                .attr('stroke', (d, idx) => getStyleAttr(barStroke, d, idx))
                .attr('stroke-width', (d, idx) => getStyleAttr(barStrokeWidth, d, idx))
                .attr('stroke-opacity', (d, idx) => getStyleAttr(barStrokeOpacity, d, idx));

            rects
                .selectAll('rect')
                .data(d => d)
                .join('rect')
                .attr('x', (d) => x(d.data[xAxisProps.key]))
                .attr('y', d => y(d[1]))
                .attr('height', d => y(d[0]) - y(d[1]))
                .attr('width', x.bandwidth())
                .on('mouseover', (values, idx, rectEls) => {
                    if (mouseOver) {
                        const targetEl = rects.node();
                        mouseOver(values, idx, rectEls, targetEl, mouse(targetEl));
                    }
                })
                .on('mouseout', mouseOut)
                .on('click', click);

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

StackedBarChart.defaultProps = {
    className: '',
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    barStroke: 'gray',
    barStrokeWidth: 1,
    barStrokeOpacity: 1,
    barFill: 'none',
    barFillOpacity: 1,
    download: false,
    downloadClass: '',
    downloadFilename: 'stackedbarchart.svg',
    mouseOver: () => {
    },
    mouseOut: () => {
    },
    click: () => {
    }
};

export default StackedBarChart;
