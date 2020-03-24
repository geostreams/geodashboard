/*
 * @flow
 */

import React, {Component} from 'react';
import Carousel from "../components/Carousel";
import {getCarouselImageNames} from '../utils/getConfig';
import Footer from '../components/Footer';
import {useAnalysisSearches} from '../utils/getConfig';
import AnalysisSearches from "../components/AnalysisSearches";
import customStyles from '../styles/customStyles.css';
import {Button} from 'react-mdc-web';
import {Link} from 'react-router';


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
                <div className={customStyles.custom_page}>
                    <div className={customStyles.custom_header}>
                        <h2>Welcome to the <br/> Illinois Nutrient Loss Reduction Strategy <br/> Data Portal</h2>
                    </div>

                    <div>
                        <h3>Welcome</h3>
                        <div className={customStyles.custom_paragraph}>
                            <p>
                                Welcome to the Illinois Nutrient Loss Reduction Strategy Data Portal. The Illinois
                                Nutrient Loss Reduction Strategy guides state efforts to improve water quality at home
                                and downstream by reducing nitrogen and phosphorus levels in our lakes, streams, and
                                rivers. The strategy was developed by a policy working group led by the Illinois Water
                                Resource Center-Illinois Indiana Sea Grant, the Illinois Environmental Protection
                                Agency, and the Illinois Department of Agriculture. Group members included
                                representatives from state and federal agencies, agriculture, and non-profit
                                organizations as well as scientists and wastewater treatment professionals.
                            </p>
                        </div>

                        <div className={customStyles.custom_paragraph}>
                            <p>
                                This portal is powered by the Great Lakes to Gulf Virtual Observatory. The GLTG Virtual
                                Observatory gathers data from a variety of federal, state, local, and private sources,
                                including the Water Quality Portal. Through visualizing water quality monitoring data
                                and land-use data across sources and agencies, the virtual observatory provides insight
                                to changes in water quality with a user friendly interface.
                            </p>
                        </div>

                        <h3>Application Information</h3>

                        <div className={customStyles.custom_paragraph}>
                            <ul>
                                <li>
                                    To view Station data,
                                    visit the <strong><Link href="/index.html#/explore/all">Explore Page</Link></strong>.
                                </li>
                                <li>
                                    To download Station data as either CSV or JSON,
                                    visit the <strong><Link href="/index.html#/search">Download Page</Link></strong>.
                                </li>
                                <li>
                                    For general application information,
                                    visit the <strong><Link href="/public/pages/about.html">About Page</Link></strong>.
                                </li>
                            </ul>
                        </div>

                        <h3>For Further Information</h3>

                        <div className={customStyles.custom_paragraph}>
                            Visit the <strong>
                            <Link target="_blank" href="https://www2.illinois.gov/epa/topics/water-quality/watershed-management/excess-nutrients/Pages/nutrient-loss-reduction-strategy.aspx">
                                Illinois Nutrient Loss Reduction Strategy Implementation</Link>
                            </strong> website for further information.
                        </div>

                        <div className={customStyles.custom_button} >
                            <Link href="index.html#/explore/all">
                                <Button raised>
                                   Explore Now
                                </Button>
                            </Link>
                        </div>

                    </div>
                    {analysisSearches}
                </div>
                <Footer/>
            </div>
        );

    }
}

export default Home;
