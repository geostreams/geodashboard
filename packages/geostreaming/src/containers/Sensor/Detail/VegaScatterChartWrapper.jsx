// @flow
import * as React from 'react';
import { Grid } from '@material-ui/core';
import ScatterPlot from '../../../components/vega/ScatterPlot';
import BoxWhisker from '../../../components/vega/BoxWhisker';

import type { ParameterValue } from '../../../utils/flowtype';

type Props = {
    label: string;
    unit: string;
    data: ParameterValue[];
    startAtZero: Boolean,
    sameTimeScale: Boolean,
    startDate: Date,
    endDate: Date,
    regressionLine: Boolean
}


const ScatterChartWrapper = (props : Props) => {
    const {
        data,
        label,
        startDate, 
        endDate, 
        startAtZero,
        regressionLine
    } = props;

    const chartData = data.map(({date, average, count})=> ({average, date, count }))

    return (
        <>
            <Grid item xs={10}>
                <ScatterPlot
                    startAtZero={startAtZero}
                    data={chartData}
                    width={900}
                    startDate={startDate}
                    endDate={endDate}
                    yLabel = {label}
                    regressionLine = {regressionLine}
                />
            </Grid>
            <Grid item xs={2}>
                <BoxWhisker
                    data={chartData}
                    width={130}
                />
            </Grid>
        </>
    );
};

export default ScatterChartWrapper;
