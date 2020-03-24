/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/customStyles.css';
import {Link} from 'react-router';
import Footer from "../components/Footer";


class About extends Component {

    render() {
        return (
            <div>
                <div className={styles.custom_page}>
                    <div className={styles.custom_header}>
                        <h2>Welcome to the <br/> Illinois Nutrient Loss Reduction Strategy <br/> Data Portal</h2>
                    </div>

                    <div>
                        <h3>About This Application</h3>

                        <div className={styles.custom_paragraph}>
                            <p>
                                The Illinois Nutrient Loss Reduction Strategy guides state efforts to improve water
                                quality at home and downstream by reducing nitrogen and phosphorus levels in our lakes,
                                streams, and rivers. The strategy lays out a comprehensive suite of best management
                                practices for reducing nutrient loads from wastewater treatment plants and urban and
                                agricultural runoff. Recommended activities target the state’s most critical watersheds
                                and are based on the latest science and best-available technology. It also calls for
                                more collaboration between state and federal agencies, cities, non-profits, and
                                technical experts on issues such as water quality monitoring, funding, and outreach.
                            </p>
                        </div>

                        <div className={styles.custom_paragraph}>
                            <p>
                                The strategy was developed by a policy working group led by the Illinois Water Resource
                                Center-Illinois Indiana Sea Grant, the Illinois Environmental Protection Agency, and
                                the Illinois Department of Agriculture. Group members included representatives from
                                state and federal agencies, agriculture, and non-profit organizations as well as
                                scientists and wastewater treatment professionals.
                            </p>
                        </div>

                        <div className={styles.custom_paragraph}>
                            <p>
                                This portal is powered by the Great Lakes to Gulf Virtual Observatory.  The National
                                Great Rivers Research and Education Center (NGRREC<sup>SM</sup>), Illinois-Indiana Sea
                                Grant, and the National Center for Supercomputing Applications (NCSA) partnered in the
                                development of the <strong><Link href="http://gltg.ncsa.illinois.edu/">Great Lakes to Gulf
                                (GLTG<sup>SM</sup>) Virtual Observatory</Link></strong>. The GLTG virtual observatory
                                gathers data from a variety of federal, state, local, and private sources, including
                                the Water Quality Portal.  Through visualizing water quality monitoring data and
                                land-use data across sources and agencies, the virtual observatory provides insight to
                                changes in water quality with a user friendly interface.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default About;
