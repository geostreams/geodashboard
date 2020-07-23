# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.3.0] - 2020-06-18

### Changed
- Create Intervals as a Reusable Component
  [GEOD-1248](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1248)

### Fixed
- Click the 'x' in the top right corner of the Detail Page, the page returns to the Explore Page
  [GEOD-1274](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1274)

## [3.1.0] - 2019-09-19

### Added
- Provide Dropdown Examples for the new MenuBar Setup
  [GEOD-1236](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1236)
- Added New Search Page Filters
  [GEOD-1234](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1234)
- Count the Datapoints before allowing downloads to ensure there are not too many
  [GEOD-915](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-915)
- Highlight Regions associated with a chosen Sensor on the Explore Page
  [GEOD-1069](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1069)
- Add Detail Page Buttons to allow for Saving Graphs
  [GEOD-947](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-947)
- Added New Search Page Location Filters
  [GLGVO-545](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-545)
- Added Bar chart for dashboard
  [GLGVO-545](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-545)
- Added Content for the Home Page
  [GLGVO-1244](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-1244)
- Added average of sites to dashboard data
  [GEOD-1251](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1251)
- Added Illinois drainage polygons and data
  [GLGVO-554](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-554)
- Added Info Buttons to Boundary and Nutrient Tabs
  [GLGVO-547](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-547)
- Added layer control to the map
  [GLGVO-561](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-561)
- Added animation to bar chart
  [GEOD-1264](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1264)

### Changed
- Add pills surrounding on the collapsed Parameters and Sources
  [GEOD-917](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-917)
- Update the Carousel to include optional Captions and Links
  [GEOD-1247](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1247)
- Update how features are presented on the Search Page Map
  [GEOD-883](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-883)
- Updated checks on the Map when loading on screen
  [GEOD-1242](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1242)
- Optimize webpack config (common config. code splitting, css extraction)
  [GLGVO-558](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-558)
- Styling updates for the Dashboard Homepage
  [GEOD-1245](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1245)
- Update the Map Cursor style for areas that can be clicked only
  [GEOD-1250](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1250)
- Optimize how GeoJSON files are loaded
  [GLGVO-559](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-559)
- Various Changes to Landing Page Layout
  [GLGVO-562](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-562)
- Change Background Map to Terrain on Landing Page Dashboard
  [GEOD-1253](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1253)
### Fixed
- Ensure Markers Always Appear on the Explore and Search Pages
  [GEOD-1238](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1238)
- Correct Console Error with OpenLayers View Fit on Component Update
  [GEOD-1239](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1239)
- Make sure that sensor.properties.type is not null before trying to access it.
- Correct Situation in which Detail Page Sometimes Displays Two Mini Maps
  [GEOD-1241](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1241)
- Corrected popups appearance when clusters are present
  [GEOD-933](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-933)
- Update geodashboard appearance settings
  [GLGVO-1246](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-1246)
- Fixed the Dashboard slider to always visible
  [GEOD-1258](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1258)
- Corrected Issue on Dashboard with Year Selection After Merging
  [GEOD-1259](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1259)
- Ensure the map centers on the polygons we are displaying at the landing page. Added boostrap nav baar.
  [GEOD-1237](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1237)
- Corrected Flow Errors
  [GEOD-1268](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1268)

## [3.0.0] - 2019-06-24

### Added
- Added static banners
  [GEOD-1203](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1203)
- Added the option for searches to populate when clicking a button for the Analysis Page
  [GLGVO-535](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-535)

### Changed
- Zoom to the features when drawing map for the first time
  [GEOD-1223](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1223)
- Use parameter notation for detail page URL parameters
  [GEOD-1222](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1222)

### Fixed
- Ensure the map pans correctly when switching Sensors on the Explore Page
  [GEOD-1224](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1224)

## [3.0.0-beta.5] - 2019-05-16

### Added
- Added the option for Layers on the Analysis Page Map
  [GEOD-1225](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1225)

### Changed
- Line plot fills the parent container.
  [GEOD-1230](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1230)
- The Search Page Filter Icons reflect the dropdown selection
  [GEOD-1224](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1224)
- Display the Detail Page binning type above the Date Slider
  [GEOD-1228](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1228)
- Map Popups always display Detail Page link, and the Detail Page will always load
  [GEOD-1229](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1229)

