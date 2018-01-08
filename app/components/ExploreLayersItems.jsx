/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import exploreStyles from '../styles/explore.css';
import {Checkbox, FormField} from 'react-mdc-web';
import type {InputEvent} from '../utils/flowtype';

class ExploreLayersItems extends Component {

    constructor(props: Object) {
        super(props);
        (this:any).selectLayers = this.selectLayers.bind(this);
        (this:any).handleOpacityChange = this.handleOpacityChange.bind(this);
    }

    selectLayers(event: InputEvent) {
        let layersVisibility = Object.assign([], this.props.layersVisibility);

        let name = event.target.name;
        let opacity = event.target.value;
        let checked = event.target.checked;

        let index = this.props.layersVisibility.findIndex(
            (selectedLayer => selectedLayer.title == name));

        if (checked){
            if (index > -1) {
                layersVisibility[index].visibility = true;
            } else {
                layersVisibility.push({
                    'title': name,
                    'opacity': opacity,
                    'visibility': true,
                });
            }
        }
        else {
            if (index > -1) {
                layersVisibility[index].visibility = false;
            }
        }

        this.props.onSelectLayers(layersVisibility);
    }

    handleOpacityChange(event: InputEvent) {
        let layersVisibility = Object.assign([], this.props.layersVisibility);
        let name = event.target.name;
        let opacity = Number(event.target.value.toString());

        let index = layersVisibility.findIndex((selectedLayer => selectedLayer.title == name));
        layersVisibility[index].opacity = opacity;

        this.props.onOpacityChange(layersVisibility);
    }

    render() {

        let layersDiv = [];
        this.props.layersVisibility.map(availableLayer => {
            let slider_value = availableLayer.opacity;
            let index = this.props.layersVisibility.findIndex(
                (selectedLayer => selectedLayer.title == availableLayer.title));
            if (index > -1) {
                slider_value = this.props.layersVisibility[index].opacity;
            }

            layersDiv.push(
                <div className={exploreStyles.col} key={availableLayer.title}>
                    <FormField id="explore-layers">
                        <span className={exploreStyles.checkboxWidth}>
                            <Checkbox name={availableLayer.title}
                                      value={availableLayer.opacity}
                                      onChange={this.selectLayers}
                                      checked={this.props.layersVisibility.findIndex(
                                                   (selectedLayer => ((selectedLayer.title == availableLayer.title) &&
                                                   (selectedLayer.visibility == true)))
                                               ) > -1}
                            />
                        </span>
                        <label className={exploreStyles.checkboxLabel}> {availableLayer.title}</label>
                    </FormField>
                    <input className={exploreStyles.sliderStyle}
                           type="range" name={availableLayer.title}
                           min="0" max="1" step="0.05"
                           value={slider_value}
                           disabled={this.props.layersVisibility.findIndex(
                                         (selectedLayer => ((selectedLayer.title == availableLayer.title) &&
                                         (selectedLayer.visibility == true)))
                                     ) < 0}
                           onChange={this.handleOpacityChange}
                    />
                </div>
            )
        });

        return ( <div>{layersDiv}</div> );

    }

}

export default ExploreLayersItems;
