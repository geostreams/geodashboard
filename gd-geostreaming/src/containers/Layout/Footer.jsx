// @flow
import React from 'react'
import {
    Divider,
    Grid,
    makeStyles
} from '@material-ui/core'

import LogoLewisClark from '../../images/logo_lewis_clark.png'
import LogoNCSA from '../../images/logo_ncsa.png'
import LogoNGRREC from '../../images/logo_ngrrec.png'
import LogoSeaGrant from '../../images/logo_seagrant.png'
import LogoUICivil from '../../images/logo_ui_civil.png'


const useStyles = makeStyles((theme) =>{
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
    })
})

const Footer = () => {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item xs={12}>
                    <a
                        href="http://lc.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoLewisClark}
                            alt="Lewis & Clark Community College"
                            height="35"
                        />
                    </a>
                    <a
                        href="http://www.ngrrec.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoNGRREC}
                            alt="The National Great Rivers Research & Education Center"
                            height="65"
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
                            height="24"
                        />
                    </a>
                    <a
                        href="http://www.iisgcp.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={LogoSeaGrant}
                            alt="SeaGrant Illinois - Indiana"
                            height="53"
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
                        This website was developed by NGRREC, Lewis & Clark Community College,
                        University of Illinois National Center for Supercomputing Applications and
                        the University of Illinois at Urbana-Champaign.
                    </p>
                    <p className={classes.content}>
                        © 2014 National Center for Supercomputing Applications.
                    </p>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <a
                        href="https://geodashboard.ncsa.illinois.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Geodashboard v.3.1.0
                    </a>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer
