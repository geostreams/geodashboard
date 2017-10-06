import React, {Component} from 'react'
import {Link} from 'react-router'
import styles from '../styles/menuBar.css';

class MenuBar extends Component {
    constructor(props:Object) {
        super(props);
    }

    render() {
        let logo;
        // TODO: check if logo exist
        //if(resource("public/theme/logo.png").isDefined) {
           logo =
               <div className={styles.header_image}>
                <img src={require("../../theme/logo.png")} />
              </div>;
        //}

        return (
            <header>
                <div className={styles.header_background}>
                    <div className={styles.header_banner} >

                    {logo}
                        <div className={styles.header_title}>
                            <p id="header-title-text" className={styles.header_title_text}>{this.props.header_title}</p>
                        </div>
                        <div className={styles.header_subtitle}>
                            <p id="header-subtitle-text" className={styles.header_subtitle_text}>{this.props.subtitle}</p>
                        </div>
                        <div className={styles.header_hr_div}>
                            <hr className={styles.header_hr} />
                        </div>
                            <ul className={styles.navbar} id="navigation">
                                <li className={this.props.selected === "home"? styles.active: '' }><a href="/" >HOME</a></li>
                                <li className={this.props.selected === "explore"? styles.active: '' }><a href="/geodashboard/#explore">EXPLORE</a></li>
                                <li className={this.props.selected === "compare"? styles.active: '' }><a href="/geodashboard/#compare">COMPARE</a></li>
                                <li className={this.props.selected === "search"? styles.active: '' }><Link to="/search" >SEARCH</Link></li>
                                <li className={this.props.selected === "about"? styles.active: '' }><a href="/geodashboard/#about">ABOUT</a></li>
                            </ul>
                        </div>
                </div>
            </header>
        );
    }
}

export default MenuBar;