// @flow
import React from 'react';
import { select } from 'd3';

import { BarChart } from '../../../components/d3';

const FIXTURE = {
    meta: {},
    data: [
        {
            year: 1980,
            value: 5.6
        },
        {
            year: 1981,
            value: 10.1
        },
        {
            year: 1982,
            value: 11.9
        },
        {
            year: 1983,
            value: 12.9
        },
        {
            year: 1984,
            value: 11.3
        },
        {
            year: 1985,
            value: 9.4
        },
        {
            year: 1986,
            value: 10.4
        },
        {
            year: 1987,
            value: 6.1
        },
        {
            year: 1988,
            value: 8.3
        },
        {
            year: 1989,
            value: 7
        },
        {
            year: 1990,
            value: 11.9
        },
        {
            year: 1991,
            value: 12.8
        },
        {
            year: 1992,
            value: 8.3
        },
        {
            year: 1993,
            value: 19.4
        },
        {
            year: 1994,
            value: 10
        },
        {
            year: 1995,
            value: 9.5
        },
        {
            year: 1996,
            value: 11.3
        },
        {
            year: 1997,
            value: 8
        },
        {
            year: 1998,
            value: 14.4
        },
        {
            year: 1999,
            value: 11.7
        },
        {
            year: 2000,
            value: 6.4
        },
        {
            year: 2001,
            value: 8.9
        },
        {
            year: 2002,
            value: 15
        },
        {
            year: 2003,
            value: 4.6
        },
        {
            year: 2004,
            value: 10.8
        },
        {
            year: 2005,
            value: 8.2
        },
        {
            year: 2006,
            value: 6.7
        },
        {
            year: 2007,
            value: 9.2
        },
        {
            year: 2008,
            value: 7.5
        },
        {
            year: 2009,
            value: 13.2
        },
        {
            year: 2010,
            value: 12.2
        },
        {
            year: 2011,
            value: 11.7
        },
        {
            year: 2012,
            value: 4.8
        },
        {
            year: 2013,
            value: 14.5
        },
        {
            year: 2014,
            value: 6.5
        },
        {
            year: 2015,
            value: 10.1
        },
        {
            year: 2016,
            value: 12.4
        },
        {
            year: 2017,
            value: 13.2
        }
    ] };

const INITIAL_YEAR = 2000;

const increase = (data) => (
    data.map(({ year, value, selected }) => ({
        year,
        value: value + 1,
        selected
    }))
);

const updateSelected = (data, selectedYear) => (
    data.map(
        ({ year, value }) => ({
            year,
            value,
            selected: year === selectedYear
        })
    )
);

const TestBarChart = () => {
    const [data, updateData] = React.useState(updateSelected(FIXTURE.data, INITIAL_YEAR));
    const [year, updateYear] = React.useState(INITIAL_YEAR);
    return (
        <div style={{ padding : 50 }}>
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
                width={960}
                height={500}
                marginTop={50}
                marginBottom={50}
                marginLeft={60}
                marginRight={20}
                xAxisProps={{
                    key: 'year',
                    title: 'Year',
                    titlePadding: 50
                }}
                yAxisProps={{
                    key: 'value',
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
                data={data}
            />
        </div>
    );
};

export default TestBarChart;
