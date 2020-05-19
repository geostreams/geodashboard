// @flow
import React from 'react';
import { select } from 'd3';

import type { SVGGElement } from 'dom-helpers';

type Props = {
    boxCount: number;
    getBoxInfo: (idx: number) => ({ color: string; image: string; label: string; });
    activeBox: number;
    activeBoxLabel: string;
    boxWidth: number;
    boxHeight: number;
    gap: number;
    labelHeight: number;
    activeBoxLabelHeight: number;
}

const LegendHorizontalDiscrete = (props: Props) => {
    const gRef: { current: null | SVGGElement } = React.createRef();

    const {
        boxCount,
        getBoxInfo,
        activeBox,
        activeBoxLabel,
        boxWidth,
        boxHeight,
        gap,
        labelHeight,
        activeBoxLabelHeight
    } = props;

    const width = (boxWidth * boxCount) + (gap * (boxCount - 1));
    const height = boxHeight + labelHeight + activeBoxLabelHeight + 30;

    React.useEffect(() => {
        const g = select(gRef.current);
        g.selectAll('*').remove();

        for (let i = 0; i < boxCount; i += 1) {
            const x = (i * boxWidth) + (gap * i);
            const { color, image, label } = getBoxInfo(i);
            const gBox = g
                .append('g')
                .attr('transform', `translate(${x} ${activeBoxLabelHeight})`);

            if (activeBoxLabel && i === activeBox) {
                gBox
                    .append('text')
                    .attr('dx', boxWidth / 2)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', 20)
                    .text(activeBoxLabel);
            }

            if (color) {
                gBox
                    .append('rect')
                    .attr('width', boxWidth)
                    .attr('height', boxHeight)
                    .attr('y', activeBoxLabelHeight)
                    .attr('fill', color);
            } else if (image) {
                gBox
                    .append('image')
                    .attr('href', image)
                    .attr('width', boxWidth)
                    .attr('height', boxHeight)
                    .attr('y', activeBoxLabelHeight);
            }

            gBox
                .append('text')
                .attr('dx', boxWidth / 2)
                .attr('y', activeBoxLabelHeight + boxHeight + 15)
                .attr('text-anchor', 'middle')
                .attr('font-size', 11)
                .text(label);
        }
    });

    return (
        <svg width={width} height={height}>
            <g ref={gRef} />
        </svg>
    );
};

LegendHorizontalDiscrete.defaultProps = {
    boxWidth: 60,
    boxHeight: 25,
    gap: 10,
    labelHeight: 20,
    activeBox: null,
    activeBoxLabel: null,
    activeBoxLabelHeight: 0
};

export default LegendHorizontalDiscrete;
