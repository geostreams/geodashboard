/*
 * @flow
 */

import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import styles from '../styles/menuPage.css';
import {
	Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
	Button, MenuItem, Menu, MenuAnchor
} from 'react-mdc-web/lib';
import {getApplicationOptions} from '../utils/getConfig';


class MenuPage extends Component {
    state: {
        openMenu: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            openMenu: false
        };
        (this: any).onClickMenuItem = this.onClickMenuItem.bind(this);
        (this: any).toggleTrendMenu = this.toggleTrendMenu.bind(this);
    }

    toggleTrendMenu(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };

    onClickMenuItem(route: String) {
        browserHistory.push(route);
    }

    render() {

        let application_title;
        let applicationOptions = getApplicationOptions();
        let menuOptions = [];

        if (applicationOptions) {
            for (let i = 0; i < applicationOptions.length; i++) {
                application_title = applicationOptions[i].title;
                applicationOptions[i].pages.map((m) => {
                    if (m.name === 'TRENDS') {
                        menuOptions.push(
                            <MenuAnchor key={m.name} className={styles.inline}>
                                <Button
                                    onClick={() => this.toggleTrendMenu(true)}

                                    className={styles.white_color}
                                >
                                    TRENDS
                                </Button>
                                <Menu className={styles.menu_style}
                                      open={this.state.openMenu}
                                      onClose={() => this.toggleTrendMenu(false)}
                                >
                                    <MenuItem key="trends_stations" className="mdc-button"><Link
                                        href={"/#trendsstations"}>TRENDS BY STATION </Link></MenuItem>
                                    <MenuItem key="trends_regions" className="mdc-button"><Link
                                        href={"/#trendsregions"}>TRENDS BY REGIONS </Link></MenuItem>
                                </Menu>
                            </MenuAnchor>
                        )

                    } else {
                        menuOptions.push(
                            <div key={m.name} className="mdc-button"><Link href={m.url}>{m.name}</Link></div>
                        )
                    }
                });
            }
        }

        return (
            <Toolbar className={styles.menu_style}>
                <ToolbarRow>
                    <ToolbarSection align="start">
                        <ToolbarTitle>{application_title}</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection align="end">
                        <ToolbarTitle className={styles.menu_items}>
                            {menuOptions}
                        </ToolbarTitle>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }

}

export default MenuPage;