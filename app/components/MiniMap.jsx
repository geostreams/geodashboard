/*
 * @flow
 */

import React, {Component} from 'react';
import ol from 'openlayers';

require("openlayers/css/ol.css");
import {getColor, getMapTileURLSetting, mapMiniMinZoom} from '../utils/getConfig';
import {getAttribution, getMiniControls} from '../utils/mapUtils';
import type {MapProps} from '../utils/flowtype';


class MiniMap extends Component {

    constructor(props: MapProps) {
        super(props);
    }

    render() {
        return (
            <div id='miniMap' className="miniMap" style={{"height": "200px", "width": "100%"}}/>
        );
    }

    static getColor(source: string): string {
        let sourcecolor = window.configruntime.gd3.sourcecolor;
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    componentDidMount() {

        let {center, sensor} = this.props;

        let feature = new ol.Feature({
            geometry: new ol.geom.Point(center).transform('EPSG:4326', 'EPSG:3857')
        });

        let featureColor = getColor(sensor.properties.type.id);
        let iconSvg = '<svg width="15" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg">'
            + '<g class="marker-g">'
            + '<path d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke="black" stroke-width="1" fill="white" />'
            + '	<ellipse cx="7.5" cy="8.5" rx="4.5" ry="5.5" class="map-pin-color" style="fill:' +
            featureColor + '"/>'
            + '<path class="mouseCapture" d="M 1 11 A 7 7.5 0 1 1 14 11 L 7.5 25 z" stroke-width="1" opacity="0"/>'
            + '</g>'
            + '</svg>';

        feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(iconSvg),
                scale: 1.0
            })
        }));

        let vectorSource = new ol.source.Vector({
            features: [feature]
        });

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        let layers = [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: getAttribution(),
                    url: getMapTileURLSetting()
                })
            }),
            vectorLayer
        ];

        new ol.Map({
            target: 'miniMap',
            layers: layers,
            view: new ol.View({
                projection: 'EPSG:3857',
                center: ol.proj.fromLonLat(this.props.center),
                zoom: 5,
                minZoom: mapMiniMinZoom()
            }),
            controls: getMiniControls()
        });

    }

}

export default MiniMap;
