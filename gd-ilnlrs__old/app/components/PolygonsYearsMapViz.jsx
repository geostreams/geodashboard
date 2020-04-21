/*
 * @flow
 */

import React, {Component} from 'react';
import dashboardStyles from '../styles/dashboard.css';
import BarChart from './SimpleBarChart';
import {
    Button, List, ListItem, MenuItem, Menu, MenuAnchor, Radio, RadioGroup,
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, Icon, Fab
} from 'react-mdc-web';
import {select} from 'd3';
import {Card, CardHeader, CardSubtitle, CardTitle, CardText, Headline} from 'react-mdc-web/lib';
import {Link} from 'react-router';
// $FlowFixMe
import huc from '../../data/HUC-N.geojson';
// $FlowFixMe
import catchment from '../../data/Mockup_Catchments.geojson';
// $FlowFixMe
import drainage from '../../data/il-drainage.geojson';
// $FlowFixMe
import sites from '../../data/il-monitoring-site.geojson';
import data from '../../data/data.json';
import DialogWrapper from "./DialogWrapper";
import styles from "../styles/customStyles.css";
import mapStyles from '../styles/map.css';
import {
    getBoundaryTitle,
    getBoundaryDescription,
    getNutrientTitle,
    getNutrientDescription,
    getContextualLayers
} from "../utils/getConfig";
import marker from '../../public/images/marker.png';
import Carousel from "../components/Carousel";
import {getCarouselImageNames} from "../utils/getConfig";
import {removePopup} from '../utils/mapPopup';


const ol = require('openlayers');
require("openlayers/css/ol.css");

import LayerSwitcher from 'ol3-layerswitcher/src/ol3-layerswitcher';

require('ol3-layerswitcher/src/ol3-layerswitcher.css');

//assign colors to levels for map's styling function
const nutrientLevels = {
    '6': [6, 45, 101, 1],    //poor
    '5': [27, 101, 167, 1],
    '4': [78, 148, 193, 1],
    '3': [147, 189, 212, 1],
    '2': [199, 214, 230, 1],
    '1': [234, 237, 242, 1],  //good
    'none': [234, 237, 242, 1]
};

/*
 * The dashboard component adds layers from json files to a map and
 * adds an on-click event handler. It allows a user to visualize map-related
 * information from clicking different geometries of the map.
 */
