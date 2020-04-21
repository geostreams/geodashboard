// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    AppBar,
    Avatar,
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
import LogoApp from 'gd-geostreaming/src/images/logo_app.png';

export const HEADERS_HEIGHT = 61;

const useStyles = makeStyles((theme) =>{
    return ({
        mainHeader: {
            'background': theme.palette.primary.main,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'height': HEADERS_HEIGHT,
            'minHeight': HEADERS_HEIGHT,
            '& a': {
                margin: 5
            }
        },
        headerText: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none'
        },
        navBar: {
            flexGrow: 1
        },
        marginLeftAuto: {
            marginLeft: 'auto !important'
        },
        dropdown: {
            zIndex: 10
        },
        dropdownIcon: {
            display: 'flex'
        }
    });
});

type Props = {
    location: {
        pathname: string
    }
}

const Header = ({ location }: Props) => {
    const classes = useStyles();

    const aboutMenuEl = React.useRef(null);
    const [aboutMenuOpen, updateAboutMenuOpen] = React.useState(false);

    const geostreamingMenuEl = React.useRef(null);
    const [geostreamingMenuOpen, updateGeostreamingMenuOpen] = React.useState(false);

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.mainHeader}>
                <Avatar
                    component={Link}
                    to="/"
                    src={LogoApp}
                />
                <Typography
                    component={Link}
                    to="/"
                    className={classes.headerText}
                    variant="h6"
                    noWrap
                >
                    Great Lakes to Gulf
                </Typography>
                <Tabs className={classes.navBar} centered value={location.pathname.split('/')[1]}>
                    <Tab
                        className={classes.marginLeftAuto}
                        label="Home"
                        component={Link}
                        to="/"
                        value=""
                    />
                    <Tab
                        label="Data Stories"
                        component={Link}
                        to="/data-stories"
                        value="data-stories"
                    />
                    <Tab
                        ref={aboutMenuEl}
                        component="a"
                        label={
                            <span className={classes.dropdownIcon}>
                                About GLTG <ArrowDropDownIcon />
                            </span>
                        }
                        value="about"
                        onClick={() => updateAboutMenuOpen(true)}
                    />
                    <Tab
                        ref={geostreamingMenuEl}
                        component="a"
                        className={classes.marginLeftAuto}
                        label={
                            <span className={classes.dropdownIcon}>
                                Geostreaming App <ArrowDropDownIcon />
                            </span>
                        }
                        value="geostreaming"
                        onClick={() => updateGeostreamingMenuOpen(true)}
                    />
                    <Popper
                        anchorEl={aboutMenuEl.current}
                        open={aboutMenuOpen}
                    >
                        <ClickAwayListener
                            onClickAway={() => updateAboutMenuOpen(false)}
                        >
                            <Paper>
                                <MenuItem component={Link} to="/about">
                                    About
                                </MenuItem>
                                <MenuItem component={Link} to="/about/partners">
                                    Partners
                                </MenuItem>
                                <MenuItem component={Link} to="/about/faq">
                                    FAQ
                                </MenuItem>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                    <Popper
                        className={classes.dropdown}
                        anchorEl={geostreamingMenuEl.current}
                        open={geostreamingMenuOpen}
                    >
                        <ClickAwayListener
                            onClickAway={() => updateGeostreamingMenuOpen(false)}
                        >
                            <Paper>
                                <MenuItem
                                    component={Link}
                                    to="/geostreaming"
                                >
                                    About
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/geostreaming/explore/all"
                                >
                                    Explore
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/geostreaming/search"
                                >
                                    Download
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    to="/geostreaming/analysis"
                                >
                                    Analysis
                                </MenuItem>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Header);
