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

import LogoApp from '../../images/logo_app.png';

export const HEADERS_HEIGHT = 50;

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
                <Tabs
                    className={classes.navBar}
                    value={location.pathname.split('/')[1]}
                    centered
                >
                    <Tab
                        label="Home"
                        component={Link}
                        to="/"
                        value=""
                    />
                    <Tab
                        label="Explore"
                        component={Link}
                        to="/explore"
                        value="explore"
                    />
                    <Tab
                        label="Download"
                        component={Link}
                        to="/search"
                        value="download"
                    />
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Header);
