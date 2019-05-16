export const gd3 = {

    // Geostreaming API Information - this is also displayed in the Welcome Page dropdown selector
    geostreaming_endpoints: [
        {url: "https://seagrant-dev.ncsa.illinois.edu/geostreams", label: "GLM DEV", title: "Great Lakes Monitoring",
            subtitle: "ILLINOIS-INDIANA SEA GRANT"},
        {url: "https://greatlakesmonitoring.org/geostreams", label: "GLM PROD", title: "Great Lakes Monitoring",
            subtitle: "ILLINOIS-INDIANA SEA GRANT"},
        {url: "https://greatlakestogulf.org/geostreams", label: "GLTG PROD", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
        {url: "https://gltg-dev.ncsa.illinois.edu/geostreams", label: "GLTG DEV", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
        {url: "http://data.imlczo.org/geostreams", label: "IMLCZO PROD",   title: "IMLCZO",
            subtitle: ""},
        {url: "https://imlczo-dev.ncsa.illinois.edu/geostreams", label: "IMLCZO DEV", title: "IMLCZO",
            subtitle: ""},
        {url: "http://141.142.211.37/geostreams", label: "IMLCZO NEBULA", title: "IMLCZO",
            subtitle: ""},
        {url:"http://localhost:9000", label:"Localhost", title:"Localhost", subtitle:"Localhost"}
    ],

    // Menu Bar Information
    application_options: {
        "title": "Geodashboard 3.0",
        "pages": [
            {
                "name": "HOME",
                "url": "/#",
            },
            {
                "name": "EXPLORE",
                "url": "/#explore/all",
            },
            {
                "name": "SEARCH",
                "url": "/#search",
            },
            {
                "name": "ANALYSIS",
                "url": "/#analysis",
            },
            {
                "name": "TRENDS",
                "children": [
                    {
                        "name": "TRENDS STATIONS",
                        "url": "/trendsstations"
                    },
                    {
                        "name": "TRENDS REGIONS",
                        "url": "/trendsregions"
                    }
                ]
            },
            {
                "name": "ABOUT",
                "url": "/#about",
            },
        ]
    },

    // Paths for Downloads
    download_button_path: '/datapoints/download?',

    // This variable is used to determine the location for links to the Detail Page
    application_website: "/",

    // Home Page Carousel file names - Should be located in /geodashboard-v3/theme folder
    home_page_carousel_images: [],

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
    exploreLayers: [],

    // Layers for the Analysis Page
    analysisLayers: [],

    // For Mobile Explore and Detail Pages
    mobile_sourcename: "all",
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
        "epa": "EPA Pollutant Loading",
        "glfmsp": "Great Lakes Fish Monitoring and Surveillance Program",
        "heidelberg": "Heidelberg University",
        "iadn": "Integrated Atmospheric Deposition Network",
        "lec": "Lake Erie Committee Forage Task Group",
        "greon": "Great Rivers Ecological Observation Network",
        "gac": "Gustavus Adolphus College",
        "illinois-epa": "IEPA Ambient Water Quality Monitoring Network",
        "iwqis": "Iowa Water Quality Information System",
        "metc": "Metropolitan Council",
        "noaa": "National Oceanic and Atmospheric Administration",
        "sierra-club": "Fox River Study Group",
        "tennessee": "Tennessee",
        "usgs": "United States Geological Survey",
        "usgs-sg": "United States Geological Survey (Supergauge)",
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
        "glfmsp": {
            "more_info": "Click here for more information",
            "link": "http://localhost:8080"
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
        "heidelberg" : {},
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
        "ads": "#bf5fff",
        "ats": "#0d71ba",
        "epa": "#0D71BA",
        "glfmsp": "#F7941E",
        "gsfmp": "#CC2128",
        "heidelberg": "#CC2128",
        "iadn": "#8A2BE2",
        "ifis": "#a17c6c",
        "imlczo": "#C4B9A2",
        "isws": "#f7941e",
        "lec": "#4D6363",
        "noaa": "#043C82",
        "ps": "#cc2128",
        "ss": "#4d6363",
        "usgs": "#39B54A",
        "wqp": "#F28E1E",
        "greon": "#BDBFA6",
        "gac": "#8c1ace",
        "illinois-epa": "#d89b0d",
        "iwqis": "#31CFC1",
        "metc": "#D2E11D",
        "sierra-club": "#9C2C1A",
        "tennessee": "#d80d50",
        "usgs-sg": "#228e31",
        "umrr-ltrm": "#5F99C1",
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
                "title": "Lake Superior",
                "region": "SU",
                "id": "su",
                "sortOrder": 1,
                "threshold": {
                    "total-phosphorus-glenda": 5
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-88.1982421875,
                            48.9513664709477
                        ],
                        [-92.8125,
                            46.78501604269254
                        ],
                        [-92.52685546875,
                            46.51351558059737
                        ],
                        [-84.462890625,
                            46.51351558059737
                        ],
                        [-84.70458984375,
                            47.916342040161155
                        ],
                        [-86.220703125,
                            48.8936153614802
                        ],
                        [-88.1982421875,
                            48.9513664709477
                        ]
                    ]
                ],
                "region_coordinate": [-87.5, 47.5, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Huron",
                "region": "HU",
                "id": "hu",
                "sortOrder": 3,
                "threshold": {
                    "total-phosphorus-glenda": 5
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-84.66064453125,
                            46.057985244793024
                        ],
                        [-84.0673828125,
                            46.46813299215554
                        ],
                        [-80.70556640625,
                            46.027481852486645
                        ],
                        [-79.47509765625,
                            44.68427737181225
                        ],
                        [-80.13427734374999,
                            44.37098696297173
                        ],
                        [-81.2109375,
                            44.84029065139799
                        ],
                        [-81.73828125,
                            43.30919109985686
                        ],
                        [-82.46337890625,
                            42.956422511073335
                        ],
                        [-82.96875,
                            43.97700467496408
                        ],
                        [-84.0673828125,
                            43.1811470593997
                        ],
                        [-84.55078125,
                            43.88205730390537
                        ],
                        [-83.4521484375,
                            44.54350521320822
                        ],
                        [-84.5068359375,
                            45.61403741135093
                        ],
                        [-84.66064453125,
                            46.057985244793024
                        ]
                    ]
                ],
                "region_coordinate": [-82.0, 45.0, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Michigan",
                "region": "MI",
                "id": "mi",
                "sortOrder": 2,
                "threshold": {
                    "total-phosphorus-glenda": 7
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-86.98974609375,
                            46.01985337287631
                        ],
                        [-88.143310546875,
                            44.73892994307368
                        ],
                        [-87.890625,
                            41.590796851056005
                        ],
                        [-85.97900390625,
                            41.5579215778042
                        ],
                        [-86.220703125,
                            44.213709909702054
                        ],
                        [-84.814453125,
                            45.72152152227954
                        ],
                        [-85.078125,
                            46.255846818480336
                        ],
                        [-86.98974609375,
                            46.01985337287631
                        ]
                    ]
                ],
                "region_coordinate": [-87.0, 43.5, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake St. Clair",
                "region": "CL",
                "id": "cl",
                "sortOrder": 4,
                "threshold": {
                    "total-phosphorus-glenda": 5
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-82.65289306640624,
                            42.726839149554394
                        ],
                        [-82.85614013671875,
                            42.67233920753354
                        ],
                        [-82.99072265625,
                            42.34433533786168
                        ],
                        [-82.584228515625,
                            42.259016415705766
                        ],
                        [-82.3974609375,
                            42.32403179535469
                        ],
                        [-82.38922119140625,
                            42.53486817758702
                        ],
                        [-82.65289306640624,
                            42.726839149554394
                        ]
                    ]
                ],
                "region_coordinate": [-82.7, 42.5, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Erie",
                "region": "ER",
                "id": "er",
                "sortOrder": 5,
                "threshold": {
                    "total-phosphorus-glenda": 10
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-78.90380859375,
                            42.91218338638018
                        ],
                        [-79.3377685546875,
                            42.90413649491736
                        ],
                        [-79.61242675781249,
                            42.87596410238254
                        ],
                        [-79.73876953125,
                            42.90011265525328
                        ],
                        [-79.925537109375,
                            42.84375132629023
                        ],
                        [-80.2166748046875,
                            42.82360980730198
                        ],
                        [-80.299072265625,
                            42.81555136172695
                        ],
                        [-80.419921875,
                            42.68243539838623
                        ],
                        [-80.5023193359375,
                            42.61374895431491
                        ],
                        [-80.606689453125,
                            42.60970621339408
                        ],
                        [-80.8978271484375,
                            42.70665956351041
                        ],
                        [-81.2274169921875,
                            42.69858589169842
                        ],
                        [-81.3262939453125,
                            42.69454866207692
                        ],
                        [-81.441650390625,
                            42.66628070564928
                        ],
                        [-81.859130859375,
                            42.41940144722477
                        ],
                        [-81.903076171875,
                            42.35854391749705
                        ],
                        [-81.9854736328125,
                            42.32200108060305
                        ],
                        [-82.078857421875,
                            42.309815415686664
                        ],
                        [-82.529296875,
                            42.114523952464246
                        ],
                        [-82.5457763671875,
                            42.032974332441405
                        ],
                        [-82.650146484375,
                            42.09007006868398
                        ],
                        [-82.94128417968749,
                            42.02889410108475
                        ],
                        [-83.07861328125,
                            42.1104489601222
                        ],
                        [-83.03466796874999,
                            42.224449701009725
                        ],
                        [-83.111572265625,
                            42.32200108060305
                        ],
                        [-83.1939697265625,
                            42.26917949243506
                        ],
                        [-83.232421875,
                            42.13082130188811
                        ],
                        [-83.2489013671875,
                            42.037054301883806
                        ],
                        [-83.4136962890625,
                            41.92271616673924
                        ],
                        [-83.5675048828125,
                            41.840920397579936
                        ],
                        [-83.8916015625,
                            41.65649719441145
                        ],
                        [-83.792724609375,
                            41.39741506646461
                        ],
                        [-83.419189453125,
                            41.372686481864655
                        ],
                        [-82.79296874999999,
                            41.347948493443546
                        ],
                        [-82.6336669921875,
                            41.347948493443546
                        ],
                        [-82.5018310546875,
                            41.32320110223851
                        ],
                        [-82.001953125,
                            41.45507852101139
                        ],
                        [-81.771240234375,
                            41.43860847395721
                        ],
                        [-81.43615722656249,
                            41.57436130598913
                        ],
                        [-81.2164306640625,
                            41.74262728637672
                        ],
                        [-80.7879638671875,
                            41.84910468610387
                        ],
                        [-80.2606201171875,
                            42.01665183556825
                        ],
                        [-79.7442626953125,
                            42.2366518803206
                        ],
                        [-79.3048095703125,
                            42.45183466943921
                        ],
                        [-79.07409667968749,
                            42.581399679665054
                        ],
                        [-78.8653564453125,
                            42.73087427928485
                        ],
                        [-78.7884521484375,
                            42.81555136172695
                        ],
                        [-78.90380859375,
                            42.91218338638018
                        ]
                    ]
                ],
                "region_coordinate": [-81.0, 42.2, 0]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "title": "Lake Erie Eastern Basin",
                "region": "ER",
                "id": "er-east",
                "sortOrder": 6,
                "threshold": {
                    "total-phosphorus-glenda": 10
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-80.46524047851562,
                            42.61172761665585
                        ],
                        [-80.06149291992188,
                            42.545998432501825
                        ],
                        [-79.95849609375,
                            42.178670521216
                        ],
                        [-78.90106201171875,
                            42.61779143282346
                        ],
                        [-78.68682861328125,
                            42.87596410238254
                        ],
                        [-78.97796630859375,
                            42.94838139765314
                        ],
                        [-80.25787353515625,
                            42.84173746978783
                        ],
                        [-80.46524047851562,
                            42.61172761665585
                        ]
                    ]
                ],
                "region_coordinate": [-79.5, 42.7, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Erie Central Basin",
                "region": "ER",
                "id": "er-center",
                "sortOrder": 7,
                "threshold": {
                    "total-phosphorus-glenda": 10
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-82.50457763671874,
                            41.92169436589449
                        ],
                        [-82.69134521484374,
                            41.44993208042259
                        ],
                        [-82.49771118164062,
                            41.36031866306708
                        ],
                        [-81.73828125,
                            41.43346072687072
                        ],
                        [-79.95986938476562,
                            42.17663512119453
                        ],
                        [-80.0628662109375,
                            42.54701017547383
                        ],
                        [-81.2548828125,
                            42.73087427928485
                        ],
                        [-82.54714965820312,
                            42.058469844272544
                        ],
                        [-82.50457763671874,
                            41.92169436589449
                        ]
                    ]
                ],
                "region_coordinate": [-81.5, 42.0, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Erie Western Basin",
                "region": "ER",
                "id": "er-west",
                "sortOrder": 8,
                "threshold": {
                    "total-phosphorus-glenda": 15
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-82.50595092773438,
                            41.92271616673924
                        ],
                        [-82.69271850585938,
                            41.448902743309674
                        ],
                        [-83.935546875,
                            41.475660200278234
                        ],
                        [-83.21319580078125,
                            42.120635949743644
                        ],
                        [-82.54852294921875,
                            42.05745022024682
                        ],
                        [-82.50595092773438,
                            41.92271616673924
                        ]
                    ]
                ],
                "region_coordinate": [-83.2, 41.7, 0]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": "Lake Ontario",
                "region": "ON",
                "id": "on",
                "sortOrder": 9,
                "threshold": {
                    "total-phosphorus-glenda": 10
                }
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-79.82666015625,
                            43.29320031385282
                        ],
                        [-79.16748046874999,
                            43.810747313446996
                        ],
                        [-76.5087890625,
                            44.166444664458595
                        ],
                        [-76.124267578125,
                            43.937461690316646
                        ],
                        [-76.1572265625,
                            43.50872101129684
                        ],
                        [-76.9482421875,
                            43.25320494908846
                        ],
                        [-78.541259765625,
                            43.37311218382002
                        ],
                        [-79.332275390625,
                            43.16512263158296
                        ],
                        [-79.82666015625,
                            43.29320031385282
                        ]
                    ]
                ],
                "region_coordinate": [-77.8, 43.6, 0]
            }
        }
    ],

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

    // Trends Region Load Time Limit in Milliseconds
    load_time_limit: 100000,

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
    trends_page_settings: [
        {
            "parameter": {
                "id": "alkalinity-glenda",
                "title": "Alkalinity (mg/L)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "ammonia-nitrogen-glenda",
                "title": "Ammonia-Nitrogen (ug/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "ammonium-glenda",
                "title": "Ammonium (ug/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "chloride-glenda",
                "title": "Chloride (mg/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "chlorophyll-a-glenda",
                "title": "Chlorophyll <i>a</i> (ug/L)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "conductivity-glenda",
                "title": "Conductivity (umho/cm)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "total-hardness-glenda",
                "title": "Hardness, Total as CaCO3 (mg/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "nitrogen-glenda",
                "title": "Nitrite-Nitrate (mg/L)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "ph-glenda",
                "title": "pH",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "phosphorus-orthophosphorus-glenda",
                "title": "Phosphorus, Orthophosphorus as P (ug/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "secchi-disc-transparency-glenda",
                "title": "Secchi Disc Transparency (uS/cm)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "silica-glenda",
                "title": "Silica (mg/L)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "silica-dissolved-glenda",
                "title": "Silica, Dissolved as Si (mg/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "silica-total-glenda",
                "title": "Silica, Total (mg/l)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "temperature-glenda",
                "title": "Temperature (C)",
                "lake_regions": false
            }
        },
        {
            "parameter": {
                "id": "total-phosphorus-glenda",
                "title": "Total Phosphorus (ug/L)",
                "lake_regions": true
            }
        },
        {
            "parameter": {
                "id": "turbidity-glenda",
                "title": "Turbidity (NTU)",
                "lake_regions": false
            }
        },
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_lake_regions:[
        {
            "lake": "ER",
            "regions": "er-west,er-east,er-center"
        }
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_seasons: [
        {
            "id": "spring",
            "title": "Spring"
        }, {
            "id": "summer",
            "title": "Summer",
        }
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_timeframes: [
        {
            "id": "baseline_total_year",
            "value": 10
        }, {
            "id": "rolling_interval",
            "value": 2,
        }
    ],

    // Trends Stations and Trends Regions Pages Only
    trends_page_defaults: [
        {
            "id": "parameter",
            "value": "None"
        },
        {
            "id": "season",
            "value": "spring",
        },
        {
            "id": "by-sensors",
            "value": "Sensors",
        },
        {
            "id": "region",
            "value": "all",
        }
    ],

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
    mapTileURL: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    mapAttributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, ' +
        'UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    mapAttributionsCollapsible: true,
    mapMiniAttributionsCollapsible: true,
    mapMiniMinZoom: 3,
    mapClustersDistance: 1,
    clustersChoiceOption: false,
    clustersExpandMaxNumberFeatures: 10,
    mapMaxZoom: 16,
    mapMinZoom: 5.5,
    mapCenterValue: [-84.44799549, 38.9203417],
    mapPopupZoomMax: 10,
}
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
// Keep the next new line at the end of the file

