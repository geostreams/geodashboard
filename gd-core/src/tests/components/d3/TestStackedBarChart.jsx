// @flow
import React from 'react';
import { scaleBand, scaleLinear, select } from 'd3';
import { makeStyles } from '@material-ui/core';

import { StackedBarChart } from '../../../components/d3';
import { useElementRect } from '../../../utils/hooks';

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
    chartContainer: {
        padding: 50,
        width: '100%',
        height: '100%'
    },
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

    const [container, containerRect] = useElementRect();

    const tooltipContainerRef = React.useRef(null);

    return (
        <div ref={container} className={classes.chartContainer}>
            <StackedBarChart
                width={(containerRect.width || 0) * 0.9}
                height={(containerRect.height || 0) * 0.9}
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
