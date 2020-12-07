// @flow
import type { SVGGElement } from 'dom-helpers';

export const xAxisLabel = (
    parentEl: SVGGElement,
    label: string,
    x: number,
    y: number,
    color: ?string,
    opacity: ?number,
    size: ?(number | string)
) => {
    parentEl.select('.xTitle').remove();
    return parentEl
        .append('text')
        .attr('class', 'xTitle')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('fill', color || 'currentColor')
        .attr('fill-opacity', opacity || 0.3)
        .attr('font-size', size || '1.1rem')
        .text(label);
};

export const yAxisLabel = (
    parentEl: SVGGElement,
    label: string,
    x: number,
    y: number,
    color: ?string,
    opacity: ?number,
    size: ?(number | string)
) => {
    parentEl.select('.yTitle').remove();
    return parentEl
        .append('text')
        .attr('class', 'yTitle')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'end')
        .attr('fill', color || 'currentColor')
        .attr('fill-opacity', opacity || 0.3)
        .attr('font-size', size || '1.1rem')
        .text(label);
};


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
