/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/main.css';
import Select from './material/Select';
import {getErrorText} from '../utils/getConfig';

class SwitchAPI extends Component {

    handleChange = (e: Object) => {
        const index = e.target.selectedIndex;
        this.props.onBackendChange(this.props.endpoints[index].url, this.props.endpoints[index].title,
            this.props.endpoints[index].subtitle);
    };

    render() {

        let error_text;
        if (this.props.error === true) {
            error_text = getErrorText();
        }

        return (
            <div className={styles.contentcenter}>
                <h4>Pick an instance</h4>
                <Select value={this.props.selected} onChange={this.handleChange}>
                    {this.props.endpoints.map((b, index) =>
                        <option value={b.url} key={index}> {b.label} </option>
                    )}
                </Select>
                <div className={styles.error_text}>{error_text}</div>
            </div>
        )
    }
}

export default SwitchAPI;
