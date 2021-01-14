/*
 * @flow
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
// $FlowFixMe
import { getSourceInfo } from 'gd-core__old/app/utils/getConfig';
import styles from './about.css';
import AboutTitle from './AboutTitle';
import AboutData from './AboutData';
import icon01 from '../../images/about/data-icons-01.png';
import icon02 from '../../images/about/data-icons-02.png';
import icon03 from '../../images/about/data-icons-03.png';
import icon04 from '../../images/about/data-icons-04.png';
import icon05 from '../../images/about/data-icons-05.png';

function About (props: Object) {
    const about_data = props.sources.map(source => {
        const source_info = getSourceInfo(source.id);
        if (source_info) {
            return <AboutData source_info={source_info} id={source.id} key={source.id} />;
        }
        return null;
    });

    return (
        <div>
            <div className={styles.custom_page}>
                <AboutTitle title="YOUR LAKES. YOUR DATA." />
                <div className={styles.section_001}>
                    <p>
                            The GLM tool seeks to provide easy access to environmental monitoring data collected
                            throughout the Great Lakes. While the primary source for the data is U. S. Environmental
                            Protection Agency’s Great Lakes National Program Office, other federal and state
                            agencies have contributed as well. Along with a variety of sources, there is also a range of
                            environmental parameters to choose from including nutrients, contaminants and physical
                            properties of water.
                    </p>
                </div>
                <AboutTitle title="What are we studying?" />
                <Grid className={styles.section_002}>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col mdOffset={1} md={10} smOffset={2} sm={8} xsOffset={1} xs={10}
                            className={styles.sectionUnderLine} />
                    </Row>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col md={1} />
                        <Col mdOffset={1} md={3} smOffset={2} sm={4} xsOffset={1} xs={5}
                            className={styles.parameterGroup}>
                                Nutrients
                        </Col>
                        <Col md={2} sm={4} xs={5}>
                            <img width="131" height="131" alt="Icon1" src={icon01} />
                        </Col>
                        <Col md={4} smOffset={2} sm={8} xsOffset={1} xs={10} className={styles.parameterList}>
                            <span className={styles.block}>Chlorophyll a</span>
                            <span className={styles.block}>Nitrite-Nitrate</span>
                            <span className={styles.block}>Total Phosphorus</span>
                            <span className={styles.block}>Silica</span>
                        </Col>
                        <Col md={1} />
                    </Row>
                    <Row>
                        <Col mdOffset={1} md={10} smOffset={1} sm={10} xsOffset={1} xs={10}
                            className={styles.sectionUnderLine} />
                    </Row>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col md={1} />
                        <Col mdOffset={1} md={3} smOffset={2} sm={4} xsOffset={1} xs={5}
                            className={styles.parameterGroup}>
                                Contaminants
                        </Col>
                        <Col md={2} sm={4} xs={5}>
                            <img width="131" height="131" alt="Icon 2" src={icon02} />
                        </Col>
                        <Col md={2} smOffset={2} sm={4} xsOffset={1} xs={5} className={styles.parameterList}>
                            <span className={styles.block}>Chlordane</span>
                            <span className={styles.block}>DDT</span>
                            <span className={styles.block}>Dieldran</span>
                            <span className={styles.block}>Mercury</span>
                        </Col>
                        <Col md={2} sm={4} xs={5} className={styles.parameterList}>
                            <span className={styles.block}>Mirex</span>
                            <span className={styles.block}>Toxaphene</span>
                            <span className={styles.block}>PBDEs</span>
                            <span className={styles.block}>PCBs</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={1} md={10} smOffset={2} sm={8} xsOffset={1} xs={10}
                            className={styles.sectionUnderLine} />
                    </Row>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col md={1} />
                        <Col mdOffset={2} md={3} smOffset={2} sm={4} xsOffset={1} xs={5}
                            className={styles.parameterGroup}>
                                Sensor Data
                        </Col>
                        <Col md={2} sm={4} xs={5}>
                            <img width="131" height="131" alt="icon03" src={icon03} />
                        </Col>
                        <Col md={2} smOffset={2} sm={4} xsOffset={1} xs={5} className={styles.parameterList}>
                            <span className={styles.block}>Beam Attenuation</span>
                            <span className={styles.block}>Chlorohyll a</span>
                            <span className={styles.block}>Conductivity</span>
                            <span className={styles.block}>Dissolved Oxygen</span>
                        </Col>
                        <Col md={2} sm={4} xs={5} className={styles.parameterList}>
                            <span className={styles.block}>Nitrite-Nitrate</span>
                            <span className={styles.block}>Temperature</span>
                            <span className={styles.block}>Zooplankton</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={1} md={10} smOffset={2} sm={8} xsOffset={1} xs={10}
                            className={styles.sectionUnderLine} />
                    </Row>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col md={1} />
                        <Col mdOffset={2} md={3} smOffset={2} sm={4} xsOffset={1} xs={5}
                            className={styles.parameterGroup}>
                                River Discharge
                        </Col>
                        <Col md={2} sm={4} xs={5}>
                            <img width="131" height="131" alt="Icon 04" src={icon04} />
                        </Col>
                        <Col md={4} smOffset={2} sm={8} xsOffset={1} xs={10} className={styles.parameterList}>
                            <span className={styles.block}>River Water Discharge
                                <span className={styles.grayText}> (cubic feet/sec)</span>
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col mdOffset={1} md={10} smOffset={2} sm={8} xsOffset={1} xs={10}
                            className={styles.sectionUnderLine} />
                    </Row>
                    <div className={styles.spacer30U} />
                    <Row>
                        <Col md={1} />
                        <Col mdOffset={2} md={3} smOffset={2} sm={4} xsOffset={1} xs={5}
                            className={styles.parameterGroup}>
                                Aquatic Life
                        </Col>
                        <Col md={2} sm={4} xs={5}>
                            <img width="131" height="131" alt="Icon 05" src={icon05} />
                        </Col>
                        <Col md={4} smOffset={2} sm={8} xsOffset={1} xs={10} className={styles.parameterList}>
                            <span className={styles.block}>Zooplankton</span>
                        </Col>
                    </Row>

                    <div className={styles.spacer30U} />
                </Grid>

                <AboutTitle title="Bringing your data" />
                {about_data}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        sources: state.sensors.sources
    };
};

export default connect(mapStateToProps)(About);
