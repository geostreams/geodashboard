// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { entries } from 'gd-core/src/utils/array';

import type { ParameterType, ParameterValue } from '../../../utils/flowtype';
import { callAPI } from '../../../utils/io';

import LineChartWrapper from './LineChartWrapper';
import StackedBarChartWrapper from './StackedBarChartWrapper';

const useStyle = makeStyles({
    chartContainer: {
        margin: '20px auto',
        minHeight: 300
    },
    chartTitle: {
        marginTop: 40
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
        showInfoDialog
    } = props;

    const [originalData, updateOriginalData] = React.useState<{ [key: string]: ParameterValue[] } | null>(null);
    const [filteredData, updateFilteredData] = React.useState<{ [key: string]: ParameterValue[] } | null>(null);

    React.useEffect(() => {
        callAPI(
            geostreamingEndpoint,
            `cache/${binType}/${sensorId}?${queryParams}`,
            ({ properties }) => {
                updateOriginalData(properties);
            }
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

            const label = `${title}${unit ? ` (${unit})` : ''}`;

            let content;
            switch (visualization) {
                case 'time':
                    content = (
                        <LineChartWrapper
                            classes={{
                                chartContainer: classes.chartContainer,
                                chartDownloadIcon: classes.chartDownloadIcon
                            }}
                            label={label}
                            unit={unit}
                            startDate={startDate}
                            endDate={endDate}
                            data={filteredData[name]}
                            startAtZero={startAtZero}
                            sameTimeScale={sameTimeScale}
                            tooltipContainerRef={tooltipContainerRef}
                        />
                    );
                    break;
                case 'stacked_bar':
                    content = <StackedBarChartWrapper
                        classes={{
                            chartContainer: classes.chartContainer,
                            chartDownloadIcon: classes.chartDownloadIcon
                        }}
                        label={label}
                        unit={unit}
                        season={season}
                        data={filteredData[name]}
                        categories={scale_names}
                        colors={scale_colors}
                        tooltipContainerRef={tooltipContainerRef}
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
                        <Typography variant="subtitle1">{label}</Typography>
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
