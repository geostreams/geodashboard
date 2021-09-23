export default{
    map: {
        geoserverUrl: process.env.GEOSERVER_URL,
        zoom: 5.5,
        center: [-9972968, 4972295],
        useCluster: true,
        clusterDistance: 45,
        clusterExpandCountThreshold: 10,
        clusterExpandZoomThreshold: 12,
        layers: {
        }
    },
    geostreamingEndpoint: process.env.GEOSTREAMS_URL,
    sensors: {
        maxDisplayParameters: 10,
        displayOnlineStatus: true
    },
    source: {
        name: {
            label: '',
            order: 0,
            color: '',
            description: '',
            more_info: '',
            link : '',
            useSeasonFilter: true || false
        }
    },
    locations: []
};