// This example config is based on GLTG
export default {
    map: {
        geoserverUrl: process.env.GEOSERVER_URL,
        zoom: 5.5,
        center: [-9972968, 4972295],
        useCluster: true,
        clusterDistance: 45,
        clusterExpandCountThreshold: 10,
        clusterExpandZoomThreshold: 12,
        layers: {
            'SPARROW 2002 Nutrient Model Results': [
                {
                    title: 'SPARROW 2002 Nitrogen Load',
                    id: 'gltg:sparrow-nitrogen',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:sparrow-nitrogen'
                },
                {
                    title: 'SPARROW 2002 Phosphorus Load',
                    id: 'gltg:sparrow-phosphorus',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:sparrow-phosphorus'
                }
            ],
            'Watershed Boundaries': [
                {
                    title: 'HUC 8',
                    id: 'gltg:huc250k',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc250k'
                },
                {
                    title: 'HUC 4',
                    id: 'gltg:huc4',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc4'
                },
                {
                    title: 'HUC 2',
                    id: 'gltg:huc2',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:huc2'
                }
            ],
            'Hypoxia and Precipitation': [
                {
                    title: '2005 Hypoxia Contours',
                    id: 'gltg:2005_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2005_Hypoxia_Contours'
                },
                {
                    title: '2006 Hypoxia Contours',
                    id: 'gltg:2006_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2006_Hypoxia_Contours'
                },
                {
                    title: '2007 Hypoxia Contours',
                    id: 'gltg:2007_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2007_Hypoxia_Contours'
                },
                {
                    title: '2008 Hypoxia Contours',
                    id: 'gltg:2008_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2008_Hypoxia_Contours'
                },
                {
                    title: '2009 Hypoxia Contours',
                    id: 'gltg:2009_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2009_Hypoxia_Contours'
                },
                {
                    title: '2010 Hypoxia Contours',
                    id: 'gltg:2010_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2010_Hypoxia_Contours'
                },
                {
                    title: '2011 Hypoxia Contours',
                    id: 'gltg:2011_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2011_Hypoxia_Contours'
                },
                {
                    title: '2012 Hypoxia Contours',
                    id: 'gltg:2012_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2012_Hypoxia_Contours'
                },
                {
                    title: '2013 Hypoxia Contours',
                    id: 'gltg:2013_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2013_Hypoxia_Contours'
                },
                {
                    title: '2014 Hypoxia Contours',
                    id: 'gltg:2014_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2014_Hypoxia_Contours'
                },
                {
                    title: '2015 Hypoxia Contours',
                    id: 'gltg:2015_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2015_Hypoxia_Contours'
                },
                {
                    title: '2016 Hypoxia Contours',
                    id: 'gltg:2016_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2016_Hypoxia_Contours'
                },
                {
                    title: '2017 Hypoxia Contours',
                    id: 'gltg:2017_Hypoxia_Contours',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:2017_Hypoxia_Contours'
                }
            ],
            'Cropscape Frequency Data': [
                {
                    title: 'Corn Frequency',
                    id: 'gltg:corn_freq',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:corn_freq'
                },
                {
                    title: 'Cotton Frequency',
                    id: 'gltg:cotton_freq',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:cotton_freq'
                },
                {
                    title: 'Soy Frequency',
                    id: 'gltg:soy_freq',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:soy_freq'
                }
            ],
            '': [
                {
                    title: 'River Reaches',
                    id: 'gltg:gltg-pools',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:gltg-pools',
                    initialOpacity: 0.9
                },
                {
                    title: 'Large Rivers',
                    id: 'gltg:us-rivers',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:us-rivers',
                    initialVisibility: true,
                    initialOpacity: 0.25
                },
                {
                    title: 'US States',
                    id: 'gltg:us-states',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:us-states',
                    initialOpacity: 0.5
                },
                {
                    title: 'Total annual nitrogen from point sources by HUC8 watershed (avg. 2007-2014)',
                    id: 'gltg:agg-pt-source',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:agg-pt-source',
                    initialOpacity: 0.5
                },
                {
                    title: 'Average Annual Nitrogen Fertilizer Inputs for 1997 to 2006',
                    id: 'gltg:fertilizer_n',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:fertilizer_n',
                    initialOpacity: 0.5
                },
                {
                    title: 'EPA Impaired Stream Segments',
                    id: 'gltg:impaired-epa',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:impaired-epa',
                    initialOpacity: 0.75
                },
                {
                    title: 'State Legislative District - Lower Chamber',
                    id: 'gltg:state-legi-dist-lower',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:state-legi-dist-lower',
                    initialOpacity: 0.75
                },
                {
                    title: 'State Legislative District - Upper Chamber',
                    id: 'gltg:state-legi-dist-upper',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:state-legi-dist-upper',
                    initialOpacity: 0.75
                },
                {
                    title: 'Congressional District',
                    id: 'gltg:cong-dist-il',
                    type: 'wms',
                    legend: '/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&layer=gltg:cong-dist-il',
                    initialOpacity: 0.75
                }
            ]
        }
    },
    geostreamingEndpoint: process.env.GEOSTREAMS_URL,
    sensors: {
        maxDisplayParameters: 10,
        displayOnlineStatus: true
    },
    source: {
        'epa': {
            label: 'EPA Pollutant Loading',
            order: 1,
            color: '#a87c03',
            description: 'These locations contain data related to EPA Pollutant Loading.',
            more_info: 'Click here for more information about EPA Pollutant Loading',
            link : 'https://cfpub.epa.gov/dmr/',
            useSeasonFilter: true
        },
        'glfmsp': {
            order: 2
        },
        'greon': {
            label: 'Great Rivers Ecological Observation Network',
            color: '#BDBFA6',
            description:
                'The GREON℠ program seeks to establish a network of real-time water quality monitoring platforms ' +
                'on great rivers around the world. NGRREC℠ partnered with YSI Inc. to design and launch a monitoring ' +
                'buoy capable of real-time, continuous collection of water quality and phytoplankton data. The first ' +
                'YSI PISCES (Pontoon for In-situ Characterization of Environmental Systems) buoy launched in May 2013 ' +
                'on the Upper Mississippi River System, but the program aims to expand to deploy platforms across the ' +
                'globe on other international great river systems.',
            qaqc: 'Note: This data is not QA/QC.',
            more_info: 'More information about GREON',
            link: 'http://www.ngrrec.org/GREON/'
        },
        'gac': {
            label: 'Gustavus Adolphus College',
            color: '#8c1ace',
            description: 'Spreadsheet data from 2016'
        },
        'heidelberg': {
            order: 3
        },
        'iadn': {
            order: 4
        },
        'illinois-epa': {
            label: 'IEPA Ambient Water Quality Monitoring Network',
            color: '#d89b0d',
            description: 'These locations contain data related to the IEPA Ambient Water Quality Monitoring Network.',
            more_info: 'Click here for more information about the IEPA Ambient Water Quality Monitoring Network (AWQMN)',
            link: 'http://www.epa.illinois.gov/topics/water-quality/monitoring/river-and-stream/'
        },
        'iwqis': {
            label: 'Iowa Water Quality Information System',
            color: '#31CFC1',
            description:
                'The IWQIS allows access to real-time water-quality data and information such as nitrate, pH, and ' +
                'dissolved oxygen concentrations, discharge rates, and temperature.',
            more_info: 'Click here for more information about IWQIS',
            link : 'http://iwqis.iowawis.org/'
        },
        'lec': {
            order: 5
        },
        'metc': {
            label: 'Metropolitan Council',
            color: '#D2E11D',
            description:
                'These locations contain data related to the ' +
                'Metropolitan Council Environmental Information Management Systems.',
            more_info: 'Click here for more information about the Metropolitan Council',
            link : 'https://eims.metc.state.mn.us/'
        },
        'noaa': {
            label: 'National Oceanic and Atmospheric Administration',
            order: 7,
            color: '#043C82',
            description:
                "NOAA's National Data Buoy Center (NDBC) collects wind, wave, and other marine data. The data are " +
                'collected from NDBC moored buoys and from C-MAN (Coastal-Marine Automated Network) stations located ' +
                'on piers, offshore towers, lighthouses, and beaches. Parameters reported by both buoys and C-MAN ' +
                'stations include air temperature and pressure, wind speed and direction, wind gust, and sea surface ' +
                'temperature. The buoys (and a few C-MAN stations located on offshore towers) also report wave data, ' +
                "usually including wave height, wave period, and wave spectra. We've chosen to focus on buoys on the " +
                'Mississippi River that are equipped with continuous water quality sensors for this website.',
            more_info: 'For more information and for access to all NOAA buoy data.',
            link : 'http://www.nodc.noaa.gov/'
        },
        'sierra-club': {
            label: 'Fox River Study Group',
            color: '#9C2C1A',
            description:  'These locations contain data related to the Fox River Study Group.',
            more_info: 'Click here for more information about the Fox River Study Group',
            link : 'http://foxriverstudygroup.org/'
        },
        'tennessee': {
            label: 'Tennessee',
            color: '#d80d50',
            description: 'These locations contain data related to Tennessee.'
        },
        'usgs': {
            label: 'United States Geological Survey',
            order: 6,
            color: '#39B54A',
            description:
                'The USGS investigates the occurrence, quantity, quality, distribution, and movement of surface and ' +
                'underground waters and disseminates the data to the public, State and local governments, public and ' +
                'private utilities, and other Federal agencies involved with managing our water resources. U.S. ' +
                'Geological Survey conducts long-term monitoring of lakes and rivers nationwide. They have gauges ' +
                "throughout many rivers in the Mississippi River basin. We've chosen to focus on gauges on the " +
                'Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.',
            more_info: 'For more information and for access to all USGS water quantity and quality data.',
            link : 'http://waterdata.usgs.gov/nwis'
        },
        'usgs-sg': {
            label: 'United States Geological Survey (Super Gage Network)',
            color: '#228e31',
            description:
                'The USGS investigates the occurrence, quantity, quality, distribution, and movement of surface and ' +
                'underground waters and disseminates the data to the public, State and local governments, public and ' +
                'private utilities, and other Federal agencies involved with managing our water resources. U.S. ' +
                'Geological Survey conducts long-term monitoring of lakes and rivers nationwide. They have gauges ' +
                "throughout many rivers in the Mississippi River basin. We've chosen to focus on gauges on the " +
                'Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.',
            more_info: 'For more information and for access to all USGS water quantity and quality data.',
            link : 'http://waterdata.usgs.gov/nwis'
        },
        'umrr-ltrm': {
            label: 'Upper Mississippi River Restoration',
            color: '#5F99C1',
            description:
                'The UMRR LTRM water quality sampling design focuses on a subset of limnological variables related ' +
                'to habitat quality and ecosystem function that includes physicochemical features, suspended sediment, ' +
                "and major plant nutrients known to be significant to aquatic habitat in this system. We've chosen to " +
                'focus on long term nitrate data sets available on the Mississippi River for this website.',
            more_info: 'Click here for more information and for access to all original UMRR LTRM data.',
            link : 'http://www.umesc.usgs.gov/data_library/water_quality/water1_query.shtml'
        },
        'wqp': {
            label: 'Water Quality Portal',
            color: '#F28E1E',
            description:
                'The Water Quality Portal (WQP) is a cooperative service sponsored by the United States Geological ' +
                'Survey (USGS), the Environmental Protection Agency (EPA) and the National Water Quality Monitoring ' +
                'Council (NWQMC) that integrates publicly available water quality data from the USGS National Water ' +
                'Information System (NWIS) the EPA STOrage and RETrieval (STORET) Data Warehouse, and the USDA ARS ' +
                "Sustaining The Earth’s Watersheds - Agricultural Research Database System (STEWARDS). We've chosen " +
                'to focus on available Water Quality Portal long term (5 years) nitrate data sets available on the ' +
                'Mississippi River and its tributaries for this website.',
            more_info: 'Click here for more information and for access to all WQP data.',
            link : 'http://waterqualitydata.us/'
        }
    }
};
