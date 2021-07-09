// @flow
import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';

import useStyles from './styles';

import type { ParameterType, SensorType, SensorsConfig, SourceConfig } from '../../../utils/flowtype';

type Props = {
    sensorsConfig: SensorsConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    sensor: SensorType,
    parameters: ParameterType[]
}

const Parameters = ({ sensorsConfig, sensor, parameters }: Props) => {
    const classes = useStyles();

    const sensorParameters = [];
    sensor.parameters.forEach((featureParameter) => {
        const parameter = parameters.find(({ name }) => name === featureParameter);
        if (parameter && parameter.title) {
            const unit = parameter.unit ? ` (${parameter.unit})` : '';
            sensorParameters.push(`${parameter.title}${unit}`);
        }
    });

    return (
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
    );
};

export default Parameters;
