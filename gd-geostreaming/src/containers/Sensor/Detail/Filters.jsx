// @flow
import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    Slider,
    Typography,
    makeStyles, Tooltip
} from '@material-ui/core';
import { titleCase } from 'gd-core/src/utils/format';

const useStyle = makeStyles({
    container: {
        'background': '#e6ecf1',
        'padding': 5,
        '& > div': {
            padding: 5
        }
    },
    card: {
        'background': 'transparent',
        'boxShadow': 'none',
        '& .MuiCardContent-root': {
            padding: '0 25px'
        }
    },
    dateRangeSlider: {
        marginLeft: 10,
        marginRight: 10
    },
    downloadButton: {
        textAlign: 'center'
    }
});

const DateRangeLabelComponent = (props: {
    children: React.Node;
    open: boolean;
    value: number;
}) => {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
};

type Props = {
    selectAllDates: boolean;
    minStartTime: Date;
    maxEndTime: Date;
    startDate: Date;
    endDate: Date;
    binType: string;
    startAtZero: boolean;
    sameTimeScale: boolean;
    handleSelectAllDatesToggle: Function;
    handleDateRangeUpdate: Function;
    handleStartDataAtZeroToggle: Function;
    handleUseSameTimeScaleToggle: Function;
}

const Filters = (props: Props) => {
    const classes = useStyle();
    const {
        minStartTime,
        maxEndTime,
        selectAllDates,
        startDate,
        endDate,
        binType,
        startAtZero,
        sameTimeScale,
        handleSelectAllDatesToggle,
        handleDateRangeUpdate,
        handleStartDataAtZeroToggle,
        handleUseSameTimeScaleToggle
    } = props;
    return <Grid
        className={classes.container}
        container
        item
        xs={12}
        alignItems="center"
    >
        <Grid item xs={4}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" align="center">Date Range</Typography>
                </CardContent>
                <CardContent>
                    <Grid container>
                        <Grid item xs={8}>
                            <FormControlLabel
                                control={<Checkbox
                                    disabled={
                                        minStartTime.valueOf() === startDate.valueOf() &&
                                        maxEndTime.valueOf() === endDate.valueOf()
                                    }
                                    checked={selectAllDates}
                                    onChange={handleSelectAllDatesToggle}
                                />}
                                label="Select All Dates"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            Binning: {titleCase(binType)}
                        </Grid>
                    </Grid>
                </CardContent>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="subtitle1">{minStartTime.toLocaleDateString()}</Typography>
                        <Slider
                            className={classes.dateRangeSlider}
                            min={minStartTime.valueOf()}
                            max={maxEndTime.valueOf()}
                            step={1296000000} // 15 days in milliseconds
                            value={[startDate.valueOf(), endDate.valueOf()]}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(v) => (new Date(v)).toLocaleDateString()}
                            ValueLabelComponent={DateRangeLabelComponent}
                            onChange={handleDateRangeUpdate}
                        />
                        <Typography variant="subtitle1">{maxEndTime.toLocaleDateString()}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" align="center">Graph Options</Typography>
                </CardContent>
                <CardContent>
                    <FormControlLabel
                        control={<Checkbox
                            checked={startAtZero}
                            onChange={handleStartDataAtZeroToggle}
                        />}
                        label="Start Data at Zero"
                    />
                </CardContent>
                <CardContent>
                    <FormControlLabel
                        control={<Checkbox
                            checked={sameTimeScale}
                            onChange={handleUseSameTimeScaleToggle}
                        />}
                        label="Use Same Timescale"
                    />
                </CardContent>
            </Card>
        </Grid>
        <Grid className={classes.downloadButton} item xs={4}>
            <Button variant="contained" color="primary">
                Download
            </Button>
        </Grid>
    </Grid>;
};

export default Filters;
