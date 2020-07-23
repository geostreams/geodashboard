// @flow
import React from 'react';
import { event, extent, scaleLinear, scaleTime, select, timeParse } from 'd3';
import { makeStyles } from '@material-ui/core';

import { LineChart } from '../../../components/d3';

const FIXTURE = [
    { date: '2018-04-14', value: 8140.71 },
    { date: '2018-04-15', value: 8338.42 },
    { date: '2018-04-16', value: 8371.15 },
    { date: '2018-04-17', value: 8285.96 },
    { date: '2018-04-18', value: 8197.8 },
    { date: '2018-04-19', value: 8298.69 },
    { date: '2018-04-20', value: 8880.23 },
    { date: '2018-04-21', value: 8997.57 },
    { date: '2018-04-22', value: 9001.64 },
    { date: '2018-04-23', value: 8958.55 }
];

const useStyle = makeStyles({
    chartContainer: {
        marginTop: 10
    },
    tooltipContainer: {
        position: 'fixed',
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    }
});

const TestLineChart = () => {
    const classes = useStyle();

    const data = FIXTURE.map((d) => ({ date : timeParse('%Y-%m-%d')(d.date), value : d.value }));
    const tooltipContainerRef = React.useRef(null);

    return (
        <div style={{ padding: 50 }}>
            <LineChart
                width={460}
                height={400}
                marginTop={10}
                marginBottom={40}
                marginRight={30}
                marginLeft={60}
                xAxisProps={{
                    scale: scaleTime().domain(extent(data, (d)=> d.date)),
                    key: 'date',
                    title: 'Date',
                    titlePadding: 35
                }}
                yAxisProps={{
                    scale: scaleLinear().domain( [8000, 9200]),
                    key: 'value',
                    title: 'Value',
                    titlePadding: 40
                }}
                boxPlot={{
                    fill: '#7688B3'
                }}
                trace
                mouseOver={(d) => {
                    select(tooltipContainerRef.current)
                        .html(`Date: ${d.date.toLocaleDateString()}<br />Value: ${d.value}`)
                        .transition()
                        .duration(200)
                        .style('opacity', .9)
                        .style('left', `${event.clientX}px`)
                        .style('top', `${event.clientY - 50}px`);
                }}
                mouseOut={() => {
                    select(tooltipContainerRef.current)
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                }}
                data={data}
            />
            <div ref={tooltipContainerRef} className={classes.tooltipContainer} />
        </div>
    );
};

export default TestLineChart;
