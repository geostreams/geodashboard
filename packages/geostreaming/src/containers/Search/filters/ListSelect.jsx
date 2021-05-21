// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCategory from '@geostreams/core/src/components/theme/SidebarCategory';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import {
    Paper,
    Divider,
    Button, Box, Chip, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff'
    },
    content: {
        maxHeight: '25vh',
        overflowY: 'scroll'
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
    option: {
        fontSize: 'small !important'
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

function SelectFilter(props){
    const { options, handleChange } = props; 

    return(
        <div className={classes.content}>
            {options.map(option => (
                <Box 
                    className={classes.option} 
                    onClick={(event)=> handleChange(event, option.id)}>
                    <Select
                        checked={selected.includes(option.id)}
                        size="small"
                        disableRipple
                        style={{ backgroundColor: 'transparent', padding: 1 }}
                    />
                    {option.label}
                </Box>
            ))}
        </div>
    );
}

function DateRangeFilter(props){

}

function BooleanFilter(props){

}

type Props = {
    title: string,
    options: array,
    defaultOpen?: boolean,
    multiSelect?: boolean,
    onChange: (q) => void,
    value: string[],
    onReset: ()=>void,
    icon: any,
    type: "select" | "dateRange"
}

function ListSelectFilter(props: Props) {
    const { title, options, value, defaultOpen, multiSelect, onChange, onReset, icon: TitleIcon, type } = props;
    const classes = useStyles();
    const [selected, setSelected ] = useState(value);

    const filter = {
        select: SelectFilter,
        dateRange: DateRangeFilter
    };

    
    const getLabel = (id)=>{
        const temp = props.options.filter((o)=>o.id === id);
        return temp[0].label;
    };

    const handleChange = (event, id) => {
        if(selected.includes(id)){
            setSelected(selected.filter(x => x !== id));
            onChange(selected);
        } else{
            setSelected(multiSelect ? [...selected, id] : [id]);
            onChange(selected);
        }
    };

    const renderSelected = () => {
        let output = [];
        let disableDelete = false;
        if(options.length === selected.length){
            output = ['All'];
            disableDelete = true;
        } else if(selected.length > 4) {
            output = selected.slice(0, 4).map(v => getLabel(v));
            output.push(`+ ${selected.length - 4} more`);
            disableDelete = true;
        }else {
            output = selected.map(v => getLabel(v));
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
                summary={renderSelected()}
                title={renderTitle()}
                backgroundColor="#fff"
            >

                <Divider />
                <Button style={{ alignItem: 'flex-end' }}size="small">Reset</Button>
            </SidebarCategory>

            <Divider />
        </Box>
    );
}

ListSelectFilter.defaultProps = {
    defaultOpen: false,
    type: 'multiSelect'
};

export default ListSelectFilter;
