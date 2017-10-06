let ol = require('openlayers');

export function drawHelper(copyOfMap, display_trends){

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
        for (let i=0; i < all_auto_locations_radio.length; i++){
            if (all_auto_locations_radio[i].checked == true) {
                clearDrawnShape();
            }
        }
    }

    let select_all_locations_radio = document.getElementById("allLocations");
    if (select_all_locations_radio) {
        if (select_all_locations_radio.checked == true) {
            clearDrawnShape();
        }
    }

    function clearDrawnShape() {

        copyOfMap.getInteractions().forEach(function (e) {
            if(e instanceof ol.interaction.Draw) {
                copyOfMap.removeInteraction(e);
            }
        });

        copyOfMap.getLayers().forEach(function(e) {
            if (e.get('name') == 'drawing_layer') {
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
        if (draw_buttons_group){
            for (let i = 0; i < draw_buttons_group.length; i++) {
                draw_buttons_group[i].style.visibility = "visible";
            }
        }
    }

    function clickedNotDrawRadio() {
        if (draw_buttons_group){
            for (let i = 0; i < draw_buttons_group.length; i++) {
                draw_buttons_group[i].style.visibility = "hidden";
            }
        }

        copyOfMap.getInteractions().forEach(function (e) {
            if(e instanceof ol.interaction.Draw) {
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

    if (display_trends){

        if (draw_radio && all_regions_radio) {
            if (all_regions_radio.checked == false && draw_radio.checked == false) {
                clickedNotDrawRadioTrends();
            }

            if (all_regions_radio.checked == true) {
                clickedNotDrawRadioTrends();
            }

            if (draw_radio.checked == true) {
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

        let the_filters_div = document.getElementById('filters-div');
        if (the_filters_div) {
            if (the_filters_div.children.length <=1) {
                clickedNotDrawRadio();
                resetDrawPoints();
            }
        }

        let the_locations_card = document.getElementById('locations');
        if (!the_locations_card) {
            clickedNotDrawRadio();
            resetDrawPoints();
        }

    }
}

//TODO: this should be removed when all maps are using BasicMap
export function centerHelper(view, vectorSource, theMap){
    const centerButton = document.getElementById('centerButton');
    let handleCenterButton = function () {
        console.log(vectorSource)
        view.fit(vectorSource.getExtent(), theMap.getSize());
    };
    if (centerButton) {
        centerButton.addEventListener('click', handleCenterButton, false);
        centerButton.addEventListener('touchstart', handleCenterButton, false);
    } else {
        console.log("cannot find button");
    }

    //const element = document.getElementById('ol-centercontrol');
    ////if (element && centerButton) {
    //    element.className += ' ol-unselectable ol-control';
    //    element.appendChild(centerButton);
    //
    //   return element;
    //}
}