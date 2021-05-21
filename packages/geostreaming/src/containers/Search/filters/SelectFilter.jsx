// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
        maxHeight: '25vh',
        overflowY: 'scroll'
    },
    denseContent: {
        maxHeight: '25vh',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        padding: '0px 10px'
    },
    option: {
        fontSize: 'small !important'
    }
}));

type Props = {
    options: array,
    onChange: (q) => void,
    value: string[],
    type?: "multiSelect" | "singleSelect" | "boolean"
}

function SelectFilter(props: Props){
    const { options, onChange, type, value } = props; 
    const classes = useStyles();
    const Select = type === 'multiSelect' ? Checkbox : Radio;
    const [selected, setSelected ] = useState(value);

    useEffect(()=> {
        if(value && value !== selected)
            setSelected(value);
    }, [value]);

    const handleChange = (event, id) => {
        let newSelected = selected;
        if(selected.includes(id)){
            newSelected = selected.filter(x => x !== id);
        } else{
            newSelected = type === 'multiSelect' ? [...selected, id] : [id];
        }
        setSelected(newSelected);
        onChange(newSelected);
    };

    const rootClass = type === 'boolean' ? classes.denseContent : classes.content;

    return(
        <div className={rootClass}>
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

SelectFilter.defaultProps = {
    type: 'singleSelect'
};

export default SelectFilter;
