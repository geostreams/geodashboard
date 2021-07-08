# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 3.8.0 - 2021-07-13

### Added
- Added Vega Charts for BoxWhisker, LineGraph, MultiLineGraph, StackedBoxWhisker
- Add htmlToPdf utility function
  [GEOD-1366](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1366)
  [GH-42](https://github.com/geostreams/geodashboard/issues/42)

### Changed
- Created a DrawControl for drawing custom shapes on the map
- Turned Map into a function component and added two new map controls: FitViewControl and LayersControl.
  [Github-38](https://github.com/geostreams/geodashboard/issues/38)

## 3.6.0 - 2020-12-14

### Added
- New sidebar component to be used in Explore page.
  [GEOD-1357](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1357)

### Changed
- Moved `callAPI` from `gd-geostreaming` to `gd-core` and added error callback
  [GLGVO-709](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-709)
- Refactored `useElementRect` and fixed charts' axis titles' padding
  [GLGVO-711](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-711)

## [3.4.0] - 2020-08-27
### Added
- Stacked Bar Chart
  [GEOD-1341](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1341)

### Changed
- Improved Box Plot component
  [GEOD-1341](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1341)

## [3.3.0] - 2020-06-18

### Added
- `extent` parameters can be passed to ol/Map to set bounds for the map view.
  [GEOD-1320](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1320)
- Added support for line and confidence interval charts to BarChart
  [GLGVO-638](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-638)

### Changed
- Added `LegendHorizontalDiscrete` component and renamed `Legend` to `LegendHorizontalDiscrete`.
  [GLGVO-623](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-623)
 - Removed the tooltip from bar chart, so it can be set and customized in the parent component
   [GLGVO-657](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-657)

