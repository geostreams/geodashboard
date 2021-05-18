"use strict";

import {
  default as React,
  Component
} from 'react';

import CommonProps from '../commonProps';
import {scale} from '../utils/scale';

export default class ChartSvg extends Component {
  constructor(props) {
    super (props);
  }

  static defaultProps = {
    svgClassName: 'react-d3-core__container_svg',
    onZoom: () => {},
    scaleExtent: [1, 10],
    ...CommonProps
  }

  render() {
    const {
      height,
      width,
      margins,
      svgClassName,
      id,
      children
    } = this.props;

    var t = `translate(${margins.left}, ${margins.top})`;

    return (
      <svg
        height = {height}
        width = {width}
        className = {svgClassName}
        id = {id}
        ref = "svgContainer"
      >
        <g
          transform = {t}
        >
          {children}
        </g>
      </svg>
    )
  }
}
