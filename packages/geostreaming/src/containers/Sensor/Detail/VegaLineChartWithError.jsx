// @flow
import * as React from 'react';
import { Grid } from '@material-ui/core';
import LineGraphWithError from '../../../components/vega/LineGraphWithError';
import BoxWhisker from '../../../components/vega/BoxWhisker';

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


const LineChartWrapper = (props : Props) => {
    const {
        data,
        label,
        startDate, 
        endDate, 
        startAtZero
    } = props;

    console.log(data)

    const chartData = data.map(({date, average, count})=> ({ci0: average.value-average.error, ci1: average.value+average.error, value: average.value, error: average.error, date, count }))

    return (
        <>
            <Grid item xs={10}>
                <LineGraphWithError
                    startAtZero={startAtZero}
                    data={chartData}
                    width={900}
                    startDate={startDate}
                    endDate={endDate}
                    yLabel = {label}
                    />
            </Grid>
            <Grid item xs={2}>
                <BoxWhisker
                    data={data.map(({date, average, count}) => ({date, average: average.value, count}))}
                    width={130}
                    />
            </Grid>
        </>
    );
};

export default LineChartWrapper;
