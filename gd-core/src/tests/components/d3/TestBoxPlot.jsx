// @flow
import React from 'react';
import { ascending, scaleLinear } from 'd3';

import { BoxPlot } from '../../../components/d3';

const FIXTURE = [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9];

const TestBoxPlot = () => {
    const data = FIXTURE.sort(ascending);

    return (
        <div style={{ padding: 50 }}>
            <BoxPlot
                width={100}
                height={400}
                marginTop={10}
                marginBottom={30}
                marginRight={30}
                marginLeft={40}
                axisProps={{
                    scale: scaleLinear().domain( [0, 24])
                }}
                box={{
                    strokeWidth: 0.1
                }}
                mainLine={{
                    strokeDashArray: '2'
                }}
                medianLine={{
                    strokeDashArray: '2'
                }}
                labels={{
                    max: 10,
                    min: 10,
                    median: 10,
                    q1: 10,
                    q3: 10
                }}
                tooltipContent="Box Plot of [12,19,11,13,12,22,13,4,15,16,18,19,20,12,11,9]"
                data={data}
            />
        </div>
    );
};

export default TestBoxPlot;
