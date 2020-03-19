// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    match: {
        path: string,
        url: string
    },
    components: Array<{ path: string, name: string, component: React.Node }>
}

const useStyles = makeStyles({
    menu: {
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 1000
    }
});

const Tests = (props: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                className={classes.menu}
                onClick={handleClick}
            >
            Test Components
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.components.map(({ path, name }) => (
                    <MenuItem key={path} onClick={handleClose}>
                        <Link to={`${props.match.url}/${path}`}>{name}</Link>
                    </MenuItem>
                ))}
            </Menu>

            {props.components.map(({ path, component }) => (
                <Route
                    key={path}
                    path={`${props.match.path}/${path}`}
                    component={component}
                />
            ))}
        </>
    );
};

export default withRouter(Tests);
