import React, {Component} from "react";
import styles from '../styles/about.css';
import {Row, Col} from "react-flexbox-grid";

class AboutTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className={styles.spacer60U}/>
                <div className={styles.title}>
                    {this.props.title}
                </div>
                <div className={styles.spacer30U}/>
                <Row>
                    <Col md={3}/>
                    <Col md={6}>
                    <div className={styles.sectionUnderLine}/>
                    </Col>
                    <Col md={3}/>
                </Row>
                <div className={styles.spacer30U}/>
            </div>
        );
    }

}

export default AboutTitle;
