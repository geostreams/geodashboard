// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { toStringHDMS } from 'ol/coordinate';
import { date, titleCase } from 'gd-core/src/utils/format';

import { getSensorName, getSourceColor, getSourceName } from '../../utils/sensors';

import type { ParameterType, SensorType, SensorsConfig, SourceConfig } from '../../utils/flowtype';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 360
    },
    cardContent: {
        padding: 6
    },
    cardHeader: {
        color: theme.palette.primary.contrastText
    },
    cardProperties: {
        background: '#eee',
        padding: 0
    },
    cardActions: {
        justifyContent: 'center'
    },
    tableText: {
        fontSize: '0.8rem',
        padding: theme.spacing(0.8)
    },
    media: {
        height: 140
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(1),
        color: '#fff'
    }
}));

type Props = {
    sensorsConfig: SensorsConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    sensor: SensorType,
    parameters: ParameterType[],
    handleClose: Function
}

const SensorPopup = ({ sensorsConfig, sourcesConfig, sensor, parameters, handleClose }: Props) => {
    const classes = useStyles();
    const { properties } = sensor;
    const coordinates = toStringHDMS(sensor.geometry.coordinates);

    const sensorParameters = [];
    sensor.parameters.forEach((featureParameter) => {
        const parameter = parameters.find(({ name }) => name === featureParameter);
        if (parameter && parameter.title) {
            const unit = parameter.unit ? ` (${parameter.unit})` : '';
            sensorParameters.push(`${parameter.title}${unit}`);
        }
    });

    const sensorName = getSensorName(properties);

    return (
        <Card className={classes.card}>
            <CardContent
                className={`${classes.cardHeader} ${classes.cardContent}`}
                style={{ backgroundColor: getSourceColor(sourcesConfig[properties.type.id.toLowerCase()]) }}
            >
                <Typography gutterBottom variant="h5" component="h2">
                    {sensorName}
                </Typography>
                <IconButton
                    className={classes.closeButton}
                    size="small"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </CardContent>
            <CardContent className={`${classes.cardProperties} ${classes.cardContent}`} component={Grid} container>
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
            <CardContent className={classes.cardContent} component={Grid} container>
                <Grid container item xs={12}>
                    <Grid item xs={4} className={classes.tableText} align="right">
                        <b>Parameters ({sensorParameters.length})</b>
                    </Grid>
                    <Grid item xs={8} className={classes.tableText} component={List} dense disablePadding>
                        {sensorsConfig.maxDisplayParameters &&
                         sensorParameters.length > sensorsConfig.maxDisplayParameters ?
                            <Alert severity="warning" variant="outlined">
                                There are too many parameters to display here.
                                Click <b>View Data</b> to see a full list of parameters for this site.
                            </Alert> :
                            sensorParameters.map((parameter) => (
                                <ListItem key={parameter} disableGutters>
                                    {parameter}
                                </ListItem>
                            ))}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={(e) => e.stopPropagation()}
                    component={Link}
                    to={`/explore/detail/location/${encodeURIComponent(sensor.name)}/All/`}
                >
                    View Data
                </Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    sensorsConfig: state.config.sensors,
    sourcesConfig: state.config.source
});

export default connect(mapStateToProps)(SensorPopup);
