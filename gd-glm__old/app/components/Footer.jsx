/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/footer.css';
import packageJson from '../../package.json';
import {Link} from 'react-router-dom';


class Footer extends Component {

    render() {
        return (
            <footer className={styles.footerWrapper}>
                <div className={styles.footerImagesParent}>
                    <Link target="_blank" href="http://www.iisgcp.org">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/seagrantil-in-grayscale.png").default}
                             alt="" width="85" height="53"
                        />
                    </Link>
                    <Link target="_blank" href="http://ncsa.illinois.edu">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/ncsa_horizontal-grayscale.png").default}
                             alt="" width="126" height="24"
                        />
                    </Link>
                    <Link target="_blank" href="http://greatlakesrestoration.us">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/glri_logolightgray.png").default}
                             alt="" width="171" height="53"
                        />
                    </Link>
                    <Link target="_blank" href="http://cee.illinois.edu">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/imark_bw.png").default}
                             alt="" height="45"
                        />
                    </Link>
                </div>

                <hr/>

                <div className={styles.footerTextParent}>
                    <p className={styles.footerTextParagraph}>
                        For questions or comments, please contact Paris Collingsworth
                        at <nobr>pcolling@purdue.edu</nobr> or <nobr>312-886-7449</nobr>.
                    </p>
                    <p className={styles.footerTextParagraph}>
                        This website was developed by Illinois-Indiana Sea Grant, University of Illinois National Center
                        for Supercomputing Applications and the Department of Civil and Environmental Engineering.
                    </p>
                    <p className={styles.footerTextParagraph}>
                        Support for development came from a Great Lakes Restoration Initiative grant (DW92329201).
                    </p>
                </div>

                <hr/>

                <div className={styles.footerTextParagraph}>
                    Made with <a href="https://geodashboard.ncsa.illinois.edu/">
                    Geodashboard v{packageJson.version}</a>
                </div>
            </footer>
        );
    }

}

export default Footer;
