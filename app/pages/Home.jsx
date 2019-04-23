import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';
import SwitchBackend from '../containers/SwitchAPI';
import Carousel from "../components/Carousel";
import {getCarouselImageNames} from '../utils/getConfig';
import Footer from '../components/Footer';


class Home extends Component {
    render() {

        let carousel= '';
        if (getCarouselImageNames().length > 0) {
            carousel = <Carousel/>;
        }

        return (
            <div>
                <Menu selected='home'/>
                <div className={styles.contentcenter}>
                    {carousel}
                    <div><h3>Welcome to the Geodashboard!</h3></div>
                    <SwitchBackend/>
                </div>
                <Footer/>
            </div>
        );

    }
}

export default Home;
