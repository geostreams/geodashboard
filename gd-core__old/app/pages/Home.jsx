/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/mainStyle.css';
import SwitchBackend from '../containers/SwitchAPI';
import Carousel from "../components/Carousel";
import {getCarouselImageNames} from '../utils/getConfig';
import Footer from '../components/Footer';
import {useAnalysisSearches} from '../utils/getConfig';
import AnalysisSearches from "../components/AnalysisSearches";


class Home extends Component {
    render() {

        let carousel= '';
        if (getCarouselImageNames().length > 0) {
            carousel = <Carousel/>;
        }

        let analysisSearches = '';
        if (useAnalysisSearches() === true) {
            analysisSearches = <AnalysisSearches/>;
        }

        return (
            <div>
                <div className={styles.contentcenter}>
                    {carousel}
                    <div><h3>Welcome to the Geodashboard!</h3></div>
                    <SwitchBackend/>
                    {analysisSearches}
                </div>
                <Footer/>
            </div>
        );

    }
}

export default Home;
