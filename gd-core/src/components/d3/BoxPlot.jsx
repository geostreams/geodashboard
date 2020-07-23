// @flow
import React from 'react';
import { quantile, select } from 'd3';

import { precision } from '../../utils/format';

type Props = {
    className: string;
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
    outliers: boolean;
    outliersStyle: {
        radius: number;
        fill: string | Function;
        fillOpacity: number | Function;
    };
    labels: {
        median: number;
        whiskerLower: number;
        whiskerUpper: number;
        q1: number;
        q3: number;
    };
    mouseOver: Function;
    mouseOut: Function;
    click: Function;
    data: Array<number>;    // data must be sorted
}

const BoxPlot = (props: Props) => {
    const {
        className,
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
        outliers,
        labels,
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

            const q1 = quantile(data, .25);
            const median = quantile(data, .5);
            const q3 = quantile(data, .75);

            const interQuantileRange = q3 - q1;

            const lowerIQR = q1 - (1.5 * interQuantileRange);
            const upperIQR = q3 + (1.5 * interQuantileRange);
            let whiskerLowerIndex = 0;
            let whiskerUpperIndex = data.length - 1;
            while (data[whiskerLowerIndex] < lowerIQR) {
                whiskerLowerIndex += 1;
            };
            while (data[whiskerUpperIndex] > upperIQR) {
                whiskerUpperIndex -= 1;
            };
            const whiskerLower = data[whiskerLowerIndex];
            const whiskerUpper = data[whiskerUpperIndex];

            const y = axisProps.scale.range([innerHeight, 0]);

            const center = innerWidth / 2;

            // Show the main vertical line
            gEl
                .append('line')
                .attr('x1', center)
                .attr('y1', y(whiskerLower))
                .attr('x2', center)
                .attr('y2', y(whiskerUpper))
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

            // Add whiskers
            gEl
                .selectAll()
                .data([whiskerLower, whiskerUpper])
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

            if (outliers) {
                const outliersStyle = {
                    ...BoxPlot.defaultProps.outliersStyle,
                    ...props.outliersStyle
                };
                gEl
                    .selectAll()
                    .data(data)
                    .enter()
                    .filter(d => d < whiskerLower || d > whiskerUpper)
                    .append('circle')
                    .attr('cx', center)
                    .attr('cy', d => y(d))
                    .attr('r', outliersStyle.radius)
                    .attr('fill', outliersStyle.fill)
                    .attr('fill-opacity', outliersStyle.fillOpacity);
            }

            // Add value labels
            if (labels.whiskerUpper) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(precision(whiskerUpper, 1)))
                    .attr('font-size', labels.whiskerUpper)
                    .text(precision(whiskerUpper, 1));
            }
            if (labels.whiskerLower) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(precision(whiskerLower, 1)))
                    .attr('font-size', labels.whiskerLower)
                    .text(precision(whiskerLower, 1));
            }
            if (labels.median) {
                gEl
                    .append('text')
                    .attr('x', center + (innerWidth / 2) + 5)
                    .attr('y', y(median) - 5)
                    .attr('dy', '1em')
                    .attr('font-size', labels.median)
                    .text(precision(median, 1));
            }

            [
                [labels.q1, precision(q1, 1)],
                [labels.q3, precision(q3, 1)]
            ].forEach(([quantileLabelSize, quantileValue]) => {
                if (quantileLabelSize) {
                    gEl
                        .append('text')
                        .attr('x', center - (innerWidth / 2) - 5)
                        .attr('y', y(quantileValue))
                        .attr('text-anchor', 'end')
                        .attr('font-size', quantileLabelSize)
                        .text(quantileValue);
                }
            });

            // Attach events
            gEl
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', click);
        }
    });

    return (
        <div className={className}>
            <svg ref={svgRef} width={width} height={height}>
                <g transform={`translate(${ marginLeft },${ marginTop })`} />
            </svg>
        </div>
    );
};

BoxPlot.defaultProps = {
    className: '',
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    box: {},
    mainLine: {},
    medianLine: {},
    sideLine: {},
    outliers: true,
    outliersStyle: {
        radius: 2,
        fill: 'red',
        fillOpacity: 1
    },
    labels: {},
    mouseOver: () => {},
    mouseOut: () => {},
    click: () => {}
};

export default BoxPlot;
