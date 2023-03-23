// @flow
import React from 'react';
import { scaleLinear } from 'd3';
import { makeStyles } from '@material-ui/core';
import GeoJSON from 'ol/format/GeoJSON';
import GroupLayer from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import ClusterSource from 'ol/source/Cluster';
import ImageWMSSource from 'ol/source/ImageWMS';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style';
import SelectClusterInteraction from 'ol-ext/interaction/SelectCluster';
import AnimatedClusterLayer from 'ol-ext/layer/AnimatedCluster';
import { Map as BaseMap } from '@geostreams/core/src/components/ol';
import Control from '@geostreams/core/src/components/ol/Control';
import ClusterControl from '@geostreams/core/src/components/ol/ClusterControl';
import FitViewControl from '@geostreams/core/src/components/ol/FitViewControl';
import LayersControl from '@geostreams/core/src/components/ol/LayersControl';
import SourcesControl from '@geostreams/core/src/components/ol/SourcesControl';

import { entries } from '@geostreams/core/src/utils/array';

import type { Feature as FeatureType, Map as MapType, MapBrowserEventType } from 'ol';
import type { Layer as LayerType } from 'ol/layer';
import type { MapLayerConfig } from '@geostreams/core/src/utils/flowtype';

import { getSensorName, getSourceColor } from '../../utils/sensors';
import SensorPopup from '../Sensor/Popup';

import type { MapConfig, ParameterType, SensorType, SourceConfig } from '../../utils/flowtype';

const useStyles = makeStyles((theme) => ({
    content: {
        height: '100%',
        flexGrow: 1
    },
    fitViewControl: {
        bottom: '.5em',
        left: '.5em'
    },
    clusterControl: {
        'display': 'flex',
        'justifyContent': 'center',
        'width': 'max-content',
        'bottom': '.5em',
        'right': 0,
        'left': 0,
        'marginLeft': 'auto',
        'marginRight': 'auto',
        'padding': 0,
        'background': 'transparent',
        '&:hover': {
            background: 'transparent'
        },
        '& > label': {
            padding: '0 10px',
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main
        }
    },
    layersControl: {
        top: '.5em',
        right: '.5em'
    },
    sourcesControl:{
        top: '.5em',
        left: '.5em'
    }
}));

interface Props {
    mapConfig: MapConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    displayOnlineStatus: boolean;
    parameters: ParameterType[];
    sensors: SensorType[];
    features: FeatureType[];
    selectedFeature: ?{ idx: number; zoom: boolean; };
    handleFeatureToggle: (feature: ?FeatureType) => void;
    showExploreLayers?: boolean;
    showExploreSources?: boolean;
    additionalLayer: LayerType;
    children: React.Node;
    data:?{
        [sourceId: string]: {
          sensorCount: number,
          regions: {
            [regionId: string]: SensorType[],
          },
        },
      };
  sources:Object;
  toggleRegions: (sourcesVisibility: { [sourceId: string]: boolean }) => void;
  handlePopupOpen: (feature: number) => void;
  handlePopupClose: () => void;
    
}

const getMarker = (fill: string, stroke: string) => encodeURIComponent(
    `<svg width="15" height="25" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer">
        <path d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke="${stroke}" stroke-width="1" fill="white" />
        <ellipse cx="7.5" cy="8.5" rx="4.5" ry="5.5" fill="${fill}" />
    </svg>`
);

