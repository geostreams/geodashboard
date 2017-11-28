import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';
import styles from '../styles/menuBar.css';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor, Icon
} from 'react-mdc-web';
import {getApplicationOptions} from "../utils/getConfig";

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

    onClickTrendButton(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };

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
        applicationOptions.pages.map( page =>
        {
	        if(page.url) {
		        pageLinks.push(
		            <li key={page.name} className={this.props.selected === page.name.toLowerCase() ? styles.active: ''}>
                        <Link href={page.url}>{page.name}</Link>
                    </li>
                );
	        } else if(page.children){

                const menuItems = page.children.map(item =>
                    <MenuItem role="menuitem" key={item.name} onClick={() => this.onClickMenuItem(item.url)}>
                        {item.name}
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
        }
        );
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
                                {this.props.subtitle}
                            </p>
                        </div>
                        <div className={styles.header_hr_div}>
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