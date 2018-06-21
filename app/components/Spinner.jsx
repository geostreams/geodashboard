import React, {Component} from "react";
import styles from '../styles/main.css';

class Spinner extends Component {

    render() {
        return (
            <div className={styles.make_modal}>
                <div className={styles.loading_spinner}>
                </div>
            </div>
        );
    }

}

export default Spinner;
