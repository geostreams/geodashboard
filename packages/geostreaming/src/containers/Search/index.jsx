// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Polygon from 'ol/geom/Polygon';
import { Fill, Stroke, Style } from 'ol/style';
import type { Feature as FeatureType } from 'ol';
import DrawControl from '@geostreams/core/src/components/ol/DrawControl';

import Map from '../Map';
import SensorDetail from '../Sensor/Detail';
import { setFilter as setFilterAction, addLocation as addLocationAction } from '../../actions/search';
import { fetchParameters as fetchParametersAction } from '../../actions/parameters';
import { fetchSensors as fetchSensorsAction } from '../../actions/sensors';
import { matchLocation, isLocationInPolygon } from '../../utils/search';


import type { 
    MapConfig, 
    ParameterType, 
    SensorType, 
    SourceConfig, 
    SourceType, 
    LocationType 
} from '../../utils/flowtype';
import Sidebar from './Sidebar';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    sensorDetail: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: '#fff'
    },
    pageLoader: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

type Props = {
    mapConfig: MapConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    sensors: SensorType[];
    sources: SourceType[];
    parameters: ParameterType[];
    locations: LocationType[];
    fetchSensors: Function;
    fetchParameters: Function;
    displayOnlineStatus: boolean;
    filters: [],
    addLocation: Function,
    custom_location: Object
}

