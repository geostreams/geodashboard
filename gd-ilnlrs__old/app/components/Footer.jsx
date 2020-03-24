/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/footer.css';
import packageJson from '../../package.json';
import {Link} from 'react-router';


class Footer extends Component {

    render() {
        return (
            <footer className={styles.footerWrapper}>
                <div className={styles.footerImagesParent}>
                    <Link target="_blank" href="http://lc.edu">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/lc_logo_vector_lewis_and_clark_long.png")}
                             alt="" width="182" height="35"
                        />
                    </Link>
                    <Link target="_blank" href="http://www.ngrrec.org">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/ngrrec-logo-grayscale.png")}
                             alt="" width="199" height="65"
                        />
                    </Link>
                    <Link target="_blank"href="http://ncsa.illinois.edu">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/ncsa_horizontal-grayscale.png")}
                             alt="" width="126" height="24"
                        />
                    </Link>
                    <Link target="_blank" href="https://iiseagrant.org/">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/seagrantil-in-grayscale.png")}
                             alt="" width="85" height="53"
                        />
                    </Link>
                    <Link target="_blank" href="http://cee.illinois.edu">
                        <img className={styles.footerImagesItem}
                             src={require("../../theme/imark_bw.png")}
                             alt="" height="45"
                        />
                    </Link>
                </div>

                <hr/>

                <div className={styles.footerTextParent}>
                    <p className={styles.footerTextParagraph}>
                        This website was developed by NGRREC, Lewis & Clark Community College,
                        University of Illinois National Center for Supercomputing Applications
                        and the University of Illinois at Urbana-Champaign. <br/>
                        &copy; 2014 National Center for Supercomputing Applications.
                    </p>
                </div>

                <hr/>

                <div><a href="https://geodashboard.ncsa.illinois.edu/">
                    Geodashboard v{packageJson.version}</a>
                </div>
            </footer>
        );
    }
}

export default Footer;