// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    List,
    ListItem,
    Typography,
    makeStyles
} from '@material-ui/core';
import { toStringHDMS } from 'ol/coordinate';
import { date, titleCase } from 'gd-core/src/utils/format';

import { getSensorName, getSourceColor, getSourceName } from '../../utils/sensors';

import type { ParameterType, SensorType, SourceConfig } from '../../utils/flowtype';

const useStyle = makeStyles((theme) => ({
    card: {
        maxWidth: 375
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
    media: {
        height: 140
    }
}));

type Props = {
    sourcesConfig: { [k: string]: SourceConfig; };
    sensor: SensorType,
    parameters: ParameterType[],
    handleDetailClick: Function
}

const SensorPopup = ({ sourcesConfig, sensor, parameters, handleDetailClick }: Props) => {
    const classes = useStyle();
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

    return (
        <Card
            className={classes.card}
        >
            <CardActionArea>
                <CardContent
                    className={`${classes.cardHeader} ${classes.cardContent}`}
                    style={{ backgroundColor: getSourceColor(sourcesConfig[properties.type.id]) }}
                >
                    <Typography gutterBottom variant="h5" component="h2">
                        {getSensorName(properties)}
                    </Typography>
                </CardContent>
                <CardContent className={`${classes.cardProperties} ${classes.cardContent}`}>
                    <List>
                        <ListItem>
                            <Typography variant="subtitle2">Data Source:</Typography>
                            &nbsp;
                            {getSourceName(sourcesConfig[properties.type.id], properties.type)}
                            &nbsp;
                            Monitoring Site
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2">Time Period:</Typography>
                            &nbsp;
                            {date(sensor.min_start_time)}  - {date(sensor.max_end_time)}
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2">Coordinates:</Typography>
                            &nbsp;
                            {coordinates}
                        </ListItem>
                        <ListItem>
                            <Typography variant="subtitle2">Online Status:</Typography>
                            &nbsp;
                            {titleCase(properties.online_status ? properties.online_status : 'none')}
                        </ListItem>
                    </List>
                </CardContent>
                <CardContent className={classes.cardContent}>
                    <Typography variant="subtitle2">Parameters ({sensorParameters.length}):</Typography>
                    &nbsp;
                    <List>
                        {sensorParameters.map((parameter) => (
                            <ListItem key={parameter}>
                                {parameter}
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleDetailClick}
                >
                    View Data
                </Button>
            </CardActions>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    sourcesConfig: state.config.source
});

export default connect(mapStateToProps)(SensorPopup);
