/*
 * @flow
 */

import ol from 'openlayers';

export function drawHelper(copyOfMap: ol.Map, display_trends: boolean){

    let add_button = document.getElementById('addButton');
    if (add_button) {
        add_button.addEventListener('click', clickedAddButton);
    }

    let draw_buttons_group = document.getElementsByClassName('drawing_buttons');

    let draw_radio = document.getElementById('draw');
    if (draw_radio) {
        draw_radio.addEventListener('click', clickedDrawRadio);
    }

    let all_regions_radio = document.getElementById("all");
    if (all_regions_radio) {
        all_regions_radio.addEventListener('click', clickedNotDrawRadioTrends);
    }

    let all_auto_locations_radio = document.getElementsByName("location");
    if (all_auto_locations_radio) {
        for (let i = 0; i < all_auto_locations_radio.length; i++) {
            if (all_auto_locations_radio[i].checked === true) {
                clearDrawnShape();
            }
        }
    }

    let select_all_locations_radio = document.getElementById("allLocations");
    if (select_all_locations_radio) {
        if (select_all_locations_radio.checked === true) {
            clearDrawnShape();
        }
    }

    function clearDrawnShape() {

        copyOfMap.getInteractions().forEach(function (e) {
            if (e instanceof ol.interaction.Draw) {
                copyOfMap.removeInteraction(e);
            }
        });

        copyOfMap.getLayers().forEach(function (e) {
            if (e.get('name') === 'drawing_layer') {
                e.getSource().clear();
            }
        });

    }

    function resetDrawPoints() {
        // Set this for resetting the points
        let selectPointsLocations = [];
        selectPointsLocations[0] = 'reset_points';
        clearDrawnShape();
    }

    function clickedDrawRadio() {
        if (draw_buttons_group) {
            for (let i = 0; i < draw_buttons_group.length; i++) {
                draw_buttons_group[i].style.visibility = "visible";
            }
        }
    }

    function clickedNotDrawRadio() {
        if (draw_buttons_group) {
            for (let i = 0; i < draw_buttons_group.length; i++) {
                draw_buttons_group[i].style.visibility = "hidden";
            }
        }

        copyOfMap.getInteractions().forEach(function (e) {
            if (e instanceof ol.interaction.Draw) {
                copyOfMap.removeInteraction(e);
            }
        });

    }

    function clickedAddButton() {
        clickedNotDrawRadio();
    }

    function clickedNotDrawRadioTrends() {
        resetDrawPoints();
        clickedNotDrawRadio();
    }

    function clickedDrawRadioTrends() {
        clickedDrawRadio();
    }

    if (display_trends) {

        if (draw_radio && all_regions_radio) {
            if (all_regions_radio.checked === false && draw_radio.checked === false) {
                clickedNotDrawRadioTrends();
            }

            if (all_regions_radio.checked === true) {
                clickedNotDrawRadioTrends();
            }

            if (draw_radio.checked === true) {
                clickedDrawRadioTrends();
            }
        }

    } else {
        if (draw_radio) {
            if (draw_radio.checked) {

                clickedDrawRadio();
            } else {
                copyOfMap.getInteractions().forEach(function (e) {
                    if (e instanceof ol.interaction.Draw) {
                        copyOfMap.removeInteraction(e);
                    }
                });
                clickedNotDrawRadio();
            }
        }

        let filters_div = document.getElementById('filters-div');
        if (filters_div) {
            if (filters_div.children.length <= 1) {
                clickedNotDrawRadio();
                resetDrawPoints();
            }
        }

        let locations_card = document.getElementById('locations');
        if (!locations_card) {
            clickedNotDrawRadio();
            resetDrawPoints();
        }

    }

}

//TODO: this should be removed when all maps are using BasicMap
export function centerHelper(view: ol.View, vectorSource: ol.Source, theMap: ol.Map){
    const centerButton = document.getElementById('centerButton');
    let handleCenterButton = function () {
        console.log(vectorSource);
        view.fit(vectorSource.getExtent(), theMap.getSize());
    };
    if (centerButton) {
        centerButton.addEventListener('click', handleCenterButton, false);
        centerButton.addEventListener('touchstart', handleCenterButton, false);
    } else {
        console.log("cannot find button");
    }
}

export function drawClearButtonFunction(
    clearButton: any, ol_drawclearcontrol: any, theMap: ol.Map,
    customLocationFilterLayer: ol.layer, selectShapeLocation: any
) {

    let drawClearButton = clearButton;
    let drawElement = ol_drawclearcontrol;
    let drawExtentGetExtent = [];
    let drawClearControl;

    let handleDrawClearButton = function () {
        theMap.getInteractions().forEach(function (e) {
            if (e instanceof ol.interaction.Draw) {
                theMap.removeInteraction(e);
            }
        });

        resetDrawnPoints(customLocationFilterLayer, selectShapeLocation);
    };

    if (drawElement && drawClearButton) {
        drawClearButton.addEventListener('click', handleDrawClearButton, false);
        drawClearButton.addEventListener('touchstart', handleDrawClearButton, false);
        drawElement.className += ' ol-unselectable ol-control';
        drawElement.appendChild(drawClearButton);
    }

    drawClearControl = new ol.control.Control({
        element: drawElement,
    });

    return ([drawExtentGetExtent, drawClearControl]);

}

