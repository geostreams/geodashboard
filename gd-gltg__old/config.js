export const gd3 = {

    // Geostreaming API Information - this is also displayed in the Welcome Page dropdown selector
    geostreaming_endpoints: [
        {url: process.env.GEOSTREAMS_URL}
    ],

    // Menu Bar Information
    application_options: {
        "title": "Geodashboard 3.0",
        "pages": [
            {
                "name": "WELCOME",
                "url": "/#",
            },
            {
                "name": "EXPLORE",
                "url": "/#explore/all",
            },
            {
                "name": "DOWNLOAD",
                "url": "/#search",
            },
            {
                "name": "ANALYSIS",
                "url": "/#analysis",
            },
            {
                "name": "ABOUT",
                "children": [
                    {
                        "name": "ABOUT",
                        "url": "/about"
                    },
                    {
                        "name": "PARTNERS",
                        "url": "/partners"
                    },
                    {
                        "name": "GLOSSARY",
                        "url": "/glossary"
                    },
                    {
                        "name": "HELP",
                        "url": "/help"
                    },
                    {
                        "name": "FAQ",
                        "url": "/faq"
                    }
                ]
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
    application_website: "/geostreaming",

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
    detail_season_bins: false,
    // If Allow Season Bins, for which Sources?
    detail_season_bins_sources: ['epa'],

    // Display Online/Offline Information on the Explore Page
    display_online_status: true,

    // Layers for the Explore Page
    exploreLayers: [
        {
            "layerGroup": "SPARROW 2002 Nutrient Model Results",
            "title": "SPARROW 2002 Nitrogen Load",
            "id": "gltg:sparrow-nitrogen",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:sparrow-nitrogen"
        },
        {
            "layerGroup": "SPARROW 2002 Nutrient Model Results",
            "title": " SPARROW 2002 Phosphorus Load",
            "id": "gltg:sparrow-phosphorus",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:sparrow-phosphorus"
        },
        {
            "layerGroup": "Watershed Boundaries",
            "title": "HUC 8",
            "id": "gltg:huc250k",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc250k"
        },
        {
            "layerGroup": "Watershed Boundaries",
            "title": "HUC 4",
            "id": "gltg:huc4",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc4"
        },
        {
            "layerGroup": "Watershed Boundaries",
            "title": "HUC 2",
            "id": "gltg:huc2",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc2"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2005 Hypoxia Contours",
            "id": "gltg:2005_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2005_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2006 Hypoxia Contours",
            "id": "gltg:2006_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2006_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2007 Hypoxia Contours",
            "id": "gltg:2007_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2007_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2008 Hypoxia Contours",
            "id": "gltg:2008_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2008_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2009 Hypoxia Contours",
            "id": "gltg:2009_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2009_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2010 Hypoxia Contours",
            "id": "gltg:2010_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2010_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2011 Hypoxia Contours",
            "id": "gltg:2011_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2011_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2012 Hypoxia Contours",
            "id": "gltg:2012_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2012_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2013 Hypoxia Contours",
            "id": "gltg:2013_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2013_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2014 Hypoxia Contours",
            "id": "gltg:2014_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2014_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2015 Hypoxia Contours",
            "id": "gltg:2015_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2015_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2016 Hypoxia Contours",
            "id": "gltg:2016_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2016_Hypoxia_Contours"
        },
        {
            "layerGroup": "Hypoxia and Precipitation",
            "title": "2017 Hypoxia Contours",
            "id": "gltg:2017_Hypoxia_Contours",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2017_Hypoxia_Contours"
        },
        {
            "layerGroup": "Cropscape Frequency Data",
            "title": "Corn Frequency",
            "id": "gltg:corn_freq",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:corn_freq"
        },
        {
            "layerGroup": "Cropscape Frequency Data",
            "title": "Cotton Frequency",
            "id": "gltg:cotton_freq",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:cotton_freq"
        },
        {
            "layerGroup": "Cropscape Frequency Data",
            "title": "Soy Frequency",
            "id": "gltg:soy_freq",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.80,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:soy_freq"
        },
        {
            "layerGroup": "",
            "title": "River Reaches",
            "id": "gltg:gltg-pools",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.90,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:gltg-pools"
        },
        {
            "layerGroup": "",
            "title": "Large Rivers",
            "id": "gltg:us-rivers",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.25,
            "visibility": true,
            "legendShow": true,
            "legendStartOpen": true,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:us-rivers"
        },
        {
            "layerGroup": "",
            "title": "US States",
            "id": "gltg:us-states",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.50,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:us-states"
        },
        {
            "layerGroup": "",
            "title": "Total annual nitrogen from point sources by HUC8 watershed (avg. 2007-2014)",
            "id": "gltg:agg-pt-source",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.50,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:agg-pt-source"
        },
        {
            "layerGroup": "",
            "title": "Average Annual Nitrogen Fertilizer Inputs for 1997 to 2006",
            "id": "gltg:fertilizer_n",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.50,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:fertilizer_n"
        },
        {
            "layerGroup": "",
            "title": "EPA Impaired Stream Segments",
            "id": "gltg:impaired-epa",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.75,
            "visibility": false,
            "legendShow": true,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:impaired-epa"
        },
        {
            "layerGroup": "",
            "title": "State Legislative District - Lower Chamber",
            "id": "gltg:state-legi-dist-lower",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.75,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:state-legi-dist-lower"
        },
        {
            "layerGroup": "",
            "title": "State Legislative District - Upper Chamber",
            "id": "gltg:state-legi-dist-upper",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.75,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:state-legi-dist-upper"
        },
        {
            "layerGroup": "",
            "title": "Congressional District",
            "id": "gltg:cong-dist-il",
            "wms": `${process.env.GEOSERVER_URL}/wms`,
            "opacity": 0.75,
            "visibility": false,
            "legendShow": false,
            "legendStartOpen": false,
            "legendTitle": "Legend",
            "legendText": "",
            "legendImage": `${process.env.GEOSERVER_URL}/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&` +
                "FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:cong-dist-il"
        }
    ],

    // Layers for the Analysis Page
    analysisLayers: [],

    // Analysis Saves Search Info
    use_analysis_searches: false,
    analysis_search_heading: "Saved Searches: ",
    analysis_search_info: [],

    // For Mobile Explore and Detail Pages
    mobile_sourcename: "all",
    mobile_size_max: 840,
    chrome_detail_mobile_disabled: true,
    filter_unavailable_sensors: true,
    mobile_detail_path: '/detail/location/',
    mobile_explore_path: '/explore/all/',

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
        "epa": "EPA Pollutant Loading",
        "greon": "Great Rivers Ecological Observation Network",
        "gac": "Gustavus Adolphus College",
        "illinois-epa": "IEPA Ambient Water Quality Monitoring Network",
        "iwqis": "Iowa Water Quality Information System",
        "metc": "Metropolitan Council",
        "noaa": "National Oceanic and Atmospheric Administration",
        "sierra-club": "Fox River Study Group",
        "tennessee": "Tennessee",
        "usgs": "United States Geological Survey",
        "usgs-sg": "United States Geological Survey (Super Gage Network)",
        "umrr-ltrm": "Upper Mississippi River Restoration",
        "wqp": "Water Quality Portal",
    },

    // Show Info Boxes on the Explore Page
    show_source_info_boxes: true,
    // For Source Info Boxes on the Explore Page
    source_information: {
        "epa": {
            "description": "These locations contain data related to EPA Pollutant Loading.",
            "more_info": "Click here for more information about EPA Pollutant Loading",
            "link" : "https://cfpub.epa.gov/dmr/"
        },
        "greon": {
            "description":
                "The GREON℠ program seeks to establish a network of real-time water quality monitoring platforms " +
                "on great rivers around the world. NGRREC℠ partnered with YSI Inc. to design and launch a monitoring " +
                "buoy capable of real-time, continuous collection of water quality and phytoplankton data. The first " +
                "YSI PISCES (Pontoon for In-situ Characterization of Environmental Systems) buoy launched in May 2013 " +
                "on the Upper Mississippi River System, but the program aims to expand to deploy platforms across the " +
                "globe on other international great river systems.",
            "qaqc": "Note: This data is not QA/QC.",
            "more_info": "More information about GREON",
            "link": "http://www.ngrrec.org/GREON/"
        },
        "gac": {
            "description": "Spreadsheet data from 2016"
        },
        "illinois-epa": {
            "description":
                "These locations contain data related to the IEPA Ambient Water Quality Monitoring Network.",
            "more_info": "Click here for more information about the IEPA Ambient Water Quality Monitoring Network (AWQMN)",
            "link": "http://www.epa.illinois.gov/topics/water-quality/monitoring/river-and-stream/"
        },
        "iwqis": {
            "description":
                "The IWQIS allows access to real-time water-quality data and information such as nitrate, pH, and " +
                "dissolved oxygen concentrations, discharge rates, and temperature.",
            "color": "#31CFC1",
            "more_info": "Click here for more information about IWQIS",
            "link" : "http://iwqis.iowawis.org/"
        },
        "metc": {
            "description":
                "These locations contain data related to the " +
                "Metropolitan Council Environmental Information Management Systems.",
            "more_info": "Click here for more information about the Metropolitan Council",
            "link" : "https://eims.metc.state.mn.us/"
        },
        "noaa": {
            "description":
                "NOAA's National Data Buoy Center (NDBC) collects wind, wave, and other marine data. The data are " +
                "collected from NDBC moored buoys and from C-MAN (Coastal-Marine Automated Network) stations located " +
                "on piers, offshore towers, lighthouses, and beaches. Parameters reported by both buoys and C-MAN " +
                "stations include air temperature and pressure, wind speed and direction, wind gust, and sea surface " +
                "temperature. The buoys (and a few C-MAN stations located on offshore towers) also report wave data, " +
                "usually including wave height, wave period, and wave spectra. We've chosen to focus on buoys on the " +
                "Mississippi River that are equipped with continuous water quality sensors for this website.",
            "more_info": "For more information and for access to all NOAA buoy data.",
            "link" : "http://www.nodc.noaa.gov/"
        },
        "sierra-club": {
            "description":  "These locations contain data related to the Fox River Study Group.",
            "more_info": "Click here for more information about the Fox River Study Group",
            "link" : "http://foxriverstudygroup.org/"
        },
        "tennessee": {
            "description": "These locations contain data related to Tennessee."
        },
        "usgs": {
            "description":
                "The USGS investigates the occurrence, quantity, quality, distribution, and movement of surface and " +
                "underground waters and disseminates the data to the public, State and local governments, public and " +
                "private utilities, and other Federal agencies involved with managing our water resources. U.S. " +
                "Geological Survey conducts long-term monitoring of lakes and rivers nationwide. They have gauges " +
                "throughout many rivers in the Mississippi River basin. We've chosen to focus on gauges on the " +
                "Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.",
            "more_info": "For more information and for access to all USGS water quantity and quality data.",
            "link" : "http://waterdata.usgs.gov/nwis"
        },
        "usgs-sg": {
            "description":
                "The USGS investigates the occurrence, quantity, quality, distribution, and movement of surface and " +
                "underground waters and disseminates the data to the public, State and local governments, public and " +
                "private utilities, and other Federal agencies involved with managing our water resources. U.S. " +
                "Geological Survey conducts long-term monitoring of lakes and rivers nationwide. They have gauges " +
                "throughout many rivers in the Mississippi River basin. We've chosen to focus on gauges on the " +
                "Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.",
            "more_info": "For more information and for access to all USGS water quantity and quality data.",
            "link" : "http://waterdata.usgs.gov/nwis"
        },
        "umrr-ltrm": {
            "description":
                "The UMRR LTRM water quality sampling design focuses on a subset of limnological variables related " +
                "to habitat quality and ecosystem function that includes physicochemical features, suspended sediment, " +
                "and major plant nutrients known to be significant to aquatic habitat in this system. We've chosen to " +
                "focus on long term nitrate data sets available on the Mississippi River for this website.",
            "more_info": "Click here for more information and for access to all original UMRR LTRM data.",
            "link" : "http://www.umesc.usgs.gov/data_library/water_quality/water1_query.shtml"
        },
        "wqp": {
            "description":
                "The Water Quality Portal (WQP) is a cooperative service sponsored by the United States Geological " +
                "Survey (USGS), the Environmental Protection Agency (EPA) and the National Water Quality Monitoring " +
                "Council (NWQMC) that integrates publicly available water quality data from the USGS National Water " +
                "Information System (NWIS) the EPA STOrage and RETrieval (STORET) Data Warehouse, and the USDA ARS " +
                "Sustaining The Earth’s Watersheds - Agricultural Research Database System (STEWARDS). We've chosen " +
                "to focus on available Water Quality Portal long term (5 years) nitrate data sets available on the " +
                "Mississippi River and its tributaries for this website.",
            "more_info": "Click here for more information and for access to all WQP data.",
            "link" : "http://waterqualitydata.us/"
        },
    },

    source_order: {
        "EPA": 0,
        "GLFMSP": 1,
        "HEIDELBERG": 2,
        "IADN": 3,
        "LEC": 4,
        "USGS": 5,
        "NOAA": 6
    },

    // Colors associated with specific Sources
    sourcecolor: {
        "epa": "#a87c03",
        "greon": "#BDBFA6",
        "gac": "#8c1ace",
        "illinois-epa": "#d89b0d",
        "iwqis": "#31CFC1",
        "metc": "#D2E11D",
        "noaa": "#043C82",
        "sierra-club": "#9C2C1A",
        "tennessee": "#d80d50",
        "usgs": "#39B54A",
        "usgs-sg": "#228e31",
        "umrr-ltrm": "#5F99C1",
        "wqp": "#F28E1E",
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
    categories_accordion_section_display: false,

    // This is used to define general areas on the map
    additional_locations: [
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "upperMS",
                "sortOrder": 1,
                "title": "Upper Mississippi",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [ -89.942627, 38.1584473 ], [ -90.0079346, 38.0526123 ], [ -90.2592163, 38.2658081 ], [ -90.1436768, 38.4206543 ], [ -90.0151978, 38.588501 ], [ -89.9770508, 38.7704468 ], [ -90.0663452, 38.887085 ], [ -90.4196777, 38.9990234 ], [ -90.6826172, 39.2643433 ], [ -91.0681152, 39.6557617 ], [ -91.3560181, 39.8533325 ], [ -91.3916626, 40.0292969 ], [ -91.3458862, 40.3918457 ], [ -91.347229, 40.5489502 ], [ -91.2630615, 40.5975952 ], [ -91.0638428, 40.6554565 ], [ -90.9153442, 40.8609009 ], [ -90.8282471, 41.0758667 ], [ -90.8690186, 41.1750488 ], [ -90.9710083, 41.2593384 ], [ -90.9938965, 41.3607788 ], [ -90.9696655, 41.395752 ], [ -90.5485229, 41.4269409 ], [ -90.1872559, 41.65271 ], [ -90.0581055, 41.8438721 ], [ -90.0358887, 41.9952393 ], [ -90.1572266, 42.1793823 ], [ -90.2529297, 42.2264404 ], [ -90.3936157, 42.3364258 ], [ -90.6398926, 42.6070557 ], [ -90.7105103, 42.6675415 ], [ -91.0167847, 42.7374878 ], [ -91.0653076, 42.8497314 ], [ -91.1002808, 42.99823 ], [ -91.1252441, 43.1308594 ], [ -91.0645142, 43.2131348 ], [ -91.0331421, 43.2901611 ], [ -91.078125, 43.3444824 ], [ -91.1951904, 43.428772 ], [ -91.2058716, 43.5150146 ], [ -91.2037964, 43.6269531 ], [ -91.1931152, 43.7141113 ], [ -91.1937866, 43.878418 ], [ -91.2730713, 44.0011597 ], [ -91.5193481, 44.0667725 ], [ -91.8519897, 44.2724609 ], [ -92.0111694, 44.4378662 ], [ -92.1097412, 44.4506226 ], [ -92.2753906, 44.5230103 ], [ -92.3181763, 44.5734253 ], [ -92.5084839, 44.6110229 ], [ -92.6636963, 44.6814575 ], [ -92.7954712, 44.7476196 ], [ -92.7883301, 44.760437 ], [ -92.7488403, 44.8352051 ], [ -92.7316895, 44.9333496 ], [ -92.7469482, 45.0279541 ], [ -92.7888794, 45.0598145 ], [ -92.8106689, 45.0552368 ], [ -92.7902832, 45.0237427 ], [ -92.7850342, 44.9060669 ], [ -92.7980957, 44.8147583 ], [ -92.8203125, 44.7531738 ], [ -92.8604736, 44.7610474 ], [ -92.8815918, 44.7815552 ], [ -92.9161377, 44.7885742 ], [ -92.9482422, 44.7859497 ], [ -92.9764404, 44.8070679 ], [ -92.9997559, 44.9007568 ], [ -93.026123, 44.9368286 ], [ -93.0758667, 44.9520264 ], [ -93.1115112, 44.9362183 ], [ -93.1657104, 44.9005737 ], [ -93.1826782, 44.9014282 ], [ -93.192688, 44.9115601 ], [ -93.1906128, 44.9412231 ], [ -93.1945801, 44.9472046 ], [ -93.2227173, 44.9753418 ], [ -93.2567139, 44.9880981 ], [ -93.2694702, 45.0004272 ], [ -93.2755127, 45.0356445 ], [ -93.2872925, 45.0323486 ], [ -93.291687, 44.9986572 ], [ -93.2225952, 44.9377441 ], [ -93.2191772, 44.8583374 ], [ -93.0132446, 44.7537842 ], [ -92.8217773, 44.7109375 ], [ -92.5826416, 44.5490112 ], [ -92.3803101, 44.5181885 ], [ -92.2614136, 44.4158936 ], [ -92.0638428, 44.3587036 ], [ -91.9782715, 44.2409668 ], [ -91.7022705, 44.0374756 ], [ -91.4559937, 43.9578247 ], [ -91.3202515, 43.7697754 ], [ -91.3381958, 43.5354614 ], [ -91.2072754, 43.2785034 ], [ -91.2203979, 43.0822754 ], [ -91.1072998, 42.7062988 ], [ -90.8432007, 42.6455688 ], [ -90.2341309, 42.0482788 ], [ -90.2245483, 41.9102783 ], [ -90.3518066, 41.809082 ], [ -90.4041748, 41.6331177 ], [ -91.1954346, 41.4331055 ], [ -91.1730957, 41.2357788 ], [ -91.0945435, 41.0811157 ], [ -91.0755005, 40.9194336 ], [ -91.2301636, 40.736145 ], [ -91.4490967, 40.6209106 ], [ -91.6154175, 40.4398193 ], [ -91.5440063, 39.8781738 ], [ -90.8861084, 39.246521 ], [ -90.7897339, 38.9359131 ], [ -90.6409912, 38.7753296 ], [ -90.3483276, 38.8060913 ], [ -90.2352295, 38.6360474 ], [ -90.3779907, 38.4171753 ], [ -90.3887939, 38.2125244 ], [ -90.0021362, 37.888916 ], [ -89.5725708, 37.6367798 ], [ -89.5750122, 37.2632446 ], [ -89.4530808, 36.964609 ], [ -89.3234852, 36.8810987 ], [ -89.1306141, 36.9030105 ], [ -89.1246263, 36.9670834 ], [ -89.1256509, 36.9774738 ], [ -89.1256412, 36.9784791 ], [ -89.1689332, 37.0058616 ], [ -89.1788307, 37.0343169 ], [ -89.1751191, 37.119683 ], [ -89.2468761, 37.1221574 ], [ -89.3346558, 37.3712439 ], [ -89.3858032, 37.7296753 ], [ -89.9299927, 38.0108032 ], [ -89.8717651, 38.1234741 ], [ -89.942627, 38.1584473 ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "1",
                "sortOrder": 1,
                "title": "Upper Mississippi - Pool 1",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-93.275589715709486, 45.035538009601048], [-93.270879646507353, 45.001714714693868], [-93.265410766742832, 44.993370984617414], [-93.256843896742154, 44.986310119277718], [-93.224533059923345, 44.975117055822508], [-93.200599758284326, 44.95378492890125], [-93.197888982646603, 44.943211916810689], [-93.192145470081854, 44.943108985571257], [-93.193705537336612, 44.922680251781145], [-93.198567071940033, 44.91578951717139], [-93.207509720085312, 44.91882333270911], [-93.207759073068729, 44.949509830321659], [-93.282291656832513, 44.992646793365019], [-93.282079286083444, 45.02002973003367], [-93.287326929631504, 45.032304655749627], [-93.275589715709486, 45.035538009601048]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "2",
                "sortOrder": 2,
                "title": "Upper Mississippi - Pool 2",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-93.075613021850586, 44.949724197387695], [-93.044570922851562, 44.941804885864258], [-93.020200729370117, 44.928613662719719], [-93.003364562988281, 44.886983871459961], [-92.989936828613281, 44.829877853393555], [-92.977521896362305, 44.804250717163086], [-92.94978141784668, 44.783685684204102], [-92.917644500732422, 44.78618049621582], [-92.888069152832031, 44.782377243041992], [-92.864658355712891, 44.761896133422852], [-92.878885269165025, 44.750665664672852], [-92.90025520324707, 44.76911735534668], [-92.917036056518555, 44.772527694702148], [-92.93681526184082, 44.767911911010742], [-92.940605163574219, 44.754281997680664], [-92.956359863281236, 44.74968147277832], [-93.020984649658203, 44.767850875854485], [-93.029306411743164, 44.800111770629883], [-93.012012481689453, 44.823286056518555], [-93.024833679199219, 44.867143630981445], [-93.02412223815918, 44.887727737426758], [-93.062339782714844, 44.921941757202148], [-93.071954727172837, 44.942853927612305], [-93.092864990234361, 44.938077926635742], [-93.121124267578125, 44.912710189819336], [-93.156644821166992, 44.890005111694336], [-93.169986724853516, 44.886037826538086], [-93.179269790649414, 44.854341506958008], [-93.215957641601562, 44.860818862915039], [-93.200376510620117, 44.868452072143548], [-93.185806274414062, 44.891908645629883], [-93.195110321044922, 44.896348953247063], [-93.198667526245117, 44.906312942504883], [-93.213376998901367, 44.916639328002923], [-93.207509994506836, 44.918825149536133], [-93.198566436767564, 44.915788650512695], [-93.188404083251953, 44.905828475952148], [-93.187252044677734, 44.898714065551758], [-93.173480987548828, 44.895990371704102], [-93.13514518737793, 44.915517807006836], [-93.10887336730957, 44.937032699584961], [-93.075613021850586, 44.949724197387695]], [[-92.988798141479492, 44.809419631958008], [-92.988595962524414, 44.809453964233391], [-92.988727569580078, 44.809480667114258], [-92.988798141479492, 44.809419631958008]], [[-92.988428115844712, 44.804361343383789], [-92.988372802734375, 44.80436897277832], [-92.988424301147461, 44.804471969604485], [-92.988428115844712, 44.804361343383789]], [[-92.985454559326172, 44.801855087280273], [-92.985446929931641, 44.80180549621582], [-92.985425949096665, 44.801839828491211], [-92.985454559326172, 44.801855087280273]], [[-93.004287719726562, 44.801198959350586], [-93.004301071166992, 44.80109977722168], [-93.004276275634766, 44.80119514465332], [-93.004287719726562, 44.801198959350586]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "3",
                "sortOrder": 3,
                "title": "Upper Mississippi - Pool 3",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-92.861203400015583, 44.75897328950748], [-92.817800967128875, 44.749975983175602], [-92.817757848246288, 44.749970012566621], [-92.817652689637796, 44.749941254511128], [-92.817641071066959, 44.74993853034357], [-92.816625004433476, 44.749723551751217], [-92.816609404826806, 44.749720610539676], [-92.807212800034591, 44.748528743632548], [-92.803882573878141, 44.749537311935192], [-92.803882488602895, 44.749549416721344], [-92.803572911374147, 44.74981439356884], [-92.803254487011898, 44.74996845454455], [-92.803241362973424, 44.749977299982177], [-92.706659130066541, 44.701614380087193], [-92.663988247443555, 44.666647963155242], [-92.6022912686322, 44.642250841998411], [-92.589820538677799, 44.632660851971522], [-92.592923632332557, 44.621849466238018], [-92.610489240482892, 44.613596805267505], [-92.604075908427859, 44.608326220901482], [-92.616304280163789, 44.588355327887783], [-92.728040235607182, 44.650442823254608], [-92.754969418190143, 44.677723069047268], [-92.749920871995357, 44.690180646393756], [-92.754421435475635, 44.696658726877267], [-92.781647806860263, 44.71698314985592], [-92.801193931314714, 44.72640841650788], [-92.83225987912715, 44.730284292883454], [-92.85510397534803, 44.74444937449104], [-92.865759692884197, 44.744043772623044], [-92.878886472294582, 44.750664246645819], [-92.864659098049003, 44.76189462495347], [-92.861203400015583, 44.75897328950748]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "4",
                "sortOrder": 4,
                "title": "Upper Mississippi - Saint Croix River",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-92.791543396295864, 45.05936709498026], [-92.784870266329932, 45.050141336035544], [-92.752068147269483, 45.028155295392992], [-92.752557380620914, 45.008329675587497], [-92.743117606711792, 44.984237664400311], [-92.749364987375856, 44.977617102888942], [-92.74901019981165, 44.966818459687886], [-92.735575866414536, 44.949405296477671], [-92.734051738267297, 44.934422398032908], [-92.752127244483006, 44.899701612910079], [-92.761153487682279, 44.892370639920614], [-92.760172828007654, 44.883222446798023], [-92.752800863412602, 44.877076286546618], [-92.755148969392849, 44.856380929633104], [-92.750919587733094, 44.840460454039608], [-92.771974245123729, 44.793737921594158], [-92.797094384743346, 44.768912033997907], [-92.803241362973424, 44.749977299982177], [-92.803254487011898, 44.74996845454455], [-92.803572867394664, 44.749815962464609], [-92.803882488602895, 44.749549416721344], [-92.803882573878141, 44.749537311935192], [-92.807212691936698, 44.748530331662074], [-92.816609404826806, 44.749720610539676], [-92.816625004433476, 44.749723551751217], [-92.817641071066959, 44.74993853034357], [-92.817652689637796, 44.749941254511128], [-92.817757848246288, 44.749970012566621], [-92.817800967128875, 44.749975983175602], [-92.817195257277632, 44.761703628792368], [-92.80121225785507, 44.802601253777723], [-92.796051061104492, 44.813772922925367], [-92.780889786783959, 44.822409472986344], [-92.774226971347517, 44.846310810952048], [-92.776586357261095, 44.863856151469037], [-92.772687159477769, 44.874750041058121], [-92.784016709149967, 44.887406497695068], [-92.783525831352009, 44.905810342043992], [-92.771428924623422, 44.928823037362676], [-92.779096205716556, 45.016418293940916], [-92.808645584143633, 45.055121157679039], [-92.791543396295864, 45.05936709498026]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "5",
                "sortOrder": 5,
                "title": "Upper Mississippi - Pool 4",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-92.577286572561349, 44.624574465133435], [-92.538770901195136, 44.607000866591108], [-92.470761889876684, 44.603676481383005], [-92.449622675464951, 44.595271570706856], [-92.428922071449378, 44.578866095077331], [-92.406937917436792, 44.571344798632289], [-92.360044078835045, 44.575858405034879], [-92.321925864202484, 44.568499236083852], [-92.303378691341038, 44.55590988913778], [-92.294955566354744, 44.543344476556939], [-92.289313083805084, 44.502171639771746], [-92.28265274579519, 44.494743194538763], [-92.21692008040894, 44.462004574610759], [-92.176673456148635, 44.452727554943095], [-92.109271349252722, 44.445320871282831], [-92.102543943176244, 44.438542994541464], [-92.011234154327795, 44.433093681185355], [-92.002033092518346, 44.415858439207476], [-91.983436277511657, 44.405079724311378], [-91.957430834109672, 44.373383975024232], [-91.927032849591512, 44.349023495729575], [-91.918125737144351, 44.325886968549156], [-91.956717321360173, 44.323207728337422], [-91.958385980295901, 44.323213967325934], [-91.965945035725667, 44.323224188590217], [-92.001852992401297, 44.323269302209368], [-92.002755755136903, 44.334760688370224], [-92.017227506631301, 44.350709173103262], [-92.058649932037738, 44.383991501567948], [-92.066667462176369, 44.395297613004267], [-92.084749252824523, 44.405554390586907], [-92.210568997930878, 44.417797033657067], [-92.241496388926095, 44.42499749845561], [-92.276336845816886, 44.444926510230836], [-92.324027086894503, 44.506762270531809], [-92.331015060506886, 44.531110767210677], [-92.339277658526527, 44.53759131232961], [-92.363685218690804, 44.543149588929481], [-92.430493317256804, 44.544470238048788], [-92.437091091893294, 44.554716518969848], [-92.479224358511502, 44.56476997354801], [-92.49486951899712, 44.560874609059972], [-92.530988112993739, 44.568212762625656], [-92.544743661531669, 44.561957520322856], [-92.565130800734721, 44.563130767352078], [-92.573081810042197, 44.558461344220902], [-92.603729925048142, 44.573912351896958], [-92.616304280163789, 44.588355327887783], [-92.604075908427859, 44.608326220901482], [-92.610489240482892, 44.613596805267505], [-92.592923632332557, 44.621849466238018], [-92.589820538677799, 44.632660851971522], [-92.577286572561349, 44.624574465133435]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "6",
                "sortOrder": 6,
                "title": "Upper Mississippi - Pool 5",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.918108829277756, 44.325783272153949], [-91.902454574528846, 44.292029588209985], [-91.856443645269991, 44.258675769306748], [-91.844066798852822, 44.238221851009357], [-91.808813257684577, 44.208598900353977], [-91.814287638702311, 44.208646884329085], [-91.815364045447211, 44.208649054950186], [-91.823025767744966, 44.20869678737202], [-91.833314230950251, 44.20875737427356], [-91.830141219356705, 44.201162151777112], [-91.836334662421606, 44.189512162637868], [-91.80802238086045, 44.164564512392673], [-91.813038992026023, 44.158931165147727], [-91.878237347654789, 44.199641619893946], [-91.918437784431831, 44.205075886873921], [-91.931784979177351, 44.219831899483864], [-91.947084331571034, 44.227037103258724], [-91.953090951468241, 44.236374712791331], [-91.972524357347595, 44.249542975904504], [-91.986327418726276, 44.268973827129322], [-91.989946757275746, 44.287647054934418], [-91.999992562873175, 44.299606218064881], [-92.001852992401297, 44.323269302209368], [-91.965945035725667, 44.323224188590217], [-91.963059125626259, 44.323216008954859], [-91.956717321360173, 44.323207728337422], [-91.918125737144351, 44.325886968549156], [-91.918108829277756, 44.325783272153949]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "7",
                "sortOrder": 7,
                "title": "Upper Mississippi - Pool 5a",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.808813095092773, 44.208600997924805], [-91.752468109130859, 44.173177719116204], [-91.746505737304688, 44.16673469543457], [-91.747613906860352, 44.15992546081543], [-91.731260299682617, 44.141473770141602], [-91.712926864624023, 44.126077651977539], [-91.693595886230469, 44.117193222045898], [-91.68419075012207, 44.102758407592773], [-91.66578483581543, 44.090143203735344], [-91.686126708984375, 44.078588485717766], [-91.720468521118164, 44.092256546020508], [-91.727895736694336, 44.092226028442383], [-91.728519439697266, 44.092218399047852], [-91.72981071472168, 44.092206954956055], [-91.751739501953125, 44.089860916137695], [-91.762439727783203, 44.114053726196289], [-91.813037872314453, 44.158933639526367], [-91.808021545410156, 44.16456413269043], [-91.836334228515625, 44.189512252807617], [-91.830141067504883, 44.201162338256836], [-91.83331298828125, 44.208757400512695], [-91.823024749755859, 44.208696365356445], [-91.814964294433594, 44.208654403686523], [-91.814287185668945, 44.208646774291985], [-91.808813095092773, 44.208600997924805]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "8",
                "sortOrder": 8,
                "title": "Upper Mississippi - Pool 6",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.720469816755056, 44.092256287382781], [-91.686126500114099, 44.078586325325617], [-91.665785354813437, 44.0901404772912], [-91.626567949012752, 44.072285541203605], [-91.586879447203998, 44.068312580501228], [-91.564871371811776, 44.068564868953139], [-91.553891331838344, 44.071937695184154], [-91.530942971474104, 44.07010075557227], [-91.555358309423809, 44.071276504651436], [-91.553475608104165, 44.068974820551048], [-91.531112295882465, 44.067100309166179], [-91.478474641743745, 44.030685642069201], [-91.425041760168497, 44.018436662425813], [-91.43742274605016, 44.000145317730571], [-91.437291818023084, 44.000065756159202], [-91.436990759010243, 43.999882808370373], [-91.437362456284731, 43.999590786824136], [-91.447449495823037, 43.991152713313106], [-91.480508929576246, 44.006151412735917], [-91.496417076933781, 44.006722155997899], [-91.529270656644997, 44.019007410946614], [-91.615428330650531, 44.027183382951456], [-91.679065462477567, 44.046835265723033], [-91.690570820456969, 44.046355497873762], [-91.720629878946554, 44.063366046955345], [-91.739056886998085, 44.083882745379796], [-91.751740772765558, 44.089860805610279], [-91.72981563554147, 44.092207551852852], [-91.728519656373408, 44.092219317519607], [-91.727895366317583, 44.092226694401816], [-91.720469816755056, 44.092256287382781]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "9",
                "sortOrder": 9,
                "title": "Upper Mississippi - Pool 7",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.423182236000343, 44.018104879695642], [-91.279870283083156, 43.99905990637032], [-91.26516331760881, 43.971796110807986], [-91.248055124761791, 43.963449996020792], [-91.246452499352699, 43.947863223100534], [-91.25555654410411, 43.939809597110433], [-91.217175879333581, 43.912594372224653], [-91.218954212149939, 43.90612617805904], [-91.211622732335954, 43.887851874523307], [-91.230093598985036, 43.888134926159303], [-91.23661807014598, 43.884244504817957], [-91.239531190491803, 43.883603432779204], [-91.240406873927896, 43.88356289783404], [-91.244736941854683, 43.884081507393063], [-91.270705200234772, 43.870889385170003], [-91.27482577160653, 43.868782020948295], [-91.286738217454669, 43.868812102252683], [-91.287134711422908, 43.868813382190609], [-91.287198250160998, 43.868813588138401], [-91.28729324685159, 43.868813896050682], [-91.287732393719011, 43.868815319455095], [-91.287873732971406, 43.868815777577261], [-91.289365922434058, 43.868820614203024], [-91.290518249477884, 43.868811237046017], [-91.290670220736047, 43.868810339107227], [-91.291013209583582, 43.868810328827003], [-91.291111897148468, 43.86881050836935], [-91.291783609598482, 43.868811730416162], [-91.303873354837265, 43.868834361511297], [-91.304861773035483, 43.868314300763672], [-91.312014277979188, 43.86430015907716], [-91.337835825366767, 43.885724364982408], [-91.348013953557412, 43.903473728065705], [-91.362931715643313, 43.911629529374771], [-91.364246372087379, 43.923429323774755], [-91.37752060832122, 43.939748246790671], [-91.399393930773982, 43.958788427646368], [-91.42517056614993, 43.972354746269616], [-91.43424102924682, 43.986493193863893], [-91.447449495823037, 43.991152713313106], [-91.437362456284731, 43.999590786824136], [-91.436990759010243, 43.999882808370373], [-91.437291818023084, 44.000065756159202], [-91.43742274605016, 44.000145317730571], [-91.425041760168497, 44.018436662425813], [-91.423182236000343, 44.018104879695642]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "10",
                "sortOrder": 10,
                "title": "Upper Mississippi - Pool 8",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.229878232303662, 43.885643561706516], [-91.209333231188538, 43.884275214020249], [-91.208470166572056, 43.86917275315205], [-91.202489042638234, 43.866620691597873], [-91.215937534952943, 43.827828540413961], [-91.209109038634594, 43.818550303347848], [-91.214195705140824, 43.810343369353141], [-91.207592063189864, 43.807274934477263], [-91.211487259961842, 43.800995577608475], [-91.201288268006678, 43.785637226125004], [-91.204316800674619, 43.766127673557051], [-91.199827109212194, 43.747177832683334], [-91.200406428849249, 43.721524985649708], [-91.211862969947362, 43.708667858596748], [-91.220471593354205, 43.679301252412081], [-91.218909164211411, 43.6620302739503], [-91.209721762014695, 43.654377612261605], [-91.219278812971282, 43.643150660232763], [-91.22100894912937, 43.600868753287138], [-91.228550650110421, 43.570169501982001], [-91.228597476628636, 43.570173073431626], [-91.235578370038908, 43.570684076666723], [-91.235624829863156, 43.572273977884699], [-91.235639092135571, 43.576505637822706], [-91.235636515574583, 43.576618524749719], [-91.235639352433935, 43.576631989838141], [-91.235650878345368, 43.576762807574518], [-91.235636235826448, 43.576918814975386], [-91.235590818089932, 43.577414661308886], [-91.235604484968675, 43.578195943243855], [-91.235642653143614, 43.580251677864524], [-91.235563785638547, 43.581181665262633], [-91.235577341457144, 43.581533719599875], [-91.235680224028329, 43.581639382350417], [-91.235980189804181, 43.582028743876023], [-91.23705312293977, 43.582971741234616], [-91.237570466922179, 43.583445190436947], [-91.237713714074275, 43.583585521591559], [-91.237743810270388, 43.583616931968258], [-91.23822929102873, 43.584058290826341], [-91.24262232460103, 43.588056065847233], [-91.242685976936784, 43.588106303342286], [-91.245134697082818, 43.5898996193268], [-91.256573300187441, 43.598445798631211], [-91.256582957115214, 43.598457207258676], [-91.258351552495952, 43.600598172445061], [-91.2583650090139, 43.600602480921566], [-91.258433095577132, 43.600639236718635], [-91.265589907323829, 43.601555904842442], [-91.266203909890478, 43.601770282372129], [-91.26804637579157, 43.602032309983557], [-91.269004382412803, 43.602136857207768], [-91.269426518111288, 43.602052566548878], [-91.269596139075944, 43.602051275292439], [-91.270012501662137, 43.602138905959166], [-91.271993096145223, 43.602454643592701], [-91.272795668785292, 43.602571709577973], [-91.271015391343482, 43.622520429544991], [-91.279005143540658, 43.686963875823245], [-91.270724783577535, 43.700614567624882], [-91.275133504458964, 43.7222439775758], [-91.272073214924205, 43.733225830282564], [-91.281310929608509, 43.745831313067704], [-91.282204933842891, 43.759469451872121], [-91.295870667180367, 43.771014044475955], [-91.303615184731271, 43.791238295955083], [-91.300977178712301, 43.796705834750128], [-91.306269228839753, 43.823856171895649], [-91.29772229430391, 43.845386014085427], [-91.311768252206889, 43.864118021851596], [-91.304861773035483, 43.868314300763672], [-91.303754244126381, 43.868981888907555], [-91.291783609598482, 43.868811730416162], [-91.291277754167169, 43.868805688609555], [-91.291111897148468, 43.86881050836935], [-91.291078557422551, 43.868811162050271], [-91.291013209583582, 43.868810328827003], [-91.290756048399686, 43.868807049871236], [-91.290670220736047, 43.868810339107227], [-91.290617704479814, 43.868812351725921], [-91.290518249477884, 43.868811237046017], [-91.287873732971406, 43.868815777577261], [-91.287837778666272, 43.868816816542079], [-91.287732393719011, 43.868815319455095], [-91.287349230007479, 43.868811603797809], [-91.28729324685159, 43.868813896050682], [-91.287270695135462, 43.868815404009418], [-91.287198250160998, 43.868813588138401], [-91.287178955056106, 43.868812463989187], [-91.287134711422908, 43.868813382190609], [-91.287088100655922, 43.868814349517905], [-91.286835530435013, 43.868812518572284], [-91.286766578647985, 43.868813282290702], [-91.286738217454669, 43.868812102252683], [-91.275348182965843, 43.868824288460189], [-91.270705200234772, 43.870889385170003], [-91.254227218907971, 43.876986981963803], [-91.244736941854683, 43.884081507393063], [-91.239738761489079, 43.883633034039676], [-91.23661807014598, 43.884244504817957], [-91.229878232303662, 43.885643561706516]], [[-91.297458831384247, 43.838910024735583], [-91.296232632257116, 43.831626177321127], [-91.297077652859855, 43.845264031755143], [-91.297458831384247, 43.838910024735583]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "11",
                "sortOrder": 11,
                "title": "Upper Mississippi - Pool 9",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.270391642275513, 43.602191485874506], [-91.270012501662137, 43.602138905959166], [-91.269426518111288, 43.602052566548878], [-91.265589907323829, 43.601555904842442], [-91.258433095577132, 43.600639236718635], [-91.2583650090139, 43.600602480921566], [-91.258351552495952, 43.600598172445061], [-91.256582957115214, 43.598457207258676], [-91.256573300187441, 43.598445798631211], [-91.245134697082818, 43.5898996193268], [-91.242685976936784, 43.588106303342286], [-91.24262232460103, 43.588056065847233], [-91.23822929102873, 43.584058290826341], [-91.237743810270388, 43.583616931968258], [-91.237713714074275, 43.583585521591559], [-91.237570466922179, 43.583445190436947], [-91.23705312293977, 43.582971741234616], [-91.235980189804181, 43.582028743876023], [-91.235680224028329, 43.581639382350417], [-91.235563785638547, 43.581181665262633], [-91.235604484968675, 43.578195943243855], [-91.235636235826448, 43.576918814975386], [-91.235639352433935, 43.576631989838141], [-91.235639092135571, 43.576505637822706], [-91.235517951347433, 43.574203629179891], [-91.235624829863156, 43.572273977884699], [-91.235732296742725, 43.570834832928604], [-91.235576502135473, 43.570549081148499], [-91.235169800066558, 43.570294203918245], [-91.228597476628636, 43.570173073431626], [-91.228538709984463, 43.570429275990975], [-91.228550650110421, 43.570169501982001], [-91.226342416490894, 43.53378721135941], [-91.215588886870606, 43.523283327246773], [-91.212831378617594, 43.510017945482517], [-91.215519175277947, 43.473211162134866], [-91.211857932251235, 43.448001228252025], [-91.188031105090346, 43.40107504259565], [-91.153074146226331, 43.372103201130201], [-91.079419726512526, 43.339262638013281], [-91.059680401878765, 43.317927156716486], [-91.052759088108743, 43.303110167273815], [-91.047580529395603, 43.278273793865253], [-91.058680532950405, 43.244786878108307], [-91.078034267878593, 43.224133796769564], [-91.098238664624986, 43.210730922428262], [-91.098353071539705, 43.210826287677563], [-91.098420848028923, 43.210873528038512], [-91.098440693611707, 43.210890752957781], [-91.098473566003705, 43.210919284460367], [-91.098531030452378, 43.210962560926511], [-91.098637971878674, 43.211042424574472], [-91.098689951628231, 43.211079502183097], [-91.098773225811172, 43.211143466832233], [-91.098879132360025, 43.211217712424485], [-91.098915923668343, 43.211245229529787], [-91.099108588267285, 43.211387187498545], [-91.099308457916024, 43.211529463608727], [-91.099458567477058, 43.211631841169293], [-91.099845063868145, 43.211775171161875], [-91.102705379663377, 43.213398416574449], [-91.114923201565404, 43.222258110871856], [-91.115018294239562, 43.222345482634481], [-91.116110511475426, 43.223193842857619], [-91.116195503096108, 43.223274051581726], [-91.121397629595435, 43.229838224291292], [-91.121498610013433, 43.230033475966202], [-91.121968427915604, 43.231049674267538], [-91.122085722920446, 43.231290214227755], [-91.122857748154843, 43.232315872727838], [-91.122942004605292, 43.232395814129596], [-91.123033850823916, 43.232436900383824], [-91.123072002536276, 43.232788157951745], [-91.110112231811712, 43.244162701243184], [-91.093958922662225, 43.269273145726281], [-91.091905718192038, 43.286747651179411], [-91.096538516062978, 43.298877013638901], [-91.130327333275133, 43.324893874322498], [-91.161883424540505, 43.334895928712022], [-91.170491844718271, 43.333359213610983], [-91.181767861739544, 43.343839864984332], [-91.205928235073145, 43.348750614506912], [-91.260140944680757, 43.409988157293157], [-91.274006292531709, 43.451040738139454], [-91.304485912894691, 43.48030058942701], [-91.30320863341376, 43.487664935263453], [-91.281677590685746, 43.506467908790626], [-91.277381823284486, 43.583782987695201], [-91.281735816517283, 43.594252466987591], [-91.272795668785292, 43.602571709577973], [-91.27252730809208, 43.602605350044115], [-91.271993096145223, 43.602454643592701], [-91.270391642275513, 43.602191485874506]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "12",
                "sortOrder": 12,
                "title": "Upper Mississippi - Pool 10",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.102705001831055, 43.213399887084961], [-91.099843978881836, 43.211774826049805], [-91.099458694457994, 43.211633682250977], [-91.099308013916016, 43.211530685424805], [-91.09910774230957, 43.211389541625977], [-91.098915100097642, 43.211244583129883], [-91.098878860473633, 43.211217880249023], [-91.098772048950195, 43.211145401000969], [-91.09869003295897, 43.211080551147454], [-91.098636627197266, 43.211042404174805], [-91.098529815673828, 43.210962295532219], [-91.098472595214844, 43.210920333862298], [-91.098440170288086, 43.21088981628418], [-91.098421096801758, 43.210874557495117], [-91.098352432250977, 43.21082878112793], [-91.098237991333008, 43.210733413696289], [-91.131114959716783, 43.175287246704094], [-91.142570495605455, 43.142778396606445], [-91.135419845581055, 43.066289901733398], [-91.12584114074707, 43.04411506652832], [-91.105472564697266, 43.016687393188477], [-91.111120223999023, 43.009618759155266], [-91.107036590576158, 43.006959915161133], [-91.106729507446275, 42.994977951049805], [-91.121753692626939, 42.995512008666992], [-91.131612777709961, 42.989858627319336], [-91.142147064208984, 42.940744400024414], [-91.133138656616211, 42.928041458129883], [-91.089569091796875, 42.90191459655761], [-91.078670501708984, 42.889158248901367], [-91.071689605712891, 42.856180191040039], [-91.076547622680664, 42.820158004760742], [-91.070901870727539, 42.789445877075188], [-91.071235656738281, 42.789304733276367], [-91.071350097656236, 42.789281845092773], [-91.075748443603516, 42.788652420043945], [-91.076089859008775, 42.788629531860344], [-91.107030868530273, 42.781686782836914], [-91.110002517700181, 42.802064895629883], [-91.104602813720703, 42.875730514526367], [-91.150691986083984, 42.906789779663086], [-91.171838760375962, 42.936464309692383], [-91.159152984619141, 42.988595962524407], [-91.178516387939439, 43.041940689086914], [-91.180675506591797, 43.08344841003418], [-91.185356140136719, 43.088472366333008], [-91.179285049438462, 43.09300422668457], [-91.178340911865234, 43.105138778686523], [-91.186201095581055, 43.150358200073242], [-91.176418304443359, 43.174287796020501], [-91.153913497924805, 43.208356857299805], [-91.123071670532227, 43.232789993286133], [-91.12303352355957, 43.232439041137695], [-91.122941970825195, 43.232397079467773], [-91.122858047485352, 43.232316970825195], [-91.122085571289062, 43.231290817260742], [-91.121967315673828, 43.231050491333008], [-91.121498107910156, 43.230035781860352], [-91.121397018432617, 43.229837417602539], [-91.116195678710938, 43.223276138305664], [-91.116109848022461, 43.223196029663086], [-91.115016937255859, 43.222345352172844], [-91.114923477172852, 43.222257614135742], [-91.102705001831055, 43.213399887084961]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "13",
                "sortOrder": 13,
                "title": "Upper Mississippi - Pool 11",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.070838928222656, 42.789464950561523], [-91.055078506469727, 42.760454177856445], [-91.038301467895508, 42.744241714477539], [-90.969936370849609, 42.706819534301758], [-90.840169906616197, 42.679231643676758], [-90.708057403564453, 42.661916732788086], [-90.690921783447251, 42.651712417602539], [-90.665279388427734, 42.612363815307617], [-90.661012649536133, 42.574773788452148], [-90.640232086181641, 42.56553840637207], [-90.628484725952134, 42.554193496704102], [-90.623495101928711, 42.545171737670898], [-90.623634338378906, 42.54511833190918], [-90.623687744140625, 42.545095443725586], [-90.623788833618164, 42.545053482055664], [-90.623819351196289, 42.545042037963867], [-90.623954772949219, 42.545011520385742], [-90.624095916748047, 42.544977188110352], [-90.624212265014648, 42.544946670532227], [-90.624591827392578, 42.544855117797852], [-90.624809265136705, 42.544801712036133], [-90.625064849853516, 42.544736862182617], [-90.6251220703125, 42.54472541809082], [-90.626340866088867, 42.544462203979492], [-90.626453399658203, 42.544454574584954], [-90.626502990722656, 42.544443130493164], [-90.626705169677734, 42.544466018676751], [-90.627601623535156, 42.54432487487793], [-90.628355026245103, 42.544240951538086], [-90.639318466186523, 42.542043685913086], [-90.639995574951172, 42.541883468627923], [-90.640308380126953, 42.541830062866204], [-90.646760940551758, 42.539667129516594], [-90.647127151489258, 42.539560317993157], [-90.647148132324219, 42.539552688598633], [-90.647188186645508, 42.53953742980957], [-90.64723014831543, 42.539525985717773], [-90.647270202636719, 42.539510726928711], [-90.647296905517578, 42.53950309753418], [-90.64735221862793, 42.539484024047844], [-90.64739990234375, 42.539480209350586], [-90.647417068481445, 42.539480209350586], [-90.661916732788086, 42.549676895141602], [-90.700956344604492, 42.564947128295898], [-90.702297210693359, 42.573732376098633], [-90.694438934326172, 42.593812942504883], [-90.703840255737305, 42.60966682434082], [-90.707668304443359, 42.60875129699707], [-90.708606719970689, 42.630475997924805], [-90.720600128173828, 42.637723922729492], [-90.926918029785156, 42.675058364868164], [-90.941370010375977, 42.681795120239258], [-90.989543914794922, 42.69084358215332], [-91.045740127563477, 42.711126327514648], [-91.050500869750977, 42.706052780151367], [-91.062196731567383, 42.708761215209961], [-91.075639724731431, 42.703035354614251], [-91.072343826293945, 42.727651596069336], [-91.08941650390625, 42.744550704956048], [-91.107030868530273, 42.781686782836914], [-91.076089859008775, 42.788629531860344], [-91.075748443603516, 42.788652420043945], [-91.071352005004883, 42.789281845092773], [-91.071235656738281, 42.789304733276367], [-91.070901870727539, 42.789445877075188], [-91.070838928222656, 42.789464950561523]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "14",
                "sortOrder": 14,
                "title": "Upper Mississippi - Pool 12",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.623195648193359, 42.544466018676751], [-90.625247955322266, 42.527139663696289], [-90.646051406860352, 42.49482536315918], [-90.620780944824219, 42.47608757019043], [-90.584033966064453, 42.465547561645508], [-90.586215972900391, 42.462015151977539], [-90.552211761474609, 42.432783126831048], [-90.50306510925293, 42.414209365844727], [-90.443601608276367, 42.374658584594727], [-90.424417495727539, 42.354936599731445], [-90.402530670166001, 42.341135025024414], [-90.398305892944336, 42.334638595581055], [-90.405483245849609, 42.293413162231445], [-90.401926040649414, 42.286825180053711], [-90.400894165039062, 42.286340713500977], [-90.398706436157227, 42.284204483032227], [-90.390422821044922, 42.277948379516602], [-90.387641906738281, 42.276063919067376], [-90.387607574462891, 42.275911331176758], [-90.387647628784165, 42.275861740112305], [-90.387815475463867, 42.275659561157227], [-90.387840270996094, 42.27563285827636], [-90.388154983520508, 42.275350570678711], [-90.388381958007798, 42.275144577026367], [-90.388423919677734, 42.27509880065918], [-90.388679504394531, 42.274847030639648], [-90.388978958129883, 42.274568557739251], [-90.389102935791001, 42.274469375610352], [-90.389177322387695, 42.274408340454102], [-90.389366149902344, 42.27424430847168], [-90.389486312866211, 42.274141311645508], [-90.389554977416992, 42.274087905883789], [-90.389873504638672, 42.273855209350586], [-90.389930725097642, 42.27381706237793], [-90.39007568359375, 42.273698806762695], [-90.392005920410156, 42.272089004516602], [-90.392036437988281, 42.272062301635735], [-90.392904281616211, 42.271402359008789], [-90.392944335937486, 42.271364212036133], [-90.393478393554688, 42.270986557006829], [-90.393892288208008, 42.270757675170898], [-90.393930435180664, 42.270742416381836], [-90.394119262695312, 42.270696640014648], [-90.394269943237305, 42.270635604858398], [-90.394538879394531, 42.270536422729492], [-90.394601821899414, 42.270517349243164], [-90.394872665405273, 42.270429611206055], [-90.395538330078125, 42.270177841186523], [-90.395666122436523, 42.270139694213867], [-90.395753860473633, 42.270105361938477], [-90.39582633972168, 42.270074844360352], [-90.398580551147461, 42.26896858215332], [-90.398689270019517, 42.26893424987793], [-90.398954391479492, 42.268827438354492], [-90.39903450012207, 42.268789291381836], [-90.399063110351562, 42.268777847290039], [-90.399187088012695, 42.268728256225586], [-90.399269104003892, 42.268693923950188], [-90.39941024780272, 42.268632888793945], [-90.399599075317369, 42.268548965454102], [-90.399734497070312, 42.26850700378418], [-90.400053024291992, 42.268365859985352], [-90.40040397644043, 42.268259048461914], [-90.400600433349609, 42.268186569213867], [-90.400630950927734, 42.268178939819336], [-90.400808334350586, 42.268133163452148], [-90.400949478149414, 42.268083572387695], [-90.40119743347168, 42.268003463745117], [-90.401412963867188, 42.267946243286133], [-90.401462554931641, 42.267923355102539], [-90.401538848876953, 42.267889022827148], [-90.40184211730957, 42.267786026000977], [-90.401889801025391, 42.267770767211914], [-90.40203857421875, 42.26771354675293], [-90.402585983276367, 42.267526626586914], [-90.402647018432617, 42.267499923706048], [-90.403152465820312, 42.267267227172852], [-90.403301239013672, 42.267206192016602], [-90.403432846069336, 42.26713752746582], [-90.403596878051758, 42.267045974731445], [-90.403657913208008, 42.267015457153313], [-90.403741836547852, 42.266984939575195], [-90.403804779052734, 42.26695442199707], [-90.404016494750977, 42.266862869262695], [-90.40437126159668, 42.266714096069329], [-90.405134201049805, 42.266462326049805], [-90.405237197875962, 42.266424179077141], [-90.405321121215806, 42.266393661499023], [-90.405660629272461, 42.266267776489258], [-90.406099319458008, 42.266122817993157], [-90.406280517578125, 42.266054153442383], [-90.406791687011719, 42.265848159790039], [-90.407024383544922, 42.265748977661133], [-90.407539367675781, 42.265520095825188], [-90.408214569091797, 42.265230178833001], [-90.408313751220703, 42.265195846557617], [-90.408594131469712, 42.265096664428711], [-90.409072875976562, 42.26490592956543], [-90.409145355224609, 42.264886856079102], [-90.409225463867188, 42.264863967895501], [-90.409347534179688, 42.264806747436523], [-90.409440994262695, 42.264772415161133], [-90.409477233886719, 42.264760971069336], [-90.409542083740234, 42.264741897583008], [-90.410121917724609, 42.264574050903313], [-90.410329818725586, 42.264482498168945], [-90.410682678222656, 42.264326095581048], [-90.411043167114258, 42.264200210571289], [-90.411653518676758, 42.263986587524414], [-90.411947250366211, 42.263875961303711], [-90.41307258605957, 42.263425827026367], [-90.413225173950195, 42.263368606567376], [-90.413412094116211, 42.26329231262207], [-90.413530349731445, 42.26325798034668], [-90.413562774658203, 42.263246536254883], [-90.413755416870117, 42.263174057006836], [-90.413898468017578, 42.263124465942383], [-90.413915634155273, 42.263116836547852], [-90.414173126220703, 42.263044357299805], [-90.414295196533203, 42.263010025024414], [-90.414722442626953, 42.262887954711914], [-90.414770126342773, 42.262880325317383], [-90.414812088012681, 42.262887954711914], [-90.41490364074707, 42.262868881225586], [-90.415094375610352, 42.262792587280273], [-90.415124893188477, 42.262784957885742], [-90.415182113647461, 42.262781143188477], [-90.41536712646483, 42.262731552124023], [-90.416103363037109, 42.26258659362793], [-90.416126251220703, 42.262582778930664], [-90.416698455810547, 42.262434005737305], [-90.416746139526367, 42.262426376342773], [-90.416906356811523, 42.262392044067383], [-90.4169406890869, 42.262380599975586], [-90.417482376098633, 42.262273788452148], [-90.417539596557617, 42.26225471496582], [-90.417591094970689, 42.262262344360352], [-90.417669296264648, 42.262228012084954], [-90.417688369750977, 42.262224197387695], [-90.418666839599595, 42.261983871459961], [-90.418840408325195, 42.261922836303711], [-90.41893196105957, 42.261892318725586], [-90.418970108032227, 42.261884689331048], [-90.419113159179688, 42.261835098266602], [-90.419286727905273, 42.261785507202148], [-90.419607162475586, 42.261701583862298], [-90.420143127441392, 42.261552810668945], [-90.420425415039062, 42.26148796081543], [-90.42048454284668, 42.261468887329102], [-90.420557022094712, 42.261445999145508], [-90.421085357666016, 42.261312484741211], [-90.421426773071289, 42.26124382019043], [-90.421680450439439, 42.261186599731445], [-90.421733856201172, 42.261171340942383], [-90.421783447265625, 42.261175155639648], [-90.421815872192383, 42.26118278503418], [-90.421836853027344, 42.261194229125977], [-90.421854019165039, 42.261205673217773], [-90.421928405761705, 42.26146125793457], [-90.421960830688477, 42.261507034301751], [-90.421977996826172, 42.26152229309082], [-90.422002792358398, 42.261537551879883], [-90.422088623046875, 42.261583328247063], [-90.422239303588867, 42.261648178100579], [-90.42222404479979, 42.261602401733398], [-90.422220230102539, 42.261590957641602], [-90.422183990478516, 42.261503219604492], [-90.422147750854492, 42.261343002319336], [-90.422170639038086, 42.261308670043945], [-90.422203063964844, 42.261289596557617], [-90.422239303588867, 42.261281967163079], [-90.42225456237793, 42.26127815246582], [-90.422294616699205, 42.261270523071282], [-90.422309875488281, 42.261274337768555], [-90.42237663269043, 42.261308670043945], [-90.422391891479492, 42.26133918762207], [-90.422422409057617, 42.261388778686516], [-90.422433853149414, 42.261400222778313], [-90.422472000122056, 42.261445999145508], [-90.422487258911133, 42.26148796081543], [-90.422500610351562, 42.26152229309082], [-90.422534942626953, 42.261568069458008], [-90.422632217407227, 42.26164436340332], [-90.422706604003906, 42.261659622192383], [-90.422750473022461, 42.261667251586914], [-90.422872543334961, 42.261686325073242], [-90.422952651977539, 42.261674880981445], [-90.423044204711914, 42.261663436889648], [-90.423120498657227, 42.26164436340332], [-90.423168182373047, 42.261636734008782], [-90.423273086547852, 42.261613845825195], [-90.423341751098633, 42.261598587036133], [-90.42371940612793, 42.261495590209961], [-90.42384147644043, 42.261468887329102], [-90.423921585083008, 42.261449813842773], [-90.42418098449707, 42.261377334594727], [-90.424343109130859, 42.261350631713867], [-90.424358367919922, 42.261350631713867], [-90.424474716186523, 42.26130485534668], [-90.424919128417955, 42.261159896850586], [-90.425193786621094, 42.261068344116211], [-90.425277709960938, 42.261041641235352], [-90.425405502319336, 42.26099967956543], [-90.425416946411133, 42.260995864868164], [-90.425443649291992, 42.260988235473633], [-90.425617218017564, 42.260950088500977], [-90.425785064697266, 42.260919570922852], [-90.42589950561522, 42.260900497436523], [-90.425987243652344, 42.260900497436523], [-90.426015853881836, 42.260896682739258], [-90.426059722900391, 42.260889053344727], [-90.42622184753418, 42.26086235046386], [-90.426275253295898, 42.260843276977539], [-90.426445007324205, 42.260812759399414], [-90.426538467407212, 42.260786056518555], [-90.426887512207031, 42.260717391967773], [-90.427129745483384, 42.26067924499511], [-90.427284240722642, 42.260656356811523], [-90.427316665649414, 42.260644912719727], [-90.427692413330078, 42.260564804077148], [-90.428291320800781, 42.260419845581055], [-90.428791046142578, 42.26030158996582], [-90.428838729858398, 42.260290145874023], [-90.428972244262695, 42.260278701782227], [-90.429035186767578, 42.26026725769043], [-90.429399490356431, 42.260175704956055], [-90.429475784301758, 42.260149002075195], [-90.430231094360352, 42.25999641418457], [-90.430255889892578, 42.259988784790039], [-90.430912017822251, 42.259771347045898], [-90.431055068969712, 42.25971794128418], [-90.431589126586914, 42.259584426879883], [-90.431657791137681, 42.259546279907227], [-90.432172775268555, 42.261716842651367], [-90.427103042602539, 42.262094497680664], [-90.44085693359375, 42.301298141479492], [-90.431087493896484, 42.329668045043945], [-90.434890747070312, 42.339170455932617], [-90.462781906127915, 42.365510940551758], [-90.500997543334947, 42.391645431518555], [-90.580760955810547, 42.425149917602539], [-90.598039627075195, 42.446386337280273], [-90.622230529785142, 42.455465316772461], [-90.654628753662109, 42.475873947143555], [-90.66541862487793, 42.488908767700188], [-90.672075271606445, 42.506399154663086], [-90.647415161132812, 42.539480209350586], [-90.64739990234375, 42.539480209350586], [-90.64735221862793, 42.539484024047844], [-90.647296905517578, 42.53950309753418], [-90.647270202636719, 42.539510726928711], [-90.64723014831543, 42.539525985717773], [-90.647188186645508, 42.53953742980957], [-90.647148132324219, 42.539552688598633], [-90.647127151489258, 42.539560317993157], [-90.646760940551758, 42.539667129516594], [-90.640304565429673, 42.541830062866204], [-90.639995574951172, 42.541883468627923], [-90.639318466186523, 42.542043685913086], [-90.628355026245103, 42.544240951538086], [-90.627601623535156, 42.54432487487793], [-90.626705169677734, 42.544466018676751], [-90.626502990722656, 42.544443130493164], [-90.626453399658203, 42.544454574584954], [-90.626340866088867, 42.544462203979492], [-90.6251220703125, 42.54472541809082], [-90.625064849853516, 42.544736862182617], [-90.624809265136705, 42.544801712036133], [-90.624591827392578, 42.544855117797852], [-90.624212265014648, 42.544946670532227], [-90.624095916748047, 42.544977188110352], [-90.623954772949219, 42.545011520385742], [-90.623819351196289, 42.545042037963867], [-90.623788833618164, 42.545053482055664], [-90.623495101928711, 42.545171737670898], [-90.623195648193359, 42.544466018676751]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "15",
                "sortOrder": 15,
                "title": "Upper Mississippi - Pool 13",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.376174926757812, 42.267488479614258], [-90.349521636962891, 42.26579475402832], [-90.33091926574707, 42.256052017211914], [-90.328218460083008, 42.244760513305664], [-90.306921005249023, 42.234750747680657], [-90.293445587158203, 42.213720321655273], [-90.280271530151367, 42.205415725708008], [-90.268424987792955, 42.20448112487793], [-90.27125358581543, 42.207704544067376], [-90.267755508422852, 42.21318244934082], [-90.261135101318359, 42.214887619018555], [-90.242403030395508, 42.204748153686523], [-90.226804733276367, 42.207681655883789], [-90.196765899658189, 42.195768356323242], [-90.187183380126953, 42.18311882019043], [-90.184122085571289, 42.162973403930664], [-90.158041000366197, 42.127202987670898], [-90.158781051635742, 42.108339309692376], [-90.153455734252915, 42.093542098999023], [-90.118659973144531, 42.086977005004883], [-90.08814811706543, 42.072694778442383], [-90.09192848205565, 42.071039199829102], [-90.091005325317383, 42.064870834350586], [-90.076591491699219, 42.048192977905273], [-90.070932388305664, 42.032678604125977], [-90.07213020324707, 42.007028579711914], [-90.066247940063477, 42.000837326049805], [-90.068607330322266, 41.97706413269043], [-90.065998077392578, 41.970514297485352], [-90.060548782348633, 41.969930648803711], [-90.055702209472656, 41.95225715637207], [-90.07487678527832, 41.902204513549805], [-90.116615295410156, 41.900415420532227], [-90.117073059082031, 41.900533676147461], [-90.117090225219727, 41.900537490844727], [-90.151163101196275, 41.89838981628418], [-90.151584625244141, 41.898324966430664], [-90.173633575439439, 41.897462844848626], [-90.180061340332031, 41.906621932983398], [-90.18614387512207, 41.949495315551758], [-90.195905685424805, 41.96571159362793], [-90.19073486328125, 41.971555709838867], [-90.179801940917969, 41.971323013305664], [-90.160743713378906, 41.994333267211914], [-90.159217834472656, 42.00471305847168], [-90.168581008911133, 42.041727066040039], [-90.191030502319336, 42.070474624633789], [-90.195833206176744, 42.069150924682617], [-90.203502655029297, 42.079645156860352], [-90.201766967773423, 42.099905014038079], [-90.193077087402344, 42.112112045288086], [-90.194946289062486, 42.119810104370117], [-90.213441848754883, 42.13683891296386], [-90.229326248168945, 42.144689559936523], [-90.260629653930664, 42.120458602905273], [-90.276599884033203, 42.115312576293945], [-90.329992294311523, 42.154752731323242], [-90.325675964355469, 42.158510208129883], [-90.339035034179688, 42.171968460083008], [-90.382635116577148, 42.199758529663086], [-90.386028289794908, 42.219079971313477], [-90.412696838378892, 42.23956108093261], [-90.416927337646484, 42.247610092163086], [-90.431066513061509, 42.253274917602539], [-90.431657791137681, 42.259546279907227], [-90.431591033935547, 42.259584426879883], [-90.431055068969712, 42.25971794128418], [-90.430912017822251, 42.259771347045898], [-90.430255889892578, 42.259988784790039], [-90.430231094360352, 42.25999641418457], [-90.429475784301758, 42.260149002075195], [-90.429399490356431, 42.260175704956055], [-90.429035186767578, 42.26026725769043], [-90.428972244262695, 42.260278701782227], [-90.428838729858398, 42.260290145874023], [-90.428791046142578, 42.26030158996582], [-90.428291320800781, 42.260419845581055], [-90.427692413330078, 42.260564804077148], [-90.427316665649414, 42.260644912719727], [-90.427284240722642, 42.260656356811523], [-90.427129745483384, 42.26067924499511], [-90.426887512207031, 42.260717391967773], [-90.426538467407212, 42.260786056518555], [-90.426445007324205, 42.260812759399414], [-90.426275253295898, 42.260843276977539], [-90.42622184753418, 42.26086235046386], [-90.426059722900391, 42.260889053344727], [-90.426015853881836, 42.260896682739258], [-90.425987243652344, 42.260900497436523], [-90.42589950561522, 42.260900497436523], [-90.425785064697266, 42.260919570922852], [-90.425617218017564, 42.260950088500977], [-90.425443649291992, 42.260988235473633], [-90.425416946411133, 42.260995864868164], [-90.425405502319336, 42.26099967956543], [-90.425277709960938, 42.261041641235352], [-90.425193786621094, 42.261068344116211], [-90.424919128417955, 42.261159896850586], [-90.424474716186523, 42.26130485534668], [-90.424358367919922, 42.261350631713867], [-90.424343109130859, 42.261350631713867], [-90.42418098449707, 42.261377334594727], [-90.423921585083008, 42.261449813842773], [-90.42384147644043, 42.261468887329102], [-90.42371940612793, 42.261495590209961], [-90.423341751098633, 42.261598587036133], [-90.423273086547852, 42.261613845825195], [-90.423168182373047, 42.261636734008782], [-90.423120498657227, 42.26164436340332], [-90.423044204711914, 42.261663436889648], [-90.422952651977539, 42.261674880981445], [-90.422876358032227, 42.261690139770501], [-90.422750473022461, 42.261667251586914], [-90.422706604003906, 42.261659622192383], [-90.422632217407227, 42.26164436340332], [-90.422534942626953, 42.261568069458008], [-90.422500610351562, 42.26152229309082], [-90.422487258911133, 42.26148796081543], [-90.422472000122056, 42.261445999145508], [-90.422433853149414, 42.261400222778313], [-90.422422409057617, 42.261388778686516], [-90.422391891479492, 42.26133918762207], [-90.42237663269043, 42.261308670043945], [-90.422309875488281, 42.261274337768555], [-90.422294616699205, 42.261270523071282], [-90.422269821166992, 42.261270523071282], [-90.42225456237793, 42.26127815246582], [-90.422239303588867, 42.261281967163079], [-90.422203063964844, 42.261289596557617], [-90.422170639038086, 42.261308670043945], [-90.422143936157227, 42.261327743530273], [-90.422147750854492, 42.261343002319336], [-90.422183990478516, 42.261503219604492], [-90.422220230102539, 42.261590957641602], [-90.42222404479979, 42.261602401733398], [-90.422239303588867, 42.261648178100579], [-90.422134399414062, 42.26161003112793], [-90.422088623046875, 42.261583328247063], [-90.422002792358398, 42.261537551879883], [-90.421977996826172, 42.26152229309082], [-90.421960830688477, 42.261507034301751], [-90.421928405761705, 42.26146125793457], [-90.421854019165039, 42.261205673217773], [-90.421836853027344, 42.261194229125977], [-90.421815872192383, 42.26118278503418], [-90.421783447265625, 42.261175155639648], [-90.421741485595703, 42.261171340942383], [-90.421680450439439, 42.261186599731445], [-90.421426773071289, 42.26124382019043], [-90.421085357666016, 42.261312484741211], [-90.420557022094712, 42.261445999145508], [-90.42048454284668, 42.261468887329102], [-90.420425415039062, 42.26148796081543], [-90.420143127441392, 42.261552810668945], [-90.419607162475586, 42.261701583862298], [-90.419286727905273, 42.261785507202148], [-90.419113159179688, 42.261835098266602], [-90.418970108032227, 42.261884689331048], [-90.41893196105957, 42.261892318725586], [-90.418840408325195, 42.261922836303711], [-90.418666839599595, 42.261983871459961], [-90.417688369750977, 42.262224197387695], [-90.417671203613281, 42.262228012084954], [-90.417591094970689, 42.262262344360352], [-90.417537689208984, 42.26225471496582], [-90.417482376098633, 42.262273788452148], [-90.4169406890869, 42.262380599975586], [-90.416906356811523, 42.262392044067383], [-90.416746139526367, 42.262426376342773], [-90.416698455810547, 42.262434005737305], [-90.416126251220703, 42.262582778930664], [-90.416103363037109, 42.26258659362793], [-90.41536712646483, 42.262731552124023], [-90.415182113647461, 42.262781143188477], [-90.415124893188477, 42.262784957885742], [-90.415094375610352, 42.262792587280273], [-90.41490364074707, 42.262868881225586], [-90.414812088012681, 42.262887954711914], [-90.414772033691406, 42.262880325317383], [-90.414722442626953, 42.262887954711914], [-90.414295196533203, 42.263010025024414], [-90.414173126220703, 42.263044357299805], [-90.413915634155273, 42.263116836547852], [-90.413898468017578, 42.263124465942383], [-90.413755416870117, 42.263174057006836], [-90.413562774658203, 42.263246536254883], [-90.413530349731445, 42.26325798034668], [-90.413412094116211, 42.26329231262207], [-90.413225173950195, 42.263368606567376], [-90.41307258605957, 42.263425827026367], [-90.411947250366211, 42.263875961303711], [-90.411653518676758, 42.263986587524414], [-90.411043167114258, 42.264200210571289], [-90.410682678222656, 42.264326095581048], [-90.410329818725586, 42.264482498168945], [-90.410121917724609, 42.264574050903313], [-90.409542083740234, 42.264741897583008], [-90.409477233886719, 42.264760971069336], [-90.409440994262695, 42.264772415161133], [-90.409347534179688, 42.264806747436523], [-90.409225463867188, 42.264863967895501], [-90.409145355224609, 42.264886856079102], [-90.409072875976562, 42.26490592956543], [-90.408594131469712, 42.265096664428711], [-90.408313751220703, 42.265195846557617], [-90.408214569091797, 42.265230178833001], [-90.407539367675781, 42.265520095825188], [-90.407024383544922, 42.265748977661133], [-90.406791687011719, 42.265848159790039], [-90.406280517578125, 42.266054153442383], [-90.406099319458008, 42.266122817993157], [-90.405660629272461, 42.266267776489258], [-90.405321121215806, 42.266393661499023], [-90.405237197875962, 42.266424179077141], [-90.405134201049805, 42.266462326049805], [-90.40437126159668, 42.266714096069329], [-90.404016494750977, 42.266862869262695], [-90.403804779052734, 42.26695442199707], [-90.403741836547852, 42.266984939575195], [-90.403657913208008, 42.267015457153313], [-90.403596878051758, 42.267045974731445], [-90.403432846069336, 42.26713752746582], [-90.403301239013672, 42.267206192016602], [-90.403152465820312, 42.267267227172852], [-90.402647018432617, 42.267499923706048], [-90.402585983276367, 42.267526626586914], [-90.40203857421875, 42.26771354675293], [-90.401889801025391, 42.267770767211914], [-90.40184211730957, 42.267786026000977], [-90.401538848876953, 42.267889022827148], [-90.401462554931641, 42.267923355102539], [-90.401412963867188, 42.267946243286133], [-90.40119743347168, 42.268003463745117], [-90.400949478149414, 42.268083572387695], [-90.400808334350586, 42.268133163452148], [-90.400630950927734, 42.268178939819336], [-90.400600433349609, 42.268186569213867], [-90.40040397644043, 42.268259048461914], [-90.400053024291992, 42.268365859985352], [-90.399734497070312, 42.26850700378418], [-90.399599075317369, 42.268548965454102], [-90.39941024780272, 42.268632888793945], [-90.399269104003892, 42.268693923950188], [-90.399187088012695, 42.268728256225586], [-90.399063110351562, 42.268777847290039], [-90.39903450012207, 42.268789291381836], [-90.398954391479492, 42.268827438354492], [-90.398689270019517, 42.26893424987793], [-90.398580551147461, 42.26896858215332], [-90.39582633972168, 42.270074844360352], [-90.395753860473633, 42.270105361938477], [-90.395666122436523, 42.270139694213867], [-90.395538330078125, 42.270177841186523], [-90.394872665405273, 42.270429611206055], [-90.394601821899414, 42.270517349243164], [-90.394538879394531, 42.270536422729492], [-90.394269943237305, 42.270635604858398], [-90.394119262695312, 42.270696640014648], [-90.393930435180664, 42.270742416381836], [-90.393892288208008, 42.270757675170898], [-90.393478393554688, 42.270986557006829], [-90.392944335937486, 42.271364212036133], [-90.392904281616211, 42.271402359008789], [-90.392036437988281, 42.272062301635735], [-90.392005920410156, 42.272089004516602], [-90.39007568359375, 42.273698806762695], [-90.389930725097642, 42.27381706237793], [-90.389873504638672, 42.273855209350586], [-90.389554977416992, 42.274087905883789], [-90.389486312866211, 42.274141311645508], [-90.389366149902344, 42.27424430847168], [-90.389177322387695, 42.274408340454102], [-90.389102935791001, 42.274469375610352], [-90.388978958129883, 42.274568557739251], [-90.388679504394531, 42.274847030639648], [-90.388423919677734, 42.27509880065918], [-90.388381958007798, 42.275144577026367], [-90.388154983520508, 42.275350570678711], [-90.387840270996094, 42.27563285827636], [-90.387815475463867, 42.275659561157227], [-90.387647628784165, 42.275861740112305], [-90.387607574462891, 42.275911331176758], [-90.376174926757812, 42.267488479614258]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "16",
                "sortOrder": 16,
                "title": "Upper Mississippi - Pool 14",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.074848421748868, 41.902196160532029], [-90.074863493518379, 41.897813433512063], [-90.095542396427078, 41.880363756088876], [-90.082114931999698, 41.849151910623902], [-90.143571239475605, 41.825860830650775], [-90.187135329217696, 41.793796069603289], [-90.20942373124943, 41.764504190086946], [-90.237555286130998, 41.755494558160564], [-90.228344388627605, 41.729434675623153], [-90.181833560992004, 41.717071804190162], [-90.179204954345437, 41.693105667324176], [-90.193375207638312, 41.662405106146998], [-90.225615669835889, 41.670415997190943], [-90.259146595725525, 41.663863399323084], [-90.302279318037662, 41.666982951859723], [-90.312657527144438, 41.673638531632903], [-90.323888382358959, 41.670622548091586], [-90.335319728299723, 41.65061565092337], [-90.337353306021768, 41.584224617281393], [-90.344435009654347, 41.578228276782411], [-90.394374964234117, 41.567489280532818], [-90.400252628377956, 41.574793116905326], [-90.40530154908258, 41.57429362216358], [-90.406296398099883, 41.575241881811536], [-90.397751638194833, 41.581947302939135], [-90.370659473930289, 41.583212862618765], [-90.34376036954157, 41.595927819014705], [-90.350107494138072, 41.644405793630732], [-90.341269114555999, 41.664857024015653], [-90.341556219424049, 41.68306941685713], [-90.360190905954525, 41.697710771992796], [-90.354890225413357, 41.751381680936348], [-90.325284956120129, 41.757923086678844], [-90.304736044824196, 41.772630906999339], [-90.29682674376788, 41.786462505041264], [-90.275701732572003, 41.799692476981562], [-90.262583787723585, 41.815604288344474], [-90.239082220763322, 41.824011054752368], [-90.193202464135354, 41.852936387663824], [-90.186074869650682, 41.87052092431302], [-90.171650620254539, 41.886916682867145], [-90.173633524920959, 41.897461569305221], [-90.15158566321368, 41.898325649793541], [-90.15147026334499, 41.898390058272092], [-90.151164050800347, 41.898387226055938], [-90.117090636123649, 41.900538144611026], [-90.117073204107115, 41.900533618917699], [-90.116615910751833, 41.900414894363152], [-90.074876975688525, 41.902203974401218], [-90.074848421748868, 41.902196160532029]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "17",
                "sortOrder": 17,
                "title": "Upper Mississippi - Pool 15",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.40530154908258, 41.57429362216358], [-90.400252628377956, 41.574793116905326], [-90.394374964234117, 41.567489280532818], [-90.414075059942618, 41.548344196646674], [-90.417926259820646, 41.540199038708245], [-90.41607481529212, 41.524301831073778], [-90.426308765364041, 41.517502007978877], [-90.518460169322012, 41.503285174865361], [-90.557035027766929, 41.502306853553669], [-90.556896912502083, 41.508616844560706], [-90.571091045497383, 41.524583239591422], [-90.544939040369087, 41.531237535844021], [-90.484493126820652, 41.528269302546292], [-90.4589094302642, 41.543255981029922], [-90.437483087584539, 41.566637922822174], [-90.406296398099883, 41.575241881811536], [-90.40530154908258, 41.57429362216358]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "18",
                "sortOrder": 18,
                "title": "Upper Mississippi - Pool 16",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.602620216447619, 41.525204317698588], [-90.571091045497383, 41.524583239591422], [-90.556896912502083, 41.508616844560706], [-90.557035027766929, 41.502306853553669], [-90.566564421038024, 41.50222358892141], [-90.5759383338075, 41.495644156931426], [-90.583883825358868, 41.468102738288579], [-90.562831247214604, 41.464515299572618], [-90.542446355331776, 41.469008130322187], [-90.543625591317877, 41.440865348098448], [-90.645788387694211, 41.433855311882944], [-90.658703810420974, 41.436091347378635], [-90.670480794312098, 41.444476940453143], [-90.728234667023358, 41.437210701365743], [-90.799665028280273, 41.441183997592177], [-90.820080256103822, 41.431732776733611], [-90.836714866821055, 41.434338983748347], [-90.860088317633839, 41.430709539363406], [-90.89529171561442, 41.416186918650475], [-90.941915840035236, 41.413778829220746], [-90.981944976506227, 41.418095082279891], [-90.998706057341948, 41.413627028946081], [-91.008715096155001, 41.415623475824475], [-91.009710415220027, 41.425036594793738], [-91.017952018202422, 41.439659550105617], [-90.976696623395995, 41.446572704997273], [-90.949341620465617, 41.435473830291393], [-90.913248852155618, 41.433753067952459], [-90.867554156304678, 41.455103407561531], [-90.829186262115002, 41.462253174516547], [-90.735508909029789, 41.454628918900454], [-90.708467878416883, 41.45779968038503], [-90.660244074449125, 41.4697894378359], [-90.645463341404309, 41.502848158429522], [-90.609265821321316, 41.526099207550146], [-90.602620216447619, 41.525204317698588]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "19",
                "sortOrder": 19,
                "title": "Upper Mississippi - Pool 17",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.009710415220027, 41.425036594793738], [-91.008715096155001, 41.415623475824475], [-90.998706057341948, 41.413627028946081], [-91.006468901830502, 41.404782488696199], [-91.016906855351024, 41.368925951805721], [-91.007074083352379, 41.337524374439447], [-91.015687605494577, 41.321987388522679], [-91.008960315762465, 41.31064846976799], [-90.99661467991595, 41.30261619698296], [-91.002549582636689, 41.273315672513419], [-90.979503773050325, 41.2408347953195], [-90.955638281517807, 41.236783729117093], [-90.954985631674504, 41.233151296926145], [-90.942417812552293, 41.234206426971525], [-90.933442213273821, 41.201217344681467], [-90.933721704701327, 41.201269418146211], [-90.93962393061814, 41.201014877839775], [-90.939785181838516, 41.200959216453079], [-90.950782740480321, 41.200578970657958], [-90.950937276229581, 41.200523174262543], [-90.951101387913994, 41.200566626310462], [-90.962259251920059, 41.200156608951815], [-90.96572545531896, 41.199952175453866], [-90.984920536368122, 41.199235789373631], [-90.98573944062143, 41.199140326778647], [-90.985723995501658, 41.199178544585344], [-90.989387229166695, 41.199043640120045], [-90.990767707484025, 41.199234363702224], [-91.000096736071725, 41.199076983123703], [-91.03431887463789, 41.191622600709607], [-91.056332483870264, 41.192568059070453], [-91.066407789773436, 41.187373814883948], [-91.081215498118624, 41.194579448824761], [-91.088890983261649, 41.204141991552547], [-91.088891001792874, 41.204142065354404], [-91.088881567098426, 41.204236262518783], [-91.088962206769452, 41.204435979525897], [-91.089198184361408, 41.205394655532643], [-91.089463799519166, 41.206205140688887], [-91.089463821400258, 41.206205204750262], [-91.089456833444885, 41.206241011313573], [-91.089456812803803, 41.20624111707928], [-91.089471024296671, 41.206290891913845], [-91.089475009884964, 41.206358339783186], [-91.089649183821933, 41.207059457442135], [-91.089653431702914, 41.207117930320855], [-91.090032677357527, 41.208533986942413], [-91.090037686909767, 41.208669091116221], [-91.090143372422546, 41.20908525982798], [-91.090935626931312, 41.211705998566259], [-91.092441826313063, 41.21423507668591], [-91.092446075833436, 41.214293533812871], [-91.0925419932463, 41.214610372513746], [-91.092725924871601, 41.214951186765141], [-91.093026168440019, 41.215676731025901], [-91.093257650863649, 41.216459683732303], [-91.093930594304069, 41.217727320005501], [-91.094280856433244, 41.218579789472869], [-91.094783267774574, 41.219353708575632], [-91.095071337898773, 41.21993493177267], [-91.095345223495912, 41.220362796788528], [-91.095510968883374, 41.22058621311654], [-91.095631780600712, 41.220790871042617], [-91.095952084366985, 41.221160956300615], [-91.096705616573928, 41.222249764886037], [-91.097709353742331, 41.223504829598987], [-91.09882782663361, 41.224635678373438], [-91.099399700443243, 41.225099977170274], [-91.099768248709282, 41.225556415173664], [-91.100482694551147, 41.226144656179606], [-91.100635855019192, 41.226237253737061], [-91.100931929996335, 41.226467313363607], [-91.101044396731567, 41.226523210877865], [-91.101804755380044, 41.227071668466458], [-91.102355105107804, 41.227404993113012], [-91.103153625084076, 41.227949567293869], [-91.103359935549321, 41.228061049997642], [-91.103689663216088, 41.228314175579037], [-91.104239902191182, 41.228651992708684], [-91.104389442653954, 41.228767043609935], [-91.104742447337372, 41.228989024011014], [-91.105100731918682, 41.229260628619066], [-91.105200536648226, 41.229316313879728], [-91.105288157496048, 41.22938080504894], [-91.105388091914307, 41.229431988130358], [-91.105494085135263, 41.229505788682069], [-91.105902020215112, 41.229814236872606], [-91.106066697325545, 41.229947547903798], [-91.106722180746601, 41.230386162653303], [-91.107014568696982, 41.230616146952642], [-91.107870948974437, 41.231148128068604], [-91.108472563861042, 41.231567833733045], [-91.108529306841504, 41.231591283044075], [-91.108655884830213, 41.231701447647204], [-91.108805957906668, 41.231798486458764], [-91.109038505961962, 41.232009468759102], [-91.109240689830543, 41.232161405642984], [-91.109374204793639, 41.232289697379684], [-91.109493913515763, 41.232431272520984], [-91.109565403123511, 41.232486489145856], [-91.109633262751302, 41.232564163561022], [-91.109702030738603, 41.232610328201844], [-91.109767428096177, 41.232669947467897], [-91.109882375585926, 41.232743890843849], [-91.110442893217879, 41.233167415423175], [-91.110583541796345, 41.233255290506293], [-91.110627097901386, 41.233296537094574], [-91.110706593371319, 41.233306847963789], [-91.111008471276222, 41.233208216289498], [-91.111419494632727, 41.232944741178528], [-91.112053996505978, 41.232689429926388], [-91.135500727514099, 41.232709693382361], [-91.136601413081422, 41.232228709952572], [-91.14898888219011, 41.258644064230559], [-91.156240225779527, 41.309457387399256], [-91.184948585824102, 41.361452313772389], [-91.182208304141824, 41.385872337124383], [-91.170675878343246, 41.3987949320165], [-91.148607884551964, 41.410507044579575], [-91.105539230670388, 41.417642354127501], [-91.054002607813445, 41.41552159904289], [-91.029994561818768, 41.427191468223221], [-91.017952018202422, 41.439659550105617], [-91.009710415220027, 41.425036594793738]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "20",
                "sortOrder": 20,
                "title": "Upper Mississippi - Pool 18",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.109766006469727, 41.232671737670898], [-91.092445373535156, 41.214296340942383], [-91.092441558837891, 41.214235305786133], [-91.090934753417969, 41.211706161499023], [-91.090143203735352, 41.209085464477539], [-91.090036392211914, 41.208669662475586], [-91.090032577514648, 41.208536148071289], [-91.089653015136719, 41.207117080688477], [-91.089649200439453, 41.207059860229492], [-91.089473724365234, 41.206357955932617], [-91.089469909667955, 41.206293106079102], [-91.089456558227539, 41.206243515014641], [-91.08946418762207, 41.206205368041992], [-91.089197158813477, 41.20539665222168], [-91.088962554931626, 41.204435348510742], [-91.088880538940415, 41.20423698425293], [-91.088890075683594, 41.204141616821289], [-91.081214904785156, 41.194578170776367], [-91.066408157348619, 41.187372207641602], [-91.056331634521484, 41.192567825317383], [-91.034318923950195, 41.191621780395508], [-91.000095367431641, 41.199079513549805], [-90.99076652526854, 41.199239730834954], [-90.989387512207031, 41.19904899597168], [-90.985723495483398, 41.199178695678711], [-90.985740661621094, 41.199140548706055], [-90.985654830932617, 41.199201583862305], [-90.984920501708984, 41.199243545532227], [-90.965724945068359, 41.199956893920898], [-90.962259292602539, 41.200162887573242], [-90.951101303100586, 41.200571060180664], [-90.950937271118164, 41.200529098510742], [-90.950782775878906, 41.200582504272461], [-90.939785003662095, 41.200963973999023], [-90.93962287902832, 41.201021194458008], [-90.933721542358398, 41.201272964477532], [-90.933441162109375, 41.201219558715813], [-90.912492752075195, 41.165006637573235], [-90.895973205566406, 41.148462295532227], [-90.87939453125, 41.142568588256836], [-90.877893447875977, 41.136373519897461], [-90.853443145751953, 41.114439010620117], [-90.844333648681641, 41.087690353393555], [-90.853609085083008, 41.041009902954102], [-90.866710662841797, 41.033540725708008], [-90.892471313476562, 41.038671493530273], [-90.888437271118164, 41.030309677124023], [-90.865556716918945, 41.018274307250977], [-90.85994720458983, 41.001138687133789], [-90.866193771362305, 40.990388870239258], [-90.881210327148438, 40.98481559753418], [-90.886247634887681, 40.970758438110352], [-90.897750854492188, 40.962392807006829], [-90.903684616088853, 40.952764511108391], [-90.904531478881836, 40.939577102661133], [-90.925804138183594, 40.914434432983398], [-90.940311431884766, 40.884111404418945], [-90.954753875732422, 40.86567497253418], [-91.017608642578125, 40.865671157836914], [-91.017549514770508, 40.869230270385742], [-91.018047332763672, 40.87788200378418], [-91.049501419067383, 40.898542404174805], [-91.05778694152832, 40.898622512817383], [-91.04205322265625, 40.974428176879883], [-91.030538558959961, 40.99138069152832], [-91.049648284912109, 41.024152755737305], [-91.04454231262207, 41.063833236694336], [-91.061868667602525, 41.081853866577141], [-91.082302093505859, 41.087465286254883], [-91.072986602783203, 41.103097915649414], [-91.060125350952148, 41.110910415649414], [-91.05384635925293, 41.134767532348633], [-91.117229461669922, 41.197900772094727], [-91.135101318359375, 41.223592758178711], [-91.136600494384751, 41.232229232788086], [-91.109766006469727, 41.232671737670898]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "21",
                "sortOrder": 21,
                "title": "Upper Mississippi - Pool 19",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.017550019441643, 40.869229885780783], [-91.017608927310619, 40.8656711510124], [-90.954753473047063, 40.865673266420153], [-90.960435595557257, 40.858818402742671], [-90.959995490477411, 40.845974429492905], [-90.969839557486523, 40.839550137031971], [-90.970604362645531, 40.826700368930936], [-90.987338624051191, 40.792669356596775], [-90.985770882525614, 40.779296668359926], [-90.991675374752589, 40.76340159929061], [-91.003141767870432, 40.752535673801191], [-91.00792419769023, 40.738080054134478], [-91.023514671062884, 40.720107251003029], [-91.030870189639245, 40.703698811622296], [-91.055100258490484, 40.677730058329217], [-91.070176445510512, 40.675677525447689], [-91.093040887392831, 40.656866288675857], [-91.100871363903948, 40.658738746696407], [-91.106606016669133, 40.653144438750182], [-91.120206930841817, 40.655916526565036], [-91.139014941274453, 40.643529256791631], [-91.150979420814977, 40.642690474811943], [-91.207094126059317, 40.620480180537804], [-91.239289462093268, 40.623341466926959], [-91.271077159532624, 40.612822589298567], [-91.308603197189186, 40.613654326938573], [-91.338563903674626, 40.599343475895083], [-91.390209587312754, 40.561655492689191], [-91.391340864710031, 40.555662616436344], [-91.384959600305152, 40.554915730597038], [-91.386249319613725, 40.539817498895367], [-91.358640322336825, 40.517888126342314], [-91.355505455341657, 40.485826570122157], [-91.371630185734901, 40.438998338811743], [-91.355825461945201, 40.409968351661327], [-91.350544091665242, 40.408131678072372], [-91.351651357839998, 40.39826113497999], [-91.370637681271845, 40.399476179226802], [-91.375420111386347, 40.395868737969003], [-91.390290206644679, 40.44049915792322], [-91.387435407748555, 40.465044176534953], [-91.373086168861775, 40.484260833624369], [-91.375853315287543, 40.504974985849771], [-91.389965945109907, 40.522618119096585], [-91.400172168846552, 40.528259991457702], [-91.410143851520786, 40.528600695285874], [-91.41987311795117, 40.518347640609655], [-91.429416485691746, 40.517162856981123], [-91.456330631706635, 40.527282850415311], [-91.468226414313861, 40.541472452566445], [-91.471916505523083, 40.554845096670419], [-91.468686507126691, 40.585557286747395], [-91.452318898184984, 40.610661381124544], [-91.425971673945241, 40.616677882883565], [-91.406722229746705, 40.628907950885001], [-91.348839657209538, 40.637605761133571], [-91.294232111761374, 40.631333110710663], [-91.278648366377382, 40.637019829968295], [-91.258619307387988, 40.656942554493256], [-91.242282854729083, 40.688562325893123], [-91.25260325042899, 40.706964527644701], [-91.214007890633411, 40.734952063537804], [-91.171430084562232, 40.73721601282238], [-91.158675017479155, 40.745584033941078], [-91.129560689690337, 40.741124226748468], [-91.113563577058997, 40.75017711920183], [-91.100604675965883, 40.7651021878739], [-91.094176428696841, 40.787367465399946], [-91.100472470483965, 40.803843593183466], [-91.09986991315229, 40.817692464142368], [-91.108025550429446, 40.826650115853688], [-91.111867721673008, 40.841355669680162], [-91.109948733448405, 40.85350293738778], [-91.057786774373298, 40.898619835657144], [-91.049502248073836, 40.898540722710727], [-91.018047893267905, 40.877882276386821], [-91.017550019441643, 40.869229885780783]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "22",
                "sortOrder": 22,
                "title": "Upper Mississippi - Pool 20",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.465118408203125, 40.410123825073242], [-91.455785751342773, 40.407449722290032], [-91.452417373657227, 40.396566390991211], [-91.432966232299805, 40.386632919311516], [-91.387950897216797, 40.388952255249023], [-91.375419616699219, 40.395868301391602], [-91.370637893676758, 40.399477005004883], [-91.351650238037109, 40.398263931274414], [-91.358116149902344, 40.386884689331055], [-91.375373840332031, 40.37690544128418], [-91.428350448608398, 40.368021011352532], [-91.440322875976548, 40.36359977722168], [-91.445329666137695, 40.354757308959961], [-91.415088653564453, 40.241899490356438], [-91.419137954711914, 40.216707229614258], [-91.409767150878906, 40.140497207641602], [-91.501396179199219, 40.142950057983398], [-91.53536224365233, 40.14360237121582], [-91.53540992736815, 40.14360237121582], [-91.53544807434082, 40.14360237121582], [-91.535467147827134, 40.143594741821289], [-91.535722732543945, 40.143598556518548], [-91.53594970703125, 40.143579483032227], [-91.535951614379883, 40.14360237121582], [-91.538110733032227, 40.151918411254883], [-91.526491165161133, 40.163446426391602], [-91.528150558471665, 40.170263290405273], [-91.52130126953125, 40.186639785766602], [-91.524908065795898, 40.21196174621582], [-91.54673957824707, 40.257715225219727], [-91.565052032470703, 40.275903701782227], [-91.576179504394517, 40.314378738403313], [-91.585908889770508, 40.326116561889641], [-91.583097457885742, 40.39246940612793], [-91.523958206176758, 40.392484664916985], [-91.51502799987793, 40.410303115844727], [-91.496192932128906, 40.405267715454102], [-91.465118408203125, 40.410123825073242]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "23",
                "sortOrder": 23,
                "title": "Upper Mississippi - Pool 21",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.501396072022814, 40.142950421970333], [-91.409767467456163, 40.140497704090244], [-91.405695382441564, 40.125926848849829], [-91.398158997598358, 40.125534199829332], [-91.394710451626892, 40.115103188564099], [-91.397374855572991, 40.106887779325866], [-91.393341644176928, 40.080362587060286], [-91.39837679994713, 40.033106753898785], [-91.415027862818306, 39.964454880452102], [-91.414783219704375, 39.92929219103975], [-91.408078877881422, 39.902779176062595], [-91.42801810563823, 39.902800625121657], [-91.436044761061311, 39.909881409034902], [-91.515630657434528, 39.910007344761553], [-91.52779220800744, 39.944700746461919], [-91.522996938416611, 39.961491862930806], [-91.52775342279692, 40.010820507343389], [-91.512019360499167, 40.018186824384713], [-91.504339073773991, 40.028385398874249], [-91.497553062744444, 40.055215437427066], [-91.524381104911541, 40.125989319678254], [-91.533010644265573, 40.135450960234891], [-91.53305360302079, 40.137001102319445], [-91.535233859937051, 40.139704548537985], [-91.536132881956448, 40.143382729067298], [-91.535952995997619, 40.143601993761877], [-91.535448775051549, 40.143601469765208], [-91.535410250887693, 40.143601429668124], [-91.535360686066994, 40.143601378204671], [-91.501396072022814, 40.142950421970333]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "24",
                "sortOrder": 24,
                "title": "Upper Mississippi - Pool 22",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.42801810563823, 39.902800625121657], [-91.408078877881422, 39.902779176062595], [-91.392439450369807, 39.867304536363307], [-91.365517159879886, 39.835938730090056], [-91.281308672743236, 39.769398704305708], [-91.178603916127202, 39.720912018285823], [-91.159480191452147, 39.705158213298184], [-91.148694355972751, 39.701864449200173], [-91.148815350440529, 39.693437953165017], [-91.124117186572747, 39.660263705348314], [-91.113744528813115, 39.649004446262886], [-91.097355015032136, 39.640947631706752], [-91.107118811001186, 39.64098319177711], [-91.201762201408101, 39.641853556567128], [-91.235683387573303, 39.642097990418065], [-91.236960743381459, 39.642108752354737], [-91.236984214660865, 39.642106134036375], [-91.239691956989176, 39.642137424022536], [-91.250144066498265, 39.63623429893574], [-91.250144067654503, 39.635572320978135], [-91.265043902442969, 39.640000069960706], [-91.281479518567124, 39.662994707767098], [-91.306736304986401, 39.673200959102381], [-91.316167900315492, 39.684830425575932], [-91.353501179314492, 39.707062914728894], [-91.364941904728283, 39.72269029450721], [-91.401521883692297, 39.751264845298067], [-91.405371231294666, 39.760291637792619], [-91.440191200085621, 39.792417499788229], [-91.460277723069552, 39.80797611703035], [-91.467361787596346, 39.808448635609992], [-91.466198465995774, 39.813681347515278], [-91.47594349165945, 39.82874823935105], [-91.491978985845734, 39.834918409204938], [-91.490537714760237, 39.84996824027715], [-91.515630657434528, 39.910007344761553], [-91.436044761061311, 39.909881409034902], [-91.42801810563823, 39.902800625121657]], [[-91.456823809486849, 39.827580143874606], [-91.456587136238383, 39.828773806031734], [-91.456821648502213, 39.828688301145093], [-91.456823809486849, 39.827580143874606]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "25",
                "sortOrder": 25,
                "title": "Upper Mississippi - Pool 24",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.095985412597656, 39.639978408813477], [-91.091423034667969, 39.637628555297844], [-91.088884353637695, 39.624181747436516], [-91.013063430786133, 39.542470932006829], [-90.849336624145508, 39.429719924926758], [-90.867868423461914, 39.421113967895508], [-90.886896133422852, 39.400022506713867], [-90.88728141784668, 39.381860733032227], [-90.887031555175781, 39.38072395324707], [-90.887182235717759, 39.380132675170898], [-90.895608901977539, 39.383516311645508], [-90.907787322998047, 39.373022079467773], [-90.936948776245117, 39.375577926635742], [-90.968002319335938, 39.40077018737793], [-90.978719711303711, 39.414831161499023], [-91.029003143310547, 39.434125900268555], [-91.07090950012207, 39.470949172973626], [-91.128015518188477, 39.488225936889641], [-91.139406204223633, 39.516664505004883], [-91.166828155517578, 39.540777206420898], [-91.205284118652344, 39.601053237915039], [-91.214492797851562, 39.611139297485352], [-91.242286682128906, 39.625436782836914], [-91.250143051147461, 39.63557243347168], [-91.250143051147461, 39.636236190795898], [-91.239690780639648, 39.642137527465813], [-91.236984252929688, 39.642107009887695], [-91.235683441162109, 39.642099380493164], [-91.219499588012681, 39.642011642456055], [-91.097354888916001, 39.640947341918945], [-91.095985412597656, 39.639978408813477]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "26",
                "sortOrder": 26,
                "title": "Upper Mississippi - Pool 25",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.847951221203544, 39.426939974748592], [-90.841186531970763, 39.425370705296963], [-90.814550825429862, 39.391172621399903], [-90.761571596618055, 39.317875245075015], [-90.749668808287723, 39.291924556176618], [-90.736096777367891, 39.28263997393146], [-90.736664938266472, 39.27536148329424], [-90.72438368123656, 39.260747542227811], [-90.711579765760959, 39.212496066372246], [-90.679805120660291, 39.157410485747477], [-90.663536818959599, 39.107627808917627], [-90.676839815332329, 39.037695587577723], [-90.675229315090817, 39.00648510465323], [-90.675257898494635, 39.006179064938138], [-90.675181743912447, 39.005914551741647], [-90.675151132799783, 39.005808227958973], [-90.675163739389589, 39.005808909788414], [-90.738754632217436, 38.999290168406517], [-90.745979995680699, 39.042952348657487], [-90.743283878311345, 39.064898672360712], [-90.751261910777828, 39.100175082877058], [-90.787608535999382, 39.180647700021041], [-90.793379000513241, 39.20233061785747], [-90.819446045543131, 39.249670249943918], [-90.854950399613102, 39.293049093330865], [-90.861925666960829, 39.316957320272266], [-90.884572921056161, 39.330675728769357], [-90.893769029826657, 39.35307555151126], [-90.907738273066599, 39.370951401215024], [-90.895480467739986, 39.381588361765971], [-90.887182439759442, 39.380130476892703], [-90.887281777191234, 39.381861054060217], [-90.886767155756246, 39.398093051223491], [-90.867740293560587, 39.41918451918621], [-90.847951221203544, 39.426939974748592]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "27",
                "sortOrder": 27,
                "title": "Upper Mississippi - Pool 26",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.67537689208983, 39.007761001586914], [-90.675228118896484, 39.006486892700195], [-90.675180435180664, 39.005914688110344], [-90.675163269042969, 39.00581169128418], [-90.670957565307603, 38.960721969604492], [-90.65141487121582, 38.924379348754883], [-90.620344161987305, 38.891489028930664], [-90.583211898803697, 38.872125625610352], [-90.555042266845689, 38.874063491821289], [-90.533414840698242, 38.887334823608391], [-90.519178390502915, 38.908418655395508], [-90.506528854370103, 38.952611923217773], [-90.496059417724609, 38.960901260375969], [-90.495082855224609, 38.968008041381836], [-90.481460571289062, 38.972387313842773], [-90.410467147827148, 38.967786788940423], [-90.312166213989258, 38.934045791625977], [-90.283300399780273, 38.939027786254883], [-90.22618293762207, 38.914731979370117], [-90.192403793334961, 38.892000198364258], [-90.137386322021484, 38.886640548706055], [-90.143960952758789, 38.87910270690918], [-90.144102096557617, 38.878942489624023], [-90.146320343017578, 38.876428604125977], [-90.146591186523438, 38.876123428344727], [-90.148895263671875, 38.873476028442383], [-90.148975372314439, 38.873418807983398], [-90.150590896606445, 38.871583938598626], [-90.1513671875, 38.87071418762207], [-90.159286499023438, 38.862089157104492], [-90.15699577331543, 38.860029220581048], [-90.156915664672852, 38.85984992980957], [-90.156074523925781, 38.855829238891602], [-90.156072616577148, 38.855745315551758], [-90.156549453735352, 38.854333877563477], [-90.156476974487305, 38.854280471801758], [-90.155673980712891, 38.853727340698242], [-90.155569076538086, 38.853662490844727], [-90.152759552001953, 38.851850509643555], [-90.152734756469712, 38.851831436157219], [-90.151618957519531, 38.851144790649414], [-90.15123176574707, 38.850919723510742], [-90.150444030761719, 38.850423812866211], [-90.150184631347656, 38.850259780883789], [-90.14759635925293, 38.845537185668945], [-90.147663116455064, 38.845258712768548], [-90.148004531860352, 38.844881057739258], [-90.148078918457031, 38.844827651977532], [-90.148126602172852, 38.844770431518555], [-90.148258209228516, 38.844614028930664], [-90.148401260375977, 38.844408035278313], [-90.148456573486328, 38.844331741333008], [-90.148469924926758, 38.84431266784668], [-90.148555755615234, 38.844209671020508], [-90.148580551147461, 38.844179153442383], [-90.148685455322266, 38.84405326843261], [-90.148696899414062, 38.844038009643555], [-90.148792266845703, 38.843908309936523], [-90.148826599121094, 38.84387016296386], [-90.14886474609375, 38.84382438659668], [-90.149450302124023, 38.843122482299805], [-90.149503707885742, 38.843050003051758], [-90.149570465087891, 38.842966079711914], [-90.149648666381822, 38.842870712280266], [-90.14995002746582, 38.842466354370117], [-90.150020599365234, 38.84239387512207], [-90.150239944457994, 38.842245101928711], [-90.150287628173814, 38.842229843139648], [-90.150568008422852, 38.842149734497063], [-90.151178359985352, 38.842035293579102], [-90.151447296142578, 38.842000961303711], [-90.15240478515625, 38.841848373413079], [-90.152585983276367, 38.841825485229492], [-90.154420852661133, 38.841588973999023], [-90.154609680175781, 38.841569900512695], [-90.155973434448228, 38.841344833374023], [-90.156137466430664, 38.84132194519043], [-90.159734725952148, 38.841188430786133], [-90.159906387329102, 38.841184616088867], [-90.168939590454102, 38.83958625793457], [-90.169008255004883, 38.839567184448235], [-90.17426872253418, 38.838678359985352], [-90.174478530883789, 38.838640213012695], [-90.175930023193359, 38.83843803405761], [-90.176130294799805, 38.838411331176758], [-90.177164077758789, 38.838319778442376], [-90.177194595336914, 38.838319778442376], [-90.177305221557617, 38.83830451965332], [-90.177314758300781, 38.83830451965332], [-90.177425384521484, 38.838315963745117], [-90.177585601806641, 38.838293075561523], [-90.178304672241211, 38.83827018737793], [-90.178319931030273, 38.838274002075195], [-90.178464889526367, 38.83825492858886], [-90.179298400878906, 38.838174819946289], [-90.17933464050293, 38.838151931762695], [-90.181306838989258, 38.837415695190423], [-90.181343078613281, 38.837404251098626], [-90.181615829467773, 38.837289810180664], [-90.181732177734375, 38.837259292602539], [-90.182645797729492, 38.836931228637688], [-90.182664871215806, 38.83692741394043], [-90.189743041992188, 38.83568000793457], [-90.189926147460938, 38.835657119750977], [-90.192483901977539, 38.835603713989258], [-90.192499160766587, 38.835603713989258], [-90.215566635131836, 38.840551376342773], [-90.215892791748033, 38.840478897094727], [-90.225605010986328, 38.835702896118164], [-90.29255485534668, 38.86656379699707], [-90.332387924194336, 38.872636795043945], [-90.336336135864258, 38.870904922485352], [-90.339601516723633, 38.847055435180657], [-90.361043930053711, 38.825292587280273], [-90.37158203125, 38.820756912231445], [-90.411746978759766, 38.822549819946289], [-90.417169570922852, 38.815584182739258], [-90.426399230957031, 38.814477920532219], [-90.453737258911133, 38.819116592407227], [-90.47052001953125, 38.800043106079102], [-90.480453491210923, 38.805898666381836], [-90.481033325195298, 38.81989860534668], [-90.493886947631836, 38.821176528930664], [-90.575078964233384, 38.804555892944336], [-90.651676177978501, 38.802194595336914], [-90.649864196777344, 38.812402725219719], [-90.658416748046875, 38.822172164916992], [-90.69548225402832, 38.842866897583008], [-90.720205307006836, 38.868932723999023], [-90.745071411132812, 38.917440414428711], [-90.754661560058594, 38.926481246948242], [-90.745956420898438, 38.947755813598633], [-90.738754272460938, 38.999292373657227], [-90.67537689208983, 39.007761001586914]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "28",
                "sortOrder": 28,
                "title": "Upper Mississippi - Lock & Dam 26 to Grand Tower",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.137386322021484, 38.886640548706055], [-90.108430862426744, 38.878744125366211], [-90.077661514282212, 38.879449844360352], [-90.071044921875, 38.867002487182617], [-90.079166412353516, 38.863592147827148], [-90.049797058105469, 38.849760055541992], [-90.04315185546875, 38.833829879760742], [-90.031818389892578, 38.827695846557617], [-90.01661491394043, 38.810388565063477], [-90.001825332641602, 38.740411758422852], [-90.011602401733398, 38.712873458862305], [-90.007160186767578, 38.694898605346673], [-90.019376754760742, 38.654153823852539], [-90.016620635986328, 38.644838333129883], [-90.044998168945312, 38.615495681762695], [-90.056573867797852, 38.591581344604492], [-90.085466384887695, 38.572744369506836], [-90.108295440673828, 38.546728134155273], [-90.122207641601562, 38.542264938354492], [-90.134071350097656, 38.531862258911133], [-90.155584335327148, 38.542184829711914], [-90.165630340576158, 38.537630081176758], [-90.16901969909668, 38.528902053833008], [-90.177951812744141, 38.534753799438477], [-90.201656341552734, 38.504186630249023], [-90.211688995361328, 38.49775505065918], [-90.220478057861328, 38.480916976928711], [-90.226238250732422, 38.454252243041992], [-90.253942489624023, 38.397169113159173], [-90.268478393554688, 38.331239700317383], [-90.309013366699219, 38.305170059204102], [-90.308015823364258, 38.289522171020508], [-90.296152114868164, 38.256402969360352], [-90.28033447265625, 38.230093002319336], [-90.218955993652344, 38.172506332397461], [-90.150850296020508, 38.13566780090332], [-90.090906143188477, 38.080469131469727], [-90.067043304443359, 38.064332962036133], [-90.040019989013672, 38.054830551147461], [-89.969402313232422, 38.016447067260742], [-89.961233139038086, 38.016759872436523], [-89.952808380126953, 38.033376693725586], [-89.978593826293945, 38.059782028198242], [-89.968908309936523, 38.079446792602539], [-89.960365295410156, 38.07957649230957], [-89.944473266601562, 38.089761734008789], [-89.936494827270508, 38.103509902954102], [-89.940801620483398, 38.123579025268555], [-89.93799781799315, 38.128648757934563], [-89.952201843261719, 38.133691787719727], [-89.948152542114244, 38.139402389526367], [-89.902767181396484, 38.139097213745117], [-89.899736404418945, 38.114995956420891], [-89.90818595886229, 38.10795783996582], [-89.928981781005859, 38.102216720581055], [-89.963470458984375, 38.058298110961914], [-89.933021545410142, 38.03509330749511], [-89.941627502441392, 38.029939651489251], [-89.95203971862793, 38.01390266418457], [-89.94367790222168, 37.998537063598633], [-89.875083923339844, 37.934720993041992], [-89.804946899414062, 37.887548446655273], [-89.780923843383775, 37.882932662963867], [-89.754459381103516, 37.865686416625977], [-89.671829223632812, 37.827981948852532], [-89.581699371337891, 37.804227828979485], [-89.486671447753906, 37.773889541625969], [-89.451269149780273, 37.756952285766602], [-89.436492919921875, 37.755559921264648], [-89.419391632080078, 37.73754692077636], [-89.408250808715806, 37.714361190795898], [-89.408395767211914, 37.675725936889648], [-89.400472640991197, 37.669015884399407], [-89.409090042114244, 37.664617538452148], [-89.420314788818359, 37.629545211791992], [-89.432765960693359, 37.630117416381836], [-89.433784484863267, 37.630167007446282], [-89.433797836303711, 37.630167007446282], [-89.445108413696275, 37.630559921264648], [-89.445247650146484, 37.630556106567383], [-89.457847595214844, 37.630895614624023], [-89.458309173583984, 37.630929946899414], [-89.462480545043945, 37.631052017211914], [-89.462764739990234, 37.631063461303711], [-89.503910064697266, 37.632364273071289], [-89.507270812988281, 37.633161544799805], [-89.50732421875, 37.633119583129883], [-89.507596969604492, 37.633024215698242], [-89.516588211059556, 37.630083084106445], [-89.520242691040039, 37.648515701293945], [-89.531826019287095, 37.660253524780273], [-89.531360626220703, 37.675214767456055], [-89.52409553527832, 37.690031051635742], [-89.526853561401367, 37.69502067565918], [-89.610261917114258, 37.718351364135742], [-89.661598205566406, 37.746500015258789], [-89.682140350341797, 37.753225326538086], [-89.733131408691406, 37.785303115844719], [-89.754461288452148, 37.791364669799805], [-89.829595565795898, 37.828187942504883], [-89.860263824462891, 37.834844589233398], [-89.918525695800781, 37.867799758911126], [-89.943071365356445, 37.875619888305664], [-89.975217819213867, 37.896646499633789], [-90.020929336547852, 37.953886032104492], [-90.015941619873047, 37.95942497253418], [-90.039878845214844, 37.978231430053711], [-90.059236526489258, 38.003599166870117], [-90.0894775390625, 38.013818740844727], [-90.140037536621094, 38.044198989868164], [-90.157123565673828, 38.049821853637688], [-90.176713943481445, 38.066228866577141], [-90.245094299316406, 38.106748580932617], [-90.3319091796875, 38.183866500854492], [-90.356443405151367, 38.212949752807617], [-90.376493453979492, 38.220483779907227], [-90.369922637939453, 38.235815048217773], [-90.370473861694336, 38.252172470092773], [-90.380893707275391, 38.28654670715332], [-90.375173568725586, 38.306123733520508], [-90.375885009765625, 38.333696365356445], [-90.361349105834961, 38.359834671020508], [-90.359043121337876, 38.386404037475586], [-90.352537155151367, 38.394895553588867], [-90.32884025573729, 38.403966903686523], [-90.310312271118164, 38.422727584838867], [-90.286197662353516, 38.464826583862305], [-90.269311904907227, 38.529722213745117], [-90.258390426635742, 38.538518905639648], [-90.25505256652832, 38.549982070922844], [-90.232757568359375, 38.575128555297852], [-90.200387954711914, 38.597333908081055], [-90.186450958251953, 38.628362655639648], [-90.186006546020508, 38.638555526733398], [-90.197784423828125, 38.662321090698242], [-90.206748962402344, 38.676179885864258], [-90.222524642944322, 38.688386917114258], [-90.230175018310547, 38.707113265991211], [-90.227283477783203, 38.726713180541992], [-90.207614898681641, 38.738107681274414], [-90.184268951416016, 38.761495590209961], [-90.182104110717773, 38.807794570922852], [-90.225605010986328, 38.835702896118164], [-90.215887069702148, 38.840478897094727], [-90.215566635131836, 38.840551376342773], [-90.192501068115234, 38.835603713989258], [-90.192483901977539, 38.835603713989258], [-90.189926147460938, 38.835657119750977], [-90.189743041992188, 38.83568000793457], [-90.182664871215806, 38.83692741394043], [-90.182645797729492, 38.836931228637688], [-90.181732177734375, 38.837259292602539], [-90.181615829467773, 38.837289810180664], [-90.181343078613281, 38.837404251098626], [-90.181306838989258, 38.837415695190423], [-90.17933464050293, 38.838151931762695], [-90.179298400878906, 38.838174819946289], [-90.178464889526367, 38.83825492858886], [-90.178304672241211, 38.83827018737793], [-90.177585601806641, 38.838293075561523], [-90.177562713623047, 38.838289260864258], [-90.177425384521484, 38.838315963745117], [-90.177314758300781, 38.83830451965332], [-90.177303314208984, 38.83830451965332], [-90.177164077758789, 38.838319778442376], [-90.176130294799805, 38.838411331176758], [-90.175930023193359, 38.83843803405761], [-90.174478530883789, 38.838640213012695], [-90.17426872253418, 38.838678359985352], [-90.169008255004883, 38.839567184448235], [-90.168939590454102, 38.83958625793457], [-90.159906387329102, 38.841184616088867], [-90.159734725952148, 38.841188430786133], [-90.156137466430664, 38.84132194519043], [-90.155973434448228, 38.841344833374023], [-90.15461540222168, 38.841569900512695], [-90.154420852661133, 38.841588973999023], [-90.152585983276367, 38.841825485229492], [-90.15240478515625, 38.841848373413079], [-90.151447296142578, 38.842000961303711], [-90.151300430297852, 38.842008590698242], [-90.151178359985352, 38.842035293579102], [-90.150568008422852, 38.842149734497063], [-90.150287628173814, 38.842229843139648], [-90.150239944457994, 38.842245101928711], [-90.150020599365234, 38.84239387512207], [-90.14995002746582, 38.842466354370117], [-90.149648666381822, 38.842870712280266], [-90.149570465087891, 38.842966079711914], [-90.149503707885742, 38.843050003051758], [-90.149450302124023, 38.843122482299805], [-90.14886474609375, 38.84382438659668], [-90.148826599121094, 38.84387016296386], [-90.148792266845703, 38.843908309936523], [-90.148696899414062, 38.844038009643555], [-90.148685455322266, 38.84405326843261], [-90.148580551147461, 38.844179153442383], [-90.148555755615234, 38.844209671020508], [-90.148469924926758, 38.84431266784668], [-90.148456573486328, 38.844331741333008], [-90.148401260375977, 38.844408035278313], [-90.148258209228516, 38.844614028930664], [-90.148126602172852, 38.844770431518555], [-90.148078918457031, 38.844827651977532], [-90.148004531860352, 38.844881057739258], [-90.147663116455064, 38.845258712768548], [-90.147586822509766, 38.845457077026367], [-90.14759635925293, 38.845537185668945], [-90.150184631347656, 38.850259780883789], [-90.150444030761719, 38.850423812866211], [-90.15123176574707, 38.850919723510742], [-90.151618957519531, 38.851144790649414], [-90.152734756469712, 38.851831436157219], [-90.152759552001953, 38.851850509643555], [-90.155569076538086, 38.853662490844727], [-90.155673980712891, 38.853727340698242], [-90.156476974487305, 38.854280471801758], [-90.156549453735352, 38.854333877563477], [-90.156070709228516, 38.855749130249023], [-90.156074523925781, 38.855829238891602], [-90.156915664672852, 38.85984992980957], [-90.15699577331543, 38.860029220581048], [-90.159286499023438, 38.862089157104492], [-90.1513671875, 38.87071418762207], [-90.150590896606445, 38.871583938598626], [-90.148975372314439, 38.873418807983398], [-90.148895263671875, 38.873476028442383], [-90.146591186523438, 38.876123428344727], [-90.146320343017578, 38.876428604125977], [-90.144102096557617, 38.878942489624023], [-90.143960952758789, 38.87910270690918], [-90.137386322021484, 38.886640548706055]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "29",
                "sortOrder": 29,
                "title": "Upper Mississippi - Grand Tower to Ohio River",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-89.503910064697266, 37.632364273071289], [-89.462764739990234, 37.631063461303711], [-89.462482452392578, 37.631052017211914], [-89.458309173583984, 37.630929946899414], [-89.457759857177734, 37.63090705871582], [-89.457847595214844, 37.630895614624023], [-89.445247650146484, 37.630556106567383], [-89.445108413696275, 37.630559921264648], [-89.433797836303711, 37.630167007446282], [-89.432765960693359, 37.630117416381836], [-89.420314788818359, 37.629545211791992], [-89.437223434448228, 37.614645004272461], [-89.43858528137207, 37.605279922485352], [-89.435640335082994, 37.597562789916992], [-89.439325332641602, 37.594411849975586], [-89.441463470458984, 37.560491561889648], [-89.434576034545884, 37.512907028198242], [-89.42616081237793, 37.504518508911126], [-89.421266555786133, 37.505765914916992], [-89.3765354156494, 37.484415054321289], [-89.379508972167969, 37.476816177368157], [-89.367158889770508, 37.466081619262695], [-89.372043609619126, 37.463796615600586], [-89.347854614257812, 37.429033279418945], [-89.346023559570312, 37.40070915222168], [-89.356575012207031, 37.352533340454102], [-89.377950668334961, 37.336950302124023], [-89.381856918334961, 37.32554817199707], [-89.449905395507812, 37.250051498413086], [-89.463098526000962, 37.221155166625977], [-89.46205902099608, 37.210962295532227], [-89.44374847412108, 37.181547164916992], [-89.421928405761705, 37.163125991821289], [-89.397003173828125, 37.166410446166992], [-89.368213653564439, 37.162050247192383], [-89.334600448608398, 37.183584213256829], [-89.273052215576172, 37.150930404663086], [-89.274753570556641, 37.119272232055664], [-89.255880355834947, 37.09277153015136], [-89.24546623229979, 37.107145309448235], [-89.245201110839844, 37.114198684692383], [-89.235116958618164, 37.118616104125977], [-89.180164337158203, 37.118356704711914], [-89.177698135375962, 37.106290817260742], [-89.184133529663086, 37.029119491577148], [-89.171939849853516, 37.007452011108398], [-89.137840270996094, 36.983640670776367], [-89.125696182250977, 36.97846794128418], [-89.125648498535156, 36.95872688293457], [-89.132514953613281, 36.902841567993157], [-89.190862655639648, 36.896272659301758], [-89.268013000488281, 36.90587043762207], [-89.328525543212891, 36.904508590698242], [-89.449081420898438, 36.966428756713867], [-89.44117164611815, 36.975427627563477], [-89.444574356079102, 37.016683578491211], [-89.494663238525391, 37.091306686401367], [-89.498626708984375, 37.129842758178711], [-89.495201110839844, 37.13786506652832], [-89.460903167724609, 37.148977279663086], [-89.444112777709961, 37.16230583190918], [-89.472671508789062, 37.207101821899407], [-89.474390029907227, 37.224973678588867], [-89.481914520263672, 37.22553825378418], [-89.480175018310547, 37.221498489379883], [-89.485097885131822, 37.223966598510742], [-89.467313766479492, 37.246644973754883], [-89.477781295776353, 37.249654769897461], [-89.522041320800781, 37.238851547241211], [-89.538843154907227, 37.226415634155273], [-89.56513786315918, 37.260828018188477], [-89.563186645507812, 37.268178939819336], [-89.53350830078125, 37.276933670043945], [-89.519437789916978, 37.296846389770508], [-89.515932083129883, 37.313379287719727], [-89.495792388916016, 37.327550888061523], [-89.492971420288086, 37.340654373168945], [-89.4461669921875, 37.363603591918945], [-89.445383071899414, 37.375051498413079], [-89.437589645385728, 37.375051498413079], [-89.43412590026854, 37.387109756469727], [-89.439582824707031, 37.428606033325195], [-89.451694488525391, 37.445623397827148], [-89.488670349121094, 37.481439590454102], [-89.514787673950195, 37.478010177612298], [-89.515443801879883, 37.488912582397461], [-89.499368667602539, 37.496259689331055], [-89.504179000854492, 37.512571334838867], [-89.521150588989244, 37.535055160522461], [-89.525033950805664, 37.551401138305664], [-89.53681755065918, 37.555753707885742], [-89.530256271362305, 37.564668655395508], [-89.540901184082031, 37.569536209106445], [-89.539190292358384, 37.57520866394043], [-89.526124954223633, 37.572000503540039], [-89.512920379638672, 37.621664047241211], [-89.516588211059556, 37.630083084106445], [-89.507596969604492, 37.633024215698242], [-89.50732421875, 37.633119583129883], [-89.507270812988281, 37.633161544799805], [-89.503910064697266, 37.632364273071289]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "lowerMS",
                "sortOrder": 30,
                "title": "Lower Mississippi",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [ -89.0627977, 37.1212399 ], [ -89.1080075, 37.1174328 ], [ -89.1519025, 37.0798223 ], [ -89.1616131, 37.0551429 ], [ -89.1657371, 37.037513 ], [ -89.1633658, 37.018852 ], [ -89.1555303, 37.008439 ], [ -89.1358384, 36.9987477 ], [ -89.1297297, 36.9888889 ], [ -89.1250903, 36.9771356 ], [ -89.1235438, 36.9683206 ], [ -89.1246006, 36.9568895 ], [ -89.1284926, 36.9044893 ], [ -89.1334413, 36.9001592 ], [ -89.1824649, 36.8472693 ], [ -89.1857126, 36.8178861 ], [ -89.1792173, 36.7883482 ], [ -89.2526787, 36.6767566 ], [ -89.3783143, 36.6510584 ], [ -89.5829479, 36.5682532 ], [ -89.7161977, 36.2827178 ], [ -89.7009692, 36.1133002 ], [ -89.966517, 35.7402007 ], [ -90.1958971, 35.4175458 ], [ -90.1882828, 35.2757299 ], [ -90.3120148, 35.0739516 ], [ -90.4747699, 34.9131001 ], [ -90.6622714, 34.6466004 ], [ -90.7155713, 34.4714721 ], [ -90.9173496, 34.2801635 ], [ -91.0848637, 34.0736262 ], [ -91.1438743, 33.8547158 ], [ -91.2542813, 33.783332 ], [ -91.2676063, 33.4530628 ], [ -91.202885, 33.3160059 ], [ -91.2162099, 33.1351668 ], [ -91.2323903, 32.980026 ], [ -91.1971742, 32.7268513 ], [ -91.1505368, 32.5069891 ], [ -91.0610691, 32.4061 ], [ -91.0458405, 32.3109215 ], [ -91.1372118, 32.2661877 ], [ -91.2485706, 32.0101577 ], [ -91.3799169, 31.8350293 ], [ -91.5264916, 31.6380099 ], [ -91.661645, 31.2763319 ], [ -91.7006682, 31.0193501 ], [ -91.6844879, 30.8623057 ], [ -91.6197665, 30.7576094 ], [ -91.5598041, 30.7090684 ], [ -91.3884829, 30.7185862 ], [ -91.3056777, 30.5149044 ], [ -91.2590402, 30.3502457 ], [ -91.1914635, 30.1979601 ], [ -91.0629726, 30.1227692 ], [ -90.9240121, 30.0694693 ], [ -90.8354962, 29.9723872 ], [ -90.7431731, 29.9914229 ], [ -90.628959, 30.0190247 ], [ -90.5252145, 30.0304461 ], [ -90.4871431, 30.0018926 ], [ -90.3738807, 29.9314605 ], [ -90.1673435, 29.8981481 ], [ -90.0740687, 29.8971963 ], [ -90.0359973, 29.9276534 ], [ -89.9874563, 29.9000516 ], [ -90.0398044, 29.7744161 ], [ -89.9636617, 29.6383109 ], [ -89.6181639, 29.3889434 ], [ -89.4582641, 29.3232703 ], [ -89.476348, 29.2100079 ], [ -89.4230481, 28.9187619 ], [ -89.1441753, 28.9539779 ], [ -88.9852273, 29.0938902 ], [ -88.9595291, 29.205249 ], [ -89.0499486, 29.3004275 ], [ -89.2878947, 29.3765702 ], [ -89.4239999, 29.3651488 ], [ -89.7000174, 29.5250486 ], [ -89.9370117, 29.6621055 ], [ -89.8932296, 29.8581731 ], [ -89.8998921, 29.9143284 ], [ -90.0264794, 29.9695319 ], [ -90.2406309, 29.9752426 ], [ -90.4928538, 30.0637585 ], [ -90.6546571, 30.0561443 ], [ -90.90688, 30.1275281 ], [ -91.0220459, 30.2046226 ], [ -91.1343565, 30.3321617 ], [ -91.1914635, 30.5187115 ], [ -91.286642, 30.649106 ], [ -91.3589776, 30.7652237 ], [ -91.4922274, 30.768079 ], [ -91.5065042, 30.913702 ], [ -91.4960345, 31.0345786 ], [ -91.5236363, 31.1516481 ], [ -91.494131, 31.2287427 ], [ -91.4484453, 31.4029192 ], [ -91.3960972, 31.5456869 ], [ -91.3675437, 31.6303957 ], [ -91.3294723, 31.7693562 ], [ -91.2143064, 31.8493061 ], [ -91.0401298, 31.9730381 ], [ -90.990637, 32.0006398 ], [ -90.9849263, 32.1158057 ], [ -90.9468549, 32.1624432 ], [ -90.8630979, 32.1824306 ], [ -90.7793409, 32.2890305 ], [ -90.7869552, 32.3566072 ], [ -90.9478067, 32.4422678 ], [ -90.9830228, 32.5907461 ], [ -91.0382263, 32.7563566 ], [ -91.0534548, 33.0000134 ], [ -91.0268048, 33.2398631 ], [ -91.0382263, 33.4378343 ], [ -91.0943815, 33.5872644 ], [ -90.9972995, 33.6814911 ], [ -90.9696978, 33.8604265 ], [ -90.8792783, 34.0079531 ], [ -90.7653021, 34.145248 ], [ -90.5704242, 34.3786731 ], [ -90.4440748, 34.6285165 ], [ -90.3941062, 34.7448722 ], [ -90.3077317, 34.8291051 ], [ -90.2342064, 34.8947782 ], [ -90.1878069, 35.0204138 ], [ -90.0878695, 35.0675271 ], [ -90.0200549, 35.1174958 ], [ -90.0400424, 35.2659741 ], [ -89.8758595, 35.4758426 ], [ -89.8501614, 35.5993366 ], [ -89.7259535, 35.6685789 ], [ -89.6360099, 35.7563811 ], [ -89.4725409, 35.8177712 ], [ -89.4832485, 35.9141393 ], [ -89.6038872, 35.9426929 ], [ -89.6460036, 36.0062245 ], [ -89.5610569, 36.1104449 ], [ -89.4475566, 36.2482156 ], [ -89.3533299, 36.5394617 ], [ -89.1655904, 36.5523108 ], [ -89.026392, 36.9242205 ], [ -88.9271684, 36.9898936 ], [ -89.0035491, 37.0934002 ], [ -89.0627977, 37.1212399 ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "30",
                "sortOrder": 30,
                "title": "Lower Mississippi - Memphis",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-88.95152066620355, 37.00005370566096], [-88.931264998612235, 36.992183732632149], [-88.958481042822356, 36.988668547841613], [-88.996796683620374, 36.993068278943191], [-89.013427852445417, 36.980166709712911], [-89.06536050650449, 36.968629203248568], [-89.067595571268413, 36.963993733226694], [-89.062127698008098, 36.95688033542514], [-89.068818953549211, 36.946670092187858], [-89.092371684964732, 36.949765255623099], [-89.111859744602398, 36.865333492038815], [-89.111217157913927, 36.841643879242419], [-89.104621026487877, 36.83824578764942], [-89.079224127212697, 36.857173549368724], [-89.067611454310409, 36.846473194826117], [-89.065706797094109, 36.821181446176141], [-89.075842699238919, 36.810280123301595], [-89.089529169495947, 36.806522261390889], [-89.094109836629443, 36.797609140716645], [-89.109658424287389, 36.763354433292392], [-89.107921378270063, 36.736348756185031], [-89.12559905153536, 36.723413009661662], [-89.142301289342484, 36.66687174291414], [-89.171040259865038, 36.638047986318753], [-89.181788959384548, 36.618381192349474], [-89.193683473543402, 36.567871496648124], [-89.247005172901893, 36.556954752997378], [-89.261341633917027, 36.558213644956588], [-89.312609635362705, 36.595701020218627], [-89.346192053595999, 36.574940690103894], [-89.375462626358029, 36.571019309199897], [-89.404352223717723, 36.510956256854918], [-89.404326556053107, 36.491850870665907], [-89.412485522572283, 36.470325599704765], [-89.439075330056554, 36.446076653689083], [-89.467577261954489, 36.440709721808567], [-89.454968188092394, 36.433401046452978], [-89.450619775533482, 36.422677550659508], [-89.452426883384035, 36.394702079153937], [-89.456343217571643, 36.391557286492365], [-89.45621276347434, 36.380204153451039], [-89.449762487554025, 36.369884081905262], [-89.450668813711175, 36.35238026931124], [-89.442253761671978, 36.35048139258312], [-89.428503268385313, 36.356262373962494], [-89.423663960239466, 36.351045048302105], [-89.430978945771429, 36.3134944932306], [-89.438396536100242, 36.312079862881198], [-89.441422137477147, 36.305437798235268], [-89.472162900784639, 36.302095740676748], [-89.479393027302592, 36.248413354421658], [-89.505066623877937, 36.2403918307933], [-89.509534799031186, 36.230384519784813], [-89.543432223971138, 36.225876335201839], [-89.546050087614518, 36.182559966468169], [-89.572520659946008, 36.110610417521791], [-89.579333059001712, 36.108300727673786], [-89.59147817224995, 36.112903782870703], [-89.595102592902194, 36.108226773215144], [-89.603854730246837, 36.110921017073373], [-89.618830469896622, 36.103558917002026], [-89.630304160763629, 36.08438017192934], [-89.664233103077962, 36.056317127404974], [-89.674312561839926, 36.029144375563654], [-89.694977129165849, 36.006868308351486], [-89.697344877718635, 36.000073489969402], [-89.691967636720918, 35.99650946842857], [-89.682555915825915, 35.967347893888643], [-89.666250439803378, 35.950593793344659], [-89.643548099818489, 35.937943212748877], [-89.6320120946272, 35.91413910707108], [-89.592302859157712, 35.91978433363942], [-89.496538966151746, 35.915787539533966], [-89.506821907914016, 35.897370658441716], [-89.518561383407416, 35.886671473278717], [-89.483323955744368, 35.854158492687887], [-89.478527114178362, 35.8422718163444], [-89.483882306311457, 35.832879824242411], [-89.48078994294211, 35.818797048698833], [-89.511762799558994, 35.807607532025159], [-89.550031845562586, 35.803461936047995], [-89.59256596681702, 35.77389344046604], [-89.614640338365362, 35.779179773468137], [-89.621743131300846, 35.793441535598951], [-89.631618114663269, 35.774032621421952], [-89.652163625182283, 35.769792588576593], [-89.690722759376769, 35.742080769217452], [-89.713053283190902, 35.692739384736136], [-89.726330978109672, 35.680182684039849], [-89.761407759477336, 35.672080610136511], [-89.801882176235125, 35.651045483012183], [-89.842479391566343, 35.640359336362579], [-89.853830961947367, 35.630356633172838], [-89.857073060273791, 35.61901580331665], [-89.890049080384244, 35.60579028821153], [-89.892026428347918, 35.599346776946], [-89.886186669111567, 35.584169015003447], [-89.894400908813509, 35.567032833782768], [-89.891134098606898, 35.552784350782545], [-89.875440309778838, 35.570552663011476], [-89.861587379030297, 35.559441347267182], [-89.863441311002404, 35.540113195324771], [-89.870345626729815, 35.526432594273565], [-89.881682649748214, 35.50723845724508], [-89.904058937605157, 35.501023251204138], [-89.912666164590348, 35.492075393006559], [-89.907685863202346, 35.463811895709235], [-89.932367320278161, 35.43329807781636], [-89.950694082520783, 35.41933446330858], [-89.969193094847469, 35.419329098368884], [-90.003563255694388, 35.380042887282912], [-90.017727551870777, 35.374985809828246], [-90.026456564811056, 35.358981835311781], [-90.027767212642757, 35.332160637440666], [-90.041364716434387, 35.327267032554374], [-90.049768502457027, 35.31692961332557], [-90.043049892020846, 35.308115333659423], [-90.042195554887016, 35.286197147125414], [-90.060702895778832, 35.272950662993161], [-90.063013327721038, 35.233175851507305], [-90.0602177261175, 35.22535848954697], [-90.037343482089071, 35.204795986056567], [-90.055054378352679, 35.194865301812115], [-90.050962091770813, 35.174307766975382], [-90.05548013807163, 35.161623756424966], [-90.049170489923398, 35.147862408286883], [-90.025524322771062, 35.125025975549711], [-90.02687763103296, 35.117940225033159], [-90.069991443499319, 35.108807221268869], [-90.09029411765043, 35.083792586985105], [-90.083035079263155, 35.078212237122457], [-90.088591783205374, 35.073028800288128], [-90.143736767764366, 35.073349905465953], [-90.157919435761187, 35.069085809624283], [-90.172374945428857, 35.060049925202605], [-90.181834190211973, 35.043149354709577], [-90.200558090202435, 35.024385966190742], [-90.263622653755718, 35.003115423317041], [-90.267701887411548, 34.972950129593336], [-90.25237884661108, 34.959630468253231], [-90.276051698941927, 34.949257271997929], [-90.280559601596181, 34.958548038397794], [-90.308022213768183, 34.982493224185312], [-90.318831916502262, 35.000094394728059], [-90.319703891477602, 35.013737220409674], [-90.325489951442535, 35.021166512049511], [-90.320609245603137, 35.046564084871584], [-90.309672588631543, 35.062543329888626], [-90.289299093603432, 35.061909195100391], [-90.240695391360973, 35.043239771686594], [-90.207945568325357, 35.061867333523786], [-90.19907238308005, 35.071304180012646], [-90.186181348594218, 35.117957557581619], [-90.172755573573951, 35.131884380245431], [-90.12705962546265, 35.142615859745668], [-90.116101343844704, 35.154610668116845], [-90.124715309591267, 35.187527634190261], [-90.100800180252818, 35.224085072697491], [-90.113172856046049, 35.250152080913885], [-90.149235097581411, 35.249655836868648], [-90.158518822211079, 35.254471133321069], [-90.167732045412862, 35.267664844906371], [-90.171418764571001, 35.281807220737235], [-90.167190605184473, 35.299101465376175], [-90.139176614837538, 35.326559093712689], [-90.144715255768588, 35.34741580104243], [-90.154866393456004, 35.352881037960742], [-90.165903214135682, 35.370894356193155], [-90.189251104077542, 35.389552372676619], [-90.192207105657488, 35.402777714650448], [-90.188469128620966, 35.412153316410382], [-90.163049591239485, 35.43057072547861], [-90.133973289866987, 35.443043585388942], [-90.121933545264469, 35.46879755870377], [-90.106127937279737, 35.482476684989514], [-90.080105233905812, 35.482843428153792], [-90.070108362039761, 35.478905804681979], [-90.053666538941542, 35.4643567403891], [-90.044330226524949, 35.442411537004816], [-90.028835847532761, 35.450413639113407], [-90.023114977081974, 35.468202949459169], [-90.04728242662712, 35.488350129512696], [-90.053258036203161, 35.511926158788548], [-90.044001987223623, 35.550988140160172], [-90.026705093800373, 35.565431324244273], [-90.001374783643072, 35.567235884919299], [-90.000088086253456, 35.561369303850718], [-89.949161486174333, 35.546957158113621], [-89.946707907308294, 35.55530732355254], [-89.959083459529339, 35.589060451028914], [-89.936682675605724, 35.610333194332064], [-89.940378281062408, 35.629977167381071], [-89.923564889331686, 35.644353866240017], [-89.958214777893915, 35.679814538489893], [-89.961352800690634, 35.73208413615798], [-89.882639912562666, 35.772119554085322], [-89.864853849662055, 35.772726718642168], [-89.851713120883602, 35.767093284488965], [-89.830767988135761, 35.775339559701507], [-89.82081070786576, 35.800444873463249], [-89.832460145676336, 35.817018102093165], [-89.832163602041092, 35.830539596502817], [-89.814060966153448, 35.857188044551663], [-89.743548806236106, 35.915952887595964], [-89.718466410353074, 35.918058312005002], [-89.695243987369381, 35.926063678964468], [-89.690448812731759, 35.931758772366578], [-89.69406117757697, 35.9435700086905], [-89.725256239144372, 35.961152886261928], [-89.727906304109268, 35.986772403947825], [-89.739277776126272, 36.000073135568449], [-89.739289533876857, 36.021356337155261], [-89.729850361301828, 36.037343781084239], [-89.697042834760254, 36.061524553875984], [-89.678223355004619, 36.102774885014071], [-89.660929002563279, 36.113707814892912], [-89.635023405495332, 36.119695125812761], [-89.617453328748468, 36.159737218524477], [-89.644928954817885, 36.180486678821097], [-89.656898115224337, 36.195990036195418], [-89.705259753029608, 36.231662940140261], [-89.709815592573619, 36.244537858195585], [-89.702817630827809, 36.257945460483725], [-89.706551524333662, 36.279308616638211], [-89.683120170426562, 36.307237074235104], [-89.655523126438041, 36.314437294951645], [-89.638905205018219, 36.327065130743783], [-89.64407981883717, 36.348578310318274], [-89.638894586533638, 36.366808771680567], [-89.555604320303686, 36.37575355608795], [-89.53607482124248, 36.402760058813371], [-89.572430196212792, 36.444061852601514], [-89.57222734343803, 36.472003509630262], [-89.564949793659324, 36.488382629502134], [-89.56685516135974, 36.498884259519897], [-89.562287173100259, 36.512861921892245], [-89.581389944909887, 36.540380804246617], [-89.583156883112309, 36.556745724520091], [-89.579155896943888, 36.567556484701285], [-89.546780683962993, 36.582136729225006], [-89.495630300087399, 36.586653975267566], [-89.471785013682066, 36.574720494738393], [-89.455366061155331, 36.553523771183343], [-89.418550243575126, 36.551489843182921], [-89.397504860609558, 36.579315566327757], [-89.392968714518091, 36.599145272961373], [-89.376794185409935, 36.62605711558686], [-89.347910279233759, 36.636097286452134], [-89.315138488575144, 36.635934685005076], [-89.281036155036929, 36.609293324838234], [-89.257531463037694, 36.600554447603592], [-89.256487542684425, 36.591470684848979], [-89.242635886634616, 36.580020095004933], [-89.224998175265227, 36.580713753323188], [-89.212003058299615, 36.595468821035368], [-89.208220302444033, 36.643754889263455], [-89.185186192781018, 36.660047467260235], [-89.171050078978467, 36.67878234050518], [-89.173335655280027, 36.688565110665536], [-89.201048030357398, 36.71490468505165], [-89.201951981805564, 36.731111712518569], [-89.184722842033821, 36.755674268943189], [-89.178790692841957, 36.775881772604329], [-89.173926340277035, 36.778224275896115], [-89.177557667105248, 36.787891386664704], [-89.175136216274538, 36.79749007891801], [-89.184454110579935, 36.818044186483398], [-89.181892658101546, 36.846659219199267], [-89.165310026650005, 36.851203909501045], [-89.143129278244373, 36.87657410948659], [-89.13254903787815, 36.899837815257158], [-89.121762170295526, 36.91165726037881], [-89.113931398791735, 36.933247723152959], [-89.115502797819346, 36.945566656125955], [-89.125648256634108, 36.958725005695456], [-89.130851458913725, 36.968808680072279], [-89.144969892418061, 36.971616760793744], [-89.137840229874698, 36.983640264102988], [-89.135383786951664, 36.99873762891179], [-89.155218553027751, 37.008678835549141], [-89.162680162502923, 37.018368755388906], [-89.165460578327526, 37.037432012554177], [-89.161452941376865, 37.054903700557482], [-89.151231232019356, 37.07140991205155], [-89.099382511652436, 37.11255304137741], [-89.086911016338917, 37.117371975317035], [-89.064859736089218, 37.117488117647895], [-89.041857804176161, 37.111485204903055], [-89.010351205290149, 37.094084067304735], [-89.006791847662399, 37.065293469861309], [-88.974137531589307, 37.037082117296258], [-88.95152066620355, 37.00005370566096]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "31",
                "sortOrder": 31,
                "title": "Lower Mississippi - Helena",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.276051698941927, 34.949257271997929], [-90.25237884661108, 34.959630468253231], [-90.242925937227469, 34.957435087634778], [-90.236137894161075, 34.944485531425833], [-90.234277834313147, 34.905696509484379], [-90.278000628486524, 34.871173593683451], [-90.299612608244232, 34.846152246261809], [-90.30903510400654, 34.842305380264598], [-90.325052259597015, 34.844095895967946], [-90.363698846286695, 34.825829579490694], [-90.398754470074508, 34.820269986505245], [-90.405995481365167, 34.812584810425186], [-90.395283642516347, 34.791901957171653], [-90.402424925502189, 34.77348921917087], [-90.397986201008365, 34.761859623046533], [-90.399948976473013, 34.751627873064336], [-90.416721517189487, 34.739365982656764], [-90.439520795116053, 34.736780786216279], [-90.465374668431963, 34.716590519423256], [-90.449738058936475, 34.692655725692376], [-90.445823715961907, 34.649948172852667], [-90.454483136675918, 34.634537170379225], [-90.465962150365016, 34.630179350661436], [-90.476858605509406, 34.605620544720203], [-90.505725835842043, 34.592241822773914], [-90.52134374533712, 34.591385218683939], [-90.510668231325496, 34.572964546169842], [-90.508744602289084, 34.557245411007877], [-90.514763195894517, 34.545560982164474], [-90.540659171208418, 34.528597949157344], [-90.540223759736278, 34.50659888125471], [-90.551793820916274, 34.491056288984161], [-90.556325645441163, 34.466634955764761], [-90.548236085095127, 34.438265718075087], [-90.552650913204261, 34.428799941753027], [-90.572297893224643, 34.408187969346713], [-90.608918668093352, 34.383217171558087], [-90.635314425419992, 34.376785781591551], [-90.647679227523724, 34.358726750079313], [-90.659145496343754, 34.314422458203772], [-90.670653679524108, 34.310944987981848], [-90.689919142125873, 34.317704529217224], [-90.701910330132847, 34.316397226046533], [-90.709238358094012, 34.306797181351342], [-90.709722902893404, 34.289141733706316], [-90.725823814055602, 34.256451836182904], [-90.720846894527284, 34.223913483197741], [-90.736932589039228, 34.191131123843348], [-90.757484480008728, 34.173388513734587], [-90.783949070296742, 34.16962668776555], [-90.787977064066823, 34.165013217366244], [-90.785794908116316, 34.153166760716196], [-90.818021858230594, 34.131926148501684], [-90.837977406143125, 34.127678916243703], [-90.868035514152297, 34.131173541718837], [-90.879010096249075, 34.117480136558036], [-90.880589396021719, 34.102183881752232], [-90.87251861248842, 34.099792125333181], [-90.863674749035198, 34.080983132414538], [-90.867201633341409, 34.070137382159047], [-90.86130197953041, 34.059218629906923], [-90.86096226205359, 34.034246125565353], [-90.877339396248601, 34.020556189084921], [-90.930441405450438, 34.014871425882085], [-90.939333609731236, 34.005553874451849], [-90.938603745392953, 33.997060821646016], [-90.945435519305931, 33.996634655591478], [-90.951019257837572, 33.98068176018991], [-90.938221543911098, 33.963881937953097], [-90.942213729592424, 33.951056110475591], [-90.969190191369279, 33.93175949429012], [-90.996036980996223, 33.931115262681352], [-91.018263536784815, 33.901361248364353], [-91.037522082455283, 33.887063804240711], [-91.028770209896351, 33.849509825040045], [-91.032881658921838, 33.840020027299083], [-90.986714516430496, 33.808808651956895], [-90.982797524342217, 33.787198267115379], [-90.994802757920667, 33.768189225677467], [-91.023200636759171, 33.758998110824187], [-91.022694499497916, 33.7342869928803], [-91.036919182453175, 33.749390228273739], [-91.062903092414089, 33.765213359820542], [-91.075634499996042, 33.784795165672385], [-91.065383672212548, 33.784365179556602], [-91.056503617017285, 33.790086437751718], [-91.050952308267355, 33.810825163593236], [-91.06129188082727, 33.831181813160129], [-91.078605430972104, 33.849302376733775], [-91.065882871297646, 33.900039651635325], [-91.067084774074416, 33.908986004911654], [-91.080192100530795, 33.922441535303768], [-91.075712903974917, 33.948156420016289], [-91.098978339961988, 33.962667880672164], [-91.102587357350018, 33.980304279536774], [-91.080217578543653, 34.029441820026797], [-91.073397481283465, 34.076480410911152], [-91.053496852083526, 34.084011840301869], [-91.02068139056226, 34.08286307279284], [-91.001642307128463, 34.090400424962446], [-90.979036906984959, 34.092827930006273], [-90.966807552578132, 34.100922136051601], [-90.96430567810458, 34.114671403823024], [-90.972793367712882, 34.144826516840936], [-90.96928497427055, 34.155315321544919], [-90.956849145975852, 34.167008620941949], [-90.923233150037603, 34.179428734644873], [-90.915732193927767, 34.188679487696277], [-90.942210095412619, 34.2240015608105], [-90.936767938152059, 34.246534782163678], [-90.930324994448242, 34.252377634734337], [-90.854094835480765, 34.251982660516916], [-90.8433233901401, 34.256932583956051], [-90.838748585000516, 34.28262986293624], [-90.82401986676409, 34.297513605166749], [-90.784593030054879, 34.300961241197719], [-90.768038987476118, 34.310485525642925], [-90.765402591717347, 34.33179892914093], [-90.772847509732827, 34.342027792227697], [-90.773657110595011, 34.360521470861435], [-90.759429710561193, 34.376035177213879], [-90.740747328226504, 34.387141504857041], [-90.711711355865461, 34.394808966960852], [-90.671434013488849, 34.384142770230824], [-90.63832899238956, 34.397032109224284], [-90.630456500254226, 34.409859642623857], [-90.612999083383116, 34.419167587389296], [-90.598130515975953, 34.421581409373275], [-90.594905134039223, 34.431522705117665], [-90.600203658534824, 34.443973386633047], [-90.595967275993431, 34.462455610201978], [-90.603605631203735, 34.476935424809042], [-90.595639971825406, 34.500031809438234], [-90.585222768319355, 34.51361760629436], [-90.583797886901181, 34.54747538083091], [-90.591807953724881, 34.556824934923355], [-90.644792809473898, 34.586868846912175], [-90.663840772248264, 34.622649507955721], [-90.640232538580889, 34.635717814034422], [-90.624729240994299, 34.617214742772589], [-90.603316162835966, 34.618420960214962], [-90.593672071191662, 34.623731102789684], [-90.59220323869495, 34.629201127624896], [-90.597334008595723, 34.632816096578331], [-90.614080886498911, 34.63088854778983], [-90.626483794482596, 34.63581354815674], [-90.631120972572461, 34.649061528547939], [-90.627958497902597, 34.664141295278455], [-90.596399013008451, 34.687231012951855], [-90.594147329542565, 34.693314889741934], [-90.600326660331561, 34.709747640605187], [-90.596306320595872, 34.716517593951906], [-90.577372415130426, 34.721643969330678], [-90.570948076182418, 34.743145345883669], [-90.558566775578441, 34.755426652701047], [-90.54470666675833, 34.758575530419542], [-90.549455885522434, 34.782461704488526], [-90.541905326542704, 34.797359126009717], [-90.529648952377542, 34.805043897088488], [-90.488836218831651, 34.806288881154551], [-90.480278439408238, 34.821522455077208], [-90.467144599665005, 34.825485980233111], [-90.486684160714432, 34.862115149486847], [-90.486741342831792, 34.874464302666802], [-90.479097452019829, 34.888183231258701], [-90.45802308242196, 34.893786222263195], [-90.437105820683541, 34.887311741965796], [-90.430630913768994, 34.880960054797391], [-90.425389681620615, 34.863277823055022], [-90.413721250275557, 34.851765987533739], [-90.358711771460264, 34.86176738348383], [-90.314420220786772, 34.884775420251799], [-90.278627906463541, 34.911466927465867], [-90.272978642989813, 34.926569659803668], [-90.276051698941927, 34.949257271997929]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "32",
                "sortOrder": 32,
                "title": "Lower Mississippi - Greenville",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.15389717167777, 33.816726491616457], [-91.14667763378759, 33.810850140557555], [-91.126884405727466, 33.821642256521287], [-91.119108591407482, 33.821433721857524], [-91.111899215341836, 33.815193730583523], [-91.118746422055551, 33.793842244577974], [-91.115080887627386, 33.788645919097668], [-91.098062729154194, 33.786493795905386], [-91.085807001157647, 33.793517852770243], [-91.075634499996042, 33.784795165672385], [-91.062903092414089, 33.765213359820542], [-91.036919182453175, 33.749390228273739], [-91.022694499497916, 33.7342869928803], [-91.021827695603477, 33.715792553260535], [-91.031037401934981, 33.704849695716518], [-91.02416369191684, 33.680127661257195], [-91.032510794417135, 33.668991358867352], [-91.085584949714629, 33.654314320200093], [-91.152111800637513, 33.670016174837308], [-91.167095850861315, 33.655361719479309], [-91.147300355447427, 33.643167912206337], [-91.134028990288243, 33.64350997254266], [-91.120849002528288, 33.620051231220287], [-91.123733121737445, 33.611439928500147], [-91.120374061234003, 33.587677151595472], [-91.152611285343468, 33.556964994718157], [-91.152749475467232, 33.535509653534369], [-91.118474285287675, 33.507228085237159], [-91.109702798006538, 33.494832050719808], [-91.10860261211198, 33.481200644337832], [-91.054626959490307, 33.459724128906451], [-91.048614434318083, 33.449621893993495], [-91.052050078717528, 33.42614445068876], [-91.066034547345367, 33.411665971486364], [-91.083089616332117, 33.374963835264168], [-91.095483342140255, 33.363793953740178], [-91.127234115293561, 33.351922300769459], [-91.139663763607913, 33.338675447159865], [-91.138793426538285, 33.299169290054358], [-91.105965153053262, 33.277758645127847], [-91.078347690571547, 33.293205750215435], [-91.05132893169322, 33.291164213638488], [-91.042777275204955, 33.284629570026041], [-91.037021753673315, 33.268491721429669], [-91.045459448449975, 33.241844904781431], [-91.077526111257171, 33.218809826328204], [-91.064200862939359, 33.161803270467843], [-91.075879252599478, 33.142867660661651], [-91.076994831552511, 33.131162993036128], [-91.115153588574515, 33.10658741712939], [-91.131550245474656, 33.106654661288431], [-91.145245044198234, 33.092612539088833], [-91.116647581620683, 33.057200778044979], [-91.12627078119371, 33.02299218407591], [-91.147679198074911, 33.008070997960786], [-91.142979178115468, 32.991368974783406], [-91.137674806321129, 32.989215114722612], [-91.100860235905515, 32.999669961595821], [-91.087474374545366, 32.995227313423719], [-91.072092323601623, 32.979386702107554], [-91.060668705905215, 32.954041851486934], [-91.06082134041246, 32.942225060528749], [-91.051451985669928, 32.930714087140139], [-91.05554306953556, 32.890543109048281], [-91.074153055907928, 32.875131953605731], [-91.076227594587976, 32.853421816790153], [-91.089312462849406, 32.841082634333468], [-91.097551295631732, 32.840394421990446], [-91.112916662217927, 32.821049456967593], [-91.131194608502071, 32.779641445736168], [-91.102681448325853, 32.760361897686046], [-91.067954572933573, 32.762451321585011], [-91.04701222571434, 32.753919320260366], [-91.038534648267188, 32.727085453842506], [-91.057153755620249, 32.695074987241107], [-91.068070926143477, 32.663667719141174], [-91.042943406156951, 32.647765282837476], [-91.015016000622964, 32.647960904839273], [-91.001931310747096, 32.637379797179442], [-90.9922470695806, 32.61783074199893], [-90.997211966788797, 32.605459879529668], [-91.03849406751749, 32.568848184368157], [-91.067894105958487, 32.558474118733535], [-91.065399322401788, 32.55076725361527], [-91.078512435085912, 32.539961006128834], [-91.071784177968169, 32.516221830107447], [-91.075939202858351, 32.486243600554737], [-91.069606840862889, 32.478929093275674], [-91.032433653652774, 32.466538652122495], [-90.99749099428449, 32.46427855128686], [-90.955657517072027, 32.442410105271577], [-90.964051440404447, 32.419178111842911], [-90.986097650868658, 32.393549764513956], [-90.995384348857399, 32.372584632009591], [-90.984242789067622, 32.362394439431938], [-90.959280066121309, 32.352884273100251], [-90.914563513786376, 32.352699490785916], [-90.896106944142758, 32.337870933801014], [-90.894890808719367, 32.330813822995516], [-90.921929283406655, 32.328010987238336], [-90.952274028476069, 32.329223854470577], [-91.013731219832934, 32.354830689152408], [-91.030464343493222, 32.386395910778248], [-91.018188905776682, 32.408218327756416], [-91.020664775453071, 32.416466435816879], [-91.03301770651575, 32.425227988043368], [-91.052315358995997, 32.427602260907271], [-91.084857387911654, 32.442170922831856], [-91.113560295656015, 32.467862713035764], [-91.128032416817305, 32.493067790476246], [-91.130766668673616, 32.520172295253296], [-91.124397219387035, 32.570240675401834], [-91.147309084180975, 32.589973990393489], [-91.17494775578507, 32.650009301439347], [-91.172352667519377, 32.662242099382752], [-91.178461022395311, 32.676312095404079], [-91.172325185546498, 32.689577807092427], [-91.154333346402083, 32.698518590405151], [-91.133017489605464, 32.697933983890401], [-91.112182210367465, 32.70989487473625], [-91.128039641856986, 32.721676001275462], [-91.156133200671547, 32.72488629136194], [-91.163493888413086, 32.735187552630556], [-91.178460920493109, 32.744066302375224], [-91.176825379582496, 32.782203595512421], [-91.164758437405013, 32.808281682810907], [-91.169053583886338, 32.817455557248252], [-91.156905706443084, 32.847050657414975], [-91.162563447666329, 32.852366050684687], [-91.157888565849646, 32.876835622292838], [-91.163940721541266, 32.899296767437711], [-91.197780785439619, 32.906551600980258], [-91.21206927932991, 32.918843545172976], [-91.214597626582901, 32.931240264973624], [-91.209491416378455, 32.9457824827888], [-91.224957579432711, 32.979651014688088], [-91.219396424388165, 32.995449851591701], [-91.203845555114796, 33.015110582476368], [-91.191886017878176, 33.023953657617675], [-91.171863285304795, 33.029075804686741], [-91.167642091403977, 33.056783979791923], [-91.178771480804883, 33.077865498042208], [-91.208236324196278, 33.09866803200083], [-91.211152387758631, 33.113224825150283], [-91.204803171185063, 33.130086205365366], [-91.187328005466938, 33.15075339620914], [-91.164064716155409, 33.160692958088646], [-91.146446293836476, 33.157095282430021], [-91.124512069980867, 33.164793797198804], [-91.113711373388043, 33.173287256510406], [-91.103297807133131, 33.193415608333041], [-91.106695126398321, 33.204918829182589], [-91.11327024793934, 33.208445642763238], [-91.120788941628049, 33.222984069383585], [-91.147703396397631, 33.244122316716116], [-91.153321103313203, 33.267648680918931], [-91.162261092487384, 33.276436799611339], [-91.166372585247771, 33.290200718020174], [-91.187756784288183, 33.305029259536013], [-91.194163036549924, 33.317203976296533], [-91.193443749952522, 33.331079296120222], [-91.181533936157351, 33.345603364280826], [-91.187660165360128, 33.355788585244078], [-91.171934685805056, 33.352314161149074], [-91.139033445107231, 33.372924814058599], [-91.174027464070136, 33.37533596408268], [-91.196580128145683, 33.38675354758746], [-91.214029554994028, 33.400799301889499], [-91.20958329145499, 33.418137674727134], [-91.212493085814586, 33.423047083595819], [-91.236197233443519, 33.431591576656736], [-91.244936241797987, 33.440911951418315], [-91.256416965040017, 33.442423472804855], [-91.261908678508888, 33.452870039423004], [-91.250687246073724, 33.459655292345289], [-91.242893827180907, 33.472439389362279], [-91.235234595078666, 33.51001727248623], [-91.233091401552912, 33.540913275404691], [-91.241494016749783, 33.556629849834316], [-91.24173895899672, 33.576197896559961], [-91.233540458089394, 33.59231113831364], [-91.20390043712591, 33.602705137247632], [-91.192178938416205, 33.611640752313285], [-91.209169312953378, 33.639384868755393], [-91.230422570085537, 33.654476184904659], [-91.237518520191443, 33.666027526382322], [-91.238527906409331, 33.695523696823912], [-91.229957485333031, 33.697746161203376], [-91.215677859091841, 33.71494207439693], [-91.223842160817554, 33.727139087692905], [-91.242363562401607, 33.734525559380899], [-91.253727121571274, 33.748929880374916], [-91.251163952698391, 33.763320399691274], [-91.244311101400314, 33.776206501192057], [-91.237365622599341, 33.777821111781464], [-91.225433294058988, 33.790632984031149], [-91.16654428968387, 33.801497288617874], [-91.15389717167777, 33.816726491616457]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "33",
                "sortOrder": 33,
                "title": "Lower Mississippi - Natchez",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.816652047689871, 32.369185669629772], [-90.79514765827092, 32.349236270144715], [-90.786174923321127, 32.329594884500395], [-90.798268543071003, 32.290833483230557], [-90.812073383900696, 32.27302956254136], [-90.813281183890751, 32.253743803596151], [-90.834318788781346, 32.252571253303557], [-90.844041229045757, 32.240828168843258], [-90.839491659807706, 32.218017101774315], [-90.879847406705323, 32.202186720186148], [-90.879288365511826, 32.194329101550487], [-90.896897155562684, 32.18947774061067], [-90.90429970271822, 32.181120359818991], [-90.914785885135359, 32.195456050934609], [-90.917967454886494, 32.209312061349735], [-90.931486287584931, 32.202494320148894], [-90.943440856326347, 32.213153722998442], [-90.955743482954631, 32.213170968181409], [-90.976540526206605, 32.193747126302839], [-90.975267113797756, 32.165217104324626], [-90.991673376307872, 32.137508599937156], [-91.012103150566958, 32.119151795189332], [-91.030979995059724, 32.11349199547999], [-91.051714813944628, 32.090171017612924], [-91.055289973388312, 32.046648492365442], [-91.041345606064553, 32.030377208963287], [-91.020773981020668, 32.032043687358829], [-91.011228918504131, 32.028016012553778], [-90.997356925187248, 32.00015643837834], [-91.015824794014591, 31.990350554698981], [-91.044449344852495, 31.998101580957766], [-91.066681502173566, 31.982929954503419], [-91.147623386639879, 31.968445792212442], [-91.187041280072847, 31.933753910905221], [-91.186862090625283, 31.921396276695429], [-91.193181188228166, 31.912015280827045], [-91.18781956684343, 31.910407762606823], [-91.191244437748622, 31.902970023797266], [-91.23022627142447, 31.861131289241545], [-91.249699173644245, 31.848774850704114], [-91.275600665867188, 31.842726310113679], [-91.296665427887461, 31.852299043757942], [-91.322083093785821, 31.837936043768671], [-91.350130131660222, 31.811967642016604], [-91.348735989567245, 31.777769038617322], [-91.375172277298162, 31.733916942046893], [-91.384485197933614, 31.696335246561048], [-91.388904292607279, 31.648589750795495], [-91.377650285129178, 31.628784005651735], [-91.392934961895577, 31.610759526545142], [-91.399835636529872, 31.54680842916552], [-91.413546738496279, 31.54589696409943], [-91.426433232104046, 31.531444296609536], [-91.448587730904165, 31.535684181989211], [-91.470046527442875, 31.524756241048259], [-91.48672373442858, 31.509623391552267], [-91.492948677332919, 31.49589630919915], [-91.494878697682509, 31.474182493613306], [-91.483186722970999, 31.455191991801417], [-91.471613953018704, 31.448471334154576], [-91.476405516863949, 31.432202405639988], [-91.458543300978704, 31.40510965766487], [-91.458011244648162, 31.386343385645311], [-91.48575863174122, 31.335441801254468], [-91.503403102956085, 31.316615761952143], [-91.49774078444743, 31.296165721450077], [-91.507373062986389, 31.265250732840467], [-91.499369884688008, 31.246755562139111], [-91.513998924041843, 31.224827521279654], [-91.528948448955475, 31.215529171814062], [-91.524693378006475, 31.17885888771778], [-91.534943546211366, 31.160754726366736], [-91.545883607388504, 31.152129748659764], [-91.563060984687908, 31.14709066355698], [-91.582901092705811, 31.160209851270938], [-91.595168154651518, 31.139689053718435], [-91.592973495797935, 31.110979865923543], [-91.580630087463533, 31.087932794767838], [-91.564290646735927, 31.073048084999286], [-91.553440419185449, 31.069680683961447], [-91.531057237410636, 31.073304516413959], [-91.524431293145199, 31.081438726544402], [-91.513176611380501, 31.077158897993378], [-91.506268117329824, 31.06986416336121], [-91.503375679133839, 31.047280186117437], [-91.512340021024144, 31.050358822253322], [-91.511216563123824, 31.041777658541452], [-91.519016172484697, 31.032216487998692], [-91.535782100924848, 31.03890173050538], [-91.548056846073422, 31.031103480968682], [-91.559874280021106, 31.032589317670983], [-91.568754117593727, 31.020510910048461], [-91.593268385019769, 31.006437897039575], [-91.639819114681686, 30.990799002804494], [-91.663624675993319, 30.988341337157234], [-91.674182566376516, 30.982134657220833], [-91.693927615160689, 31.000174907850269], [-91.676952796780867, 31.000179306604604], [-91.663890445996302, 31.012600614326463], [-91.647933913623021, 31.007561875076622], [-91.626161656344721, 31.01364715919927], [-91.594325599955553, 31.034050325875], [-91.574844163393834, 31.054404262346907], [-91.579792722417807, 31.066907014773076], [-91.612221366768168, 31.08566077938605], [-91.640756862439076, 31.128091953681171], [-91.637289972613019, 31.150244981485702], [-91.624371738305157, 31.165620279571783], [-91.63109598084678, 31.208359643393251], [-91.661186659538103, 31.240517842225984], [-91.659360035425877, 31.265484719531116], [-91.646881293338751, 31.278613471527866], [-91.62942637823275, 31.286908124299703], [-91.608684619189717, 31.282805550588101], [-91.587219204702322, 31.285006451261015], [-91.564509198544044, 31.279250845294609], [-91.542888906684553, 31.284690103672713], [-91.531361698773253, 31.302958018536639], [-91.528529709018983, 31.322770925124271], [-91.554326175459977, 31.333347256388112], [-91.576307727181586, 31.353255798455109], [-91.585404870675035, 31.398277610633464], [-91.581783590988607, 31.415102953089018], [-91.52525362821946, 31.483916634960586], [-91.526356571186909, 31.520639131555996], [-91.51857948511406, 31.53281595404686], [-91.444648284465416, 31.550787395536844], [-91.417653660214711, 31.570750819305239], [-91.417689209253552, 31.581033265073771], [-91.423541094547573, 31.583992038794289], [-91.481651790724271, 31.581628767716875], [-91.497277877897176, 31.586412296225468], [-91.523485249460208, 31.608545189099207], [-91.522244800355068, 31.633424537878046], [-91.515657602646371, 31.643090983475343], [-91.496911323057631, 31.654506029398515], [-91.481817901581337, 31.655139247237923], [-91.46063648530955, 31.647668726179447], [-91.433254997022686, 31.651575618006571], [-91.421307772632801, 31.65945693210001], [-91.412983704041139, 31.671258945272182], [-91.416843564624116, 31.679964725829873], [-91.411249895214056, 31.686207509900715], [-91.413125026921819, 31.712206284751566], [-91.404198501899984, 31.752411103611479], [-91.394054607115137, 31.771042171416457], [-91.393306082745454, 31.795834779781956], [-91.387241748934514, 31.804327421172978], [-91.369597294748431, 31.810414799287894], [-91.357339626480737, 31.822432629622071], [-91.34562710142815, 31.868548306906298], [-91.319011702854354, 31.884521628310537], [-91.270764212189022, 31.880719606088242], [-91.260022596506403, 31.884090722349757], [-91.230809394952601, 31.918678440011011], [-91.198061837051213, 31.943559589444405], [-91.193385537411416, 31.971450418076646], [-91.182706003699579, 31.981668469415741], [-91.188503900809906, 32.002772377738225], [-91.175377457581163, 32.008271177134489], [-91.167215541900518, 32.003640945328875], [-91.138162307524709, 32.011613559716928], [-91.121858655394504, 32.027344618647], [-91.12683311589997, 32.037701967665527], [-91.152433661239144, 32.033383643771053], [-91.171633553867451, 32.036728477699469], [-91.181041582926099, 32.058696385721468], [-91.181900610582048, 32.074047597155413], [-91.162517003671198, 32.105710746632063], [-91.174103598984146, 32.130237828087232], [-91.178716964683673, 32.159173843382469], [-91.163542956788135, 32.201903259714342], [-91.125740422195392, 32.219576755010209], [-91.120222738421774, 32.24015575518002], [-91.086557265788144, 32.246692266298432], [-91.009698247096196, 32.243618828728202], [-90.994544194038539, 32.247621693907355], [-90.98857053826832, 32.258623892525733], [-90.992345938460787, 32.279795187204094], [-90.985952697723889, 32.295209612769121], [-90.92439960722524, 32.322187064669514], [-90.921929283406655, 32.328010987238336], [-90.894890808719367, 32.330813822995516], [-90.87960264459538, 32.339671120018892], [-90.868352239162434, 32.357344999016988], [-90.835257844407579, 32.359761278341168], [-90.826300819089511, 32.36998292935575], [-90.816652047689871, 32.369185669629772]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "34",
                "sortOrder": 34,
                "title": "Lower Mississippi - Baton Rouge",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-91.674182566376516, 30.982134657220833], [-91.663624675993319, 30.988341337157234], [-91.639819114681686, 30.990799002804494], [-91.638837006818562, 30.978879374927597], [-91.627424403013094, 30.971540743736327], [-91.624966068529474, 30.953107320648837], [-91.609145830549039, 30.946893006535937], [-91.600117794877292, 30.934344764033352], [-91.592208771074922, 30.938409206916322], [-91.579492734427618, 30.934841415354491], [-91.568449290843489, 30.938510667121982], [-91.531546451761713, 30.915268288964505], [-91.525441253935483, 30.917636790532004], [-91.52285872741264, 30.929065505892044], [-91.513111668080185, 30.930036236820129], [-91.511810343045255, 30.912699186134923], [-91.51782449747634, 30.902661412140702], [-91.509833290386865, 30.871531458200579], [-91.509630436996162, 30.810267006768893], [-91.54334918268907, 30.778346946206067], [-91.582702980790671, 30.766600959185169], [-91.585349987249941, 30.757066556754399], [-91.580184266252317, 30.746000442262805], [-91.566826384362287, 30.738184486310484], [-91.551078532724731, 30.736658608352631], [-91.500715251820282, 30.751696537704436], [-91.456557796400006, 30.743419538699492], [-91.396595713946581, 30.762905608416585], [-91.371881811678719, 30.760252250148014], [-91.35952055753684, 30.743857055225877], [-91.340493147760256, 30.696155710115093], [-91.327579202470602, 30.676232399914987], [-91.291924184063447, 30.644369646076328], [-91.291492292578823, 30.615493955531083], [-91.280992262746821, 30.601730235697001], [-91.255684963477819, 30.582357214342409], [-91.23383534190819, 30.551024489624247], [-91.233171469845331, 30.524401317386801], [-91.203645951036378, 30.526343211109246], [-91.194536894526678, 30.517375661238837], [-91.188567370761845, 30.457203023387404], [-91.196130756409602, 30.414090533776829], [-91.204552580268427, 30.397513506068716], [-91.227983520070865, 30.373652271654507], [-91.234560619083211, 30.355063589390657], [-91.226755778978344, 30.34945394262196], [-91.173555051509794, 30.351971975923824], [-91.147003689999821, 30.342305113049999], [-91.136623133015618, 30.330249063286779], [-91.140427560994766, 30.316046366169726], [-91.146843752089993, 30.312167660241553], [-91.189691749093811, 30.311682675403755], [-91.224429246571788, 30.299708120140657], [-91.205073677010006, 30.283563038158746], [-91.145635803821094, 30.282466016945769], [-91.115834688288203, 30.269951152507758], [-91.107156432323592, 30.261796066774831], [-91.106626804992544, 30.246090150982113], [-91.147595106234931, 30.211305505520222], [-91.154983593210588, 30.193904016395894], [-91.150687276677999, 30.184821488102791], [-91.142730574912193, 30.182724470413515], [-91.08372082739767, 30.216343651867], [-91.057027789782666, 30.216220923906231], [-91.031067502603435, 30.205368519884747], [-91.0167624862016, 30.193605116954519], [-90.994204288703187, 30.158888826649537], [-90.997571267984796, 30.141255582458871], [-91.016896173690327, 30.119533173102802], [-90.95686934366347, 30.111758910304921], [-90.95225556332791, 30.11412263061365], [-90.945992515524324, 30.135949834584668], [-90.937107401844841, 30.138968233246878], [-90.922761534469757, 30.135133142374272], [-90.91215260724033, 30.121432398185782], [-90.906465943424237, 30.090937283023738], [-90.896460277238603, 30.073543924796169], [-90.881783853964677, 30.066271630855972], [-90.856048936569351, 30.066938893255973], [-90.839502245584569, 30.055210895073763], [-90.827113119970107, 30.000212484134774], [-90.820845159930315, 29.989723200832742], [-90.777957466839808, 30.015752598835796], [-90.739627589754164, 30.019341460779682], [-90.726526217021089, 30.01659007425334], [-90.67421981155637, 30.050411055672186], [-90.662224681677912, 30.053445814857461], [-90.641110858810961, 30.051805477674492], [-90.620718765192805, 30.037365814086819], [-90.582144043209212, 30.054795767774916], [-90.528780057408312, 30.049205317694188], [-90.499696548437058, 30.059572230708536], [-90.486856468486749, 30.058876192165908], [-90.474604929433795, 30.051334842888327], [-90.467881780626243, 30.038486927110483], [-90.469528609416571, 30.006314410582537], [-90.44925342964325, 29.999705258829195], [-90.451828736921698, 29.992266440372418], [-90.466035424832754, 29.995787941792841], [-90.479910440778454, 30.005609363925306], [-90.482633768139138, 30.03317530147968], [-90.491595170427885, 30.047781736359951], [-90.536166325463284, 30.044021669457578], [-90.582118692513191, 30.04730823995218], [-90.599802909249874, 30.040596047980699], [-90.616396884956998, 30.027364716461026], [-90.62825648860111, 30.025594611474705], [-90.637494243107255, 30.029458996970661], [-90.647930000695283, 30.044079664935243], [-90.657709431919656, 30.047050842242371], [-90.673906153703783, 30.041654842587089], [-90.727447118395702, 30.008035867656403], [-90.776802388825857, 30.007162772103484], [-90.80871508198689, 29.98068102392001], [-90.820595132987791, 29.977538129633412], [-90.835137526053899, 29.994740446470274], [-90.847752577816564, 30.052547506994884], [-90.864290472010921, 30.059853571812724], [-90.888979051960035, 30.059530926941903], [-90.902509416301427, 30.067054666122196], [-90.911305763089629, 30.077840415759621], [-90.92027772253364, 30.119935288272497], [-90.927033827680077, 30.129336786465608], [-90.939288795331066, 30.128896125889305], [-90.941753562214458, 30.110169625049881], [-90.955833268992421, 30.101635868123527], [-91.033189017915376, 30.114275260835804], [-91.032248328788086, 30.130319841684699], [-91.008530008694535, 30.143406901614846], [-91.004167022013704, 30.153896114356872], [-91.012441837426138, 30.17089472256928], [-91.040642942404943, 30.199106644611152], [-91.08666502376758, 30.203756142079261], [-91.138074508470282, 30.176342957000884], [-91.156727725638135, 30.178320528720242], [-91.16823950383008, 30.190300745437931], [-91.167694691891057, 30.208520153428758], [-91.125311529290187, 30.241575162760331], [-91.117232263891992, 30.256618672732273], [-91.141161372902971, 30.271666046295444], [-91.167177025403504, 30.275551583693851], [-91.202964677960566, 30.27379017665567], [-91.225645656984724, 30.284114259599239], [-91.235795182605742, 30.303651373532471], [-91.219640066989015, 30.317326874691698], [-91.227857589128377, 30.334492388889139], [-91.239013126051404, 30.338793063829666], [-91.247194539922489, 30.352436697920883], [-91.239671687206254, 30.377509436125706], [-91.202970129990405, 30.427086156447437], [-91.199696644772757, 30.440934760029023], [-91.202567183371585, 30.511352028386501], [-91.217182298059484, 30.515522444839121], [-91.266581444183899, 30.497328969778849], [-91.283204752393672, 30.499894741890603], [-91.291724902528173, 30.507134421828098], [-91.296107800855907, 30.518649758788076], [-91.283583524942571, 30.561253958375428], [-91.31895657831015, 30.571369337791559], [-91.323012438574139, 30.584052724648785], [-91.311987261072346, 30.630557609294907], [-91.322107234786571, 30.642597599224665], [-91.351525095826716, 30.661288897071312], [-91.358161862616356, 30.688441379743267], [-91.354038414032345, 30.697681388362653], [-91.356782543395298, 30.714408810907983], [-91.366154081812411, 30.734465665553991], [-91.381619010782103, 30.746477957296097], [-91.396413303184801, 30.748736852635947], [-91.416062695176251, 30.735174481237028], [-91.457545851421713, 30.727281932752398], [-91.518381460391055, 30.730334663147445], [-91.554164224332553, 30.718826827203635], [-91.574266218443881, 30.722297453154706], [-91.584379756178635, 30.730528106564641], [-91.603499645282426, 30.758885006063579], [-91.595944362646264, 30.775587311416313], [-91.570650423621743, 30.797417364860252], [-91.579460818342113, 30.816553839681816], [-91.589701418408609, 30.816755586035306], [-91.618806623828419, 30.835384990433628], [-91.647703271466185, 30.839928337684309], [-91.67121789819339, 30.863362331012627], [-91.671414939534941, 30.879424117097958], [-91.657224837368915, 30.921866722462592], [-91.663552641532505, 30.955948744107495], [-91.669796092317597, 30.95862975641823], [-91.674182566376516, 30.982134657220833]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "35",
                "sortOrder": 35,
                "title": "Lower Mississippi - New Orleans",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.44925342964325, 29.999705258829195], [-90.404018155999225, 29.994136730259829], [-90.390703450426116, 29.980431514883826], [-90.386707030060634, 29.955182016452188], [-90.342720135980073, 29.93870149263952], [-90.319523056736202, 29.942655918481233], [-90.298546623263235, 29.96388135773579], [-90.283088182222045, 29.972407002567152], [-90.252692838757312, 29.974125474025087], [-90.228429124649807, 29.963968104772462], [-90.211357044691468, 29.930231492980987], [-90.20565412614917, 29.926863370838557], [-90.158459614582867, 29.958967487129019], [-90.142919653157904, 29.959176878890815], [-90.135395215299866, 29.950803957207455], [-90.131646760032623, 29.91924108295715], [-90.103430513272031, 29.91420685897485], [-90.065678761518356, 29.927269299952346], [-90.059733899656649, 29.960242398051101], [-90.049084419635079, 29.963162776779011], [-90.031678531334094, 29.959977408240647], [-90.027405601439909, 29.967819943208134], [-90.023926737223036, 29.966388589390174], [-90.025099343087973, 29.958388409236537], [-89.976483948420878, 29.929074688503448], [-89.929666919392147, 29.924982878569367], [-89.914000719349943, 29.913244923370879], [-89.905446880046838, 29.900356672079788], [-89.899095165742452, 29.884803394918674], [-89.898499951936572, 29.867860734211213], [-89.924099270368899, 29.862157650777707], [-89.966341803521388, 29.876996893905233], [-89.975969066186693, 29.849273195605321], [-89.994941362768373, 29.822963015702946], [-90.000070141037483, 29.799939197972559], [-90.015088552491321, 29.777753260975956], [-90.017196733587127, 29.765981544472066], [-90.016324087318566, 29.757123596582574], [-89.990021865388073, 29.730815485172858], [-89.961505018252652, 29.681764963860118], [-89.951133215120223, 29.648536695395901], [-89.886023112688392, 29.613893328008228], [-89.843937816583278, 29.603889196459992], [-89.825733080912158, 29.595078831253353], [-89.787184996043834, 29.570639005477489], [-89.752457014333075, 29.538080484390651], [-89.719007003174951, 29.525416829205188], [-89.690419613520802, 29.493618185566522], [-89.602608916196161, 29.458830433850707], [-89.592072128098025, 29.445775717935664], [-89.595234966559119, 29.420278094228863], [-89.581645998808682, 29.396366715721694], [-89.484881287579668, 29.34840969728484], [-89.477468472300018, 29.348455022024357], [-89.461982301030943, 29.363806988939317], [-89.449506303554585, 29.367464844287262], [-89.415888274150049, 29.356891484353451], [-89.391125007087439, 29.337219919394165], [-89.352805695751883, 29.291710840363432], [-89.327908295408704, 29.301078240834471], [-89.318006417262737, 29.31378853492085], [-89.303499185751463, 29.341465409285096], [-89.300347036663496, 29.35694710133291], [-89.305107455438929, 29.362548413082006], [-89.301394125274683, 29.366850634687108], [-89.290335725687612, 29.369747128504169], [-89.278014477912933, 29.352997210816824], [-89.266479849273068, 29.348322298650647], [-89.255115795202869, 29.337327685156701], [-89.240740770878915, 29.310957250128904], [-89.210868043260064, 29.329046195023846], [-89.198910143981635, 29.347468368319582], [-89.18700194601243, 29.344415891970378], [-89.174399827098696, 29.318367561458352], [-89.1538910215843, 29.297768741234769], [-89.139039537087342, 29.291421354520754], [-89.118809297236027, 29.258812363921439], [-89.027380097151735, 29.21926769451219], [-88.977704645832048, 29.214143872592462], [-88.978605694681548, 29.143483368675376], [-89.065048720251127, 29.072077163054789], [-89.146476492757216, 28.972458077698853], [-89.317893883876224, 29.02167452593082], [-89.401808058662994, 28.931254153832391], [-89.419623502795716, 28.930033221052359], [-89.391838748913543, 28.974734037609252], [-89.404267860972212, 29.085654417636835], [-89.421443450558712, 29.13911332553451], [-89.432779767617291, 29.149192580448847], [-89.453384325122997, 29.190041145293989], [-89.472258275292674, 29.209630932582321], [-89.409009825388992, 29.213580797886401], [-89.396025431132585, 29.221209245726033], [-89.385370858625393, 29.240615505711414], [-89.363755447541052, 29.262289797762417], [-89.354072273880391, 29.266247482873425], [-89.353004333339143, 29.273483587491771], [-89.399513708276615, 29.330574108538666], [-89.439641513432576, 29.355466887599192], [-89.448733740776206, 29.356743645130805], [-89.474784391014353, 29.339666364656271], [-89.485180708624597, 29.339563485519154], [-89.576342611647533, 29.374007734739806], [-89.601803194835412, 29.395072917255465], [-89.609298217573155, 29.414230204717978], [-89.607937835018816, 29.43752972936699], [-89.616851051931349, 29.451514988887666], [-89.670427558309939, 29.462630625066012], [-89.695627480724326, 29.483951864287462], [-89.729335478601087, 29.522140814515712], [-89.758860687819663, 29.534610098816987], [-89.796862999546008, 29.569894004203839], [-89.843250222536781, 29.597770650223122], [-89.889891161175953, 29.608397708354296], [-89.958617844094405, 29.646746176222891], [-89.968232711602369, 29.682246118420579], [-89.999315989836163, 29.730604893180924], [-90.026978555646338, 29.753300435544777], [-90.027999991528176, 29.771095444256414], [-90.001161636747284, 29.831923496041284], [-89.983564438561373, 29.850727374103652], [-89.975144243672034, 29.880676845642785], [-89.954983265444824, 29.884828177535073], [-89.934059856592015, 29.87366062801954], [-89.91030902312913, 29.871841952703864], [-89.908822681791648, 29.884769527483151], [-89.921733447719021, 29.912172155508955], [-89.935066046632002, 29.918459864379056], [-89.975305146779874, 29.920803801398289], [-90.024993132887076, 29.948102312415926], [-90.049756049953018, 29.954519935795489], [-90.053210660384693, 29.953241888007092], [-90.053263639658823, 29.930511717974685], [-90.0631121497929, 29.919544061006377], [-90.101831432300216, 29.905150228744549], [-90.116449822395708, 29.904296398448572], [-90.13934368333463, 29.914355599383903], [-90.147582997204111, 29.951880002036162], [-90.19068074148413, 29.921857362893849], [-90.207706577876067, 29.920140192248351], [-90.220108988706571, 29.92824936363456], [-90.232406850906088, 29.955030329233672], [-90.253637601537491, 29.966205827284014], [-90.28980459810623, 29.957838867208746], [-90.319975742469992, 29.933553065098167], [-90.344776378484795, 29.93152523797994], [-90.371425412593013, 29.937830239790987], [-90.39734770450336, 29.952233413606571], [-90.405071152778874, 29.981615073065949], [-90.410502037640768, 29.987858408038431], [-90.451828736921698, 29.992266440372418], [-90.44925342964325, 29.999705258829195]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "36",
                "sortOrder": 36,
                "title": "Watershed - Ohio"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-78.665170069094785, 42.321567494593971], [-78.418686751654917, 42.415876931224417], [-77.836280530344297, 41.846355299969204], [-78.562117017643104, 41.48199138824544], [-78.914520268299157, 40.72388866229921], [-78.567707280593794, 40.374396556353332], [-78.936385723909552, 39.712150702308755], [-79.511183705293391, 39.210047513099752], [-79.291006641350407, 39.192662898212639], [-79.312304749165193, 39.021653835577894], [-79.520918735823187, 38.892232420316276], [-79.787456468091108, 38.272854150970367], [-80.503215342076913, 37.481518817714999], [-80.535745059374705, 37.339121140737028], [-80.204338494968837, 37.436165779192066], [-80.468124650920714, 37.291146888032387], [-80.453923563658321, 37.067497372269351], [-80.121830730062612, 36.990762663585272], [-80.490987813789786, 36.653382884872585], [-80.827490257783808, 36.623642835741045], [-80.982009202655718, 36.390951585300854], [-81.173951450705232, 36.436308256157957], [-81.703830581505869, 36.149745447945648], [-81.707641321645227, 36.536172442802403], [-81.329762385518734, 36.749031477080393], [-81.255537931899994, 37.031953602757348], [-81.520410489104293, 37.195890698303536], [-82.356309847499347, 36.959788910141512], [-82.740046980113306, 37.04335835042307], [-83.1365318798955, 36.743068990422124], [-84.327988451240884, 36.422994633842066], [-84.226750824449056, 36.21929891283331], [-84.343795913978511, 36.100816814179538], [-84.58647302547098, 36.234692196962712], [-85.048513883256675, 36.179938636449883], [-85.196773303816173, 36.049017650233559], [-85.09649747838121, 35.742055635766931], [-85.491068607579194, 35.530048220157596], [-85.572761310326669, 35.315355426623782], [-86.190763320831024, 35.702222830108241], [-86.400269343398861, 35.618522886263079], [-87.003506139774871, 35.796224538684363], [-87.531662375591779, 36.097643381141943], [-87.957333938260348, 36.477213119170024], [-88.320326855403223, 37.122828189462062], [-88.68186655895407, 36.96358246974458], [-89.064859736089545, 37.11748811855233], [-89.137885742558069, 36.983550902524051], [-89.251098634325828, 37.133381242400418], [-88.930762507840015, 37.325677217183781], [-89.263306137574176, 37.539468276754626], [-88.788046606615538, 37.717942347012801], [-88.618064167108457, 38.038269329108388], [-88.901509540940793, 38.515198753460012], [-88.828840209592471, 38.954514661237717], [-88.605368758915574, 39.413259096242982], [-88.167406159163335, 39.624155940259584], [-88.341898235892103, 39.756847843385643], [-88.313252397316774, 40.184775115506511], [-88.144261775561716, 40.355565777159065], [-88.348436293427213, 40.63695727714547], [-87.780898234890614, 40.403826704499025], [-87.042916213398684, 40.778131323852193], [-86.904173526633244, 41.185950889532897], [-86.697581459761693, 41.101364298889173], [-86.543658677598842, 41.269051738797444], [-86.242064367936422, 41.180166929100068], [-86.162532235790138, 41.322226099913429], [-85.900422756062511, 41.308882609158168], [-85.329707045067494, 41.322910284170945], [-85.127052450986525, 41.199916692455552], [-85.211444010436566, 40.918894045996424], [-85.058532570341413, 40.71433609362083], [-84.383416493164191, 40.40881222180974], [-83.890964106414586, 40.724073224833447], [-83.321348708865358, 40.591342433748842], [-82.976221654248491, 40.798209343274983], [-82.693642161647944, 40.752550742132399], [-82.699076059901699, 40.947661210469974], [-82.020269278743626, 41.010793546715952], [-81.989719119787793, 41.136460445956558], [-81.261261531426129, 40.972279771745846], [-81.151418896799214, 41.358385366053142], [-80.821563735867386, 41.328483498286126], [-80.744541567727879, 41.573921912251045], [-80.490045601178196, 41.76237333953263], [-80.340351891433755, 41.664436788125215], [-80.068494869508285, 42.027615668531638], [-79.163329595660855, 42.435457616570972], [-78.665170069094785, 42.321567494593971]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "37",
                "sortOrder": 37,
                "title": "Watershed - Tennessee"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-81.520410489104293, 37.195890698303536], [-81.255537931899994, 37.031953602757348], [-81.329762385518734, 36.749031477080393], [-81.707641321645227, 36.536172442802403], [-81.703830581505869, 36.149745447945648], [-82.283633994914481, 35.700747008080633], [-82.31121540472185, 35.380807810128779], [-82.578173848950868, 35.142348292611445], [-83.062022903872901, 35.163719290520199], [-83.432813093282562, 34.899464214958861], [-83.558207868858943, 35.039789854619727], [-83.660355506977339, 34.810796484696269], [-84.184887178222198, 34.629474824980178], [-84.853359841860325, 35.149884265702958], [-85.075645175119774, 34.706089276264038], [-85.518163567549266, 34.694547556022904], [-86.107154142535151, 34.121144117623437], [-86.199561735373194, 34.261510694665787], [-86.491533981708727, 34.125257191704492], [-86.498425072307498, 34.321895312348147], [-86.868207296446883, 34.243281307874149], [-87.337391040826418, 34.433845952127371], [-87.745145738072594, 34.220773460083073], [-88.411529534538772, 34.743604311239352], [-88.544090795402482, 35.259462994097191], [-88.290565457635935, 36.383386180386587], [-88.68186655895407, 36.96358246974458], [-88.320326855403223, 37.122828189462062], [-87.957333938260348, 36.477213119170024], [-87.531662375591779, 36.097643381141943], [-87.003506139774871, 35.796224538684363], [-86.400269343398861, 35.618522886263079], [-86.190763320831024, 35.702222830108241], [-85.572761310326669, 35.315355426623782], [-85.491068607579194, 35.530048220157596], [-85.09649747838121, 35.742055635766931], [-85.196773303816173, 36.049017650233559], [-85.048513883256675, 36.179938636449883], [-84.58647302547098, 36.234692196962712], [-84.343795913978511, 36.100816814179538], [-84.226750824449056, 36.21929891283331], [-84.327988451240884, 36.422994633842066], [-83.1365318798955, 36.743068990422124], [-82.740046980113306, 37.04335835042307], [-82.356309847499347, 36.959788910141512], [-81.520410489104293, 37.195890698303536]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "38",
                "sortOrder": 38,
                "title": "Watershed - Upper Mississippi"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-94.341501728044719, 47.770855377047972], [-93.804698782042351, 47.434814987402405], [-93.453740477153502, 47.65993646776765], [-92.969365675860331, 47.531765534206883], [-93.205285601608963, 47.153880997074872], [-93.174359313230141, 46.844954700218608], [-92.588973218717911, 46.684918763692167], [-92.64001813796358, 46.419653405384651], [-92.331834515028447, 46.318604933312614], [-91.460683561249297, 46.465586553724478], [-91.291233314878809, 46.234353560451225], [-90.693129939448625, 46.165463963442718], [-89.98975210683237, 46.311743902729916], [-89.402376217313062, 46.097676284766088], [-89.293988485375223, 46.214265338938773], [-88.908671326271175, 46.120033902418257], [-89.24037752519007, 45.409312092210357], [-88.941602481258641, 45.24366963487514], [-89.33362977469298, 44.867327828343285], [-89.348412235766517, 44.193654284702056], [-89.709709495831106, 43.678510640223749], [-89.327120793809456, 43.529386608845378], [-88.758441318920859, 43.774119821975319], [-88.353986317550607, 43.578230430557042], [-87.604023113493312, 41.673562406571541], [-87.345727407409072, 41.577792229544627], [-87.429617883653421, 41.387611174342062], [-87.030664698221642, 41.399672471686678], [-87.050272894201797, 41.533892293879646], [-86.356064639197868, 41.797029846876185], [-85.900422756062511, 41.308882609158168], [-86.162532235790138, 41.322226099913429], [-86.242064367936422, 41.180166929100068], [-86.543658677598842, 41.269051738797444], [-86.697581459761693, 41.101364298889173], [-86.904173526633244, 41.185950889532897], [-87.042916213398684, 40.778131323852193], [-87.780898234890614, 40.403826704499025], [-88.348436293427213, 40.63695727714547], [-88.144261775561716, 40.355565777159065], [-88.313252397316774, 40.184775115506511], [-88.341898235892103, 39.756847843385643], [-88.167406159163335, 39.624155940259584], [-88.605368758915574, 39.413259096242982], [-88.828840209592471, 38.954514661237717], [-88.901509540940793, 38.515198753460012], [-88.618064167108457, 38.038269329108388], [-88.788046606615538, 37.717942347012801], [-89.263306137574176, 37.539468276754626], [-88.930762507840015, 37.325677217183781], [-89.251098634325828, 37.133381242400418], [-89.137885742558069, 36.983550902524051], [-89.576699737453495, 37.251505350471682], [-90.386713956383147, 37.152150375670942], [-90.196773812277613, 37.571034079114149], [-90.326291484112261, 37.863933440196426], [-90.712826651585303, 37.64908597689638], [-90.995484210201994, 37.696693172119367], [-91.332220955339324, 37.495507401776315], [-91.792622295089018, 37.567784046495298], [-91.733067532938591, 38.280413026754509], [-90.828692194941937, 38.481892081290404], [-90.121352444554319, 38.828621577380474], [-90.326976167331978, 38.905044042074685], [-90.92035621034205, 38.69917080905816], [-91.658090946737047, 39.116805287533182], [-91.915201320247419, 39.032449098632661], [-92.319409917216433, 39.212465277872944], [-92.732149144580404, 40.766264595699717], [-93.351133801815593, 41.041135504891344], [-93.768548932922869, 40.901290687048842], [-94.640752334191532, 41.486106255789565], [-95.309593922154704, 42.688668049327539], [-94.862440645042057, 43.11621362638067], [-94.935942403110829, 43.429049914651571], [-95.107676013401402, 43.661404240958547], [-95.581135988578311, 43.619428472513164], [-95.848877265769062, 43.75728202914695], [-95.836375332802874, 43.949296885077047], [-96.651791939988385, 44.570642115402471], [-96.680555148091145, 44.839544255415362], [-97.351489912595653, 45.776359437908695], [-97.147592219600298, 45.930152429359055], [-96.864715123761599, 45.605928453799272], [-96.232695529593215, 45.510304322556095], [-95.90223158128363, 45.742911278014887], [-96.044000874859393, 46.190119289655641], [-95.808160423673087, 46.352086793682346], [-95.759323047693456, 46.186184342856222], [-95.421233205883027, 46.187795851672206], [-95.614960852767439, 46.351845584206401], [-95.333459937810431, 46.643050337446539], [-95.516616773331975, 46.950272034093189], [-95.226207035934522, 47.39319600369825], [-95.281704082569078, 47.56448600451877], [-94.341501728044719, 47.770855377047972]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "39",
                "sortOrder": 39,
                "title": "Watershed - Lower Mississippi"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-90.326291484112261, 37.863933440196426], [-90.196773812277613, 37.571034079114149], [-90.386713956383147, 37.152150375670942], [-89.576699737453495, 37.251505350471682], [-89.137885742558069, 36.983550902524051], [-89.064859736089545, 37.11748811855233], [-88.68186655895407, 36.96358246974458], [-88.290565457635935, 36.383386180386587], [-88.544090795402482, 35.259462994097191], [-88.411529534538772, 34.743604311239352], [-88.892202679114433, 34.509955414924477], [-89.086790447474314, 33.409649036608947], [-89.559533172688518, 33.167719857298273], [-89.763946852152898, 32.695505254828092], [-90.178424457854959, 32.481051273505265], [-90.380946989663698, 32.197847552942768], [-90.397117886508397, 31.649714984422214], [-90.616177015147144, 31.449663503819789], [-90.319624084913741, 31.108646001257132], [-90.401920745189472, 30.936690088800642], [-89.834801118581709, 30.50513963756358], [-89.679430143369387, 30.179448716541899], [-89.185564033896895, 30.21039711843698], [-89.201479577562012, 30.000201165838611], [-88.843357513520345, 30.018907842806161], [-88.855244837833951, 29.769159994516922], [-89.162786779591926, 29.489155997237646], [-89.174399827097687, 29.318367562257183], [-88.977490539013274, 29.213695990791575], [-89.14536336949439, 28.973197755266675], [-89.419623502796327, 28.930033221850568], [-89.461427349612237, 29.199636295460316], [-89.784025845221919, 29.312292442948504], [-90.34337370441915, 29.055167098925036], [-90.919164387711419, 29.045749971312304], [-91.546563405024273, 29.520920217261068], [-92.315225640856895, 29.533426613021316], [-93.224956565285481, 29.776365041097883], [-93.835835848730468, 29.694330398120591], [-93.577074961230707, 30.000212603413765], [-93.636141088667557, 30.49626271569765], [-93.148199000402968, 31.140752802830082], [-93.232795954996561, 31.335811485691664], [-92.881784045152472, 31.433879734647149], [-92.752325259835274, 31.209460404523945], [-92.695136157885372, 31.394234714169908], [-92.434458937993469, 31.382890680877448], [-92.932987198473157, 32.163995203591945], [-92.874712258051062, 32.553764094105439], [-93.134066895009141, 32.833117574094814], [-93.28429636083051, 33.561272082313899], [-93.792532371372062, 33.795041188039463], [-94.000199294460089, 34.444432087941721], [-94.330984211178219, 34.701230962113328], [-92.812372231490315, 34.859826430825677], [-92.077500985152653, 34.229079559623422], [-91.850016571219754, 34.21732550432759], [-92.310940141820637, 35.00009360417404], [-92.000146544202096, 35.339281446665872], [-91.378031738902351, 35.188520578821048], [-90.901416450361864, 36.099437848232682], [-90.14538170849535, 36.646709670970147], [-90.236604001457536, 36.85699959682249], [-90.667556527039395, 37.09055063720654], [-90.712826651585303, 37.64908597689638], [-90.326291484112261, 37.863933440196426]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "40",
                "sortOrder": 40,
                "title": "Watershed - Missouri"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-114.00096052298822, 48.996267713206421], [-103.78548515589996, 49.00003147192453], [-103.88823772026221, 48.876068596064101], [-103.42523355252888, 48.624630617162339], [-103.01889339278478, 48.792408535857646], [-102.24011656263494, 48.604142652175653], [-101.20636347704543, 47.848562485483349], [-100.97883777324252, 47.90474394043629], [-100.24806033301097, 47.510550861941496], [-100.20153831084295, 47.332815837384757], [-99.637022884215469, 47.845632638217836], [-98.694469498554668, 47.674881900342641], [-98.734726406654076, 47.296262195063022], [-98.346774056045206, 47.052509956967796], [-98.227237433430133, 46.680852678137683], [-97.966369392931256, 46.623461732821326], [-98.069250627958752, 46.189423897133324], [-97.858466415855361, 46.143203407524666], [-97.958368550963371, 45.892752922952496], [-97.351489912595653, 45.776359437908695], [-96.680555148091145, 44.839544255415362], [-96.651791939988385, 44.570642115402471], [-95.836375332802874, 43.949296885077047], [-95.848877265769062, 43.75728202914695], [-95.581135988578311, 43.619428472513164], [-95.107676013401402, 43.661404240958547], [-94.935942403110829, 43.429049914651571], [-94.862440645042057, 43.11621362638067], [-95.309593922154704, 42.688668049327539], [-94.640752334191532, 41.486106255789565], [-93.768548932922869, 40.901290687048842], [-93.351133801815593, 41.041135504891344], [-92.732149144580404, 40.766264595699717], [-92.319409917216433, 39.212465277872944], [-91.915201320247419, 39.032449098632661], [-91.658090946737047, 39.116805287533182], [-90.92035621034205, 38.69917080905816], [-90.326976167331978, 38.905044042074685], [-90.121352444554319, 38.828621577380474], [-90.828692194941937, 38.481892081290404], [-91.733067532938591, 38.280413026754509], [-91.792622295089018, 37.567784046495298], [-92.012256468131426, 37.049932944180931], [-92.662345022145587, 37.098531003803245], [-92.903437368939905, 37.335545625385237], [-93.585394385833268, 37.024115643249523], [-94.19879255759777, 37.588890951545537], [-94.600260728510136, 37.488969013689278], [-95.018767169927898, 37.663946116674005], [-95.21121374351722, 37.943681346131328], [-95.150517451711991, 38.127485136951634], [-95.412988039246557, 38.098537409419443], [-95.567180275712275, 38.354119427741985], [-95.947105105507006, 38.416020965168208], [-96.247480314152767, 38.83502942136834], [-96.629983086893745, 38.867474159963386], [-96.987336583047323, 38.548540126445083], [-97.342682583245917, 38.594112443385484], [-97.435731158398198, 38.390382849413804], [-97.869124004642757, 38.382025817744726], [-98.421730084209358, 38.661402235243592], [-101.40707206352938, 38.502970026557534], [-102.51328408655648, 38.71306513441872], [-102.61490859041355, 38.969947068048128], [-103.17610992613248, 39.056769945108606], [-103.69470226679888, 39.371580044275298], [-104.66293191116289, 39.026483847848212], [-104.99784934625787, 39.126763023539347], [-105.1299325849989, 38.894400108563218], [-105.69839746710396, 38.752187674026992], [-106.19419405606614, 39.018965307527928], [-106.15578342297196, 39.363227047645545], [-105.77654558337474, 39.604789541411357], [-105.92372277890884, 39.700203947488056], [-105.6953328844977, 39.839543674272157], [-105.65070746626644, 40.254560570442763], [-105.8505540002721, 40.486719410070002], [-105.96012492472893, 40.348118630246496], [-106.61127867874613, 40.38076598445268], [-106.65618327026517, 40.850789327659754], [-107.45676073564869, 41.546929315123712], [-107.33967544215676, 41.859428618884721], [-107.1159858532459, 41.862268978074788], [-107.08569607218452, 42.219405849725497], [-107.84009107656401, 42.254674615866229], [-107.95649522803821, 42.402207551073872], [-108.29783313660215, 42.217893161569961], [-108.84927128185184, 42.26047371875061], [-109.1881881667815, 42.493011944106819], [-109.13285737641232, 42.717071391267126], [-109.55346734342103, 43.012929123326302], [-109.69755047694605, 43.367415712954461], [-110.0598207452764, 43.589974135834076], [-109.85902526595143, 43.9585494058244], [-110.13896528967004, 44.003183994233886], [-110.62093665208188, 44.480505153340367], [-110.87329279804381, 44.336030342004193], [-111.38386140388468, 44.753250589165702], [-111.46744337673979, 44.539335277739212], [-112.28803323942786, 44.56582375857792], [-112.84783501833697, 44.35743943712545], [-113.13356900475861, 44.774207730431641], [-113.47629941710346, 44.896371225081189], [-113.91228762876064, 45.751010027729208], [-113.27351631808477, 46.060865118041306], [-112.45846655119837, 45.815658343746676], [-112.59937633266838, 46.235068597039827], [-112.30860360026496, 46.41985686655363], [-112.29892280364896, 46.617854557646936], [-112.54159995653774, 46.770498398403127], [-112.31047581401681, 47.018680008930573], [-113.11298588843152, 47.494168469072996], [-113.09228325620228, 47.908472676798453], [-112.89587894723425, 48.01749525061927], [-113.23264576362737, 48.172009354026969], [-113.46912050744207, 48.549974526779565], [-113.75185196973322, 48.615397080411313], [-113.78816796348579, 48.842263104069048], [-114.00959895177154, 48.829575195534836], [-114.00096052298822, 48.996267713206421]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "region": "GLTG",
                "id": "41",
                "sortOrder": 41,
                "title": "Watershed - Arkansas White-Red"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-106.21069953227646, 39.383127896683831], [-106.15578342297196, 39.363227047645545], [-106.19419405606614, 39.018965307527928], [-105.69839746710396, 38.752187674026992], [-105.1299325849989, 38.894400108563218], [-104.99784934625787, 39.126763023539347], [-104.66293191116289, 39.026483847848212], [-103.69470226679888, 39.371580044275298], [-103.17610992613248, 39.056769945108606], [-102.61490859041355, 38.969947068048128], [-102.51328408655648, 38.71306513441872], [-101.40707206352938, 38.502970026557534], [-98.421730084209358, 38.661402235243592], [-97.869124004642757, 38.382025817744726], [-97.435731158398198, 38.390382849413804], [-97.342682583245917, 38.594112443385484], [-96.987336583047323, 38.548540126445083], [-96.629983086893745, 38.867474159963386], [-96.247480314152767, 38.83502942136834], [-95.947105105507006, 38.416020965168208], [-95.567180275712275, 38.354119427741985], [-95.412988039246557, 38.098537409419443], [-95.150517451711991, 38.127485136951634], [-95.21121374351722, 37.943681346131328], [-95.018767169927898, 37.663946116674005], [-94.600260728510136, 37.488969013689278], [-94.19879255759777, 37.588890951545537], [-93.585394385833268, 37.024115643249523], [-92.903437368939905, 37.335545625385237], [-92.662345022145587, 37.098531003803245], [-92.012256468131426, 37.049932944180931], [-91.792622295089018, 37.567784046495298], [-91.332220955339324, 37.495507401776315], [-90.995484210201994, 37.696693172119367], [-90.712826651585303, 37.64908597689638], [-90.667556527039395, 37.09055063720654], [-90.236604001457536, 36.85699959682249], [-90.14538170849535, 36.646709670970147], [-90.901416450361864, 36.099437848232682], [-91.378031738902351, 35.188520578821048], [-92.000146544202096, 35.339281446665872], [-92.310940141820637, 35.00009360417404], [-91.850016571219754, 34.21732550432759], [-92.077500985152653, 34.229079559623422], [-92.812372231490315, 34.859826430825677], [-94.330984211178219, 34.701230962113328], [-94.000199294460089, 34.444432087941721], [-93.792532371372062, 33.795041188039463], [-93.28429636083051, 33.561272082313899], [-93.134066895009141, 32.833117574094814], [-92.874712258051062, 32.553764094105439], [-92.932987198473157, 32.163995203591945], [-92.434458937993469, 31.382890680877448], [-92.695136157885372, 31.394234714169908], [-92.752325259835274, 31.209460404523945], [-92.881784045152472, 31.433879734647149], [-93.232795954996561, 31.335811485691664], [-93.570346240589146, 32.004212841217125], [-93.779812348350063, 32.038753178985125], [-94.251069433340803, 32.553731448442555], [-95.054620666017968, 32.678956352958608], [-95.368175902872736, 33.050748757844303], [-95.978682376542409, 33.161854646946566], [-97.000596235701764, 33.717346903959445], [-98.805875563357318, 33.390911454312523], [-99.293189152742826, 33.637157502021765], [-100.56331195121535, 33.526563291746278], [-100.70020484596992, 33.715587406023118], [-101.03648835408956, 33.753943978661184], [-101.5390806969136, 34.262631548568365], [-102.31007662842914, 34.586766813765799], [-103.59434638888602, 34.677877119511777], [-104.07857611047575, 34.980488008206365], [-104.42296857620583, 34.940835865759091], [-105.11602211647428, 35.721450768173277], [-105.53324495966318, 35.813907620715192], [-105.13312172206888, 37.412190417130972], [-105.18984720939616, 37.619492162123237], [-105.49400464856262, 37.584819163081804], [-105.4294405878486, 37.852284686656354], [-105.67174157962916, 38.158144111576121], [-106.01927222795986, 38.454025752557698], [-106.24784304835346, 38.343514604004781], [-106.42931800824194, 38.652046119786718], [-106.32459596938011, 38.909078362242667], [-106.5868273820346, 39.097663526795024], [-106.40526970881376, 39.379791167630238], [-106.21069953227646, 39.383127896683831]
                    ]
                ]
            }
        },
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
    trend_colors: {
        "trendUp": "#FAE70B",
        "trendDown": "#29ABE2",
        "noTrend": "#7F7F7F",
        "overThresholdUp": "#ED2026",
        "overThresholdDown": "#ED2026"
    },

    // List of sources for sensors that show up in the trends page.
    trends_sources: ["epa"],

    // Will be added to the Exploratory Analysis and Trends Stations Regions
    draw_and_all_regions: [
        {
            "type": "Feature",
            "properties": {
                "title": "All Regions",
                "region": "ALL",
                "id": "all",
                "sortOrder": 0,
                "threshold": {
                    "total-phosphorus-glenda": 5
                }

            },
            "geometry": {
                "type": "",
                "coordinates": [],
                "region_coordinate": []
            }
        },
        {
            "type": "Feature",
            "properties": {
                "title": "Draw Custom Region",
                "region": "DRAW",
                "id": "draw",
                "sortOrder": 1,
                "threshold": {}

            },
            "geometry": {
                "type": "",
                "coordinates": [],
                "region_coordinate": []
            }
        },
    ],

    // Exploratory Analysis Page Only
    trend_settings: [
        {
            "parameter": {
                "id": "discharge-ft3s",
                "title": "Discharge"
            },
            "thresholds": [
                {
                    "title": "Standard01",
                    "region": "Region01",
                    "value": 3.1
                },
                {
                    "title": "Standard02",
                    "region": "Region02",
                    "value": 1.1
                },
                {
                    "title": "Standard03",
                    "region": "Region03",
                    "value": 2.5
                }
            ]
        },
        {
            "parameter": {
                "id": "dissolved-oxygen-mgl",
                "title": "Dissolved Oxygen"
            },
            "thresholds": [
                {
                    "title": "Standard04",
                    "region": "Region04",
                    "value": 6.3
                },
                {
                    "title": "Standard05",
                    "region": "Region05",
                    "value": 7
                },
                {
                    "title": "Standard06",
                    "region": "Region06",
                    "value": 7.2
                }
            ]
        },
        {
            "parameter": {
                "id": "nitrate-nitrite-as-n-mgl",
                "title": "Nitrate and Nitrite as N"
            },
            "thresholds": [
                {
                    "title": "Standard07",
                    "region": "Region07",
                    "value": 0.6
                },
                {
                    "title": "Standard08",
                    "region": "Region08",
                    "value": 1.5
                },
                {
                    "title": "Standard09",
                    "region": "Region09",
                    "value": 2.0
                }
            ]
        },
        {
            "parameter": {
                "id": "phosphorus-insitu-orthophosphate-as-p-mgl",
                "title": "Phosphorous in Situ Orthophosphate as P"
            },
            "thresholds": [
                {
                    "title": "Standard01",
                    "region": "Region01",
                    "value": 3.1
                },
                {
                    "title": "Standard02",
                    "region": "Region02",
                    "value": 1.1
                },
                {
                    "title": "Standard03",
                    "region": "Region03",
                    "value": 2.5
                }
            ]
        },
        {
            "parameter": {
                "id": "turbidity-fnu",
                "title": "Turbidity"
            },
            "thresholds": [
                {
                    "title": "Standard04",
                    "region": "Region04",
                    "value": 6.3
                },
                {
                    "title": "Standard05",
                    "region": "Region05",
                    "value": 7
                },
                {
                    "title": "Standard06",
                    "region": "Region06",
                    "value": 7.2
                }
            ]
        },
        {
            "parameter": {
                "id": "water-temperature-c",
                "title": "Water Temperature"
            },
            "thresholds": [
                {
                    "title": "Standard07",
                    "region": "Region07",
                    "value": 0.6
                },
                {
                    "title": "Standard08",
                    "region": "Region08",
                    "value": 1.5
                },
                {
                    "title": "Standard09",
                    "region": "Region09",
                    "value": 2.0
                }
            ]
        }
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_settings: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_lake_regions:[],

    // Trends Stations and Trends Regions Pages Only
    trends_page_seasons: [],

    // Trends Stations and Trends Regions Pages Only
    trends_page_timeframes: [
        {
            "id": "baseline_total_year",
            "value": 30,
        }, {
            "id": "rolling_interval",
            "value": 17,
        }
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_defaults: [],

    // Exploratory Analysis Page Only
    trends_analysis_defaults: [
        {
            "id": "parameter",
            "value": "None"
        },
        {
            "id": "season",
            "value": "all",
        },
        {
            "id": "by-analysis",
            "value": "Analysis",
        },
        {
            "id": "region",
            "value": "all",
        },
        {
            "id": "thresholdMin",
            "value": 0,
        },
        {
            "id": "thresholdMax",
            "value": 100,
        }
    ],

    // **********

    // These variables are for Map settings
    mapTileURL: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    mapAttributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    mapAttributionsCollapsible: true,
    mapMiniAttributionsCollapsible: true,
    mapClustersDistance: 45,
    clustersChoiceOption: true,
    mapMiniMinZoom: 3,
    clustersExpandMaxNumberFeatures: 10,
    mapMaxZoom: 16,
    mapMinZoom: 5.5,
    mapCenterValue: [-90.498703, 37.9203417],
    mapPopupZoomMax: 10,
}
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
// Keep the next new line at the end of the file
