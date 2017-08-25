/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from '../styles/menuPage.css';
import {Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
        Button, MenuItem, Menu, MenuAnchor
} from 'react-mdc-web';


class MenuPage extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            openMenu: false,
        };
    }

    onClickTrendButton(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };


    render() {

        return (
            <Toolbar>
                <ToolbarRow>
                    <ToolbarSection align="start">
                        <ToolbarTitle> Geodashboard 3.0</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection align="end">
                        <ToolbarTitle className={styles.menu_items}>
                            <Button><Link onlyActiveOnIndex to="/">HOME</Link></Button>
                            <Button><Link onlyActiveOnIndex to="/explore">EXPLORE</Link></Button>
                            <Button><Link onlyActiveOnIndex to="/search">SEARCH</Link></Button>
                            <Button><Link onlyActiveOnIndex to="/analysis">EXPLORATORY ANALYSIS</Link></Button>
                            <Button className={styles.trends_button_style}
                                    onClick={this.onClickTrendButton.bind(this, true)}>
                                TRENDS
                            </Button>
                            <Button><Link onlyActiveOnIndex to="/about">ABOUT</Link></Button>
                            <MenuAnchor className={styles.menu_anchor_style}>
                                <Menu className={styles.menu_style}
                                      open={this.state.openMenu}
                                      onClose={this.onClickTrendButton.bind(this, false)}>
                                    <MenuItem>
                                        <Button className={styles.button_style}>
                                            <Link onlyActiveOnIndex to="/trendsstations">TRENDS STATIONS</Link>
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button className={styles.button_style}>
                                            <Link onlyActiveOnIndex to="/trendsregions">TRENDS REGIONS</Link>
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </MenuAnchor>
                        </ToolbarTitle>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }

}

export default MenuPage;
