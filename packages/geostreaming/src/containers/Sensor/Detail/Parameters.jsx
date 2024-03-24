// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { entries } from '@geostreams/core/src/utils/array';
import { callAPI } from '@geostreams/core/src/utils/io';
import logger from '@geostreams/core/src/utils/logger';

import type { ParameterType, ParameterValue } from '../../../utils/flowtype';

import D3LineChart from './LineChartWrapper';
import D3StackedBarChart from './StackedBarChartWrapper';
import VegaMultiLineChart from './VegaMultiLineChartWrapper';
import VegaLineChart from './VegaLineChartWrapper';
import VegaLineChartWithError from './VegaLineChartWithError'
import VegaScatterChartWrapper from "./VegaScatterChartWrapper";
import VegaSelectLineChartWrapper from "./VegaSelectLineChartWrapper";

const useStyle = makeStyles({
    chartContainer: {
        margin: '20px auto',
        minHeight: 300
    },
    chartTitle: {
        'marginTop': 40,
        '& i': {
            fontStyle: 'normal'
        }
    },
    tooltipContainer: {
        position: 'fixed',
        background: '#283d4b',
        color: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0,
        fontSize: 12
    },
    chartDownloadIcon: {
        color: '#3f51b5',
        height: 10,
        marginTop: -10
    }
});

type Props = {
    geostreamingEndpoint: string;
    binType: string;
    season: ?string;
    sensorId: number;
    parameters: Array<ParameterType & { category: string; visualization: string; isSelected: boolean; }>;
    queryParams: string;
    startDate: Date;
    endDate: Date;
    startAtZero: boolean;
    sameTimeScale: boolean;
    showInfoDialog: Function;
}

const Parameters = (props: Props) => {
    const classes = useStyle();

    const tooltipContainerRef = React.useRef(null);

    const {
        geostreamingEndpoint,
        binType,
        season,
        sensorId,
        parameters,
        queryParams,
        startDate,
        endDate,
        startAtZero,
        sameTimeScale,
        showInfoDialog,
        forceVega
    } = props;

    const [originalData, updateOriginalData] = React.useState<{ [key: string]: ParameterValue[] } | null>(null);
    const [filteredData, updateFilteredData] = React.useState<{ [key: string]: ParameterValue[] } | null>(null);

    React.useEffect(() => {
        callAPI(
            geostreamingEndpoint,
            `/api/cache/${binType}/?sensor_id=${sensorId}&${queryParams}`,
            ({ properties }) => {
                updateOriginalData(properties);
            },
            logger.error
        );
    }, [binType, queryParams]);

    React.useEffect(() => {
        if (originalData) {
            if (season) {
                updateFilteredData(
                    entries(originalData)
                        .reduce(
                            (all, property: [string, ParameterValue[]]) => {
                                all[property[0]] = property[1].filter(({ label }) => label.includes(season));
                                return all;
                            },
                            {}
                        )
                );
            } else {
                updateFilteredData(originalData);
            }
        }
    }, [season, originalData]);

    const renderCharts = () => {
        if (!filteredData) {
            return null;
        }

        return parameters.map(({ name, title, unit, visualization, scale_names, scale_colors }) => {
            if (!filteredData[name]) {
                return null;
            }

            const timeRange = sameTimeScale? {startDate, endDate} : {}


            const label = `${title}${unit ? ` (${unit})` : ''}`;

            const chartProps = {
                label,
                unit,
                data: filteredData[name],
                startAtZero,
                sameTimeScale,
                ...timeRange
            }


            let content;

            switch (visualization) {
                case 'line':
                    content = forceVega ?
                        <VegaLineChart
                            {...chartProps} />
                        :
                        <D3LineChart
                            {...chartProps}
                            classes={{
                                chartContainer: classes.chartContainer,
                                chartDownloadIcon: classes.chartDownloadIcon
                            }}
                            tooltipContainerRef={tooltipContainerRef}
                        />
                    break;
                case 'scatter':
                    content = <VegaScatterChartWrapper {...chartProps} />;
                    break;
                case 'scatter_with_regression':
                    content = <VegaScatterChartWrapper {...chartProps} regressionLine />;
                    break;
                case 'stacked_bar':
                    content = <D3StackedBarChart
                        classes={{
                            chartContainer: classes.chartContainer,
                            chartDownloadIcon: classes.chartDownloadIcon
                        }}
                        categories={scale_names}
                        label={label}
                        season={season}
                        data={filteredData[name]}
                        startAtZero={startAtZero}
                    />;
                    break;
                case 'stacked_line':
                    content = <VegaMultiLineChart
                        {...chartProps}
                    />;
                    break;
                case 'line-with-error':
                    content = <VegaLineChartWithError
                        attributes={scale_names}
                        {...chartProps}
                    />;
                    break;
                case 'stacked_select_line':
                    content = <VegaSelectLineChartWrapper
                        {...chartProps}
                    />;
                    break;
                default:
                    content = (
                        <Grid item xs={10} align="center">
                            Coming Soon
                        </Grid>
                    );
            }
            return (
                <React.Fragment key={name}>
                    <Grid className={classes.chartTitle} item xs={10} align="center">
                        <Typography variant="subtitle1" dangerouslySetInnerHTML={{ __html: label }} />
                    </Grid>
                    {content}
                </React.Fragment>
            );
        });
    };

    return (
        <>
            <Grid item xs={10}>
                <Typography variant="h6" align="center">Parameter Charts</Typography>
            </Grid>
            <Grid item xs={2}>
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
            {renderCharts()}
            <div ref={tooltipContainerRef} className={classes.tooltipContainer} />
        </>
    );
};

const mapStateToProps = (state) => ({
    geostreamingEndpoint: state.config.geostreamingEndpoint
});

export default connect(mapStateToProps)(Parameters);
