import React, {Component} from 'react';
let ol = require('openlayers');
require("openlayers/css/ol.css");
import {getMapTileURLSetting} from '../utils/getConfig';
import {getAttribution, getMiniControls} from '../utils/mapUtils';

class MiniMap extends Component {

    constructor(props: MapProps) {
        super(props);
    }

    render() {
        return (
            <div>
            <div id='map' className="map" style={{"height":"200px", "width":"100%"}}> </div>
            <div style={{display: "none"}}>
                <a className="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
                <div id="marker" title="Marker" className="marker"> </div>
            </div>
        </div>);
    }

    getColor(source:string):string {
        let sourcecolor = window.configruntime.gd3.sourcecolor;
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    componentDidMount() {

        let sensor_geom = this.props.center;

        let feature = new ol.Feature({
            geometry: new ol.geom.Point(sensor_geom)
        });
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

        feature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({color:'#467A9E' }),
                stroke: new ol.style.Stroke({color: '#467A9E', width: 1})
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

        let lonLat = this.props.center;
        let webMercator = ol.proj.fromLonLat(lonLat);

        let map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                projection: 'EPSG:3857',
                center: webMercator,
                zoom: 5
            }),
            controls: getMiniControls()
        });
    }
}

export default MiniMap;