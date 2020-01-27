// @flow
import React from 'react'
import { extent, scaleLinear, scaleTime, timeParse } from 'd3'

import { LineChart } from '../../../components/d3'

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
]

const TestLineChart = () => {
    const data = FIXTURE.map((d) => ({ date : timeParse('%Y-%m-%d')(d.date), value : d.value }))

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
                tooltipContent={(d) => `${d.date.toLocaleDateString()}: ${d.value}` }
                data={data}
            />
        </div>
    )
}

export default TestLineChart
