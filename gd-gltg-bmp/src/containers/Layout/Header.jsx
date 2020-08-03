// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Box,
    Toolbar,
    Typography,
    makeStyles
} from '@material-ui/core';

import LogoApp from '../../images/logo_app.png';

export const HEADERS_HEIGHT = 60;

const useStyles = makeStyles((theme) => {
    return ({
        mainHeader: {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textDecoration: 'none',
            height: HEADERS_HEIGHT,
            minHeight: HEADERS_HEIGHT
        },
        headerText: {
            color: theme.palette.primary.contrastText,
            textDecoration: 'none'
        },
        title: {
            marginLeft: 10
        }
    });
});

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.mainHeader}>
                <Avatar
                    component={Link}
                    to="/"
                    src={LogoApp}
                />
                <Box className={classes.title} display="flex" flexDirection="column">
                    <Typography
                        component={Link}
                        to="/"
                        className={classes.headerText}
                        variant="h6"
                        noWrap
                    >
                        Great Lakes to Gulf Virtual Observatory
                    </Typography>
                    <Typography
                        component={Link}
                        to="/"
                        className={classes.headerText}
                        variant="subtitle1"
                        noWrap
                    >
                        Best Management Practices
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
