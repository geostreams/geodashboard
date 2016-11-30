import React, {Component} from 'react'
import Menu from '../components/Menu'
import styles from './about.css'

class About extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <div className={styles.content}>
                    <p>This is a prototype of Geodashboard 3.0 using React,
                        Redux, and Material-UI.
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
