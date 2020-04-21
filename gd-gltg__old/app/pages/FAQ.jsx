import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/customStyles.css';
import {Button} from 'react-mdc-web';


class FAQ extends Component {
    render() {
        return (
            <div>
                <Menu selected='home'/>
                <div className={styles.custom_page}>
                    <div className={styles.custom_header}>
                        <h2>Frequently Asked Questions (FAQ)</h2>
                    </div>

                    <div>

                        <div className={styles.faqSection}>
                            <input type="checkbox" id="q1"/>
                            <label htmlFor="q1">
                                Q: How are gaps in data filled? How are load and cumulative load calculated?
                            </label>
                            <p className={styles.faqSectionAnswers}> </p>
                            <p className={styles.faqSectionAnswers}><b>A: Read this document.</b></p>
                            <p>
                                <object data={require("../../theme/usgs_calculations.png")} width="75%" height="75%"> </object>
                            </p>
                        </div>

                        <div className={styles.faqSection}>
                            <input type="checkbox" id="q2"/>
                            <label for="q2">
                                Q: Definitions of continuous and static stations.
                            </label>
                            <p className={styles.faqSectionAnswers}> </p>
                            <p className={styles.faqSectionAnswers}>
                                <b>Continuous Online:</b> A station that is updated daily and is showing data within the last five days.
                                <img src={require("../../theme/online.png")} />
                                <br/>
                                <b>Continuous Offline:</b> A station that is updated daily and is NOT showing data within the last five days.
                                <img src={require("../../theme/offline.png")} />
                                <br/>
                                <b>Static:</b> A station that is not updated on a regular basis and only shows historical data.
                                <img src={require("../../theme/historical.png")} />
                                <br/>
                            </p>
                            <br/>

                            <p className={styles.faqSectionAnswers}>
                                <i>
                                    The pills that show in the accordion of the explore page appear like the pill to the right of each definition.
                                    The markers on the map of the explore page have the same border color as the pill.
                                    In the detail view above the graphs, there is text classifying the sensor as online, offline, or static.
                                </i>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default FAQ;