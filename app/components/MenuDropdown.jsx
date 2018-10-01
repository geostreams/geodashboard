import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import styles from '../styles/menuBar.css';
import {
    Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle,
    Button, MenuItem, Menu, MenuAnchor, Icon
} from 'react-mdc-web';


class MenuDropdown extends Component {

    state: {
        openMenu: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            openMenu: false
        };
        this.toggleTrendMenu = this.toggleTrendMenu.bind(this);
        MenuDropdown.onClickMenuItem = MenuDropdown.onClickMenuItem.bind(this);
    }

    toggleTrendMenu(openMenuValue: boolean) {
        this.setState({openMenu: openMenuValue});
    };

    static onClickMenuItem(route: String) {
        hashHistory.push(route);
    }

    render() {

        const menuItems = this.props.pageChildren.map(item =>
            <MenuItem role="menuitem" key={item.name}
                      onClick={() => MenuDropdown.onClickMenuItem(item.url)}
            >
                <span className={styles.menu_list_item}>{item.name}</span>
            </MenuItem>
        );
        return (
            <li key={this.props.pageName}
                className={this.props.selected === this.props.pageName.toLowerCase() ? styles.active : ''}
            >
                        <span className={styles.navigation_item ? styles.active : ''}
                              onClick={() => this.toggleTrendMenu(true)}
                        >
                            {this.props.pageName}
                            <Icon className={styles.buttonTrends} name="arrow_drop_down"/>
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
        );

    }

}

export default MenuDropdown;
