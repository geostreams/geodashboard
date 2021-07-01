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
            link: 'https://cfpub.epa.gov/dmr/',
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
            link: 'http://iwqis.iowawis.org/'
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
            link: 'https://eims.metc.state.mn.us/'
        },
        'noaa': {
            label: 'National Oceanic and Atmospheric Administration',
            order: 7,
            color: '#043C82',
            description:
                'NOAA\'s National Data Buoy Center (NDBC) collects wind, wave, and other marine data. The data are ' +
                'collected from NDBC moored buoys and from C-MAN (Coastal-Marine Automated Network) stations located ' +
                'on piers, offshore towers, lighthouses, and beaches. Parameters reported by both buoys and C-MAN ' +
                'stations include air temperature and pressure, wind speed and direction, wind gust, and sea surface ' +
                'temperature. The buoys (and a few C-MAN stations located on offshore towers) also report wave data, ' +
                'usually including wave height, wave period, and wave spectra. We\'ve chosen to focus on buoys on the ' +
                'Mississippi River that are equipped with continuous water quality sensors for this website.',
            more_info: 'For more information and for access to all NOAA buoy data.',
            link: 'http://www.nodc.noaa.gov/'
        },
        'sierra-club': {
            label: 'Fox River Study Group',
            color: '#9C2C1A',
            description: 'These locations contain data related to the Fox River Study Group.',
            more_info: 'Click here for more information about the Fox River Study Group',
            link: 'http://foxriverstudygroup.org/'
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
                'throughout many rivers in the Mississippi River basin. We\'ve chosen to focus on gauges on the ' +
                'Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.',
            more_info: 'For more information and for access to all USGS water quantity and quality data.',
            link: 'http://waterdata.usgs.gov/nwis'
        },
        'usgs-sg': {
            label: 'United States Geological Survey (Super Gage Network)',
            color: '#228e31',
            description:
                'The USGS investigates the occurrence, quantity, quality, distribution, and movement of surface and ' +
                'underground waters and disseminates the data to the public, State and local governments, public and ' +
                'private utilities, and other Federal agencies involved with managing our water resources. U.S. ' +
                'Geological Survey conducts long-term monitoring of lakes and rivers nationwide. They have gauges ' +
                'throughout many rivers in the Mississippi River basin. We\'ve chosen to focus on gauges on the ' +
                'Mississippi River and its tributaries that are equipped with continuous nitrate sensors for this website.',
            more_info: 'For more information and for access to all USGS water quantity and quality data.',
            link: 'http://waterdata.usgs.gov/nwis'
        },
        'umrr-ltrm': {
            label: 'Upper Mississippi River Restoration',
            color: '#5F99C1',
            description:
                'The UMRR LTRM water quality sampling design focuses on a subset of limnological variables related ' +
                'to habitat quality and ecosystem function that includes physicochemical features, suspended sediment, ' +
                'and major plant nutrients known to be significant to aquatic habitat in this system. We\'ve chosen to ' +
                'focus on long term nitrate data sets available on the Mississippi River for this website.',
            more_info: 'Click here for more information and for access to all original UMRR LTRM data.',
            link: 'http://www.umesc.usgs.gov/data_library/water_quality/water1_query.shtml'
        },
        'wqp': {
            label: 'Water Quality Portal',
            color: '#F28E1E',
            description:
                'The Water Quality Portal (WQP) is a cooperative service sponsored by the United States Geological ' +
                'Survey (USGS), the Environmental Protection Agency (EPA) and the National Water Quality Monitoring ' +
                'Council (NWQMC) that integrates publicly available water quality data from the USGS National Water ' +
                'Information System (NWIS) the EPA STOrage and RETrieval (STORET) Data Warehouse, and the USDA ARS ' +
                'Sustaining The Earth’s Watersheds - Agricultural Research Database System (STEWARDS). We\'ve chosen ' +
                'to focus on available Water Quality Portal long term (5 years) nitrate data sets available on the ' +
                'Mississippi River and its tributaries for this website.',
            more_info: 'Click here for more information and for access to all WQP data.',
            link: 'http://waterqualitydata.us/'
        }
    },
    trends: {
        // The trend sample config is from GLM
        map: {
            geoserverUrl: process.env.GEOSERVER_URL,
            zoom: 6,
            center: [-9397690.175308002, 5582164.274953878]
        },
        boundaries: [
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Superior',
                    region: 'SU',
                    id: 'su',
                    sortOrder: 1,
                    threshold: {
                        'total-phosphorus-glenda': 5
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-88.1982421875, 48.9513664709477],
                            [-92.8125, 46.78501604269254],
                            [-92.52685546875, 46.51351558059737],
                            [-84.462890625, 46.51351558059737],
                            [-84.70458984375, 47.916342040161155],
                            [-86.220703125, 48.8936153614802],
                            [-88.1982421875, 48.9513664709477]
                        ]
                    ],
                    region_coordinate: [-87.5, 47.5, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Huron',
                    region: 'HU',
                    id: 'hu',
                    sortOrder: 3,
                    threshold: {
                        'total-phosphorus-glenda': 5
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-84.66064453125, 46.057985244793024],
                            [-84.0673828125, 46.46813299215554],
                            [-80.70556640625, 46.027481852486645],
                            [-79.47509765625, 44.68427737181225],
                            [-80.13427734374999, 44.37098696297173],
                            [-81.2109375, 44.84029065139799],
                            [-81.73828125, 43.30919109985686],
                            [-82.46337890625, 42.956422511073335],
                            [-82.96875, 43.97700467496408],
                            [-84.0673828125, 43.1811470593997],
                            [-84.55078125, 43.88205730390537],
                            [-83.4521484375, 44.54350521320822],
                            [-84.5068359375, 45.61403741135093],
                            [-84.66064453125, 46.057985244793024]
                        ]
                    ],
                    region_coordinate: [-82.0, 45.0, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Michigan',
                    region: 'MI',
                    id: 'mi',
                    sortOrder: 2,
                    threshold: {
                        'total-phosphorus-glenda': 7
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-86.98974609375, 46.01985337287631],
                            [-88.143310546875, 44.73892994307368],
                            [-87.890625, 41.590796851056005],
                            [-85.97900390625, 41.5579215778042],
                            [-86.220703125, 44.213709909702054],
                            [-84.814453125, 45.72152152227954],
                            [-85.078125, 46.255846818480336],
                            [-86.98974609375, 46.01985337287631]
                        ]
                    ],
                    region_coordinate: [-87.0, 43.5, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake St. Clair',
                    region: 'CL',
                    id: 'cl',
                    sortOrder: 4,
                    threshold: {
                        'total-phosphorus-glenda': 5
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-82.65289306640624, 42.726839149554394],
                            [-82.85614013671875, 42.67233920753354],
                            [-82.99072265625, 42.34433533786168],
                            [-82.584228515625, 42.259016415705766],
                            [-82.3974609375, 42.32403179535469],
                            [-82.38922119140625, 42.53486817758702],
                            [-82.65289306640624, 42.726839149554394]
                        ]
                    ],
                    region_coordinate: [-82.7, 42.5, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Erie Eastern Basin',
                    region: 'ER',
                    id: 'er-east',
                    sortOrder: 6,
                    threshold: {
                        'total-phosphorus-glenda': 10
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
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
                    region_coordinate: [-79.5, 42.7, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Erie Central Basin',
                    region: 'ER',
                    id: 'er-center',
                    sortOrder: 7,
                    threshold: {
                        'total-phosphorus-glenda': 10
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
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
                    region_coordinate: [-81.5, 42.0, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Erie Western Basin',
                    region: 'ER',
                    id: 'er-west',
                    sortOrder: 8,
                    threshold: {
                        'total-phosphorus-glenda': 15
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
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
                    region_coordinate: [-83.2, 41.7, 0]
                }
            },
            {
                type: 'Feature',
                properties: {
                    title: 'Lake Ontario',
                    region: 'ON',
                    id: 'on',
                    sortOrder: 9,
                    threshold: {
                        'total-phosphorus-glenda': 10
                    }
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [
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
                    region_coordinate: [-77.8, 43.6, 0]
                }
            }
        ],
        seasons: [
            {
                id: 'spring',
                title: 'Spring'
            },
            {
                id: 'summer',
                title: 'Summer'
            }
        ],
        regions: {
            parameters: [
                {
                    id: 'alkalinity-glenda',
                    title: 'Alkalinity (mg/L)'
                },
                {
                    id: 'ammonia-nitrogen-glenda',
                    title: 'Ammonia-Nitrogen (ug/l)'
                },
                {
                    id: 'ammonium-glenda',
                    title: 'Ammonium (ug/l)'
                },
                {
                    id: 'chloride-glenda',
                    title: 'Chloride (mg/l)'
                },
                {
                    id: 'chlorophyll-a-glenda',
                    title: 'Chlorophyll <i>a</i> (ug/L)'
                },
                {
                    id: 'conductivity-glenda',
                    title: 'Conductivity (umho/cm)'
                },
                {
                    id: 'total-hardness-glenda',
                    title: 'Hardness, Total as CaCO3 (mg/l)'
                },
                {
                    id: 'nitrogen-glenda',
                    title: 'Nitrite-Nitrate (mg/L)'
                },
                {
                    id: 'ph-glenda',
                    title: 'pH'
                },
                {
                    id: 'phosphorus-orthophosphorus-glenda',
                    title: 'Phosphorus, Orthophosphorus as P (ug/l)'
                },
                {
                    id: 'secchi-disc-transparency-glenda',
                    title: 'Secchi Disc Transparency (uS/cm)'
                },
                {
                    id: 'silica-glenda',
                    title: 'Silica (mg/L)'
                },
                {
                    id: 'silica-dissolved-glenda',
                    title: 'Silica, Dissolved as Si (mg/l)'
                },
                {
                    id: 'silica-total-glenda',
                    title: 'Silica, Total (mg/l)'
                },
                {
                    id: 'temperature-glenda',
                    title: 'Temperature (C)'
                },
                {
                    id: 'total-phosphorus-glenda',
                    title: 'Total Phosphorus (ug/L)'
                },
                {
                    id: 'turbidity-glenda',
                    title: 'Turbidity (NTU)'
                },
                {
                    id: 'zooplankton-biomass',
                    title: 'Zooplankton Biovolume Total'
                },
                {
                    id: 'zooplankton-density',
                    title: 'Zooplankton Density Total'
                },
                {
                    id: 'phytoplankton-biovolume',
                    title: 'Phytoplankton Biovolume Total'
                }
            ]
        }
    }
};