const prepareLayers = (
    mapTileURL: string,
    geoserverUrl: string,
    layersConfig: { [group: string]: MapLayerConfig[] } = {},
    showExploreLayers: boolean
): { [layerName: string]: LayerType } => {
    let source = new OSM();
    if(mapTileURL)
        source = new XYZ({
            url: mapTileURL
        });

    const layers = {
        basemaps: new GroupLayer({
            title: 'Base Maps',
            layers: [
                new TileLayer({
                    type: 'base',
                    title: 'OSM',
                    source
                })
            ]
        })
    };
    if(showExploreLayers)
        entries(layersConfig).forEach(([group, groupLayersConfig]) => {
            const groupLayers = [];
            groupLayersConfig.forEach(({
                title,
                id,
                type,
                initialOpacity,
                initialVisibility,
                legend
            }: MapLayerConfig) => {
                let layer;
                if (type === 'wms') {
                    layer = new ImageLayer({
                        source: new ImageWMSSource({
                            url: `${geoserverUrl}/wms`,
                            params: { LAYERS: id },
                            ratio: 1,
                            serverType: 'geoserver'
                        }),
                        opacity: initialOpacity || 0.8,
                        visible: initialVisibility || false
                    });
                    layer.set('title', title);
                    if (legend) {
                        layer.set('legend', `${geoserverUrl}/${legend}`,);
                    }
                }
                if (layer) {
                    if (group) {
                        groupLayers.push(layer);
                    } else {
                        layers[title] = layer;
                    }
                }
            });
            if (group) {
                layers[group] = new GroupLayer({
                    title: group,
                    layers: groupLayers
                });
            }
        });

    return layers;
};

