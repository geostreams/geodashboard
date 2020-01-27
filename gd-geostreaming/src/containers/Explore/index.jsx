// @flow
import React from 'react'
import { renderToString } from 'react-dom/server'
import { connect } from 'react-redux'
import { Grid, Paper, withStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import MarkerIcon from '@material-ui/icons/Room'
import { scaleLinear } from 'd3'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import Point from 'ol/geom/Point'
import GroupLayer from 'ol/layer/Group'
import TileLayer from 'ol/layer/Tile'
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style'
import { Map } from 'gd-core/src/components/ol'
import Control from 'gd-core/src/components/ol/Control'
import ClusterControl from 'gd-core/src/components/ol/ClusterControl'
import SVGIcon from 'gd-core/src/components/SVGIcon'
import { values } from 'gd-core/src/utils/array'

import type { Feature as FeatureType, Map as MapType, MapBrowserEventType, Overlay as OverlayType } from 'ol'
import type { Layer as LayerType } from 'ol/layer'
import type { Source as OLSourceType } from 'ol/source'

import CONFIG from '../../config'
import { fetchParameters } from '../../actions/parameters'
import { fetchSensors } from '../../actions/sensors'
import SensorDetail from '../Sensor/Detail'
import SensorPopup from '../Sensor/Popup'
import Sidebar from './Sidebar'

import type { ParameterType, SensorType, SourceType } from '../../utils/flowtype'

const INIT_ZOOM = 5.5
const INIT_CENTER = [-9972968, 4972295]
const CLUSTER_DISTANCE = 45

const styles = (theme) => ({
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    sidebar: {
        height: '100%',
        overflowY: 'auto',
        boxShadow: '1px 0 8px'
    },
    sensorDetail: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: '#fff'
    },
    clusterControl: {
        'display': 'flex',
        'justifyContent': 'center',
        'width': 'max-content',
        'bottom': 20,
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
        mainContainer: string;
        sidebar: string;
        sensorDetail: string;
        clusterControl: string;
        popupClose: string;
    };
    sensors: SensorType[];
    sources: SourceType[];
    parameters: ParameterType[];
    fetchSensors: Function;
    fetchParameters: Function;
}

type State = {
    hasData: boolean;
    enableCluster: boolean;
    selectedFeatureIdx: number;
    showSensorDetail: boolean;
}

class Explore extends React.Component<Props, State> {
    map: MapType

    layers: {
        [key: string]: LayerType
    }

    popupOverlay: OverlayType

    mapStyles: {
        [key: string]: Style
    }

    features: FeatureType[];

    selectedFeature: ?FeatureType

    clusterVectorSource: OLSourceType

    clusterSource: OLSourceType

    clusterControl: Control

    popupOverlay: OverlayType

    popupContainer: { current: null | HTMLDivElement } = React.createRef()

    data: {
        [sourceId: string]: {
            sensorCount: number,
            regions: {
                [regionId: string]: SensorType[]
            }
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            hasData: false,
            enableCluster: true,
            selectedFeatureIdx: -1,  // -1 indicates no feature is selected
            showSensorDetail: false
        }

        this.features = []

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
            })
        }

        const marker = renderToString(
            <MarkerIcon
                component={SVGIcon}
                fill="green"
                stroke="green"
            />
        )
        this.mapStyles = {
            linkedFeature: new Style({
                image: new Icon({
                    src: `data:image/svg+xml;utf-8,${marker}`,
                    size: [10, 10]
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 1
                })
            }),
            selectedFeature: new Style({
                image: new Icon({
                    src: `data:image/svg+xml;utf-8,${marker}`
                })
            })
        }

        this.selectedFeature = null

        this.clusterControl = new Control({
            className: this.props.classes.clusterControl
        })
    }

    componentDidMount() {
        if (this.props.sensors.length > 0) {
            this.initComponent()
        } else {
            this.props.fetchSensors()
        }
        if (this.props.parameters.length === 0) {
            this.props.fetchParameters()
        }
    }

    componentDidUpdate(prevProps: $ReadOnly<Props>, prevState: $ReadOnly<State>) {
        if (!prevState.hasData && this.props.sensors.length > 0) {
            this.initComponent()
        }
    }

    initComponent = () => {
        this.prepareData()
        this.addClusters()
        this.setState({ hasData: true })  // TODO remove the last two attributes
    }

    prepareData = () => {
        this.data = {}

        this.props.sensors.forEach((d, idx) => {
            d.idx = idx
            const sourceId = d.properties.type.id
            if (!this.data[sourceId]) {
                this.data[sourceId] = {
                    sensorCount: 0,
                    regions: {}
                }
            }
            const sourceAttrs = this.data[sourceId]
            sourceAttrs.sensorCount += 1
            const regionId = d.properties.region
            if (!sourceAttrs.regions[regionId]) {
                sourceAttrs.regions[regionId] = []
            }
            const regionSensors = sourceAttrs.regions[regionId]
            regionSensors.push(d)
        })
    }

    getMarker = (fill: string, stroke: string) => encodeURIComponent(
        renderToString(
            <MarkerIcon
                component={SVGIcon}
                fill={fill}
                stroke={stroke}
            />
        )
    )

    getMarkerColor = (feature) => {
        if (feature.get('features')) {
            const properties = feature.get('features')[0].get('properties')
            const sourceAttrs = CONFIG.source[properties.type.id.toLowerCase()] || {}
            const fillColor = sourceAttrs.color || 'black'
            let strokeColor = 'black'
            if (CONFIG.sensors.displayOnlineStatus) {
                if (properties.online_status === 'online') {
                    strokeColor = 'green'
                }
                if (properties.online_status === 'offline') {
                    strokeColor = 'red'
                }
            }
            return [fillColor, strokeColor]
        }
        return ['pink', 'pink']
    }

    getClusteredStyle = (feature) => {
        const { mapStyles } = this
        const { enableCluster } = this.state

        const size = feature.get('features').length

        if (size === 1 || !enableCluster) {
            return this.getSelectedStyle(feature)
        }

        const radiusScale = scaleLinear().range([10, 20]).domain([0, 300]).clamp(true)

        const styleName = `cluster-${size}`
        let style = mapStyles[styleName]
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
            })
        }

        mapStyles[styleName] = style
        this.mapStyles = mapStyles
        return style
    }

    getSelectedStyle = (feature) => {
        const size = feature.get('features').length
        const { mapStyles } = this
        const { enableCluster } = this.state

        if (size > 1 && enableCluster) {
            return this.getClusteredStyle(feature)
        }

        const [fillColor, strokeColor] = this.getMarkerColor(feature)
        const styleName = `cluster-${strokeColor}`
        let style = mapStyles[styleName]
        if (!style) {
            style = new Style({
                image: new Icon({
                    src: `data:image/svg+xml;utf-8,${this.getMarker(fillColor, strokeColor)}`
                })
            })
        }

        mapStyles[styleName] = style
        this.mapStyles = mapStyles
        return style
    }

    addClusters = () => {
        this.clusterVectorSource = new VectorSource({
            format: (new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }))
        })

        this.props.sensors.forEach((sensor) => {
            const { geometry, ...attrs } = sensor
            const geom = new Point(geometry.coordinates)
            geom.transform('EPSG:4326', 'EPSG:3857')
            const feature = new Feature({
                geometry: geom,
                // $FlowFixMe
                ...attrs
            })
            this.features.push(feature)
            this.clusterVectorSource.addFeature(feature)
        })

        this.clusterSource = this.map.addClusterLayer({
            source: this.clusterVectorSource,
            distance: CLUSTER_DISTANCE,
            styleClustered: this.getClusteredStyle,
            styleSelected: this.getSelectedStyle,
            styleFeature: (feature) => {
                const [fillColor, strokeColor] = this.getMarkerColor(feature)
                return new Style({
                    image: new Icon({
                        src: `data:image/svg+xml;utf-8,${this.getMarker(fillColor, strokeColor)}`
                    }),
                    // Draw a link between points (or not)
                    stroke: new Stroke({
                        color: '#fff',
                        width: 1
                    })
                })
            }
        })
    }

    addRegionsToMap = (regions) => {
        values(regions).forEach((sensors) => {
            sensors.forEach((sensor) => {
                this.clusterVectorSource.addFeature(this.features[sensor.idx])
            })
        })
    }

    removeRegionsFromMap = (regions) => {
        values(regions).forEach((sensors) => {
            sensors.forEach((sensor) => {
                this.clusterVectorSource.removeFeature(this.features[sensor.idx])
            })
        })
    }

    handleMapClick = (event: MapBrowserEventType) => {
        const featuresAtPixel = this.map.forEachFeatureAtPixel(event.pixel, (featureChange) => featureChange)
        if (featuresAtPixel && featuresAtPixel.attributes && featuresAtPixel.attributes.type === 'single') {
            // Case when a feature is expanded
        } else if (featuresAtPixel && featuresAtPixel.get('features') && featuresAtPixel.get('features').length === 1) {
            // Case where a feature that wasn't clustered is expanded (there is just one element in the cluster)
            this.handlePopupOpen(featuresAtPixel.get('features')[0])
        } else if (featuresAtPixel && featuresAtPixel.get('features') && featuresAtPixel.get('features').length > 1) {
            // Zoom in the clicked cluster it has more than `clusterExpandCountThreshold` features
            // and is in a zoom level lower than `clusterExpandZoomThreshold`
            if (featuresAtPixel.get('features').length > CONFIG.map.clusterExpandCountThreshold && this.map.getView().getZoom() < CONFIG.map.clusterExpandZoomThreshold) {
                this.map.getView().setCenter(featuresAtPixel.get('features')[0].getGeometry().getCoordinates())
                this.map.getView().animate({ zoom: this.map.getView().getZoom() + 1, duration: 500 })
            }
        }
    }

    handlePopupClose = () => {
        this.popupOverlay.setPosition(undefined)
        this.map.getView().setZoom(INIT_ZOOM)
        this.map.getView().setCenter(INIT_CENTER)
        this.setState({
            selectedFeatureIdx: -1,
            showSensorDetail: false
        })
    }

    handlePopupOpen = (feature: FeatureType | number) => {
        const f = typeof feature === 'number' ? this.features[feature] : feature
        this.map.getView().fit(f.getGeometry().getExtent())
        this.popupOverlay.setPosition(f.getGeometry().getCoordinates())
        this.setState({ selectedFeatureIdx: f.get('idx') })
        // const properties = f.get('properties')
        // const attributes = {
        //     name: f.get('name'),
        //     dataSource: getSourceName(properties.type),
        //     maxEndTime: f.get('max_end_time'),
        //     minStartTime: f.get('min_start_time'),
        //     latitude: f.get('geometry').getCoordinates()[1],
        //     longitude: f.get('geometry').getCoordinates()[0],
        //     location: f.get('properties').region,
        //     parameters: f.get('parameters'),
        //     color: getSourceColor(properties.type.id),
        //     type: 'single',
        //     onlineStatus: properties.online_status ? properties.online_status : 'none',
        //     id: f.get('id')
        // }
    }

    render() {
        const { classes, sources } = this.props
        const { hasData } = this.state
        return (
            <>
                <Map
                    className="fillContainer"
                    zoom={INIT_ZOOM}
                    center={INIT_CENTER}
                    controls={[this.clusterControl]}
                    layers={Object.values(this.layers)}
                    updateMap={(map) => { this.map = map }}
                    updatePopup={(popupOverlay) => {
                        popupOverlay.setElement(this.popupContainer.current)
                        this.popupOverlay = popupOverlay
                    }}
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
                            className={classes.sidebar}
                            item
                            xs={4}
                        >
                            {hasData ?
                                <Sidebar
                                    data={this.data}
                                    sources={sources}
                                    selectedFeature={this.state.selectedFeatureIdx}
                                    addRegionsToMap={this.addRegionsToMap}
                                    removeRegionsFromMap={this.removeRegionsFromMap}
                                    handlePopupOpen={this.handlePopupOpen}
                                    handlePopupClose={this.handlePopupClose}
                                /> :
                                null}
                        </Grid>
                        <Grid
                            className="fillContainer"
                            mapcontainer={1}
                            item
                            xs={8}
                        />
                    </Grid>

                    <ClusterControl
                        el={this.clusterControl.element}
                        cluster={this.clusterSource}
                        defaultDistance={CLUSTER_DISTANCE}
                        toggleCallback={
                            (isClustered) => {
                                this.setState({ enableCluster: isClustered })
                                const zoom = this.map.getView().getZoom()
                                this.map.getView().setZoom(zoom + 0.001)
                                setTimeout(() => this.map.getView().setZoom(zoom), 100)
                            }
                        }
                    />

                    <Paper ref={this.popupContainer} elevation={0} square>
                        <CloseIcon
                            className={classes.popupClose}
                            fontSize="small"
                            onClick={this.handlePopupClose}
                        />
                        {this.state.selectedFeatureIdx > -1 ?
                            <SensorPopup
                                sensor={this.props.sensors[this.state.selectedFeatureIdx]}
                                parameters={this.props.parameters}
                                handleDetailClick={() => this.setState({ showSensorDetail: true })}
                            /> :
                            null}
                    </Paper>
                </Map>

                {this.state.showSensorDetail ?
                    <div className={classes.sensorDetail}>
                        <SensorDetail
                            sensor={this.props.sensors[this.state.selectedFeatureIdx]}
                            handleClose={() => this.setState({ showSensorDetail: false })}
                        />
                    </div> :
                    null}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    sensors: state.__new_sensors.sensors,
    sources: state.__new_sensors.sources,
    parameters: state.__new_parameters.parameters
})

const mapDispatchToProps = {
    fetchSensors,
    fetchParameters
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Explore))
