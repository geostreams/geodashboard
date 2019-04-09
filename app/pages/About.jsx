import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';
import Footer from "../components/Footer";

class About extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <Footer/>
            </div>
        );
    }

}

export default About;