const Map = (props: Props) => {
    const {
        mapConfig,
        sourcesConfig,
        displayOnlineStatus,
        parameters,
        sensors,
        features,
        selectedFeature,
        showExploreLayers,
        showExploreSources,
        additionalLayer: additionalLayerProp,
        children,
        handleFeatureToggle,
        data,
        sources,
        toggleRegions,
        handlePopupClose,
        handlePopupOpen
    } = props;

    const classes = useStyles();

    // Holds an instance of @geostreams/core/ol/Map component
    const mapRef = React.useRef<MapType>();

    const popupContainerRef = React.useRef<?HTMLDivElement>();

    const clusterRef = React.useRef();

    const [isClusterEnabled, toggleCluster] = React.useState(mapConfig.useCluster);

    const [additionalLayer, setAdditionalLayer] = React.useState(additionalLayerProp);

    // This is used to cache map styles
    const mapStylesRef = React.useRef<{ [styleName: string]: Style }>({});

    // Caches the map layers and controls
    const cacheRef = React.useRef<{
        initiated: boolean;
        layers: { [layerName: string]: LayerType; };
        layersControl: Control;
        fitViewControl: Control;
        clusterControl: Control;
    }>({});

    if (!cacheRef.current.initiated) {
        cacheRef.current = {
            initiated: true,
            layers: prepareLayers(mapConfig.mapTileURL, mapConfig.geoserverUrl, mapConfig.layers, showExploreLayers),
            layersControl: new Control({
                className: classes.layersControl
            }),
            sourcesControl: new Control({
                className: classes.sourcesControl
            }),
            fitViewControl: new Control({
                className: classes.fitViewControl
            }),
            clusterControl: new Control({
                className: classes.clusterControl
            })
        };
    }

    React.useEffect(() => {
        const map = mapRef.current;
        if (map) {
            const popupOverlay = map.getOverlayById('popup');
            if (selectedFeature) {
                const feature = features.find(obj => obj.get('idx') === selectedFeature.idx);
                if(feature){
                    const geometry = feature.getGeometry();
                    if (selectedFeature.zoom) {
                        map.getView().fit(
                            geometry.getExtent(),
                            {
                                callback: () => popupOverlay.setPosition(geometry.getCoordinates())
                            }
                        );
                    } else {
                        popupOverlay.setPosition(geometry.getCoordinates());
                    }
                }
            } else {
                popupOverlay.setPosition();
            }
        }
    }, [selectedFeature]);

    React.useEffect(() => {
        // Add cluster resource on mount
        if (mapRef.current) {
            const vectorSource = new VectorSource({
                format: (new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }))
            });

            const { useCluster, clusterDistance } = mapConfig;

            const clusterSource = new ClusterSource({
                distance: useCluster ? clusterDistance : 0,
                source: vectorSource
            });

            const getMarkerColor = (feature) => {
                if (feature.get('features')) {
                    const properties = feature.get('features')[0].get('properties');
                    const fillColor = getSourceColor(sourcesConfig[properties.type.id.toLowerCase()]);
                    let strokeColor = 'black';
                    if (displayOnlineStatus) {
                        if (properties.online_status === 'online') {
                            strokeColor = 'green';
                        }
                        if (properties.online_status === 'offline') {
                            strokeColor = 'red';
                        }
                    }
                    return [fillColor, strokeColor];
                }
                return ['pink', 'pink'];
            };

            const getClusteredStyle = (size) => {
                const radiusScale = scaleLinear().range([10, 20]).domain([0, 300]).clamp(true);

                const styleName = `cluster-${size}`;

                const mapStyles = mapStylesRef.current;
                let style = mapStyles[styleName];
                if (!style) {
                    style = new Style({
                        image: new Circle({
                            radius: radiusScale(size),
                            stroke: new Stroke({
                                color: '#fff'
                            }),
                            fill: new Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff'
                            })
                        })
                    });
                }

                mapStyles[styleName] = style;
                mapStylesRef.current = mapStyles;
                return style;
            };

            const getSelectedStyle = (feature) => {
                const [fillColor, strokeColor] = getMarkerColor(feature);
                const styleName = `cluster-${fillColor}-${strokeColor}`;
                const mapStyles = mapStylesRef.current;
                let style = mapStyles[styleName];
                if (!style) {
                    style = new Style({
                        image: new Icon({
                            src: `data:image/svg+xml;utf-8,${getMarker(fillColor, strokeColor)}`
                        })
                    });
                }

                mapStyles[styleName] = style;
                mapStylesRef.current = mapStyles;
                return style;
            };

            const getStyle = (feature) => {
                // Handled null error when click propagated from non-feature layers
                if(!feature.getKeys().includes('features'))
                    return null;
                const size = feature.get('features').length;

                if (size === 1 || !isClusterEnabled) {
                    return getSelectedStyle(feature);
                }
                return getClusteredStyle(size);
            };

            const clusters = new AnimatedClusterLayer({
                source: clusterSource,
                style: getStyle,
                zIndex: Infinity
            });

            const selectCluster = new SelectClusterInteraction({
                pointRadius: 17,
                animate: true,
                spiral: true,
                // Feature style when it springs apart
                featureStyle: (feature) => {
                    const [fillColor, strokeColor] = getMarkerColor(feature);
                    return new Style({
                        image: new Icon({
                            src: `data:image/svg+xml;utf-8,${getMarker(fillColor, strokeColor)}`
                        }),
                        // Draw a link between points (or not)
                        stroke: new Stroke({
                            color: '#fff',
                            width: 1
                        })
                    });
                },
                // Style to draw cluster when selected
                style: getStyle
            });

            mapRef.current.addLayer(clusters);
            mapRef.current.addInteraction(selectCluster);
            clusterRef.current = clusterSource;
        }
    }, []);

    React.useEffect(() => {
        if(mapRef.current){
            if(additionalLayer){
                mapRef.current.removeLayer(additionalLayer);
            }
            if(additionalLayerProp){
                const layerSource = additionalLayerProp.getSource();

                layerSource.on('addfeature', () => {
                    if(layerSource.getFeatures().length > 0)
                        mapRef.current.getView().fit(layerSource.getExtent(), { duration: 500 });
                });
                mapRef.current.addLayer(additionalLayerProp);
            }
            setAdditionalLayer(additionalLayerProp);
        }
    }, [additionalLayerProp]);

    React.useEffect(() => {
        const cluster = clusterRef.current;
        if (cluster) {
            const source = cluster.getSource();
            source.clear();
            source.addFeatures(features);
            // if(mapRef)
            //     mapRef.current.getView().fit(source.getExtent(), { duration: 500 });
        }
    }, [features]);

    const handleMapClick = (event: MapBrowserEventType) => {
        if (mapRef.current) {
            const featuresAtPixel = mapRef.current.forEachFeatureAtPixel(event.pixel, (featureChange) => featureChange);
            if (featuresAtPixel && featuresAtPixel.attributes && featuresAtPixel.attributes.type === 'single') {
                // Case when a feature is expanded
            } else if (featuresAtPixel && featuresAtPixel.get('features') && featuresAtPixel.get('features').length === 1) {
                // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
                handleFeatureToggle(featuresAtPixel.get('features')[0].get('idx'));
            } else if (featuresAtPixel && featuresAtPixel.get('features') && featuresAtPixel.get('features').length > 1) {
                // Zoom in the clicked cluster it has more than `clusterExpandCountThreshold` features
                // and is in a zoom level lower than `clusterExpandZoomThreshold`
                if (featuresAtPixel.get('features').length > mapConfig.clusterExpandCountThreshold && mapRef.current.getView().getZoom() < mapConfig.clusterExpandZoomThreshold) {
                    mapRef.current.getView().setCenter(featuresAtPixel.get('features')[0].getGeometry().getCoordinates());
                    mapRef.current.getView().animate({ zoom: mapRef.current.getView().getZoom() + 1, duration: 500 });
                }
            }
        }
    };

    const selectedSensor = selectedFeature ? sensors[selectedFeature.idx] : null;

    return (
        <BaseMap
            className={classes.content}
            zoom={mapConfig.zoom}
            center={mapConfig.center}
            minZoom={mapConfig.minZoom}
            maxZoom = {mapConfig.maxZoom}
            controls={[
                cacheRef.current.fitViewControl,
                cacheRef.current.clusterControl,
                cacheRef.current.layersControl
            ]}
            layers={Object.values(cacheRef.current.layers)}
            updateMap={(map) => {
                mapRef.current = map;
                map.getOverlayById('popup').setElement(popupContainerRef.current);
            }}
            events={{
                click: handleMapClick,
                pointermove: (e) => {
                    // Show pointer when over a feature
                    if (!e.dragging) {
                        const pixel = e.map.getEventPixel(e.originalEvent);
                        const hit = e.map.hasFeatureAtPixel(pixel);
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
            {mapConfig.useCluster ?
                <ClusterControl
                    el={cacheRef.current.clusterControl.element}
                    cluster={clusterRef.current}
                    defaultDistance={mapConfig.clusterDistance}
                    toggleCallback={
                        (isClustered) => {
                            const map = mapRef.current;
                            if (map) {
                                toggleCluster(isClustered);
                                map.getView().setZoom(map.getView().getZoom() + 0.001);
                            }
                        }
                    }
                /> : null}
     {showExploreSources ?
                <SourcesControl
                data={data}
                sourcesConfig={sourcesConfig}
                sources={sources}
                selectedFeature={selectedFeature}
                toggleRegions={toggleRegions}
                handlePopupOpen={handlePopupOpen}
                handlePopupClose={handlePopupClose}
                /> :
                null}
            {mapConfig.layers && showExploreLayers ?
                <LayersControl
                    el={cacheRef.current.layersControl.element}
                    layers={cacheRef.current.layers}
                    exclude={['basemaps']}
                /> :
                null}

            <div ref={popupContainerRef}>
                {selectedSensor ?
                    <SensorPopup
                        header={{
                            title: getSensorName(selectedSensor.properties),
                            color: getSourceColor(sourcesConfig[selectedSensor.properties.type.id.toLowerCase()])
                        }}
                        sensor={sensors[selectedFeature.idx]}
                        parameters={parameters}
                        detailsLink={`/explore/detail/location/${encodeURIComponent(selectedSensor.name)}/All/`}
                        handleClose={() => handleFeatureToggle()}
                    /> : null}
            </div>
            {children}
        </BaseMap>
    );
};

Map.defaultProps = {
    showExploreLayers: true,
    showExploreSources: true,
    additionalLayer: undefined
};

export default Map;
