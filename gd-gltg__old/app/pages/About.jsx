/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/customStyles.css';
import {Link} from 'react-router';
import {List, ListItem, ListHeader} from 'react-mdc-web';
import Footer from "../components/Footer";

class About extends Component {

    render() {
        return (
            <div>
                <div className={styles.custom_page}>

                    <div className={styles.custom_about_header_image + " " + styles.custom_background_01}>
                        <div className={styles.custom_about_header_wrapper}>
                            <p id="toc"> </p>
                            <h2 className={styles.custom_about_header}>The Mississippi Matters</h2>
                        </div>
                    </div>
                    <div>
                        {/*<img className={styles.custom_logo} src={require("../../theme/logo.png")} />*/}
                    </div>

                    <br/>

                    <div className={styles.custom_section_paragraph}>
                        <p>
                            From its headwaters at Minnesota's Lake Itasca to the <Link href="/glossary">delta</Link>&nbsp;
                            in the Gulf of Mexico, the Mississippi River is the fourth largest watershed in the world
                            covering approximately 1.2 million square miles. The Mississippi River and its tributaries
                            are valued as both a natural and economic resource. The river simultaneously serves as home
                            to 260 fish species, provide drinking water for over 50 cities, and supports a navigation
                            channel responsible for shipping sixty percent of the nation's grain exports.
                            <br/>
                        </p>
                    </div>

                    <br/>

                    <div className={styles.custom_section_wrapper}>
                        <img className={styles.custom_image} src={require("../../theme/mississippi_river_watershed_map.png")} />
                    </div>

                    <div className={styles.custom_paragraph}>
                        <p className={styles.custom_header_second + ' ' + styles.custom_header_second_center}>
                            The Mississippi River is the fourth largest watershed in the world
                        </p>
                        <p>
                            The health of the river system is directly dependent on the health of its watershed,
                            or the entire land area that drains into the river. In much of the Mississippi River
                            Watershed, the landscape has been altered from its natural state, in order to provide
                            for human development. At the same time, rivers provide invaluable natural resources
                            and ecological services that are finite and fragile, requiring continued stewardship
                            and management.
                        </p>
                        <p className={styles.custom_header_second + ' ' + styles.custom_header_second_center}>
                            The health of the river system is directly dependent on the health of its watershed
                        </p>
                        <p>
                            Maintaining the health of the river while also maintaining its multiple, and at times
                            competing, functions is a continued challenge and includes addressing major water
                            quality issues such as hypoxia in the Gulf of Mexico.  Hypoxia, meaning low oxygen,
                            occurs when dissolved oxygen levels are too low to support aquatic organisms creating
                            "dead zones." The causes of hypoxia include excess nutrients in the water column, which
                            facilitate algal blooms and phytoplankton growth.
                        </p>
                        <p>
                            The phytoplankton soon die and decompose, consuming oxygen in the process, which causes
                            the death of aquatic organisms that cannot escape to areas with higher oxygen levels.
                            Although the Gulf's waters are rich in oxygen, a process called stratification, caused
                            by the natural layering of fresh water from the river and salt water from the Gulf,
                            prevents the two from mixing and keeps the dead zone in place for months at a time.
                        </p>
                    </div>

                    <br/>

                    <div className={styles.custom_section_wrapper}>
                        <img className={styles.custom_image_side_by_side} src={require("../../theme/mississippi_nasa.jpg")} />
                        <img className={styles.custom_image_side_by_side} src={require("../../theme/mississippi_near_st-louis_normally_and_in_flood_93.jpg")} />
                    </div>

                    <div className={styles.custom_about_header_image + " " + styles.custom_background_02}>
                        <div className={styles.custom_about_header_wrapper}>
                            <h2 className={styles.custom_about_header}>About the Great Lakes to Gulf Observatory</h2>
                        </div>
                    </div>
                    <div className={styles.custom_flex_sections}>
                        <div className={styles.about_what_left}>
                            <p className={styles.custom_left_text + " " + styles.custom_left_text_font_01}>
                                The National Great Rivers Research and Education Center developed the
                                Great Lakes to Gulf Observatory (GLTG<sup>SM</sup>) to connect environmental
                                data with scientific concepts and understanding.
                            </p>
                            <p className={styles.custom_left_text}>
                                The GLTG Observatory is an interactive geospatial application that integrates
                                water quality data from different sources to better facilitate analysis and
                                provide knowledge of nutrient pollution and water quality conditions in the
                                Mississippi River watershed.  The GLTG's web-based application allows users
                                to dynamically search for and visualize water quality information on the
                                Mississippi River and its tributaries.  The application uses a combination
                                of different data sources including long-term data sets, providing the users
                                with a better picture of water quality in the watershed.
                            </p>
                            <p className={styles.custom_left_text}>
                                The application's features, visualizations and design allows researchers,
                                communities, and decision makers to better understand nutrient inputs and
                                loads, expedite data-to-knowledge-to policy connections, enhance risk
                                management, empower emergency response and inform long-term strategic planning.
                                Data integration and visualization occurs within a cyber-infrastructure framework
                                constructed in collaboration with the National Center for Supercomputing
                                Applications (NCSA) and Illinois-Indiana Sea Grant (IISG) at the University of Illinois.
                            </p>
                        </div>
                        <div className={styles.custom_section_wrapper + " " + styles.custom_section_height}>
                            <img className={styles.custom_image_overlap_below} src={require("../../theme/gltg-zoom.jpg")} />
                            <img className={styles.custom_image_overlap_above} src={require("../../theme/popup.png")} />
                        </div>
                    </div>
                    <br/>

                    <div className={styles.custom_about_header_image + " " + styles.custom_about_header_no_image}>
                        <div className={styles.custom_about_header_wrapper}>
                            <h2 className={styles.custom_about_header}>What are We Studying?</h2>
                        </div>
                    </div>
                    <div className={styles.custom_section_wrapper + " " + styles.custom_flex_sections}>
                        <div className={styles.about_what_left}>
                            <p className={styles.custom_left_text + " " + styles.custom_left_text_font_02}>
                                GLTG℠ efforts focus on a suite of water quality parameters integrated from numerous
                                geospatially referenced sources, including the Great Rivers Ecological Observatory
                                Network (GREON<sup>SM</sup>), in addition to continuous and discrete long term water quality data
                                sets (as appropriate and available) from federal and state agencies, water utilities,
                                and other sources.
                            </p>
                            <p className={styles.custom_left_text + " " + styles.custom_left_text_font_02}>
                                The image to the right shows a GREON buoy. These are deployed throughout the Mississippi
                                River basin collecting data.
                            </p>
                        </div>
                        <div className={styles.custom_center_text}>
                            <ListHeader className={styles.custom_header_fourth}>PARAMETERS</ListHeader>
                            <List>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Ammonium</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Blue Green Algae</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Chlorophyll a</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Dissolved Oxygen</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Fine Dissolved Organic Matter</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Nitrate</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Salinity</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Specific Conductivity</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Temperature</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Total Nitrogen</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Total Suspended Solids</ListItem>
                                <ListItem className={styles.custom_list_items + " " + styles.custom_list_color}>Turbidity</ListItem>
                            </List>
                        </div>
                        <div>
                            <img className={styles.custom_image_right_side} src={require("../../theme/buoy.jpg")} />
                        </div>
                    </div>
                    <br/>

                    <div className={styles.custom_about_header_image + " " + styles.custom_about_header_no_image}>
                        <div className={styles.custom_about_header_wrapper}>
                            <h2 className={styles.custom_about_header}>Disclaimer</h2>
                        </div>
                    </div>

                    <div className={styles.custom_paragraph}><br/>
                        <p> The Great Lakes to Gulf<sup>SM</sup> application is an interactive geospatially
                            referenced database that aggregates water quality data from several sources. Currently,
                            GLTG<sup>SM</sup> includes sites with five or more years of discreet nutrient data in the main stem of the Mississippi
                            River, continuous water quality monitoring sites in the Mississippi River watershed with nutrient data,
                            and selected small watersheds (HUC-8 or smaller). GLTG will display additional parameters as they are
                            available.
                        </p><br/>
                        <p><em>Great Lakes to Gulf includes as many sites as possible that fit the above
                            criteria from data sources considered reputable. However, data on Great Lakes to Gulf should not be
                            considered comprehensive, and data sources and sites may be added or removed from the application.
                            While efforts have been made to ensure site data is identical to the primary source data from which it
                            is pulled, users should utilize original source data for work with legal implications.</em>
                        </p><br/>
                        <p><strong>Data housing and display</strong>- Currently Great Lakes to Gulf displays
                            only data retrieved from primary sources without transforming the data or performing calculations. Two
                            exceptions to this rule are (1) the calculated loads where discharge and concentration are measured at
                            the same location, and (2) in long data ranges with many points, data are displayed as an average for a
                            specified time period. Where these exceptions occur, they are noted.
                        </p><br/>
                        <p><strong>Data quality</strong>- Great Lakes to Gulf is wholly reliant on the quality
                            of the primary source data that is queried by the application. All quality assurance and quality control
                            schemes are the responsibility of the data owner. To learn more about each data source’s quality control
                            information, click the “i” button next to the source and follow the links to the primary source metadata.
                            Questions regarding data should be directed to the original source.
                        </p><br/>
                        <p><strong>Update frequency</strong>- For each data source displayed on Great Lakes to
                            Gulf, the data are provided in one of several ways, with a corresponding update schedule.
                        </p><br/>
                        <p><em>Web Service Data </em>– For sites with a web service for data retrieval (API)
                            GLTG queries that web service every 15 minutes for updates. Updates to data displayed on GLTG occur only
                            as frequently as provided by the web service.
                        </p><br/>
                        <p><em>Manual Input </em>– For data that is uploaded to GLTG manually (through
                            spreadsheets or other files that must be manually retrieved), GLTG staff request updated datasets no less
                            frequently then every six months.  Updates to data occur only as frequently as provided by the data owner.
                        </p><br/>
                        <p>If you have questions or comments, or if there are additional datasets that you
                            believe are relevant to GLTG and are not displayed, please send an email to Ted Kratschmer, GLTG Lead,
                            at <a href="mailto:gltg@lc.edu">gltg@lc.edu</a>.
                        </p><br/>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }

}

export default About;
