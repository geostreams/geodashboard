// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { Box
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: '15vh',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-evenly'
    },
    option: {
        fontSize: 'small !important'
    }
}));

type Props = {
    onChange: (q) => void,
    value: date[]
}

function DateTimeFilter(props: Props){
    const { onChange, value } = props; 
    const classes = useStyles();
    const [date, setDate ] = useState(value);

    useEffect(()=> {
        if(value && value === date)
            setDate(value);
    },[value]);

    const handleStartChange = (newDate) => {
        setDate([newDate, date[1]]);
        onChange([newDate, date[1]]);
    };

    const handleEndChange = (newDate) => {
        setDate([date[0], newDate]);
        onChange([date[0], newDate]);
    };


    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={classes.content} >
                <DatePicker 
                    disableFuture
                    openTo="year"
                    label="Start Date"
                    format="dd/MM/yyyy"
                    value={date[0]} 
                    onChange={(newDate) => handleStartChange(newDate)} 
                    maxDate={date[1] || new Date()}
                />

                <DatePicker 
                    disableFuture
                    openTo="year"
                    label="End Date"
                    format="dd/MM/yyyy"
                    value={date[1] || new Date()} 
                    onChange={(newDate) => handleEndChange(newDate)} 
                />

            </div>
        </MuiPickersUtilsProvider>
    );
}

DateTimeFilter.defaultProps = {
    value: [new Date(), new Date()]
};

export default DateTimeFilter;