class PolygonsYearsMapViz extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            feature: null,
            year: "2017",
            state: "Illinois",
            nutrient: "Nitrogen",
            name: "Overall summary",
            data: data["Nitrogen"]["Overall summary"],
            nutrientValue: data["Nitrogen"]["Overall summary"]["2017"],
            styleCache: {
                "default": new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: [250, 250, 250, 0.6]
                    }),
                    stroke: new ol.style.Stroke({
                        color: [0, 0, 0, 1]
                    })
                })
            },
            map: {},
            layers: {},
            extents: {},
            ilDrainageFeatures: {},
            activeLayer: {},
            patternUrl: '',
            extentDict: {}
        };

        (this: any).featureStyleFunction = this.featureStyleFunction.bind(this);
        (this: any).drainageStyleFunction = this.drainageStyleFunction.bind(this);
        (this: any).getFeatureColorLevel = this.getFeatureColorLevel.bind(this);
        (this: any).changeYear = this.changeYear.bind(this);
        (this: any).changeNutrient = this.changeNutrient.bind(this);
        (this: any).changeBoundary = this.changeBoundary.bind(this);
    }

    state: {
        feature: ol.feature,
        year: string,
        state: string,
        nutrient: string,
        layers: Object,
        name: string,
        data: Object,
        nutrientValue: string,
        styleCache: Object,
        patternUrl: string,
        map: ol.Map,
        layers: ol.layer,
        extents: ol.extent,
        ilDrainageFeatures: Object,
        activeLayer: ol.layer,
        styleCache: any,
        extentDict: any
    };

    //add colors to style cache for faster access and return a level for accessing the nutrientLevels' colors
    getFeatureColorLevel(feature: any) {
        /* Return a level based on the feature's nutrient value. If
         * the style cache does not contain the level's color, add it
          * to the cache. */
        let name = feature.get('Name') || feature.get('Station_ID') || "Undefined";

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
    featureStyleFunction(feature: any) {
        let level = this.getFeatureColorLevel(feature);
        return [this.state.styleCache[level]];
    }

    drainageStyleFunction(feature: any) {
        let name = feature.get('Name') || feature.get('Station_ID') || "Undefined";

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
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: nutrientLevels[level],
                width: 4
            }),
        });
    }

    static loadGeoJSONLayer(url: any, name: any, style) {
        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url,
                format: new ol.format.GeoJSON({
                    defaultDataProjection: "EPSG:4326",
                    projection: "EPSG:3857"
                })
            }),
            name,
            style
        });
    }

    //add layers from json files, add selection layer, add onClick handler to map
    componentDidMount() {

        let theMap;
        const hucLayer = PolygonsYearsMapViz.loadGeoJSONLayer(huc, 'huc', this.featureStyleFunction);
        const catchmentLayer = PolygonsYearsMapViz.loadGeoJSONLayer(catchment, 'catchment', this.featureStyleFunction);
        const drainageLayer = PolygonsYearsMapViz.loadGeoJSONLayer(drainage, 'drainage', this.featureStyleFunction);
        const sitesLayer = PolygonsYearsMapViz.loadGeoJSONLayer(
            sites,
            'sites',
            new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    opacity: 1.00,
                    scale: 0.08,
                    src: marker
                }))
            })
        );

        let selectionLayer = new ol.layer.Vector({
            name: "selection",
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: "red",
                    width: 4
                })
            })
        });

        // Default Display Value
        let baseOSM = new ol.layer.Tile({
            type: "base",
            visible: true,
            title: "OSM",
            source: new ol.source.OSM()
        });

        let baseCarto = new ol.layer.Tile({
            type: "base",
            visible: false,
            title: "Carto",
            source: new ol.source.XYZ({
                url: 'https://{a-d}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png'
            })
        });

        let baseTopo = new ol.layer.Tile({
            type: "base",
            visible: false,
            title: "Topo",
            source: new ol.source.XYZ({
                attributions: 'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        });

        let baseWorld = new ol.layer.Tile({
            type: "base",
            visible: false,
            title: "World",
            source: new ol.source.XYZ({
                attributions: 'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a> — ' +
                    'National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, ' +
                    'NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            })
        });

        //pattern for when there is no data
        const canvas = document.createElement('canvas') || {};
        const context = canvas.getContext('2d') || {};
        let pattern = (function () {
            canvas.width = 8;
            canvas.height = 8;
            // white background
            context.fillStyle = 'white';
            context.fillRect(0, 0, canvas.width, canvas.height);
            // lines
            context.strokeStyle = 'rgba(102, 0, 102)';
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(30, 15);
            context.stroke();
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

        const contextualLayers = getContextualLayers().map(({title, url, id}) => new ol.layer.Image({
            title,
            source: new ol.source.ImageWMS({
                url,
                params: {'LAYERS': id},
            }),
            visible: true
        }));

        let container: any = document.getElementById('popup');
        let content: any = document.getElementById('popup-content');
        let closer: any = document.getElementById('popup-closer');

        let overlay = new ol.Overlay({
            id: "marker",
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        theMap = new ol.Map({
            target: this.refs.map,
            layers: [
                new ol.layer.Group({title: "Base Maps", layers: [baseCarto, baseOSM, baseTopo, baseWorld]}),
                new ol.layer.Group({title: "Layers", layers: contextualLayers}),
                hucLayer,
                catchmentLayer,
                drainageLayer,
                selectionLayer,
                sitesLayer
            ],
            overlays: [overlay],
            view: new ol.View({
                projection: 'EPSG:3857',
                center: [-9972968, 4972295],
                zoom: 7,
                maxZoom: 10,
                minZoom: 5,
            })
        });

        const layerSwitcher = new LayerSwitcher();
        theMap.addControl(layerSwitcher);

        // For Map Cursor Style
        theMap.on('pointermove', (event) => {
            let feature_pointer = theMap.forEachFeatureAtPixel(event.pixel, function (feature) {
                return feature;
            });

            if (!feature_pointer) {
                return null;
            }

            if (feature_pointer.get("interactive") !== undefined) {
                if (!feature_pointer.get("interactive")) {
                    theMap.getViewport().style.cursor = '';
                } else {
                    theMap.getViewport().style.cursor = 'pointer';
                }
            }
        });

        //since we want to display one layer at a time, set the all other layers to invisible
        theMap.on('click', this.handleMapClick.bind(this));

        // For Map Icon Popups
        theMap.on('click', (event) => {
            let feature_popup = theMap.forEachFeatureAtPixel(event.pixel, function (feature) {
                return feature;
            });

            if (feature_popup) {
                overlay.setPosition(event.coordinate);
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });

        theMap.on('changebaselayer', (event) => {
            console.log("changing");
        });

        //this dictionary will be used for switching between layers
        let layerDict = {};
        layerDict["huc"] = hucLayer;
        layerDict["watershed"] = catchmentLayer;
        layerDict["drainage"] = drainageLayer;
        layerDict["sites"] = sitesLayer;
        layerDict["selection"] = selectionLayer;

        //this dictionary will be used for zooming and centering into different layers
        this.state.extentDict = {};

        const layersState = {};
        hucLayer.getSource().on("change", () => {
            if (!layersState["huc"] && hucLayer.getSource().getState() === "ready") {
                const extent = hucLayer.getSource().getExtent();
                this.state.extentDict["huc"] = extent;
                theMap.getView().fit(extent, theMap.getSize());
                theMap.getView().setZoom(theMap.getView().getZoom() - 1);
                hucLayer.setVisible(false);
                layersState["huc"] = true;
            }
        });
        catchmentLayer.getSource().on("change", () => {
            if (!layersState["watershed"] && hucLayer.getSource().getState() === "ready") {
                this.state.extentDict["watershed"] = catchmentLayer.getSource().getExtent();
                catchmentLayer.setVisible(false);
                layersState["watershed"] = true;
            }
        });
        //this dictionary will be used to highlight the drainage polygons since only the site's markers are interactive
        this.state.ilDrainageFeatures = {};
        drainageLayer.getSource().on("change", () => {
            if (!layersState["drainage"] && hucLayer.getSource().getState() === "ready") {
                this.state.extentDict["drainage"] = drainageLayer.getSource().getExtent();
                let ilDrainageFeatures = drainageLayer.getSource().getFeatures();
                ilDrainageFeatures.forEach((element) => {
                    this.state.ilDrainageFeatures[element["H"]["Station_ID"]] = element;
                });
                layersState["drainage"] = true;
            }
        });

        this.setState({
            layers: layerDict,
            activeLayer: drainageLayer,
            styleCache: featureStyles,
            patternUrl: patternUrl,
            map: theMap
        });

        // Show Current Year Value on Load
        let idVal = this.state.year.toString();
        let initialActiveYear = document.getElementById(idVal);
        if (initialActiveYear) {
            initialActiveYear.scrollIntoView();
            window.scrollTo(0, 0);
        }
    }

    //get the feature from the click event, update the state, amd add the feature to the selection layer
    async handleMapClick(event: Object) {
        let feature = this.state.map.forEachFeatureAtPixel(event.pixel, function (feature) {
            return feature;
        });

        if (!feature) {
            return null;
        }

        if (feature.get("interactive") !== undefined) {
            if (!feature.get("interactive")) {
                return null;
            } else {
                //for now this means that the user selected a site, and we need to highlight the corresponding polygon
                feature = this.state.ilDrainageFeatures[feature.get('Station_ID')];
            }
        }

        // deselect polygon
        if (feature === this.state.feature) {
            this.state.layers["selection"].getSource().clear();
            this.setState({
                feature: null,
                name: "Overall summary",
                data: data[this.state.nutrient]["Overall summary"],
                nutrientValue: data[this.state.nutrient]["Overall summary"][this.state.year],
            });
            return;
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
    changeYear(event: Object) {
        let nutrientValue = "none";
        if (data && this.state.name !== "None selected") {
            nutrientValue = data[this.state.nutrient][this.state.name][event.target.value] || "-1";
        }
        this.setState({
            year: event.target.value,
            nutrientValue: nutrientValue
        }, this.state.activeLayer.getSource().changed());

        removePopup(this.state.map);
    }

    //update the state with the new nutrient and force a map update
    changeNutrient(event: Object) {
        let nutrientValue = "none";
        if (data && this.state.name !== "None selected") {
            nutrientValue = data[event.target.value][this.state.name][this.state.year] || "-1";
        }
        this.setState({
            nutrient: event.target.value,
            nutrientValue: nutrientValue,
            data: data[event.target.value][this.state.name]
        }, this.state.activeLayer.getSource().changed());

        removePopup(this.state.map);
    }

    //change the active layer, clear selection layer, and force a map update
    changeBoundary(event: Object) {
        this.state.layers["selection"].getSource().clear();
        this.state.activeLayer.setVisible(false);
        this.state.layers[event.target.value].setVisible(true);

        if (event.target.value === "drainage") {
            this.state.layers["sites"].setVisible(true);
        } else {
            this.state.layers["sites"].setVisible(false);
        }

        this.state.map.getView().fit(this.state.extentDict[event.target.value], this.state.map.getSize());

        this.setState({
            activeLayer: this.state.layers[event.target.value],
            feature: null,
            name: "Overall summary",
            data: data[this.state.nutrient]["Overall summary"],
            nutrientValue: data[this.state.nutrient]["Overall summary"][this.state.year],
        }, this.state.activeLayer.getSource().changed());

        removePopup(this.state.map);
    }

    static scrollLeft() {
        let listScroll: any = document.getElementById("listScroll");
        if (listScroll) {
            listScroll.scrollLeft += -200;
        }
    }

    static scrollRight() {
        let listScroll: any = document.getElementById("listScroll");
        if (listScroll) {
            listScroll.scrollLeft += 200;
        }
    }

    render() {

        let carousel = '';
        if (getCarouselImageNames().length > 0) {
            carousel = <Carousel/>;
        }

        let nutrientVal = parseFloat(this.state.nutrientValue);

        // Years for the Buttons
        let years = [
            1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
            1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
            2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
        const yearsOptions = years.slice(0).reverse().map((y) => (
            <option value={y.toString()} key={y.toString()}>
                {y.toString()}
            </option>
        ));

        let positive_val = <Icon style={{transform: 'rotate(-90deg)', fontSize: 'small', color: '#ff0000'}}
                                 name="play_arrow"/>;
        let negative_val = <Icon style={{transform: 'rotate(90deg)', fontSize: 'small', color: '#1e90ff'}}
                                 name="play_arrow"/>;
        let nitrogen_val = <Icon style={{fontSize: 'small'}} name="fiber_manual_record"/>;
        let phosphorus_val = <Icon style={{fontSize: 'small'}} name="fiber_manual_record"/>;

        let nitrogenLevelNewest = parseFloat(data["Nitrogen"][this.state.name.toString()]["2017"]) || 0.0;
        let nitrogenLevelPrevious = parseFloat(data["Nitrogen"][this.state.name.toString()]["2016"]) || 0.0;
        if (nitrogenLevelNewest > nitrogenLevelPrevious) {
            nitrogen_val = positive_val;
        }
        if (nitrogenLevelNewest < nitrogenLevelPrevious) {
            nitrogen_val = negative_val;
        }

        let phosphorusLevelNewest = parseFloat(data["Phosphorus"][this.state.name.toString()]["2017"]) || 0.0;
        let phosphorusLevelPrevious = parseFloat(data["Phosphorus"][this.state.name.toString()]["2016"]) || 0.0;
        if (phosphorusLevelNewest > phosphorusLevelPrevious) {
            phosphorus_val = positive_val;
        }
        if (phosphorusLevelNewest < phosphorusLevelPrevious) {
            phosphorus_val = negative_val;
        }

        return (
            <div>
                <div>
                    <Card id="headerCardDiv" style={{height: "10hv", width: "100%"}}>
                        {/*Forms for selecting the boundary, nutrient, or year. */}
                        <div className={dashboardStyles.customRow}
                             style={{height: "25%", backgroundColor: "#FAFAFA"}}>
                            <div className={dashboardStyles.column}>
                                <div>
                                    <span className={styles.customInfoBoxes}>Boundary Type</span>
                                    <DialogWrapper customStyle={styles.customInfoBoxes}
                                                   title={getBoundaryTitle()}
                                                   body={getBoundaryDescription()}
                                    />
                                </div>

                                <form style={{width: "250px"}}>
                                    <label>
                                        <select onChange={this.changeBoundary}
                                                className={dashboardStyles["select-css"]}>
                                            <option value="drainage">IL Drainage</option>
                                            <option value="huc">HUC-8 Boundaries</option>
                                            <option value="watershed">Watershed Boundaries</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                            <div className={dashboardStyles.column}>
                                <div>
                                    <span className={styles.customInfoBoxes}>Nutrient</span>
                                    <DialogWrapper customStyle={styles.customInfoBoxes}
                                                   title={getNutrientTitle()}
                                                   body={getNutrientDescription()}
                                    />
                                </div>

                                <form style={{width: "250px"}}>
                                    <label>
                                        <select onChange={this.changeNutrient}
                                                className={dashboardStyles["select-css"]}>
                                            <option value="Nitrogen">Nitrogen</option>
                                            <option value="Phosphorus">Phosphorus</option>
                                        </select>
                                    </label>
                                </form>
                            </div>
                            <div className={dashboardStyles.column + ' ' + dashboardStyles.columnYearsList}>
                                <div className={styles.customInfoBoxes}>Year</div>

                                <form style={{width: "250px"}}>
                                    <label>
                                        <select onChange={this.changeYear}
                                                className={dashboardStyles["select-css"]}>
                                            {yearsOptions}
                                        </select>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card id="infoCardDiv" className={dashboardStyles.infoCard}>
                        <div className={dashboardStyles.customRow + ' ' + dashboardStyles.customRowCard}>

                            {/*Display the state and feature's name*/}
                            <div style={{height: "5%", minHeight: "30px"}}>
                                <CardHeader>
                                    <CardTitle>
                                        <div className={dashboardStyles.cardTitleStyling}>
                                            <span> {this.state.state.toUpperCase()} > </span>
                                            <span className={dashboardStyles.cardTitleStylingColor}>
                                                {this.state.name}
                                            </span>
                                        </div>
                                    </CardTitle>
                                </CardHeader>

                                {/*This div is for showing the nutrient's values. It has several rectangles that are set to
                                    visible/invisible according to the nutrient's value. */}
                                <CardSubtitle>
                                    <span className={dashboardStyles.cardSubtitle}>
                                        YEARLY AVERAGE - {this.state.year}
                                        <hr style={{margin: "0"}}/>
                                    </span>
                                </CardSubtitle>

                                <CardText>
                                    <svg width="500" height="150">
                                        <g>
                                            <text x="45" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal < 5 && nutrientVal >= 0 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="45" y="75" className={dashboardStyles.infoText}> {"<5"}</text>
                                            <rect x="20" y="35" width="65" height="25" fill="#EAEDF2"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="20" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal < 5 && nutrientVal >= 0 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <text x="115" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 5 && nutrientVal < 10 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="105" y="75" className={dashboardStyles.infoText}> {"5-9.99"}</text>
                                            <rect x="90" y="35" width="65" height="25" fill="#C7D6E6"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="90" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 5 && nutrientVal < 10 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <text x="185" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 10 && nutrientVal < 15 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="165" y="75"
                                                  className={dashboardStyles.infoText}> {"10-14.99"}</text>
                                            <rect x="160" y="35" width="65" height="25" fill="#93BDD4"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="160" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 10 && nutrientVal < 15 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <text x="255" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 15 && nutrientVal < 20 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="233" y="75"
                                                  className={dashboardStyles.infoText}> {"15-19.99"}</text>
                                            <rect x="230" y="35" width="65" height="25" fill="#4D94C1"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="230" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 15 && nutrientVal < 20 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <text x="325" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 20 && nutrientVal < 25 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="305" y="75"
                                                  className={dashboardStyles.infoText}> {"20-24.99"}</text>
                                            <rect x="300" y="35" width="65" height="25" fill="#1B64A7"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="300" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 20 && nutrientVal < 25 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <text x="400" y="30" className={dashboardStyles.heavy} fill="black"
                                                  visibility={nutrientVal >= 25 ? "visible" : "hidden"}>
                                                {this.state.nutrientValue}
                                            </text>
                                            <text x="375" y="75"
                                                  className={dashboardStyles.infoText}> {">25 lb/acre"}</text>
                                            <rect x="370" y="35" width="65" height="25" fill="#062D64"
                                                  fillOpacity={1}>
                                            </rect>
                                            <rect x="370" y="0" width="65" height="60" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal >= 25 && this.state.name !== "Overall summary" ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                        <g>
                                            <svg x="20" y="100" width="650" height="650">
                                                <image href={this.state.patternUrl} height="25" width="65"/>
                                            </svg>
                                            <text x="90" y="117" className={dashboardStyles.infoText}>
                                                No Data - Avg. of Surrounding Watersheds
                                            </text>
                                            <rect x="20" y="100" width="130" height="30" fill="rgba(53, 204, 255, 0)"
                                                  fillOpacity="0" stroke="red" strokeWidth={3}
                                                  visibility={nutrientVal < 5 && nutrientVal < 0 ? "visible" : "hidden"}>
                                            </rect>
                                        </g>
                                    </svg>
                                </CardText>

                                {/*Show the graph of the nutrient values across the years.*/}
                                <CardSubtitle>
                                    <span className={dashboardStyles.cardSubtitle}>
                                        ANNUAL {this.state.nutrient.toUpperCase()} YIELD 1980-2017
                                        <hr style={{margin: "0"}}/>
                                    </span>
                                </CardSubtitle>

                                <CardText>
                                    <BarChart
                                        data={Object.entries(this.state.data).map(([year, value]) => ({
                                            year,
                                            value,
                                            selected: this.state.year === year
                                        }))}
                                        xAxisProps={{
                                            key: 'year',
                                            title: 'Year',
                                            stroke: '#4682b4'
                                        }}
                                        yAxisProps={{
                                            key: 'value',
                                            title: 'lb/acre',
                                            stroke: '#4682b4'
                                        }}
                                        barStroke={(d) => d.selected ? 'red' : '#4682b4'}
                                        barStrokeWidth={'2'}
                                        barStrokeOpacity={(d) => d.selected ? 1 : 0}
                                        mouseOver={(d, idx, rects) => {
                                            select(rects[idx]).attr('fill', 'brown')
                                        }}
                                        mouseOut={(d, idx, rects) => {
                                            select(rects[idx]).attr('fill', '#4682b4')
                                        }}
                                        tooltipContent={(d) => `${d.value} lb/acre`}
                                        width={450}
                                        height={235}
                                    />
                                </CardText>

                                <CardText className={styles.custom_carousel_holder}>
                                    <div>
                                        <Headline className={styles.custom_carousel_title}>
                                            Learn More About ILNLRS
                                            <Link className={styles.custom_carousel_link}
                                                  href={"public/pages/datastories.html"}>
                                                View All Data Stories
                                            </Link>
                                        </Headline>
                                        {carousel}
                                    </div>
                                </CardText>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card>
                    <span ref="map" className={dashboardStyles.map}>

                    </span>

                    <div id="popup" className={mapStyles.olPopup + ' ' + styles.custom_popup}>
                        <a href="#" id="popup-closer"
                           className={mapStyles.olPopupCloser + ' ' + styles.custom_popup_closer}>
                            <Icon name="close"/>
                        </a>
                        <div id="popup-content">
                            <span className={styles.custom_popup_title}> {this.state.name} </span><br/>
                            <span>XXXX Contributing Waterways</span><br/>
                            <span>XXXX Cumulative Acres</span><br/>
                            <span>Nitrogen Trend {nitrogen_val}</span><br/>
                            <span>Phosphorus Trend {phosphorus_val}</span><br/>
                        </div>
                    </div>
                </Card>
            </div>);
    }

}

export default PolygonsYearsMapViz;