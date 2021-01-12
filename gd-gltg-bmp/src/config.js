// @flow
import MVT from 'ol/format/MVT';
import GroupLayer from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import { transform } from 'ol/proj';
import OSM, { ATTRIBUTION as OSM_ATTRIBUTION } from 'ol/source/OSM';
import VectorTileSource from 'ol/source/VectorTile';
import XYZ from 'ol/source/XYZ';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import { entries } from 'gd-core/src/utils/array';

import type { Feature as FeatureType } from 'ol';

import type { Boundary, Filters } from './utils/flowtype';

export const GEOSERVER_URL = process.env.GEOSERVER_URL || '';
export const BMP_API_URL = process.env.BMP_API_URL || '';

export const MAP_CENTER = transform(
    [-88, 40],
    'EPSG:4326',
    'EPSG:3857'
);

export const STYLES = {
    hidden: new Style({
        fill: new Fill({
            color: [0, 0, 0, 0]
        }),
        stroke: new Stroke({
            color: [0, 0, 0, 0]
        })
    }),
    default: new Style({
        fill: new Fill({
            color: [0, 0, 0, 0.2]
        }),
        stroke: new Stroke({
            color: 'black'
        })
    }),
    selected: new Style({
        fill: new Fill({
            color: [255, 0, 0, 0.3]
        }),
        stroke: new Stroke({
            color: 'black'
        })
    })
};

export const getStyle = (options: string[], feature: FeatureType, featureIdKey: string, isSelected: boolean) => {
    if (options.includes(feature.get(featureIdKey))) {
        return isSelected ? STYLES.selected : STYLES.default;
    }
    return STYLES.hidden;
};

export const BOUNDARIES: { [k: string]: Boundary } = {
    state: {
        visible: true,
        label: 'States',
        idKey: 'id',
        layer: {
            id: 'gltg:us-states',
            featureIdKey: 'NAME',
            crs: 900913
        }
    },
    huc_8: {
        visible: false,
        label: 'HUC-8s',
        idKey: 'huc8',
        layer: {
            id: 'gltg:huc8',
            featureIdKey: 'huc8',
            crs: 900913
        }
    }
};

export const LAYERS = {
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
    ...entries(BOUNDARIES).reduce(
        (boundaryLayers, [boundary, { visible, layer: { id, crs, featureIdKey } }]) => {
            const layer = new VectorTileLayer({
                source: new VectorTileSource({
                    format: new MVT(),
                    url: `${GEOSERVER_URL}/gwc/service/tms/1.0.0/${id}@EPSG:${crs}@pbf/{z}/{x}/{-y}.pbf`,
                    tilePixelRatio: 1
                }),
                visible,
                style: (feature) => getStyle([], feature, featureIdKey, false)
            });
            layer.set('interactive', true);
            boundaryLayers[boundary] = layer;
            return boundaryLayers;
        },
        {}
    )
};

export const YEAR_RANGE = [1980, 2020];

export const INITIAL_FILTERS: Filters = {
    years: YEAR_RANGE,
    boundaryType: 'state',
    selectedBoundaries: []
};
