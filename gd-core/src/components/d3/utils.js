// @flow
import type { SVGGElement } from 'dom-helpers';

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


export const downloadSvg = (svgEl: SVGGElement, name: string | Function) => {
    const svgData = svgEl.outerHTML;
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = typeof name === 'function' ? name() : name;
    const { body } = document;
    if (body) {
        body.appendChild(downloadLink);
        downloadLink.click();
        body.removeChild(downloadLink);
    }
};
