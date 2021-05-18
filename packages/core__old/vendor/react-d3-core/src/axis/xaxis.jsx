"use strict"

import {
  default as React,
  Component
} from 'react';

import Axis from './axis';
import Label from './label';
import CommonProps from '../commonProps';

export default class Xaxis extends Component {
  constructor (props) {
    super(props);
  }

  static defaultProps = {
    showXAxis: true,
    xAxisClassName: 'react-d3-core__axis__xAxis',
    xScale: 'linear',
    xOrient: 'bottom',
    xTickOrient: 'bottom',
    xLabelPosition: 'bottom',
    xTickPadding: 3,
    xInnerTickSize: 6,
    xOuterTickSize: 6,
    ...CommonProps
  }

  render() {
    var {
      height,
      width,
      margins,
      showXAxis,
      x,
      xAxisClassName,
      xDomain,
      xRange,
      xBandPaddingInner,
      xBandPaddingOuter,
      xScale,
      xOrient,
      xTickOrient,
      xTickPadding,
      xTickSizeOuter,
      xTickSizeInner,
      xTickFormat,
      xTicks,
      xLabel,
      xLabelPosition,
      labelOffset,
      style,
      xAxisStyling,
      xTickValues
    } = this.props;

    var t;
    var axisLabel;

    if(!xRange) {
      xRange = [0, width - margins.left - margins.right];
    }

    if (xOrient === 'bottom') {
      // x - bottom
      t = `translate(0, ${height - margins.bottom - margins.top})`;
    } else if (xOrient === 'top'){
      // x - top
      t = `translate(0, 0)`;
    }

    if(xLabel) {
      axisLabel = <Label
        height= {height}
        width= {width}
        margins= {margins}
        labelTitle= {xLabel}
        labelPosition= {xLabelPosition}
        labelOffset= {labelOffset}
        bandPaddingInner= {xBandPaddingInner}
        bandPaddingOuter= {xBandPaddingOuter}
        />
    }

    return (
      <g transform= {t}>
        <Axis
          height= {height}
          width= {width}
          margins= {margins}
          showAxis= {showXAxis}
          axisClassName= {xAxisClassName}
          bandPaddingInner= {xBandPaddingInner}
          bandPaddingOuter= {xBandPaddingOuter}
          type = "x"
          proxy = {x}
          domain = {xDomain}
          range = {xRange}
          scale = {xScale}
          orient = {xOrient}
          tickOrient = {xTickOrient}
          tickFormat = {xTickFormat}
          tickPadding = {xTickPadding}
          tickSizeInner = {xTickSizeInner}
          tickSizeOuter = {xTickSizeOuter}
          style = {style}
          ticks = {xTicks}
          axisStyling = {xAxisStyling}
          tickValues = {xTickValues}
          />
        {axisLabel}
      </g>
    )
  }
}
