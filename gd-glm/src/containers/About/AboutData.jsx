/*
 * @flow
 */
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from './about.css';

import noaa from '../../images/about/noaa.jpg';
import lec from '../../images/about/erie.jpg';
import usgs from '../../images/about/rockyrivergage_berea1-u1088.jpg';
import epa from '../../images/about/rosette-small-u1125.jpg';
import heidelberg from '../../images/about/bottles_in_van.jpg';
import glfmsp from '../../images/about/walleye-u1122.jpg';

function AboutData({ source_info, id }: Object){

    const { about, description, prettyName, more_info, link, sop } = source_info;
    const title = about && about.acronym ? about.acronym : id.toUpperCase();
    const subtitle = about && about.prettyName ? about.prettyName : prettyName;
    const description_content = about && about.description ? about.description : description;
    let more_info_div; let sop_div; let note_div = '';
    if (about && about.subdescription) {
        note_div = <span className={styles.noteThat}> {about.subdescription}</span>;
    }

    if (more_info && link) {
        more_info_div =
                <span className={styles.learnMore}><a href={link}> {more_info} </a> </span>;
    }
    if (sop && sop.link && sop.text) {
        sop_div = <span className={styles.learnMore}><a href={sop.link}> {sop.text} </a> </span>;
    }

    let image_url;
    switch(id) {
        case 'epa':
            image_url = epa;
            break;
        case 'glfmsp':
            image_url = glfmsp;
            break;
        case 'heidelberg':
            image_url = heidelberg;
            break;
        case 'iadn':
            image_url = epa;
            break;
        case 'lec':
            image_url = lec;
            break;
        case 'usgs':
            image_url = usgs;
            break;
        case 'noaa':
            image_url = noaa;
            break;        
    }

    const image = <img alt="" src={image_url} width="280px" />;

    return (
        <div>
            <div className={styles.agencyTitleFill}>
                <span className={styles.agencyTitle}>
                    {title}
                </span> &nbsp;
                <span className={styles.agencySubtitle}>
                    {subtitle}
                </span>
            </div>
            <div className={styles.spacer15U} />
            <Grid>
                <Row>
                    <Col md={3} className={styles.margin1em}>
                        {image}
                    </Col>
                    <Col md={6} className={styles.margin1em}>
                        {description_content}
                        <br />
                        {note_div}
                        <br /><br />
                        {more_info_div}
                        {sop_div}
                    </Col>
                    <Col md={3} />
                </Row>
            </Grid>
            <div className={styles.spacer30U} />
        </div>
    );
}

export default AboutData;
