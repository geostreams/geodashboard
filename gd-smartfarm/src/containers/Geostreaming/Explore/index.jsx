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

function Explore() {
    return (
        <div className="fillContainer">
            <div>
                <h2>Explore</h2>
            </div>
        </div>
    );
}

export default withStyles(styles)(Explore);