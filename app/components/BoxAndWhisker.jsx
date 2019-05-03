/*
 * @flow
 */

import React, { Component } from 'react';
import {ListDivider} from 'react-mdc-web/lib';
import Boxplot from 'react-boxplot';
import computeBoxplotStats from 'react-boxplot/dist/stats';
import styles from "../styles/detail.css";

class BoxAndWhisker extends Component {
    constructor(props: Object) {
        super(props);
    }

    render() {

        // Variables for this one Parameter
        const {paramName, paramValues, paramColor} = this.props;
        let minimum = Math.min.apply(null, paramValues);
        let maximum = Math.max.apply(null, paramValues);
        let stats = computeBoxplotStats(paramValues);

        // Return the Box and Whisker
        return (
            <div className={styles.add_padding}>
                <span style={{'color': paramColor}}>{paramName}</span>
                <br/><br/>
                <Boxplot
                    width={300}
                    height={20}
                    orientation="horizontal"
                    min={Math.floor(minimum)}
                    max={Math.ceil(maximum)}
                    stats={stats}
                />
                <br/><br/>
                <p className={styles.float_item_right}>
                    Range: {minimum.toFixed(2)} - {maximum.toFixed(2)}
                </p>
            </div>
        );

    }
}

export default BoxAndWhisker;
