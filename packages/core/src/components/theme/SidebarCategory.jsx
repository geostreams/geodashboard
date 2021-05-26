// @flow
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Collapse,
    List,
    ListItem,
    Grid
} from '@material-ui/core';
import clsx from 'clsx';
import ChevronDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRightIcon from '@material-ui/icons/KeyboardArrowRight';

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
        overflowY: 'auto'
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
        transition: theme.transitions.create(['padding'], {
            duration: theme.transitions.duration.short
        }),
        background: props.backgroundColor
    }),
    expandedHeader: props => ({
        ...props.classes.expandedHeader
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
        background: 'unset',
        ...props.classes.content
    }),
    headerContainer: props => ({
        ...props.classes.headerContainer
    })
}));

type Props = {
    defaultOpen?: boolean;
    children?: React.Node,
    title: React.Node,
    // eslint-disable-next-line react/no-unused-prop-types
    classes: Object,
    summary?: React.Node
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
                    className={classes.headerContainer}
                >
                    <Grid container className={clsx(classes.header, { [classes.expandedHeader]: open })} justify="space-between" alignitems="center" >
                        {props.title}
                        {open ?
                            <ChevronDownIcon className={classes.icon} /> :
                            <ChevronRightIcon className={classes.icon} />}
                    </Grid>
                </Box>
            }
        >
            <Collapse in={open} className={classes.content} unmountOnExit timeout="auto">
                {props.children}
            </Collapse>
            <Collapse in={props.summary && !open} unmountOnExit timeout="auto">
                {props.summary}
            </Collapse>
        </List>
    );
}

SidebarCategories.defaultProps = {
    defaultOpen: false,
    children: null,
    classes: null,
    summary: null
};

export default SidebarCategories;
