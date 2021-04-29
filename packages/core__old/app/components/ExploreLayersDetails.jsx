/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import exploreStyles from '../styles/explore.css';
import {Checkbox, FormField} from 'react-mdc-web/lib';
import ExploreLayersLegends from "../components/ExploreLayersLegends";

class ExploreLayersDetails extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {
        let slider_value = this.props.availableLayer.opacity;
        let index = this.props.layersVisibility.findIndex(
            (selectedLayer => selectedLayer.title === this.props.availableLayer.title));
        if (index > -1) {
            slider_value = this.props.layersVisibility[index].opacity;
        }
        let layersInformation = (
            <div className={exploreStyles.col} key={this.props.availableLayer.title}>
                <FormField id="explore-layers">
                    <span className={exploreStyles.checkboxWidth}>
                        <Checkbox name={this.props.availableLayer.title}
                                  id={this.props.availableLayer.title}
                                  value={this.props.availableLayer.opacity}
                                  onChange={this.props.selectLayers}
                                  checked={this.props.layersVisibility.findIndex(
                                      (selectedLayer => ((selectedLayer.title === this.props.availableLayer.title) &&
                                          (selectedLayer.visibility === true)))
                                  ) > -1}
                        />
                    </span>
                    <label className={exploreStyles.checkboxLabel}> {this.props.availableLayer.title}</label>
                </FormField>
                <ExploreLayersLegends availableLayer={this.props.availableLayer}/>
                <input className={exploreStyles.sliderStyle}
                       type="range" name={this.props.availableLayer.title}
                       min="0" max="1" step="0.05"
                       value={slider_value}
                       disabled={this.props.layersVisibility.findIndex(
                           (selectedLayer => ((selectedLayer.title === this.props.availableLayer.title) &&
                               (selectedLayer.visibility === true)))
                       ) < 0}
                       onChange={this.props.handleOpacityChange}
                />
            </div>
        );

        return (layersInformation);
    }

}

export default ExploreLayersDetails;