/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @flow
 */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
    ClickAwayListener
} from '@material-ui/core';
import LogoApp from '../../images/logo.png';

export const HEADERS_HEIGHT = 132;

function DropDown({ label = '', children }: Object) {
    const [isActive, toggleActive] = useState(false);
    return(
        <>
            <a 
                className="dropDownLink" 
                onClick={() => toggleActive(!isActive)}> 
                {label} &#9660;
            </a>
            {isActive ?
                <ClickAwayListener onClickAway={() => toggleActive(false)}>
                    <div className="dropdownList" id="dropdownItemsTrends">
                        {children}
                    </div>
                </ClickAwayListener> :
                null}
        </>
    );
}

const Header = () => {

    return (
        <header className="header_banner">
            <div>
                <img className="header_image" src={LogoApp} alt="GLM Logo" />
            </div>
            <div className="header_title">
                <p id="header-title-text" className="header_title_text">
                Great Lakes Monitoring
                </p>
            </div>
            <div className="header_subtitle">
                <p id="header-subtitle-text" className="header_subtitle_text">
                ILLINOIS-INDIANA SEA GRANT </p>
            </div>
            <div className="nav">
                <ul id="sidebar">
                    <li className="welcome"><a href="/">WELCOME</a></li>
                    <li className="explore"><a href="/explore/all">EXPLORE</a></li>
                    <li className="download"><a href="/search">DOWNLOAD</a></li>
                    <li className="dropdown">
                        <DropDown label="TRENDS">
                            <a href="/trendsstations">TRENDS STATIONS</a>
                            <a href="/trendsregions">TRENDS REGIONS</a>
                        </DropDown>
                    </li>

                    <li className="analysis"><a href="/about">ABOUT</a></li>
                </ul>
            </div>
        </header>
    );
};

export default withRouter(Header);
