/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import exploreStyles from '../styles/explore.css';
import {Checkbox, FormField} from 'react-mdc-web/lib';

class ExploreLayersLegends extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {
        let layersLegendItems = (<div> </div>);
        let openStatus = '';
        if (this.props.availableLayer.legendShow) {
            if (this.props.availableLayer.legendStartOpen) {
                openStatus = 'open';
            }
            layersLegendItems = (
                <div>
                    <details open={openStatus} className={exploreStyles.layersLegendDetails}>
                        <summary>{this.props.availableLayer.legendTitle}</summary>
                        <div className={exploreStyles.layersLegendText}>
                            {this.props.availableLayer.legendText}
                        </div>
                        <img src={this.props.availableLayer.legendImage}/>
                    </details>
                </div>
            );
        }

        return (layersLegendItems);
    }

}

export default ExploreLayersLegends;