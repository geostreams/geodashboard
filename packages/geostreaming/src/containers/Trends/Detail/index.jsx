// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VegaLite } from 'react-vega';
import { makeStyles } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';
import GroupLayer from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style';
import { precision } from '@geostreams/core/src/utils/format';
import { useElementRect } from '@geostreams/core/src/utils/hooks';
import { Map as BaseMap } from '@geostreams/core/src/components/ol';

import type { MapBrowserEventType } from 'ol';
import type { Layer as LayerType } from 'ol/layer';
import type { Match } from '@geostreams/core/src/utils/flowtype';

import { getTrendValues, getTrendDetailValues } from '../utils';

import type {
    ParameterType,
    TrendsConfig,
    TrendRegionBoundary,
    TrendSeasonType,
    TrendDetailValues, SensorType
} from '../../../utils/flowtype';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    sidebar: {
        'padding': theme.spacing(2),
        '& > *': {
            marginTop: theme.spacing(1)
        }
    },
    mapContainer: {
        width: '100%',
        height: 300
    },
    mapPopupContainer: {
        minWidth: 200
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(.5),
        top: theme.spacing(1),
        color: 'red'
    }
}));

type Props = {
    dispatch: (action: any) => void;
    match: Match;
    geostreamingEndpoint: string;
    trendsConfig: TrendsConfig;
    region: TrendRegionBoundary;
    season: TrendSeasonType;
    parameter: ParameterType;
    parameterName: string;
    sensors: SensorType[];
}

