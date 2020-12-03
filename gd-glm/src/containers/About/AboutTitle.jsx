/*
 * @flow
 */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styles from './about.css';

function AboutTitle (props: Object) {
    return (
        <div>
            <div className={styles.spacer60U} />
            <div className={styles.title}>
                {props.title}
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
}

export default AboutTitle;
