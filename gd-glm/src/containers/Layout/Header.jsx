
/*
 * @flow
 */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    AppBar,
    ClickAwayListener,
    MenuItem,
    Paper,
    Popper,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LogoApp from '../../images/logo.png';

export const HEADERS_HEIGHT = 132;

type Props = {
    location: {
        pathname: string
    }
};

const useStyles = makeStyles(() =>{
    return ({
        mainHeader: {
            backgroundImage: 'linear-gradient(to bottom, #054455, #467A9E)',
            textDecoration: 'none',
            position: 'static',
            minHeight: HEADERS_HEIGHT,
            height: HEADERS_HEIGHT
        },
        headerText: {
            position: 'relative',
            left: '-25px'
        },
        logo: {
            display: 'flex',
            margin: '10px 0 0 10px',
            height: '90px',
            zIndex: 32
        },
        tabsRoot: {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '36px'
        },
        tabsIndicator: {
            backgroundColor: '#fff'
        },
        tabRoot: {
            fontSize: '1.1em',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#fff',
            padding: 0,
            minHeight: '36px'
        },
        dropdownIcon: {
            display: 'flex',
            alignItems: 'center'
        },
        dropDownItem: {
            color: 'black',
            fontWeight: 700,
            padding: '10px',
            fontSize: '1.1em'
        }
    });
});

const Header = ({ location }: Props) => {
    const dropDownRef = React.useRef(null);
    const [isDropDownOpen, handleDropDown] = useState(false);
    const activeTab = location.pathname.split('/')[1];
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.mainHeader}>
            <Toolbar>
                <img className={classes.logo} src={LogoApp} alt="GLM Logo" />
                <div className={classes.headerText}>
                    <Typography variant="h1">
                            Great Lakes Monitoring
                    </Typography>
                    <Typography variant="h2">
                        ILLINOIS-INDIANA SEA GRANT
                    </Typography>
                </div>
            </Toolbar>
            <Tabs
                classes={{
                    root: classes.tabsRoot,
                    indicator: classes.tabsIndicator
                }}
                centered
                value={activeTab.search(/^(trendsstation|trendsregion)/) === 0 ? 'trends' : activeTab}
            >
                <Tab
                    className={classes.tabRoot}
                    label="WELCOME"
                    component={Link}
                    to="/"
                    value=""
                />
                <Tab
                    className={classes.tabRoot}
                    label="EXPLORE"
                    component={Link}
                    to="/explore/all"
                    value="explore"
                />
                <Tab
                    className={classes.tabRoot}
                    label="DOWNLOAD"
                    component={Link}
                    to="/search"
                    value="search"
                />

                <Tab
                    className={classes.tabRoot}
                    ref={dropDownRef}
                    label={
                        <span className={classes.dropdownIcon}>
                        TRENDS <ArrowDropDownIcon />
                        </span>
                    }
                    value="trends"
                    component={Link}
                    onClick= {() => handleDropDown(true)}
                />
                <Tab
                    className={classes.tabRoot}
                    label="ABOUT"
                    component={Link}
                    to="/about"
                    value="about"
                />
            </Tabs>
            {/* Trends menu */}
            <Popper
                anchorEl={dropDownRef.current}
                getContentAnchorEl={null}
                open={isDropDownOpen}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => handleDropDown(false)}
            >
                <ClickAwayListener onClickAway={() => handleDropDown(false)}>
                        
                    <Paper square>
                        <MenuItem
                            classes={{
                                root: classes.dropDownItem
                            }}
                            component={Link}
                            to="/trendsstations">
                        TRENDS STATIONS
                        </MenuItem> 
                        <MenuItem
                            classes={{
                                root: classes.dropDownItem
                            }}
                            component={Link}
                            to="/trendsregions">
                        TRENDS REGIONS
                        </MenuItem>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </AppBar>
    );
};

export default withRouter(Header);
