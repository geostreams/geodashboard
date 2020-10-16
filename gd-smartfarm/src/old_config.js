export const gd3 = {

    // Geostreaming API Information - this is also displayed in the Welcome Page dropdown selector
    geostreaming_endpoints: [
        { url: process.env.GEOSTREAMS_URL }
    ],

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
    application_website: '/geostreaming',

    // Home Page Carousel file names - Should be located in /geodashboard-v3/theme folder
    home_page_carousel_images: [],

    // Home Page Carousel Caption Information - Numbers correspond to the order of images above
    home_page_carousel_captions : {},

    // Should Tabs to select multi-parameter graphs be displayed on the Detail Page
    show_detail_tabs: true,

    // Detail Page Info Icon Text
    detail_page_separate: {
        description: 'Select a minimum of one Parameter to view'
    },
    detail_page_combined: {
        description: 'Select a maximum of three Parameters to view'
    },
    detail_page_box_and_whisker: {
        description: 'Box and Whisker Plots provide a visual look at the data distribution. ' +
                        'Lowest values are on the left, and the Highest values are on the right'
    },
    detail_page_raw_processed: [
        { listText: 'Level 0: No Processing - Raw Data' },
        { listText: 'Level 1: Minimal Processing' },
        { listText: 'Level 2: Increased Processing' },
        { listText: 'Level 3: Fully Processed - No Raw Data' }
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
    //    detail_season_bins_sources: ['epa'],

    // Display Online/Offline Information on the Explore Page
    display_online_status: true,

    // Layers for the Explore Page
    exploreLayers: [
    ],

    // Layers for the Analysis Page
    analysisLayers: [],

    // Analysis Saves Search Info
    use_analysis_searches: false,
    analysis_search_heading: 'Saved Searches: ',
    analysis_search_info: [],

    // For Mobile Explore and Detail Pages
    mobile_sourcename: 'all',
    mobile_size_max: 840,
    chrome_detail_mobile_disabled: true,
    filter_unavailable_sensors: true,
    mobile_detail_path: '/detail/location/',
    mobile_explore_path: '/explore/all/',

    // Max Number of Parameters to display in the Map Popups (default is 10)
    max_display_params: 10,

    // Error Text if the API does not return on the Welcome Page
    error_text: 'An Error Occurred - Please Select Again',

    // Error Items for IE
    ie_show_alert_popup: false,
    ie_versions_before_eleven: [],
    ie_version_eleven: false,
    ie_version_edge: false,
    ie_message_title: '',
    ie_message_text: '' ,
    ie_button_text: '',
    ie_show_menu_bar_alert: false,
    ie_menu_bar_message_text: '',

    // Source IDs and their Display Names
    sourcename: {
    },

    // Show Info Boxes on the Explore Page
    show_source_info_boxes: true,
    // For Source Info Boxes on the Explore Page
    source_information: {
    },

    source_order: {
    },

    // Colors associated with specific Sources
    sourcecolor: {
    },

    // Will be added to the Exploratory Analysis and Trends Stations Regions
    draw_and_all_regions: [],

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
    additional_locations: [],

    // This is used to define HUC areas on the map
    sensors_regions: [],

    trends_sources: [''],

    // These variables are for the Card Subtitles on the Trends and Exploratory Analysis Pages ****
    parameter_subtitle: '',
    season_subtitle: '',
    region_subtitle: '',
    calculation_subtitle: '',
    threshold_subtitle: '',
    threshold_none_subtitle: '',

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
    mapPopupZoomMax: 10
};
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
// Keep the next new line at the end of the file
