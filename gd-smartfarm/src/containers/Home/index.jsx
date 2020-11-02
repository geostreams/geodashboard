// @flow
import React from 'react';
import {
    withStyles
} from '@material-ui/core';


const styles = {
    fillContainer: {
        width: '100%',
        height: '100%'
    }
};

function Home() {
    return (
        <div className="fillContainer">
            <div>
                <h2>Home</h2>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);