import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';
import SwitchBackend from '../containers/SwitchAPI';
import Footer from '../components/Footer';


class Home extends Component {
    render() {
        return (
            <div>
                <Menu selected='home'/>
                <div className={styles.contentcenter}>
                    <div><h3>Welcome to the Geodashboard!</h3></div>
                    <SwitchBackend/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Home;
