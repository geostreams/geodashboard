export const named_locations =
{
      "OH": "Ohio",
      "HU": "Lake Huron",
      "ON": "Lake Ontario",
      "MI": "Lake Michigan",
      "ER": "Lake Erie",
      "SU": "Lake Superior"
};

export const sourcecolor = {
      "ads": "#bf5fff",
      "ats": "#0d71ba",
      "epa" :  "#0D71BA",
      "glfmsp" : "#F7941E",
      "gsfmp" : "#CC2128",
      "heidelberg" : "#CC2128",
      "iadn" : "#8A2BE2",
      "ifis": "#a17c6c",
      "imlczo": "#C4B9A2",
      "isws": "#f7941e",
      "lec" : "#4D6363",
      "noaa" : "#043C82",
      "ps" : "#cc2128",
      "ss" : "#4d6363",
      "usgs" : "#39B54A",
      "wqp" : "#F28E1E"
};

export const parameter_maps = {
      "biomass": "Zooplankton Biomass (ug/m^3)",
      "density": "Zooplankton Density (#/m^3)",
      "alkalinity": "Alkalinity (mg/L)",
      "chlorophyll-a": "Chlorophyll <i>a</i> (ug/L)",
      "nitrogen": "Nitrite-Nitrate (mg/L)",
      "silica": "Silica (mg/L)",
      "total-phosphorus": "Total Phosphorus (ug/L)",
      "turbidity": "Turbidity (NTU)",
      "phosphorus-load": "Total Phosphorus (ug/L)",
      "nitrogen-load": "Nitrogen (mg/L)",
      "mercury": "Mercury (ug/g)",
      "pbde": "Total PBDEs (ug/g)",
      "ddt": "Total DDTs (ug/g)",
      "chlordanes": "Total Chlordanes (ug/g)",
      "pcb": "PCB Fish Tissue (ug/g)",
      "toxaphene": "Toxaphene (ug/l)",
      "river-discharge": "River Discharge (cubic feet/s)",
      "srp-load": "Soluble Reactive Phosphorus (mg/L)",
      "phosphorus-concentration": "Total Phosphorus (ug/L)",
      "nitrogen-concentration": "Nitrogen (mg/L)",
      "depth": "Depth (m)",
      "load-Mg": "Nitrate Load (Mg)",
      "cumulative-load-Mg": "Nitrate Cumulative Load (Mg)",
      "ammonia-ammonium-mgl": "Ammonia / Ammonium (mg/L)",
      "blue-green-algae-pct-rfu": "Blue Green Algae (% RFU)",
      "stream-water-quality": "Stream Water Quality",
      "streamflow": "Streamflow",
      "soil-states": "Soil States",
      "air-pressure-kpa": "Air Pressure (kpa)",
      "air-temperature-c": "Air Temperature (°C)",
      "ammonium-mgl": "Ammonium (mg/L)",
      "barometric-pressure-kpa": "Barometric Pressure (kpa)",
      "co2-flux": "C02 Flux",
      "friction-velocity": "Friction Velocity",
      "gusting-wind-speed-mps": "Gusting Wind Speed (m/s)",
      "nitrate-as-n-mgl": "Nitrate as N (mg/L)",
      "pH": "Stream pH",
      "precipitation-mm": "Precipitation (mm)",
      "radiation-wm2": "Radiation (wm2)",
      "discharge-cms": "River Discharge (ft3/s)",
      "soil-temperature-c": "Soil Temperature (°C)",
      "water-temperature-c" : "Water Temperature (°C)",
      "wind-speed-mps": "Wind Speed (m/s)"
};

export const sourcename = {
      "glfmsp": "Great Lakes Fish Monitoring and Surveillance Program",
      "epa": "Water Quality Data",
      "heidelberg": "Heidelberg University",
      "lec": "Lake Erie Committee Forage Task Group",
      "usgs": "United States Geological Survey",
      "iadn": "Integrated Atmospheric Deposition Network"
};

export const trend_colors = {
    "trendUp" : "#FAE70B",
    "trendDown" : "#29ABE2",
    "noTrend" : "#7F7F7F",
    "overThresholdUp" : "#ED2026",
    "overThresholdDown" : "#ED2026"
};

export const trend_settings = [
    {
        "parameter": {
            "id": "nitrate-as-n-mgl",
            "title": "Nitrate as N"
        },
        "thresholds":[
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
            "id":"pH",
            "title": "Water Acidity"
        },
        "thresholds":[
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
        "thresholds":[
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
];
