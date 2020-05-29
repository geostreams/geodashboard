// @flow
import * as React from 'react';
import { format } from 'd3';
import {
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    withStyles
} from '@material-ui/core';
import DownTrendIcon from '@material-ui/icons/ArrowDropDown';
import UpTrendIcon from '@material-ui/icons/ArrowDropUp';
import FlatTrendIcon from '@material-ui/icons/FiberManualRecord';
import Control from 'gd-core/src/components/ol/Control';
import { createEmpty as createEmptyExtent, extend as extentExtent } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import GroupLayer from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import ImageWMSSource from 'ol/source/ImageWMS';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { decode } from 'geobuf';
import Pbf from 'pbf';
import { Map, BaseControlPortal } from 'gd-core/src/components/ol';
import { entries } from 'gd-core/src/utils/array';
import { SLRSlope } from 'gd-core/src/utils/math';

import type {
    Feature as FeatureType,
    Map as MapType,
    MapBrowserEventType
} from 'ol';
import type { Layer as LayerType } from 'ol/layer';

import annualYieldData from '../../data/annual_yield.json';
import overallData from '../../data/overall_data.json';
import { HEADERS_HEIGHT } from '../Layout/Header';

import Sidebar from './Sidebar';
import {
    MAP_BOUNDS,
    BOUNDARIES,
    getOverallFeatureLabels,
    getFeatureStyle
} from './config';

const styles = {
    main: {
        height: `calc(100% - ${HEADERS_HEIGHT}px)`
    },
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    sidebar: {
        height: '100%',
        overflowY: 'auto'
    },
    fillContainer: {
        width: '100%',
        height: '100%'
    },
    trendIcon: {
        'fontSize': 18,
        '&.red': {
            color: '#ff0000'
        },
        '&.blue': {
            color: '#1e90ff'
        },
        '&.black': {
            color: '#000'
        }
    },
    boundaryInfoControl: {
        top: '0.5em',
        left: '3em',
        background: '#fff',
        height: 75,
        border: '2px solid #aaa',
        paddingTop: 10
    },
    legendControl: {
        top: '0.5em',
        right: '0.5em',
        background: '#fff',
        border: '2px solid #aaa'
    },
    legendItem: {
        padding: '0 8px'
    },
    legendItemIcon: {
        minWidth: 25
    }
};

type Props = {
    classes: {
        main: string;
        mainContainer: string;
        sidebar: string;
        fillContainer: string;
        trendIcon: string;
        boundaryInfoControl: string;
        legendControl: string;
        legendItem: string;
        legendItemIcon: string;
    }
}

type State = {
    boundary: string;
    featureId: string | null;
    regionLabel: string | null;
    selectedFeature: FeatureType | null;
    year: number;
    nutrient: string;
}

class Home extends React.Component<Props, State> {
    map: MapType;

    boundaryInfoControl: Control;

    legendControl: Control;

    layers: {
        [key: string]: LayerType
    };

    legends: Array<{
        title: string;
        url: string;
    }>;

