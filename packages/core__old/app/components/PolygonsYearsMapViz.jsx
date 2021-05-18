/*
 * @flow
 */

import React, {Component} from 'react';

const ol = require('openlayers');
require("openlayers/css/ol.css");

import dashboardStyles from '../styles/dashboard.css';
import SimpleLineGraph from './SimpleLineGraph';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor, Radio, RadioGroup
} from 'react-mdc-web';
import {Card, CardTitle, CardText} from 'react-mdc-web/lib';

// import huc from '../../data/HUC-N.json';
// import catchment from '../../data/Mockup_Catchments.json';
// import data from '../../data/data.json';

const hucFeatures = (new ol.format.GeoJSON()).readFeatures(huc, {
    featureProjection: "EPSG:3857"
});

const catchmentFeatures = (new ol.format.GeoJSON()).readFeatures(catchment, {
    featureProjection: "EPSG:3857"
});


//assign colors to levels for map's styling function
const nutrientLevels = {
    '6': [6, 45, 101, 1],    //poor
    '5': [27, 101, 167, 1],
    '4': [78, 148, 193, 1],
    '3': [147, 189, 212, 1],
    '2': [199, 214, 230, 1],
    '1': [234, 237, 242, 1]  //good
};

/*
 * The dashboard component adds layers from json files to a map and
 * adds an on-click event handler. It allows a user to visualize map-related
 * information from clicking different geometries of the map.
 */
