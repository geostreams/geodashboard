// @flow
import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Drawer, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/*
    BaseSidebar creates an animated collapsible empty sidebar.
    Props:
        - classes: Override default classes
        - Non-Collapsible Sidebar
            - no extra props required
        - Collapsible Sidebar
            - collapsible: Shows the collapse control button on bottom
            - expanded: Boolean value of whether to open or close sidebar
            - toggleSidebar: Controls whether its open or not
*/

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        zIndex: theme.zIndex.drawer
    },
    drawerPaper: (props) => ({
        width: drawerWidth,
        borderRight: 'none',
        overflowX: 'hidden',
        justifyContent: 'space-between',
        height: `calc(100% - ${theme.header?.height ? theme.header.height : 55}px)`,
        top: theme.header?.height ? theme.header.height : 55,
        paddingTop: 10,
        ...props.classes.drawerPaper
    }),
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflow: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px'
    },
    content: props => ({
        alignItems: 'flex-start',
        padding:0,
        width: props.disableGutters ? drawerWidth : drawerWidth - 15,
        paddingBottom: 10,
        ...props.classes.content
    })

}));

type Props = {
    children?: React.Node,
    collapsible?: boolean,
    // eslint-disable-next-line react/no-unused-prop-types
    disableGutters?: boolean,
    toggleSidebar: Function,
    // eslint-disable-next-line react/no-unused-prop-types
    classes: Object,
    expanded: boolean
}

function BaseSidebar(props: Props) {

    const classes = useStyles(props);
    const open = props.expanded;

    // fire resize events when sidebar is toggled to update other components in tree (map)
    // multiple events to smooth out the updates
    React.useEffect(() => {
        const duration = open ? 195 : 225;

        for (let i = 0; i < duration + 100; i += 10) {
            setTimeout(
                ()=>{window.dispatchEvent(new Event('resize'));},
                i
            );
        }

    }, [open]);



    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                PaperProps={{ elevation: 3 }}
                classes={{
                    paper: clsx(classes.drawerPaper, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <Container className={classes.content}>
                    {props.children}
                </Container>
                {props.collapsible ?
                    <div className={classes.toolbar}>
                        <IconButton onClick={()=> props.toggleSidebar(!open)}>
                            {open ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                        </IconButton>
                    </div> :
                    null}
            </Drawer>
        </>
    );
}

BaseSidebar.defaultProps = {
    children: null,
    collapsible: false,
    disableGutters: false,
    classes: {},
    expanded: true
};

export default BaseSidebar;
