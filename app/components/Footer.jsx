import React, {Component} from 'react';
import styles from '../styles/footer.css';

class Footer extends Component {

    render() {
        return (
            <footer className={styles.footerWrapper}>
                <p>This is a prototype of Geodashboard 3.0 using React,
                    Redux, and react-mdc-web.
                </p>
                <br/>
                <p>For the current version, please see
                    the <a href="https://opensource.ncsa.illinois.edu/confluence/display/GEOD/Geospatial+Dashboard">
                        Geodashboard Wiki</a>.
                </p>
            </footer>
        );
    }
}

export default Footer;