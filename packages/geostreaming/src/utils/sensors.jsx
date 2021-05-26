// @flow
import React from 'react';
import { renderToString } from 'react-dom/server';
import MarkerIcon from '@material-ui/icons/Room';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import SVGIcon from '@geostreams/core/src/components/SVGIcon';
import { pnpoly } from '@geostreams/core/src/utils/array';

import type { PropertiesType, SensorType, SourceConfig } from './flowtype';

export const getSensorName = ({ location, name, popupContent }: PropertiesType): string => (
    popupContent && (popupContent !== name) ? popupContent : location || name
);

export const getSourceName = (sourceConfig: ?SourceConfig, source: { id: string, title: string }): string => {
    if (sourceConfig) {
        return sourceConfig.label || source.title;
    }
    return source.title;
};

export const getSourceColor = (sourceConfig: ?SourceConfig) => (sourceConfig && sourceConfig.color) || '#17495B';

export const getSensorMarkerColors = (
    sensorProps: PropertiesType,
    sourceConfig: SourceConfig,
    displayOnlineStatus: boolean
) => {
    const fillColor = sourceConfig.color || 'black';
    let strokeColor = 'black';
    if (displayOnlineStatus) {
        if (sensorProps.online_status === 'online') {
            strokeColor = 'green';
        }
        if (sensorProps.online_status === 'offline') {
            strokeColor = 'red';
        }
    }
    return [fillColor, strokeColor];
};

export const getSensorMarker = (sensor: SensorType, sourceConfig: SourceConfig, displayOnlineStatus: boolean) => {
    const { geometry, properties } = sensor;
    const geom = new Point(geometry.coordinates);
    geom.transform('EPSG:4326', 'EPSG:3857');
    const feature = new Feature({ geometry: geom });

    const vectorSource = new VectorSource({ features: [feature] });

    const sensorMarker = new VectorLayer({ source: vectorSource });

    const [fill, stroke] = getSensorMarkerColors(properties, sourceConfig, displayOnlineStatus);

    const marker = encodeURIComponent(
        renderToString(
            <MarkerIcon
                component={SVGIcon}
                fill={fill}
                stroke={stroke}
            />
        )
    );

    sensorMarker.setStyle(new Style({
        image: new Icon({
            src: `data:image/svg+xml;utf-8,${marker}`
        })
    }));

    return sensorMarker;
};

export const matchLocation = (
    selectedLocation: string, 
    sensorRegion: string, 
    locations: [], 
    coordinates: []
) => {
    if (selectedLocation === sensorRegion)
        return true;

    function findLocation(location) {
        return location.properties.id === selectedLocation;
    }

    const customLocation = locations.find(findLocation);
    if (!customLocation)
        return false;
    return pnpoly( Number(coordinates[1]), 
        Number(coordinates[0]), 
        customLocation.geometry.coordinates);
};
