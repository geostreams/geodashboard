// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCategory from '@geostreams/core/src/components/theme/SidebarCategory';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(() => ({
    content: {
        maxHeight: '25vh',
        overflowY: 'scroll'
    },
    categoryHeader: {
        background: '#5f99c1',
        color: '#ffff',
        lineHeight: 2,
        fontSize: 'large !important',
        fontWeight: 500,
        paddingLeft: 5,
        margin: 3,
        borderRadius: 2

    },
    categoryDropDown: {
        alignSelf: 'center',
        position: 'initial'
    },
    option: {
        fontSize: 'small !important'
    }

}));

type Props = {
    title: string,
    options: array,
    defaultOpen?: boolean
}

function ListSelectFilter(props: Props) {
    const { title, options, defaultOpen } = props;
    const classes = useStyles();
    return (
        <SidebarCategory
            key="main"
            defaultOpen={defaultOpen}
            classes={{ 
                header: classes.categoryHeader,
                icon: classes.categoryDropDown,
                content: classes.content
            }}
            title={title}
        >
            {options.map(option => (
                <div className={classes.option}>
                    <Checkbox
                        size="small"
                        disableRipple
                        style={{ backgroundColor: 'transparent', padding: 1 }}
                        label="All"
                    />
                    {option.label}
                </div>
            ))}

        </SidebarCategory>
    );
}

ListSelectFilter.defaultProps = {
    defaultOpen: false
};

export default ListSelectFilter;
