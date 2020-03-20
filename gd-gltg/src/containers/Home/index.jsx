// @flow
import * as React from 'react';
import { format } from 'd3';
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    InputBase,
    NativeSelect,
    Typography,
    withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import DownTrendIcon from '@material-ui/icons/ArrowDropDown';
import UpTrendIcon from '@material-ui/icons/ArrowDropUp';
import FlatTrendIcon from '@material-ui/icons/FiberManualRecord';
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
import { Map } from 'gd-core/src/components/ol';
import { entries } from 'gd-core/src/utils/array';
import { SLRSlope } from 'gd-core/src/utils/math';

import type {
    Feature as FeatureType,
    Map as MapType,
    MapBrowserEventType
} from 'ol';
import type { Layer as LayerType } from 'ol/layer';

import data from '../../data/data.json';
import { HEADERS_HEIGHT } from '../Layout/Header';

import Sidebar from './Sidebar';
import {
    ACTION_BAR_HEIGHT,
    BOUNDARIES,
    VARIABLES_INFO,
    YEARS,
    getFeatureStyle
} from './config';

const styles = (theme) => ({
    main: {
        height: `calc(100% - ${HEADERS_HEIGHT}px)`
    },
    actionBar: {
        position: 'absolute',
        width: '100%',
        height: ACTION_BAR_HEIGHT,
        minHeight: 'unset',
        borderBottom: '1px solid #ccc'
    },
    mainContainer: {
        position: 'absolute',
        top: ACTION_BAR_HEIGHT,
        height: `calc(100% - ${ACTION_BAR_HEIGHT}px)`
    },
    sidebar: {
        height: '100%',
        overflowY: 'auto'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    formLabel: {
        padding: theme.spacing(1)
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
        'height': 42,
        'padding': theme.spacing(2),
        '&:focus': {
            borderRadius: 4
        },
        '& option': {
            color: 'initial'
        }
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
    }
});

type Props = {
    classes: {
        main: string;
        mainContainer: string;
        sidebar: string;
        actionBar: string;
        formControl: string;
        formLabel: string;
        selectButton: string;
        fillContainer: string;
        trendIcon: string;
    }
}

type State = {
    boundary: string;
    featureId: string;
    year: number;
    nutrient: string;
    popupContent: ?React.Node;
    showPopupAt: ?[number, number];
    showDialog: boolean;
    dialogContent: {
        title: string;
        description: string | React.Node;
    };
}

class Home extends React.Component<Props, State> {
    map: MapType;

    layers: {
        [key: string]: LayerType
    };

    selectedFeature: ?FeatureType;

    constructor(props) {
        super(props);

        this.state = {
            boundary: 'drainage',
            featureId: 'Overall summary',
            year: 2017,
            nutrient: 'Nitrogen',
            popupContent: null,
            showPopupAt: null,
            showDialog: false,
            dialogContent: {}
        };

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
                    new ImageLayer({
                        title: 'State Boundaries',
                        source: new ImageWMSSource({
                            url: 'https://greatlakestogulf.org/geoserver/wms',
                            params: { LAYERS: 'gltg:us-states' }
                        }),
                        visible: true
                    }),
                    new ImageLayer({
                        title: 'Rivers',
                        source: new ImageWMSSource({
                            url: 'https://greatlakestogulf.org/geoserver/wms',
                            params: { LAYERS: 'gltg:us-rivers' }
                        }),
                        visible: true
                    })
                ]
            }),
            ...entries(BOUNDARIES).reduce(
                (boundaryLayers, [name, { visible, layers }]) => {
                    const group = new GroupLayer({
                        layers: layers.map(({ url, style }) => {
                            const source = new VectorSource({
                                url,
                                useSpatialIndex: true,
                                format: new GeoJSON({
                                    dataProjection: 'EPSG:4326',
                                    featureProjection: 'EPSG:3857'
                                })
                            });
                            const layer = new VectorLayer({
                                source,
                                name,
                                style: (feature, resolution) => {
                                    const { nutrient, year } = this.state;
                                    return style(feature, resolution, nutrient, year);
                                }
                            });
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
        this.selectedFeature = null;
    }

    handleBoundaryChange = ({ target: { value } }) => {
        if (this.selectedFeature) {
            const { nutrient, year } = this.state;
            this.selectedFeature.setStyle(
                getFeatureStyle(
                    this.selectedFeature,
                    null,
                    nutrient,
                    year,
                    false
                )
            );
            this.selectedFeature = null;
        }
        this.layers[this.state.boundary].setVisible(false);

        this.layers[value].setVisible(true);

        const extent = createEmptyExtent();
        this.layers[value].getLayers().forEach((layer) => {
            extentExtent(extent, layer.getSource().getExtent());
        });
        this.map.getView().fit(extent);

        this.setState({ boundary: value, featureId: 'Overall summary' });
    };

    handleVariableChange = ({ target: { value } }, variable: string) => {
        this.setState(
            { [variable]: value },
            () => {
                this.layers[this.state.boundary].getLayers().forEach((layer) => layer.changed());
                if (this.selectedFeature) {
                    const { nutrient, year } = this.state;
                    this.selectedFeature.setStyle(
                        getFeatureStyle(
                            this.selectedFeature,
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

    showInfoDialog = (variable) => {
        this.setState({
            showDialog: true,
            dialogContent: VARIABLES_INFO[variable]
        });
    };

    handleMapClick = (event: MapBrowserEventType) => {
        // Get the feature from the click event, update the state, and
        // add the feature to the selection layer
        const { featureId: previousFeatureId } = this.state;
        const previousFeature = this.selectedFeature;

        const feature = event.map.forEachFeatureAtPixel(event.pixel, (f) => f);

        if (feature) {
            const selectedFeature = feature.get('interactive') ?
                // A site marker is clicked
                this.layers.drainage
                    .getLayersArray()[0]
                    .getSource()
                    .getFeatures()
                    .find((element) => element.get('Station_ID') === feature.get('Station_ID')) :
                feature;

            const popupState = {
                showPopupAt: event.coordinate,
                popupContent: this.getPopupContent(selectedFeature)
            };

            if (this.state.boundary !== 'drainage' || feature.get('interactive')) {
                const { nutrient, year } = this.state;
                if (previousFeatureId !== 'Overall summary' && previousFeature) {
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
                    this.setState(
                        { featureId, ...popupState },
                        () => {
                            this.selectedFeature = selectedFeature;
                        }
                    );
                } else {
                    // Feature is deselected
                    this.setState(
                        { featureId: 'Overall summary', ...popupState },
                        () => {
                            this.selectedFeature = null;
                        }
                    );
                }
            } else {
                this.setState(popupState);
            }
        } else {
            this.setState(
                {
                    showPopupAt: null,
                    popupContent: null
                }
            );
        }
    };

    getNutrientTrend = (nutrient: string, featureName: string): number => {
        const x = [];
        const y = [];
        Object.entries(data[nutrient][featureName]).forEach(([year, value]) => {
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

    getPopupContent = (feature: FeatureType) => {
        const featureName = feature.get('Name') || feature.get('Station_ID');
        const { contributing_waterways, cumulative_acres } = feature.getProperties();

        return (
            <Typography variant="caption">
                <span><b>{featureName}</b></span>
                <br />
                <span>{format(',')(contributing_waterways)} Contributing Waterways</span>
                <br />
                <span>{format(',')(cumulative_acres)} Cumulative Acres</span>
            </Typography>
        );
    };

    render() {
        const { classes } = this.props;
        const {
            boundary,
            featureId,
            nutrient,
            year,
            showPopupAt,
            popupContent,
            showDialog,
            dialogContent
        } = this.state;
        return (
            <Map
                className="fillContainer"
                zoom={7}
                center={[-9972968, 4972295]}
                layers={Object.values(this.layers)}
                layerSwitcherOptions={{}}
                updateMap={(map) => {
                    this.map = map;
                }}
                popupContent={popupContent}
                showPopupAt={showPopupAt}
                events={{
                    click: this.handleMapClick
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.actionBar}
                >
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            <Box display="flex" alignItems="center">
                                Boundary Type
                                &nbsp;
                                <InfoIcon
                                    className="actionIcon"
                                    fontSize="small"
                                    onClick={(() => this.showInfoDialog('boundary'))}
                                />
                            </Box>
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={boundary}
                            onChange={this.handleBoundaryChange}
                            input={<InputBase />}
                        >
                            {entries(BOUNDARIES).map(([name, { label }]) => (
                                <option
                                    key={name}
                                    value={name}
                                >
                                    {label}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            <Box display="flex" alignItems="center">
                                Nutrient
                                &nbsp;
                                <InfoIcon
                                    className="actionIcon"
                                    fontSize="small"
                                    onClick={(() => this.showInfoDialog('nutrient'))}
                                />
                            </Box>
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={nutrient}
                            onChange={(e) => this.handleVariableChange(e, 'nutrient')}
                            input={<InputBase />}
                        >
                            <option value="Phosphorus">Phosphorus</option>
                            <option value="Nitrogen">Nitrogen</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            Year
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={year}
                            onChange={(e) => this.handleVariableChange(e, 'year')}
                            input={<InputBase />}
                        >
                            {YEARS.map(
                                (y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                )
                            )}
                        </NativeSelect>
                    </FormControl>
                </Box>

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
                            featureId={featureId}
                            nutrient={nutrient}
                            selectedYear={year}
                        />
                    </Grid>
                </Grid>
                <Dialog
                    open={showDialog}
                    onClose={() => this.setState({ showDialog: false })}
                >
                    <DialogTitle disableTypography>
                        <Typography variant="h6" align="center">
                            {dialogContent.title}
                            <IconButton
                                className="right noPadding actionIcon"
                                onClick={() => this.setState({ showDialog: false })}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        {dialogContent.description}
                    </DialogContent>
                </Dialog>
            </Map>
        );
    }
}

export default withStyles(styles)(Home);