const Search = (props: Props) => {
    const {
        mapConfig,
        parameters,
        sensors,
        sourcesConfig,
        locations,
        displayOnlineStatus,
        filters,
        addLocation, 
        custom_location,
        fetchSensors,
        fetchParameters
    } = props;

    const classes = useStyles();



    const [features, setFeatures] = useState<FeatureType[]>([]);
    const [filteredFeatures, setFilteredFeatures] = useState<FeatureType[]>([]);
    // Handles whether draw controls should be visible or not
    const [drawMode, toggleDrawMode] = useState(false);

    // idx is the selected feature property. zoom indicated whether the map should zoom the selected feature.
    const [selectedFeature, updateSelectedFeature] = React.useState();

    const [showSensorDetails, updateShowSensorDetails] = React.useState(false);

    const [locationPolygonSource, setLocationPolygonSource] = React.useState(new VectorSource);



    React.useEffect(() => {
        if (parameters.length === 0) {
            fetchParameters();
        }
    }, []);

    // Converts sensors to openlayers features whenever sensors props are updated
    // Stores features in state
    useEffect(() => {
        if (!sensors.length) {
            fetchSensors();
        } else {
            const newFeatures: FeatureType[] = [];
            sensors.forEach((sensor, idx) => {
                const { geometry, ...attrs } = sensor;
                const geom = new Point(geometry.coordinates);
                geom.transform('EPSG:4326', 'EPSG:3857');
                const feature = new Feature({
                    ...attrs,
                    idx,
                    geometry: geom,
                    coordinates: geometry.coordinates
                });
                newFeatures.push(feature);
            });

            setFeatures(newFeatures);
            setFilteredFeatures(newFeatures);
        }
    }, [sensors]);

    const addPolygonToSource = (polygon, source, projection = 'EPSG:3857') => {
        source.clear();
        const geom = new Polygon(polygon.coordinates);
        if(projection !== 'EPSG:3857'){
            geom.transform(projection, 'EPSG:3857');
        }
        const feature = new Feature({
            geometry: geom
        });
        source.addFeature(feature);
    };


    // UseEffect hook containing all filtering Logic
    useEffect(()=> {
        let updatedFeatures = features;
        // Location filter
        if(filters.locations.length > 0){
            if(filters.locations[0] === 'custom_location'){
                if(custom_location && 'geometry' in custom_location){
                    updatedFeatures = updatedFeatures.filter((feature) =>
                        isLocationInPolygon(feature.getGeometry().getCoordinates(), custom_location));
                    addPolygonToSource(custom_location.geometry, locationPolygonSource, 'EPSG:3857');
                }
            } else{
                updatedFeatures = updatedFeatures.filter((feature => 
                    matchLocation(filters.locations[0], feature.get('properties').region, locations, feature.get('coordinates'))));
                addPolygonToSource(locations.find(location => 
                    location.properties.id === filters.locations[0]).geometry, locationPolygonSource, 'EPSG:4326');
            }
        } else{
            locationPolygonSource.clear();
        }
        // Parameters filter
        if(filters.parameters.length > 0){
            updatedFeatures = updatedFeatures.filter((feature) => feature.get('parameters').some(param => filters.parameters.includes(param)));
        }
        // Sources Filter
        if(filters.sources.length > 0){
            updatedFeatures = updatedFeatures.filter((feature) => filters.sources.includes(feature.get('properties').type.id));
        }
        // Time filter
        if(filters.time.length > 0){
            updatedFeatures = updatedFeatures.filter((feature) => 
                new Date(feature.get('min_start_time')) >= filters.time[0] &&
                    new Date(feature.get('max_end_time')) <= filters.time[1]);
        }

        setFilteredFeatures(updatedFeatures);
    }, [filters, custom_location]);



    const handleFeatureToggle = (idx: ?number, zoom = false) => {
        updateSelectedFeature(idx || idx === 0 ? { idx, zoom } : undefined);
    };

    // Set minimum and maximum dates for filter selection based on
    // recieved sensors data
    const getMinMaxDates = () => {
        if(sensors.length > 0)
            return sensors.reduce((dates, { min_start_time, max_end_time }) => {
                dates[0] = 
            (dates[0] === undefined || new Date(min_start_time) < dates[0]) ? 
                new Date(min_start_time) : dates[0];
                dates[1] = 
            (dates[1] === undefined || new Date(max_end_time) > dates[1]) ? 
                new Date(max_end_time) : dates[1];
                return dates;
            }, []);
        return [new Date(1970,1), new Date()];
    };

    const getCustomLayer = () => {
        const layer = new VectorLayer({
            id: 'locationPolygon',
            source: locationPolygonSource,
            style: [
                new Style({
                    stroke: new Stroke({
                        color: 'rgba(0, 152, 254, 1)',
                        width: 2
                    }),
                    fill: new Fill({
                        color: 'rgba(254, 254, 254, 0.3)'
                    })
                })
            ]
        });
        return layer;
    };

 

    if(!sensors.length || !parameters.length)
        return (<div className={classes.pageLoader}><CircularProgress thickness={5} size={100} /></div>);
    return (
        <div className={classes.root}>
            <Sidebar
                sensorCount={filteredFeatures.length}
                toggleDrawMode={toggleDrawMode}
                drawMode={drawMode}
                minMaxDates={getMinMaxDates()}
            />
            <Map
                mapConfig={mapConfig}
                sourcesConfig={sourcesConfig}
                displayOnlineStatus={displayOnlineStatus}
                parameters={parameters}
                sensors={sensors}
                features={filteredFeatures}
                selectedFeature={selectedFeature}
                handleFeatureToggle={handleFeatureToggle}
                openSensorDetails={() => updateShowSensorDetails(true)}
                showExploreLayers= {false}
                additionalLayer={getCustomLayer()}
            >
                <DrawControl
                    enabled={drawMode}
                    toggleDrawMode={toggleDrawMode}
                    onStoreShape={addLocation}
                />
            </Map>

            {showSensorDetails ?
                <div className={classes.sensorDetail}>
                    <SensorDetail handleClose={() => updateShowSensorDetails(false)} />
                </div> :
                null}
        </div>
    );
};

const mapStateToProps = (state) => ({
    mapConfig: state.config.map,
    sourcesConfig: state.config.source,
    locations: state.config.locations,
    filters: state.search.filters,
    custom_location: state.search.custom_location,
    displayOnlineStatus: state.config.sensors.displayOnlineStatus,
    sensors: state.__new_sensors.sensors.sort(
        (sensor1, sensor2) =>
            parseInt(sensor1.name, 10) > parseInt(sensor2.name, 10)
    ),
    sources: state.__new_sensors.sources,
    parameters: state.__new_parameters.parameters
});

const mapDispatchToProps = {
    fetchSensors: fetchSensorsAction,
    fetchParameters: fetchParametersAction,
    addLocation: addLocationAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
