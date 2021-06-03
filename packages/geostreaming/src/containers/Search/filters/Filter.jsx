// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCategory from '@geostreams/core/src/components/theme/SidebarCategory';
import {
    Avatar,
    Divider,
    Button, Box, Chip, Typography
} from '@material-ui/core';
import { date } from '@geostreams/core/src/utils/format';
import SelectFilter from './SelectFilter';
import DateRangeFilter from './DateRangeFilter';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff',
        width: '100%'
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
        margin: '4px 4px'
    },
    summaryChips: {
        marginLeft: '5px'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleIcon: {
        marginRight: '5px',
        marginLeft: '5px',
        height: '30px',
        width: '30px',
        backgroundColor: '#374a58'
    }

}));

type Props = {
    title: string,
    options?: array,
    onChange: (q) => void,
    value: string[],
    onReset: ()=>void,
    icon: any,
    type: "multiSelect" | "dateRange" | "singleSelect" | "boolean",
    action?: [],
    isExpanded?: boolean,
    toggleExpandedState?: ()=> void
}



function Filter(props: Props) {
    const { 
        title, options, value, onChange, 
        onReset, icon: TitleIcon, type, action, 
        isExpanded, toggleExpandedState
    } = props;
    const classes = useStyles();

    const Input = type === 'dateRange' ? DateRangeFilter : SelectFilter;
    const inputProps = type !== 'dateRange' ? { type } : null;

    const getLabel = (id)=>{
        const temp = props.options.filter((o)=>o.id === id);
        if(temp.length > 0)
            return temp[0].label;
        return '';
    };

    // Info about Action Buttons 
    const actionItems = [...action,{ title: 'Reset', action: onReset }];

    const renderSelectedDate = () => {
        const startDate = value[0];
        const endDate = value[1];
        return(
            <div className={classes.summaryChips}>
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
            </div>
        );
    };

    const handleChange = (val) => {
        onChange(val);
    };

    // Trim and display selected options
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
                    key={`summary-${label}`}
                    className={classes.chip} 
                    label={label} 
                    size="small" 
                    onDelete={disableDelete && idx === output.length - 1 ? undefined : () => {}} 
                />));
    };

    const renderTitle = () => (
        <Box className={classes.title}>
            <Avatar className={classes.titleIcon}>
                <TitleIcon fontSize="small" />
            </Avatar>
            <Typography> {title}</Typography>
        </Box>
    );
    return (
        <Box classes={{ root: classes.root }}>

            <Divider />
            <SidebarCategory
                key="main"
                classes={{ 
                    header: classes.categoryHeader,
                    icon: classes.categoryDropDown,
                    expandedHeader: classes.expandedHeader,
                    headerContainer: classes.headerContainer
                }}
                summary={type === 'dateRange' ? renderSelectedDate() : renderSelected()}
                title={renderTitle()}
                icon={TitleIcon}
                backgroundColor="#fff"
                value={isExpanded}
                onChange={toggleExpandedState}
            >
                <Input key={`filter-${title}`}{...inputProps} onChange={handleChange} value={value} options={options} />

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
    type: 'multiSelect',
    options: [],
    action: [],
    isExpanded: undefined,
    toggleExpandedState: undefined
};

export default Filter;
