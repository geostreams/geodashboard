import React, {Component} from "react";
import styles from '../styles/main.css';

class Spinner extends Component {

    render() {

        let loading_text = '';

        if (this.props.loading_time) {
            if (this.props.loading_time < 10000) {
                loading_text = '';
            }
            if (this.props.loading_time >= 10000 && this.props.loading_time < 20000) {
                loading_text = '....LOADING..';
            }
            if (this.props.loading_time >= 20000 && this.props.loading_time < 30000) {
                loading_text = '...LOADING...';
            }
            if (this.props.loading_time >= 30000 && this.props.loading_time < 40000) {
                loading_text = '..LOADING....';
            }
            if (this.props.loading_time >= 40000 && this.props.loading_time < 50000) {
                loading_text = '....LOADING..';
            }
            if (this.props.loading_time >= 50000 && this.props.loading_time < 60000) {
                loading_text = '...LOADING...';
            }
            if (this.props.loading_time >= 60000) {
                loading_text = '..LOADING....';
            }
        }

        return (
            <div>
                <div className={styles.make_modal}>
                    <div className={styles.loading_text}>{loading_text}</div>
                    <div className={styles.loading_spinner}>
                    </div>
                </div>
            </div>
        );

    }

}

export default Spinner;