export function drawControlElements(
    shape: string, sides: number, type: string, drawButton: any, ol_drawshapecontrol: any,
    customLocationFilterVector: ol.vector, selectPoints: any,
    clusters: Object, customLocationFilterLayer: ol.layer, selectShapeLocation: any,
    theMap: ol.Map, selectItems: any, selectPointsLocations: any
) {

    let drawShape, drawShapeControl, drawExtent;
    let drawShapeButton = drawButton;
    let drawElement = ol_drawshapecontrol;
    let drawExtentGetExtent = [];
    let drawCoordinates = [];
    let geometryFunction;

    // Circle does not utilize the geometryFunction for the interaction
    if (shape === 'square') {
        geometryFunction = ol.interaction.Draw.createRegularPolygon(sides);
    }

    let handleDrawShapeButton = function () {

        drawShape = new ol.interaction.Draw({
            type: type,
            source: customLocationFilterVector,
            geometryFunction: geometryFunction
        });

        resetDrawnPoints(customLocationFilterLayer, selectShapeLocation);

        theMap.addInteraction(drawShape);

        drawShape.on('drawstart', function () {
            selectItems.setActive(false);
            selectPoints = [];
        });

        drawShape.on('drawend', function (e) {
            [drawExtent, selectPointsLocations] =
                drawEndSharedSteps(customLocationFilterLayer, selectItems, theMap, selectPoints, clusters, e);
            drawExtentGetExtent = drawExtent.getExtent();

            // Get the shape coordinates for a Circle instead of a Polygon
            if (shape === 'circle') {
                // (1) Get the Units for the Map Projection
                let units = theMap.getView().getProjection().getUnits();
                // (2) Get the Center Point of the Circle
                let drawCenter = drawExtent.getCenter();
                // (3) Get the Radius of the Circle in Meters
                let drawRadius = (drawExtent.getRadius() * ol.proj.METERS_PER_UNIT[units]) / 1000;
                // Assemble the Coordinates for the API call
                drawCoordinates = [drawCenter.concat(drawRadius)];
            } else {
                drawCoordinates = drawExtent.getCoordinates();
            }

            // Call the appropriate function
            selectShapeLocation(selectPointsLocations, drawCoordinates);

            // Zoom to the Shape
            theMap.getView().fit(drawExtentGetExtent, theMap.getSize());
        });

    };

    if (drawElement && drawShapeButton) {
        drawShapeButton.addEventListener('click', handleDrawShapeButton, false);
        drawShapeButton.addEventListener('touchstart', handleDrawShapeButton, false);
        drawElement.className += ' ol-unselectable ol-control';
        drawElement.appendChild(drawShapeButton);
    }

    drawShapeControl = new ol.control.Control({
        element: drawElement,
    });

    return ([drawExtentGetExtent, drawShapeControl]);

}

function drawEndSharedSteps(customLocationFilterLayer, selectItems, theMap, selectPoints, clusters, e) {

    customLocationFilterLayer.getSource().clear();
    selectItems.setActive(true);

    theMap.getInteractions().forEach(function (e) {
        if (e instanceof ol.interaction.Draw) {
            theMap.removeInteraction(e);
        }
    });

    // Get the shape geometry
    let drawExtent = e.feature.getGeometry();

    // Get all the features in the layer
    let featuresInLayer = clusters.getSource().getFeatures();

    // Check each feature
    let loopFeatureExtent;
    for (let j = 0; j < featuresInLayer.length; j++) {
        loopFeatureExtent = featuresInLayer[j].getGeometry().getExtent();
        // Only select the features within the shape
        if (drawExtent.intersectsExtent(loopFeatureExtent)) {
            selectPoints.push(featuresInLayer[j]);
        }
    }

    let selectPointsLocations = [];

    if (selectPoints.length > 0) {
        for (let i = 0; i < selectPoints.length; i++) {
            let selectPointFeatures = selectPoints[i].get('features');
            for (let j = 0; j < selectPointFeatures.length; j++) {
                let featureName = selectPointFeatures[j].attributes.name;
                if (!selectPointsLocations.includes(featureName.toString())) {
                    selectPointsLocations.push(featureName);
                }
            }
        }
    }

    return [drawExtent, selectPointsLocations];

}

function resetDrawnPoints(customLocationFilterLayer, selectShapeLocation) {

    customLocationFilterLayer.getSource().clear();

    // Create empty array for points
    let selectPointsLocations = [];

    // Set this for resetting the points
    selectPointsLocations[0] = 'reset_points';

    // Get the shape coordinates
    let drawCoordinates = [];

    // This is the button that will reset the points
    selectShapeLocation(selectPointsLocations, drawCoordinates);

    let keep_draw_active = document.getElementById('draw');
    if (keep_draw_active) {
        keep_draw_active.click();
    }

}
