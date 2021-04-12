// @flow
import React from 'react';
import {
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core';
import NCSALogo from '../../images/logos/ncsa_logo.png';

const useStyles = makeStyles((theme) =>({
    footer: {
        'background': theme.palette.primary.lighter,
        'color': theme.palette.primary.contrastText,
        'textDecoration': 'none',
        'textAlign': 'center',
        'padding': 10,
        '& a': {
            margin: 15
        },
        'fontSize': 13,
        'bottom': 0,
        'position': 'absolute',
        'width': '100%'
    },
    content: {
        color: 'gray',
        width: '75%',
        margin: '10px auto 5px',
        lineHeight: 1.1
    },
    footerImagesParent: {
        display: 'flex',
        padding: '0% 10%',
        alignSelf: 'center',
        placeContent: 'space-evenly'
    },

    footerImagesItem: {
        width: '10vw',
        margin: '0.5em',
        verticalAlign: 'baseline'
    },
    footerText: {
        textDecoration: 'none'
    }

}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Divider />
            <div className={classes.footerImagesParent}>
                <a target="_blank" rel="noreferrer" href="http://ncsa.illinois.edu/">
                    <img className={classes.footerImagesItem}
                        src={NCSALogo}
                        alt="ncsa"
                    />
                </a>
            </div>
            <Divider />
            <Grid item xs={12}>
                <a
                    href="https://geodashboard.ncsa.illinois.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerText}
                >
                        Made with Geodashboard v.{process.env.VERSION}
                </a>
            </Grid>
        </footer>
    );
};

export default Footer;
