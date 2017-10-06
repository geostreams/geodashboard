import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';

class About extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <div className={styles.contentcenter}>
                    <p>This is a prototype of Geodashboard 3.0 using React,
                        Redux, and react-mdc-web.
                    </p>
                    <br/>
                    <p>For the current version, please see
                        the <a href="https://opensource.ncsa.illinois.edu/confluence/display/GEOD/Geospatial+Dashboard">
                        Geodashboard Wiki</a>.
                    </p>
                </div>
            </div>
        );
    }

}

export default About;
