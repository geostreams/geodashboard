// @flow
import * as React from 'react';
import { Map as OLMap, View } from 'ol';
import { defaults as defaultControls, Control } from 'ol/control';
import Layer from 'ol/layer/Layer';
import Overlay from 'ol/Overlay';
import VectorSource from 'ol/source/Vector';
import ClusterSource from 'ol/source/Cluster';
import AnimatedClusterLayer from 'ol-ext/layer/AnimatedCluster';
import SelectClusterInteraction from 'ol-ext/interaction/SelectCluster';
import LayerSwitcher from './LayerSwitcher';
import Popup from './Popup';

type Props = {
    children: React.Node;
    id: string;
    className: string;
    projection: string;
    zoom: number;
    center: [number, number];
    minZoom: number;
    maxZoom: number;
    extent: Array<number>;
    controls: Control[];
    layers: Array<Layer>;
    layerSwitcherOptions: {};
    updateMap: Function;
    popupContent: Function | React.Node;
    showPopupAt: ?[number, number];   // Coordinate to show the popup at. If value is null, it closes the popup.
    events: { [k: string]: Function };
}

export const MapContext = React.createContext<{ map: OLMap } | null>(null);

class Map extends React.Component<Props> {
    map: OLMap;

    popupOverlay: Overlay;

    fallbackContainer: { current: null | HTMLDivElement } = React.createRef();

    mapContainer: { current: null | HTMLDivElement } = React.createRef();

    popupContainer: HTMLDivElement;

    static defaultProps = {
        children: null,
        id: '',
        className: '',
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 7,
        minZoom: 0,
        maxZoom: 14,
        extent: undefined,
        controls: [],
        layers: [],
        layerSwitcherOptions: null,
        updateMap: null,
        showPopupAt: null,
        popupContent: null,
        events: null
    };

    componentDidMount() {
        const {
            projection,
            center,
            zoom,
            minZoom,
            maxZoom,
            extent,
            controls,
            layers,
            layerSwitcherOptions,
            updateMap,
            showPopupAt,
            events
        } = this.props;

        this.popupOverlay = new Overlay({
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        if (showPopupAt) {
            this.openPopup(showPopupAt);
        } else {
            this.closePopup();
        }

        this.map = new OLMap({
            target: this.mapContainer.current || this.fallbackContainer.current,
            view: new View({
                projection,
                center,
                zoom,
                minZoom,
                maxZoom,
                extent
            }),
            layers,
            overlays: [this.popupOverlay],
            controls: defaultControls().extend(controls)
        });

        if (events) {
            Object.entries(events).forEach(([event, handler]) => {
                this.map.on(event, handler);
            });
        }

        if (layerSwitcherOptions) {
            const layerSwitcher = new LayerSwitcher(layerSwitcherOptions);
            this.map.addControl(layerSwitcher);
        }

        if (updateMap) {
            this.map.addClusterLayer = this.addClusterLayer;
            updateMap(this.map);
        }

        this.forceUpdate();
    }

    componentDidUpdate(prevProps: $ReadOnly<Props>) {
        if (this.popupContainer) {
            if (!this.popupOverlay.getElement()) {
                this.popupOverlay.setElement(this.popupContainer);
            }
            if (prevProps.showPopupAt !== this.props.showPopupAt) {
                if (this.props.showPopupAt) {
                    this.openPopup(this.props.showPopupAt);
                } else {
                    this.closePopup();
                }
            }
        }
    }

    addClusterLayer = ({
        source,
        distance,
        styleClustered,
        styleSelected,
        styleFeature,
        onSelect
    }: {
        source: VectorSource,
        distance: number,
        styleClustered: Function,
        styleSelected: Function,
        styleFeature: Function,
        onSelect: ?Function
    }): ClusterSource => {
        const clusterSource = new ClusterSource({
            distance,
            source
        });

        const clusters = new AnimatedClusterLayer({
            source: clusterSource,
            style: styleClustered
        });
        this.map.addLayer(clusters);

        const selectCluster = new SelectClusterInteraction({
            pointRadius: 17,
            animate: true,
            spiral: false,
            // Feature style when it springs apart
            featureStyle: styleFeature,
            // Style to draw cluster when selected
            style: styleSelected
        });
        this.map.addInteraction(selectCluster);

        if (onSelect) {
            // On selected => get feature in cluster and show info
            selectCluster.getFeatures().on(['add'], onSelect);
        }

        return clusterSource;
    };

    renderChildren = (children: React.Node) => {
        return React.Children.map(children, (child) => {
            if (!child || !child.props) {
                return child;
            }

            const nestedChildren = child.props.children ?
                this.renderChildren(child.props.children) :
                [];

            if (child.props.mapcontainer) {
                return React.cloneElement(
                    child,
                    {
                        ref: this.mapContainer
                    },
                    [...nestedChildren]
                );
            }

            if (nestedChildren.length) {
                return React.cloneElement(child, { children: nestedChildren });
            }
            return child;
        });
    };

    updatePopupContainer = (el: HTMLDivElement) => {
        this.popupContainer = el;
    };

    openPopup = (coordinate: [number, number]) => {
        this.popupOverlay.setPosition(coordinate);
    };

    closePopup = () => {
        this.popupOverlay.setPosition(undefined);
    };

    render() {
        const { children, id, className, popupContent } = this.props;

        const data = {
            map: this.map
        };

        return (
            <div
                id={id}
                className={`ol-map ${className}`}
                ref={this.fallbackContainer}
            >
                <MapContext.Provider value={data}>
                    {this.renderChildren(children)}
                </MapContext.Provider>
                <Popup
                    content={popupContent}
                    setRef={this.updatePopupContainer}
                    handleClose={this.closePopup}
                />
            </div>
        );
    }
}

export default Map;
