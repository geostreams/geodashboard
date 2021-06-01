// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import type { Feature as FeatureType } from 'ol';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchParameters } from '../../actions/parameters';
import { fetchSensors } from '../../actions/sensors';
import Map from '../Map';
import SensorDetail from '../Sensor/Detail';
import { matchLocation } from '../../utils/sensors';
import { setFilter as setFilterAction } from '../../actions/search';

import type { MapConfig, ParameterType, SensorType, SourceConfig, SourceType, LocationType } from '../../utils/flowtype';

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
    setFilter: Function;
    displayOnlineStatus: boolean;
    filters: []
}

type Data = {
    [sourceId: string]: {
        sensorCount: number;
        regions: {
            [regionId: string]: SensorType[];
        };
    };
}

const Explore = (props: Props) => {
    const {
        mapConfig,
        parameters,
        sensors,
        sources,
        sourcesConfig,
        locations,
        displayOnlineStatus,
        filters,
        setFilter
    } = props;

    React.useEffect(() => {
        if (parameters.length === 0) {
            props.fetchParameters();
        }
    }, []);

    const classes = useStyles();

    const [features, setFeatures] = useState<FeatureType[]>([]);
    const [filteredFeatures, setFilteredFeatures] = useState<FeatureType[]>([]);
    const [drawMode, toggleDrawMode] = useState(false);

    // idx is the selected feature property. zoom indicated whether the map should zoom the selected feature.
    const [selectedFeature, updateSelectedFeature] = React.useState<?{ idx: number, zoom: boolean; }>();

    const [showSensorDetails, updateShowSensorDetails] = React.useState(false);
    useEffect(() => {
        if (!sensors.length) {
            props.fetchSensors();
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

            const defaultDates = sensors.reduce((dates, { min_start_time, max_end_time }) => {
                dates[0] = 
            (dates[0] === undefined || new Date(min_start_time) < dates[0]) ? 
                new Date(min_start_time) : dates[0];
                dates[1] = 
            (dates[1] === undefined || new Date(max_end_time) > dates[1]) ? 
                new Date(max_end_time) : dates[1];
                return dates;
            }, []);
            setFilter('time', defaultDates);
            setFeatures(newFeatures);
            setFilteredFeatures(newFeatures);


        }
    }, [sensors]);



    useEffect(()=> {
        let updatedFeatures = features;
        if(filters.parameters.length > 0){
            updatedFeatures = updatedFeatures.filter((feature) => feature.get('parameters').some(param => filters.parameters.includes(param)));
        }
        if(filters.sources.length > 0){
            updatedFeatures = updatedFeatures.filter((feature) => filters.sources.includes(feature.get('properties').type.id));
        }
        // if(filters.time.length > 0){
        //     updatedFeatures = updatedFeatures.filter((feature) => 
        //         new Date(feature.get('min_start_time')) >= filters.time[0] &&
        //             new Date(feature.get('max_end_time')) <= filters.time[1]);
        // }
        if(filters.locations.length > 0){
            if(filters.locations[0] === 'custom')
                toggleDrawMode(true);
            else
                updatedFeatures = updatedFeatures.filter((feature => 
                    matchLocation(filters.locations[0], feature.get('properties').region, locations, feature.get('coordinates'))
                ));
        }

        setFilteredFeatures(updatedFeatures);
    }, [filters]);

    const handleFeatureToggle = (idx: ?number, zoom = false) => {
        updateSelectedFeature(idx || idx === 0 ? { idx, zoom } : undefined);
    };

    const onStoreShape = (coord) => {
        console.log(coord);
    };

    if(!sensors.length || !parameters.length)
        return (<div className={classes.pageLoader}><CircularProgress thickness={5} size={100} /></div>);
    return (
        <div className={classes.root}>
            <Sidebar
                parameters={parameters}
                sensors={sensors}
                sources={sources}
                locations = {locations}
                sourcesConfig={sourcesConfig}
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
                openSenorDetails={() => updateShowSensorDetails(true)}
                showLayers= {false}
                drawMode={drawMode}
                drawControlProps={{ toggleDrawMode, onStoreShape }}

            />

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
    filters: state.__new_searchFilters.filters,
    displayOnlineStatus: state.config.sensors.displayOnlineStatus,
    sensors: state.__new_sensors.sensors.sort(
        (sensor1, sensor2) =>
            parseInt(sensor1.name, 10) > parseInt(sensor2.name, 10)
    ),
    sources: state.__new_sensors.sources,
    parameters: state.__new_parameters.parameters
});

const mapDispatchToProps = {
    fetchSensors,
    fetchParameters,
    setFilter: setFilterAction
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore);
