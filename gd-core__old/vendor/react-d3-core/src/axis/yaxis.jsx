"use strict"

import {
  default as React,
  Component
} from 'react';

import Axis from './axis';
import Label from './label';
import CommonProps from '../commonProps';

export default class Yaxis extends Component {
  constructor (props) {
    super(props);
  }

  static defaultProps = {
    showYAxis: true,
    yAxisClassName: 'react-d3-core__axis__yAxis',
    yScale: 'linear',
    yOrient: 'left',
    yTickOrient: 'left',
    yLabelPosition: 'left',
    yTickPadding: 3,
    yInnerTickSize: 6,
    yOuterTickSize: 6,
    ...CommonProps
  }

  render() {
    var {
      width,
      height,
      margins,
      y,
      yAxisClassName,
      yDomain,
      yRange,
      yBandPaddingInner,
      yBandPaddingOuter,
      yScale,
      yOrient,
      yTickOrient,
      yTickFormat,
      yTickPadding,
      yTickSizeOuter,
      yTickSizeInner,
      yTicks,
      yLabel,
      yLabelPosition,
      labelOffset,
      showYAxis,
      style,
      yAxisStyling,
      yTickValues
    } = this.props;

    var t;
    var axisLabel;

    if(!yRange) {
      yRange = [height - margins.top - margins.bottom, 0];
    }

    if (yOrient === 'right') {
      // y - right
      t = `translate(${width - margins.right - margins.left}, 0)`;
    } else if (yOrient === 'left'){
      // y - left
      t = `translate(0, 0)`;
    }

    if(yLabel) {
      axisLabel = <Label
        height= {height}
        width= {width}
        margins= {margins}
        labelTitle= {yLabel}
        labelPosition= {yLabelPosition}
        labelOffset= {labelOffset}
        bandPaddingInner= {yBandPaddingInner}
        bandPaddingOuter= {yBandPaddingOuter}
      />
    }


    return (
      <g transform= {t}>
        <Axis
          height= {height}
          width= {width}
          margins= {margins}
          showAxis= {showYAxis}
          axisClassName= {yAxisClassName}
          bandPaddingInner= {yBandPaddingInner}
          bandPaddingOuter= {yBandPaddingOuter}
          type = "y"
          proxy = {y}
          domain = {yDomain}
          range = {yRange}
          scale = {yScale}
          orient = {yOrient}
          tickOrient = {yTickOrient}
          tickFormat = {yTickFormat}
          tickPadding = {yTickPadding}
          tickSizeInner = {yTickSizeInner}
          tickSizeOuter = {yTickSizeOuter}
          ticks = {yTicks}
          style = {style}
          axisStyling = {yAxisStyling}
          tickValues = {yTickValues}
          />
        {axisLabel}
      </g>
    )
  }
}
