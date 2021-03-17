// @flow
import React from 'react';
import {
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core';


const useStyles = makeStyles((theme) =>{
    return ({
        footer: {
            'position': 'absolute',
            'width': '100%',
            'height': 110,
            'bottom': -110,
            'left': 0,
            'background': theme.palette.primary.lighter,
            'color': theme.palette.primary.contrastText,
            'textDecoration': 'none',
            'textAlign': 'center',
            'padding': '10px 180px',
            '& a': {
                margin: 15
            },
            'fontSize': 13
        },
        content: {
            color: 'gray',
            width: '75%',
            margin: '10px auto 5px',
            lineHeight: 1.1
        }
    });
});

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item xs={12}>
                    <p className={classes.content}>
                        This website was developed by NGRREC, Lewis & Clark Community College,
                        University of Illinois National Center for Supercomputing Applications and
                        the University of Illinois at Urbana-Champaign.
                        <br />
                        &copy; 2014 National Center for Supercomputing Applications.
                    </p>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <a
                        href="https://geodashboard.ncsa.illinois.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Geodashboard v.{process.env.VERSION}
                    </a>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