    constructor(props) {
        super(props);

        const [regionLabel, featureId] = getOverallFeatureLabels('drainage');
        this.state = {
            boundary: 'drainage',
            featureId,
            regionLabel,
            selectedFeature: null,
            year: 2017,
            nutrient: 'Nitrogen'
        };

        this.boundaryInfoControl = new Control({
            className: this.props.classes.boundaryInfoControl
        });

        this.legendControl = new Control({
            className: this.props.classes.legendControl
        });

        const geoJSONFormat = new GeoJSON({
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });

        this.legends = [];

        this.layers = {
            basemaps: new GroupLayer({
                title: 'Base Maps',
                layers: [
                    new TileLayer({
                        type: 'base',
                        visible: true,
                        title: 'Carto',
                        source: new XYZ({
                            url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
                            attributions: [
                                '&#169; <a href="https://www.carto.com">Carto</a>,',
                                OSM_ATTRIBUTION
                            ]
                        })
                    }),
                    new TileLayer({
                        type: 'base',
                        visible: false,
                        title: 'OSM',
                        source: new OSM()
                    })
                ]
            }),
            contextual: new GroupLayer({
                title: 'Layers',
                layers: [
                    { title: 'Rivers', id: 'gltg:us-rivers' },
                    { title: 'State Boundaries', id: 'gltg:us-states' }
                ].map(({ title, id }) => {
                    const source = new ImageWMSSource({
                        url: 'https://greatlakestogulf.org/geoserver/wms',
                        params: { LAYERS: id },
                        ratio: 1,
                        serverType: 'geoserver'
                    });
                    this.legends.push({
                        title,
                        url: source.getLegendUrl()
                    });
                    return new ImageLayer({
                        title,
                        source,
                        visible: true
                    });
                })
            }),
            ...entries(BOUNDARIES).reduce(
                (boundaryLayers, [name, { visible, layers }], idx) => {
                    const group = new GroupLayer({
                        layers: layers.map(({ url, style, interactive = false }) => {
                            const source = new VectorSource({
                                loader: (extent) => {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open('GET', url);
                                    xhr.responseType = 'arraybuffer';
                                    const onError = () => {
                                        source.removeLoadedExtent(extent);
                                    };
                                    xhr.onerror = onError;
                                    xhr.onload = () => {
                                        if (xhr.status === 200) {
                                            const geojson = decode(new Pbf(xhr.response));
                                            source.addFeatures(geoJSONFormat.readFeatures(geojson));
                                        } else {
                                            onError();
                                        }
                                    };
                                    xhr.send();
                                },
                                useSpatialIndex: true,
                                format: geoJSONFormat
                            });
                            const layer = new VectorLayer({
                                source,
                                name,
                                style: (feature, resolution) => {
                                    const { nutrient, year } = this.state;
                                    return style(feature, resolution, nutrient, year);
                                }
                            });
                            layer.set('interactive', interactive);
                            layer.set('idx', idx + 1);  // this arbitrary id is used in click the event to associate features within a group. It starts from 1 to make it a truthy value.
                            source.on(
                                'change',
                                () => {
                                    if (!group.isReady && source.getState() === 'ready') {
                                        group.isReady = true;
                                        group.setVisible(visible);
                                    }
                                }
                            );
                            return layer;
                        })
                    });
                    boundaryLayers[name] = group;
                    return boundaryLayers;
                },
                {}
            )
        };
    }

    updateMap = (map) => {
        this.map = map;

        // change cursor when mouse is over interactive layers
        this.map.on('pointermove', (e) => {
            const pixel = map.getEventPixel(e.originalEvent);
            const feature = map.forEachFeatureAtPixel(pixel, (_, layer) => {
                return layer.get('interactive');
            });
            map.getTarget().style.cursor = feature ? 'pointer' : '';
        });
    };

    handleBoundaryChange = (boundary) => {
        const { selectedFeature } = this.state;
        if (selectedFeature) {
            const { nutrient, year } = this.state;
            selectedFeature.setStyle(
                getFeatureStyle(
                    selectedFeature,
                    null,
                    nutrient,
                    year,
                    false
                )
            );
        }
        this.layers[this.state.boundary].setVisible(false);

        this.layers[boundary].setVisible(true);

        const extent = createEmptyExtent();
        this.layers[boundary].getLayers().forEach((layer) => {
            extentExtent(extent, layer.getSource().getExtent());
        });
        this.map.getView().fit(extent);

        const [regionLabel, featureId] = getOverallFeatureLabels(boundary);
        this.setState({ boundary, featureId, regionLabel, selectedFeature: null });
    };

    handleVariableChange = (value, variable) => {
        this.setState(
            { [variable]: value },
            () => {
                this.layers[this.state.boundary].getLayers().forEach((layer) => layer.changed());
                const { selectedFeature } = this.state;
                if (selectedFeature) {
                    const { nutrient, year } = this.state;
                    selectedFeature.setStyle(
                        getFeatureStyle(
                            selectedFeature,
                            null,
                            nutrient,
                            year,
                            true
                        )
                    );
                }
            }
        );
    };

    handleMapClick = (event: MapBrowserEventType) => {
        const {
            featureId: previousFeatureId,
            selectedFeature: previousFeature
        } = this.state;

        const clickedLayerId = event.map.forEachFeatureAtPixel(
            event.pixel,
            (feature, layer) => {
                if (layer.get('interactive')) {
                    return layer.get('idx');
                }
                return false;
            }
        );
        const selectedFeature = event.map.forEachFeatureAtPixel(
            event.pixel,
            (feature, layer) => {
                if (layer.get('idx') === clickedLayerId && feature.getGeometry().getType().indexOf('Polygon') > -1) {
                    return feature;
                }
                return false;
            },
            {
                hitTolerance: 10
            }
        );

        if (selectedFeature) {
            const { boundary, nutrient, year } = this.state;
            const [regionLabel, overallFeatureId] = getOverallFeatureLabels(boundary);
            if (previousFeatureId !== overallFeatureId && previousFeature) {
                previousFeature.setStyle(
                    getFeatureStyle(
                        previousFeature,
                        null,
                        nutrient,
                        year,
                        false
                    )
                );
            }

            const featureId = selectedFeature.get('Name') || selectedFeature.get('Station_ID');
            if (featureId !== previousFeatureId) {
                // Feature is selected
                selectedFeature.setStyle(getFeatureStyle(
                    selectedFeature,
                    null,
                    nutrient,
                    year,
                    true
                ));
                this.setState({ featureId, selectedFeature });
            } else {
                // Feature is deselected
                this.setState({ featureId: overallFeatureId, regionLabel, selectedFeature: null });
            }
        }
    };

