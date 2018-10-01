import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from '../styles/menuBar.css';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor, Icon
} from 'react-mdc-web';
import {
    getApplicationOptions, getIEAlertMenuBarShow, getIEAlertHeader, getIEVersionEdge,
    getIEVersionEleven, getIEVersionsBeforeEleven, getMobileSizeMax, getMobileExplorePath
} from "../utils/getConfig";
import MenuDropdown from "./MenuDropdown";


class MenuBar extends Component {

    render() {
        let logo;
        try {
            logo = <div className={styles.header_image}>
                <img src={require("../../theme/logo.png")} />
            </div>;
        } catch(e) {}

        const applicationOptions = getApplicationOptions();

        const pageLinks = [];
        applicationOptions.pages.map( page => {
            if (page.url) {
                // If Explore Page and Mobile View Active, then replace V2 with V3 in the Menu Bar Link
                if (page.url.includes('explore') && page.url.includes('geodashboard')
                    && screen.width <= getMobileSizeMax()
                ) {
                    page.url = getMobileExplorePath();
                }
                pageLinks.push(
                    <li key={page.name} className={this.props.selected === page.name.toLowerCase() ? styles.active: ''}>
                        <Link href={page.url}>{page.name}</Link>
                    </li>
                );
            } else if (page.children){
                let childPageLinks = <MenuDropdown pageName={page.name} pageChildren={page.children}/>;
                pageLinks.push(childPageLinks);
            }
        });

        let ie_error_text = '';
        if (getIEAlertMenuBarShow() === true) {
            let navUserAgent = navigator.userAgent.toLowerCase();
            let isIE = 'false';
            if (navUserAgent.indexOf('msie') !== -1){
                isIE = parseInt(navUserAgent.split('msie')[1]).toString();
                if (getIEVersionsBeforeEleven().indexOf(isIE) !== -1) {
                    ie_error_text = <span className={styles.header_alert}>{getIEAlertHeader()}</span>
                }
            }
            if (
                (navUserAgent.indexOf('msie') === -1 && navUserAgent.indexOf('trident') !== -1 &&
                    getIEVersionEleven() === true) ||
                (navUserAgent.indexOf('edge') !== -1 && getIEVersionEdge() === true)) {
                ie_error_text = <span className={styles.header_alert}>{getIEAlertHeader()}</span>
            }
        }

        return (
            <header>
                <div className={styles.header_background}>
                    <div className={styles.header_banner} >
                        {logo}
                        <div className={styles.header_title}>
                            <p id="header-title-text" className={styles.header_title_text}>
                                {this.props.header_title}
                            </p>
                        </div>
                        <div className={styles.header_subtitle}>
                            <p id="header-subtitle-text" className={styles.header_subtitle_text}>
                                {this.props.subtitle} </p>
                        </div>
                        <div className={styles.header_hr_div}>
                            {ie_error_text}
                            <hr className={styles.header_hr} />
                        </div>
                        <ul className={styles.navbar} id="navigation">
                            {pageLinks}
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default MenuBar;
