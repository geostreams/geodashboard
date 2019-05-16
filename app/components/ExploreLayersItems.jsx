/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import exploreStyles from '../styles/explore.css';
import {Checkbox, FormField} from 'react-mdc-web/lib';
import type {InputEvent} from '../utils/flowtype';
import ExploreLayersDetails from "../components/ExploreLayersDetails";

class ExploreLayersItems extends Component {

    constructor(props: Object) {
        super(props);
        (this: any).selectLayers = this.selectLayers.bind(this);
        (this: any).handleOpacityChange = this.handleOpacityChange.bind(this);
        (this: any).selectGroupLayers = this.selectGroupLayers.bind(this);
    }

    selectLayers(event: InputEvent) {
        let layersVisibility = Object.assign([], this.props.layersVisibility);

        let name = event.target.name;
        let opacity = event.target.value;
        let checked = event.target.checked;

        let index = this.props.layersVisibility.findIndex(
            (selectedLayer => selectedLayer.title === name));

        if (checked) {
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

    selectGroupLayers(event: InputEvent) {
        let group = event.target.name;
        let groupChecked = event.target.checked;

        this.props.layersVisibility.filter(layer => layer.layerGroup === group).map(layer => {

            let layersVisibility = Object.assign([], this.props.layersVisibility);

            let index = this.props.layersVisibility.findIndex(
                (selectedLayer => selectedLayer.title === layer.title));

            let layerCheckbox = document.getElementById(layer.title.toString());
            if (layerCheckbox instanceof HTMLInputElement) {

                if (groupChecked === false) {
                    layerCheckbox.checked = false;
                    if (index > -1) {
                        layersVisibility[index].visibility = false;
                    }
                }
                else {
                    layerCheckbox.checked = true;
                    if (index > -1) {
                        layersVisibility[index].visibility = true;
                    } else {
                        layersVisibility.push({
                            'title': layer.title,
                            'opacity': layer.opacity,
                            'visibility': true,
                        });
                    }
                }

            }

            this.props.onSelectLayers(layersVisibility);

        });
    }

    handleOpacityChange(event: InputEvent) {
        let layersVisibility = Object.assign([], this.props.layersVisibility);
        let name = event.target.name;
        let opacity = Number(event.target.value.toString());

        let index = layersVisibility.findIndex((selectedLayer => selectedLayer.title === name));
        layersVisibility[index].opacity = opacity;

        this.props.onOpacityChange(layersVisibility);
    }

    render() {
        let layersDiv = [];
        let layersInformation = '';
        let layersInGroup = [];
        let layersGroup = '';
        let layersGroups = [];

        this.props.layersVisibility.filter(layer => layer.layerGroup !== '').map(availableLayer => {
            if (layersGroups.indexOf(availableLayer.layerGroup) < 0) {
                layersGroups.push(availableLayer.layerGroup);
            }
        });

        layersGroups.map(group => {

            layersInGroup = [];

            this.props.layersVisibility.filter(layer => layer.layerGroup === group).map(layerInGroup => {
                layersInformation =
                    <ExploreLayersDetails key={layerInGroup.title}
                                          availableLayer={layerInGroup}
                                          layersVisibility={this.props.layersVisibility}
                                          selectLayers={this.selectLayers}
                                          handleOpacityChange={this.handleOpacityChange}
                    />;
                layersInGroup.push(layersInformation);
            });

            let isAllSelected: boolean = false;

            let numVisible = (this.props.layersVisibility
                .filter(layer => layer.layerGroup === group)
                .filter(layer_visibility => layer_visibility.visibility === true)).length;

            if (layersInGroup.length === numVisible) {
                isAllSelected = true
            }

            let selectAllGroup = (
                <div className={exploreStyles.col} key={group}>
                    <FormField id="explore-group-layers">
                    <span className={exploreStyles.checkboxWidth}>
                        <Checkbox name={group}
                                  value={group}
                                  onChange={this.selectGroupLayers}
                                  checked={isAllSelected}
                        />
                    </span>
                        <label className={exploreStyles.checkboxLabel}>Select All</label>
                    </FormField>
                </div>
            );

            layersGroup = (
                <div key={group}>
                    <details className={exploreStyles.layersGroup}>
                        <summary className={exploreStyles.layersGroupTitle}>{group}</summary>
                        <div>{selectAllGroup}</div>
                        <div>{layersInGroup}</div>
                    </details>
                </div>
            );

            layersDiv.push(layersGroup)

        });

        this.props.layersVisibility.filter(layer => layer.layerGroup === '').map(availableLayer => {
            layersInformation =
                <ExploreLayersDetails key={availableLayer.title}
                    availableLayer={availableLayer}
                    layersVisibility={this.props.layersVisibility}
                    selectLayers={this.selectLayers}
                    handleOpacityChange={this.handleOpacityChange}
                />;
            layersDiv.push(layersInformation)
        });

        let layersDivContents = <div>{layersDiv}</div>;

        return (layersDivContents);
    }

}

export default ExploreLayersItems;