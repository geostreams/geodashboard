// @flow
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';
import LogoApp from '../../images/favicon.png';

export const HEADERS_HEIGHT = 61;

const useStyles = makeStyles((theme) => ({
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
}));

type Props = {
    location: {
        pathname: string
    }
};

const Header = ({ location }: Props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.mainHeader}>
                <Avatar
                    variant="square"
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
                    Geodashboard Template Project
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
                        className={`${classes.tabRoot}`}
                        label="Explore"
                        component={Link}
                        to="/explore/all"
                        value="explore"
                    />
                    <Tab
                        className={`${classes.tabRoot}`}
                        label="Download"
                        component={Link}
                        to="/search"
                        value="search"
                    />
                    <Tab
                        className={`${classes.tabRoot}`}
                        label="About"
                        component={Link}
                        to="/about"
                        value="about"
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Header);
