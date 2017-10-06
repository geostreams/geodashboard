/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from '../styles/menuPage.css';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor
} from 'react-mdc-web';
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
    }

    onClickTrendButton(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };

    render() {

        let application_title;
        let applicationOptions = getApplicationOptions();
        let menuOptions = [];
        let menuOptionsMap = [];

        if (applicationOptions) {
            for (let i = 0; i < applicationOptions.length; i++) {
                application_title = applicationOptions[i].title;
                applicationOptions[i].pages.map((m) => {
                    if (m.name == 'TRENDS') {
                        menuOptionsMap.push(
                            <Button key={m.name} className={styles.trends_button_style}
                                onClick={this.onClickTrendButton.bind(this, true)}>
                                TRENDS
                            </Button>);
                        menuOptionsMap.push(
                            <MenuAnchor key="trendsAnchor" className={styles.menu_anchor_style}>
                                <Menu className={styles.menu_style}
                                      open={this.state.openMenu}
                                      onClose={this.onClickTrendButton.bind(this, false)}>
                                    <MenuItem>
                                        <Button className={styles.button_style}>
                                            <Link href={"#trendsstations"}>TRENDS STATIONS</Link>
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button className={styles.button_style}>
                                            <Link href={"#trendsregions"}>TRENDS REGIONS</Link>
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </MenuAnchor>
                        )
                    } else {
                        menuOptionsMap.push(
                            <Button key={m.name}><Link href={m.url}>{m.name}</Link></Button>
                        )
                    }
                });
                menuOptions = menuOptions.concat(menuOptionsMap);
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
