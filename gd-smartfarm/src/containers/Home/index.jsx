// @flow
import React from 'react';
import {
    withStyles
} from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid';
import PageStyles from '../../styles/home.css';
import OverviewImage from '../../images/overview.png';

const styles = {
    ...PageStyles,
    fillContainer: {
        width: '100%',
        height: '100%'
    }
};

function Title ({ textStyle, children }) {
    return (
        <div>
            <div className={styles.spacer60U} />
            <div className={textStyle}>
                {children}
            </div>
            <div className={styles.spacer30U} />
            <Row>
                <Col md={3} />
                <Col md={6}>
                    <div className={styles.sectionUnderLine} />
                </Col>
                <Col md={3} />
            </Row>
            <div className={styles.spacer30U} />
        </div>
    );
};

function Home() {
    return (
        <div>
            <div className={styles.custom_page}>
                <Title textStyle={styles.title}> MBC-Lab Data Portal</Title>
                <div className={styles.section_001}>
                    <p>
                            MBC-Lab Data Portal provides easy access to gold standard spatio-temporal and managerial 
                            variations data collected by the Midwest Bioenergy Crop Landscape Laboratory
                            (MBC-Lab) from multiple sites.
                    </p>
                    <br />
                    <h3>Features: </h3>
                    <ul className={styles.margin1em}>
                        <li className={styles.text}>Explore and visualize available data from a variety of sources</li>
                        <li className={styles.text}>Search for specific data and download</li>
                    </ul>
                </div>
                <div className={styles.section_002}>
                    <Title textStyle={styles.subtitle}>
                        Capturing Spatio-temporal and
                        Managerial Variations to Provide 
                        a Gold Standard Data and Platform for 
                        Validating Field-level Emission from Bioenergy Crops</Title>

                    <img alt="cur" className={styles.image} src={OverviewImage} />

                    <p>
                    The goal of this project is to develop gold-standard, open-access ground-truth
                    solutions that establish measurements, protocols, and data platforms for 
                    monitoring field-level GHG emission. This data can helpto reduce emissions 
                    associated with ethanol and other biofuels by enabling new technology for 
                    managing bioenergy crops, improving yield, reducing overfertilization, 
                    and designing new tools for “smart farms.” The vast data collected
                    will be publicly available and could someday lead to financial rewards for 
                    farmers who reduce emissions through sustainable crop management.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);