// @flow
import type { SVGGElement } from 'dom-helpers';

export const sharedStyle = {
    tooltip: {
        position: 'fixed',
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    }
};

export const xAxisLabel = (
    parentEl: SVGGElement,
    x: number,
    y: number,
    color: ?string,
    opacity: ?number,
    label: string
) => (
    parentEl.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('fill', color || 'currentColor')
        .attr('fill-opacity', opacity || 0.3)
        .text(label)
);

export const yAxisLabel = (
    parentEl: SVGGElement,
    x: number,
    y: number,
    color: ?string,
    opacity: ?number,
    label: string
) => (
    parentEl.append('text')
        .attr('x', 0)
        .attr('y', -10)
        .attr('text-anchor', 'end')
        .attr('fill', color || 'currentColor')
        .attr('fill-opacity', opacity || 0.3)
        .text(label)
);
