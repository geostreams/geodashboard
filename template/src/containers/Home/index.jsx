// @flow
import React from 'react';
import {
    withStyles
} from '@material-ui/core';
import PageStyles from '../../styles/home.css';

const styles = {
    ...PageStyles,
    fillContainer: {
        width: '100%',
        height: '100%'
    }
};


function Home() {
    return (
        <div>
            <div className={styles.custom_page}>
                <div textStyle={styles.title}> Geodashboard Template</div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);