// @flow
import React from 'react';

import BaseTests from './BaseTests';
import TestBarChart from './components/d3/TestBarChart';
import TestBoxPlot from './components/d3/TestBoxPlot';
import TestLegend from './components/d3/TestLegend';
import TestLineChart from './components/d3/TestLineChart';
import TestMap from './components/ol/TestMap';
import TestCarousel from './components/TestCarousel';

const tests = [
    { path: 'ol/map', name: 'Map', component: TestMap },
    { path: 'd3/barchart', name: 'BarChart', component: TestBarChart },
    { path: 'd3/boxplot', name: 'BoxPlot', component: TestBoxPlot },
    { path: 'd3/linechart', name: 'LineChart', component: TestLineChart },
    { path: 'd3/legend', name: 'Legend', component: TestLegend },
    { path: 'carousel', name: 'Carousel', component: TestCarousel }
];

const Tests = () => (
    <BaseTests components={tests} />
);

export default Tests;
