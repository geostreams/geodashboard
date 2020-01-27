// @flow
import * as React from 'react'
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
    NativeSelect, Paper,
    Typography,
    withStyles
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import InfoIcon from '@material-ui/icons/Info'
import { createEmpty as createEmptyExtent, extend as extentExtent } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import GroupLayer from 'ol/layer/Group'
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import ImageWMSSource from 'ol/source/ImageWMS'
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Map } from 'gd-core/src/components/ol'
import { entries } from 'gd-core/src/utils/array'

import type {
    Feature as FeatureType,
    Map as MapType,
    Overlay as OverlayType,
    MapBrowserEventType
} from 'ol'
import type { Layer as LayerType } from 'ol/layer'

import Sidebar from './Sidebar'

import { HEADERS_HEIGHT } from '../Layout/Header'
import {
    ACTION_BAR_HEIGHT,
    BOUNDARIES,
    VARIABLES_INFO,
    YEARS,
    getFeatureStyle
} from './config'

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
    popup: {
        width: 200,
        padding: theme.spacing(1)
    },
    popupClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1000,
        cursor: 'pointer'
    }
})

type Props = {
    classes: {
        main: string,
        mainContainer: string,
        sidebar: string,
        actionBar: string,
        formControl: string,
        formLabel: string,
        selectButton: string,
        fillContainer: string,
        popup: string,
        popupClose: string
    }
}

type State = {
    boundary: string,
    featureId: string,
    year: number,
    nutrient: string,
    showDialog: boolean,
    dialogContent: {
        title: string,
        description: string | React.Node
    }
}

class Home extends React.Component<Props, State> {
    map: MapType

    popupOverlay: OverlayType

    popupContainer: { current: null | HTMLDivElement } = React.createRef()

    popupContent: { current: null | HTMLDivElement } = React.createRef()

    layers: {
        [key: string]: LayerType
    }

    selectedFeature: ?FeatureType

    constructor(props) {
        super(props)

        this.state = {
            boundary: 'drainage',
            featureId: 'Overall summary',
            year: 2017,
            nutrient: 'Nitrogen',
            showDialog: false,
            dialogContent: {}
        }

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
                            })
                            const layer = new VectorLayer({
                                source,
                                name,
                                style: (feature, resolution) => {
                                    const { nutrient, year } = this.state
                                    return style(feature, resolution, nutrient, year)
                                }
                            })
                            source.on(
                                'change',
                                () => {
                                    if (!group.isReady && source.getState() === 'ready') {
                                        group.isReady = true
                                        group.setVisible(visible)
                                    }
                                }
                            )
                            return layer
                        })
                    })
                    boundaryLayers[name] = group
                    return boundaryLayers
                },
                {}
            )
        }
        this.selectedFeature = null
    }

    handleBoundaryChange = ({ target: { value } }) => {
        if (this.selectedFeature) {
            const { nutrient, year } = this.state
            this.selectedFeature.setStyle(
                getFeatureStyle(
                    this.selectedFeature,
                    null,
                    nutrient,
                    year,
                    false
                )
            )
            this.selectedFeature = null
        }
        this.layers[this.state.boundary].setVisible(false)

        this.layers[value].setVisible(true)

        const extent = createEmptyExtent()
        this.layers[value].getLayers().forEach((layer) => {
            extentExtent(extent, layer.getSource().getExtent())
        })
        this.map.getView().fit(extent)

        this.setState({ boundary: value, featureId: 'Overall summary' })
    }

    handleVariableChange = ({ target: { value } }, variable: string) => {
        this.setState(
            { [variable]: value },
            () => {
                this.layers[this.state.boundary].getLayers().forEach((layer) => layer.changed())
                if (this.selectedFeature) {
                    const { nutrient, year } = this.state
                    this.selectedFeature.setStyle(
                        getFeatureStyle(
                            this.selectedFeature,
                            null,
                            nutrient,
                            year,
                            true
                        )
                    )
                }
            }
        )
    }

    showInfoDialog = (variable) => {
        this.setState({
            showDialog: true,
            dialogContent: VARIABLES_INFO[variable]
        })
    }

    handleMapClick = (event: MapBrowserEventType) => {
        // Get the feature from the click event, update the state, and
        // add the feature to the selection layer
        const { featureId: previousFeatureId } = this.state
        const previousFeature = this.selectedFeature

        const feature = event.map.forEachFeatureAtPixel(event.pixel, (f) => f)

        const popupContentEl = this.popupContent.current
        if (feature && popupContentEl) {
            this.popupOverlay.setPosition(event.coordinate)
            popupContentEl.innerHTML = feature.get('Name') || feature.get('Station_ID')
        } else {
            this.popupOverlay.setPosition(undefined)
        }

        if (feature && (this.state.boundary !== 'drainage' || feature.get('interactive'))) {
            const selectedFeature = feature.get('interactive') ?
                // A site marker is clicked
                this.layers.drainage
                    .getLayersArray()[0]
                    .getSource()
                    .getFeatures()
                    .find((element) => element.get('Station_ID') === feature.get('Station_ID')) :
                feature

            const { nutrient, year } = this.state
            if (previousFeatureId !== 'Overall summary' && previousFeature) {
                previousFeature.setStyle(
                    getFeatureStyle(
                        previousFeature,
                        null,
                        nutrient,
                        year,
                        false
                    )
                )
            }

            const featureId = selectedFeature.get('Name') || selectedFeature.get('Station_ID')
            if (featureId !== previousFeatureId) {
                // Feature is selected
                selectedFeature.setStyle(getFeatureStyle(
                    selectedFeature,
                    null,
                    nutrient,
                    year,
                    true
                ))
                this.setState(
                    { featureId },
                    () => {
                        this.selectedFeature = selectedFeature
                    }
                )
            } else {
                // Feature is deselected
                this.setState(
                    { featureId: 'Overall summary' },
                    () => {
                        this.selectedFeature = null
                    }
                )
            }
        }
    }

    getPopupContent = (e) => {
        const feature = e.map.forEachFeatureAtPixel(e.pixel, (f) => f)
        if (feature) {
            return `<span>${feature.get('Name') || feature.get('Station_ID')} </span>`
        }
        return null
    }

    handlePopupClose = () => {
        this.popupOverlay.setPosition(undefined)
    }

    render() {
        const { classes } = this.props
        const {
            boundary,
            featureId,
            nutrient,
            year,
            showDialog,
            dialogContent
        } = this.state
        return (
            <Map
                className="fillContainer"
                zoom={7}
                center={[-9972968, 4972295]}
                layers={Object.values(this.layers)}
                layerSwitcherOptions={{}}
                popupContent={this.getPopupContent}
                updateMap={(map) => { this.map = map }}
                updatePopup={(popupOverlay) => {
                    popupOverlay.setElement(this.popupContainer.current)
                    this.popupOverlay = popupOverlay
                }}
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
                <Paper ref={this.popupContainer} className={classes.popup}>
                    <CloseIcon
                        className={classes.popupClose}
                        fontSize="small"
                        onClick={this.handlePopupClose}
                    />
                    <div ref={this.popupContent} />
                </Paper>
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
        )
    }
}

export default withStyles(styles)(Home)
