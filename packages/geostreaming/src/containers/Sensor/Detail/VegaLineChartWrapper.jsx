// @flow
import * as React from 'react';
import { Grid } from '@material-ui/core';
import LineGraph from '@geostreams/core/src/components/vega/LineGraph'
import BoxWhisker from '@geostreams/core/src/components/vega/BoxWhisker'

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


const GraphWrapper = (props : Props) => {
    const {
        data,
        label,
        startDate, 
        endDate, 
        sameTimeScale,
        startAtZero
    } = props;

    const chartData = data.map(({date, average, count})=> ({average, date, count }))

    return (
        <>
            <Grid item xs={10}>
                <LineGraph
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
                    data={chartData}
                    width={130}
                    />
            </Grid>
        </>
    );
};

export default GraphWrapper;
