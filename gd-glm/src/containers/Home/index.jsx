/*
 * @flow
 */

import React from 'react';
// $FlowFixMe
import Carousel from 'gd-core__old/app/components/Carousel';
import styles from './home.css';
import mainStyles from '../../styles/old_mainStyle.css';
import carouselImages from '../../images/carousel_images';


function Home (){
    return (
        <div>
            <div className={mainStyles.contentcenter}>
                <h2 className={styles.title}>Your Lakes. Your Data.</h2>
                <Carousel images={carouselImages} captions={[]} />
            </div>
            <div className={styles.contentcenter}>
                <div className={styles.section_style}>
                    <span className={styles.text}>
                            This site provides easy access to long-term, environmental monitoring data collected
                            throughout the Great Lakes. There are a range of environmental parameters to choose from
                            such as nutrients, contaminants and physical properties of water from various sources.
                    </span>
                    <br />
                    <h3 className={styles.heading_style}> Features: </h3>
                    <ul className={styles.margin1em}>
                        <li className={styles.text}>Explore trends across the basin and visualize available data
                                from a variety of sources
                        </li>
                        <li className={styles.text}>Compare data among various locations or parameters</li>
                        <li className={styles.text}>Search for specific data and download</li>
                    </ul>
                </div>
                <div className={`${styles.section_style } ${ styles.section_style_video}`}>
                    <iframe title="intro-video" width="550" height="262" src="https://www.youtube.com/embed/ZmSLDka9Go0" frameBorder="0"
                        allowFullScreen />
                </div>
            </div>
        </div>
    );

}

export default Home;
