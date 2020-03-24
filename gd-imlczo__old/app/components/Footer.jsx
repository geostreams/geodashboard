/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/footer.css';
import packageJson from '../../package.json';

class Footer extends Component {

    render() {
        return (
            <footer className={styles.footerWrapper}>
                <p><a href="https://geodashboard.ncsa.illinois.edu/">
                    Geodashboard v{packageJson.version}</a>
                </p>
            </footer>
        );
    }
}

export default Footer;