import React, {Component} from 'react'
let ol = require('openlayers');
require("openlayers/css/ol.css");
import type { Sensors } from '../utils/flowtype'

class MiniMap extends Component {

    constructor(props: MapProps) {
        super(props);
    }

    render() {
        return (

            <div>
            <div id='map' className="map" style={{"height":"200px", "width":"100%"}}></div>
            <div style={{display: "none"}}>
                <a className="overlay" id="vienna" target="_blank" href="http://en.wikipedia.org/wiki/Vienna">Vienna</a>
                <div id="marker" title="Marker" className="marker"></div>
            </div>
        </div>);
    }

    getColor(source:string):string {
        var sourcecolor = window.configruntime.gd3.sourcecolor;
        return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
    }

    componentDidMount() {
        // TODO: chnage the center of map and the color of the point.
        let feature = new ol.Feature({
            geometry: new ol.geom.Point([0, 1])
        });
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
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
                })
            }),
            vectorLayer
        ];
        var map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                center: [0,1],
                zoom: 5
            }),
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            })
        });
    }
}

export default MiniMap
