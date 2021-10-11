# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 3.9.0 - 2021-10-07

## Added
- Added Vega visualizations
- Automatically publish to NPM on release

## Changed
- Fixed location of sensor popup on the map
  [Github-59](https://github.com/geostreams/geodashboard/issues/59)

## 3.8.0 - 2021-07-13
## Added
- New configuration options added for visualizations (forceVega, defaultStartAtZero, defaultSameTimeScale)
- Vega Visualizations added (Multi-Line Chart, Line Chart, Box-Whisker Plot, Stacked Box-Whisker Plot)

### Changed
- Created Search page with filters to replace old search/download page
- Updated Geostreaming Map
- Finished refactoring of the explore view
  [Github-38](https://github.com/geostreams/geodashboard/issues/38)

## 3.6.0 - 2020-12-14

### Changed
- Moved `callAPI` from `gd-geostreaming` to `gd-core` and added error callback
  [GLGVO-709](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-709)
- Updated charts' axis titles' padding
  [GLGVO-711](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-711)

## [3.5.0] - 2020-10-01

### Added
- Sensor detail view
  [GEOD-1341](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1341)

### Changed
- Use encoded variable for sensor names in the url
  [GEOD-1347](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1347)
