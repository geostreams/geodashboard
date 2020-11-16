// @flow
import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
    Box,
    Collapse,
    List,
    ListItem,
    Grid
} from '@material-ui/core';

/*
    Renders collapsible category component in sidebar.
    Props:
        - title
        - children
        - idx - required for mapping
        - classes - override default classes
*/

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper
    },
    open : {
        transform: 'rotate(180deg)'
    },
    close: {
        transform: 'rotate(0deg)'
    },
    header: props => ({
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginLeft: 4,
        marginRight: 4,
        ...props.classes.header,
        background: props.backgroundColor
    }),
    icon: props => ({
        position: 'absolute',
        right: 6,
        bottom: 4,
        transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.short
        }),
        ...props.classes.icon
    }),
    content: props => ({
        paddingLeft: theme.spacing(1),
        ...props.classes.content
    })
}));

type Props = {
    defaultOpen?: boolean;
    children?: React.Node,
    title: React.Node,
    // eslint-disable-next-line react/no-unused-prop-types
    classes: Object
}

function SidebarCategories(props: Props) {
    const classes = useStyles(props);
    const [open, toggleOpen] = React.useState(props.defaultOpen);
    return (
        <List
            className={`${classes.root} noPadding`}
            subheader={
                <Box 
                    button disableRipple disableGutters dense
                    borderRadius={4} 
                    component={ListItem}  
                    onClick={()=>toggleOpen(!open)}
                >
                    <Grid container className={classes.header} justify="space-between" alignitems="center" >
                        {props.title}
                        <ExpandMore className={clsx(classes.icon,{
                            [classes.open]: open,
                            [classes.close]: !open
                        })} />
                    </Grid>
                </Box>
            }
        >
            <Collapse in={open} className={classes.content} unmountOnExit timeout="auto">
                {props.children}
            </Collapse>
        </List>
    );
}

SidebarCategories.defaultProps = {
    defaultOpen: false,
    children: null,
    classes: null
};

export default SidebarCategories;