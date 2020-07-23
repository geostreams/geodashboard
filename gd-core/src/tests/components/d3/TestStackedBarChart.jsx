// @flow
import React from 'react';
import { scaleBand, scaleLinear, select } from 'd3';
import { makeStyles } from '@material-ui/core';

import { StackedBarChart } from '../../../components/d3';

const FIXTURE = {
    meta: {},
    data: [],
    colors: {
        yes: 'green',
        no: 'red',
        maybe: 'gray'
    }
};

for (let year = 1980; year < 2020; year += 1) {
    FIXTURE.data.push({
        year,
        yes: Math.floor(Math.random() * 10),
        no: Math.floor(Math.random() * 10),
        maybe: Math.floor(Math.random() * 10)
    });
}

const useStyle = makeStyles({
    tooltipContainer: {
        position: 'fixed',
        background: '#283d4b',
        color: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    }
});

const TestStackedBarChart = () => {
    const classes = useStyle();

    const tooltipContainerRef = React.useRef(null);

    return (
        <div style={{ padding : 50 }}>
            <StackedBarChart
                width={960}
                height={500}
                marginTop={50}
                marginBottom={50}
                marginLeft={60}
                marginRight={20}
                xAxisProps={{
                    scale: scaleBand().domain(FIXTURE.data.map(({ year }) => year)),
                    key: 'year',
                    title: 'Year',
                    titlePadding: 50
                }}
                yAxisProps={{
                    scale: scaleLinear(),
                    keys: ['yes', 'no', 'maybe'],
                    title: 'lb/acre',
                    titlePadding: 30
                }}
                barFill={(values) => FIXTURE.colors[values.key]}
                data={FIXTURE.data}
                mouseOver={(values, idx, rects, target, position) => {
                    const targetPosition = target.getBoundingClientRect();
                    select(tooltipContainerRef.current)
                        .html(values[1])
                        .style('opacity', .9)
                        .style('left', `${targetPosition.x + position[0]}px`)
                        .style('top', `${position[1]}px`);
                }}
            />
            <div ref={tooltipContainerRef} className={classes.tooltipContainer} />
        </div>
    );
};

export default TestStackedBarChart;
