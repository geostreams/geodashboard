/*
 * @flow
 */

import React, {Component} from 'react'
import styles from '../styles/filterOption.css'
import {Checkbox, FormField, label} from 'react-mdc-web/lib';

class FilterOption extends Component {
    constructor(props: Object) {
        super(props);
    }

    handleChange(event: Object) {
        const selectedParameters = Object.assign([], this.props.selectedParameters);
        const selectedDataSources = Object.assign([], this.props.selectedDataSources);
        this.props.onOptionChange(event, selectedParameters, selectedDataSources);
    }

    render() {
        let checkedVar = (this.props.name === "data_sources" &&
            this.props.selectedDataSources.indexOf(this.props.id) > -1) ||
            (this.props.name === "parameters" && this.props.selectedParameters.indexOf(this.props.id) > -1);

        return (
            <div className={styles.col}>
                <FormField id={this.props.name}>
					<span className={styles.checkboxWidth}>
					<Checkbox data-filterId={this.props.filterId} name={this.props.name} value={this.props.id}
                              onChange={this.handleChange.bind(this)} checked={checkedVar}/>
					</span>
                    <label className={styles.checkboxLabel}> {this.props.label}</label>
                </FormField>
            </div>
        );
    }
}

export default FilterOption;
