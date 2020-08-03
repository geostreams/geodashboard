// @flow
import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    container: {
        padding: 20
    }
});

const Home = () => {
    const classes = useStyle();
    return (
        <Container className={classes.container}>Project Home</Container>
    );
};

export default Home;
