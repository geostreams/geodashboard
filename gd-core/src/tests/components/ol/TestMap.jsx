// @flow
import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { Map } from '../../../components/ol';

const useStyle = makeStyles({
    header: {
        position: 'fixed',
        top: 50,
        right: 50,
        zIndex: 1001
    }
});

const TestMap = () => {
    const classes = useStyle();
    return (
        <Container className="fillContainer">
            <Typography
                variant="h1"
                component="h2"
                gutterBottom
                className={classes.header}
            >
                Hello World!
            </Typography>
            <Map
                className="fillContainer"
                zoom={4}
                center={[0,0]}
                layers={[
                    new TileLayer({ source: new OSM() })
                ]}
            />
        </Container>
    );
};

export default TestMap;
