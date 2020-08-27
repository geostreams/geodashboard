// @flow
import React from 'react';
import { select } from 'd3';

type Props = {
    width: number;
    itemHeight: number;
    itemGap: number;
    marginTop: number;
    marginBottom: number;
    marginRight: number;
    marginLeft: number;
    data: Array<{
        label: string;
        type: 'line' | 'polygon';
        color: string;
        opacity: string;
        width: string;
        size: number;
    }>;
}

const SimpleLegend = (props: Props) => {
    const {
        width,
        itemHeight,
        itemGap,
        marginTop,
        marginBottom,
        marginRight,
        marginLeft,
        data
    } = props;

    const height = ((itemHeight + itemGap) * data.length) - itemGap + marginBottom + marginTop;

    const svgRef = React.useRef(null);

    React.useEffect(() => {
        if (svgRef.current) {
            const svgEl = select(svgRef.current);
            svgEl.selectAll('*').remove();

            const gEl = svgEl
                .append('g')
                .attr('transform', `translate(${marginLeft},${marginTop})`);

            data.forEach(({ label, type, color, width: strokeWidth, opacity, size }, idx) => {
                const baseY = ((idx * (itemHeight + itemGap)) + itemGap);

                if (type === 'line') {
                    gEl
                        .append('line')
                        .attr('x1', 0)
                        .attr('y1', baseY - (itemHeight / 2))
                        .attr('x2', 20)
                        .attr('y2', baseY - (itemHeight / 2))
                        .attr('stroke', color)
                        .attr('stroke-width', strokeWidth || 2)
                        .attr('stroke-opacity', opacity || 1);
                } else if (type === 'polygon') {
                    gEl
                        .append('rect')
                        .attr('x', 0)
                        .attr('y', baseY - itemHeight)
                        .attr('width', 20)
                        .attr('height', itemHeight)
                        .attr('fill', color)
                        .attr('fill-opacity', opacity);
                }

                gEl
                    .append('text')
                    .text(label)
                    .attr('x', 25)
                    .attr('y', baseY)
                    .attr('font-size', size || 16);
            });
        }
    });

    return <svg ref={svgRef} width={width + marginLeft + marginRight} height={height} />;
};

SimpleLegend.defaultProps = {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 0,
    itemGap: 15
};

export default SimpleLegend;
