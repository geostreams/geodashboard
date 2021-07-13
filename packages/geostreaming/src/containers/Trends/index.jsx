// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { IconButton, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Feature from 'ol/Feature';
import { getCenter } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import GroupLayer from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Style, Fill, Stroke, Icon } from 'ol/style';

import { BaseControlPortal, Map as BaseMap } from '@geostreams/core/src/components/ol';
import Control from '@geostreams/core/src/components/ol/Control';
import FitViewControl from '@geostreams/core/src/components/ol/FitViewControl';

import type { Match } from '@geostreams/core/src/utils/flowtype';
import type { Map as MapType, MapBrowserEventType } from 'ol';
import type { Layer as LayerType } from 'ol/layer';

import SensorPopup from '../Sensor/Popup';

import trendIcons from './icons';
import LegendInfo from './LegendInfo';
import Sidebar from './Sidebar';
import { getTrendValues } from './utils';

import type { SensorType, TrendsConfig, TrendRegionBoundary, TrendValues, ParameterType } from '../../utils/flowtype';

const LEGENDS = [
    {
        title: 'Trending Up',
        icon: { name: 'up', style: { marginLeft: '1em' } }
    },
    {
        title: 'Trending Down',
        icon: { name: 'down', style: { marginLeft: '1em' } }
    },
    {
        title: 'No Data Available',
        icon: { name: 'noData', style: { marginLeft: '1em' } }
    },
    {
        title: 'Over Threshold',
        icon: { name: 'overThresholdUpDown', style: {} }
    }
];

