// @flow
import * as React from 'react';
import { Grid, Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core';
import VegaLineChart from './VegaLineChartWrapper';

import type { ParameterValue } from '../../../utils/flowtype';

type Props = {
    label: string;
    unit: string;
    data: ParameterValue[];
    startAtZero: Boolean,
    sameTimeScale: Boolean,
    startDate: Date,
    endDate: Date
}

const useStyles = makeStyles((theme) => ({
    selectStyle: {
        marginTop: '1em'
    }
}));

const SelectLineChartWrapper = (props: Props) => {
    const {
        data,
        label,
        startDate, 
        endDate, 
        startAtZero
    } = props;

    const formattedData = data.map(({ date, average, count })=> ({ average, date, count }));
    const selections = Object.keys(formattedData[0]["average"]).sort()
    const menuItems = selections.map((item,index) => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
    ));

    const [selection, setSelection] = React.useState(selections[0]);
    const fillData = (value) => {
        const pointData =  formattedData.map(point => ({count:1, average: parseFloat(point.average[value].toFixed(6)), date: point.date  }))
        return {
            "data": pointData,
            "label": `${label} for Wavelength ${value}`,
            startDate,
            endDate,
            startAtZero
        }
    }
    const[chartData, setChartData] = React.useState(fillData(selections[0]))
    const handleChange = (event) => {
        setSelection(event.target.value);
        setChartData(fillData(event.target.value))

    };
    const classes = useStyles();

    return (
        <>
            <VegaLineChart
                {...chartData} />
            <Grid item xs={6} className={classes.selectStyle}>
                <InputLabel id="graph-selection">Wavelength</InputLabel>
                <Select
                    labelId="graph-selection"
                    value={selection}
                    onChange={handleChange}
                    label="Wavelength"
                >
                    {menuItems}
                </Select>
            </Grid>
        </>
    );
};

export default SelectLineChartWrapper;
