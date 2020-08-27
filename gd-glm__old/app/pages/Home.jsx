/*
 * @flow
 */

import React, {Component} from 'react';
import mainStyles from '../styles/mainStyle.css';
import styles from '../styles/home.css';
import Carousel from "../components/Carousel";
import {getCarouselImageNames} from '../utils/getConfig';
import Footer from '../components/Footer';
import {useAnalysisSearches} from '../utils/getConfig';
import AnalysisSearches from "../components/AnalysisSearches";


class Home extends Component {
    render() {

        let carousel = '';
        if (getCarouselImageNames().length > 0) {
            carousel = <Carousel/>;
        }

        let analysisSearches = '';
        if (useAnalysisSearches() === true) {
            analysisSearches = <AnalysisSearches/>;
        }

        return (
            <div>
                <div className={mainStyles.contentcenter}>
                    <h2 className={styles.title}>Your Lakes. Your Data.</h2>
                    {carousel}
                </div>
                <div className={styles.contentcenter}>
                    <div className={styles.section_style}>
						<span className={styles.text}>
                            This site provides easy access to long-term, environmental monitoring data collected
                            throughout the Great Lakes. There are a range of environmental parameters to choose from
                            such as nutrients, contaminants and physical properties of water from various sources.
						</span>
                        <br/>
                        <h3 className={styles.heading_style}> Features: </h3>
                        <ul className={styles.margin1em}>
                            <li className={styles.text}>Explore trends across the basin and visualize available data
                                from a variety of sources
                            </li>
                            <li className={styles.text}>Compare data among various locations or parameters</li>
                            <li className={styles.text}>Search for specific data and download</li>
                        </ul>
                    </div>
                    <div className={styles.section_style + ' ' + styles.section_style_video}>
                        <iframe width="550" height="262" src="https://www.youtube.com/embed/ZmSLDka9Go0" frameBorder="0"
                                allowFullScreen/>
                    </div>
                </div>
                <Footer/>
            </div>
        );

    }
}

export default Home;
