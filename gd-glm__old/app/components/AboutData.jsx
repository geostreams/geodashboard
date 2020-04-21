import React, {Component} from "react";
import styles from '../styles/about.css';
import {Grid, Row, Col} from "react-flexbox-grid";

import noaa from '../../theme/images/noaa.jpg';
import lec from '../../theme/images/erie.jpg';
import usgs from '../../theme/images/rockyrivergage_berea1-u1088.jpg';
import epa from '../../theme/images/rosette-small-u1125.jpg';
import iadn from '../../theme/images/rosette-small-u1125.jpg';
import heidelberg from '../../theme/images/bottles_in_van.jpg';
import glfmsp from '../../theme/images/walleye-u1122.jpg';

class AboutData extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {about, description, prettyName, more_info, link, sop} = this.props.source_info;
        const title = about && about.acronym ? about.acronym : this.props.id.toUpperCase();
        const subtitle = about && about.prettyName ? about.prettyName : prettyName;
        const description_content = about && about.description ? about.description : description;
        let more_info_div, sop_div, note_div = "";
        if (about && about.subdescription) {
            note_div = <span className={styles.noteThat}> {about.subdescription}</span>
        }

        if (more_info && link) {
            more_info_div =
                <span className={styles.learnMore}><a href={link} target={"_blank"}> {more_info} </a> </span>
        }
        if (sop && sop.link && sop.text) {
            sop_div = <span className={styles.learnMore}><a href={sop.link} target={"_blank"}> {sop.text} </a> </span>
        }

        let image_url;
        if (this.props.id === "epa") {
            image_url = epa;
        } else if (this.props.id === "glfmsp") {
            image_url = glfmsp;
        } else if (this.props.id === "heidelberg") {
            image_url = heidelberg;
        } else if (this.props.id === "iadn") {
            image_url = iadn;
        } else if (this.props.id === "lec") {
            image_url = lec;
        } else if (this.props.id === "usgs") {
            image_url = usgs;
        }
        else if (this.props.id === "noaa") {
            image_url = noaa;
        }

        const image = <img src={image_url} width={"280px"}/>

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
                <div className={styles.spacer15U}/>
                <Grid>
                    <Row>
                        <Col md={3} className={styles.margin1em}>
                            {image}
                        </Col>
                        <Col md={6} className={styles.margin1em}>
                            {description_content}
                            <br/>
                            {note_div}
                            <br/><br/>
                            {more_info_div}
                            {sop_div}
                        </Col>
                        <Col md={3}>
                        </Col>
                    </Row>
                </Grid>
                <div className={styles.spacer30U}/>
            </div>
        );
    }

}

export default AboutData;
