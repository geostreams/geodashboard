// @flow
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { toStringHDMS } from 'ol/coordinate';
import { date, titleCase } from '@geostreams/core/src/utils/format';

import { getSourceName } from '../../../utils/sensors';
import useStyles from './styles';

import type { SensorType, SourceConfig } from '../../../utils/flowtype';

type Props = {
    sourcesConfig: { [k: string]: SourceConfig; };
    sensor: SensorType
}

const Info = ({ sourcesConfig, sensor }: Props) => {
    const classes = useStyles();
    const { properties } = sensor;
    const coordinates = toStringHDMS(sensor.geometry.coordinates);

    return (
        <CardContent
            className={`${classes.cardProperties} ${classes.cardContent} ${classes.cardContentGrey}`}
            component={Grid}
            container
        >
            <Grid container item xs={12}>
                <Grid item xs={4} className={classes.tableText} align="right">
                    <b>Data Source</b>
                </Grid>
                <Grid item xs={8} className={classes.tableText}>
                    {getSourceName(sourcesConfig[properties.type.id], properties.type)}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} className={classes.tableText} align="right">
                    <b>Time Period</b>
                </Grid>
                <Grid item xs={8} className={classes.tableText}>
                    {date(sensor.min_start_time, 'N/A')} - {date(sensor.max_end_time, 'N/A')}
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={4} className={classes.tableText} align="right">
                    <b>Coordinates</b>
                </Grid>
                <Grid item xs={8} className={classes.tableText}>
                    {coordinates}
                </Grid>
            </Grid>
            {properties.online_status ?
                <Grid container item xs={12}>
                    <Grid item xs={4} className={classes.tableText} align="right">
                        <b>Online Status</b>
                    </Grid>
                    <Grid item xs={8} className={classes.tableText}>
                        {titleCase(properties.online_status)}
                    </Grid>
                </Grid> :
                null}
        </CardContent>
    );
};

export default Info;
