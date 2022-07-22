// @flow
import * as React from 'react';
import { Grid } from '@material-ui/core';
import MultiLineChart from '../../../components/vega/MultiLineChart';
import StackedBoxWhisker from '../../../components/vega/StackedBoxWhisker';

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

const MultiLineChartWrapper = (props: Props) => {
    const {
        data,
        label,
        startDate, 
        endDate, 
        startAtZero
    } = props;

    const chartData = data.map(({ date, average, count })=> ({ average, date, count }));
    let attributes = [];
    if (0 in Object.keys(data))
        if ('average' in data[0])
            attributes = Object.keys(data[0].average);
    return (
        <>
            <Grid item xs={10}>
                <MultiLineChart
                    data={chartData}
                    attributes={attributes}
                    width={850}
                    yLabel={label}
                    startDate={startDate}
                    endDate={endDate}
                    startAtZero={startAtZero}
                />
            </Grid>
            <Grid item xs={2}>
                <StackedBoxWhisker
                    data={chartData}
                    attributes={attributes}
                    width={130}
                />
            </Grid>
        </>
    );
};

export default MultiLineChartWrapper;
