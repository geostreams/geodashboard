// @flow
import React from 'react';
import {
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core';

import LogoNCSA from '../../images/logo_ncsa.png';
import LogoSeaGrant from '../../images/logo_seagrant.png';
import LogoGLRI from '../../images/logo_glri.png';
import LogoUICivil from '../../images/logo_ui_civil.png';


const useStyles = makeStyles((theme) => {
    return ({
        footer: {
            'background': theme.palette.primary.lighter,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'textAlign': 'center',
            'padding': 10,
            '& a': {
                margin: 15
            }
        },
        content: {
            color: 'gray',
            width: '75%',
            margin: '10px auto 5px',
            lineHeight: 1.5
        }
    });
});

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item xs={12}>
                    <a
                        href="http://www.iisgcp.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoSeaGrant}
                            alt="SeaGrant Illinois - Indiana"
                            height="45"
                        />
                    </a>
                    <a
                        href="http://ncsa.illinois.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoNCSA}
                            alt="National Center for Supercomputing Applications"
                            height="45"
                        />
                    </a>
                    <a
                        href="https://www.glri.us/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoGLRI}
                            alt="Great Lakes Restoration Initiative"
                            height="45"
                        />
                    </a>
                    <a
                        href="http://cee.illinois.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoUICivil}
                            alt="University of Illinois - Department of Civil and Environmental Engineering"
                            height="45"
                        />
                    </a>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <p className={classes.content}>
                        For questions or comments, please contact Paris Collingsworth at pcolling@purdue.edu
                        or 312-886-7449.
                    </p>
                    <p className={classes.content}>
                        This website was developed by Illinois-Indiana Sea Grant, University of Illinois National
                        Center for Supercomputing Applications and the Department of Civil and
                        Environmental Engineering.
                    </p>
                    <p className={classes.content}>
                        Support for development came from a Great Lakes Restoration Initiative grant (DW92329201).
                    </p>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <a
                        href="https://geodashboard.ncsa.illinois.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Geodashboard v.3.3.0
                    </a>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
