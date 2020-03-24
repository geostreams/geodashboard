export const gd3 = {

    // Geostreaming API Information - this is also displayed in the Welcome Page dropdown selector
    geostreaming_endpoints: [
        {url: "http://imlczo-docker.ncsa.illinois.edu:9000/geostreams", label: "IMLCZO Docker", title: "IMLCZO",
            subtitle: ""},
        {url: "http://data.imlczo.org/geostreams", label: "IMLCZO PROD", title: "IMLCZO",
            subtitle: ""},
        {url: "https://imlczo-dev.ncsa.illinois.edu/geostreams", label: "IMLCZO DEV", title: "IMLCZO",
            subtitle: ""},
        {url: "http://141.142.211.37/geostreams", label: "IMLCZO NEBULA", title: "IMLCZO",
            subtitle: ""}
    ],

    // Menu Bar Information
    application_options:
        {
            "title": "IMLCZO",
            "pages": [
                {
                    "name": "EXPLORE",
                    "url": "/#explore/all",
                },
                {
                    "name": "SEARCH",
                    "url": "/#search",
                },
            ]
        },

    // Paths for Downloads
    download_button_path: '/datapoints/download?',

    // Paths for Downloads Count
    download_button_path_count: '/api/datapoints?',

    // Max Number of Datapoints allowed to be downloaded at once
    download_count_max_datapoints: 3000,

    // Download Alert Text options
    general_error: 'An error occurred with Download - Please try again!',
    max_datapoints_error: 'Too Many Datapoints to Download - Please continue to filter down your query.',

    // Interval Time in milliseconds for the Spinner to wait for change style to include text
    set_interval_time: 3000,
    // Load Time Limit in Milliseconds
    load_time_limit: 100000,

    // This variable is used to determine the location for links to the Detail Page
    application_website: "/",

    // Home Page Carousel file names - Should be located in /geodashboard-v3/theme folder
    home_page_carousel_images: [],

    // Home Page Carousel Caption Information - Numbers correspond to the order of images above
    home_page_carousel_captions : {},

    // Should Tabs to select multi-parameter graphs be displayed on the Detail Page
    show_detail_tabs: true,

    // Detail Page Info Icon Text
    detail_page_separate: {
        'description': 'Select a minimum of one Parameter to view'
    },
    detail_page_combined: {
        'description': 'Select a maximum of three Parameters to view'
    },
    detail_page_box_and_whisker: {
        'description': 'Box and Whisker Plots provide a visual look at the data distribution. ' +
                        'Lowest values are on the left, and the Highest values are on the right'
    },
    detail_page_raw_processed: [
        {listText: 'Level 0: No Processing - Raw Data'},
        {listText: 'Level 1: Minimal Processing'},
        {listText: 'Level 2: Increased Processing'},
        {listText: 'Level 3: Fully Processed - No Raw Data'}
    ],

    // Make all time series have the same time frame
    time_series_sensor_extent: true,
    // Allow users to choose if all the graphs have the same x-axis or match the data.
    same_timescale_choice: true,
    // If true, time series y axis start at 0. If false the y axis starts at the minimum value for the function
    time_series_zero_start: false,
    // Allow users to choose if the graphs y axis start at 0 or the minimum value in the data
    zero_start_choice: true,
    // Detail Graph Lines ****
    // Detail Graph Display Lines Default Value
    // - 'true' === display lines by default
    // - 'false' === do not display lines by default
    lines_default: true,
    // Detail Graph Display Lines User Choice
    // - 'true' === User is provided the option to toggle lines on and off
    // - 'false' === User is not provided the option to toggle lines on and off
    lines_choice: false,
    // **********

    // Detail Graphs - Display RAW vs PROCESSED for Day Average
    show_raw_processed: false,
    // Property Name that contains the PROCESSED property name
    raw_processed_property: '',

    // Detail Page Allow Season Bins
    detail_season_bins: true,
    // If Allow Season Bins, for which Sources?
    detail_season_bins_sources: ['epa'],

    // Display Online/Offline Information on the Explore Page
    display_online_status: false,

    // Layers for the Explore Page
    exploreLayers: [
        {
            "layerGroup": "",
            "title": "USRB Flow Lines",
            "id": "sf:NHDFlowline",
            "wms": "http://data.imlczo.org/geoserver/sf/wms",
            "opacity": 0.5,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "USRB Boundary",
            "id": "sf:WBDHU10",
            "wms": "http://data.imlczo.org/geoserver/sf/wms",
            "opacity": 0.5,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "USRB DEM",
            "id": "sf:USRB_30m_DEM",
            "wms": "http://data.imlczo.org/geoserver/sf/wms",
            "opacity": 0.5,
            "visibility": true,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "IL Moraines",
            "id": "imlczo:IL_Moraines_Py",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.3,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "IL County Boundaries",
            "id": "imlczo:IL_BNDY_County_Py",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.5,
            "visibility": true,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "USRB Terraces",
            "id": "imlczo:terraces_merged",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.5,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "ClearCreek Streams",
            "id": "imlczo:stream_order",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.8,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "ClearCreek Watershed",
            "id": "imlczo:Clear_Cr_watershed",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.3,
            "visibility": true,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        },
        {
            "layerGroup": "",
            "title": "ClearCreek Catchment",
            "id": "imlczo:Clear_Cr_Catchment",
            "wms": "http://data.imlczo.org/geoserver/imlczo/wms",
            "opacity": 0.5,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": ""
        }
    ],

    // Layers for the Analysis Page
    analysisLayers: [],

    // Analysis Saves Search Info
    use_analysis_searches: false,
    analysis_search_heading: "Saved Searches: ",
    analysis_search_info: [],

    // For Mobile Explore and Detail Pages
    mobile_sourcename: "imlczo",
    mobile_size_max: 840,
    chrome_detail_mobile_disabled: true,
    filter_unavailable_sensors: true,
    mobile_detail_path: '/#detail/location/',
    mobile_explore_path: '/#explore/all/',

    // Max Number of Parameters to display in the Map Popups (default is 10)
    max_display_params: 10,

    // Error Text if the API does not return on the Welcome Page
    error_text: "An Error Occurred - Please Select Again",

    // Error Items for IE
    ie_show_alert_popup: false,
    ie_versions_before_eleven: [],
    ie_version_eleven: false,
    ie_version_edge: false,
    ie_message_title: "",
    ie_message_text: "" ,
    ie_button_text: "",
    ie_show_menu_bar_alert: false,
    ie_menu_bar_message_text: "",

    // Source IDs and their Display Names
    sourcename: {
        "ads": "Atmospheric Deposition Station",
        "ameriflux": "AmeriFlux Tower Station",
        "ats": "AmeriFlux Tower Station",
        "greon": "Great Rivers Ecological Observation Network ",
        "ifis": "IFC River Sensor",
        "imlczo": "Intensively Managed Landscapes - Critical Zone Observatory",
        "iml-czo": "IMLCZO",
        "in-field download": "In-Field Download",
        "in-field measurement": "In-Field Measurement",
        "internet": "Internet",
        "isws": "ISWS Stream And Nutrient Station",
        "lab analysis": "Lab Analysis",
        "ps": "Precipitation Station",
        "ss": "Sediment Station",
        "usgs": "United States Geological Survey"
    },

    // Show Info Boxes on the Explore Page
    show_source_info_boxes: true,

    // For Source Info Boxes on the Explore Page
    source_information: {
        "usgs": {
            "description":
                "U.S. Geological Survey conducts long-term monitoring of " +
                "lakes and rivers nationwide. They have gauges throughout " +
                "many rivers in the Great Lakes basin. We've chosen five " +
                "principal rivers to focus on for this website, one on each " +
                "lake: St. Louis River (Superior), St. Joseph River (Michigan), " +
                "Saginaw River (Huron), Maumee River (Erie) and Oswego River " +
                "(Ontario). In each river, we present data from gauges with the " +
                "most complete long term data set. The data provided from each " +
                "gauge is currently for discharge only. Measurements are taken " +
                "daily. *Note that USGS posts both approved data (quality-assured) " +
                "as well as more recent provisional data (accuracy unverified and " +
                "subject to revision). Most current data are provisional. The data " +
                "are released on the condition that neither the USGS nor the United " +
                "States Government may be held liable for any damages resulting " +
                "from its authorized or unauthorized use.",
        },
        "ameriflux": {
            "description":
                "Funding for AmeriFlux data resources was provided by the " +
                "U.S. Department of Energy’s Office of Science. ",
            "qaqc":  "Tilden Meyers AmeriFlux US-Bo1 Bondville, doi:10.17190/AMF/1246036 ",
            "more_info": "Click here for more information",
            "link": "http://dx.doi.org/10.17190/AMF/1246036"
        }
    },

    source_order: {
        "ADS": 0,
        "AMERIFLUX": 1,
        "ATS": 2,
        "GREON": 3,
        "IFIS": 4,
        "IMLCZO": 5,
        "IML-CZO": 6,
        "ISWS": 7,
        "IN-FIELD DOWNLOAD": 8,
        "IN-FIELD MEASUREMENT": 9,
        "INTERNET": 10,
        "LAB ANALYSIS": 11,
        "PS": 12,
        "SS": 13,
        "USGS": 14
    },

    // Colors associated with specific Sources
    sourcecolor: {
        "ads": "#bf5fff",
        "ameriflux": "#0d71ba",
        "ats": "#0d71ba",
        "greon": "#bdaf05",
        "ifis": "#a17c6c",
        "imlczo": "#C4B9A2",
        "iml-czo": "#C4B9A2",
        "isws": "#f7941e",
        "in-field download": "#127b1d",
        "in-field measurement": "#642bd8",
        "internet": "#d80d50",
        "lab analysis": "#5F99C1",
        "ps": "#cc2128",
        "ss": "#4d6363",
        "usgs": "#39B54A",
    },

    // Explore Page Accordion Source Section Initial Open Status
    // true === open, false === closed
    sources_explore_accordion_open: true,

    // Explore Page Sources Child Sections Initial Open Status
    // true === open, false === closed
    start_explore_each_source_open: false,

    // Explore Page Additional Accordion Sections
    additional_explore_accordion_sections: [],

    // Explore Page Display Categories Accordion
    categories_accordion_section_display: true,

    // This is used to define general areas on the map
    additional_locations: [
        {
            "type": "Feature",
            "properties": {
                "title": "Sangamon River",
                "region": "SR",
                "id": "sr",
                "sortOrder": 1,
                "threshold": {
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-88.363037109375,
                            40.60769725157612
                        ],
                        [-88.03070068359375,
                            40.327701904195926
                        ],
                        [-88.15155029296875,
                            40.042334918180536
                        ],
                        [-88.7200927734375,
                            39.55064761909321
                        ],
                        [-89.2529296875,
                            39.51251701659638
                        ],
                        [-89.5550537109375,
                            39.6606850221923
                        ],
                        [-89.56329345703125,
                            39.87812720644829
                        ],
                        [-88.87664794921875,
                            40.31513750307456
                        ],
                        [-88.8299560546875,
                            40.538851525354644
                        ],
                        [-88.363037109375,
                            40.60769725157612
                        ]
                    ]
                ],
                "region_coordinate": []
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Clear Creek",
                "region": "CC",
                "id": "cc",
                "sortOrder": 2,
                "threshold": {
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.55593872070311,
                            41.66470503009207
                        ],
                        [-91.593017578125,
                            41.77028745790557
                        ],
                        [-92.010498046875,
                            41.795888098191426
                        ],
                        [-92.07504272460938,
                            41.70367796221136
                        ],
                        [-91.96517944335938,
                            41.65854925140818
                        ],
                        [-91.55593872070311,
                            41.66470503009207
                        ]
                    ]
                ],
                "region_coordinate": []
            }
        }
    ],

    // This is used to define HUC areas on the map
    sensors_regions: [],

    // These variables are for the Card Subtitles on the Trends and Exploratory Analysis Pages ****
    parameter_subtitle: '',
    season_subtitle: '',
    region_subtitle: '',
    calculation_subtitle: '',
    threshold_subtitle: '',
    threshold_none_subtitle: '',
    // **********

    // These variables are for the Trends and Analysis Pages ****
    // Colors for all Trends
    trend_colors: {},

    // List of sources for sensors that show up in the trends page.
    trends_sources: ["epa"],

    // Will be added to the Exploratory Analysis and Trends Stations Regions
    draw_and_all_regions: [],

    // Exploratory Analysis Page Only
    trend_settings: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_settings: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_lake_regions:[],

    // Trends Stations and Trends Regions Pages Only
    trends_page_seasons: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_timeframes: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_defaults: [],

    // Exploratory Analysis Page Only
    trends_analysis_defaults: [],

    // Exploratory Analysis Page Only
    trends_analysis_baseline: [],

    // Exploratory Analysis Page Only
    trends_analysis_rolling: [],

    // Exploratory Analysis Page Only
    trends_analysis_water_year: false,
    // **********

    // These variables are for Map settings
    mapTileURL: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mapAttributions: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    mapAttributionsCollapsible: true,
    mapMiniAttributionsCollapsible: true,
    mapMiniMinZoom: 3,
    mapClustersDistance: 1,
    clustersChoiceOption: false,
    clustersExpandMaxNumberFeatures: 25,
    mapMaxZoom: 16,
    mapMinZoom: 6.5,
    mapCenterValue: [-90.343802, 40.549127],
    mapPopupZoomMax: 10,
}
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
// Keep the next new line at the end of the file
