/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/main.css';
import {Checkbox, FormField} from 'react-mdc-web/lib';

class MapToggleClusters extends Component {
    render() {
        return(
            <div className={styles.clusterChoicePositioning}>
                <FormField className={styles.clusterStyleActive + (this.props.disableClusters === true ? styles.clusterStyleActive: '')}
                           id="toggleClusters" key="toggleClusters"
                >
                    <Checkbox onChange={this.props.onChangeFunction}
                              value="toggleClusters" key="toggleClusters"
                              name="toggleClusters" id="toggleClusters"
                              checked={this.props.disableClusters}
                    />
                    <label className={styles.clusterChoiceTextActive + (this.props.disableClusters === true ? styles.clusterChoiceTextActive: '')}
                    >
                        <span className={styles.clusterChoiceText}>Disable Map Clustering</span>
                    </label>
                </FormField>
            </div>
        );
    }
}

export default MapToggleClusters;
