// This Component create Buttons for each provided Analysis Searches

import React, {Component} from "react";
import styles from '../styles/analysis.css';
import {Subheading1} from 'react-mdc-web/lib';
import {getAnalysisSearchInfo, getAnalysisSearchHeading} from '../utils/getConfig';
import AnalysisSearchButton from '../containers/AnlaysisSearchButton';


class AnalysisSearches extends Component {

    state: {};

    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    render() {

        let searchButtons = [];

        getAnalysisSearchInfo().map((b, i) => {
            // Used for values below
            let indexVal = i + 1;

            // Import Details for the Analysis Searches
            searchButtons.push(
                <div key={"button" + indexVal} className={styles.searchButtonsStyle}>
                    <AnalysisSearchButton button_info={b} index_val={indexVal}/>
                </div>
            );
        });

        return (
            <div>
                <Subheading1>{getAnalysisSearchHeading()}</Subheading1>
                {searchButtons}
            </div>
        );

    }

}

export default AnalysisSearches;