const TREND_STYLES = {
    noData: new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${trendIcons.noData}`
        })
    }),
    up: new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${trendIcons.up}`
        })
    }),
    down: new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${trendIcons.down}`
        })
    }),
    overThresholdUp: new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${trendIcons.overThresholdUp}`
        })
    }),
    overThresholdDown: new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${trendIcons.overThresholdDown}`
        })
    })
};

const prepareLayers = (category: 'regions' | 'stations', boundaries: TrendRegionBoundary[]): { [layerName: string]: LayerType } => {
    const layers = {
        basemap: new GroupLayer({
            title: 'Base Maps',
            layers: [
                new TileLayer({
                    type: 'base',
                    title: 'OSM',
                    source: new OSM()
                })
            ]
        })
    };

    if (category === 'regions') {
        const centerPoints = [];

        boundaries.forEach((boundary: TrendRegionBoundary) => {
            const source = new VectorSource({
                features: new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }).readFeatures(boundary)
            });

            const center = new Feature({ geometry: new Point(getCenter(source.getExtent())) });
            center.setProperties(boundary.properties);
            centerPoints.push(center);

            layers[boundary.properties.id] = new VectorLayer({
                source,
                style: new Style({
                    stroke: new Stroke({
                        color: 'rgba(0, 152, 254, 1)',
                        width: 2
                    }),
                    fill: new Fill({
                        color: 'rgba(254, 254, 254, 0.3)'
                    })
                })
            });
        });

        const centersSource = new VectorSource({
            format: new GeoJSON()
        });
        centersSource.addFeatures(centerPoints);
        layers.centers = new VectorLayer({
            source: centersSource,
            style: TREND_STYLES.noData
        });
        layers.centers.setProperties({ interactive: true }, false);
    }

    return layers;
};

const useStyles = makeStyles({
    content: {
        height: '100%',
        flexGrow: 1
    },
    fitViewControl: {
        bottom: '.5em',
        left: '.5em'
    },
    legendControl: {
        top: '0.5em',
        right: '0.5em',
        background: '#fff',
        border: '2px solid #aaa'
    },
    legendInfoButton: {
        position: 'absolute',
        right: 0,
        background: 'transparent !important',
        color: 'black !important',
        zIndex: 2
    },
    legendItem: {
        paddingTop: 0,
        paddingBottom: 0
    },
    trendUpIcon: {
        display: 'inline-block',
        borderBottom: '1em solid',
        borderRight: '0.5em solid transparent !important',
        borderLeft: '0.5em solid transparent !important'
    },
    trendDownIcon: {
        display: 'inline-block',
        borderTop: '1em solid',
        borderRight: '0.5em solid transparent !important',
        borderLeft: '0.5em solid transparent !important'
    },
    noDataIcon: {
        width: '1em',
        height: '1em',
        borderRadius: '50%',
        display: 'inline-block'
    },
    sidebar: {
        height: '100%',
        overflowY: 'auto'
    }
});

type Props = {
    dispatch: (action: any) => void;
    match: Match;
    geostreamingEndpoint: string;
    trendsConfig: TrendsConfig;
    sensors: SensorType[];
    parameters: ParameterType[];
};

const Trends = (props: Props) => {
    const classes = useStyles();

    const {
        dispatch,
        match,
        geostreamingEndpoint,
        trendsConfig: {
            map: mapConfig,
            boundaries,
            seasons,
            regions
        },
        sensors,
        parameters
    } = props;

    // Holds an instance of @geostreams/core/ol/Map component
    const mapRef = React.useRef<MapType>();

    const popupContainerRef = React.useRef<?HTMLDivElement>();

    // Caches the map layers and controls
    const cacheRef = React.useRef<{
        fitViewControl: Control;
        legendControl: Control;
        layers: { [layerName: string]: LayerType; };
    }>({
        fitViewControl: new Control({
            className: classes.fitViewControl
        }),
        legendControl: new Control({
            className: classes.legendControl
        }),
        layers: prepareLayers(match.params.category, boundaries)
    });

    React.useEffect(() => {
        if (sensors.length && match.params.category === 'stations') {
            const features = sensors.map((sensor) => {
                const { geometry, ...attrs } = sensor;
                const geom = new Point(geometry.coordinates);
                geom.transform('EPSG:4326', 'EPSG:3857');
                return new Feature({
                    ...attrs,
                    geometry: geom
                });
            });

            const centersSource = cacheRef.current.layers.centers.getSource();
            centersSource.clear();
            centersSource.addFeatures(features);
        }
    }, [sensors]);

    const [selectedFeature, updateSelectedFeature] = React.useState();
    React.useEffect(() => {
        const map = mapRef.current;
        if (map) {
            const popupOverlay = map.getOverlayById('popup');
            if (selectedFeature) {
                const geometry = selectedFeature.getGeometry();
                popupOverlay.setPosition(geometry.getCoordinates());
            } else {
                popupOverlay.setPosition();
            }
        }
    }, [selectedFeature]);

    const [openLegendInfo, toggleLegendInfo] = React.useState(false);

    const [selectedSeason, updateSelectedSeason] = React.useState(seasons[0]?.id);
    const [selectedParameter, updateSelectedParameter] = React.useState('');

    const trends = React.useRef<{ [parameter: string]: { [season: string]: TrendValues[]} }>({});
    const [selectedFeatureTrends, updateSelectedFeatureTrends] = React.useState({});

    const updateTrends = (trendsValues: { [region: string]: TrendValues }) => {
        cacheRef.current.layers.centers.getSource().getFeatures().forEach((feature) => {
            feature.setStyle((f) => {
                const properties: TrendRegionBoundary.properties = f.getProperties();
                const regionId = properties.id;
                return TREND_STYLES[trendsValues[regionId]?.trend || 'noData'];
            });
        });

        if (selectedFeature) {
            updateSelectedFeatureTrends(
                trends.current[selectedParameter][selectedSeason][selectedFeature.getProperties().id] || {}
            );
        }
    };

    React.useEffect(() => {
        if (selectedParameter) {
            if (!(selectedParameter in trends.current && selectedSeason in trends.current[selectedParameter])) {
                getTrendValues(
                    geostreamingEndpoint,
                    selectedParameter,
                    selectedSeason,
                    boundaries,
                    (trendsValues) => {
                        if (trends.current[selectedParameter]) {
                            trends.current[selectedParameter][selectedSeason] = trendsValues;
                        } else {
                            trends.current[selectedParameter] = {
                                [selectedSeason]: trendsValues
                            };
                        }
                        updateTrends(trends.current[selectedParameter][selectedSeason]);
                    },
                    dispatch
                );
            } else {
                updateTrends(trends.current[selectedParameter][selectedSeason]);
            }
        }
    }, [selectedSeason, selectedParameter, selectedFeature]);

    const popupProps = {};
    switch (match.params.category) {
        case 'regions':
            if (selectedFeature) {
                const featureProperties = selectedFeature.getProperties();
                popupProps.header = {
                    title: featureProperties.title,
                    color: '#0D71BA'
                };
                if (selectedParameter && selectedSeason) {
                    popupProps.detailsLink = `/trends/regions/${featureProperties.id}/${selectedParameter}/${selectedSeason}`;
                }
            }
            break;
        case 'stations':
            // TODO
            break;
    }

    return (
        <>
            <Grid container className="fillContainer">
                <Grid className={classes.sidebar} container item xs={3}>
                    <Sidebar
                        seasons={seasons}
                        parameters={regions.parameters}
                        selectedSeason={selectedSeason}
                        selectedParameter={selectedParameter}
                        updateSelectedSeason={updateSelectedSeason}
                        updateSelectedParameter={updateSelectedParameter}
                    />
                </Grid>
                <Grid container item xs={9}>
                    <BaseMap
                        className={classes.content}
                        zoom={mapConfig.zoom}
                        center={mapConfig.center}
                        controls={[cacheRef.current.fitViewControl, cacheRef.current.legendControl]}
                        layers={Object.values(cacheRef.current.layers)}
                        updateMap={(map) => {
                            mapRef.current = map;
                            map.getOverlayById('popup').setElement(popupContainerRef.current);
                        }}
                        events={{
                            click: (e: MapBrowserEventType) => {
                                const featureAtPixel = e.map.forEachFeatureAtPixel(
                                    e.pixel,
                                    (featureChange) => featureChange,
                                    {
                                        layerFilter: (layer: LayerType) => !!layer.getProperties().interactive
                                    }
                                );
                                updateSelectedFeature(featureAtPixel);
                            },
                            pointermove: (e: MapBrowserEventType) => {
                                // Show pointer when over a feature
                                if (!e.dragging) {
                                    const pixel = e.map.getEventPixel(e.originalEvent);
                                    const hit = e.map.hasFeatureAtPixel(
                                        pixel,
                                        {
                                            layerFilter: (layer: LayerType) => !!layer.getProperties().interactive
                                        }
                                    );
                                    e.map.getTarget().style.cursor = hit ? 'pointer' : '';
                                }
                            }
                        }}
                    >
                        <FitViewControl
                            el={cacheRef.current.fitViewControl.element}
                            center={mapConfig.center}
                            zoom={mapConfig.zoom}
                        />
                        <BaseControlPortal el={cacheRef.current.legendControl.element}>
                            <IconButton
                                className={classes.legendInfoButton}
                                onClick={() => toggleLegendInfo(true)}
                            >
                                <InfoOutlinedIcon />
                            </IconButton>
                            <List disablePadding>
                                {LEGENDS.map(({ title, icon }) => (
                                    <ListItem
                                        key={title}
                                        classes={{
                                            root: classes.legendItem
                                        }}
                                    >
                                        <img
                                            src={`data:image/svg+xml;utf-8,${trendIcons[icon.name]}`}
                                            alt={icon.name}
                                            style={icon.style}
                                        />
                                        &nbsp;-&nbsp;
                                        <ListItemText primary={title} />
                                    </ListItem>
                                ))}
                            </List>
                        </BaseControlPortal>

                        <div ref={popupContainerRef}>
                            {selectedFeature ?
                                <SensorPopup
                                    header={popupProps.header}
                                    sensor={sensors[selectedFeature.idx]}
                                    parameters={[]}
                                    selectedTrendParameter={
                                        parameters.find(({ name }) => name === selectedParameter) || {}
                                    }
                                    trends={selectedFeatureTrends}
                                    detailsLink={popupProps.detailsLink}
                                    handleClose={() => updateSelectedFeature()}
                                /> : null}
                        </div>
                    </BaseMap>
                </Grid>
            </Grid>
            <LegendInfo open={openLegendInfo} closeDialog={() => toggleLegendInfo(false)} />
        </>
    );
};

const mapStateToProps = (state) => ({
    geostreamingEndpoint: state.config.geostreamingEndpoint,
    trendsConfig: state.config.trends,
    sensors: state.__new_sensors.sensors.sort(
        (sensor1, sensor2) =>
            parseInt(sensor1.name, 10) - parseInt(sensor2.name, 10)
    ),
    parameters: state.__new_parameters.parameters
});

export default connect(mapStateToProps)(Trends);