## [3.0.0-beta.4] - 2019-05-06

### Added
- Added Icons to help visually distinguish the various sections of the Search Page
  [GEOD-913](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-913)

### Changed
- Adjust the graphs so dots do not collide with the top and bottom edges
  [GEOD-1135](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1135)
- D3 Graph Improvements for Color Blindness
  [GEOD-1130](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1130)
- Props in the Map Files is now Defined on import instead of using the full path throughout
  [GEOD-1031](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1031)
- Added Parameters and Dates to the URL for the Detail Page
  [GEOD-1173](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1173)
- Updated Flow throughout
  [GEOD-1060](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1060)
- Use Common Functions for Draw Interactions on the Map
  [GEOD-926](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-926)

### Fixed
- Log error whe sensor is properly defined and we open map popup.
  [GEOD-1215](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1215)
- Correct Missing popups on Trends Detail Graph Page Load, and correct Italics throughout
  [GEOD-1221](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1221)
- When a User closes a Popup, the Map no longer zooms all the way back out
  [GLGVO-526](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-526)
- When a User clicks a Cluster, either expand the Cluster or zoom in and reset the Clusters
  [GLGVO-525](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-525)
- Sensor Popups are removed if the Map is Panned by the User
  [GLGVO-524](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-524)
- Explore Map Zoom Issues with Layers Corrected
  [GEOD-1216](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1216)

## [3.0.0-beta.3] - 2019-04-09

### Added
- Added Handling for Italics in Parameter Names.
  [GEOD-897](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-897)
- Version number to the home page and about page.

### Changed
- New spinner.
  [GEOD-1220](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1220)
- Move Popup slightly when opening, whether from map click or accordion selection
  [GEOD-1219](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1219)

### Fixed
- Fixed racing condition Trends Region Detail Page.
  [GEOD-1194](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1194)
- Ensure the Chart Component updates appropriately on the Detail Page
  [GEOD-1217](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1217)

## [3.0.0-beta.2]

### Added
- Hide and Display Sources on the Explore Page
  [GEOD-1157](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1157)
- Restrict usage of the Seasons Bin via a config item and specified Sources
  [GEOD-1163](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1163)
- Updated configuration endpoints to include /geostreams and removing Clowder from configuration
  [GEOD-1167](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1167)
- Stacked bar graph visualization using d3
  [GEOD-1155](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1155)
- Added online/offline status indicators for sensors in the explore page left navigation and map
  [GEOD-1165](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1165)
- Add option for QA/QC text line in the Info Box on the Explore Page
  [GLGVO-498](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-498)
- Added Footer file if wanted for projects
  [GEOD-1187](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1187)
- Add option for Explore Page Data Sources to Start Closed
  [GEOD-1186](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1186)
- Download Alert Pop Up for Errors
  [GLGVO-519](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-519)
- Add option for a Carousel of Images to be displayed on a page
  [GEOD-1188](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1188)
- Add option for Explore Page Data Sources to Start Closed
  [GEOD-1186](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1186)

### Changed
- General Exploratory Analysis Page Updates
  [GEOD-1149](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1149)
- Updated the appearance of the Menu Bar in the Page Header
  [GEOD-1138](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1138)
- Migrate Detail Page Combined Graphs to D3
  [GEOD-1166](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1166)
- Search Page Filter by Shape resets points before drawing a new shape
  [GEOD-1164](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1164)
- Changed styling for explore page navigation
  [GEOD-1168](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1168)
- Updated Popup Styling per design specifications
  [GEOD-1169](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1169)
- Updated Styling for Explore Page Accordion Headers
  [GEOD-1170](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1170)
- Display "No Data Available" When Detail Page Graph is Empty
  [GEOD-1180](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1180)
- Max Zoom for Maps is a Configuration Item
  [GEOD-1185](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1185)
- Migrate Detail Page QAQC Graphs to D3
  [GEOD-1178](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1178)
- Adjusted Mobile Settings for the Menu Bar
  [GEOD-1036](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1036)
- Adjusted Mobile Settings for the List vs Map Tabs
  [GEOD-1037](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1037)
- Update Label for USGS Supergauges to be USGS Super Gage Network
  [GLGVO-442](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-442)