class PolygonsYearsMapViz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: [-9622580.662999934, 4859883.547491538],
            feature: null,
            year: "2017",
            state: "Illinois",
            nutrient: "Nitrogen",
            layers: {},
            name: "None selected",
            data: {},
            nutrientValue: "none",
            styleCache: {
                "default": new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: [250, 250, 250, 0.6]
                    }),
                    stroke: new ol.style.Stroke({
                        color: [0, 0, 0, 1]
                    })
                })
            }
        };

        this.featureStyleFunction = this.featureStyleFunction.bind(this);
        this.getFeatureColorLevel = this.getFeatureColorLevel.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeNutrient = this.changeNutrient.bind(this);
        this.changeBoundary = this.changeBoundary.bind(this);
    }

    //add colors to style cache for faster access and return a level for accessing the nutrientLevels' colors
    getFeatureColorLevel(feature) {
        /* Return a level bases on the feature's nutrient value. If
         * the style cache does not contain the level's color, add it
          * to the cache. */
        let name = feature.get('Name');
        let nitrogenLevel = parseFloat(data[this.state.nutrient][name][this.state.year]) || 0.0;

        let level = "";
        if (nitrogenLevel < 0) {
            level = "none";
        } else if (nitrogenLevel < 5) {
            level = "1";
        } else if (nitrogenLevel < 10) {
            level = "2";
        } else if (nitrogenLevel < 15) {
            level = "3";
        } else if (nitrogenLevel < 20) {
            level = "4";
        } else if (nitrogenLevel < 25) {
            level = "5";
        } else {
            level = "6";
        }

        if (!level) {
            return "default";
        }

        if (!this.state.styleCache[level]) {
            let featureStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: nutrientLevels[level]
                }),
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1]
                }),
            });
            let featureStyles = this.state.styleCache;
            featureStyles[level] = featureStyle;
            this.setState({styleCache: featureStyles}, function () {
                console.log("done!")
            });
        }
        return level;

    }

    //return a color based on the feature's nutrient value and the state's nutrient and year
    featureStyleFunction(feature) {
        let level = this.getFeatureColorLevel(feature);
        return [this.state.styleCache[level]];
    }

    //add layers from json files, add selection layer, add onClick handler to map
    componentDidMount() {
        let vectorSource = new ol.source.Vector({
            features: hucFeatures
        });

        let vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            name: "huc8",
            style: this.featureStyleFunction
        });

        let vectorSource1 = new ol.source.Vector({
            features: catchmentFeatures
        });

        let vectorLayer1 = new ol.layer.Vector({
            source: vectorSource1,
            name: "catchment",
            style: this.featureStyleFunction
        });

        let selectionSource = new ol.source.Vector();
        let selectionLayer = new ol.layer.Vector({
            name: "selection",
            source: selectionSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "red",
                    width: 4
                })
            })
        });

        let raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        let pattern = (function() {
            canvas.width = 8;
            canvas.height = 8;
            // white background
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            // outer circle
            context.fillStyle = 'rgba(102, 0, 102, 0.5)';
            context.beginPath();
            context.arc(4, 4, 3 , 0, 2 * Math.PI);
            context.fill();
            // inner circle
            context.fillStyle = 'rgb(55, 0, 170)';
            context.beginPath();
            context.arc(4, 4, 1.5 , 0, 2 * Math.PI);
            context.fill();
            return context.createPattern(canvas, 'repeat');
        }());
        let patternUrl = canvas.toDataURL();
        let patternStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: pattern
            })
        });
        let featureStyles = this.state.styleCache;
        featureStyles["none"] = patternStyle;
        this.setState({styleCache: featureStyles, patternUrl: patternUrl}, function () {
            console.log("done!")
        });

        let map = new ol.Map({
            target: this.refs.map,
            layers: [raster, vectorLayer, vectorLayer1, selectionLayer],
            view: new ol.View({
                projection: 'EPSG:3857',
                center: this.state.center,
                zoom: 7,
                maxZoom: 10,
                minZoom: 5,
            })
        });

        //since we want to display one layer at a time, set the second added layer to invisible
        vectorLayer1.setVisible(false);
        map.on('click', this.handleMapClick.bind(this));

        //this dictionary will be used for switching between layers
        let layerDict = {};
        layerDict["huc"] = vectorLayer;
        layerDict["watershed"] = vectorLayer1;
        layerDict["selection"] = selectionLayer;

        this.setState({
            map: map,
            layers: layerDict,
            activeLayer: vectorLayer
        });

    }

    //get the feature from the click event, update the state, amd add the feature to the selection layer
    async handleMapClick(event) {
        let feature = this.state.map.forEachFeatureAtPixel(event.pixel, function (feature) {
            return feature;
        });

        if (!feature) {
            return null;
        }

        let name = feature.get('Name') || feature.get('Station_ID') || "Undefined";

        let nutrientValue = data[this.state.nutrient][name][this.state.year] || "-1";

        this.setState({
            feature: feature,
            name: name,
            nutrientValue: nutrientValue,
            data: data[this.state.nutrient][name]
        });

        let newFeature = feature.clone();
        this.state.layers["selection"].getSource().clear();
        this.state.layers["selection"].getSource().addFeature(newFeature);
    }

    //update the state with the new year and force a map update
    changeYear(event) {
        let nutrientValue = "none";
        if (data && this.state.name !== "None selected") {
            nutrientValue = data[this.state.nutrient][this.state.name][event.target.value] || "-1";
        }
        this.setState({
            year: event.target.value,
            nutrientValue: nutrientValue
        }, this.state.activeLayer.getSource().changed());

    }

    //update the state with the new nutrient and force a map update
    changeNutrient(event) {
        let nutrientValue = "none";
        if (data && this.state.name !== "None selected") {
            nutrientValue = data[event.target.value][this.state.name][this.state.year] || "-1";
        }
        this.setState({
            nutrient: event.target.value,
            nutrientValue: nutrientValue,
            data: data[event.target.value][this.state.name]
        }, this.state.activeLayer.getSource().changed());
    }

    //change the active layer, clear selection layer, and force a map update
    changeBoundary(event) {
        this.state.layers["selection"].getSource().clear();
        this.state.activeLayer.setVisible(false);
        this.state.layers[event.target.value].setVisible(true);

        this.setState({
            activeLayer: this.state.layers[event.target.value],
            feature: null,
            name: "None selected",
            data: {},
            nutrientValue: "none"
        }, this.state.activeLayer.getSource().changed());
    }

    render() {
        let width = 465, height = 235, margin = 35;
        let nutrientVal = parseFloat(this.state.nutrientValue);
        return (
            <div>
                <div>
                    <Card id="headerCardDiv" style={{height: "10hv", width: "100%"}}>
                        {/*Forms for selecting the boundary, nutrient, or year. */}
                        <div className={dashboardStyles.customRow}
                             style={{height: "25%", backgroundColor: "#FAFAFA"}}>
                            <div className={dashboardStyles.column}>
                                Boundary Type (i)
                                <form onChange={this.changeBoundary} style={{width: "250px"}}>
                                    <label>
                                        <select onChange={this.changeBoundary}
                                                className={dashboardStyles["select-css"]}>
                                            <option value="huc">HUC-8 Boundaries</option>
                                            <option value="watershed">Watershed Boundaries</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                            <div className={dashboardStyles.column}>
                                Nutrient (i)
                                <form onChange={this.changeNutrient} style={{width: "200px"}}>
                                    <label>
                                        <select onChange={this.changeNutrient}
                                                className={dashboardStyles["select-css"]}>
                                            <option value="Nitrogen">Nitrogen</option>
                                            <option value="Phosphorus">Phosphorus</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                            <div className={dashboardStyles.column}
                                 style={{height: "5%", minHeight: "30px", padding: "0"}}>
                                <div className={dashboardStyles["button-group"]}
                                     style={{width: "100%", borderBottom: "1px solid #3E80AA"}}>
                                    <button type="submit" onClick={this.changeYear} value="2008"
                                            style={this.state.year === "2008" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2008
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2009"
                                            style={this.state.year === "2009" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2009
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2010"
                                            style={this.state.year === "2010" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2010
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2011"
                                            style={this.state.year === "2011" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2011
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2012"
                                            style={this.state.year === "2012" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2012
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2013"
                                            style={this.state.year === "2013" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2013
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2014"
                                            style={this.state.year === "2014" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2014
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2015"
                                            style={this.state.year === "2015" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2015
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2016"
                                            style={this.state.year === "2016" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2016
                                    </button>
                                    <button type="submit" onClick={this.changeYear} value="2017"
                                            style={this.state.year === "2017" ? {
                                                backgroundColor: "#384B59",
                                                color: "white"
                                            } : {}}> 2017
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card id="infoCardDiv" className={dashboardStyles.infoCard}>
                        <div className={dashboardStyles.customRow}
                             style={{height: "100%", overflowY: "scroll", padding: "0px"}}>

                            {/*Display the state and feature's name*/}
                            <div className={dashboardStyles.customRow} style={{height: "5%", minHeight: "30px"}}>
                                <CardTitle>
                                    <div style={{color: "#E05769", fontSize: "1.3em", fontWeight: "450"}}>
                                        ILLINOIS > {this.state.name}
                                    </div>
                                </CardTitle>
                            </div>
                            {/*This div is for showing the nutrient's values. It has several rectangles that are set to
                            visible/invisible according to the nutrient's value. */}
                            <div className={dashboardStyles.row} style={{height: "25%", minHeight: "100px"}}>
                                <CardTitle>
                                    <div className={dashboardStyles.cardSubtitle}>
                                        YEARLY AVERAGE - {this.state.year}
                                        <hr style={{width: "100%"}}/>
                                    </div>
                                    <svg width="500" height="180">
                                        <g>
                                            <text x="45" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal < 5 && nutrientVal >= 0 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="20" y="20" fontFamily="Verdana" fontSize="15" fill="black" fillOpacity={1}>Good
                                            </text>
                                            <text x="45" y="75" className={dashboardStyles.infoText}> {"<5"}</text>
                                            <rect x="20" y="35" width="65" height="25" fill="#EAEDF2"
                                                  fillOpacity={1}></rect>
                                            <rect x="20" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal < 5 && nutrientVal >= 0 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <text x="115" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 5 && nutrientVal < 10 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="105" y="75"className={dashboardStyles.infoText}> {"5-9.99"}</text>
                                            <rect x="90" y="35" width="65" height="25" fill="#C7D6E6"
                                                  fillOpacity={1}></rect>
                                            <rect x="90" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 5 && nutrientVal < 10 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <text x="185" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 10 && nutrientVal < 15 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="165" y="75" className={dashboardStyles.infoText}> {"10-14.99"}</text>
                                            <rect x="160" y="35" width="65" height="25" fill="#93BDD4"
                                                  fillOpacity={1}></rect>
                                            <rect x="160" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 10 && nutrientVal < 15 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <text x="255" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 15 && nutrientVal < 20 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="233" y="75" className={dashboardStyles.infoText}> {"15-19.99"}</text>
                                            <rect x="230" y="35" width="65" height="25" fill="#4D94C1"
                                                  fillOpacity={1}></rect>
                                            <rect x="230" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 15 && nutrientVal < 20 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <text x="325" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 20 && nutrientVal < 25 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="305" y="75" className={dashboardStyles.infoText}> {"20-24.99"}</text>
                                            <rect x="300" y="35" width="65" height="25" fill="#1B64A7"
                                                  fillOpacity={1}></rect>
                                            <rect x="300" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 20 && nutrientVal < 25 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <text x="395" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 25 ? "visible" : "hidden"}>{this.state.nutrientValue}</text>
                                            <text x="390" y="20" fontFamily="Verdana" fontSize="15" fill="black" fillOpacity={1}>Poor
                                            </text>
                                            <text x="385" y="75" className={dashboardStyles.infoText}> {">25 lb/acre"}</text>
                                            <rect x="370" y="35" width="65" height="25" fill="#062D64"
                                                  fillOpacity={1}></rect>
                                            <rect x="370" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 25 ? "visible" : "hidden"}></rect>
                                        </g>
                                        <g>
                                            <svg x="20" y="100" width="650" height="650">
                                                <image href={this.state.patternUrl} height="25" width="65" />
                                            </svg>
                                            <text x="90" y="117" className={dashboardStyles.infoText}> No Data - Avg. of Surrounding Watersheds
                                            </text>
                                            <rect x="20" y="100" width="130" height="30" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal < 5 && nutrientVal < 0 ? "visible" : "hidden"}></rect>
                                        </g>
                                    </svg>

                                </CardTitle>
                            </div>
                            {/*Show the graph of the nutrient values across the years.*/}
                            <div className={dashboardStyles.row} style={{minHeight: "150px"}}>
                                <CardTitle>
                                    <div className={dashboardStyles.cardSubtitle}>
                                        10 YEAR AVERAGES FOR {this.state.nutrient.toUpperCase()}
                                        <hr style={{width: "100%"}}/>
                                    </div>
                                </CardTitle>
                                <CardText>
                                    <SimpleLineGraph data_dict={this.state.data} width={width} height={height} margin={margin}
                                                     year={this.state.year}/>
                                </CardText>
                            </div>
                        </div>
                    </Card>
                </div>
                <div ref="map" className={dashboardStyles.map}></div>
            </div>);
    }
}


export default PolygonsYearsMapViz;