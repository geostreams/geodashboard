// @flow
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { precision } from '@geostreams/core/src/utils/format';

import trendIcons, { iconColors } from '../../Trends/icons';
import useStyles from './styles';

import type { TrendValues } from '../../../utils/flowtype';

type Props = {
    parameter: {
        title: string;
        unit: string;
    };
    trends: TrendValues
}

const Trends = ({ parameter, trends }: Props) => {
    const classes = useStyles();

    let trendColor;
    switch (trends.trend) {
        case 'overThresholdDown':
        case 'overThresholdUp':
            trendColor = iconColors.overThreshold;
            break;
        case 'up':
            trendColor = iconColors.up;
            break;
        case 'down':
            trendColor = iconColors.down;
            break;
        default:
            trendColor = iconColors.noData;
    }

    const trendIcon = [
        <img
            key="icon"
            src={`data:image/svg+xml;utf-8,${trendIcons[trends.trend || 'noData']}`}
            alt={trends.trend || 'No Data'}
            width={70}
            height={!trends.trend || trends.trend === 'noData' || trends.trend === 'noChange' ? 70 : 30}
        />
    ];

    if (trends.trend) {
        if (trends.trend === 'noChange') {
            trendIcon.push(<div key="text" className={classes.trendChange}>No Change</div>);
        } else {
            trendIcon.push((
                <div key="text" className={classes.trendChange} style={{ background: trendColor }}>
                    {precision(trends.percent_change, 2)}%
                </div>
            ));


            if (trends.trend === 'down' || trends.trend === 'overThresholdDown') {
                trendIcon.reverse();
            }
        }
    }

    return (
        <CardContent className={`${classes.cardProperties} ${classes.cardContent}`} component={Grid} container>
            <Grid container item xs={12}>
                <Grid item xs={3} className={classes.tableText} align="center">
                    {trendIcon}
                </Grid>
                <Grid item xs={9} className={classes.tableText}>
                    {parameter.title && Object.keys(trends).length ? (
                        <>
                            <Grid container item xs={12}>
                                <Grid item xs={5} className={classes.tableText} align="right">
                                    <b>Parameter:</b>
                                </Grid>
                                <Grid
                                    item
                                    xs={7}
                                    className={classes.tableText}
                                    dangerouslySetInnerHTML={
                                        { __html: `${parameter.title}${parameter.unit ? ` (${parameter.unit})` : ''}` }
                                    }
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={5} className={classes.tableText} align="right">
                                    <b>Total Avg:</b>
                                </Grid>
                                <Grid item xs={7} className={classes.tableText}>
                                    {precision(trends.totalaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={5} className={classes.tableText} align="right">
                                    <b>Ten Year Avg:</b>
                                </Grid>
                                <Grid item xs={7} className={classes.tableText}>
                                    {precision(trends.tenyearsaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={5} className={classes.tableText} align="right">
                                    <b>Latest Avg:</b>
                                </Grid>
                                <Grid item xs={7} className={classes.tableText}>
                                    {precision(trends.lastaverage, 2)}{parameter.unit ? ` ${parameter.unit}` : ''}
                                </Grid>
                            </Grid>
                        </>
                    ) : 'Not enough data to display'}
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default Trends;
