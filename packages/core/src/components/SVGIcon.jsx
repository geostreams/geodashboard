// @flow
import React from 'react';
import Icon from '@material-ui/core/SvgIcon';

type Props = {
    children: Icon;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    svgProps: {};
    gProps: {};
}

const SVGIcon = ({
    children,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    opacity,
    svgProps,
    gProps
}: Props) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
        {...(svgProps: any)}
    >
        <g {...gProps}>{children}</g>
    </svg>
);

SVGIcon.defaultProps = {
    width: 20,
    height: 30,
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 1,
    opacity: 1,
    svgProps: {},
    gProps: {}
};

export default SVGIcon;
