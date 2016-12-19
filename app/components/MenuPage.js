import React, {Component} from 'react'
import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import styles from '../styles/menuPage.css';

class MenuPage extends Component {

    render() {
        return (
            <header>
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="Geodashboard 3.0">
                        <div className={styles.button_format}>
                            <FlatButton label="Home" containerElement={<Link to="/" />}/>
                            <FlatButton label="Explore" containerElement={<Link to="/explore" />}/>
                            <FlatButton label="Search" containerElement={<Link to="/search" />}/>
                            <FlatButton label="About" containerElement={<Link to="/about" />}/>
                        </div>
                    </AppBar>
                </div>
            </header>
        );
    }

}

export default MenuPage;