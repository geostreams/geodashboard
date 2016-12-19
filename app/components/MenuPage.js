import React, {Component} from 'react'
import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class MenuPage extends Component {

    render() {
        return (
            <header>
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="Geodashboard 3.0">
                        <Menu listStyle={{ display: 'flex'}}>
                            <MenuItem primaryText="Home" containerElement={<Link to="/" />}/>
                            <MenuItem primaryText="Explore" containerElement={<Link to="/explore" />}/>
                            <MenuItem primaryText="Search" containerElement={<Link to="/search" />}/>
                            <MenuItem primaryText="About" containerElement={<Link to="/about" />}/>
                        </Menu>
                    </AppBar>
                </div>
            </header>
        );
    }

}

export default MenuPage;