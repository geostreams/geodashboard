/*
 * @flow
 */

import React, {Component} from "react";
import styles from '../styles/main.css';
import {getLoadingTimeLimit} from "../utils/getConfig";

class Spinner extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            loading_time: 0,
            setInterval_time: 0
        };
    }

    state: {
        loading_time: number,
        setInterval_time: number
    };

    render() {

        let loading_text = '';
        let loading_text_div = <div className={styles.loading_text}>{loading_text}</div>;

        if (this.props.loading_time_text) {

            let x = setInterval(() => {
                if (
                    this.state.setInterval_time <= getLoadingTimeLimit()
                ) {
                    this.state.setInterval_time = this.state.setInterval_time + 1000;
                    this.state.loading_time = this.state.setInterval_time;
                }
            }, this.state.loading_time);

            if (this.state.loading_time < 10000) {
                loading_text_div = <div className={styles.loading_text}>{loading_text}</div>;
            } else {
                if (
                    this.state.loading_time.toString().charAt(0) === '1' ||
                    this.state.loading_time.toString().charAt(0) === '4' ||
                    this.state.loading_time.toString().charAt(0) === '7'
                ) {
                    loading_text = '...LOADING...';
                }
                if (this.state.loading_time.toString().charAt(0) === '2' ||
                    this.state.loading_time.toString().charAt(0) === '5' ||
                    this.state.loading_time.toString().charAt(0) === '8'
                ) {
                    loading_text = 'LOADING......';
                }
                if (this.state.loading_time.toString().charAt(0) === '3' ||
                    this.state.loading_time.toString().charAt(0) === '6' ||
                    this.state.loading_time.toString().charAt(0) === '9'
                ) {
                    loading_text = '......LOADING';
                }

                loading_text_div =
                    <div className={styles.loading_text + ' ' +
                    styles.loading_text_background}>{loading_text}</div>;
            }

            if (
                this.state.setInterval_time >= getLoadingTimeLimit()
            ) {
                clearInterval(x);
            }

        }

        return (
            <div>
                <div className={styles.make_modal}>
                    {loading_text_div}
                    <div className={styles.loading_spinner}>
                    </div>
                </div>
            </div>
        );

    }

}

export default Spinner;