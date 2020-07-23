export default {
    map: {
        clusterExpandCountThreshold: 10,
        clusterExpandZoomThreshold: 12
    },
    geostreamingEndpoint: process.env.GEOSTREAMS_URL,
    sensors: {
        displayOnlineStatus: true
    },
    source: {
        'epa': {
            label: 'EPA Offshore',
            order: 1,
            color: '#0D71BA',
            description: 'These locations contain data related to EPA Pollutant Loading.',
            more_info: 'Click here for more information about EPA Pollutant Loading',
            link : 'https://cfpub.epa.gov/dmr/',
            useSeasonFilter: true
        },
        'glfsmp': {
            label: 'Great Lakes Fish Monitoring and Surveillance Program',
            color: '#F7941E',
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
            label: 'Heidelberg University',
            color: '#CC2128',
            order: 3
        },
        'iadn': {
            label: 'Integrated Atmospheric Deposition Network',
            color: '#8A2BE2',
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
            label: 'Lake Erie Committee Forage Task Group',
            color: '#4D6363',
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
            label: 'United States Geological Survey (Supergauge)',
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
