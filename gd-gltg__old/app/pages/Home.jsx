/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/customStyles.css';
import {Button} from 'react-mdc-web';
import {Link} from 'react-router';
import Footer from "../components/Footer";


class Home extends Component {
    render() {
        return (
            <div>
                <div className={styles.custom_page}>
                    <div className={styles.custom_header}>
                        <h2>Welcome to the Great Lakes to Gulf Virtual Observatory</h2>
                    </div>

                    <div>
                        <div className={styles.custom_paragraph}>
                            <p>
                                In the Mississippi River watershed, water quality remains a primary and ongoing concern that
                                requires monitoring conducted by multiple state and federal agencies and academic institutions.
                                The Great Lakes to Gulf Virtual Observatory (GLTG<sup>SM</sup>) is an interactive geospatial
                                application that connects users with tools designed to help visually map, explore and compare
                                referenced water quality monitoring data aggregated from multiple sources.  The application
                                facilitates ready access to water resource information from the Mississippi River and its
                                tributaries, enabling users to identify and select sites, graph specific parameters and
                                download data in compatible formats.
                            </p>
                        </div>

                        <div className={styles.custom_paragraph}>
                            <p>
                                Currently, GLTG<sup>SM</sup> includes sites with five or more years of discreet nutrient data
                                in the main stem of the Mississippi River, continuous water quality monitoring sites in the
                                Mississippi River watershed with nutrient data, and selected small watersheds (HUC-8 or smaller).
                                GLTG will display additional parameters as they are available.
                            </p>
                        </div>

                        <div className={styles.custom_button} >
                            <Link href="#explore/all">
                                <Button raised>
                                    Explore Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );

    }
}

export default Home;
