import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from '../styles/menuPage.css';
import {Button, Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle} from 'react-mdc-web';

class MenuPage extends Component {

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
                            <Button><Link onlyActiveOnIndex to="/about">ABOUT</Link></Button>
                        </ToolbarTitle>
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>
        );
    }

}

export default MenuPage;
