/*
 * @flow
 */

import React, {Component} from "react";
import {Checkbox, FormField, label} from 'react-mdc-web/lib';
import {handleParamsWithItalics} from "../utils/configUtils";


class DetailParameterList extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    state: {};

    render() {
        let parameter_list = [];
        let parameter_label_array = [];
        const {category_parameters} = this.props;

        category_parameters.map(parameter => {
            const parameter_checked = this.props.selected_parameters.includes(parameter.name);
            let checkboxDisabled = false;
            if (this.props.maxParameters > 0 && !parameter_checked &&
                this.props.selected_parameters.length >= this.props.maxParameters) {
                checkboxDisabled = true;
            }
            parameter_label_array = handleParamsWithItalics(parameter.title);
            parameter_list.push(
                <div key={parameter.name}>
                    <FormField id={parameter.name} key={parameter.name}>
                        <Checkbox onChange={() => {
                            this.props.handleSelectParam(parameter.name)
                        }}
                                  value={parameter.name} key={parameter.name} name="param" checked={parameter_checked}
                                  disabled={checkboxDisabled}
                        />
                        <label>{parameter_label_array}</label>
                    </FormField>
                </div>
            )
        });

        return (
            <div>
                {parameter_list}
            </div>
        );
    }

}

export default DetailParameterList;