    getNutrientTrend = (nutrient: string, featureName: string): number => {
        const x = [];
        const y = [];
        Object.entries(annualYieldData[nutrient][featureName]).forEach(([year, value]) => {
            x.push(parseInt(year, 10));
            y.push(parseFloat(value));
        });
        return SLRSlope(x, y) || 0;
    };

    getTrends = (featureName: string) => {
        const classes = this.props.classes;
        const nitrogenTrend = this.getNutrientTrend('Nitrogen', featureName);
        const phosphorusTrend = this.getNutrientTrend('Phosphorus', featureName);
        return [['Nitrogen', nitrogenTrend], ['Phosphorus', phosphorusTrend]].map(([nutrient, trend]) => {
            let Icon;
            let color;
            if (trend > 0) {
                Icon = UpTrendIcon;
                color = 'red';
            } else if (trend < 0) {
                Icon = DownTrendIcon;
                color = 'blue';
            } else {
                Icon = FlatTrendIcon;
                color = 'black';
            }
            return (
                <>
                    <br />
                    <span>
                        {nutrient} Trend
                        <Icon className={`${classes.trendIcon} ${color}`} />
                    </span>
                </>
            );
        });
    };

    getBoundaryInfoContent = () => {
        const { selectedFeature, boundary } = this.state;
        let featureName;
        let contributingWaterways;
        let cumulativeAcres;

        if (selectedFeature) {
            featureName = selectedFeature.get('Name') || selectedFeature.get('Station_ID');
            const featureProps = selectedFeature.getProperties();
            contributingWaterways = featureProps.contributing_waterways;
            cumulativeAcres = featureProps.cumulative_acres;
        } else {
            featureName = getOverallFeatureLabels(boundary).join(' - ');
            contributingWaterways = overallData[boundary].contributing_waterways;
            cumulativeAcres = overallData[boundary].cumulative_acres;
        }

        return (
            <>
                <Typography variant="subtitle2" gutterBottom>
                    <span><b>{featureName}</b></span>
                </Typography>
                <Typography variant="caption">
                    {contributingWaterways ?
                        <span>{format(',')(contributingWaterways)} Contributing Waterways</span> :
                        null}
                    <br />
                    {cumulativeAcres ?
                        <span>{format(',')(cumulativeAcres)} Cumulative Acres</span> :
                        null}
                </Typography>
            </>
        );
    };

    render() {
        const { classes } = this.props;
        const {
            boundary,
            regionLabel,
            featureId,
            nutrient,
            year
        } = this.state;

        return (
            <Map
                className="fillContainer"
                zoom={7}
                minZoom={5}
                extent={MAP_BOUNDS}
                center={[-9972968, 4972295]}
                controls={[this.boundaryInfoControl, this.legendControl]}
                layers={Object.values(this.layers)}
                legends={this.legends}
                layerSwitcherOptions={{}}
                updateMap={this.updateMap}
                events={{
                    click: this.handleMapClick
                }}
            >
                <Grid
                    className={classes.mainContainer}
                    container
                    alignItems="stretch"
                >
                    <Grid
                        className="fillContainer"
                        mapcontainer={1}
                        item
                        xs={8}
                    />
                    <Grid
                        className={classes.sidebar}
                        item
                        xs={4}
                    >
                        <Sidebar
                            regionLabel={regionLabel}
                            featureId={featureId}
                            selectedBoundary={boundary}
                            selectedNutrient={nutrient}
                            selectedYear={year}
                            handleBoundaryChange={this.handleBoundaryChange}
                            handleVariableChange={this.handleVariableChange}
                        />
                    </Grid>
                </Grid>
                <BaseControlPortal el={this.boundaryInfoControl.element}>
                    <Container>{this.getBoundaryInfoContent()}</Container>
                </BaseControlPortal>

                <BaseControlPortal el={this.legendControl.element}>
                    <List dense disablePadding>
                        {this.legends.map(({ title, url }) => (
                            <ListItem
                                key={title}
                                classes={{
                                    root: classes.legendItem
                                }}
                            >
                                <ListItemIcon classes={{ root: classes.legendItemIcon }}>
                                    <img src={url} alt={title} />
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        ))}
                    </List>
                </BaseControlPortal>
            </Map>
        );
    }
}

export default withStyles(styles)(Home);
