import React, {Component} from "react";
import styles from "../styles/detail.css";
import {Checkbox, FormField, label} from 'react-mdc-web';

class DetailParameterList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let parameter_list = [];
        const {sensor, category_parameters} = this.props;
        category_parameters.map(parameter => {
            const parameter_checked = this.props.selected_parameters.includes(parameter.name);
            let checkboxDisabled = false;
            if(this.props.maxParameters > 0 && !parameter_checked &&
                this.props.selected_parameters.length >= this.props.maxParameters ) {
                checkboxDisabled = true;
            }
            let parameter_label = parameter.title;
            if(parameter.unit != "") {
                parameter_label += " ("+ parameter.unit + ")";
            }
            parameter_list.push(
                <div key={parameter.name}>
                    <FormField id={parameter.name} key={parameter.name}>
                        <Checkbox onChange={() => {this.props.handleSelectParam(parameter.name)}}
                                  value={parameter.name} key={parameter.name} name="param" checked={parameter_checked}
                                  disabled={checkboxDisabled}
                        />
                        <label>{parameter_label}</label>
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
