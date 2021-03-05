// @flow
import * as React from 'react';
import { Map as OLMap, View } from 'ol';
import { defaults as defaultControls, Control } from 'ol/control';
import Layer from 'ol/layer/Layer';
import Overlay from 'ol/Overlay';

import LayerSwitcher from './LayerSwitcher';

type Props = {
    mapContainer: ?HTMLElement;
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
    updateMap: ?Function;
    events: { [k: string]: Function };
}

export const MapContext = React.createContext<{ map: OLMap }>({});

const Map = (props: Props) => {
    const { children, id, className } = props;

    const fallbackContainer = React.useRef();

    const mapRef = React.useRef();

    React.useEffect(() => {
        const {
            mapContainer,
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
            events
        } = props;

        const map = new OLMap({
            target: mapContainer || fallbackContainer.current,
            view: new View({
                projection,
                center,
                zoom,
                minZoom,
                maxZoom,
                extent
            }),
            layers,
            overlays: [
                new Overlay({
                    id: 'popup',
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250
                    }
                })
            ],
            controls: defaultControls().extend(controls)
        });

        if (events) {
            Object.entries(events).forEach(([event, handler]) => {
                map.on(event, handler);
            });
        }

        if (layerSwitcherOptions) {
            const layerSwitcher = new LayerSwitcher(layerSwitcherOptions);
            map.addControl(layerSwitcher);
        }

        if (updateMap) {
            updateMap(map);
        }

        mapRef.current = map;

        return () => {
            if (events) {
                Object.entries(events).forEach(([event, handler]) => {
                    map.un(event, handler);
                });
            }
        };
    }, []);

    return (
        <div
            id={id}
            className={`ol-map ${className}`}
            ref={fallbackContainer}
        >
            <MapContext.Provider value={{ map: mapRef.current }}>
                {children}
            </MapContext.Provider>
        </div>
    );
};

Map.defaultProps = {
    mapContainer: null,
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
    events: null
};

export default Map;
