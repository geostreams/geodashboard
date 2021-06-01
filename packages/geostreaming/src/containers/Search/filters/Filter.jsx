// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCategory from '@geostreams/core/src/components/theme/SidebarCategory';
import {
    Divider,
    Button, Box, Chip, Typography
} from '@material-ui/core';
import { date } from '@geostreams/core/src/utils/format';
import SelectFilter from './SelectFilter';
import DateRangeFilter from './DateRangeFilter';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff'
    },
    categoryHeader: {
        lineHeight: 2,
        fontSize: 'large !important',
        fontWeight: 500,
        paddingLeft: 5,
        paddingRight: 5,
        margin: '0px !important',
        borderRadius: 2,
        background: '#fff'

    },
    headerContainer: {
        '&:hover': {
            backgroundColor: 'initial'
        }
    },
    categoryDropDown: {
        alignSelf: 'center',
        position: 'initial'
    },
    expandedHeader: {
        padding: '8px 5px'
    },
    chip: {
        margin: '4px 2px'
    },
    title: {
        display: 'flex',
        flexDirection: 'row'
    },
    titleIcon: {
        marginRight: '10px'
    }

}));

type Props = {
    title: string,
    options?: array,
    defaultOpen?: boolean,
    onChange: (q) => void,
    value: string[],
    onReset: ()=>void,
    icon: any,
    type: "multiSelect" | "dateRange" | "singleSelect" | "boolean",
    action?: any
}



function Filter(props: Props) {
    const { title, options, value, defaultOpen, onChange, onReset, icon: TitleIcon, type, action } = props;
    const classes = useStyles();

    const Input = type === 'dateRange' ? DateRangeFilter : SelectFilter;
    const inputProps = type !== 'dateRange' ? { type } : null;

    const getLabel = (id)=>{
        const temp = props.options.filter((o)=>o.id === id);
        if(temp.length > 0)
            return temp[0].label;
        return '';
    };

    const actionItems = [action, { title: 'Reset', action: onReset }];

    const renderSelectedDate = () => {
        const startDate = value[0];
        const endDate = value[1];
        return(
            <>
                <Chip 
                    className={classes.chip} 
                    label={value.length > 0 ? `Start Date: ${date(startDate)}` : null} 
                    size="small" 
                />
                <Chip 
                    className={classes.chip} 
                    label={value.length > 1 ? `End Date: ${date(endDate)}` : null} 
                    size="small" 
                />
            </>
        );
    };

    const handleChange = (val) => {
        onChange(val);
    };

    const renderSelected = () => {
        let output = [];
        let disableDelete = false;
        if(options.length === value.length){
            output = ['All'];
            disableDelete = true;
        } else if(value.length > 4) {
            output = value.slice(0, 4).map(v => getLabel(v));
            output.push(`+ ${value.length - 4} more`);
            disableDelete = true;
        }else {
            output = value.map(v => getLabel(v));
        }
        return(
            output.map((label, idx) => 
                <Chip 
                    className={classes.chip} 
                    label={label} 
                    size="small" 
                    onDelete={disableDelete && idx === output.length - 1 ? undefined : () => {}} 
                />));
    };

    const renderTitle = () => (
        <Box className={classes.title}>
            <TitleIcon className={classes.titleIcon} />
            <Typography> {title}</Typography>
        </Box>
    );
    return (
        <Box classes={{ root: classes.root }}>

            <Divider />
            <SidebarCategory
                key="main"
                defaultOpen={defaultOpen}
                classes={{ 
                    header: classes.categoryHeader,
                    icon: classes.categoryDropDown,
                    expandedHeader: classes.expandedHeader,
                    headerContainer: classes.headerContainer
                }}
                summary={type === 'dateRange' ? renderSelectedDate() : renderSelected()}
                title={renderTitle()}
                backgroundColor="#fff"
            >
                <Input {...inputProps} onChange={handleChange} value={value} options={options} />

                <Divider />
                {actionItems.map((item) => 
                    <Button 
                        style={{ alignItem: 'flex-end' }} 
                        key={`actionItem-${item.title}-${title}`}
                        size="small" 
                        onClick={item.action}>
                        {item.title}
                    </Button>)}
                
            </SidebarCategory>

            <Divider />
        </Box>
    );
}

Filter.defaultProps = {
    defaultOpen: false,
    type: 'multiSelect',
    options: [],
    action: {}
};

export default Filter;
