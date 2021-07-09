// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';
import Info from './Info';
import Parameters from './Parameters';
import Trends from './Trends';

import type { ParameterType, SensorType, SensorsConfig, SourceConfig, TrendValues } from '../../../utils/flowtype';

type Props = {
    sensorsConfig: SensorsConfig;
    sourcesConfig: { [k: string]: SourceConfig; };
    header: {
        title: string;
        color: string;
    };
    sensor: SensorType;
    parameters: ParameterType[];
    selectedTrendParameter: {
        title: string;
        unit: string;
    };
    trends: TrendValues;
    detailsLink: string;
    handleClose: Function
}

const SensorPopup = ({
    sensorsConfig,
    sourcesConfig,
    header,
    sensor,
    parameters,
    selectedTrendParameter,
    trends,
    detailsLink,
    handleClose
}: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent
                className={`${classes.cardHeader} ${classes.cardContent}`}
                style={{ backgroundColor: header.color }}
            >
                <Typography gutterBottom variant="h5" component="h2">
                    {header.title}
                </Typography>
                <IconButton
                    className={classes.closeButton}
                    size="small"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </CardContent>
            {sensor ? <Info sensor={sensor} sourcesConfig={sourcesConfig} /> : null}
            {parameters.length ?
                <Parameters
                    sensorsConfig={sensorsConfig}
                    sourcesConfig={sourcesConfig}
                    sensor={sensor}
                    parameters={parameters}
                /> :
                null}
            {trends ? <Trends parameter={selectedTrendParameter} trends={trends} /> : null}
            {detailsLink ?
                <CardActions className={classes.cardActions}>
                    <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={(e) => e.stopPropagation()}
                        component={Link}
                        to={detailsLink}
                    >
                        View Data
                    </Button>
                </CardActions> : null}
        </Card>
    );
};

const mapStateToProps = (state) => ({
    sensorsConfig: state.config.sensors,
    sourcesConfig: state.config.source
});

export default connect(mapStateToProps)(SensorPopup);
