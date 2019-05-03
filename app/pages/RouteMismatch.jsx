/*
 * @flow
 */

import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';

class RouteMismatch extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <div className={styles.contentcenter}>
                    <h3>404 Not Found.</h3>
                </div>
            </div>
        );
    }
}

export default RouteMismatch;