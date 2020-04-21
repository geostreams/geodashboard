// This Component create Buttons for each provided Analysis Searches
// After a Button is clicked, the Analysis Page will load

import React, {Component} from "react";
import {Button} from 'react-mdc-web/lib';
import {Link} from 'react-router';
import PropTypes from "prop-types";


class AnalysisSearchButtonComponent extends Component {

    constructor(props: Object) {
        super(props);
        (this: any).handleClickButton = this.handleClickButton.bind(this);
    }

    handleClickButton() {
        this.props.onClickButton(
            this.props.button_info.parameter, this.props.button_info.region,
            this.props.button_info.baseline, this.props.button_info.rolling,
            this.props.button_info.threshold
        )
    }

    render() {
        let searchButton = (
            <Link href="/#analysis">
                <Button raised id={this.props.index_val}
                        onClick={this.handleClickButton}>
                    {this.props.button_info.title}
                </Button>
            </Link>
        );
        return (searchButton);
    }

}

AnalysisSearchButtonComponent.propTypes = {
    button_info: PropTypes.object.isRequired,
    index_val: PropTypes.number.isRequired,
};

export default AnalysisSearchButtonComponent;