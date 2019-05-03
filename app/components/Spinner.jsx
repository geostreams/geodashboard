/*
 * @flow
 */

import React, {Component} from "react";
import styles from '../styles/main.css';

class Spinner extends Component {

    render() {

        let loading_text = '';
        let loading_text_div = <div className={styles.loading_text}>{loading_text}</div>;

        if (this.props.loading_time) {
            if (this.props.loading_time < 10000) {
                loading_text_div = <div className={styles.loading_text}>{loading_text}</div>;
            } else {
                if (
                    this.props.loading_time.toString().charAt(0) === '1' ||
                    this.props.loading_time.toString().charAt(0) === '4' ||
                    this.props.loading_time.toString().charAt(0) === '7'
                ) {
                    loading_text = '...LOADING...';
                }
                if (this.props.loading_time.toString().charAt(0) === '2' ||
                    this.props.loading_time.toString().charAt(0) === '5' ||
                    this.props.loading_time.toString().charAt(0) === '8')
                {
                    loading_text = 'LOADING......';
                }
                if (this.props.loading_time.toString().charAt(0) === '3' ||
                    this.props.loading_time.toString().charAt(0) === '6' ||
                    this.props.loading_time.toString().charAt(0) === '9')
                {
                    loading_text = '......LOADING';
                }

                loading_text_div =
                    <div className={styles.loading_text + ' ' + styles.loading_text_background}>{loading_text}</div>;
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