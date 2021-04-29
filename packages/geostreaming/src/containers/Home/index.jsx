// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyle = makeStyles({
    container: {
        padding: 50,
        color: '#666',
        lineHeight: '220%',
        fontSize: '1rem'
    }
});

const Home = () => {
    const classes = useStyle();
    return (
        <Container className={classes.container} maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to the Great Lakes to Gulf Virtual Observatory
            </Typography>

            <Typography variant="body1" align="justify" paragraph>
                In the Mississippi River watershed, water quality remains a primary and ongoing concern that
                requires monitoring conducted by multiple state and federal agencies and academic institutions.
                The Great Lakes to Gulf Virtual Observatory (GLTG<sup>SM</sup>) is an interactive geospatial
                application that connects users with tools designed to help visually map, explore and compare
                referenced water quality monitoring data aggregated from multiple sources.  The application
                facilitates ready access to water resource information from the Mississippi River and its
                tributaries, enabling users to identify and select sites, graph specific parameters and
                download data in compatible formats.
            </Typography>

            <Typography variant="body1" align="justify" paragraph>
                Currently, GLTG<sup>SM</sup> includes sites with five or more years of discreet nutrient data
                in the main stem of the Mississippi River, continuous water quality monitoring sites in the
                Mississippi River watershed with nutrient data, and selected small watersheds (HUC-8 or smaller).
                GLTG will display additional parameters as they are available.
            </Typography>

            <Typography variant="body1" align="center" paragraph>
                <Link to="/explore/all">
                    <Button variant="contained" color="primary">
                        Explore Now
                    </Button>
                </Link>
            </Typography>
        </Container>
    );
};

export default Home;
