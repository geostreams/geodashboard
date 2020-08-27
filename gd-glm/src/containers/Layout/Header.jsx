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
import LogoApp from '../../images/logo_app.png';

export const HEADERS_HEIGHT = 132;

const useStyles = makeStyles((theme) =>{
    return ({
        mainHeader: {
            'background': 'linear-gradient(to bottom, #054455, #467A9E)',
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'height': HEADERS_HEIGHT,
            'minHeight': HEADERS_HEIGHT,
            '& a': {
                margin: 5
            }
        },
        logo: {
            height: 90
        },
        headerText: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none'
        },
        tabsRoot: {
            fontSize: 16,
            flexGrow: 1
        },
        tabsIndicator: {
            backgroundColor: '#fff'
        },
        tabRoot: {
            fontSize: '1rem'
        },
        marginLeftAuto: {
            marginLeft: 'auto !important'
        },
        dropdown: {
            zIndex: 1100
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

    const geostreamingMenuEl = React.useRef(null);
    const [geostreamingMenuOpen, updateGeostreamingMenuOpen] = React.useState(false);

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.mainHeader}>
                <Avatar
                    className={classes.logo}
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
                    Great Lakes Monitoring
                </Typography>
                <Tabs
                    classes={{
                        root: classes.tabsRoot,
                        indicator: classes.tabsIndicator
                    }}
                    centered
                    value={location.pathname.split('/')[1]}
                >
                    <Tab
                        className={`${classes.marginLeftAuto} ${classes.tabRoot}`}
                        label="Home"
                        component={Link}
                        to="/"
                        value=""
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="Data Stories"
                        component={Link}
                        to="/data-stories"
                        value="data-stories"
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="Partners"
                        component={Link}
                        to="/partners"
                        value="partners"
                    />
                    <Tab
                        className={classes.tabRoot}
                        label="FAQ"
                        component={Link}
                        to="/faq"
                        value="faq"
                    />
                    <Tab
                        ref={geostreamingMenuEl}
                        component="a"
                        className={`${classes.marginLeftAuto} ${classes.tabRoot}`}
                        label={
                            <span className={classes.dropdownIcon}>
                                Geostreaming App <ArrowDropDownIcon />
                            </span>
                        }
                        value="geostreaming"
                        onClick={() => updateGeostreamingMenuOpen(true)}
                    />
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