### Fixed
- Exploratory Analysis API GET Commands and Interface Behavior
  [GEOD-1152](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1152)
- Update URLs for Layers
  [GLGVO-464](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-464)
- Explore Page Sources display order
  [GEOD-1150](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1150)
- Region details page not loading
  [GEOD-1158](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1158)
- Needed a scrollbar for the Permalink if the popup is large
  [GEOD-1195](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1195)
- Correct Layering of Items on the Page when Dialogs are Utilized
  [GEOD-1189](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1189)
- Detail Page Info Boxes
  [GEOD-1197](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1197)
- D3 Graph Popups Do Not Update Date for Bins
  [GEOD-1205](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1205)
- Detail Page would not refresh properly if the URL changed
  [GEOD-1179](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1179)
- Detail Page Download Button is Not Always Functional
  [GEOD-1191](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1191)
- Correct the Trends Station Popup to use the same terms as the Trends Region Popup
  [GEOD-1193](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1193)
- D3 Graph Popups Do Not Update Date for Bins
  [GEOD-1205](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1205)
- Explore Page Popup Boxes Map Issues Corrected
  [GEOD-1199](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1199)

## [3.0.0-alpha.4] - 2018-10-01

### Added
- Added Optional Info Buttons on the Explore Page
  [GEOD-1090](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1090)
- Added D3 box and whiskers for the time series. Updated time series graphs to reflect quartiles.
  [GEOD-1113](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1113)
- Added the option to have more sections for organizing Sites on the Explore Page
  [GEOD-1111](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1111)
- Added Collapsible Accordions on the Explore Page
  [GEOD-1114](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1114)
- Added Explore Page Accordions Categories Section
  [GEOD-1124](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1124)
- Added tooltip for line graph
  [GEOD-1126](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1126)
- Added graph options in the detail page for starting graph at 0 or changing the x extent.
  [GEOD-1120](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1120)
- Added About Page child options utilizing new Menu Bar Component
  [GEOD-1143](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1143)

### Changed
- Changed the Explore Page Pills to be larger and have more descriptive text
  [GEOD-1112](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1112)
- Changed styling for dots in the d3 graphs
  [GEOD-1125](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1125)
- Using geotemporal api v3 for binning in the detail page.
  [GEOD-1118](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1118)
- Explore Page Accordions Style Updates
  [GEOD-1123](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1123)
- Endpoint for receiving sensors to v3 instead of Clowder
  [GEOD-1119](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1119)
- Endpoint for trends by stations using v3 instead of Clowder
  [GEOD-1134](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1134)
- Endpoint for Exploratory Analysis by stations using v3 instead of Clowder
  [GEOD-1140](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1140)

### Fixed
- Missing scroll bar on Explore Page
  [GEOD-1127](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1127)
- Fixed headers on Search Page
  [GEOD-1132](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1132)
- Correct Drawing Error on the Search Page when no features in second drawn area
  [GEOD-1131](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1131)
- Region detail page not loading
  [GEOD-1139](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1139)
- Fixed overlapping points on detail page graph with different seasons on the same year
  [GEOD-1144](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1144)
- Updated the explore page
  [GEOD-1181](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1181)
## [3.0.0-alpha.3] - 2018-06-29
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
- Added the spinner to explore page while it loads
  [GEOD-1109](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1109)
- Added the ability to optionally display Detail Page Graph Lines
  [GEOD-1093](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1093)
- Create download button for Detail Page
  [GEOD-878](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-878)

### Changed
- Organize the data sources and classify the pills by region on the left navigation of the explore page.
  [GEOD-1086](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1086)
- Mobile Detail Page Improvements
  [IMLCZO-230](https://opensource.ncsa.illinois.edu/jira/browse/IMLCZO-230)
- Separate Actions for Exploratory Analysis and Trends
  [GLGVO-416](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-416)
- Save trends region into DB and use new API to get trends region
  [GEOD-1087](https://opensource.ncsa.illinois.edu/jira/browse/GEOD-1087)
- Using D3 implementation of LineChart instead of react-d3.LineChart
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
- Added usgs parameter phosphorus-insitu-orthophosphate-as-p-mgl
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
- Use cropped logo in the Menu Bar
  [GLGVO-414](https://opensource.ncsa.illinois.edu/jira/browse/GLGVO-414)
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
