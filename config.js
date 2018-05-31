export const gd3 = {

    // Clowder API Information - this is also displayed in the Welcome Page dropdown selector
    clowder_endpoints: [
        {url: "https://seagrant-dev.ncsa.illinois.edu/clowder", label: "GLM DEV", title: "Great Lakes Monitoring",
            subtitle: "ILLINOIS-INDIANA SEA GRANT"},
        {url: "https://greatlakesmonitoring.org/clowder", label: "GLM PROD", title: "Great Lakes Monitoring",
            subtitle: "ILLINOIS-INDIANA SEA GRANT"},
        {url: "https://greatlakestogulf.org/clowder", label: "GLTG PROD", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
        {url: "https://gltg-dev.ncsa.illinois.edu/clowder", label: "GLTG DEV", title: "Great Lakes to Gulf",
            subtitle: "VIRTUAL OBSERVATORY"},
        {url: "http://data.imlczo.org/clowder", label: "IMLCZO PROD",   title: "IMLCZO",
            subtitle: ""},
        {url: "https://imlczo-dev.ncsa.illinois.edu/clowder", label: "IMLCZO DEV", title: "IMLCZO",
            subtitle: ""},
        {url: "http://141.142.211.37/clowder", label: "IMLCZO NEBULA", title: "IMLCZO",
            subtitle: ""},
        {url:"http://localhost:9000", label:"TEST", title:"TEST", subtitle:"TEST"}
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

    // This variable is used to determine the location for links to the Detail Page
    application_website: "/",

    // Should Tabs to select multi-parameter graphs be displayed on the Detail Page
    show_detail_tabs: true,

    // Detail Page Info Icon Text
    detail_page_separate: 'Select a minimum of one Parameter to view',
    detail_page_combined: 'Select a maximum of three Parameters to view',
    detail_page_box_and_whisker: 'Box and Whisker Plots provide a visual look at the data distribution. ' +
        'Lowest values are on the left, and the Highest values are on the right',
    detail_page_raw_processed: [
        {listText: 'Level 0: No Processing - Raw Data'},
        {listText: 'Level 1: Minimal Processing'},
        {listText: 'Level 2: Increased Processing'},
        {listText: 'Level 3: Fully Processed - No Raw Data'}
    ],

    // Detail Graphs - Display RAW vs PROCESSED for Day Average
    show_raw_processed: false,
    // Property Name that contains the PROCESSED property name
    raw_processed_property: '',

    // Layers for the Explore Page
    exploreLayers: [],

    // For Mobile Explore and Detail Pages
    mobile_sourcename: "all",
    mobile_size_max: 840,
    chrome_detail_mobile_disabled: true,
    filter_unavailable_sensors: true,
    mobile_detail_path: '/#detail/location/',
    mobile_explore_path: '/#explore/all/',

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
        "epa": "Water Quality Data",
        "glfmsp": "Great Lakes Fish Monitoring and Surveillance Program",
        "heidelberg": "Heidelberg University",
        "iadn": "Integrated Atmospheric Deposition Network",
        "lec": "Lake Erie Committee Forage Task Group",
        "usgs": "United States Geological Survey",
        "noaa": "National Oceanic and Atmospheric Administration"
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
        "wqp": "#F28E1E"
    },

    multi_parameter_map: {
        "total-phosphorus": ["total-phosphorus-glenda", "phosphorus-load", "phosphorus-concentration", "total-phosphorus-mgl"],
        "chlorophyll-a": ["chlorophyll-a-glenda"],
        "nitrogen-load": ["nitrogen-concentration"]
    },

    parameter_maps: {
        "air-pressure-kpa": "Air Pressure (kpa)",
        "air-temperature-24hr-avg-f": "Air Temperature 24hr Avg (F)",
        "air-temperature-c": "Air Temperature (°C)",
        "albedo_Avg": "Albedo +10m (W/m^2)",
        "alkalinity-glenda": "Alkalinity (mg/L)",
        "alkalinity-total-mgl": "Alkalinity Total (mg/L)",
        "amb_press_li_mean": "Air Pressure +25m (kPa)",
        "ammonia-ammonium-mgl": "Ammonia / Ammonium (mg/L)",
        "ammonia-nitrogen-glenda" : "Ammonia-Nitrogen (ug/l)",
        "ammonia-unionized- as -n-mgl": "Ammonia Unionized as N (mg/L)",
        "ammonia-unionized-temp-ph-nh4-mgl": "Ammonia Unionized Temp pH NH4 (mg/L)",
        "ammonium-glenda": "Ammonium (ug/l)",
        "ammonium-mgl": "Ammonium (mg/L)",
        "barometric-pressure-kpa": "Barometric Pressure (kpa)",
        "biomass": "Zooplankton Biomass (ug/m^3)",
        "blue-green-algae-pct-rfu": "Blue Green Algae (% RFU)",
        "blue-green-algae-pct-ugl": "Blue Green Algae (ug/L)",
        "chlordanes": "Chlordanes Total, fish tissue (ug/g)",
        "chloride-glenda": "Chloride (mg/l)",
        "chlorophyll-a": "Chlorophyll a (ug/L)",
        "chlorophyll-a-corrected-for-pheophytin-ugl": "Chlorophyll A Corrected for Pheophytin Total (ug/L)",
        "chlorophyll-a-uncorrected-for-pheophytin-ugl": "Chlorophyll A Uncorrected for Pheophytin Total (ug/L)",
        "chlorophyll-b-ugl": "Chlorophyll B Total (ug/L)",
        "chlorophyll-c-ugl": "Chlorophyll C Total (ug/L)",
        "chlorophyll-mgl": "Chlorophyll (mg/L)",
        "chlorophyll-rfu": "Chlorophyll (RFU)",
        "chlorophyll-ugl": "Chlorophyll (ug/L)",
        "CO2_li_mean": "Carbon Dioxide Concentration ppm +25m (mg/m^3)",
        "co2-flux": "C02 Flux",
        "colored-dissolved-organic-matter-ppbqse": "Colored Dissolved Organic Matter (ppb QSE)",
        "compass-heading-24hr-avg": "Compass Heading 24hr Avg (mg/L)",
        "conductivity-glenda": "Conductivity (umho/cm)",
        "conductivity-uscm": "Conductivity (uS/cm)",
        "CS655_Ec_Avg": "Soil Electrical Conductivity -0.025m (dS/m)",
        "CS655_Tmpr_Avg": "Soil Temperature -0.025m (Deg C)",
        "CS655_Wcr_Avg": "Soil Water Content -0.025m (m^3/m^3)",
        "cumulative-load-Mg": "Nitrate Cumulative Load (Mg)",
        "D5TE_EC_100cm_Avg": "Soil Electrical Conductivity -1.0m (dS/m)",
        "D5TE_EC_15cm_Avg": "Soil Electrical Conductivity -0.15m (dS/m)",
        "D5TE_EC_200cm_Avg": "Soil Electrical Conductivity -2.0m (dS/m)",
        "D5TE_EC_30cm_Avg": "Soil Electrical Conductivity -0.3m (dS/m)",
        "D5TE_EC_50cm_Avg": "Soil Electrical Conductivity -0.5m (dS/m)",
        "D5TE_EC_5cm_Avg": "Soil Electrical Conductivity -0.05m (dS/m)",
        "D5TE_T_100cm_Avg": "Soil Temperature -1.0m (Deg C)",
        "D5TE_T_15cm_Avg": "Soil Temperature -0.15m (Deg C)",
        "D5TE_T_200cm_Avg": "Soil Temperature -2.0m (Deg C)",
        "D5TE_T_30cm_Avg": "Soil Temperature -0.3m (Deg C)",
        "D5TE_T_50cm_Avg": "Soil Temperature -0.5m (Deg C)",
        "D5TE_T_5cm_Avg": "Soil Temperature -0.05m (Deg C)",
        "D5TE_VWC_100cm_Avg": "Soil Water Content -1.0m (m^3/m^3)",
        "D5TE_VWC_15cm_Avg": "Soil Water Content -0.15m (m^3/m^3)",
        "D5TE_VWC_200cm_Avg": "Soil Water Content -2.0m (m^3/m^3)",
        "D5TE_VWC_30cm_Avg": "Soil Water Content -0.3m (m^3/m^3)",
        "D5TE_VWC_50cm_Avg": "Soil Water Content -0.5m (m^3/m^3)",
        "D5TE_VWC_5cm_Avg": "Soil Water Content -0.05m (m^3/m^3)",
        "ddt": "DDTs Total, fish tissue (ug/g)",
        "density": "Zooplankton Density (#/m^3)",
        "discharge-cms": "River Discharge (ft3/s)",
        "discharge-ft3s": "Discharge (ft3/s)",
        "Discharge, cubic feet per second": "Discharge, cubic feet per second (ft3/s)",
        "dissolved-oxygen-mgl": "Dissolved Oxygen (mg/L)",
        "dissolved-oxygen-saturation-pct": "Dissolved Oxygen Saturation (%)",
        "DS2_Temp_Avg": "Air Temperature +10m (Deg C)",
        "DS2_WindDir_Avg": "Wind Direction from N +10m (Deg)",
        "DS2_WindSpeed_Avg": "Wind Speed +10m (m/s)",
        "DS2_WindSpeed_Max": "Wind Gust Speed +10m (m/s)",
        "e_sat_tmpr_rh_mean": "Saturated Vapor Pressure +25m (kPa)",
        "e_tmpr_rh_mean": "Air Vapor Pressure +25m (kPa)",
        "Fc_li_wpl": "Carbon Flux Upward +25m (mg/(m^2 s))",
        "filter_total_chlordane": "Chlordane Total, Filtered air (pg/m^3)",
        "filter_total_ddts": "DDTs Total, Filtered air(pg/m^3)",
        "filter_total_endos": "Endos Total, Filtered air(pg/m^3)",
        "filter_total_pahs": "PAHs Total, Filtered air(pg/m^3)",
        "filter_total_pests": "PESTs Total, filtered air(pg/m^3)",
        "Flood stage feet": "Flood stage feet (ft)",
        "flourescent-dissolved-organic-matter-qsu": "Flourescent Dissolved Organic Matter (QSU)",
        "flourescent-dissolved-organic-matter-rfu": "Flourescent Dissolved Organic Matter (RFU)",
        "fluorescent-dissolved-matter-rfu": "Fluorescent Dissolved Organic Matter (RFU)",
        "fluorescent-dissolved-organic-matter-qsu": "Fluorescent Dissolved Organic Matter (QSU)",
        "friction-velocity": "Friction Velocity",
        "Gage height, feet": "Gage height, feet (ft)",
        "gusting-wind-speed-mps": "Gusting Wind Speed (m/s)",
        "H2O_li_mean": "Water Vapor Concentration +25m (g/m^3)",
        "H2O_tmpr_rh_mean": "Water Vapor Concentration +25m",
        "Hc_li": "Sensible Heat Flux +25m (W/m^2)",
        "heat-flux": "Heat Flux",
        "hydromet": "Hydromet",
        "incoming-global-solar-radiation": "Incoming Global Solar Radiation",
        "incoming-longwave-radiation": "Incoming Longwave Radiation",
        "incoming-par": "Incoming PAR",
        "kjeldahl-nitrogen-mgl": "Kjeldahl Nitrogen (mg/L)",
        "land_surface~120cm-above_air__barometric_pressure-kPa": "Atmospheric Pressure +1.2m (kPa)",
        "land_surface~120cm-above_air__relative_humidity-%": "Relative Humidity +1.2m (°%)",
        "land_surface~120cm-above_air__temperature-degC": "Temperature +1.2m (°C)",
        "land_surface~20cm-depth_soil__bulk_volumetric_water_content-m3/m3": "Volumetric Water Content -0.2m (m3/m3)",
        "land_surface~20cm-depth_soil__electrical_conductivity-mS/cm": "Electrical Conductivity -0.2m (mS/cm)",
        "land_surface~20cm-depth_soil__temperature-degC": "Temperature -0.2m (°C)",
        "land_surface~5cm-depth_soil__bulk_volumetric_water_content-m3/m3": "Volumetric Water Content -0.05m (m3/m3)",
        "land_surface~5cm-depth_soil__electrical_conductivity-mS/cm": "Electrical Conductivity -0.05m (mS/cm)",
        "land_surface~5cm-depth_soil__temperature-degC": "Temperature -0.05m (°C)",
        "land_surface~60cm-depth_soil__bulk_volumetric_water_content-m3/m3": "Volumetric Water Content -0.6m (m3/m3)",
        "land_surface~60cm-depth_soil__electrical_conductivity-mS/cm": "Electrical Conductivity -0.6m (mS/cm)",
        "land_surface~60cm-depth_soil__temperature-degC": "Temperature -0.6m (°C)",
        "latent-heat-flux": "Latent Heat Flux",
        "LE_li_wpl": "Latent Heat Flux +25m (W/m^2)",
        "leaf-wetness-minutes": "Leaf Wetness (minutes)",
        "load-Mg": "Nitrate Load (Mg)",
        "long_dn_corr_Avg": "Outgoing Longwave Radiation +10m (W/m^2)",
        "long_up_corr_Avg": "Incoming Longwave Radiation +10m (W/m^2)",
        "mean_wind_direction": "mean_wind_direction",
        "mean_wind_speed": "mean_wind_speed",
        "mercury": "Mercury, fish tissue (ug/g)",
        "mirex": "Mirex, fish tissue (ug/g)",
        "Monthly Precipitation in inches": "Monthly Precipitation in inches (in)",
        "monthly-precipitation-cm": "Monthly Precipitation (cm)",
        "NDVI_Avg": "Normalized Difference Vegetation Index +10m",
        "net-ecosystem-exchange": "Net Ecosystem Exchange",
        "nitrate-as-n-mgl": "Nitrate as N (mg/L)",
        "nitrate-mgl": "Nitrate Total (mg/L)",
        "Nitrate-N mg/L": "Nitrate-N mg/L (mg/L)",
        "nitrate-nitrite-as-n-mgl": "Nitrate and Nitrite as N (mg/L)",
        "nitrate-nitrite-inorganic-total-as-n-mgl": "Inorganic Nitrogen (Nitrate and Nitrite) Total (mg/L)",
        "nitrate-nitrite-total-as-n-mgl": "Nitrate Nitrite Total as N (mg/L)",
        "nitrate-nitrogen-dissolved-as-no3-mgl": "Nitrate Nitrogen, Dissolved (MG/L AS NO3)",
        "nitrate-nitrogen-total-as-n-mgl": "Nitrate Nitrogen Total as N (mg/L)",
        "nitrate+nitrite-mgl": "Nitrate Plus Nitrite (mg/L)",
        "nitrite-nitrogen-dissolved-as-n-mgl": "Nitrite Nitrogen Dissolved as N (mg/L)",
        "nitrite-nitrogen-total-as-n-mgl": "Nitrite Nitrogen Total as N (mg/L)",
        "nitrite-plus-nitrate-diss-1det-as-n-mgl": "Nitrite + Nitrate Diss 1det as N (mg/L)",
        "nitrogen-ammonia-bottom-deposits-MgKg": "Nitrogen Ammonia, Bottom Deposits (MG/KG-N)",
        "nitrogen-ammonia-dissolved-as-n-mgl": "Nitrogen Ammonia Dissolved as N (mg/L)",
        "nitrogen-ammonia-dissolved-as-nh4-mgl": "Nitrogen Ammonia, Dissolved (MG/L AS NH4)",
        "nitrogen-ammonia-total-as-n-mgl": "Nitrogen Ammonia Total as N (mg/L)",
        "nitrogen-dissolved-as-n-mgl": "Nitrogen Dissolved (MG/L AS N)",
        "nitrogen-glenda": "Nitrite-Nitrate (mg/L)",
        "nitrogen-kjeldahl-dissolved-as-n-mgl": "Nitrogen Kjeldahl Dissolved as N (mg/L)",
        "nitrogen-kjeldahl-total-as-n-mgl": "Nitrogen Kjeldahl Total as N (mg/L)",
        "nitrogen-kjeldahl-total-bottom-dep-dry-wt-Mgkg": "Nitrogen Kjehdahl Total Bottom Dep Dry Weight (Mg/kg)",
        "nitrogen-load": "Nitrogen (mg/L)",
        "nitrogen-organic-total-as-n-mgl": "Nitrogen Organic Total as N (mg/L)",
        "nitrogen-total-as-n-mgl": "Nitrogen Total as N (mg/L)",
        "nitrogen-total-as-no3-mgl": "Nitrogen Total as NO3 (mg/L)",
        "ortho-phosphate-nes-algal-assay-mgl": "Ortho-Phosphate NES Algal Assay (mg/L)",
        "outgoing-global-solar-radiation": "Outgoing Global Solar Radiation",
        "outgoing-longwave-radiation": "Outgoing Longwave Radiation",
        "par-density-avg": "PAR Density",
        "pbde": "PBDEs Total, fish tissue (ug/g)",
        "pcb": "PCB, fish tissue (ug/g)",
        "ph-glenda": "pH",
        "pH": "Stream pH",
        "phosphate-ortho-as-po4-mgl": "Phosphate Ortho(MG/L AS PO4)",
        "phosphate-poly-as-po4-mgl": "Phosphate Poly (MG/L AS PO4)",
        "phosphate-total-as-po4-mgl": "Phosphate Total (MG/L AS PO4)",
        "phosphate-total-soluble-mgl": "Phosphate Total Soluble (mg/L)",
        "phosphorus-dissolved-as-p-mgl": "Phosphorous Dissolved as P (mg/L)",
        "phosphorus-dissolved-orthophosphate-as-p-mgl": "Phosphorous Dissolved Orthophosphate as P (mg/L)",
        "phosphorus-in-total-orthophosphate-as-p-mgl": "Phosphorous in Total Orthophosphate as P (mg/L)",
        "phosphorus-orthophosphorus-glenda": "Phosphorus, Orthophosphorus as P (ug/l)",
        "phosphorus-sed-bot-<63-dry-sieve-lab-totals-pct": "Phosphorus SED BOT <63 Dry Sieve Lab Total (pct)",
        "phosphorus-sed-bot-<63-wet-sieve-field-total-pct": "Phosphorus, SED, BOT, <63, Wet Sieve, Field, Total (mg/L)",
        "phosphorus-total-as-p-mgl": "Phosphorous Total as P (mg/L)",
        "phosphorus-total-as-po4-mgl": "Phosphorous Total (MG/L AS PO4)",
        "precip_total_chlordane": "Chlordane Total, precipitation (pg/L)",
        "precip_total_ddts": "DDTs Total, precipitation (pg/L)",
        "precip_total_endos": "Endos Total, precipitation (pg/m^3)",
        "precip_total_pahs": "PAHs Total, precipitation (pg/L)",
        "precip_total_pests": "PESTs Total, precipitation (pg/L)",
        "phosphorus-total-bottom-deposit-dry-wgt-Mgkg": "Phosphorous Total Bottom Deposit Dry Weight (Mg/kg)",
        "Precip_Tot": "Precipitation +1.5m (mm)",
        "precipitation-mm": "Precipitation (mm)",
        "PRI_Avg": "Photochemical Reflectance Index +10m",
        "radiation-wm2": "Radiation (wm2)",
        "Rain_mm_Tot": "Precipitation (total) +1.5m (mm)",
        "reflected-par": "Reflected PAR",
        "relative-humidity-percentage": "Relative Humidity (%)",
        "RH_tmpr_rh_mean": "Relative Humidity +25m (%)",
        "rho_a_li_mean": "Air Density +25m (kg/m^3)",
        "river-discharge": "River Discharge (cubic feet/s)",
        "river-stage-m": "River Stage",
        "Rl_net_Avg": "Longwave Net (Incoming-Outgoing) Radiation +10m (W/m^2)",
        "Rn_Avg": "Net (Incoming-Outgoing) Radiation +10m (W/m^2)",
        "Rs_net_Avg": "Shortwave Net (Incoming-Outgoing) Radiation +10m (W/m^2)",
        "rslt_wnd_spd": "Wind Speed +25m (m/s)",
        "salinity-psu": "Salinity (PSU)",
        "secchi-disc-transparency-glenda": "Secchi Disc Transparency (uS/cm)",
        "shf_Avg(1)": "Ground Heat Flux Plate 1 -0.8m (W/m^2)",
        "shf_Avg(2)": "Ground Heat Flux Plate 2 -0.8m (W/m^2)",
        "short_dn_Avg": "Outgoing Shortwave Radiation +10m (W/m^2)",
        "short_up_Avg": "Incoming Shortwave Radiation +10m (W/m^2)",
        "silica-dissolved-glenda": "Silica, Dissolved as Si (mg/l)",
        "silica-glenda": "Silica (mg/L)",
        "silica-total-glenda": "Silica, Total (mg/l)",
        "soil-heat-flux": "Soil Heat Flux",
        "soil-states": "Soil States",
        "soil-temperature-c": "Soil Temperature (°C)",
        "soil-water-content-1": "soil-water-content-1",
        "soil-water-content-2": "soil-water-content-2",
        "solar-radiation-wm2": "Solar Radiation (wm2)",
        "soluble-reactive-phosphorus-mgl": "Soluble Reactive Phosphorus (mg/L)",
        "specific-conductance-uScm": "Specific Conductance(uS/cm)",
        "SQ_110_Avg": "Photosynthically Active Radiation +2m (micromol m-2s-1)",
        "srp-load": "Soluble Reactive Phosphorus (mg/L)",
        "std_wind_dir": "std_wind_dir",
        "stream-water-quality": "Stream Water Quality",
        "streamflow": "Streamflow",
        "suspended-solids-total-mgl": "Total Suspended Solids (mg/L)",
        "T_tmpr_rh_mean": "Air Temperature +25m (C)",
        "Targ121TempC_Avg": "Surface Temperature from S-121 Radiometer +10m (Deg C)",
        "Targ1H1TempC_Avg": "Surface Temperature from S-1H1 Radiometer +10m (Deg C)",
        "temperature-glenda": "Temperature (C)",
        "total-hardness-glenda": "Hardness, Total as CaCO3 (mg/l)",
        "total-nitrite-mgl": "Nitrite Total (mg/L)",
        "total-nitrogen-lbs": "Total Annual Nitrogen (lbs)",
        "total-nitrogen-mgl": "Total Nitrogen (mg/L)",
        "total-phosphorus": "Total Phosphorus (ug/L)",
        "total-phosphorus-lbs": "Total Annual Phosphorous (lbs)",
        "total-soluble-nitrogen-mgl": "Total Soluble Nitrogen (mg/L)",
        "total-soluble-phosphorus-mgl": "Total Soluble Phosphorus (mg/L)",
        "toxaphene": "Toxaphene, fish tissue (ug/l)",
        "ts1-depth-cm": "ts1-depth-cm (cm)",
        "ts2-depth-cm": "ts2-depth-cm (cm)",
        "turbidity-fnu": "Turbidity (FNU)",
        "turbidity-glenda": "Turbidity (NTU)",
        "u_star": "Friction Velocity +25m (m/s)",
        "vapor_suite_pcbs": "PCBs Total, vapor (pg/m^3)",
        "vapor_total_chlordane": "Chlordane Total, vapor (pg/m^3)",
        "vapor_total_ddts": "DDTs Total, vapor (pg/m^3)",
        "vapor_total_endos": "Endos Total, vapor (pg/m^3)",
        "vapor_total_pahs": "PAHs Total, vapor (pg/m^3)",
        "vapor_total_pests": "PESTs Total, vapor (pg/m^3)",
        "vapor-pressure-deficit": "Vapor Pressure Deficit",
        "volatile-solids-suspended-mgl": "Volatile Suspended Solids (mg/L)",
        "volatile-solids-total-mgl": "Volatile Solids Total (mg/L)",
        "Water temp F": "Water temp F (°F)",
        "water-elevation": "Water Elevation",
        "water-temperature-c": "Water Temperature (°C)",
        "water-turbidity-fnu": "Water Turbidity (FNU)",
        "wind-direction-degrees": "Wind Direction (degrees)",
        "wind-direction": "Wind Direction (Deg)",
        "wind-speed-mph": "Wind Speed (F)",
        "wind-speed-mps": "Wind Speed (m/s)",
        "WindDir": "Wind Direction +2.4m (degrees)",
        "wnd_dir_compass": "Wind Direction from N +25m (degrees)",
        "Ws_ms": "Wind Speed +2.4m (m/s)"
    },

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

    // Set this to true if only want EPA sensors for all Trends
    trends_only_epa: true,

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
                "id": "nitrate-as-n-mgl",
                "title": "Nitrate as N"
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
                "id": "pH",
                "title": "Water Acidity"
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
                "id": "load-Mg",
                "title": "Nitrate Load"
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
                "title": "Chlorophyll a (ug/L)",
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

    // Exploratory Analysis Page Only
    trends_analysis_baseline: [
        {
            "id": "17",
            "value": 17,
            "title": "17 Years"
        },
        {
            "id": "30",
            "value": 30,
            "title": "30 Years"
        }
    ],

    // Exploratory Analysis Page Only
    trends_analysis_rolling: [
        {
            "id": "5",
            "value": 5,
            "title": "5 Years"
        },
        {
            "id": "17",
            "value": 17,
            "title": "17 Years"
        }
    ],

    // Exploratory Analysis Page Only
    trends_analysis_water_year: false,
    // **********

    // These variables are for Map settings
    mapTileURL: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    mapAttributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> &mdash; National Geographic, Esri, DeLorme, NAVTEQ, ' +
        'UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    mapAttributionsCollapsible: true,
    mapMiniAttributionsCollapsible: true,
}
// ATTENTION: don't add semicolon at the end of this config. config.js on production will wrap this with additional {}
