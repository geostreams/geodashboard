import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';
import styles from '../styles/menuBar.css';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor, Icon
} from 'react-mdc-web';
import {
    getApplicationOptions, getIEAlertMenuBarShow, getIEAlertHeader, getIEVersionEdge,
    getIEVersionEleven, getIEVersionsBeforeEleven, getMobileSizeMax, getMobileExplorePath
} from "../utils/getConfig";

class MenuBar extends Component {
    state: {
        openMenu: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            openMenu: false
        };
        this.toggleTrendMenu = this.toggleTrendMenu.bind(this);
        this.onClickMenuItem = this.onClickMenuItem.bind(this);
    }

    toggleTrendMenu(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };

    onClickMenuItem(route: String) {
        hashHistory.push(route);
    }

    render() {
        let logo;
        try {
            logo = <div className={styles.header_image}>
                <img src={require("../../theme/logo.png")} />
            </div>;
        } catch(e) {

        }

        const applicationOptions = getApplicationOptions();

        const pageLinks = [];
        applicationOptions.pages.map( page => {
            if(page.url) {
                // If Explore Page and Mobile View Active, then replace V2 with V3 in the Menu Bar Link
                if(page.url.includes('explore') && page.url.includes('geodashboard') && screen.width <= getMobileSizeMax()) {
                    page.url = getMobileExplorePath();
                }
                pageLinks.push(
                    <li key={page.name} className={this.props.selected === page.name.toLowerCase() ? styles.active: ''}>
                        <Link href={page.url}>{page.name}</Link>
                    </li>
                );
            } else if(page.children){

                const menuItems = page.children.map(item =>
                    <MenuItem role="menuitem" key={item.name} onClick={() => this.onClickMenuItem(item.url)}>
                        <span className={styles.menu_list_item}>{item.name}</span>
                    </MenuItem>
                );
                pageLinks.push(
                    <li key={page.name} className={this.props.selected === page.name.toLowerCase() ? styles.active: ''}>
                        <span className={styles.navigation_item ? styles.active: ''}
                              onClick={() => this.toggleTrendMenu(true)}
                        >
                            {page.name}<Icon className={styles.buttonTrends} name="arrow_drop_down"/>
                        </span>
                        <MenuAnchor className={styles.inline}>
                            <Menu className={styles.menu_style}
                                  open={this.state.openMenu}
                                  onClose={() => this.toggleTrendMenu(false)}
                            >
                                {menuItems}
                            </Menu>
                        </MenuAnchor>
                    </li>
                )
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
