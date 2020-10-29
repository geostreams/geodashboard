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
        mbclab: {
            label : 'MBC Lab',
            order : 1,
            color : '#a87c03',
            description : 'Data collected by the Midwest Bioenergy Crops Landscape Lab',
            more_info : '',
            link : 'https://arpa-e.energy.gov/technologies/projects/midwest-bioenergy-crop-landscape-laboratory-mbc-lab-capturing-spatio-temporal' 
        }
    }

};
