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

import Dialog from "../../components/Dialog";

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
    filterSources:boolean;
    defaultDisableCluster:boolean;
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
        filterSources,
        defaultDisableCluster,
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

	const [openFirstLoadDialog, setOpenFirstLoadDialog] = React.useState(true);

    // Dialog for first load of Explore page - GLTG only

    const exploreDialog = (
        <Dialog
            open={openFirstLoadDialog}
            onClose={() => setOpenFirstLoadDialog(false)}
            title="Explore Data Dashboard"
            cookieId="explore-dialog"
        >
            <h2>We present nutrient and water quality data from:</h2>
      <ol>
        <li>
          <strong>Water Quality Portal (WQP):</strong> The Water Quality Portal (WQP) is 
          the premiere source of discrete water-quality data in the United States and includes 
          publicly available water-quality data from the United States Geological Survey (USGS), 
          the Environmental Protection Agency (EPA), and over 400 state, federal, tribal, and 
          local agencies. We have done the work of distilling the nitrogen and phosphorus data 
          for you so that you may more easily conduct your own analyses. The data is updated 
          once a year.
        </li>
        <li>
          <strong>USGS:</strong> This data provides multiple parameters of water quality such 
          as dissolved oxygen, turbidity, water temperature, nutrient data, and more.
        </li>
        <li>
          <strong>USGS Super Gage Network:</strong> 
          <a href="https://www.usgs.gov/centers/oki-water/science/super-gage-network">
            https://www.usgs.gov/centers/oki-water/science/super-gage-network
          </a>
        </li>
        <li>
          <strong>Upper Mississippi River Restoration (UMMRR):</strong>
          <a href="https://www.umesc.usgs.gov/data_library/water_quality/water_quality_page.html">
            https://www.umesc.usgs.gov/data_library/water_quality/water_quality_page.html
          </a>
        </li>
        <li>
          <strong>Fox River Study Group:</strong> The Fox River Study Group is a diverse 
          coalition of stakeholders using science to guide the region toward a cleaner, safer 
          and more beautiful Fox River. They have data accessible at:
          <br />
          <a href="https://waterdata.usgs.gov/monitoring-location/05549500/#parameterCode=00065&period=P7D&showMedian=false">
            https://waterdata.usgs.gov/monitoring-location/05549500/#parameterCode=00065&period=P7D&showMedian=false
          </a>
          <br />
          <a href="http://ilrdss.sws.uiuc.edu/fox/">
            http://ilrdss.sws.uiuc.edu/fox/
          </a>
        </li>
      </ol>
            </Dialog>
    );

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
         {exploreDialog}
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
                data={data}
                sources={sources}
                filterSources={filterSources}
                defaultDisableCluster={defaultDisableCluster}
                toggleRegions={updateSourcesVisibility}
                handlePopupOpen={(idx) => handleFeatureToggle(idx, true)}
                handlePopupClose={() => handleFeatureToggle()}
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
    filterSources:state.config.filterSources,
    defaultDisableCluster:state.config.defaultDisableCluster,
    displayOnlineStatus: state.config.sensors.displayOnlineStatus,
    sensors: state.__new_sensors.sensors.sort(
        (sensor1, sensor2) =>
            parseInt(sensor1.name, 10) - parseInt(sensor2.name, 10)
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