const TrendDetail = (props: Props) => {
    const {
        dispatch,
        match,
        geostreamingEndpoint,
        trendsConfig: {
            boundaries
        },
        region,
        season,
        parameter,
        parameterName,
        sensors
    } = props;

    const classes = useStyles();

    const mapRef = React.useRef();

    const mapPopupContainerRef = React.useRef();

    // Caches the map layers and controls
    const cacheRef = React.useRef<{
        layers: { [layerName: string]: LayerType; };
    }>({
        layers: {
            basemap: new GroupLayer({
                title: 'Base Maps',
                layers: [
                    new TileLayer({
                        type: 'base',
                        title: 'OSM',
                        source: new OSM()
                    })
                ]
            }),
            boundary: new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON({
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    }).readFeatures(region)
                }),
                style: new Style({
                    stroke: new Stroke({
                        color: 'rgba(0, 152, 254, 1)',
                        width: 2
                    }),
                    fill: new Fill({
                        color: 'rgba(254, 254, 254, 0.3)'
                    })
                })
            })
        }
    });

    const [selectedFeature, updateSelectedFeature] = React.useState();

    const [isLocationInfoOpen, updateLocationInfoVisibility] = React.useState(false);

    const plotContainer = React.useRef();
    const plotContainerRect = useElementRect(plotContainer);

    const [trends, updateTrends] = React.useState({});
    const [trendDetailValues, updateTrendDetailValues] = React.useState<TrendDetailValues[]>();

    const [yearRange, updateYearRange] = React.useState([-Infinity, Infinity]);

    const [trendDetailValuesStatus, updateTrendDetailValuesStatus] = React.useState<'loading' | 'ready' | 'error'>(
        'loading'
    );

    React.useEffect(() => {
        getTrendValues(
            geostreamingEndpoint,
            match.params.parameter,
            match.params.season,
            boundaries,
            (trendsValues) => {
                updateTrends(trendsValues[match.params.region]);
            },
            dispatch
        );

        getTrendDetailValues(
            geostreamingEndpoint,
            props.match.params.region,
            match.params.parameter,
            match.params.season,
            boundaries,
            (result) => {
                updateYearRange([result[0].year, result[result.length - 1].year]);
                updateTrendDetailValues(result);
                updateTrendDetailValuesStatus('ready');
            },
            () => {
                updateTrendDetailValuesStatus('error');
            }
        );
    }, []);

    React.useEffect(() => {
        const map = mapRef.current;
        if (map) {
            const sensorPoints = sensors.map((sensor: SensorType) => {
                const sensorFeature = new Feature({
                    geometry: new Point(sensor.geometry.coordinates).transform('EPSG:4326', 'EPSG:3857')
                });
                sensorFeature.setProperties(sensor.properties);
                return sensorFeature;
            });

            const sensorsSource = new VectorSource({ format: new GeoJSON() });
            sensorsSource.on('addfeature', () => {
                map.getView().fit(sensorsSource.getExtent());
            });
            sensorsSource.addFeatures(sensorPoints);
            const sensorsLayer = new VectorLayer({
                source: sensorsSource,
                style: new Style({
                    image: new CircleStyle({
                        radius: 5,
                        stroke: new Stroke({
                            color: 'black',
                            width: 2
                        }),
                        fill: new Fill({
                            color: 'grey'
                        })
                    })
                })
            });
            sensorsLayer.setProperties({ interactive: true }, false);
            map.addLayer(sensorsLayer);
        }
    }, [sensors]);

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

    return (
        <Grid className={`fillContainer ${classes.root}`} container alignContent="flex-start">
            <Grid item xs={12} component={Breadcrumbs} separator=">">
                <Typography component={Link} to="/trends/regions" variant="h6">Trends Regions</Typography>
                <Typography variant="h6">{region.properties.title}</Typography>
            </Grid>
            <Grid container item xs={12}>
                <Grid className={classes.sidebar} container item xs={4} direction="column">
                    <Card>
                        <CardContent component={Grid} container>
                            <Grid item component={Typography} variant="h5">
                                Trends Summary
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" display="inline">Season: </Typography>
                                <Typography variant="body2" display="inline">{season.title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" display="inline">Parameter: </Typography>
                                <Typography
                                    variant="body2"
                                    display="inline"
                                    /* eslint-disable-next-line react/no-danger */
                                    dangerouslySetInnerHTML={{ __html: parameterName }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" display="inline">Total Avg: </Typography>
                                <Typography variant="body2" display="inline">
                                    {precision(trends.totalaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" display="inline">Ten Year Avg: </Typography>
                                <Typography variant="body2" display="inline">
                                    {precision(trends.tenyearsaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" display="inline">Latest Avg: </Typography>
                                <Typography variant="body2" display="inline">
                                    {precision(trends.lastaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant="h5">
                                Location
                                <InfoIcon
                                    className="right actionIcon"
                                    onClick={() => updateLocationInfoVisibility(true)}
                                />
                            </Typography>
                            <Dialog
                                open={isLocationInfoOpen}
                                onClose={()=> updateLocationInfoVisibility(false)}
                                scroll="paper"
                                PaperProps={{
                                    square: true
                                }}
                                fullWidth
                                maxWidth="md"
                            >
                                <DialogTitle disableTypography>
                                    <Typography variant="h6">Monitoring Stations</Typography>
                                    <IconButton
                                        className={classes.closeButton}
                                        size="small"
                                        onClick={()=> updateLocationInfoVisibility(false)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <List>
                                        {sensors.map(({ id, properties }) => (
                                            <ListItem key={id}>{properties.popupContent}</ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                        <CardContent>
                            <BaseMap
                                className={classes.mapContainer}
                                zoom={5}
                                center={[0, 0]}
                                layers={Object.values(cacheRef.current.layers)}
                                updateMap={(map) => {
                                    mapRef.current = map;
                                    map.getOverlayById('popup').setElement(mapPopupContainerRef.current);
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
                                                    layerFilter: (layer: LayerType) => (
                                                        !!layer.getProperties().interactive
                                                    )
                                                }
                                            );
                                            e.map.getTarget().style.cursor = hit ? 'pointer' : '';
                                        }
                                    }
                                }}
                            >
                                <div ref={mapPopupContainerRef}>
                                    {selectedFeature ? (
                                        <Card className={classes.mapPopupContainer}>
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {selectedFeature.getProperties().popupContent}
                                                </Typography>
                                                <IconButton
                                                    className={classes.closeButton}
                                                    size="small"
                                                    onClick={() => updateSelectedFeature(null)}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    ) : null}
                                </div>
                            </BaseMap>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid ref={plotContainer} item xs={8}>
                    {trendDetailValuesStatus === 'ready' ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item>
                                    {trendDetailValues[0].year}
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        step={1}
                                        marks
                                        min={trendDetailValues[0].year}
                                        max={trendDetailValues[trendDetailValues.length - 1].year}
                                        valueLabelDisplay="auto"
                                        value={yearRange}
                                        onChange={(_, value) => updateYearRange(value)}
                                    />
                                </Grid>
                                <Grid item>
                                    {trendDetailValues[trendDetailValues.length - 1].year}
                                </Grid>
                            </Grid>
                            <VegaLite
                                actions={{
                                    export: true,
                                    source: process.env.NODE_ENV === 'development',
                                    compiled: process.env.NODE_ENV === 'development',
                                    editor: process.env.NODE_ENV === 'development'
                                }}
                                data={{ trends: trendDetailValues }}
                                spec={{
                                    width: (plotContainerRect.width || 0) * 0.9,
                                    data: { name: 'trends' },
                                    transform: [
                                        { filter: { field: 'year', range: yearRange } }
                                    ],
                                    encoding: {
                                        x: { type: 'nominal', field: 'year', title: 'Year' }
                                    },
                                    layer: [
                                        {
                                            mark: { type: 'line', point: true, strokeDash: [2, 2] },
                                            encoding: {
                                                y: { field: 'average', type: 'quantitative', title: parameterName }
                                            }
                                        },
                                        {
                                            mark: { type: 'rule' },
                                            encoding: {
                                                y: {
                                                    field: 'lower',
                                                    type: 'quantitative',
                                                    scale: { zero: false }
                                                },
                                                y2: { field: 'upper' }
                                            }
                                        },
                                        {
                                            mark: { type: 'tick', size: 14 },
                                            encoding: { y: { field: 'upper', type: 'quantitative' } }
                                        },
                                        {
                                            mark: { type: 'tick', size: 14 },
                                            encoding: { y: { field: 'lower', type: 'quantitative' } }
                                        },
                                        {
                                            mark: 'bar',
                                            encoding: {
                                                y: { field: 'upper', type: 'quantitative' },
                                                opacity: { value: 0 },
                                                tooltip: [
                                                    { field: 'year', title: 'Year' },
                                                    { field: 'average', format: ',.02f', title: 'Average' },
                                                    { field: 'deviation', format: ',.02f', title: 'Deviation' }
                                                ]
                                            }
                                        }
                                    ]
                                }}
                            />
                        </> : (
                            <div>
                                {trendDetailValuesStatus === 'loading' ? 'Loading trends...' : 'Error fetching trends'}
                            </div>
                        )}
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state, props) => {
    const parameter = state.__new_parameters.parameters.find(({ name }) => name === props.match.params.parameter) || {};
    const region = state.config.trends.boundaries.find(({ properties }) => properties.id === props.match.params.region);
    const sensors = state.__new_sensors.sensors.filter(
        ({ properties }) => properties.region === region.properties.region
    );
    return {
        geostreamingEndpoint: state.config.geostreamingEndpoint,
        trendsConfig: state.config.trends,
        region,
        season: state.config.trends.seasons.find(({ id }) => id === props.match.params.season),
        parameter,
        parameterName: `${parameter.title}${parameter.unit ? ` (${parameter.unit})` : ''}`,
        sensors
    };
};

export default connect(mapStateToProps)(TrendDetail);
