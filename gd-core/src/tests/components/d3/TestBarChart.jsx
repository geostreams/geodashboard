// @flow
import React from 'react';
import { select } from 'd3';
import { makeStyles } from '@material-ui/core';

import { BarChart } from '../../../components/d3';
import { useElementRect } from '../../../utils/hooks';

const FIXTURE = {
    meta: {},
    data: []
};

for (let x = 1980; x < 2020; x += 1) {
    const y = Math.random() * 10;
    FIXTURE.data.push({
        x,
        y,
        y0: y + (y * 0.1 * Math.random()),
        y1: y - (y * 0.1 * Math.random())
    });
}

const INITIAL_YEAR = 2000;

const increase = (data) => (
    data.map(({ x, y, y0, y1, selected }) => ({
        x,
        y: y + 1,
        y0: y0 + 1,
        y1: y1 + 1,
        selected
    }))
);

const updateSelected = (data, selectedYear) => (
    data.map(
        ({ x, y, y0, y1 }) => ({
            x,
            y,
            y0,
            y1,
            selected: x === selectedYear
        })
    )
);

const useStyle = makeStyles({
    chartContainer: {
        padding: 50,
        width: '100%',
        height: '100%'
    }
});

const TestBarChart = () => {
    const classes = useStyle();

    const [container, containerRect] = useElementRect();

    const [data, updateData] = React.useState(updateSelected(FIXTURE.data, INITIAL_YEAR));
    const [year, updateYear] = React.useState(INITIAL_YEAR);
    return (
        <div ref={container} className={classes.chartContainer}>
            <div>
                <button
                    type="submit"
                    style={{ margin: 20 }}
                    onClick={() => { updateData(increase(data)); }}
                >
                    Increase
                </button>

                <span style={{ margin: 20 }}>
                    Year: {year}
                    <button
                        type="submit"
                        onClick={() => {
                            updateYear(year - 1);
                            updateData(updateSelected(data, year - 1));
                        }}
                    >
                        Down
                    </button>
                    <button
                        type="submit"
                        onClick={() => {
                            updateYear(year + 1);
                            updateData(updateSelected(data, year + 1));
                        }}
                    >
                        Up
                    </button>
                </span>
            </div>
            <BarChart
                width={(containerRect.width || 0) * 0.9}
                height={(containerRect.height || 0) * 0.9}
                marginTop={50}
                marginBottom={50}
                marginLeft={60}
                marginRight={20}
                xAxisProps={{
                    title: 'Year',
                    titlePadding: 50
                }}
                yAxisProps={{
                    title: 'lb/acre',
                    titlePadding: 30
                }}
                barStroke={(d) => d.selected ? 'brown' : '#4682b4'}
                mouseOver={(d, idx, rects) => {
                    select(rects[idx]).attr('fill', 'brown');
                }}
                mouseOut={(d, idx, rects) => {
                    select(rects[idx]).attr('fill', '#4682b4');
                }}
                barsData={data}
                lineData={data}
                intervalData={data}
            />
        </div>
    );
};

export default TestBarChart;
