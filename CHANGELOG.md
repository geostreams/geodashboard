# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).


## ## [3.0.0-alpha.3] - 2018-06-29
**Important - Need to have database with parameters setup before release in all projects**

### Added
- Ability to classify parameters in different tabs on the detail page
  [GEOD-895](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-895).
- Time filtering functionality to trend regions detail page
  [GEOD-1028](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1028)
- Added Detail Page multi-series line chart
  [GEOD-1070](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1070)
- Added the ability to turn Layer Groups on and off
  [GEOD-1076](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1076)
- Added the ability to display Raw vs Processed data in the Detail Page Graphs
  [GEOD-1063](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1063)
- Added Box and Whisker Plots to the separate graphs Detail Pages
  [GEOD-1093](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1093)
- Added the ability to enable and disable Clustering on the Explore and Search Maps
  [GEOD-1091](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1091)
- Added filtering by time and season for detail page
  [GEOD-873](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-873)

### Changed
- Organize the data sources and classify the pills by region on the left navigation of the explore page.
  [GEOD-1086](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1086)
- Mobile Detail Page Improvements
  [IMLCZO-230](https://opensource.ncsa.illinois.edu/jira/browse/IMLCZO-230)
- Separate Actions for Exploratory Analysis and Trends
  [GLGVO-416](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-416)
- Save trends region into DB and use new API to get trends region
  [GEOD-1087](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1087)
- Using d3 implementation of LineChart instead of react-d3.LineChart
  [GEOD-1103](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1103)
- Removed parameters from configuration file. Using only the database
  [GEOD-1102](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1102)
- Changed sliders on change function to on after change.

### Fixed
- When clicking on a pill in explore left navigation, open the popup on the map
  [GEOD-1088](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1088)
- Using prop-types package instead of React.PropTypes. Updated routes to be constant
  [GEOD-1095](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1095)
- Error handling for trends when there are no results available.
  [GEOD-1096](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1096)

## [3.0.0-alpha.2] - 2018-04-12

### Added
- Add Explore Layers option on the Explore Page as a Drawer
  [GLGVO-376](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-376)
- Filtering available dates that show up on the search page based on previous filters.
  [GEOD-1024](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1024)
- Added Mobile view options
  [IMLCZO-206](https://opensource.ncsa.illinois.edu/jira/browse/IMLCZO-206)
- Added JavaScript not enabled message
  [GEOD-1048](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1048)
- Added alert popup for IE versions greater than 8
  [GEOD-1048](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1048)
- Added Map interface in Mobile version
  [GEOD-1042](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1042)
- Added Optional Explore Layers Legend
  [GLGVO-422](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-422)
- Visually Group Associated Layers on the Explore Page
  [GLGVO-426](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-426)

### Changed
- Change Maps to use config file for Custom Settings
  [GEOD-1041](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1041)
- Refactored Exploratory Analysis code
  [GLGVO-410](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-410)
  [GLGVO-412](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-412)
- Update react-mdc-web version from '0.12.2' to '0.17.0'
  [GEOD-1073](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1073)

### Fixed
- Search page showing the same parameter multiple times
  [GEOD-1027](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1027)
- Search page permalink showing on the left side instead of centered
  [GEOD-1034](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1034)
- Updating production config according to GEOD-1004 and grid layout from GEOD-1023
  [GEOD-1043](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1043)
- Some css styles for scroll bar visibility in IE and Edge
  [GEOD-1049](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1049)
- Trends detail popups appear behind the graph lines
  [GEOD-1065](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1065)
- Changed Map display from 'EPSG:4326' to 'EPSG:3857'
  [GEOD-1071](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1071)

## [3.0.0-alpha.1] - 2017-11-22

### Added
- Use [Yarn](https://yarnpkg.com) for package management.
- Adopt `containers`/`components` distinction according to redux documentation.
  [GEOD-789](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-789)
- Adjusted List formatting
  [GEOD-851](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-851)
- Updated the formatting of Search Page Popups.
  [GEOD-859](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-859)
- Use [Flow](https://flowtype.org) for tracking the types of variables as they flow through your program.
  [GEOD-802](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-802)
- Use outside code base configuration
  [GEOD-813](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-813)
  [GEOD-849](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-849)
  [GEOD-867](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-867)
- Add Explore page
  [GEOD-869](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-869)
  [GEOD-870](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-870)
- Add Detail page
  [GEOD-874](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-874)
  [GEOD-875](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-875)
  [GEOD-876](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-876)
  [GEOD-877](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-877)
- Filter parameter using the configuration file
  [GEOD-881](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-881)
  [GEOD-882](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-882)
- Add Content for the Exploratory Analysis Page
  [GLGVO-274](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-274)
- Changing from Material-UI to [React Material Web Components](https://github.com/kradio3/react-mdc-web)
  [GEOD-852](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-852)
  [GEOD-950](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-950)
- Add geolocation/polygons for each lake in the configuration
  Use them for creating the download links.
  Draw a polygon on the map to show the location you select.
  Fix popup on Explore page
  [GEOD-910](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-910)
  [GEOD-909](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-909)
- Add a new Trends Page and Region Pages
  [GEOD-944](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-944)
  [GEOD-945](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-945)
  [GEOD-954](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-954)
  [GEOD-956](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-956)
- Add Sensor Selection with Shapes on the Search and Exploratory Analysis Pages
  [GEOD-853](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-853)
  [GLGVO-322](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-322)
- Extending bottom Download bar on search page and show stats on it
  [GEOD-850](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-850)
- When Drawing, zoom to shape and not the points
  [GEOD-934](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-934)
- Refactor the Exploratory Analysis Page
  [GLGVO-339](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-339)
  [GLGVO-345](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-345)
  [GLGVO-346](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-346)
  [GLGVO-347](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-347)
  [GLGVO-348](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-348)
  [GLGVO-349](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-349)
  [GLGVO-356](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-356)
- Add an 'x' to the collapsed filters
  [GEOD-912](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-912)
- Added an edit button on collapsed cards
  [GEOD-911](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-911)
- Copy config.js into build directory.
  [GEOD-970](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-970)
- Add ability to have V2 application links
  [GEOD-904](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-904)
  [GLGVO-342](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-342)
  [IMLCZO-180](https://opensource.ncsa.illinois.edu/jira/browse/IMLCZO-180)
- Refactor code associated with Trends
  [GEOD-963](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-963)
- Show error message if API fetch fails
  [GEOD-838](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-838)
- Refactor code associated with Trends
  [GEOD-963](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-963)
- Make the subtitle in cards for optional on the Trends and Analysis Pages
  [GEOD-961](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-961)
- Removed all instances of 'UPDATE_TRENDS_REGIONS_POINTS' and associated code
  [GEOD-975](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-975)
- Add the ability for Detail Links in V3 to go to V2
  [GEOD-959](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-959)
- Removed all instances of 'UPDATE_TRENDS_REGIONS_POINTS' and associated code
  [GEOD-975](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-975)
- Finalize Trends Detail Page using D3
  [GEOD-992](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-992)
- Add NOAA Configuration name
  [GLM-103](https://opensource.ncsa.illinois.edu/jira/browse/GLM-103)
- Add V2-Look Menu to V3 Code
  [GEOD-994](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-994)

### Fixed
- Bug in filtering for custom locations
  [GEOD-925](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-925)
- Bug in selected search not being updated when a filter was removed
  [GEOD-953](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-953)
- Fixed bug with Draw location filter not cleared up
  [GEOD-968](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-968)
- Fixed bug with drawing shapes not erasing when location card does not exist
  [GEOD-981](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-981)
- Removed the card max-height on the V3 Search Page
  [GEOD-982](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-982)
- SVG icons not rendering in IE 11. Links not clickable on IE 11
  [GEOD-1004](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1004)
- Radio buttons border not showing up in IE 11
  [GEOD-1006](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1006)
- Correct instances of PropTypes where utilized
  [GEOD-998](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-998)
- Clearing the state for detail graphs.
  [GEOD-1022](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1022)
- Correct Trends Menu Bar colors to update appropriately
  [GEOD-1025](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1025)

### Changed
- Changed how the Circle is created, and how the associated coordinates are assembled
  [GEOD-965](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-965)
- Fixed bug with drawing shapes not erasing when location card does not exist
  [GEOD-981](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-981)
- Bug in selected search not being updated when a filter was removed
  [GEOD-953](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-953)
- Use the API for Trends by Region and Detail
  [GEOD-977](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-977)
- Layout of Download buttons
  [GEOD-1013](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1013)
- UI Trends Improvements
  [GEOD-1010](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1010)
- Configuration file, parameters and lakes ordering
  [GEOD-1018](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1018)
- Changed Layout of the Grids.
  [GEOD-1023](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1023)
- Added LEC parameters
  [GLM-105](https://opensource.ncsa.illinois.edu/jira/browse/GLM-105)
