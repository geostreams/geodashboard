// @flow
import React from 'react'
import { ascending, scaleLinear, scaleTime, timeYear } from 'd3'
import { Checkbox, FormControlLabel, Grid, List, ListItem, Typography, makeStyles } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import { LineChart, BoxPlot } from 'gd-core/src/components/d3'
import { entries } from 'gd-core/src/utils/array'
import { precision } from 'gd-core/src/utils/format'

import type { ParameterType, ParameterValue } from '../../../utils/flowtype'

const useStyle = makeStyles({
    chartContainer: {
        marginTop: 10
    }
})

type ParametersState = Array<ParameterType & { isSelected: boolean; }>

type Props = {
    data: { [key: string]: ParameterValue[] };
    dateRange: [Date, Date];
    mapping: { type: string, parameters: ParameterType[] };
    startAtZero: boolean;
    showInfoDialog: Function;
}

const Parameters = (props: Props) => {
    const classes = useStyle()

    const lineChartContainerRef = React.useRef(null)
    const boxPlotContainerRef = React.useRef(null)

    const {
        data,
        dateRange,
        mapping,
        startAtZero,
        showInfoDialog
    } = props

    const prepareParameters = (parameters) => parameters.map((p) => ({
        ...p,
        isSelected: true
    }))

    const [parameters: ParametersState, updateParameters] = React.useState(prepareParameters(mapping.parameters))

    React.useEffect(
        () => {
            updateParameters(prepareParameters(mapping.parameters))
        },
        [mapping.parameters]
    )

    const processedData = {}
    entries(data).forEach(([paramName, paramData]) => {
        processedData[paramName] = {
            lineData: [],
            boxData: [],
            minDate: null,
            maxDate: null,
            minAverage: Infinity,
            maxAverage: -Infinity
        }
        paramData.forEach(({ average, date }) => {
            const d = processedData[paramName]
            d.lineData.push({ date: new Date(date), average })
            d.boxData.push(average)
            if (d.maxAverage < average) {
                d.maxAverage = average
            }
            if (d.minAverage > average) {
                d.minAverage = average
            }
            if (d.maxDate < date) {
                d.maxDate = date
            }
            if (d.minDate > date) {
                d.minDate = date
            }
        })
    })


    return (
        <Grid container>
            <Grid item xs={3}>
                <Typography variant="h6" align="center">
                    Selected Parameters
                    &nbsp;
                    <InfoIcon
                        className="actionIcon"
                        fontSize="small"
                        onClick={(() => showInfoDialog('parameters'))}
                    />
                </Typography>
                <List>
                    {parameters.map(({ id, title, unit, name, isSelected }) => (
                        <ListItem key={id}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={isSelected}
                                    onChange={(e, isChecked) => {
                                        updateParameters(parameters.map((p) => {
                                            if (p.name === name) {
                                                p.isSelected = isChecked
                                            }
                                            return p
                                        }))
                                    }}
                                />}
                                label={`${title}${unit ? ` (${unit})` : ''}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item container xs={9}>
                <Grid ref={lineChartContainerRef} item xs={9}>
                    <Typography variant="h6" align="center">Parameter Charts</Typography>
                </Grid>
                <Grid ref={boxPlotContainerRef} item xs={3}>
                    <Typography variant="h6" align="center">
                        Box and Whiskers
                        &nbsp;
                        <InfoIcon
                            className="actionIcon"
                            fontSize="small"
                            onClick={(() => showInfoDialog('box'))}
                        />
                    </Typography>
                </Grid>
                {parameters.map(({ name, isSelected }) => {
                    if (!processedData[name] || !isSelected) {
                        return null
                    }
                    const { lineData, boxData, minAverage, maxAverage } = processedData[name]
                    lineData.sort((d1, d2) => ascending(d1.date, d2.date))
                    boxData.sort(ascending)
                    const paramProps = mapping.parameters.find((p) => p.name === name)
                    const label = paramProps ?
                        `${paramProps.title}${paramProps.unit ? ` (${paramProps.unit})` : ''}` :
                        ''
                    const yTitle = paramProps && paramProps.unit
                    return (
                        <React.Fragment key={name}>
                            <Grid item xs={12} align="center">
                                <Typography variant="h6">{label}</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <div className={classes.chartContainer}>
                                    <LineChart
                                        data={lineData}
                                        xAxisProps={{
                                            key: 'date',
                                            scale: scaleTime().domain(dateRange),
                                            ticks: [timeYear.every(1)]
                                        }}
                                        yAxisProps={{
                                            key: 'average',
                                            scale: scaleLinear().domain( [startAtZero ? 0 : minAverage, maxAverage]),
                                            title: yTitle,
                                            titlePadding: 40
                                        }}
                                        dotRadius={2}
                                        height="320"
                                        width={
                                            lineChartContainerRef.current ?
                                                lineChartContainerRef.current.offsetWidth * 0.9 :
                                                800
                                        }
                                        marginTop={10}
                                        marginBottom={40}
                                        marginRight={20}
                                        marginLeft={55}
                                        boxPlot={{
                                            fill: '#dceef5',
                                            fillOpacity: 1
                                        }}
                                        tooltipContent={
                                            (d) => `Date: ${d.date.toLocaleDateString()}<br />Average: ${precision(d.average, 2)} ${paramProps ? ` ${paramProps.unit}` : ''}`
                                        }
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div key={name} className={classes.chartContainer}>
                                    <BoxPlot
                                        data={boxData}
                                        axisProps={{
                                            scale: scaleLinear().domain( [minAverage, maxAverage]).clamp(true)
                                        }}
                                        box={{
                                            strokeWidth: 0.1,
                                            fill: '#dceef5',
                                            fillOpacity: 1
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
                                        height="320"
                                        width={
                                            boxPlotContainerRef.current ?
                                                boxPlotContainerRef.current.offsetWidth * 0.9 :
                                                800
                                        }
                                        marginTop={10}
                                        marginBottom={30}
                                        marginRight={60}
                                        marginLeft={55}
                                    />
                                </div>
                            </Grid>
                        </React.Fragment>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default Parameters
