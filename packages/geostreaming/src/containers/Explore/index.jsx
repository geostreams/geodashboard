// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import type { Feature as FeatureType } from 'ol';

import { fetchParameters } from '../../actions/parameters';
import { fetchSensors } from '../../actions/sensors';
import Map from '../Map';
import SensorDetail from '../Sensor/Detail';

import type { MapConfig, ParameterType, SensorType, SourceConfig, SourceType } from '../../utils/flowtype';

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
    }
});

type Props = {
    mapConfig: MapConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    sensors: SensorType[];
    sources: SourceType[];
    parameters: ParameterType[];
    fetchSensors: Function;
    fetchParameters: Function;
    displayOnlineStatus: boolean;
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
        displayOnlineStatus
    } = props;

    React.useEffect(() => {
        if (parameters.length === 0) {
            props.fetchParameters();
        }
    }, []);

    const classes = useStyles();

    const featuresRef = React.useRef<FeatureType[]>([]);

    // idx is the selected feature property. zoom indicated whether the map should zoom the selected feature.
    const [selectedFeature, updateSelectedFeature] = React.useState<?{ idx: number, zoom: boolean; }>();

    const [data, updateData] = React.useState<?Data>();

    const [showSensorDetails, updateShowSensorDetails] = React.useState(false);

    React.useEffect(() => {
        if (!sensors.length) {
            props.fetchSensors();
        } else {
            const newData: Data = {};

            const features = [];

            sensors.forEach((sensor, idx) => {
                const sourceId = sensor.properties.type.id;
                if (!newData[sourceId]) {
                    newData[sourceId] = {
                        sensorCount: 0,
                        regions: {}
                    };
                }
                const sourceAttrs = newData[sourceId];
                sourceAttrs.sensorCount += 1;
                const regionId = sensor.properties.region;
                if (!sourceAttrs.regions[regionId]) {
                    sourceAttrs.regions[regionId] = [];
                }
                const regionSensors = sourceAttrs.regions[regionId];
                regionSensors.push({
                    ...sensor,
                    idx
                });

                const { geometry, ...attrs } = sensor;
                const geom = new Point(geometry.coordinates);
                geom.transform('EPSG:4326', 'EPSG:3857');
                const feature = new Feature({
                    ...attrs,
                    idx,
                    geometry: geom
                });
                features.push(feature);
            });

            featuresRef.current = features;
            updateData(newData);
        }
    }, [sensors]);

    const handleFeatureToggle = (idx: ?number, zoom = false) => {
        updateSelectedFeature(idx || idx === 0 ? { idx, zoom } : undefined);
    };

    const [sourcesVisibility, updateSourcesVisibility] = React.useState<{ [sourceId: string]: boolean; }>({});

    const filterFeatures = (features: FeaturesType[]) => features.filter((feature) => {
        const isVisible = sourcesVisibility[feature.get('properties').type.id];
        if (!isVisible && selectedFeature && selectedFeature.idx === feature.get('idx')) {
            handleFeatureToggle();
        }
        return isVisible;
    });

    return (
        <div className={classes.root}>
            <Sidebar
                data={data}
                sources={sources}
                sourcesConfig={sourcesConfig}
                selectedFeature={selectedFeature}
                toggleRegions={updateSourcesVisibility}
                handlePopupOpen={(idx) => handleFeatureToggle(idx, true)}
                handlePopupClose={() => handleFeatureToggle()}
            />
            <Map
                mapConfig={mapConfig}
                sourcesConfig={sourcesConfig}
                displayOnlineStatus={displayOnlineStatus}
                parameters={parameters}
                sensors={sensors}
                features={filterFeatures(featuresRef.current)}
                selectedFeature={selectedFeature}
                handleFeatureToggle={handleFeatureToggle}
                zoomToSe={undefined}
                openSensorDetails={() => updateShowSensorDetails(true)}
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
    fetchParameters
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explore);
